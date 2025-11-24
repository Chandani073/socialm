import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database connected"));

    await mongoose.connect(process.env.MONGODB_URL); // No options needed

  } catch (error) {
    console.log("Database connection error:", error.message);
  }
};

export default connectDB;
