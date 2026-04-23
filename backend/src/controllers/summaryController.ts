import type { Request, Response } from "express";
import { getSummaryService } from "../services/summaryService";

export const getSummary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const summary = await getSummaryService();
  res.status(200).json(summary);
};
