// connectDB.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env file in local dev (on Render, env vars are set in dashboard)
dotenv.config();

const connectDB = async () => {
  try {
    // Fail fast if env var is missing
    if (!process.env.MONGO_URL) {
      console.error("❌ MONGO_URL is not defined in environment variables.");
      process.exit(1);
    }

    // Mongo connection
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error(`❌ Error in MongoDB connection: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
