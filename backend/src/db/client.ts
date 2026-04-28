import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const useSsl = process.env.DATABASE_SSL === "true";

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});
