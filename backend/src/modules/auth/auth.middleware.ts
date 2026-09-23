import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../../utils/logger.js";
import { JWT_SECRET, NODE_ENV } from "../../config/index.js";

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
      stack: NODE_ENV === "production" ? undefined : error instanceof Error ? error.stack : undefined,
    });

    return res.status(401).json({ message: "Unauthorized" });
  }
}
