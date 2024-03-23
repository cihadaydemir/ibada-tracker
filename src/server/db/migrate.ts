import { drizzle } from "drizzle-orm/neon-http"
import { type NeonQueryFunction, neon } from "@neondatabase/serverless"
import { migrate } from "drizzle-orm/neon-http/migrator"
import { config } from "dotenv"
// import { env } from "@/env"

config({ path: process.env.ENV_FILE })

const env = process.env
console.log("DATABASE_URL", env.DATABASE_URL!)
const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL!)
const db = drizzle(sql)

const main = async () => {
	try {
		await migrate(db, { migrationsFolder: "./src/server/db/migrations" })

		console.log("Migration completed")
	} catch (error) {
		console.error("Error during migration:", error)

		process.exit(1)
	}
}

main()
