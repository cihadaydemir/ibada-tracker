import { createTRPCRouter } from "@/server/api/trpc"
import { ibadaRouter } from "./routers/ibada"
import { ibadaTypesRouter } from "./routers/ibadaTypes"
import { scoresRouter } from "./routers/score"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	ibada: ibadaRouter,
	ibadaTypes: ibadaTypesRouter,
	scores: scoresRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
