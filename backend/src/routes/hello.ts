import { Router, Request, Response } from "express";
const router = Router();

/**
 * @openapi
 * /api/hello:
 *   get:
 *     summary: Simple test endpoint
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Returns a greeting message
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello, Tunahan! 👋 Backend is alive." });
});

export default router;
