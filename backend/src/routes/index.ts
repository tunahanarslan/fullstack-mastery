import { Router } from "express";
import helloRoute from "./hello";
import userRoute from "./user";

const router = Router();

// tüm route’ları tek yerden dışa aktar
router.use(helloRoute);
router.use(userRoute);

export default router;
