import type { Config } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({
  path: ".env.development.local",
});

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
