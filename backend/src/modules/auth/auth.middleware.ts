import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../../utils/logger.js";

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
    logger.warn("Unauthorized access attempt: token missing", {
      path: req.path,
      method: req.method,
    });
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = payload;
    return next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid token";

    logger.error("Unauthorized access attempt: invalid token", {
      path: req.path,
      method: req.method,
      reason: message,
      stack: process.env.NODE_ENV === "production" ? undefined : error instanceof Error ? error.stack : undefined,
    });

    return res.status(401).json({ message: "Unauthorized" });
  }
}
