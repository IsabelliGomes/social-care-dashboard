import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/auth/auth.service";

export interface AuthRequest extends Request {
  user?: { preferred_username: string };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.slice(7);
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  req.user = payload;
  next();
};
