const express = require("express");
const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const auth = require("../middleware/auth");
const router = express.Router();

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    const tour = await Tour.findById(req.body.tour);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const booking = new Booking({
      ...req.body,
      user: req.user._id,
      totalPrice: tour.price * req.body.participants,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's bookings
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "tour"
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single booking
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("tour");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel booking
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        status: { $ne: "cancelled" },
      },
      { status: "cancelled" },
      { new: true }
    ).populate("tour");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;