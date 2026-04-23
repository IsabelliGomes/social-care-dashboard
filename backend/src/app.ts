import express from "express";
import { apiRouter } from "./routes/index";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(apiRouter);
