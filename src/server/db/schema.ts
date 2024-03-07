// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ibada-tracker_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const ibadaTypesEnum = pgEnum("ibada-types",[
  "PRAYER",
"FASTING",
"DJUMA",
"EID_PRAYER",
"QURAN"
])

export const users = pgTable("users",{
  id: integer("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
})


export const usersRelations = relations(users, ({ many }) => ({
  ibada: many(ibadas),
}));



export const ibadas = pgTable("ibadas",{
  id: text("id").primaryKey(),
  ibadaType: ibadaTypesEnum('ibada-types').notNull(),
  createdAt: timestamp("created_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull(),
  userId: integer("user_id").notNull().references(()=> users.id,{ onDelete: "cascade" })
})

export const createIbadasInputSchema = createInsertSchema(ibadas);
export const selectIbadasSchema = createSelectSchema(ibadas);

export const ibadaRelations = relations(ibadas, ({one})=>({
  user: one(users,{
    fields:[ibadas.userId],
    references:[users.id]
  })
}));

export const userScoreRelations = relations(users,({one})=>({
  scores: one(scores)
}))

export const scores = pgTable("scores",{
        userId: integer("user_id").notNull().references(()=> users.id,{ onDelete: "cascade" }),
        score: integer('score')

})
