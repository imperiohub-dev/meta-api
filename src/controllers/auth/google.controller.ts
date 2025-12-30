import passport from "passport";
import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import createJWT from "../../utils/create.jwt.js";
import type { User, UserToken, GoogleMobileAuthDto } from "../../types/user";
import { userDb } from "../../db/index.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_MOBILE);

export const googleAuth = (req: Request, res: Response, next: any) => {
  // Capturar el redirect_uri que envía la app móvil
  const redirectUri = req.query.redirect_uri as string;

  console.log("🔵 [googleAuth] redirect_uri recibido:", redirectUri);

  // Guardar el redirect_uri en el state de OAuth
  // Google preserva el state y lo devuelve en el callback
  const state = redirectUri
    ? Buffer.from(JSON.stringify({ redirect_uri: redirectUri })).toString(
        "base64"
      )
    : undefined;

  console.log("🔵 [googleAuth] state generado:", state);

  // Continuar con el flujo normal de Google OAuth
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
    state, // Google preserva esto y lo devuelve en el callback
  })(req, res, next);
};

export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  async (req: Request, res: Response) => {
    const user = req.user as User;
    if (!user) {
      return res.status(500).json({ error: "algo salio mal con la auth" });
    }

    const userToToken: UserToken = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      picture: user.picture,
    };
    const token = createJWT(userToToken);

    // Recuperar el redirect_uri del state de OAuth
    let customRedirectUri: string | null = null;
    const state = req.query.state as string;

    console.log("🟢 [googleCallback] state recibido de Google:", state);

    if (state) {
      try {
        const decoded = JSON.parse(
          Buffer.from(state, "base64").toString("utf-8")
        );
        customRedirectUri = decoded.redirect_uri;
        console.log(
          "🟢 [googleCallback] redirect_uri decodificado:",
          customRedirectUri
        );
      } catch (error) {
        console.error("🔴 [googleCallback] Error decoding state:", error);
      }
    }

    // Determinar la URL de redirección
    const defaultRedirect =
      process.env.FRONTEND_URL || "http://192.168.178.28:5173/auth/success";
    const redirectUrl = customRedirectUri || defaultRedirect;

    console.log("🟢 [googleCallback] redirectUrl final:", redirectUrl);

    // Si es un deep link (app móvil), redirigir con el token en la URL
    if (
      redirectUrl.startsWith("imperiohubapp://") ||
      redirectUrl.includes("://")
    ) {
      // Para apps móviles, pasar el token como query param
      const separator = redirectUrl.includes("?") ? "&" : "?";
      const finalUrl = `${redirectUrl}${separator}token=${token}&success=true`;
      console.log("🟢 [googleCallback] Redirigiendo a app móvil:", finalUrl);
      return res.redirect(finalUrl);
    }

    // Para web, usar cookies como antes
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.COOKIE_DOMAIN
          : undefined,
      maxAge: 4 * 60 * 60 * 1000,
    });

    console.log("🟢 [googleCallback] Redirigiendo a web:", redirectUrl);
    res.redirect(redirectUrl);
  },
];

export const getMe = (req: Request, res: Response) => {
  res.json({
    success: true,
    authenticated: true,
    user: req.user,
  });
};

export const authFailure = (_req: Request, res: Response) => {
  res.status(401).send("Fallo autenticando con Google");
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true });
};

export const googleMobileAuth = async (req: Request, res: Response) => {
  try {
    const { idToken, user: userInfo } = req.body as GoogleMobileAuthDto;

    if (!idToken || !userInfo) {
      return res.status(400).json({
        error: "idToken y user son requeridos",
      });
    }

    // Validar el idToken con Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID_MOBILE,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    // Extraer información del payload validado
    const googleId = payload.sub;
    const email = payload.email;

    if (!email) {
      return res.status(400).json({
        error: "Email no encontrado en el token de Google",
      });
    }

    // Crear o actualizar usuario (upsert directo por email)
    const user = await userDb.upsertByEmail({
      email,
      nombre: userInfo.name,
      picture: userInfo.picture,
      googleId,
    });

    // Generar JWT
    const userToToken: UserToken = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      picture: user.picture || undefined,
    };
    const token = createJWT(userToToken);

    // Devolver token y usuario
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error en googleMobileAuth:", error);
    return res.status(500).json({
      error: "Error al autenticar con Google",
    });
  }
};
