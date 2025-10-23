import { Router } from "express";
import helloRoute from "./hello.js";
import userRoute from "./user.js";
import authRoutes from "./auth.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/hello", helloRoute);
router.use("/users", userRoute);

export default router;
