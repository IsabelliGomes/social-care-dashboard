import { Router } from "express";
import { authRouter } from "./auth.routes";
import { childrenRouter } from "./children.routes";
import { summaryRouter } from "./summary.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/children", childrenRouter);
apiRouter.use("/summary", summaryRouter);
