import { createTRPCRouter } from "./init";
import { githubRouter } from "./routes/github";
import { projectsRouter } from "./routes/projects";
import { summariesRouter } from "./routes/summaries";
import { integrationsRouter } from "./routes/integrations";
import { waitingListRouter } from "./routes/waiting-list";

export const trpcRouter = createTRPCRouter({
  github: githubRouter,
  projects: projectsRouter,
  summaries: summariesRouter,
  integrations: integrationsRouter,
  waitingList: waitingListRouter,
});
export type TRPCRouter = typeof trpcRouter;
