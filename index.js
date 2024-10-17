const express = require("express");
const app = express();
const cors = require("cors");
const DBConnection = require("./dbconfig/dbsConnection");
const AuthRouter = require("./Router/AuthRouters/AuthRoute.js");
const ProfileRouter = require("./Router/ProfileRouters/ProfileRoute.js");
const PropertyRouter = require("./Router/PropertiesRouters/PropertyRoute.js");
const FilterRouter = require("./Router/FilterRouters/FilterRouters.js");
const MatricsRouter = require("./Router/MetricsRouters/MetricsRouters.js");
const CommentRouter = require("./Router/CommantRouter/CommentRouter.js");
const BuyedRouter = require("./Router/PurchaseRouters/BuyedRouter.js");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Use API routes
app.use("/api", AuthRouter);
app.use("/api", ProfileRouter);
app.use("/api", PropertyRouter);
app.use("/api", FilterRouter);
app.use("/api", MatricsRouter);
app.use("/api", CommentRouter);
app.use("/api", BuyedRouter);

// Start the server
app.listen(process.env.PORT, () => {
  DBConnection();
  console.log(`Server running on port ${process.env.PORT}`);
});
