// import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/backend/db/schema.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
  // url:`postgresql://postgres:mysecretpassword@localhost:5432/house_listings`,
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost",
    port: (process.env.DB_PORT ?? 5432) as number,
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? " ",
    database: process.env.DB_NAME ?? " ",
  },
} satisfies Config;
