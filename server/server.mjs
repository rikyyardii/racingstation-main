import express from "express";
import mysql from "mysql2/promise"; // Ganti dengan mysql2/promise untuk async/await
import cors from "cors";
import session from "express-session";
import { EventEmitter } from "node:events";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import slugify from "slugify";
import { createClient } from "redis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

await redisClient.connect();
console.log("Connected to Redis");

app.use(
  cors({
    origin: (origin, callback) => {
      // Daftar domain yang diizinkan
      const allowedOrigins = ["http://localhost:3000", "http://localhost:5000", "http://192.168.1.5", "https://racingstation.top"];

      // Jika tidak ada `origin` (misal: permintaan internal), izinkan
      if (!origin) {
        return callback(null, true);
      }

      // Cek apakah `origin` ada di daftar yang diizinkan
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Jika Anda menggunakan cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors()); // Respond to preflight OPTIONS requests

// Set up session middleware
app.use(
  session({
    secret: "your_secret_key", // Use a strong, unique secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure only in production
      httpOnly: true, // Prevent client-side scripts from accessing the cookies
      sameSite: "lax", // Adjust as necessary
    },
  })
);

// Koneksi ke database MySQL
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "racingstations",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Redis Middleware Cache
async function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // Gunakan URL sebagai key cache
  const cachedData = await redisClient.get(key);

  if (cachedData) {
    console.log("Cache hit for:", key);
    return res.json(JSON.parse(cachedData));
  }

  console.log("Cache miss for:", key);
  next();
}

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  try {
    const [results] = await db.execute(query, [username, password]);

    if (results.length > 0) {
      req.session.isAuthenticated = true;
      req.session.username = username;
      res.send({ success: true, message: "Login berhasil" });
    } else {
      res.send({ success: false, message: "Username atau password salah" });
    }
  } catch (err) {
    res.status(500).send({ error: "Database query failed" });
  }
});

// Static middleware to serve images from data/img
app.use("/public/img", express.static(path.join(__dirname, "../public/img")));

