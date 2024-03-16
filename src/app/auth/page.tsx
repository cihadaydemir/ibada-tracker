import type { Metadata } from "next"
import { UserAuthForm } from "./_components/user-auth-form"

export const metadata: Metadata = {
	title: "Ibada Tracker - Authentication",
	description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
	return (
		<div className="flex w-full h-full justify-center items-center">
			<UserAuthForm />
		</div>
	)
}
