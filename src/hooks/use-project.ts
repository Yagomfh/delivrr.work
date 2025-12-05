import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { projects } from "@/db/schema";

type Project = {
	id: (typeof projects.$inferSelect)["id"] | null;
	setSelected: (id: (typeof projects.$inferSelect)["id"] | null) => void;
};

export const useSelectedProject = create<Project>()(
	persist(
		(set) => ({
			id: null,
			setSelected: (id: (typeof projects.$inferSelect)["id"] | null) =>
				set({ id }),
		}),
		{
			name: "selected-project",
			partialize: (state) => ({ id: state.id }),
			skipHydration: false,
		},
	),
);
