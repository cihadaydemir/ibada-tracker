import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"

import { createIbadasInputSchema, ibadas, scores } from "@/server/db/schema"
import { newId } from "@/utils"
import { desc, eq } from "drizzle-orm"

export const ibadaRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		//TODO replace with authenticated user later:
		return await ctx.db.query.ibadas.findMany({
			where: eq(ibadas.userId, ctx.user.id),
			orderBy: desc(ibadas.createdAt),
		})
	}),

	create: protectedProcedure.input(createIbadasInputSchema).mutation(async ({ ctx, input }) => {
		const ibadaType = await ctx.db.query.ibadaTypes.findFirst({
			// where: eq(ibadaTypes.id, input.ibadaTypeId),
			where: (table: any, { eq }: any) => eq(table.id, input.ibadaTypeId),
		})
		const userScores = await ctx.db.query.scores.findFirst({
			where: (table: any, { eq }: any) => eq(table.userId, ctx.user.id),
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
		// TODO fix id type mismatch -> works though.
		return await ctx.db.insert(ibadas).values({
			id: newId("ibada"),
			userId: ctx.user.id,
			ibadaTypeId: input.ibadaTypeId,
			inMosque: input.inMosque,
		})
	}),
})