// Define the /api/articles_card route
app.get("/api/articles_card", cacheMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM articles");
    // Simpan hasil query ke Redis dengan TTL (Time to Live)
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(rows)); // TTL = 3600 detik (1 jam)
    res.json(rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the /api/streams_card route (LiveStream.vue)
app.get("/api/streams_card", async (req, res) => {
  try {
    // Query untuk mengambil semua data stream tanpa mempedulikan status
    const query = "SELECT * FROM streams";
    const [streams] = await db.execute(query);
    res.json(streams); // Kirimkan semua streams, termasuk yang statusnya disable
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint khusus untuk mengambil stream dengan status enable (stream.vue)
app.get("/api/streams_enabled", async (req, res) => {
  try {
    // Query untuk mengambil hanya stream dengan status enable
    const query = "SELECT * FROM streams WHERE status = 'enable'";
    const [streams] = await db.execute(query);
    res.json(streams); // Kirimkan hanya streams yang statusnya enable
  } catch (error) {
    console.error("Error fetching enabled streams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Logout route
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Gagal logout");
    }
    res.send({ success: true, message: "Logout berhasil" });
  });
});

// Middleware to check login status
function checkAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
}

// Protected route example
app.get("/api/home", checkAuth, (req, res) => {
  res.send({ success: true, message: "Welcome to the home page" });
});

// Endpoint to check session status for the frontend
app.get("/api/check-session", (req, res) => {
  if (req.session.isAuthenticated) {
    res.send({ isLoggedIn: true });
  } else {
    res.send({ isLoggedIn: false });
  }
});

//buat slug unik
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let isUnique = false;
  let count = 1;

  while (!isUnique) {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM articles WHERE slug = ?", [slug]);
    if (rows[0].count === 0) {
      isUnique = true;
    } else {
      slug = `${slug}-${count}`;
      count++;
    }
  }

  return slug;
};

// Endpoint untuk menyimpan artikel
app.post("/api/articles", async (req, res) => {
  const { category, title, excerpt, date, author, readingTime, content, imagePath } = req.body;

  try {
    // Buat slug unik berdasarkan judul
    const slug = await generateUniqueSlug(title);

    // Query untuk menyimpan artikel dengan kolom `created_at` otomatis terisi
    const query = `
      INSERT INTO articles (category, title, excerpt, date, author, reading_time, content, image_path, slug, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [category, title, excerpt, date, author, readingTime, content, imagePath, slug];

    // Eksekusi query
    await db.execute(query, values);

    // Hapus cache terkait setelah artikel baru ditambahkan
    await redisClient.del("/api/articles_card");

    res.status(201).send({ message: "Article created successfully", slug });
  } catch (error) {
    console.error("Error inserting article:", error);
    res.status(500).send({ error: "Failed to create article" });
  }
});

// Buat slug unik untuk streams
const generateUniqueStreamSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let isUnique = false;
  let count = 1;

  while (!isUnique) {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM streams WHERE slug = ?", [slug]);
    if (rows[0].count === 0) {
      isUnique = true;
    } else {
      slug = `${slug}-${count}`;
      count++;
    }
  }

  return slug;
};

// Endpoint untuk menyimpan stream
app.post("/api/streams", async (req, res) => {
  const { title, event, excerpt, link, content, imagePath } = req.body;

  try {
    // Buat slug unik berdasarkan judul
    const slug = await generateUniqueStreamSlug(title);

    // Mendapatkan waktu lokal berdasarkan komputer yang digunakan
    const now = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta", // Ganti sesuai zona waktu lokal Anda
    };
    const localTime = new Intl.DateTimeFormat("en-CA", options).format(now).replace(/\//g, "-").replace(", ", " ");
    const formattedCreatedAt = localTime.replace("T", " ");

    // Query untuk menyimpan stream
    const query = `
      INSERT INTO streams (slug, title, event, excerpt, link, content, image_path, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [slug, title, event, excerpt, link, content, imagePath, formattedCreatedAt];

    await db.execute(query, values);
    res.status(201).send({ message: "Stream created successfully", slug });
  } catch (error) {
    console.error("Error inserting stream:", error);
    res.status(500).send({ error: "Failed to create stream" });
  }
});

// Konfigurasi multer untuk menyimpan file di folder data/img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Simpan dengan nama unik
  },
});

const upload = multer({ storage: storage });

// Endpoint untuk mengunggah gambar
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (req.file) {
    const imagePath = `/public/img/${req.file.filename}`;
    res.send({ success: true, imagePath: imagePath });
  } else {
    res.status(400).send({ success: false, message: "Failed to upload image." });
  }
});

