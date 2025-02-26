const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// Fetch 20 users
app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=20");
    const data = await response.json();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch single user
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const user = await response.json();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = app; // ✅ Export the Express app for Vercel
