import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { scores } from "@/server/db/schema"
import { eq } from "drizzle-orm"

const authUserId = 1

export const scoresRouter = createTRPCRouter({
	getScore: publicProcedure.query(async ({ input }) => {
		return await db.query.scores.findFirst({
			where: eq(scores.userId, authUserId),
		})
	}),
})
