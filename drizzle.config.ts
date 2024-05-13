import type { Config } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({
  path: ".env.development.local",
});

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;
