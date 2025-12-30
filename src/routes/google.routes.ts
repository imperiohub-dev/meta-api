import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import * as googleController from "../controllers/auth/google.controller.js";

const router = express.Router();

// /api/auth/google (OAuth flow para web/mobile con redirect)
router.get("/", googleController.googleAuth);

// /api/auth/google/callback (OAuth callback)
router.get("/callback", ...googleController.googleCallback);

// /api/auth/google/mobile (Autenticación directa con idToken para mobile/web)
router.post("/mobile", googleController.googleMobileAuth);

// Verificar autenticación
router.get("/me", authenticateToken, googleController.getMe);

// Failure
router.get("/failure", googleController.authFailure);

// Logout
router.post("/logout", googleController.logout);

export default router;
