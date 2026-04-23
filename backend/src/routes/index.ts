import { Router } from "express";
import { authRouter } from "./authRoutes";
import { childrenRouter } from "./childrenRoutes";
import { summaryRouter } from "./summaryRoutes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/children", childrenRouter);
apiRouter.use("/summary", summaryRouter);
