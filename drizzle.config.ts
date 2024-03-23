import { config } from "dotenv"
import type { Config } from "drizzle-kit"

config({ path: process.env.ENV_FILE })

const env = process.env
console.log("DATABASE_URL", env.DATABASE_URL!)
export default {
	schema: "./src/server/db/schema.ts",
	out: "./src/server/db/migrations/",
	driver: "pg",
	dbCredentials: {
		connectionString: env.DATABASE_URL!,
	},
	tablesFilter: ["ibada-tracker_*"],
} satisfies Config
