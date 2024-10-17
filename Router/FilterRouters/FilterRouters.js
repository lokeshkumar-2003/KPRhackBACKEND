const router = require("express").Router();
const {
  FilterProperty,
} = require("../../controllers/FilterControllers/FilterControllers.js");

router.post("/property/filter", FilterProperty);

module.exports = router;
