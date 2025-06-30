import dotenv from "dotenv";
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
import { TwitterApi } from "twitter-api-v2";

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

dotenv.config({ path: path.join(__dirname, "../.env") });

// Koneksi database MySQL
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

// route /api/streams_card (LiveStream.vue)
app.get("/api/session_card", async (req, res) => {
  try {
    const query = "SELECT * FROM sessions";
    const [streams] = await db.execute(query);
    res.json(streams);
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// route /api/streams_card (LiveStream.vue)
app.get("/api/category_card", async (req, res) => {
  try {
    const query = "SELECT * FROM event_categories	";
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
  const { title, category, event, excerpt, link, link2, link3, link4, content, session_name, event_type, scheduled_enable_time, scheduled_disable_time, image_path } = req.body;

  console.log("Received data:", req.body); // Debug log

  // Validasi field yang wajib
  if (!title || !category || !event || !excerpt || !link || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Simpan waktu sesuai input user tanpa konversi UTC
  const scheduledTime = scheduled_enable_time ? DateTime.fromISO(scheduled_enable_time, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss") : null;

  const disableTime = scheduled_disable_time ? DateTime.fromISO(scheduled_disable_time, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss") : null;

  try {
    // Buat slug unik berdasarkan judul
    const slug = await generateUniqueStreamSlug(title);

    // Ambil waktu lokal dengan offset zona waktu Asia/Jakarta (+7 jam)
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
    const jakartaTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);

    // Format waktu menjadi string yang valid untuk MySQL
    const year = jakartaTime.getFullYear();
    const month = String(jakartaTime.getMonth() + 1).padStart(2, "0");
    const date = String(jakartaTime.getDate()).padStart(2, "0");
    let hours = jakartaTime.getHours();
    const minutes = String(jakartaTime.getMinutes()).padStart(2, "0");
    const seconds = String(jakartaTime.getSeconds()).padStart(2, "0");

    if (hours === 24) hours = 0;
    hours = String(hours).padStart(2, "0");

    const formattedCreatedAt = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    // Query untuk menyimpan stream
    const query = `
      INSERT INTO streams (
        slug, title, category, event, excerpt, link, link2, link3, link4, 
        content, session_name, event_type, image_path, created_at, status, 
        scheduled_enable_time, scheduled_disable_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Gunakan string kosong untuk field opsional jika kolom tidak mengizinkan NULL
    // Atau gunakan null jika kolom sudah diubah untuk mengizinkan NULL
    const values = [
      slug,
      title,
      category,
      event,
      excerpt,
      link,
      link2 || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      link3 || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      link4 || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      content,
      session_name || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      event_type || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      image_path || "", // String kosong jika kolom NOT NULL, atau gunakan null jika kolom sudah diubah
      formattedCreatedAt,
      "disable",
      scheduledTime, // Untuk datetime, bisa tetap null
      disableTime, // Untuk datetime, bisa tetap null
    ];

    console.log("SQL Values:", values); // Debug log

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
  const {
    title,
    category,
    event,
    excerpt,
    link,
    link2,
    link3,
    link4,
    content,
    status,
    session_name,
    event_type,
    scheduled_enable_time,
    scheduled_disable_time,
    session_schedules, // Terima data jadwal sesi dari frontend
  } = req.body;

  // Handle conversion untuk scheduled_enable_time
  let scheduledTime = null;
  if (scheduled_enable_time && scheduled_enable_time !== "") {
    try {
      const dt = DateTime.fromISO(scheduled_enable_time, {
        zone: "Asia/Jakarta",
        setZone: true,
      });

      if (!dt.isValid) {
        return res.status(400).json({ error: "Format waktu enable tidak valid" });
      }
      scheduledTime = dt.toFormat("yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      return res.status(400).json({ error: "Format datetime enable tidak valid" });
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
        return res.status(400).json({ error: "Format waktu disable tidak valid" });
      }
      disableTime = dt.toFormat("yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      return res.status(400).json({ error: "Format datetime disable tidak valid" });
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
    addUpdate("session_name", session_name);
    addUpdate("event_type", event_type);
    addUpdate("scheduled_enable_time", scheduledTime);
    addUpdate("scheduled_disable_time", disableTime);
    // Tambahkan session_schedules ke query update jika ada
    addUpdate("session_schedules", JSON.stringify(session_schedules));

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
      updated_fields: updates.map((u) => u.split(" = ")[0]),
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
  const { name, adslink, status } = req.body;

  // Validate required fields
  if (!name || !adslink) {
    return res.status(400).json({ error: "Name and adslink are required" });
  }

  try {
    const query = "INSERT INTO adslink (name, adslink, status) VALUES (?, ?, ?)";
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
  const { name, adslink, status } = req.body;

  // Validate required fields
  if (!name || !adslink) {
    return res.status(400).json({ error: "Name and adslink are required" });
  }

  try {
    const query = "UPDATE adslink SET name = ?, adslink = ?, status = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, adslink, status, id]);

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

// ================== EVENT CATEGORIES ENDPOINTS ==================

// Get all event categories
app.get("/api/event-categories", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM event_categories ORDER BY name");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching event categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get single event category
app.get("/api/event-categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM event_categories WHERE id = ?";
    const [rows] = await db.execute(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      console.log("Event category not found for ID:", id);
      res.status(404).json({ error: "Event category not found" });
    }
  } catch (error) {
    console.error("Error fetching event category:", error);
    res.status(500).json({ error: "Failed to fetch event category" });
  }
});

// Create event category
app.post("/api/event-categories", async (req, res) => {
  const { name, description, event_type_description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const query = "INSERT INTO event_categories (name, description, event_type_description) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [name, description, event_type_description]);

    res.status(201).json({
      message: "Event category created successfully",
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Event category name already exists" });
    }
    console.error("Error creating event category:", error);
    res.status(500).json({ error: "Failed to create event category" });
  }
});

// Update event category
app.put("/api/event-categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, event_type_description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const query = "UPDATE event_categories SET name = ?, description = ?, event_type_description = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, description, event_type_description, id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Event category updated successfully" });
    } else {
      res.status(404).json({ error: "Event category not found" });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Event category name already exists" });
    }
    console.error("Error updating event category:", error);
    res.status(500).json({ error: "Failed to update event category" });
  }
});

// Delete event category
app.delete("/api/event-categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM event_categories WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Event category deleted successfully" });
    } else {
      res.status(404).json({ error: "Event category not found" });
    }
  } catch (error) {
    console.error("Error deleting event category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================== SESSIONS ENDPOINTS ==================

// IMPORTANT: Order matters! Put specific routes BEFORE generic routes

// Get all sessions (list format) - UPDATED dengan JOIN untuk mendapatkan category description
app.get("/api/sessions-list", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.id,
        s.category_id,
        s.session_name,
        s.session_order,
        s.is_active,
        s.created_at,
        s.updated_at,
        ec.name as category_name,
        ec.description as category_description,
        ec.event_type_description
      FROM sessions s
      LEFT JOIN event_categories ec ON s.category_id = ec.id
      ORDER BY s.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching event sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get sessions grouped by category (for dropdown options)
app.get("/api/sessions/grouped", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        ec.id as category_id,
        ec.name as category_name,
        ec.event_type_description,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', s.id,
            'session_name', s.session_name,
            'session_order', s.session_order
          )
          ORDER BY s.session_order
        ) as sessions
      FROM event_categories ec
      LEFT JOIN sessions s ON ec.id = s.category_id AND s.is_active = true
      GROUP BY ec.id, ec.name, ec.event_type_description
      ORDER BY ec.name
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching grouped sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// FIXED: Changed route to avoid conflict with /:id route
// Get sessions by category name - MOVED TO SPECIFIC PATH
app.get("/api/sessions/by-category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    console.log(`Fetching sessions for category: ${categoryName}`);

    const [sessions] = await db.execute(
      `
      SELECT s.id, s.session_name, s.session_order, s.is_active, s.created_at, s.updated_at, 
             ec.name as category_name, ec.description as category_description, ec.event_type_description
      FROM sessions s
      JOIN event_categories ec ON s.category_id = ec.id
      WHERE ec.name = ? AND s.is_active = true
      ORDER BY s.session_order
    `,
      [categoryName]
    );

    console.log(`Found ${sessions.length} sessions for category ${categoryName}`);
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Get sessions by category name (alternative route)
app.get("/api/sessions/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    console.log(`Fetching sessions for category: ${categoryName}`);

    const [sessions] = await db.execute(
      `
      SELECT s.id, s.session_name, s.session_order, s.is_active, s.created_at, s.updated_at, 
             ec.name as category_name, ec.description as category_description, ec.event_type_description
      FROM sessions s
      JOIN event_categories ec ON s.category_id = ec.id
      WHERE ec.name = ? AND s.is_active = true
      ORDER BY s.session_order
    `,
      [categoryName]
    );

    console.log(`Found ${sessions.length} sessions for category ${categoryName}`);
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// GET single session by ID - FIXED VERSION
// IMPORTANT: This must come AFTER the specific routes above
app.get("/api/sessions/:id", async (req, res) => {
  const { id } = req.params;

  // Pastikan ID adalah numeric
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid session ID format" });
  }

  try {
    console.log(`Fetching session with ID: ${id}`);

    const [rows] = await db.execute(
      `
      SELECT 
        s.id,
        s.category_id,
        s.session_name,
        s.session_order,
        s.is_active,
        s.created_at,
        s.updated_at,
        ec.name as category_name,
        ec.description as category_description,
        ec.event_type_description
      FROM sessions s
      LEFT JOIN event_categories ec ON s.category_id = ec.id
      WHERE s.id = ?
    `,
      [id]
    );

    console.log(`Query executed for session ID ${id}, found ${rows.length} rows`);

    if (rows.length === 0) {
      console.log(`Session with ID ${id} not found`);
      return res.status(404).json({ error: "Session not found" });
    }

    const sessionData = rows[0];
    console.log(`Returning session data:`, sessionData);

    // Ensure consistent data structure
    const response = {
      id: sessionData.id,
      category_id: sessionData.category_id,
      session_name: sessionData.session_name,
      session_order: sessionData.session_order,
      is_active: sessionData.is_active,
      created_at: sessionData.created_at,
      updated_at: sessionData.updated_at,
      category_name: sessionData.category_name,
      category_description: sessionData.category_description,
      event_type_description: sessionData.event_type_description,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

// Get all sessions with filtering options - UPDATED dengan JOIN untuk mendapatkan category description
app.get("/api/sessions", async (req, res) => {
  const { category_id, category_name } = req.query;

  try {
    let query = `
      SELECT s.*, ec.name as category_name, ec.description as category_description, ec.event_type_description
      FROM sessions s 
      JOIN event_categories ec ON s.category_id = ec.id 
      WHERE s.is_active = true
    `;
    let params = [];

    if (category_id) {
      query += " AND s.category_id = ?";
      params.push(category_id);
    } else if (category_name) {
      query += " AND ec.name = ?";
      params.push(category_name);
    }

    query += " ORDER BY s.category_id, s.session_order";

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create session
app.post("/api/sessions", async (req, res) => {
  const { category_id, session_name, session_order, is_active } = req.body;

  // Validation
  if (!category_id || !session_name || !session_order) {
    return res.status(400).json({ error: "Category ID, session name, and session order are required" });
  }

  // Validate data types
  if (isNaN(category_id) || isNaN(session_order)) {
    return res.status(400).json({ error: "Category ID and session order must be numbers" });
  }

  try {
    const query = "INSERT INTO sessions (category_id, session_name, session_order, is_active) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [parseInt(category_id), session_name.trim(), parseInt(session_order), is_active !== undefined ? is_active : true]);

    res.status(201).json({
      message: "Session created successfully",
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Session name already exists in this category" });
    }
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Update session - FIXED VERSION
app.put("/api/sessions/:id", async (req, res) => {
  const { id } = req.params;
  const { category_id, session_name, session_order, is_active } = req.body;

  // Validate ID
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  // Validate required fields
  if (!category_id || !session_name || !session_order) {
    return res.status(400).json({ error: "Category ID, session name, and session order are required" });
  }

  // Validate data types
  if (isNaN(category_id) || isNaN(session_order)) {
    return res.status(400).json({ error: "Category ID and session order must be numbers" });
  }

  try {
    console.log(`Updating session ${id} with data:`, { category_id, session_name, session_order, is_active });

    // First, check if session exists
    const [checkRows] = await db.execute("SELECT id FROM sessions WHERE id = ?", [id]);
    if (checkRows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    const query = "UPDATE sessions SET category_id = ?, session_name = ?, session_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    const [result] = await db.execute(query, [parseInt(category_id), session_name.trim(), parseInt(session_order), is_active !== undefined ? Boolean(is_active) : true, id]);

    console.log(`Update result:`, result);

    if (result.affectedRows > 0) {
      res.json({
        message: "Session updated successfully",
        success: true,
      });
    } else {
      res.status(404).json({ error: "Session not found or no changes made" });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Session name already exists in this category" });
    }
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Failed to update session" });
  }
});

// Hard delete session (permanent)
app.delete("/api/sessions/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    const [result] = await db.execute("DELETE FROM sessions WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Session permanently deleted" });
    } else {
      res.status(404).json({ error: "Session not found" });
    }
  } catch (error) {
    console.error("Error permanently deleting session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================== SOSMED LINK ENDPOINTS ==================
// Get all sosmed links
app.get("/api/sosmed-links", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sosmed_link ORDER BY name");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sosmed links:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get single sosmed link
app.get("/api/sosmed-links/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM sosmed_link WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      console.log("Sosmed link not found for ID:", id);
      res.status(404).json({ error: "Sosmed link not found" });
    }
  } catch (error) {
    console.error("Error fetching sosmed link:", error);
    res.status(500).json({ error: "Failed to fetch sosmed link" });
  }
});

// Create sosmed link
app.post("/api/sosmed-links", async (req, res) => {
  const { name, link } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }
  try {
    const query = "INSERT INTO sosmed_link (name, link) VALUES (?, ?)";
    const [result] = await db.execute(query, [name, link]);
    res.status(201).json({
      message: "Sosmed link created successfully",
      id: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Sosmed link name already exists" });
    }
    console.error("Error creating sosmed link:", error);
    res.status(500).json({ error: "Failed to create sosmed link" });
  }
});

// Update sosmed link
app.put("/api/sosmed-links/:id", async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }
  try {
    const query = "UPDATE sosmed_link SET name = ?, link = ? WHERE id = ?";
    const [result] = await db.execute(query, [name, link, id]);
    if (result.affectedRows > 0) {
      res.json({ message: "Sosmed link updated successfully" });
    } else {
      res.status(404).json({ error: "Sosmed link not found" });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Sosmed link name already exists" });
    }
    console.error("Error updating sosmed link:", error);
    res.status(500).json({ error: "Failed to update sosmed link" });
  }
});

// Delete sosmed link
app.delete("/api/sosmed-links/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM sosmed_link WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.json({ message: "Sosmed link deleted successfully" });
    } else {
      res.status(404).json({ error: "Sosmed link not found" });
    }
  } catch (error) {
    console.error("Error deleting sosmed link:", error);
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

// Configure Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
}).readWrite;

// Modified checkAndEnableStreams function with Twitter integration
async function checkAndEnableStreams() {
  try {
    const now = DateTime.now().setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");

    // Get streams that should be enabled now
    const [streams] = await db.execute(
      `SELECT id, slug, event, title, session_name, event_type FROM streams 
       WHERE status = 'disable' 
         AND scheduled_enable_time IS NOT NULL 
         AND scheduled_enable_time <= ?
         AND (scheduled_disable_time IS NULL OR scheduled_disable_time > ?)`,
      [now, now]
    );

    if (streams.length > 0) {
      // Update streams to enabled
      await db.execute(
        `UPDATE streams SET status = 'enable' 
         WHERE status = 'disable' 
           AND scheduled_enable_time <= ?
           AND (scheduled_disable_time IS NULL OR scheduled_disable_time > ?)`,
        [now, now]
      );

      console.log(`Enabled ${streams.length} streams`);

      // Tweet about each enabled stream
      for (const stream of streams) {
        try {
          const tweetText = `Live streaming ${stream.session_name} ${stream.event} is ON! ${stream.event_type} https://racingstation.top/watch/${stream.slug}`;
          await twitterClient.v2.tweet(tweetText);
          console.log(`Tweeted about stream: ${stream.title}`);
        } catch (tweetError) {
          console.error("Error sending tweet:", tweetError);
        }
      }
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

// Auto transfer session function (unchanged)
async function autoTransferNextSession() {
  try {
    const now = DateTime.now().setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");

    // Find streams where current session has ended
    const [expiredStreams] = await db.execute(
      `SELECT id, slug, event, title, session_name, event_type, session_schedules 
       FROM streams 
       WHERE scheduled_disable_time IS NOT NULL 
         AND scheduled_disable_time <= ?`,
      [now]
    );

    console.log(`Found ${expiredStreams.length} streams with expired sessions`);

    // Process each expired stream
    for (const stream of expiredStreams) {
      try {
        // Parse session schedules if available
        let sessionSchedules = {};
        if (stream.session_schedules) {
          try {
            sessionSchedules = typeof stream.session_schedules === "string" ? JSON.parse(stream.session_schedules) : stream.session_schedules;
          } catch (error) {
            console.error(`Error parsing session schedules for stream ${stream.id}:`, error);
            continue;
          }
        } else {
          console.log(`No session schedules found for stream ${stream.id}`);
          continue;
        }

        // Determine session type based on event_type
        let categoryName = "other";
        if (stream.event_type === "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)") {
          categoryName = "f1";
        } else if (stream.event_type === "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)") {
          categoryName = "f1Sprint";
        } else if (stream.event_type === "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)") {
          categoryName = "motogp";
        }

        // Get ordered sessions from database
        const [sessions] = await db.execute(
          `
          SELECT s.session_name, s.session_order
          FROM sessions s
          JOIN event_categories ec ON s.category_id = ec.id
          WHERE ec.name = ? AND s.is_active = true
          ORDER BY s.session_order
        `,
          [categoryName]
        );

        if (sessions.length === 0) {
          console.log(`No active sessions found for category ${categoryName} for stream ${stream.id}`);
          continue;
        }

        // Find current session and get next one
        const currentSessionIndex = sessions.findIndex((s) => s.session_name === stream.session_name);

        if (currentSessionIndex === -1) {
          console.log(`Current session "${stream.session_name}" not found in database for stream ${stream.id}`);
          continue;
        }

        // Check if there's a next session
        const nextSessionIndex = currentSessionIndex + 1;
        if (nextSessionIndex >= sessions.length) {
          console.log(`No next session available for stream ${stream.id}, current session was the last one`);
          continue;
        }

        const nextSession = sessions[nextSessionIndex];
        console.log(`Found next session "${nextSession.session_name}" for stream ${stream.id}`);

        // Check if we have schedule data for the next session
        if (!sessionSchedules[categoryName] || !sessionSchedules[categoryName][nextSession.session_name]) {
          console.log(`No schedule data found for next session "${nextSession.session_name}" for stream ${stream.id}`);
          continue;
        }

        const nextSessionData = sessionSchedules[categoryName][nextSession.session_name];

        // Process times for database storage
        let startTime = null;
        let endTime = null;

        if (nextSessionData.startTime) {
          try {
            startTime = DateTime.fromISO(nextSessionData.startTime, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss");
          } catch (error) {
            console.error(`Error processing start time for stream ${stream.id}:`, error);
          }
        }

        if (nextSessionData.endTime) {
          try {
            endTime = DateTime.fromISO(nextSessionData.endTime, { zone: "Asia/Jakarta" }).toFormat("yyyy-MM-dd HH:mm:ss");
          } catch (error) {
            console.error(`Error processing end time for stream ${stream.id}:`, error);
          }
        }

        // Only update if we have both start and end times
        if (!startTime || !endTime) {
          console.log(`Missing start or end time for next session of stream ${stream.id}`);
          continue;
        }

        // Update the stream with the next session data
        await db.execute(
          `UPDATE streams SET 
            session_name = ?,
            scheduled_enable_time = ?,
            scheduled_disable_time = ?
          WHERE id = ?`,
          [nextSession.session_name, startTime, endTime, stream.id]
        );

        console.log(`Successfully updated stream ${stream.id} to next session "${nextSession.session_name}"`);

        // Check if new enable time is in the past but end time is in the future
        if (startTime <= now && endTime > now) {
          await db.execute(`UPDATE streams SET status = 'enable' WHERE id = ?`, [stream.id]);
          console.log(`Enabled stream ${stream.id} since its new session is currently active`);

          // Send tweet about newly enabled session
          try {
            const tweetText = `Live streaming ${nextSession.session_name} ${stream.event} is ON! ${stream.event_type} https://racingstation.top/watch/${stream.slug}`;
            await twitterClient.v2.tweet(tweetText);
            console.log(`Tweeted about newly enabled stream: ${stream.title} - ${nextSession.session_name}`);
          } catch (tweetError) {
            console.error("Error sending tweet:", tweetError);
          }
        }
      } catch (streamError) {
        console.error(`Error processing stream ${stream.id}:`, streamError);
      }
    }
  } catch (error) {
    console.error("Auto transfer session scheduler error:", error);
  }
}

// Jalankan scheduler SETELAH didefinisikan
scheduleJob("* * * * *", checkAndEnableStreams);
scheduleJob("* * * * *", checkAndDisableStreams);
setInterval(autoTransferNextSession, 30000);

console.log("All schedulers set up and running");

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
