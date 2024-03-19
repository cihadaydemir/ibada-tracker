"use server"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function login(formData: FormData) {
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}
	const supabase = await createClient(cookies())
	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		redirect("/error")
	}

	revalidatePath("/", "layout")
	redirect("/")
}

export async function signup(formData: FormData) {
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const header = headers()
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}
	const supabase = await createClient(cookies())
	const { error } = await supabase.auth.signUp({
		...data,
		options: { emailRedirectTo: `${header.get("host")}/auth/callback` },
	})

	if (error) {
		console.error("signup error", error)
		redirect("/error")
	}

	revalidatePath("/", "layout")
	redirect("/")
}
