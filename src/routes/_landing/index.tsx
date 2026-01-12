import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "./landing-page";

export const Route = createFileRoute("/_landing/")({
  component: LandingPage,
});
