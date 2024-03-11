ALTER TABLE "ibadas" RENAME COLUMN "ibada_type_id" TO "ibadaType_id";--> statement-breakpoint
ALTER TABLE "ibadas" DROP CONSTRAINT "ibadas_ibada_type_id_ibada_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ibadas" ADD CONSTRAINT "ibadas_ibadaType_id_ibada_types_id_fk" FOREIGN KEY ("ibadaType_id") REFERENCES "ibada_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
