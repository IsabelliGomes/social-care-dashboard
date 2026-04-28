import { Router } from "express";
import { getSummary } from "../controllers/summary.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const summaryRouter = Router();

summaryRouter.use(requireAuth);

summaryRouter.get("/", (req, res, next) => {
  Promise.resolve(getSummary(req, res)).catch(next);
});
