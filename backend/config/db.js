const mongoose = require("mongoose");

 const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (err) {
    console.log(`database connection failed: ${err}`);
  }
};

module.exports = {connectDB}