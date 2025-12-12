import { createTRPCRouter } from "./init";
import { githubRouter } from "./routes/github";
import { projectsRouter } from "./routes/projects";
import { summariesRouter } from "./routes/summaries";
import { integrationsRouter } from "./routes/integrations";

export const trpcRouter = createTRPCRouter({
  github: githubRouter,
  projects: projectsRouter,
  summaries: summariesRouter,
  integrations: integrationsRouter,
});
export type TRPCRouter = typeof trpcRouter;
