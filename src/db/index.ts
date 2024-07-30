export {
  events,
  artists,
  venues,
  sections,
  artistsToEvents,
  tickets,
} from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({ path: ".env.dev" });

if (!process.env.POSTGRES_DB) throw new Error("POSTGRES_DB is not set");
if (!process.env.POSTGRES_USER) throw new Error("POSTGRES_USER is not set");
if (!process.env.POSTGRES_PASSWORD)
  throw new Error("POSTGRES_PASSWORD is not set");
if (!process.env.POSTGRES_PORT) throw new Error("POSTGRES_PORT is not set");
if (!process.env.POSTGRES_HOST) throw new Error("POSTGRES_HOST is not set");

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

client.connect();
export const db = drizzle(client, { schema });
