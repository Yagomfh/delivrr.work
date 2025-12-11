import { createTRPCRouter } from "./init";
import { githubRouter } from "./routes/github";
import { projectsRouter } from "./routes/projects";
import { summariesRouter } from "./routes/summaries";

export const trpcRouter = createTRPCRouter({
  github: githubRouter,
  projects: projectsRouter,
  summaries: summariesRouter,
});
export type TRPCRouter = typeof trpcRouter;
