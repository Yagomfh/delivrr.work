import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUrl() {
	const base = (() => {
		if (typeof window !== "undefined") return "";

		return `http://localhost:${process.env.PORT ?? 3000}`;
	})();

	return `${base}/api/trpc`;
}
