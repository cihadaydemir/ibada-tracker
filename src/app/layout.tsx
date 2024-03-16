import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { TRPCReactProvider } from "@/trpc/react"
import { ThemeProvider } from "./_components/theme-provider"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata = {
	title: "Ibada Tracker",
	description: "This app will help you track your ibada activities.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="h-full w-full bg-background">
			<body className={cn("h-full bg-background font-sans antialiased", inter.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
