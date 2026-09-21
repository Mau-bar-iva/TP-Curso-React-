import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está definido. Añade la variable de entorno en backend/.env`);
  }

  return value;
}

const JWT_SECRET = getRequiredEnv("JWT_SECRET");

export interface AuthenticatedUser {
  id: number;
  email: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token as string | undefined;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = payload;
    next();
  } catch {
    return res.status(401).send("Unauthorized");
  }
}
