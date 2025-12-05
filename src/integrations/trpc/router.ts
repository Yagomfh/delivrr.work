import { createTRPCRouter } from "./init";
import { githubRouter } from "./routes/github";
import { projectsRouter } from "./routes/projects";

export const trpcRouter = createTRPCRouter({
	github: githubRouter,
	projects: projectsRouter,
});
export type TRPCRouter = typeof trpcRouter;
