import type { Request, Response } from "express";
import {
  getChildByIdService,
  listChildrenService,
} from "../services/children.service";
import { parseBoolean } from "../utils/parse-boolean";

export const listChildren = (req: Request, res: Response): void => {
  const bairro =
    typeof req.query.bairro === "string" ? req.query.bairro : undefined;
  const comAlertas = parseBoolean(
    typeof req.query.comAlertas === "string" ? req.query.comAlertas : undefined
  );
  const revisado = parseBoolean(
    typeof req.query.revisado === "string" ? req.query.revisado : undefined
  );

  const page = Math.max(Number(req.query.page ?? 1) || 1, 1);
  const pageSize = Math.min(Math.max(Number(req.query.pageSize ?? 10) || 10, 1), 100);
  const result = listChildrenService({
    bairro,
    comAlertas,
    revisado,
    page,
    pageSize,
  });

  res.status(200).json({
    items: result.items,
    pagination: result.pagination,
  });
};

export const getChildById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const child = getChildByIdService(id);

  if (!child) {
    res.status(404).json({
      message: "Child not found",
    });
    return;
  }

  res.status(200).json(child);
};

export const reviewChild = (_req: Request, res: Response): void => {
  res.status(501).json({
    message: "PATCH /children/:id/review not implemented yet",
  });
};
