import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || "";
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
export const API_BASE = process.env.API_BASE || "/api";
