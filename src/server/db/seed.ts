import { env } from "@/env"
import { newId } from "@/utils"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import { ibadaTypes } from "./schema"

const sql = neon(env.DATABASE_URL)
const db = drizzle(sql, {
	schema,
})

async function seed() {
	console.log("🌱 Seeding started!")
	await db.delete(ibadaTypes)
	await db.insert(ibadaTypes).values([
		{
			id: newId("prayer"),
			name: "Sabah",
			type: "prayer",
			base_reward: 30,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			name: "Öğle",
			type: "prayer",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Ikindi",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Akșam",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Yatsı",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Teravih",
			base_reward: 30,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Cuma",
			base_reward: 50,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Eid",
			base_reward: 100,
		},
		{
			id: newId("prayer"),
			type: "other",
			name: "Mukabele",
			base_reward: 50,
		},
		{
			id: newId("prayer"),
			type: "other",
			name: "Oruç",
			base_reward: 50,
		},
		{
			id: newId("prayer"),
			type: "other",
			name: "Ezber",
			base_reward: 50,
		},
	])
}
seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(() => {
		console.log("✅ Seeding done!")
		process.exit(0)
	})
