import { Router } from "express";
import {
  getChildById,
  listChildren,
  reviewChild,
} from "../controllers/childrenController";
import { requireAuth } from "../middlewares/authMiddleware";

export const childrenRouter = Router();

childrenRouter.get("/", listChildren);
childrenRouter.get("/:id", getChildById);
childrenRouter.patch("/:id/review", requireAuth, reviewChild);
