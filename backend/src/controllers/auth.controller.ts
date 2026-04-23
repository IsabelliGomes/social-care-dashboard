import type { Request, Response } from "express";
import { authenticateUser } from "../services/auth.service";

export const createToken = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const token = authenticateUser(email, password);

  if (!token) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.status(200).json({ token });
};
