import "dotenv/config";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { UserToken } from "../types/user";

const { JWT_SECRET } = process.env;
// middleware/authenticateToken.ts (modificado)

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Intentar obtener el token del header (MÓVIL)
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  // 2. Intentar obtener el token de las cookies (WEB)
  const tokenFromCookie = req.cookies.token;

  // 3. Usar el que esté disponible
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    // Verificar el JWT
    const decoded = jwt.verify(token, JWT_SECRET as string) as UserToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
}
