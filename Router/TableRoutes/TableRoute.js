const router = require("express").Router();
const {
  userTableControllers,
} = require("../../controllers/AdminControllers/TabelControllers/userTableControllers.js");

router.get("/table/users", userTableControllers);

module.exports = router;
