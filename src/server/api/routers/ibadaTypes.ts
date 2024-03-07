import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"

const authUserId = 1

export const ibadaTypesRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ input }) => {
		return await db.query.ibadaTypes.findMany()
	}),
})
