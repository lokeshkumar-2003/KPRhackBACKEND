const router = require("express").Router();
const {
  PieChartControllers,
} = require("../../controllers/AdminControllers/MatricsControllers/PieChartControllers");
const {
  BarChartDataController,
} = require("../../controllers/AdminControllers/MatricsControllers/BarChartControllers");

router.get("/analysis/pieChart", PieChartControllers);
router.get("/analysis/barChart", BarChartDataController);

module.exports = router;
