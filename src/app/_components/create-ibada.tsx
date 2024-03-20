"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { type IbadaType, createIbadasInputSchema } from "@/server/db/schema"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"

import type { User } from "@supabase/supabase-js"

import { useForm } from "react-hook-form"
import type { z } from "zod"

const getSelectedIbadaTypeById = ({ id, ibadaTypes }: { id: string; ibadaTypes: IbadaType[] }) =>
	ibadaTypes.find((ibadaType) => ibadaType.id === id)

type CreateIbadaProps = {
	user: User
}

export const CreateIbada = ({ user }: CreateIbadaProps) => {
	const { toast } = useToast()
	const form = useForm<z.infer<typeof createIbadasInputSchema>>({
		resolver: zodResolver(createIbadasInputSchema),
		defaultValues: {
			inMosque: false,
		},
	})

	const utils = api.useUtils()
	const createIbada = api.ibada.create.useMutation({
		onSuccess: () => {
			toast({
				title: "Ibada created ✅",
			})
			form.reset({
				ibadaTypeId: "",
				inMosque: false,
			})
			utils.ibada.getAll.invalidate()
			utils.scores.getScore.invalidate()
		},
	})
	const { data: ibadaTypes } = api.ibadaTypes.getAll.useQuery()

	const onSubmit = (values: z.infer<typeof createIbadasInputSchema>) => {
		if (user) {
			createIbada.mutate({
				...values,
			})
		}
	}
	return (
		<div className="flex flex-col gap-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					{createIbada.error && <p>Error occured: {createIbada.error.message}</p>}
					<FormField
						control={form.control}
						name="ibadaTypeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ibada Type</FormLabel>
								<Select value={field.value} onValueChange={(val) => field.onChange(val)}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select a Ibada" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Prayers</SelectLabel>
											{ibadaTypes
												?.filter((ibada) => ibada.type === "prayer")
												.map((prayer) => (
													<SelectItem key={prayer.id} value={prayer.id}>
														{`${prayer.name} (+${prayer.base_reward} Points)`}
													</SelectItem>
												))}
											<SelectLabel>Other Ibadas</SelectLabel>
											{ibadaTypes
												?.filter((ibada) => ibada.type === "other")
												.map((ibada) => (
													<SelectItem key={ibada.id} value={ibada.id}>
														{`${ibada.name} (+${ibada.base_reward} Points)`}
													</SelectItem>
												))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{ibadaTypes &&
						form.getValues("ibadaTypeId") &&
						getSelectedIbadaTypeById({ id: form.getValues("ibadaTypeId")!, ibadaTypes })?.type ===
							"prayer" && (
							<FormField
								control={form.control}
								name="inMosque"
								render={({ field }) => (
									<FormItem>
										<label htmlFor="inMosqueCheckbox">
											<FormControl>
												<div className="flex flex-row gap-2 items-center ">
													<Checkbox
														id="inMosqueCheckbox"
														checked={field.value ?? false}
														onCheckedChange={field.onChange}
													/>
													<FormDescription>{`Prayed in mosque (+${
														getSelectedIbadaTypeById({
															id: form.getValues("ibadaTypeId")!,
															ibadaTypes,
														})?.mosque_bonus
													} Points)`}</FormDescription>
												</div>
											</FormControl>
										</label>
									</FormItem>
								)}
							/>
						)}
					<Button type="submit">Create Ibada</Button>
				</form>
			</Form>
		</div>
	)
}
