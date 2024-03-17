"use client"
import type * as React from "react"

import { Icons } from "@/app/_components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { supabaseFrontendClient } from "@/lib/supabase/client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [emailInput, setEmailInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")

	async function handleSignUp() {
		setIsLoading(true)

		const { data, error } = await supabaseFrontendClient.auth.signUp({
			email: emailInput,
			password: passwordInput,
		})
		setIsLoading(false)

		return data.user
	}
	async function handleLogin() {
		setIsLoading(true)
		const { data, error } = await supabaseFrontendClient.auth.signInWithPassword({
			email: emailInput,
			password: passwordInput,
		})
		setIsLoading(false)
		return data.user
	}

	return (
		<div className="flex flex-col gap-4">
			<form>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							value={emailInput}
							onChange={(e) => setEmailInput(e.target.value)}
						/>

						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							value={passwordInput}
							onChange={(e) => setPasswordInput(e.target.value)}
						/>
					</div>
					<Button
						className="bg-secondary text-secondary-foreground"
						disabled={isLoading}
						onClick={async (e) => {
							e.preventDefault()
							console.log("form input", { emailInput, passwordInput })
							const user = await handleLogin()
							if (user) {
								router.push("/")
							}
						}}
					>
						Login with Email
					</Button>
					<Button
						className="bg-primary text-primary-foreground"
						disabled={isLoading}
						onClick={async (e) => {
							e.preventDefault()
							console.log("form input", { emailInput, passwordInput })
							const user = await handleSignUp()
							if (user) {
								router.push("/")
							}
						}}
					>
						Sign Up with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" type="button">
				<Icons.gitHub className="mr-2 h-4 w-4" />
				GitHub
			</Button>
		</div>
	)
}
