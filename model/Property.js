const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    profilePicture: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
); // Optional: add timestamps for when comments are created/updated

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
    bedrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    units: { type: Number, required: false },
    elevators: { type: Number, required: false },
    landArea: { type: Number, required: false },
    zoningType: { type: String, required: false },
    rooms: { type: Number, required: false },
    conferenceRoom: { type: Boolean, required: false },
    parkingSpots: { type: Number, required: false },
  },
  comments: [commentSchema], // Use the defined comment schema
  squareFootage: { type: Number, required: true },
  yearBuild: { type: Number, required: false },
  amenities: { type: [String], default: [] },
  status: { type: String, default: "available" },
  images: { type: [String], default: [] },
  additionalAttributes: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
