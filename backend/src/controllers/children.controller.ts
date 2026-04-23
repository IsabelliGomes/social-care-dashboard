import type { Request, Response } from "express";

export const listChildren = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "GET /children not implemented yet",
  });
};

export const getChildById = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "GET /children/:id not implemented yet",
  });
};

export const reviewChild = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "PATCH /children/:id/review not implemented yet",
  });
};
