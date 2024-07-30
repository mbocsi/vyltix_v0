import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

// dotenv.config({
//   path: ".env.development.local",
// });
if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: ".env.dev.local" });
}

if (!process.env.POSTGRES_DB) throw new Error("POSTGRES_DB is not set");
if (!process.env.POSTGRES_USER) throw new Error("POSTGRES_USER is not set");
if (!process.env.POSTGRES_PASSWORD)
  throw new Error("POSTGRES_PASSWORD is not set");
if (!process.env.POSTGRES_PORT) throw new Error("POSTGRES_PORT is not set");
if (!process.env.POSTGRES_HOST) throw new Error("POSTGRES_HOST is not set");

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: "127.0.0.1",
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    ssl: false,
  },
} satisfies Config;
