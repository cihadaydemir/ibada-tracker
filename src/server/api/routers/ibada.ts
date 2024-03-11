import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { createIbadasInputSchema, ibadas, scores } from "@/server/db/schema"
import { newId } from "@/utils"
import { desc, eq } from "drizzle-orm"

const authUserId = 1

export const ibadaRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ input }) => {
		//TODO replace with authenticated user later:
		return await db.query.ibadas.findMany({
			where: eq(ibadas.userId, authUserId),
			orderBy: desc(ibadas.createdAt),
		})
	}),

	create: publicProcedure
		.input(createIbadasInputSchema.omit({ id: true, createdAt: true }))
		.mutation(async ({ ctx, input }) => {
			const ibadaType = await ctx.db.query.ibadaTypes.findFirst({
				// where: eq(ibadaTypes.id, input.ibadaTypeId),
				where: (table, { and, eq }) => eq(table.id, input.ibadaTypeId),
			})
			const userScores = await ctx.db.query.scores.findFirst({
				where: (table, { eq }) => eq(table.userId, authUserId),
			})
			//TODO update users score
			if (ibadaType && userScores) {
				await ctx.db
					.update(scores)
					.set({
						score: userScores?.score + ibadaType?.base_reward,
					})
					.where(eq(scores.userId, authUserId))
			}
			return await ctx.db.insert(ibadas).values({
				...input,
				id: newId("ibada"),
				createdAt: new Date(),
			})
		}),
})
