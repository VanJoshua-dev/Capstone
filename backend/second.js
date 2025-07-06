// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql2/promise");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // database connection
// let conn;

// async function connectDB() {
//     try {
//         conn = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             database: process.env.DB_NAME,
//             port: process.env.DB_PORT,
//             ssl: {
//                 rejectUnauthorized: false  // ✅ FIXED: allow self-signed certs in dev
//             }
//         });

//         console.log("Connected to the database");
//     } catch (err) {
//         console.error("Database connection failed:", err);
//     }
// }

// connectDB();

// // configure mail sender
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT || 587,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// // test DB connection
// app.get("/api/test-db", async (req, res) => {
//     try {
//         const [results] = await conn.query("SELECT NOW() AS currentTime");
//         res.json({ message: "Database connected successfully!", results });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // root route
// app.get('/', (req, res) => {
//     res.send(`<h1 style='color: green; width: 100%; height: 70vh; text-align: center; font-size: 5rem; display: flex; justify-content: center; align-items: center;'>Second server is Running...</h1>`);
// });

// app.listen(5001, () => {
//     console.log("Second server is running on port http://localhost:5001");
// });