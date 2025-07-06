require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./server");
const verifyRoutes = require("./verifyv1");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", verifyRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Verification API Running</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(`Server on http://localhost:${process.env.PORT}`)
);
