import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { MainCard } from "@/components/cards/main-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Zap, CheckCircle2, LogIn } from "lucide-react";
import { PageHeader } from "@/components/headers/page-header";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/integrations/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { useSubscription } from "@trpc/tanstack-react-query";
import { Spinner } from "@/components/ui/spinner";
import {
  EmailIntegrationForm,
  EmailIntegrationFormValues,
} from "@/components/forms/email-integration-form";
import { signIn } from "@/integrations/better-auth/auth-client";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/integrations/")({
  head: () => ({
    meta: [
      {
        title: "Integrations | delivrr.work",
      },
      {
        name: "description",
        content:
          "Configure email and Slack integrations to automatically receive GitHub activity summaries. Set up automated delivery workflows.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/integrations`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <div className="flex flex-col gap-4">
      
    </div>
  );
}
