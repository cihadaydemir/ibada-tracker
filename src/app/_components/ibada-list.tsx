"use client"

import { api } from "@/trpc/react"
import React from "react"

// type IbadaListProps = {
// 	initialValue: (typeof ibadaSchema)[]
// }

export const IbadaList = () => {
	const { data, error, isLoading } = api.ibada.getAll.useQuery(undefined, {
		// initialData: initialValue,
	})
	return (
		<div>
			{isLoading && <p>Ibadas loading...</p>}
			{error && <p>{error.message}</p>}
			{data?.map((ibada) => (
				<p>{ibada.ibadaType}</p>
			))}
		</div>
	)
}
