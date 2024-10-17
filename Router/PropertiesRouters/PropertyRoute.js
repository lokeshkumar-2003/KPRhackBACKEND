const express = require("express");
const router = express.Router();
const {
  createProperty,
} = require("../../controllers/PropertyControllers/AddProperty.js");
const {
  editProperty,
} = require("../../controllers/PropertyControllers/EditProperty.js");

router.post("/property/:userId", createProperty);
router.put("/property/:userId/:propertyId", editProperty);

module.exports = router;
