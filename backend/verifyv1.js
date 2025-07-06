const express = require("express");
const cors = require("cors")
const verifyApp = express();
const VERIFY_PORT = 5005;

verifyApp.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
verifyApp.use(express.json());

const { verifyCodeV1: handleVerifyCode } = require("./requestCode");

verifyApp.post("/api/verifyCode", handleVerifyCode);
verifyApp.get("/", (req, res) => {
    res.send(
        `<h1 style='color: green; width: 100%; height: 70vh; text-align: center; font-size: 5rem; display: flex; justify-content: center; align-items: center;'>Server for code verification is Running...</h1>`
    );
});

verifyApp.listen(VERIFY_PORT, () => {
  console.log(`Verify code server running on http://localhost:${VERIFY_PORT}`);
});