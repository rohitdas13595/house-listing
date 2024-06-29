import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "house_listings",
  password: "mysecretpassword",
  port: 5432,
});

const db = drizzle(pool, { schema });

const connection = pool.connect()
export { db, connection, pool };
