const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path to users.json
const usersFilePath = path.join(__dirname, "users.json");

// GET all users
app.get("/api/users", (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to read users.json" });
    }
});

// POST a new user
app.post("/api/users", (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        const newUser = req.body;
        newUser.id = users.length + 1;
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to write to users.json" });
    }
});

app.put("/api/users/:id", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return res.status(404).json({ error: "User not found" });

    users[index] = { ...users[index], ...updatedUser };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json(users[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
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
