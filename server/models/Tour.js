const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
