import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { scores } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export const scoresRouter = createTRPCRouter({
	getScore: protectedProcedure.query(async ({ ctx }) => {
		const score = await db.query.scores.findFirst({
			where: eq(scores.userId, ctx.user.id),
		})

		return score
	}),
})
