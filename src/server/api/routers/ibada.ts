
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { createIbadasInputSchema, ibadas, selectIbadasSchema } from "@/server/db/schema";
import { newId } from "@/utils";
import { eq } from "drizzle-orm";

export const ibadaRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(selectIbadasSchema.pick({ userId:true }))
    .query(async ({ input }) => {
      return await db.query.ibadas.findMany({
        where: eq(ibadas.userId, input.userId)
      })
    }),

  create: publicProcedure
    .input(createIbadasInputSchema.omit({id:true, createdAt: true}))
    .mutation(async ({ ctx, input }) => {      
      return await ctx.db.insert(ibadas).values({
        ...input,
        id: newId('ibada'),
        createdAt:new Date()
      });
    }),
});
