// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm"
import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const ibadaTypesEnum = pgEnum("ibada-types", ["prayer", "other"])

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: varchar("name", { length: 256 }),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const ibadaTypes = pgTable("ibada_types", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	type: ibadaTypesEnum("type").notNull(),
	base_reward: integer("base_reward").notNull(),
	mosque_bonus: integer("mosque_bonus").default(0).notNull(),
})

export const ibadas = pgTable("ibadas", {
	id: text("id").primaryKey(),
	ibadaTypeId: text("ibadaTypes_id")
		.references(() => ibadaTypes.id)
		.notNull(),
	inMosque: boolean("inMosque"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
})

export const scores = pgTable("scores", {
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	score: integer("score").notNull(),
})
export type Ibada = typeof ibadas.$inferSelect

export const createIbadasInputSchema = createInsertSchema(ibadas).partial().pick({ ibadaTypeId: true, inMosque: true })
export const selectIbadasSchema = createSelectSchema(ibadas)
export const createUserInputSchema = createInsertSchema(users)
export type IbadaType = typeof ibadaTypes.$inferSelect

export const ibadaRelations = relations(ibadas, ({ one }) => ({
	user: one(users, {
		fields: [ibadas.userId],
		references: [users.id],
	}),
}))

export const ibadaTypeRelations = relations(ibadaTypes, ({ many }) => ({
	ibada: many(ibadaTypes),
}))

export const ibadaTypesSchema = createSelectSchema(ibadaTypes)
export type ScoreType = typeof scores.$inferSelect

export const usersRelations = relations(users, ({ many, one }) => ({
	ibada: many(ibadas),
	score: one(scores),
}))
