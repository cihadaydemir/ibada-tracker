"use client"
import { Button } from "@/components/ui/button"
import { supabaseFrontendClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export const Header = () => {
	const router = useRouter()

	return (
		<div className="flex flex-row gap-2 justify-center items center">
			<Button
				className="bg-primary text-primary-foreground"
				onClick={async (e) => {
					e.preventDefault()
					await supabaseFrontendClient.auth.signOut()
					router.refresh()
				}}
			>
				Log out
			</Button>
		</div>
	)
}
