require("dotenv").config();

//firebase
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
const {requestCode} = require("./requestCode")
const { verifyCodeV1: handleVerifyCode } = require("./requestCode");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 5003;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Create the MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test DB connection endpoint
app.get("/api/test-db", async (req, res) => {
    try {
        const [results] = await pool.query("SELECT NOW() AS currentTime");
        res.json({ message: "Database connected successfully!", results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const employee = rows[0];

    // Delegate response handling to requestCode
    await requestCode(employee.email, res)
   return res.status(200).json({ message: "Verification code sent.", employee });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/verify-code", handleVerifyCode);


// Root route
app.get("/", (req, res) => {
    res.send(
        `<h1 style='color: green; width: 100%; height: 70vh; text-align: center; font-size: 5rem; display: flex; justify-content: center; align-items: center;'>Server is Running...</h1>`
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
