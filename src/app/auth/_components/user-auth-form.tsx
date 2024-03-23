"use client"
import type * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpForm } from "./RegisterForm"
import { LoginForm } from "./SignInForm"

export function UserAuthForm() {
	return (
		<div>
			<Tabs defaultValue="signup" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="signup">Signup</TabsTrigger>
					<TabsTrigger value="login">Login</TabsTrigger>
				</TabsList>
				<TabsContent value="signup">
					<SignUpForm />
				</TabsContent>
				<TabsContent value="login">
					<LoginForm />
				</TabsContent>
			</Tabs>
		</div>
	)
}
