require("dotenv").config();

const { db } = require("./firebase");
const sendVerificationCode = require("./sendCode");
const {
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} = require("firebase/firestore");

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

// Generate 6-digit code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Sends verification code and sets cookies
 */
const requestCode = async (email, res) => {
  const code = generateCode();
  const authId = uuidv4();

  try {
    // Store in Firestore
    await setDoc(doc(db, "authCode", authId), {
      email,
      code,
      createdAt: serverTimestamp(),
    });

    // Set cookies manually
    res.setHeader("Set-Cookie", [
      cookie.serialize("email", email, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 300,
        path: "/",
      }),
      cookie.serialize("authId", authId, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 300,
        path: "/",
      }),
    ]);

    // Send code via email
    sendVerificationCode(email, code);
    console.log(`Verification code sent to ${email}: ${code}`);
    console.log(`[${new Date().toISOString()}] Code verified for ${email}`);
    return;

  } catch (error) {
    console.error("Error generating code:", error);
    throw new Error("Failed to generate code.");
  }
};

/**
 * Verifies the code sent by user
 */
const verifyCodeV1 = async (req, res) => { // Verification for login
  const { code } = req.body;
  // Get the email and authID from cookie
  const email = req.cookies?.email;
  const authId = req.cookies?.authId;

  if (!email || !authId) {
    return res.status(400).json({ error: "Missing cookie data." });
  }

  try {
    const codeRef = doc(db, "authCode", authId);
    const codeSnap = await getDoc(codeRef);

    if (!codeSnap.exists()) {
      return res.status(404).json({ error: "No verification entry found." });
    }

    const data = codeSnap.data();

    if (data.email !== email) {
      return res.status(403).json({ error: "Email does not match." });
    }

    if (data.code !== code) {
      return res.status(401).json({ error: "Invalid verification code." });
    }

    await deleteDoc(codeRef);
    return res.status(200).json({ message: "Code verified successfully." });

  } catch (error) {
    console.error("Code verification error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { requestCode, verifyCodeV1 };
