const express = require("express");

const router = express.Router();
const {
  AddProfile,
} = require("../../controllers/ProfileControllers/AddProfile.js");
const {
  UpdateProfile,
} = require("../../controllers/ProfileControllers/UpdateProfile.js");

router.post("/profile/:userId", AddProfile);
router.put("/profile/:userId", UpdateProfile);

module.exports = router;
