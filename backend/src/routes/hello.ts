import { Router, Request, Response } from "express";
const router = Router();

/**
 * @openapi
 * /api/hello:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple greeting message.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, Tunahan! 👋 Backend is alive." });
});

export default router;
