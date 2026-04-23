import { Router } from "express";
import { createToken } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/token", createToken);
