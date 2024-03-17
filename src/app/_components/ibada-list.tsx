import { api } from "@/trpc/server"

import IbadaItem from "./ibada-item"

export const IbadaList = async () => {
	const data = await api.ibada.getAll.query()
	return (
		<div>
			{data?.map((ibada) => (
				<IbadaItem ibada={ibada} />
			))}
		</div>
	)
}
