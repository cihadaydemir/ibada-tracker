import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import type { NeonQueryFunction } from "@neondatabase/serverless"

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
