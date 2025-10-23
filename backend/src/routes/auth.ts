import { Router, Request, Response } from "express";
import { AuthUser } from "../models/AuthUser.js";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// 🧾 Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await AuthUser.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const user = new AuthUser({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// 🔐 Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
