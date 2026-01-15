import React from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  createRouter,
  DefaultGlobalNotFound,
  ErrorComponent,
} from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import {
  createTRPCClient,
  httpBatchStreamLink,
  httpSubscriptionLink,
  loggerLink,
  splitLink,
} from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";
import { getUrl } from "@/lib/utils";
import type { TRPCRouter } from "@/integrations/trpc/router";
import { routeTree } from "./routeTree.gen";
import { TRPCProvider } from "@/integrations/trpc/react";

const getHeaders = createServerFn({ method: "GET" }).handler(() => {
  const headers = getRequestHeaders();

  return Object.fromEntries(headers);
});

// Create a new router instance
export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30 * 1000 },
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });

  const trpcClient = createTRPCClient<TRPCRouter>({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      splitLink({
        condition: (op) => op.type === "subscription",
        true: httpSubscriptionLink({
          url: getUrl(),
          transformer: superjson,
        }),
        false: httpBatchStreamLink({
          url: getUrl(),
          transformer: superjson,
          async headers() {
            return await getHeaders();
          },
        }),
      }),
    ],
  });

  const trpc = createTRPCOptionsProxy<TRPCRouter>({
    client: trpcClient,
    queryClient,
  });

  const router = createRouter({
    context: { queryClient, trpc },
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: DefaultGlobalNotFound,
    scrollRestoration: true,
    Wrap: ({ children }: { children: React.ReactNode }) => (
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}
