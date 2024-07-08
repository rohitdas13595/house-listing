// import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, connection, pool } from './connection';

// This will run migrations on the database, skipping the ones already applied
// await migrate(db, { migrationsFolder: './drizzle' });

// Don't forget to close the connection, otherwise the script will have a memory leak


export  function  runMigrations() {
    return migrate(db, { migrationsFolder: './src/drizzle', });
}

// pool.end();

