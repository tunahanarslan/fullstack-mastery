import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // fallback

export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); // ✅ token geçerliyse devam
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}
