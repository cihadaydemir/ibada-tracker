import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { createIbadasInputSchema, ibadas, scores } from "@/server/db/schema"
import { newId } from "@/utils"
import { desc, eq } from "drizzle-orm"

export const ibadaRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ input, ctx }) => {
		//TODO replace with authenticated user later:
		return await db.query.ibadas.findMany({
			where: eq(ibadas.userId, ctx.user.id),
			orderBy: desc(ibadas.createdAt),
		})
	}),

	create: protectedProcedure
		.input(createIbadasInputSchema.omit({ id: true, createdAt: true }))
		.mutation(async ({ ctx, input }) => {
			const ibadaType = await ctx.db.query.ibadaTypes.findFirst({
				// where: eq(ibadaTypes.id, input.ibadaTypeId),
				where: (table, { and, eq }) => eq(table.id, input.ibadaTypeId),
			})
			const userScores = await ctx.db.query.scores.findFirst({
				where: (table, { eq }) => eq(table.userId, ctx.user.id),
			})
			//TODO update users score
			if (ibadaType && userScores) {
				await ctx.db
					.update(scores)
					.set({
						score: input.inMosque
							? userScores.score + ibadaType.base_reward + ibadaType.mosque_bonus
							: userScores.score + ibadaType.base_reward,
					})
					.where(eq(scores.userId, ctx.user.id))
			}
			return await ctx.db.insert(ibadas).values({
				...input,
				id: newId("ibada"),
				createdAt: new Date(),
			})
		}),
})
