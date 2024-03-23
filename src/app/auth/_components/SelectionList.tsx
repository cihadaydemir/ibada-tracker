"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const SelectionList = () => {
	const formSchema = z.object({})
	const form = useForm({
		resolver: zodResolver(formSchema),
	})
	const { data: ibadaTypes } = api.ibadaTypes.getAll.useQuery()
	const createIbada = api.ibada.create.useMutation()
	const handleClick = () => {}
	return (
		<div>
			<Form {...form}>
				{ibadaTypes?.map((ibadaType) => (
					<FormField
						name="ibada"
						render={(field) => (
							<div className="flex items-center space-x-2">
								<Checkbox id={ibadaType.id} />
								<Label htmlFor={ibadaType.id}>{ibadaType.name}</Label>
							</div>
						)}
					/>
				))}
				<Button onClick={handleClick}>Submit</Button>
			</Form>
		</div>
	)
}
