import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "../../apps/server/.env",
});

export default defineConfig({
  schema: "./src/schema",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  schemaFilter: ["public", "auth"],
  migrations: {
    table: "db_migrations",
    schema: "public",
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
