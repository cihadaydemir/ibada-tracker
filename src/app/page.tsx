import { unstable_noStore as noStore } from "next/cache"

import { api } from "@/trpc/server"
import { CreateIbada } from "./_components/create-ibada"
import { IbadaList } from "./_components/ibada-list"
import { Score } from "./_components/score"

export default async function Home() {
	noStore()

	const ibadas = await api.ibada.getAll.query()
	const userScore = await api.scores.getScore.query()
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<Score initialData={userScore!} />
				<IbadaList />
				<CreateIbada />
			</div>
		</main>
	)
}
