import { Octokit } from "@octokit/core";
import type { TRPCRouterRecord } from "@trpc/server";
import { and, eq, isNotNull } from "drizzle-orm";
import { z } from "zod";
import { githubInstallations } from "@/db/schema";
import { auth } from "@/integrations/better-auth/auth";
import { protectedProcedure } from "../init";

export const githubRouter = {
  authorizedOwners: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.query.githubInstallations.findMany({
      columns: {
        ownerLogin: true,
        installationId: true,
      },
      where: and(
        eq(githubInstallations.userId, ctx.session.user.id),
        isNotNull(githubInstallations.installationId)
      ),
    })
  ),
  authorizedRepositories: protectedProcedure
    .input(
      z.object({
        installationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { accessToken } = await auth.api.getAccessToken({
        body: {
          providerId: "github", // or any other provider id
          userId: ctx.session.user.id,
        },
      });

      const octokit = new Octokit({
        auth: accessToken,
      });

      const repositories = await octokit.request(
        "GET /user/installations/{installation_id}/repositories",
        {
          installation_id: parseInt(input.installationId, 10),
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return repositories.data;
    }),
} satisfies TRPCRouterRecord;
