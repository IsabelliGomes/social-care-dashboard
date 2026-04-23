import type { Request, Response } from "express";

export const getSummary = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "GET /summary not implemented yet",
  });
};
