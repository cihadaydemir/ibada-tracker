import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { z } from "zod"

export const ibadaTypesRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ input }) => {
		return await db.query.ibadaTypes.findMany()
	}),
	getById: publicProcedure
		.input(
			z.object({
				ibadaTypeId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			return await db.query.ibadaTypes.findFirst({
				where: (table, { eq }) => eq(table.id, input.ibadaTypeId),
			})
		}),
})
