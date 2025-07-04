import type { Config } from "drizzle-kit";

export default {
  schema: "./server/drizzle/schema.ts",
  out: "./server/drizzle/migrations",
  dialect: "postgresql",
} satisfies Config;
