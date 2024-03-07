// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm"
import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const ibadaTypesEnum = pgEnum("ibada-types", ["prayer", "other"])

export const users = pgTable("users", {
	id: integer("id").primaryKey(),
	name: varchar("name", { length: 256 }),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	ibada: many(ibadas),
}))

export const ibadas = pgTable("ibadas", {
	id: text("id").primaryKey(),
	// ibadaType: ibadaTypesEnum("ibada-types").notNull(),
	ibadaTypeId: text("ibada_type_id")
		.references(() => ibadaTypes.id)
		.notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
})

export type Ibada = typeof ibadas.$inferSelect

export const createIbadasInputSchema = createInsertSchema(ibadas)
export const selectIbadasSchema = createSelectSchema(ibadas)

export const scores = pgTable("scores", {
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	score: integer("score").notNull(),
})

export const ibadaTypes = pgTable("ibada_types", {
	name: text("name").notNull(),
	id: text("id").primaryKey(),
	type: ibadaTypesEnum("type").notNull(),
	base_reward: integer("base_reward").notNull(),
	mosque_bonus: integer("mosque_bonus"),
})
export type IbadaType = typeof ibadaTypes.$inferSelect

export const ibadaRelations = relations(ibadas, ({ one }) => ({
	user: one(users, {
		fields: [ibadas.userId],
		references: [users.id],
	}),
	ibadaType: one(ibadaTypes, {
		fields: [ibadas.ibadaTypeId],
		references: [ibadaTypes.id],
	}),
}))

export const userScoreRelations = relations(users, ({ one }) => ({
	scores: one(scores),
}))

export const ibadaTypesSchema = createSelectSchema(ibadaTypes)
export type ScoreType = typeof scores.$inferSelect
