"use client"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { api } from "@/trpc/react"
import { revalidateTag } from "next/cache"

import { useState } from "react"

export const CreateIbada = () => {
	const utils = api.useUtils()
	const createIbada = api.ibada.create.useMutation({
		onSuccess(data, variables, context) {
			utils.scores.getScore.invalidate()
		},
	})
	const { data: ibadaTypes } = api.ibadaTypes.getAll.useQuery()

	const [selectedIbadaTypeId, setSelectedIbadaTypeId] = useState<string>("")
	return (
		<div className="flex flex-col gap-2">
			{createIbada.error && <p>Error occured: {createIbada.error.message}</p>}
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a Ibada" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Prayers</SelectLabel>
						{ibadaTypes
							?.filter((ibada) => ibada.type === "prayer")
							.map((prayer) => (
								<SelectItem value={prayer.id}>{prayer.name}</SelectItem>
							))}
						<SelectLabel>Other Ibadas</SelectLabel>
						{ibadaTypes
							?.filter((ibada) => ibada.type === "other")
							.map((ibada) => (
								<SelectItem value={ibada.id}>{ibada.name}</SelectItem>
							))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{/* <select
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
			</select> */}
			<Button
				type="button"
				onClick={(e) => {
					e.preventDefault()
					createIbada.mutate({
						ibadaTypeId: selectedIbadaTypeId,
						userId: 1,
					})
				}}
			>
				Create Ibada
			</Button>
		</div>
	)
}
