const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    locationName: { type: String, required: true },
    locationAddress: { type: String, required: true },
  },
  type: {
    type: String,
    required: true,
    enum: ["Complex", "House", "Land", "Office"],
  },
  features: {
    bedrooms: { type: Number, required: false }, // For House
    bathrooms: { type: Number, required: false }, // For House
    units: { type: Number, required: false }, // For Complex
    elevators: { type: Number, required: false }, // For Complex
    landArea: { type: Number, required: false }, // For Land
    zoningType: { type: String, required: false }, // For Land
    rooms: { type: Number, required: false }, // For Office
    conferenceRoom: { type: Boolean, required: false }, // For Office
    parkingSpots: { type: Number, required: false }, // For all types if applicable
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
    },
  ],
  squareFootage: { type: Number, required: true },
  yearBuild: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  additionalAttributes: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
