import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import * as googleController from "../controllers/auth/google.controller.js";

const router = express.Router();

// /api/auth/google
router.get("/google", googleController.googleAuth);

// /api/auth/google/callback
router.get("/google/callback", ...googleController.googleCallback);

// Verificar autenticación
router.get("/me", authenticateToken, googleController.getMe);

// Failure
router.get("/failure", googleController.authFailure);

// Logout
router.post("/logout", googleController.logout);

export default router;
