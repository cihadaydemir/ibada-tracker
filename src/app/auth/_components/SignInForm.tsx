"use client"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabaseFrontendClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const LoginForm = () => {
	const router = useRouter()

	const signInFormSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
	})

	const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
		const { data, error } = await supabaseFrontendClient.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		})
		if (data && !error) {
			router.push("/")
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<Input
									{...field}
									id="email"
									type="email"
									placeholder="name@example.com"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect="off"
								/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<Input {...field} type="password" id="password" />
							</FormItem>
						)}
					/>
					<Button type="submit">Login</Button>
				</form>
			</Form>
		</div>
	)
}
