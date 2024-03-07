import { env } from "@/env"
import { newId } from "@/utils"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { ibadaTypes } from "./schema"

const connection = postgres(env.DATABASE_URL)
const db = drizzle(connection)

async function seed() {
	console.log("🌱 Seeding started!")

	await db.insert(ibadaTypes).values([
		{
			id: newId("prayer"),
			name: "Fajr",
			type: "prayer",
			base_reward: 30,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			name: "Dhuhr",
			type: "prayer",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Asr",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Maghrib",
			base_reward: 10,
			mosque_bonus: 25,
		},
		{
			id: newId("prayer"),
			type: "prayer",
			name: "Isha",
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
			name: "Fasting",
			base_reward: 50,
		},
		{
			id: newId("prayer"),
			type: "other",
			name: "Memorizing",
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
