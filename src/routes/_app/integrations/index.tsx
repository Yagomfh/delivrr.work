import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MainCard } from "@/components/cards/main-card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Zap, CheckCircle2, LogIn } from "lucide-react";
import { PageHeader } from "@/components/headers/page-header";

export const Route = createFileRoute("/_app/integrations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [emailFrom, setEmailFrom] = useState("");
  const [emailCc, setEmailCc] = useState("");
  const [slackConnected, setSlackConnected] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Integrations"
        description="Configure automations to send summaries to your email or Slack channels"
      />

      {/* Email Integration */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <Mail className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Email Integration</MainCard.Title>
              <MainCard.Description>
                Automatically send summaries to an email address when created
              </MainCard.Description>
            </div>
          </div>
          {emailEnabled && (
            <Badge
              variant="default"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <CheckCircle2 className="size-3 mr-1" />
              Active
            </Badge>
          )}
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
            <Switch
              id="email-toggle"
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>

          {emailEnabled && (
            <>
              <Separator />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="email-from" className="text-sm font-medium">
                    From
                  </Label>
                  <Input
                    id="email-from"
                    type="email"
                    placeholder="sender@example.com"
                    value={emailFrom}
                    onChange={(e) => setEmailFrom(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address to send summaries from
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="email-cc" className="text-sm font-medium">
                    CC
                  </Label>
                  <Input
                    id="email-cc"
                    type="email"
                    placeholder="recipient@example.com"
                    value={emailCc}
                    onChange={(e) => setEmailCc(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address to send summaries to (optional)
                  </p>
                </div>
              </div>
            </>
          )}
        </MainCard.Content>

        {emailEnabled && (
          <MainCard.Footer>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="size-3" />
              <span>Automation active</span>
            </div>
          </MainCard.Footer>
        )}
      </MainCard.Root>

      {/* Slack Integration */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <MessageSquare className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Slack Integration</MainCard.Title>
              <MainCard.Description>
                Automatically send summaries to a Slack channel when created
              </MainCard.Description>
            </div>
          </div>
          {slackEnabled && (
            <Badge
              variant="default"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <CheckCircle2 className="size-3 mr-1" />
              Active
            </Badge>
          )}
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
              checked={slackEnabled}
              onCheckedChange={setSlackEnabled}
            />
          </div>

          {slackEnabled && (
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
                      onClick={() => {
                        // Placeholder - no logic implementation
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

        {slackEnabled && (
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
