const mongoose = require("mongoose");

const connectionDB = async (url) => {
  try {
    mongoose.connect("mongodb://localhost:27017/back");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};


module.exports = connectionDB;
