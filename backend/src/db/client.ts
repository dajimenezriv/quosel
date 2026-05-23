import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

// `prepare: false` is required when connecting through Supabase's
// transaction-mode pooler (port 6543). Safe to keep for direct connections too.
const queryClient = postgres(url, { prepare: false });

export const db = drizzle(queryClient, { schema });
