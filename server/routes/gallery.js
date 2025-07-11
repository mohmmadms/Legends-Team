const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

// Add a new image
router.post("/", async (req, res) => {
  try {
    const { title, url, category } = req.body;
    const image = new Gallery({ title, url, category });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: "Failed to add image" });
  }
});

// Delete image by ID
router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
