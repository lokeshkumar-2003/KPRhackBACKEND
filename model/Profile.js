const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },

  address: {
    type: String,
    required: false,
    trim: true,
  },
  savedSearches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Search",
      default: null,
    },
  ],
  bookMarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
  ],
  listedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
  ],
  notificationPreferences: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

profileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("Profile", profileSchema);

module.exports = User;
