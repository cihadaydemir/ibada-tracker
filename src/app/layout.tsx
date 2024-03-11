import "@/styles/globals.css"

import { Inter } from "next/font/google"

import { TRPCReactProvider } from "@/trpc/react"
import { cn } from "@/lib/utils"

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
		<html lang="en">
			<body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	)
}
