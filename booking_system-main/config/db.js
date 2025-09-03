const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://instaclone:6EOUyarbinuGQe0z@cluster0.hh6xvjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
