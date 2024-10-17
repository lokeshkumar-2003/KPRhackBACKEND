const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: { type: Date, default: Date.now },
  purchasePrice: { type: Number, required: true },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
