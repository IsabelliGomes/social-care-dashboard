import type { Request, Response } from "express";
import {
  getChildByIdService,
  listChildrenService,
  reviewChildService,
} from "../services/children.service";
import { parseBoolean } from "../utils/parseBoolean";
import type { AuthRequest } from "../middlewares/auth.middleware";

export const listChildren = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bairro =
    typeof req.query.bairro === "string" ? req.query.bairro : undefined;
  const comAlertas = parseBoolean(
    typeof req.query.comAlertas === "string" ? req.query.comAlertas : undefined
  );
  const revisado = parseBoolean(
    typeof req.query.revisado === "string" ? req.query.revisado : undefined
  );

  const page = Math.max(Number(req.query.page ?? 1) || 1, 1);
  const pageSize = Math.min(
    Math.max(Number(req.query.pageSize ?? 10) || 10, 1),
    100
  );

  const result = await listChildrenService({
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

export const getChildById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const child = await getChildByIdService(id);

  if (!child) {
    res.status(404).json({ message: "Child not found" });
    return;
  }

  res.status(200).json(child);
};

export const reviewChild = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!req.user) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  const updated = await reviewChildService(id, req.user.preferred_username);

  if (!updated) {
    res.status(404).json({ message: "Child not found" });
    return;
  }

  res.status(200).json(updated);
};
