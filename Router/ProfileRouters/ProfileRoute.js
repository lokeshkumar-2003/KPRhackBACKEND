const express = require("express");

const router = express.Router();
const {
  AddProfile,
} = require("../../controllers/ProfileControllers/AddProfile.js");
const {
  UpdateProfile,
} = require("../../controllers/ProfileControllers/UpdateProfile.js");
const {
  getProfile,
} = require("../../controllers/ProfileControllers/GetProfile.js");

router.post("/profile/:userId", AddProfile);
router.get("/profile/:userId", getProfile);
router.put("/profile/:userId", UpdateProfile);

module.exports = router;
