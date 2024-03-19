import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/server/db"

export async function createContext(opts?: FetchCreateContextFnOptions) {
	const newHeaders = new Map(headers())
	const client = await getSupabaseServerClient()

	const session = await requireSession(client)

	return { headers: Object.fromEntries(newHeaders), auth: { user: session.user }, db }
}

export async function getSupabaseServerClient() {
	const cookieStore = cookies()
	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value
			},
			set(name: string, value: string, options: CookieOptions) {
				cookieStore.set({ name, value, ...options })
			},
			remove(name: string, options: CookieOptions) {
				cookieStore.delete({ name, ...options })
			},
		},
	})
}

export async function requireSession(client: SupabaseClient) {
	const { data, error } = await client.auth.getSession()

	if (!data.session || error) {
		return redirect("/auth")
	}

	// const requiresMfa = await checkSessionRequireMfa(client)

	// If the user requires multi-factor authentication,
	// redirect them to the page where they can verify their identity.
	// if (requiresMfa) {
	// 	return redirect(configuration.paths.signInMfa)
	// }

	return data.session
}
export type Context = Awaited<ReturnType<typeof createContext>>
