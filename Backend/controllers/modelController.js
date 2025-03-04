const Model = require("../models/modelSchema");

// 📌 Get all models from MongoDB
const getModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Upload a new 3D model metadata
const uploadModel = async (req, res) => {
  try {
    const { name, description, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "Missing fields" });

    const newModel = new Model({ name, description, url });
    await newModel.save();

    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getModels, uploadModel };
