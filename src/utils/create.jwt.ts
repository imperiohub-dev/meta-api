import "dotenv/config";
import jwt from "jsonwebtoken";
import type { UserToken } from "../types/user";

const { JWT_SECRET } = process.env;

const createJWT = (user: UserToken): string => {
  return jwt.sign(user, JWT_SECRET as string, {
    expiresIn: "4h",
  });
};

export default createJWT;
