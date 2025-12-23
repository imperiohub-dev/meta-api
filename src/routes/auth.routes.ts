import { Router } from "express";
const router = Router();
import googleRoutes from "./google.routes.js";

router.use("/google", googleRoutes);
export default router;
