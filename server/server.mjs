import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import session from "express-session";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import slugify from "slugify";
import { createClient } from "redis";
import { DateTime } from "luxon";
import bcrypt from "bcrypt";
import { scheduleJob } from "node-schedule";

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
      const allowedOrigins = ["http://localhost:3000", "http://localhost:5000", "http://192.168.1.5", "https://racingstation.top"];

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

// Set up session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Koneksi database MySQL
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

// Keep-alive function untuk koneksi database
const keepAliveDatabase = () => {
  setInterval(async () => {
    try {
      await db.query("SELECT 1"); // Query ringan untuk menjaga koneksi tetap hidup
      console.log("Database connection kept alive");
    } catch (error) {
      console.error("Error keeping database connection alive:", error);
    }
  }, 30000); // Setiap 30 detik
};

keepAliveDatabase(); // Jalankan fungsi keep-alive

async function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
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
  const query = "SELECT * FROM users WHERE username = ?";

  try {
    const [results] = await db.execute(query, [username]);

    if (results.length === 0) {
      return res.send({ success: false, message: "Username atau password salah" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.isAuthenticated = true;
      req.session.username = username;
      res.send({ success: true, message: "Login berhasil" });
    } else {
      res.send({ success: false, message: "Username atau password salah" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.use("/public/img", express.static(path.join(__dirname, "../public/img")));

// route /api/articles_card
app.get("/api/articles_card", cacheMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM articles");
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(rows));
    res.json(rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route /api/streams_card (LiveStream.vue)
app.get("/api/streams_card", async (req, res) => {
  try {
    const query = "SELECT * FROM streams";
    const [streams] = await db.execute(query);
    res.json(streams);
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// route /api/streams_card (LiveStream.vue)
app.get("/api/adslink_card", async (req, res) => {
  try {
    const query = "SELECT * FROM adslink";
    const [streams] = await db.execute(query);
    res.json(streams);
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ambil stream dengan status enable (stream.vue)
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

// Endpoint cek session status untuk frontend
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

// Endpoint menyimpan artikel
app.post("/api/articles", async (req, res) => {
  const { category, title, excerpt, date, author, readingTime, content, imagePath } = req.body;

  try {
    // Buat slug unik berdasarkan judul
    const slug = await generateUniqueSlug(title);

    // menyimpan artikel dengan kolom `created_at` otomatis
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

// Endpoint menyimpan stream
app.post("/api/streams", async (req, res) => {
  const { title, category, event, excerpt, link, link2, link3, link4, content, scheduled_enable_time, scheduled_disable_time, imagePath } = req.body;

  // Simpan waktu sesuai input user tanpa konversi UTC
  const scheduledTime = scheduled_enable_time ? DateTime.fromISO(scheduled_enable_time, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss") : null;

  const disableTime = scheduled_disable_time ? DateTime.fromISO(scheduled_disable_time, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss") : null;

  try {
    // Buat slug unik berdasarkan judul
    const slug = await generateUniqueStreamSlug(title);

    // Ambil waktu lokal dengan offset zona waktu Asia/Jakarta (+7 jam)
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000); // Waktu UTC
    const jakartaTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000); // Tambahkan 7 jam untuk Asia/Jakarta

    // Format waktu menjadi string yang valid untuk MySQL (YYYY-MM-DD HH:mm:ss)
    const year = jakartaTime.getFullYear();
    const month = String(jakartaTime.getMonth() + 1).padStart(2, "0");
    const date = String(jakartaTime.getDate()).padStart(2, "0");
    let hours = jakartaTime.getHours();
    const minutes = String(jakartaTime.getMinutes()).padStart(2, "0");
    const seconds = String(jakartaTime.getSeconds()).padStart(2, "0");

    // Jika jam adalah 24, ubah menjadi 00
    if (hours === 24) hours = 0;
    hours = String(hours).padStart(2, "0");

    const formattedCreatedAt = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    // Query untuk menyimpan stream
    const query = `
      INSERT INTO streams (
        slug, title, category, event, excerpt, link, link2, link3, link4, 
        content, image_path, created_at, status, scheduled_enable_time, scheduled_disable_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      slug,
      title,
      category,
      event,
      excerpt,
      link,
      link2,
      link3,
      link4,
      content,
      imagePath,
      formattedCreatedAt,
      "disable",
      scheduledTime, // Simpan waktu sesuai input
      disableTime,
    ];

    await db.execute(query, values);
    res.status(201).send({ message: "Stream created successfully", slug });
  } catch (error) {
    console.error("Error inserting stream:", error);
    res.status(500).send({ error: "Failed to create stream" });
  }
});

// Konfigurasi multer untuk menyimpan file di folder public/img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img")); // Direktori penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({
  storage: storage, // Konfigurasi storage
  limits: {
    fileSize: 3 * 1024 * 1024, // Batas ukuran file 3MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true); // Terima file PNG
    } else {
      cb(new Error("Only PNG files are allowed!")); // Tolak file selain PNG
    }
  },
});

// Endpoint upload gambar
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (req.file) {
    const imagePath = `/public/img/${req.file.filename}`;
    res.send({ success: true, imagePath: imagePath });
  } else {
    res.status(400).send({ success: false, message: "Failed to upload image." });
  }
});

// Configure storage for editor images
const editorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../public/img");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const editorUpload = multer({
  storage: editorStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Handle editor image uploads - PERUBAHAN DI SINI
app.post("/api/upload-editor-image", editorUpload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = `/public/img/${req.file.filename}`;
    res.json({
      success: true,
      location: filePath,
    });
  } catch (error) {
    console.error("Error uploading editor image:", error);
    res.status(500).json({ success: false, message: "Failed to upload image" });
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
  const { title, category, event, excerpt, link, link2, link3, link4, content, status, scheduled_enable_time, scheduled_disable_time } = req.body;

  // Handle conversion untuk scheduled_enable_time
  let scheduledTime = null;
  if (scheduled_enable_time && scheduled_enable_time !== "") {
    try {
      const dt = DateTime.fromISO(scheduled_enable_time, {
        zone: "Asia/Jakarta",
        setZone: true,
      });

      if (!dt.isValid) {
        return res.status(400).json({
          error: "Format waktu enable tidak valid",
        });
      }
      scheduledTime = dt.toFormat("yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      return res.status(400).json({
        error: "Format datetime enable tidak valid",
      });
    }
  } else if (scheduled_enable_time === "") {
    scheduledTime = null;
  }

  // Handle conversion untuk scheduled_disable_time
  let disableTime = null;
  if (scheduled_disable_time && scheduled_disable_time !== "") {
    try {
      const dt = DateTime.fromISO(scheduled_disable_time, {
        zone: "Asia/Jakarta",
        setZone: true,
      });

      if (!dt.isValid) {
        return res.status(400).json({
          error: "Format waktu disable tidak valid",
        });
      }
      disableTime = dt.toFormat("yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      return res.status(400).json({
        error: "Format datetime disable tidak valid",
      });
    }
  } else if (scheduled_disable_time === "") {
    disableTime = null;
  }

  // Validasi slug
  if (!slug || slug.trim() === "") {
    return res.status(400).json({ error: "Slug tidak valid" });
  }

  try {
    const [existingStream] = await db.query("SELECT id FROM streams WHERE slug = ?", [slug]);
    if (existingStream.length === 0) {
      return res.status(404).json({ error: "Stream tidak ditemukan" });
    }

    const updates = [];
    const values = [];

    // Fungsi helper untuk membangun query
    const addUpdate = (field, value) => {
      if (value !== undefined) {
        // Menerima null dan nilai valid
        updates.push(`${field} = ?`);
        values.push(value);
      }
    };

    // Tambahkan semua field yang akan diupdate
    addUpdate("title", title);
    addUpdate("category", category);
    addUpdate("event", event);
    addUpdate("excerpt", excerpt);
    addUpdate("link", link);
    addUpdate("link2", link2);
    addUpdate("link3", link3);
    addUpdate("link4", link4);
    addUpdate("content", content);
    addUpdate("status", status);
    addUpdate("scheduled_enable_time", scheduledTime);
    addUpdate("scheduled_disable_time", disableTime); // Ditambahkan di sini

    if (updates.length === 0) {
      return res.status(400).json({ error: "Tidak ada data valid untuk diupdate" });
    }

    values.push(slug);

    const query = `UPDATE streams SET ${updates.join(", ")} WHERE slug = ?`;
    await db.execute(query, values);

    await redisClient.del("/api/streams_card");

    res.json({
      success: true,
      message: "Stream berhasil diperbarui",
      updated_fields: updates.map((update) => update.split(" = ")[0]),
    });
  } catch (error) {
    console.error("Error updating stream:", error);

    if (error.code === "ER_TRUNCATED_WRONG_VALUE") {
      return res.status(400).json({
        error: "Format data tidak valid",
        detail: error.message,
        field: "scheduled_time",
        expected_format: "YYYY-MM-DD HH:mm:ss",
      });
    }

    res.status(500).json({
      error: "Gagal memperbarui stream",
      detail: process.env.NODE_ENV === "development" ? error.message : "Hubungi administrator",
    });
  }
});

app.route("/api/articles/:slug").get(async (req, res) => {
  const { slug } = req.params; // ambil slug dari parameter
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

// Edit Artikel
app.route("/api/articles/:id").put(async (req, res) => {
  const { id } = req.params;
  const { category, title, excerpt, date, author, readingTime, content } = req.body;

  // Validasi field wajib
  if (!category || !title || !excerpt || !date || !author || !readingTime || !content) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  // Konversi tanggal UTC ke Asia/Jakarta dengan format lengkap
  const formattedDate = DateTime.fromISO(date).setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss"); // Format dengan waktu

  const query = `
    UPDATE articles
    SET category = ?, title = ?, excerpt = ?, date = ?, author = ?, reading_time = ?, content = ?
    WHERE id = ?
  `;
  const values = [category, title, excerpt, formattedDate, author, readingTime, content, id];

  try {
    const [result] = await db.execute(query, values);
    if (result.affectedRows > 0) {
      await redisClient.del("/api/articles_card");
      res.json({ message: "Artikel berhasil diperbarui" });
    } else {
      res.status(404).json({ error: "Artikel tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Gagal memperbarui artikel" });
  }
});

// Endpoint delete artikel
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

    await redisClient.del("/api/articles_card");

    res.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint delete stream
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

// Endpoint to get all adslinks
app.get("/api/adslink", cacheMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM adslink");
    await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(rows));
    res.json(rows);
  } catch (error) {
    console.error("Error fetching adslinks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get a single adslink by ID
app.get("/api/adslink/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM adslink WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Adslink not found" });
    }
  } catch (error) {
    console.error("Error fetching adslink:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new adslink
app.post("/api/adslink", async (req, res) => {
  const { name, adslink } = req.body;

  // Validate required fields
  if (!name || !adslink) {
    return res.status(400).json({ error: "Name and adslink are required" });
  }

  try {
    const query = "INSERT INTO adslink (name, adslink) VALUES (?, ?)";
    const [result] = await db.execute(query, [name, adslink]);

    // Clear cache after creating new adslink
    await redisClient.del("/api/adslinks");

    res.status(201).json({
      message: "Adslink created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating adslink:", error);
    res.status(500).json({ error: "Failed to create adslink" });
  }
});

// Endpoint to update an adslink
app.put("/api/adslink/:id", async (req, res) => {
  const { id } = req.params;
  const { name, adslink } = req.body;

  // Validate required fields
  if (!name || !adslink) {
    return res.status(400).json({ error: "Name and adslink are required" });
  }

  try {
    const query = "UPDATE adslink SET name = ?, adslink = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, adslink, id]);

    if (result.affectedRows > 0) {
      // Clear cache after updating
      await redisClient.del("/api/adslinks");
      res.json({ message: "Adslink updated successfully" });
    } else {
      res.status(404).json({ error: "Adslink not found" });
    }
  } catch (error) {
    console.error("Error updating adslink:", error);
    res.status(500).json({ error: "Failed to update adslink" });
  }
});

// Endpoint to delete an adslink
app.delete("/api/adslink/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM adslink WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      // Clear cache after deleting
      await redisClient.del("/api/adslinks");
      res.json({ message: "Adslink deleted successfully" });
    } else {
      res.status(404).json({ error: "Adslink not found" });
    }
  } catch (error) {
    console.error("Error deleting adslink:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint hitung jumlah artikel
app.get("/api/articles_count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM articles");
    res.json({ totalArticles: rows[0].total });
  } catch (error) {
    console.error("Error counting articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint hitung jumlah stream
app.get("/api/streams_count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM streams");
    res.json({ totalStream: rows[0].total });
  } catch (error) {
    console.error("Error counting streams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint hitung jumlah adslink
app.get("/api/adslink_count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM adslink");
    res.json({ totalAdslink: rows[0].total });
  } catch (error) {
    console.error("Error counting adslink:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/memory-usage", (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
  });
});

// Pindahkan fungsi ini ke bagian paling bawah file SEBELUM start server
async function checkAndEnableStreams() {
  try {
    const now = DateTime.now().setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");

    const [streams] = await db.execute(
      `SELECT id FROM streams 
       WHERE status = 'disable' 
         AND scheduled_enable_time IS NOT NULL 
         AND scheduled_enable_time <= ?
         AND (scheduled_disable_time IS NULL OR scheduled_disable_time > ?)`,
      [now, now]
    );

    if (streams.length > 0) {
      await db.execute(
        `UPDATE streams SET status = 'enable' 
         WHERE status = 'disable' 
           AND scheduled_enable_time <= ?
           AND (scheduled_disable_time IS NULL OR scheduled_disable_time > ?)`,
        [now, now]
      );
      console.log(`Enabled ${streams.length} streams`);
    }
  } catch (error) {
    console.error("Enable Scheduler error:", error);
  }
}

async function checkAndDisableStreams() {
  try {
    const now = DateTime.now().setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");

    const [streams] = await db.execute(
      `SELECT id FROM streams 
       WHERE status = 'enable' 
         AND scheduled_disable_time IS NOT NULL 
         AND scheduled_disable_time <= ?`,
      [now]
    );

    if (streams.length > 0) {
      await db.execute(
        `UPDATE streams SET status = 'disable' 
         WHERE status = 'enable' 
           AND scheduled_disable_time <= ?`,
        [now]
      );
      console.log(`Disabled ${streams.length} streams`);
    }
  } catch (error) {
    console.error("Disable Scheduler error:", error);
  }
}

// Jalankan scheduler SETELAH didefinisikan
scheduleJob("* * * * *", checkAndEnableStreams);
scheduleJob("* * * * *", checkAndDisableStreams);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
