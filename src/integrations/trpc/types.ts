import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpcRouter } from "./router";

export type trpcOut = inferRouterOutputs<typeof trpcRouter>;
export type trpcIn = inferRouterInputs<typeof trpcRouter>;

export type ExtractAsyncIterableValue<T> =
  T extends AsyncIterable<infer U> ? U : never;
