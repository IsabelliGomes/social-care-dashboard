import { Router } from "express";
import {
  getChildById,
  listChildren,
  reviewChild,
} from "../controllers/children.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const childrenRouter = Router();

childrenRouter.get("/", listChildren);
childrenRouter.get("/:id", getChildById);
childrenRouter.patch("/:id/review", requireAuth, reviewChild);
