require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let conn; 

async function connectDB() {//Configure database connection
    try {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log("Connected to the database");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}


connectDB();// Call the function to establish the connection
app.get("/api/test-db", async (req, res) => {//Test connection
    try {
        const [results] = await conn.query("SELECT NOW() AS currentTime");

        res.json({ message: "Database connected successfully!", results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Root route
app.get("/", (req, res) => {
    res.send(`<h1 style='color: green; width: 100%; height: 70vh; text-align: center; font-size: 5rem; display: flex; justify-content: center; align-items: center;'>Server is Running...</h1>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
