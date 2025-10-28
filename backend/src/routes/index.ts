import { Router } from "express";
import helloRoute from "./hello.js";
import userRoute from "./user.js";
import authRoute from "./auth.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Hello
 *     description: Simple test endpoint
 *   - name: Auth
 *     description: Authentication routes
 *   - name: Users
 *     description: CRUD user management
 */

router.use("/hello", helloRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;
