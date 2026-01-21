import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { inngest } from "../client";

export const githubPushFn = inngest.createFunction(
  { id: "github-push" },
  { event: "github.push" },
  async ({ event, step }) => {
    const { data } = event;

    const project = await db.query.projects.findFirst({
      columns: {
        userId: true,
        id: true,
      },
      where: eq(projects.repository, data.repository.full_name),
    });

    if (!project) {
      return;
    }
  }
);
