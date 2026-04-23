import type { Request, Response } from "express";

export const createToken = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "POST /auth/token not implemented yet",
  });
};
