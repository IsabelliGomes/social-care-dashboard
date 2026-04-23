import { Router } from "express";
import { getSummary } from "../controllers/summaryController";

export const summaryRouter = Router();

summaryRouter.get("/", getSummary);
