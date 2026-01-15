import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MainCard } from "@/components/cards/main-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { GitBranch, GitCommit, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/headers/page-header";

const baseUrl = "https://delivrr.work";

const TONE_PRESETS = [
  { value: "neutral", label: "Neutral" },
  { value: "direct", label: "Direct" },
  { value: "friendly", label: "Friendly" },
  { value: "executive", label: "Executive" },
];

const VERBOSITY_PRESETS = [
  { value: "compact", label: "Compact" },
  { value: "standard", label: "Standard" },
  { value: "detailed", label: "Detailed" },
];

const TECH_DEPTH_PRESETS = [
  { value: "high-level", label: "High-level" },
  { value: "mixed", label: "Mixed" },
  { value: "deep-dive", label: "Deep dive" },
];

const AUDIENCE_PRESETS = [
  { value: "engineers", label: "Engineers" },
  { value: "product", label: "Product / PM" },
  { value: "execs", label: "Execs" },
  { value: "mixed", label: "Mixed" },
];

export const Route = createFileRoute("/_app/config")({
  head: () => ({
    meta: [
      {
        title: "Project Configuration | delivrr.work",
      },
      {
        name: "description",
        content:
          "Configure how delivrr.work listens to your repository and shapes the summaries it generates.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/config`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const [repository, setRepository] = useState("");
  const [branch, setBranch] = useState("main");
  const [tone, setTone] = useState<string | undefined>();
  const [verbosity, setVerbosity] = useState<string | undefined>();
  const [techDepth, setTechDepth] = useState<string | undefined>();
  const [audience, setAudience] = useState<string | undefined>();

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeader title="Settings" description="Configure your project" />
      {/* Repository Configuration */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <GitCommit className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Repository</MainCard.Title>
              <MainCard.Description>
                Which repository and branch should trigger summaries
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">GitHub Repository</label>
              <p className="text-xs text-muted-foreground">
                Full repository path, including owner
              </p>
              <Input
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                placeholder="github.com/owner/repo"
                className="w-full"
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Branch</label>
              <p className="text-xs text-muted-foreground">
                Primary branch to listen for changes
              </p>
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 text-muted-foreground shrink-0" />
                <Input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="main"
                  className="w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </MainCard.Content>
      </MainCard.Root>

      {/* Summary Profile */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <SlidersHorizontal className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Summary Profile</MainCard.Title>
              <MainCard.Description>
                Configure how summaries are generated
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Tone</label>
              <p className="text-xs text-muted-foreground">
                Overall voice used when describing changes
              </p>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONE_PRESETS.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Verbosity</label>
              <p className="text-xs text-muted-foreground">
                How dense or expansive each summary should be
              </p>
              <Select value={verbosity} onValueChange={setVerbosity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select verbosity" />
                </SelectTrigger>
                <SelectContent>
                  {VERBOSITY_PRESETS.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Technical Depth</label>
              <p className="text-xs text-muted-foreground">
                How deep we should go into implementation details
              </p>
              <Select value={techDepth} onValueChange={setTechDepth}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  {TECH_DEPTH_PRESETS.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Target Audience</label>
              <p className="text-xs text-muted-foreground">
                Who should be able to understand the summary
              </p>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIENCE_PRESETS.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </MainCard.Content>
      </MainCard.Root>
    </div>
  );
}
