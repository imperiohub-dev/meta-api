import { Router } from "express";
const router = Router();
import googleRoutes from "./google.routes.js";
import * as googleController from "../controllers/auth/google.controller.js";

router.use("/google", googleRoutes);
router.use("/me", googleController.getMe);
router.use("/logout", googleController.logout);
export default router;
