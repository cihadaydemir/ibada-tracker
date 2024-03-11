"use client"
import type { Ibada } from "@/server/db/schema"
import { api } from "@/trpc/react"

import React from "react"

type IbadaItemProps = {
	ibada: Ibada
}

export default function IbadaItem({ ibada }: IbadaItemProps) {
	const { data: ibadaType, isLoading, error } = api.ibadaTypes.getById.useQuery({ ibadaTypeId: ibada.ibadaTypeId })

	if (isLoading) {
		return <div>Ibada loading...</div>
	}

	return (
		<div>
			{ibadaType?.name} - {ibada.createdAt.toDateString()}
		</div>
	)
}
