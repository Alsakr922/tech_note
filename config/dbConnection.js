const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};


module.exports = connectionDB;
