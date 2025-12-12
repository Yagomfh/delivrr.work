import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "./auth";

export const landingMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (session?.user) {
      throw redirect({ to: "/app" });
    }

    return await next();
  }
);

export const appMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      throw redirect({ to: "/sign-in" });
    }

    return await next();
  }
);
