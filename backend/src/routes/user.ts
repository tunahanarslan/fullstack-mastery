import { Router, Request, Response } from "express";
const router = Router();

/**
 * @openapi
 * /api/user:
 *   post:
 *     summary: Create user
 *     description: Creates a new user with name and email.
 */
router.post("/user", (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ success: false, message: "Missing fields" });

  res.status(201).json({ success: true, user: { id: 1, name, email } });
});

/**
 * @openapi
 * /api/user/{id}:
 *   put:
 *     summary: Update user info
 *     description: Update user's name/email.
 */
router.put("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email)
    return res
      .status(400)
      .json({ success: false, message: "Provide at least one field" });

  const updatedUser = {
    id,
    name: name || "Old Name",
    email: email || "old@example.com",
  };

  res.json({ success: true, user: updatedUser });
});

/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Removes a user.
 */
router.delete("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id !== "1")
    return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, message: `User with ID ${id} deleted` });
});

export default router;
