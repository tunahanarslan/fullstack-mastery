import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export async function connectDB(): Promise<void> {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI not found in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
}
