ALTER TABLE "ibadas" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ibada-tracker_post" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ibada-tracker_post" ALTER COLUMN "updatedAt" SET NOT NULL;