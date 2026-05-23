import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // `drizzle-kit generate` is offline — empty string is fine.
    // `db:migrate` / `db:studio` need a real DATABASE_URL in .env.
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});
