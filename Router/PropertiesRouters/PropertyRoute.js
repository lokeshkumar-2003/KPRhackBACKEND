const express = require("express");
const router = express.Router();
const {
  createProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/AddProperty.js");
const {
  editProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/EditProperty.js");

router.post("/property", createProperty);
router.put("/property/:propertyId", editProperty);

module.exports = router;
