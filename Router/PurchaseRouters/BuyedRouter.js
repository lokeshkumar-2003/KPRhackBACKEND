const router = require("express").Router();
const { BuyProperty } = require("../../controllers/BuyControllers/AddToBuy.js");

router.post("/property/buy/:userId/:propertyId", BuyProperty);

module.exports = router;
