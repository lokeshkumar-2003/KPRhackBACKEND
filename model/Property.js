const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    type: {
      type: String, // 'Point' for 2D
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    locationName: { type: String, required: true },
    locationAddress: { type: String, required: true },
  },
  type: { type: String, required: true },
  features: { type: [String], default: [] },
  squareFootage: { type: Number, required: true },
  yearBuild: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  additionalAttributes: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create 2D index for GeoJSON location
propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
