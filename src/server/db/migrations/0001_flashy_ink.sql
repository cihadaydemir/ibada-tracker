ALTER TABLE "scores" RENAME COLUMN "id" TO "userId";--> statement-breakpoint
ALTER TABLE "ibadas" DROP CONSTRAINT "ibadas_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "scores" DROP CONSTRAINT "scores_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "ibadas" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "ibadas" ADD COLUMN "userId" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibadas" ADD CONSTRAINT "ibadas_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scores" ADD CONSTRAINT "scores_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
