import passport from "passport";
import type { Request, Response } from "express";
import createJWT from "../../utils/createJwt.js";
import type { User, UserToken } from "../../types/user";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
  session: false,
});

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
    };
    const token = createJWT(userToToken);

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

    const redirect =
      process.env.FRONTEND_URL || "http://localhost:5173/auth/success";
    console.log("redirect", redirect);

    res.redirect(redirect);
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
