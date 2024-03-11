import type { Ibada } from "@/server/db/schema"
import { api } from "@/trpc/server"

import React from "react"
import IbadaItem from "./ibada-item"

type IbadaListProps = {
	initialData: Ibada[]
}

export const IbadaList = async ({ initialData }: IbadaListProps) => {
	const data = await api.ibada.getAll.query()
	return (
		<div>
			{/* {isLoading && <p>Ibadas loading...</p>}
			{error && <p>{error.message}</p>} */}
			{data?.map((ibada) => (
				<IbadaItem ibada={ibada} />
			))}
		</div>
	)
}
