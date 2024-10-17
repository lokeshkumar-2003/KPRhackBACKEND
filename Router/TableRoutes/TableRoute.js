const router = require("express").Router();
const {
  transactionsTable,
} = require("../../controllers/AdminControllers/TabelControllers/transactionTableController.js");
const {
  userTableControllers,
} = require("../../controllers/AdminControllers/TabelControllers/userTableControllers.js");

router.get("/table/users", userTableControllers);
router.get("/table/transactions", transactionsTable);

module.exports = router;
