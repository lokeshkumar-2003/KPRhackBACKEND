const router = require("express").Router();
const {
  PieChartControllers,
} = require("../../controllers/AdminControllers/MatricsControllers/PieChartControllers");

router.get("/analysis/pieChart", PieChartControllers);

module.exports = router;
