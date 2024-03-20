"use client"

import { api } from "@/trpc/react"
import IbadaItem from "./ibada-item"

export const IbadaList = () => {
	const { data } = api.ibada.getAll.useQuery()
	return (
		<div>
			{data?.map((ibada) => (
				<IbadaItem ibada={ibada} />
			))}
		</div>
	)
}