// baru
app.get("/api/streams", async (req, res) => {
  const { slug } = req.query; // Ambil parameter slug dari query
  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }
  try {
    const [rows] = await db.query("SELECT * FROM streams WHERE slug = ?", [slug]);
    if (rows.length > 0) {
      res.json(rows[0]); // Kirim stream yang ditemukan
    } else {
      res.status(404).json({ error: "Stream tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error fetching stream by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/streams/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM streams WHERE slug = ?", [slug]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Stream not found" });
    }
  } catch (error) {
    console.error("Error fetching stream by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit Stream
app.put("/api/streams/:slug", async (req, res) => {
  const { slug } = req.params;
  const { title, event, excerpt, link, content, status } = req.body;

  // Pastikan slug valid
  if (!slug) {
    return res.status(400).json({ error: "Slug tidak valid" });
  }

  // Pastikan setidaknya ada satu field yang dikirim untuk pembaruan
  if (!title && !excerpt && !link && !content && !status) {
    return res.status(400).json({ error: "Tidak ada data yang dikirim untuk pembaruan" });
  }

  try {
    // Cek apakah stream dengan slug yang diberikan ada
    const [existingStream] = await db.query("SELECT * FROM streams WHERE slug = ?", [slug]);
    if (existingStream.length === 0) {
      return res.status(404).json({ error: "Stream tidak ditemukan" });
    }

    // Buat query dinamis untuk hanya memperbarui field yang dikirim
    const updates = [];
    const values = [];
    if (title) {
      updates.push("title = ?");
      values.push(title);
    }
    if (title) {
      updates.push("event = ?");
      values.push(event);
    }
    if (excerpt) {
      updates.push("excerpt = ?");
      values.push(excerpt);
    }
    if (link) {
      updates.push("link = ?");
      values.push(link);
    }
    if (content) {
      updates.push("content = ?");
      values.push(content);
    }
    if (status) {
      updates.push("status = ?");
      values.push(status);
    }

    // Tambahkan slug ke values untuk klausa WHERE
    values.push(slug);

    // Eksekusi query pembaruan
    const query = `UPDATE streams SET ${updates.join(", ")} WHERE slug = ?`;
    await db.execute(query, values);

    // Hapus cache jika ada
    await redisClient.del("/api/streams_card");

    res.json({ message: "Stream berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating stream:", error);
    res.status(500).json({ error: "Gagal memperbarui stream" });
  }
});

app.route("/api/articles/:slug").get(async (req, res) => {
  const { slug } = req.params; // Mengambil slug dari parameter
  try {
    const [rows] = await db.query("SELECT * FROM articles WHERE slug = ?", [slug]); // Gunakan slug untuk query
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.route("/api/articles/:id").put(async (req, res) => {
  const { id } = req.params;
  const { category, title, excerpt, date, author, readingTime, content } = req.body;

  const query = `
    UPDATE articles 
    SET category = ?, title = ?, excerpt = ?, date = ?, author = ?, reading_time = ?, content = ? 
    WHERE id = ?
  `;
  const values = [category, title, excerpt, date, author, readingTime, content, id];

  try {
    const [result] = await db.execute(query, values);
    if (result.affectedRows > 0) {
      // Hapus cache terkait setelah pembaruan
      await redisClient.del("/api/articles_card");
      res.json({ message: "Artikel berhasil diperbarui" });
    } else {
      res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

// Endpoint untuk menghapus artikel
app.delete("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [article] = await db.query("SELECT image_path FROM articles WHERE id = ?", [id]);

    if (article.length === 0) {
      return res.status(404).json({ error: "Artikel tidak ditemukan" });
    }

    const imagePath = article[0].image_path;
    if (imagePath) {
      const fullImagePath = path.join(__dirname, "../public/img", path.basename(imagePath));
      fs.unlink(fullImagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await db.query("DELETE FROM articles WHERE id = ?", [id]);

    // Hapus cache terkait setelah penghapusan
    await redisClient.del("/api/articles_card");

    res.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk menghapus stream
app.delete("/api/streams/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("SELECT image_path FROM streams WHERE id = ?", [id]);
    const stream = result[0];

    if (!stream) {
      return res.status(404).json({ error: "Stream not found" });
    }

    const imagePath = stream.image_path;
    if (imagePath) {
      const fullImagePath = path.join(__dirname, "../public/img", path.basename(imagePath));
      fs.unlink(fullImagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    const [deleteResult] = await db.execute("DELETE FROM streams WHERE id = ?", [id]);

    if (deleteResult.affectedRows > 0) {
      // Hapus cache terkait setelah penghapusan
      await redisClient.del("/api/streams_card");

      res.json({ message: "Stream and associated image deleted successfully" });
    } else {
      res.status(404).json({ error: "Stream not found" });
    }
  } catch (error) {
    console.error("Error deleting stream:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk menghitung jumlah artikel
app.get("/api/articles_count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM articles");
    res.json({ totalArticles: rows[0].total }); // Mengirim jumlah artikel
  } catch (error) {
    console.error("Error counting articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk menghitung jumlah stream
app.get("/api/streams_count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM streams");
    res.json({ totalStream: rows[0].total }); // Mengirim jumlah stream
  } catch (error) {
    console.error("Error counting streams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/memory-usage", (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`, // Resident Set Size
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`, // Total Heap Size
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`, // Used Heap Size
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`, // External Memory
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
