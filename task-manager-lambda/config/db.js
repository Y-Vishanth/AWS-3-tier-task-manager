const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);

    //process.exit(1); Used in the AWS Lambda function to prevent the function from exiting on error, allowing for better error handling and logging.
     throw error;
  }
};

module.exports = connectDB;
