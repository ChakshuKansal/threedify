const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { getModels, uploadModel } = require("./controllers/modelController");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 📌 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 📌 Routes
app.get("/models", getModels);
app.post("/upload", uploadModel);

// 📌 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
