import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(apiRouter);
