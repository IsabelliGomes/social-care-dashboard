import { Router } from "express";
import { createToken } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/token", createToken);
