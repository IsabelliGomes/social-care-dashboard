import type { Request, Response } from "express";
import { getSummaryService } from "../services/summary.service";

export const getSummary = (_req: Request, res: Response): void => {
  const summary = getSummaryService();

  res.status(200).json(summary);
};
