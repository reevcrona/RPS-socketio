import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);

export const checkDbConnection = async () => {
  try {
    await db.execute("SELECT 1");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
