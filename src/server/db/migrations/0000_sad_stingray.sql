DO $$ BEGIN
 CREATE TYPE "ibada-types" AS ENUM('PRAYER', 'FASTING', 'DJUMA', 'EID_PRAYER', 'QURAN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ibada_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"base_reward" integer,
	"prayer_type_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ibadas" (
	"id" text PRIMARY KEY NOT NULL,
	"ibada_type_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prayer_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"base_reward" integer,
	"moseque_bonus" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scores" (
	"user_id" integer NOT NULL,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibada_types" ADD CONSTRAINT "ibada_types_prayer_type_id_prayer_types_id_fk" FOREIGN KEY ("prayer_type_id") REFERENCES "prayer_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibadas" ADD CONSTRAINT "ibadas_ibada_type_id_ibada_types_id_fk" FOREIGN KEY ("ibada_type_id") REFERENCES "ibada_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibadas" ADD CONSTRAINT "ibadas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scores" ADD CONSTRAINT "scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
