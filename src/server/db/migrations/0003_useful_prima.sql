ALTER TYPE "ibada-types" ADD VALUE 'prayer';--> statement-breakpoint
ALTER TYPE "ibada-types" ADD VALUE 'other';--> statement-breakpoint
DROP TABLE "prayer_types";--> statement-breakpoint
ALTER TABLE "ibada_types" DROP CONSTRAINT "ibada_types_prayer_type_id_prayer_types_id_fk";
--> statement-breakpoint
ALTER TABLE "ibada_types" ALTER COLUMN "base_reward" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ibadas" ALTER COLUMN "ibada_type_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ALTER COLUMN "score" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ibada_types" ADD COLUMN "type" "ibada-types" NOT NULL;--> statement-breakpoint
ALTER TABLE "ibada_types" ADD COLUMN "mosque_bonus" integer;--> statement-breakpoint
ALTER TABLE "ibada_types" DROP COLUMN IF EXISTS "prayer_type_id";