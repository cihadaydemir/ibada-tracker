// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { create } from "domain";
import { relations, sql } from "drizzle-orm";
import {
  PgColumn,
  PgTableWithColumns,
  index,
  integer,
  pgEnum,
  pgTable,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
})


export const usersRelations = relations(users, ({ many }) => ({
  ibada: many(ibadas),
}));


export const ibadas = pgTable("ibadas",{
  id: serial("id").primaryKey(),
  ibadaType: ibadaTypesEnum('ibada-types').notNull(),
  createdAt: timestamp("created_at")
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull(),
  userId: serial("user_id").notNull().references(()=> users.id,{ onDelete: "cascade" })
})


export const ibadaRelations = relations(ibadas, ({one})=>({
  user: one(users,{
    fields:[ibadas.userId],
    references:[users.id]
  })
}));

export const userScoreRelations = relations(users,({one})=>({
  score: one(scores)
}))

export const scores = pgTable("scores",{
        userId: serial("user_id").notNull().references(()=> users.id,{ onDelete: "cascade" }),
        score: integer('score')

})
