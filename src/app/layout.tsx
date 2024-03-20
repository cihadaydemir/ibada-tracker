import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { TRPCReactProvider } from "@/trpc/react"
import { api } from "@/trpc/server"
import { ThemeProvider } from "./_components/theme-provider"
import { cookies } from "next/headers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata = {
	title: "Ibada Tracker",
	description: "This app will help you track your ibada activities.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = await createClient(cookies())
	const user = (await supabase.auth.getSession()).data.session?.user

	if (user) {
		await api.user.findOrCreateUser.mutate()
	}

	return (
		<html lang="en" className="h-full w-full bg-background">
			<body className={cn("h-full bg-background font-sans antialiased", inter.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TRPCReactProvider>
						{children}
						<Toaster />
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
