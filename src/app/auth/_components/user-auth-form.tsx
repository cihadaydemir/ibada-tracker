import type * as React from "react"

import { Icons } from "@/app/_components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { login, signup } from "@/lib/supabase/actions"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	// const [isLoading, setIsLoading] = React.useState<boolean>(false)
	// const [emailInput, setEmailInput] = useState("")
	// const [passwordInput, setPasswordInput] = useState("")

	// async function onSubmit(event: React.SyntheticEvent) {
	// 	const { data, error } = await supabase.auth.signUp({
	// 		email: emailInput,
	// 		password: passwordInput,
	// 	})
	// 	console.log("submit response", { data, error })
	// }

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
						/>

						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input id="password" type="password" />
					</div>
					<Button className="bg-secondary text-secondary-foreground" formAction={login}>
						Login with Email
					</Button>
					<Button className="bg-primary text-primary-foreground" formAction={signup}>
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
