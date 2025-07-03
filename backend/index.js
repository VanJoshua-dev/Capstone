require("dotenv").config();

//firebase
const { db } = require("./firebase"); 
const { addDoc, collection, serverTimestamp } = require("firebase/firestore");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

async function AuthCode(email, code) {
  try {
    const docRef = await addDoc(collection(db, "authCode"), { email, code,  createdAt: serverTimestamp() });
    console.log("User added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}


// Root route
app.get("/", (req, res) => {
 AuthCode("test@example.com", "123456");
  res.send(
    `<h1 style='color: green; width: 100%; height: 70vh; text-align: center; font-size: 5rem; display: flex; justify-content: center; align-items: center;'>Server is Running...</h1>`
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
