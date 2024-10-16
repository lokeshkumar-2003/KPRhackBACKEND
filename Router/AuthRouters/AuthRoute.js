const express = require("express");
const { LoginUser } = require("../../controllers/AuthControllers/Login");
const { Register } = require("../../controllers/AuthControllers/Signup");
const router = express.Router();

router.post("/auth/login", LoginUser);

router.post("/auth/register", Register);

module.exports = router;
