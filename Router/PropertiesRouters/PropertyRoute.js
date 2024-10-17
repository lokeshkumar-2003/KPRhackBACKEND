const express = require("express");
const router = express.Router();
const {
  createProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/AddProperty.js");
const {
  editProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/EditProperty.js");
const {
  AllProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/AllProperty.js");
const {
  getSingleProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/GetProperty.js");
const {
  deleteProperty,
} = require("../../controllers/AdminControllers/PropertyControllers/DeleteProperty.js");

router.post("/property", createProperty);
router.get("/property/:propertyId", getSingleProperty);
router.put("/property/:propertyId", editProperty);
router.get("/properties", AllProperty);
router.delete("/property/:propertyId", deleteProperty);

module.exports = router;
