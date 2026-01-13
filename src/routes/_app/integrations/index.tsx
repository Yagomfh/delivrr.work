import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { MainCard } from "@/components/cards/main-card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  Zap,
  CheckCircle2,
  LogIn,
  RefreshCcw,
} from "lucide-react";
import { PageHeader } from "@/components/headers/page-header";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/integrations/trpc/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSubscription } from "@trpc/tanstack-react-query";
import { useSelectedProject } from "@/hooks/use-project";
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
  const trpc = useTRPC();
  const { id: projectId } = useSelectedProject();
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [emailFrom, setEmailFrom] = useState("");
  const [emailCc, setEmailCc] = useState("");
  const [slackConnected, setSlackConnected] = useState(false);
  const [isEmailFormDirty, setIsEmailFormDirty] = useState(false);

  const integrations = useSubscription(
    trpc.integrations.list.subscriptionOptions(
      { projectId: projectId as number },
      { enabled: !!projectId }
    )
  );

  const switchIntegration = useMutation(
    trpc.integrations.switch.mutationOptions({})
  );

  const updateIntegration = useMutation(
    trpc.integrations.update.mutationOptions({})
  );

  const emailIntegrationFormId = useId();
  const slackIntegrationFormId = useId();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Integrations"
        description="Configure automations to send summaries to your email or Slack channels"
      />

      {/* Email Integration */}
      <MainCard.Root
        className={cn(
          "p-6 flex flex-col gap-4",
          integrations.data?.email?.enabled && "border-primary/20 bg-primary/5"
        )}
      >
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon className="shrink-0">
              <Mail className="size-5 sm:size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Email Integration</MainCard.Title>
              <MainCard.Description>
                Automatically send summaries to an email address when created
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="email-toggle" className="text-sm font-medium">
                Enable Email Automation
              </Label>
              <p className="text-xs text-muted-foreground">
                When enabled, summaries will be automatically sent to the
                specified email address
              </p>
            </div>
            {integrations.data !== undefined ? (
              <Switch
                id="email-toggle"
                checked={integrations.data?.email?.enabled ?? false}
                onCheckedChange={() =>
                  switchIntegration.mutate({
                    type: "email",
                    action: "on",
                    projectId: projectId as number,
                  })
                }
              />
            ) : (
              <Spinner />
            )}
          </div>

          {integrations.data?.email?.enabled && (
            <>
              <Separator />
              {
                <EmailIntegrationForm
                  id={emailIntegrationFormId}
                  initialValues={
                    (integrations.data?.email
                      ?.config as unknown as EmailIntegrationFormValues) ?? {
                      from: [],
                      cc: [],
                    }
                  }
                  onSubmit={async (values) => {
                    await updateIntegration.mutateAsync({
                      config: values,
                      id: integrations.data?.email?.id as string,
                      projectId: projectId as number,
                    });
                    setIsEmailFormDirty(false);
                  }}
                  onDirtyChange={setIsEmailFormDirty}
                />
              }
            </>
          )}
        </MainCard.Content>

        {integrations.data?.email?.enabled && (
          <MainCard.Footer className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="size-3" />
              <span>Automation active</span>
            </div>
            {isEmailFormDirty && (
              <Button
                variant="default"
                type="submit"
                disabled={updateIntegration.isPending}
                form={emailIntegrationFormId}
              >
                {updateIntegration.isPending ? <Spinner /> : "Save"}
              </Button>
            )}
          </MainCard.Footer>
        )}
      </MainCard.Root>

      {/* Slack Integration */}
      <MainCard.Root
        className={cn(
          "p-6 flex flex-col gap-4",
          integrations.data?.slack?.enabled && "border-primary/20 bg-primary/10"
        )}
      >
        <MainCard.Header className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <MainCard.Icon className="shrink-0">
              <MessageSquare className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Slack Integration</MainCard.Title>
              <MainCard.Description>
                Automatically send summaries to a Slack channel when created
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label htmlFor="slack-toggle" className="text-sm font-medium">
                Enable Slack Automation
              </Label>
              <p className="text-xs text-muted-foreground">
                When enabled, summaries will be automatically posted to the
                specified Slack channel
              </p>
            </div>
            <Switch
              id="slack-toggle"
              checked={integrations.data?.slack?.enabled ?? false}
              onCheckedChange={() =>
                switchIntegration.mutate({
                  type: "slack",
                  action: "on",
                  projectId: projectId as number,
                })
              }
            />
          </div>

          {integrations.data?.slack?.enabled && (
            <>
              <Separator />
              <div className="flex flex-col gap-3 w-full">
                {!slackConnected ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Connect your Slack workspace to enable automation
                    </p>
                    <Button
                      variant="default"
                      className="w-fit"
                      onClick={async () => {
                        await signIn.social({
                          provider: "slack",
                          scopes: ["channels:read", "chat:write"],
                        });
                      }}
                    >
                      <LogIn className="size-4" />
                      Login with Slack
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>Slack workspace connected</span>
                  </div>
                )}
              </div>
            </>
          )}
        </MainCard.Content>

        {integrations.data?.slack?.enabled && (
          <MainCard.Footer>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="size-3" />
              <span>Automation active</span>
            </div>
          </MainCard.Footer>
        )}
      </MainCard.Root>
    </div>
  );
}
