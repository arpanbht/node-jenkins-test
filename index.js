// index.js
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

// Initialize Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
const temp = [];

// Health check endpoint
app.get("/", (_, res) => {
  res.status(200).json({ message: "Server is healthy v4.0 🙌" });
});

// TEST endpoints
app.get("/data", (_, res) => {
  res.status(200).json({ message: "Data retrieved successfully", data: temp });
});

app.post("/data", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newData = { id: uuidv4(), name, email };
  temp.push(newData);
  res.status(201).json({ message: "Data added successfully", data: newData });
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  const index = temp.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Data not found" });
  }

  temp.splice(index, 1);
  res.status(200).json({ message: "Data deleted successfully" });
});

app.get("/data/:id", (req, res) => {
  const { id } = req.params;
  const dataItem = temp.find((item) => item.id === id);

  if (!dataItem) {
    return res.status(404).json({ message: "Data not found" });
  }

  res
    .status(200)
    .json({ message: "Data retrieved successfully", data: dataItem });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
