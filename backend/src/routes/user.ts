import { Router, Request, Response } from "express";
import { User } from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: CRUD operations for users
 */

// 🔐 Protect all routes
router.use(authMiddleware);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 */
router.get("/", async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 */
router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 */
router.put("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
});

export default router;
