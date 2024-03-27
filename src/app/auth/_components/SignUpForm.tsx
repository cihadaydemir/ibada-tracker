"use client"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { supabaseFrontendClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const SignUpForm = () => {
	const router = useRouter()

	const signUpFormSchema = z.object({
		email: z.string().email(),
		firstname: z.string().min(1),
		lastname: z.string().min(1),
		password: z.string().min(6),
	})
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
	})

	const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
		const { data, error } = await supabaseFrontendClient.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				emailRedirectTo: [window.location.origin, "/auth/confirm"].join(""),
				data: {
					firstname: values.firstname,
					lastname: values.lastname,
				},
			},
		})

		if (!error) {
			router.push("/auth/confirmation")
		} else {
			toast({
				title: "Registration failed! ❌",
				description: "Something went rong! Please try again.",
				variant: "destructive",
			})
		}
		return data.user
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="firstname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Firstname</FormLabel>
								<Input {...field} type="text" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Lastname</FormLabel>
								<Input {...field} type="text" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<Input {...field} type="email" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<Input {...field} type="password" />
							</FormItem>
						)}
					/>
					<Button type="submit">Register</Button>
				</form>
			</Form>
		</div>
	)
}
