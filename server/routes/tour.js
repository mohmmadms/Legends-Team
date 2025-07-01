const express = require("express");
const Tour = require("../models/tour");

const router = express.Router();

// ➕ Create Tour
router.post("/", async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const saved = await newTour.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get All Tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete Tour
router.delete("/:id", async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✍️ Update Tour
router.put("/:id", async (req, res) => {
  try {
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get Single Tour (optional for details page)
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
