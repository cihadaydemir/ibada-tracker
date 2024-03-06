import { migrate } from "drizzle-orm/postgres-js/migrator";
import { conn, db } from ".";

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: 'src/server/db/migrations/' });
// Don't forget to close the connection, otherwise the script will hang
await conn.end();