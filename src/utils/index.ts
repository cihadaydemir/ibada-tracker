import { customAlphabet } from "nanoid"
export const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

// TODO change prayer to ibada
const prefixes = {
	user: "usr",
	ibada: "ibd",
	prayer: "pryr",
} as const

export function newId(prefix: keyof typeof prefixes): string {
	return [prefixes[prefix], nanoid(17)].join("_")
}
