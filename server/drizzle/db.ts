import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);
