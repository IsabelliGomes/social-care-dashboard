import { readFileSync } from "node:fs";
import path from "node:path";
import { app } from "./app";
import { db } from "./db/client";
import { runSeed } from "./db/seed";

const port = Number(process.env.PORT ?? 3001);

const start = async (): Promise<void> => {
  const schemaPath = path.resolve(__dirname, "./db/schema.sql");
  await db.query(readFileSync(schemaPath, "utf-8"));

  await runSeed();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on http://localhost:${port}`);
  });
};

start();
