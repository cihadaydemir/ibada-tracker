import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { scores, users } from "@/server/db/schema"

export const userRouter = createTRPCRouter({
	findOrCreateUser: protectedProcedure.mutation(async ({ ctx }) => {
		const tableUser = await ctx.db.query.users.findFirst({
			where: (table, { eq }) => eq(table.id, ctx.user.id),
		})
		if (!tableUser) {
			const newUser = (
				await ctx.db
					.insert(users)
					.values({
						id: ctx.user.id,
						email: ctx.user.email!,
						firstname: ctx.user.user_metadata.firstname,
						lastname: ctx.user.user_metadata.lastname,
					})
					.returning()
			)[0]

			await ctx.db.insert(scores).values({
				userId: newUser?.id!,
				score: 0,
			})
			return newUser
		}
		return tableUser
	}),
})
