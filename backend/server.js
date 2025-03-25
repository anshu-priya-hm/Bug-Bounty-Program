require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

// Rate Limiting (prevents spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// Initialize SQLite Database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create reports table (if not exists)
db.run(
  `CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    bug_description TEXT NOT NULL,
    impact TEXT NOT NULL,
    file_path TEXT
  )`
);

// Configure Multer for File Uploads (Only PNG & JPEG)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG & JPEG files are allowed!"), false);
  }
};
const upload = multer({ storage, fileFilter });

// API Route to Submit a Bug Report
app.post("/api/submit-report", upload.single("file"), (req, res) => {
  const { name, email, bug_description, impact } = req.body;
  const filePath = req.file ? req.file.path : null;

  // Validate Input
  if (!name || !email || !bug_description || !impact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert into database
  db.run(
    `INSERT INTO reports (name, email, bug_description, impact, file_path) VALUES (?, ?, ?, ?, ?)`,
    [name, email, bug_description, impact, filePath],
    function (err) {
      if (err) {
        console.error("Error inserting report:", err.message);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ success: true, message: "Bug report submitted successfully!" });
    }
  );
});

// API Route to Get All Reports
app.get("/api/reports", (req, res) => {
  db.all("SELECT * FROM reports", [], (err, rows) => {
    if (err) {
      console.error("Error fetching reports:", err.message);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(rows);
  });
});
app.use("/uploads", express.static("uploads"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

