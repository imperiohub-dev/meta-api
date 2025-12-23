import "dotenv/config";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { UserToken } from "../types/user";

const { JWT_SECRET } = process.env;

// Middleware para verificar token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  jwt.verify(token, JWT_SECRET as string, (err: unknown, user: unknown) => {
    if (err) {
      return res.status(401).json({ authenticated: false });
    }
    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    req.user = user as UserToken;
    next();
  });
}

export default authenticateToken;
