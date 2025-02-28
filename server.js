import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());


const PORT = 8080;

// Fetch users from DummyJSON API
app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/users?limit=20");
    res.json(response.data.users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Fetch user by ID
app.get("/api/users/:id", async (req, res) => {
  
  try {
    const response = await axios.get(`https://dummyjson.com/users/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;