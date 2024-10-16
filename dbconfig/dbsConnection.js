const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_CONNSTR } = process.env;

// Log the connection string to verify it's correct
console.log("MongoDB Connection String:", MONGODB_CONNSTR);

const DBConnection = () => {
  mongoose
    .connect(MONGODB_CONNSTR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully....");
    })
    .catch((err) => {
      console.log("Something went wrong while connecting to database....");
      console.log("Error message:", err.message); // Log error message
      console.log("Error details:", err); // Log the full error object
    });
};

module.exports = DBConnection;
