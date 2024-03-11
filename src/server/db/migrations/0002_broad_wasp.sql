ALTER TABLE "ibadas" RENAME COLUMN "ibadaType_id" TO "ibadaTypes_id";--> statement-breakpoint
ALTER TABLE "ibadas" DROP CONSTRAINT "ibadas_ibadaType_id_ibada_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibadas" ADD CONSTRAINT "ibadas_ibadaTypes_id_ibada_types_id_fk" FOREIGN KEY ("ibadaTypes_id") REFERENCES "ibada_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
