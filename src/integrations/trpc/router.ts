import { createTRPCRouter } from "./init";
import { githubRouter } from "./routes/github";
import { projectsRouter } from "./routes/projects";
import { waitingListRouter } from "./routes/waiting-list";
import { contactRouter } from "./routes/contact";

export const trpcRouter = createTRPCRouter({
  github: githubRouter,
  projects: projectsRouter,
  waitingList: waitingListRouter,
  contact: contactRouter,
});
export type TRPCRouter = typeof trpcRouter;
