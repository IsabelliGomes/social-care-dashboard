import { Router } from "express";
import {
  getChildById,
  listChildren,
  reviewChild,
} from "../controllers/children.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const childrenRouter = Router();

childrenRouter.get("/", (req, res, next) => {
  Promise.resolve(listChildren(req, res)).catch(next);
});

childrenRouter.get("/:id", (req, res, next) => {
  Promise.resolve(getChildById(req, res)).catch(next);
});

childrenRouter.patch("/:id/review", requireAuth, (req, res, next) => {
  Promise.resolve(reviewChild(req, res)).catch(next);
});
