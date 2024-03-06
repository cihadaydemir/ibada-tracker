ALTER TABLE "ibadas" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "scores" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "ibadas" DROP CONSTRAINT "ibadas_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "scores" DROP CONSTRAINT "scores_userId_users_id_fk";
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
