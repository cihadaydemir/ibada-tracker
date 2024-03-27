import { unstable_noStore as noStore } from "next/cache"

import { api } from "@/trpc/server"
import { redirect } from "next/navigation"
import { CreateIbada } from "./_components/create-ibada"
import { Header } from "./_components/header"
import { IbadaList } from "./_components/ibada-list"
import { Score } from "./_components/score"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { SelectionList } from "./auth/_components/SelectionList"

export default async function Home() {
	noStore()

	const userScore = await api.scores.getScore.query()
	const supabase = await createClient(cookies())
	const user = (await supabase.auth.getSession()).data.session?.user
	if (!user) {
		redirect("/auth")
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<h2>Hallo, {user.user_metadata.firstname}</h2>
				<Header />
				<Score initialData={userScore!} />
				<IbadaList />
				<SelectionList />
				<CreateIbada user={user} />
			</div>
		</main>
	)
}
