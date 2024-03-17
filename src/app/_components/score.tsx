"use client"

import type { ScoreType } from "@/server/db/schema"
import { api } from "@/trpc/react"
import React from "react"

type ScoreProps = {
	initialData: ScoreType
}

export const Score = ({ initialData }: ScoreProps) => {
	const { data } = api.scores.getScore.useQuery(undefined, { initialData })
	return <div className="py-2 px-4 rounded bg-accent text-primary-foreground">Score: {data?.score ?? 0}</div>
}
