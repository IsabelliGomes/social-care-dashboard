import { Router } from "express";
import { getSummary } from "../controllers/summary.controller";

export const summaryRouter = Router();

summaryRouter.get("/", (req, res, next) => {
  Promise.resolve(getSummary(req, res)).catch(next);
});
