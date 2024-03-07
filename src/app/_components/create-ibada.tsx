"use client"
import { api } from "@/trpc/react"

import { useState } from "react"

export const CreateIbada = () => {
	const createIbada = api.ibada.create.useMutation()
	const { data: ibadaTypes } = api.ibadaTypes.getAll.useQuery()
	const utils = api.useUtils()

	const [selectedIbadaTypeId, setSelectedIbadaTypeId] = useState<string>("")
	return (
		<div className="flex flex-col gap-2">
			{createIbada.error && <p>Error occured: {createIbada.error.message}</p>}

			<select
				defaultValue=""
				value={selectedIbadaTypeId}
				onChange={(e) => {
					e.preventDefault()
					setSelectedIbadaTypeId(e.target.value)
				}}
			>
				<option disabled value={""}>
					Select a ibada
				</option>
				{ibadaTypes?.map((ibada) => (
					<option value={ibada.id} className="text-black">
						<p className="text-black ">{ibada.name}</p>
					</option>
				))}
			</select>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault()
					createIbada.mutate(
						{
							ibadaTypeId: selectedIbadaTypeId,
							userId: 1,
						},
						{
							onSuccess: () => {
								utils.ibada.invalidate()
							},
						},
					)
				}}
			>
				Create Ibada
			</button>
		</div>
	)
}
