const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo Error:");
    console.error(error);
  }
};

module.exports = connectDB;