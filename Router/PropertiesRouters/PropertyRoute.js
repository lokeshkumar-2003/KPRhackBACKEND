const express = require("express");
const router = express.Router();
const {
  createProperty,
} = require("../../controllers/PropertyControllers/AddProperty.js");

router.post("/property/:userId", createProperty);

module.exports = router;
