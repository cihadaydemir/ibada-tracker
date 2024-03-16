import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { NextRequest } from "next/server"

import { env } from "@/env"
import { appRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { cookies } from "next/headers"
import { type CookieOptions, createServerClient } from "@supabase/ssr"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
	const cookieStore = cookies()
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({
						name,
						value,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.set({
						name,
						value: "",
						...options,
					})
				},
			},
		},
	)

	return createTRPCContext({
		headers: req.headers,
		supabase: supabase,
	})
}

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
		onError:
			env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
				  }
				: undefined,
	})

export { handler as GET, handler as POST }
