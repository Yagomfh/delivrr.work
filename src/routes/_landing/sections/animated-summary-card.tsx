import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, GitBranch } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { TextSkeletonAnimation } from "@/components/skeletons/text-skeleton-animation";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Markdown from "markdown-to-jsx/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SummaryStatus = "pending" | "completed" | "failed";

interface MockSummary {
  id: number;
  status: SummaryStatus;
  headCommitMessage: string;
  summary: string | null;
  senderName: string;
  senderAvatar: string | null;
  headCommitTimestamp: string;
}

const mockSummary: MockSummary = {
  id: 1,
  status: "pending",
  headCommitMessage:
    "feat: add new Slack integration endpoints and email templates",
  summary:
    "We've been hard at work enhancing your experience with several key updates. Here's a summary of the improvements:\n\n## Integrations and Notifications\n\nWe've successfully integrated Slack and email notification systems into the platform. This foundational work enables teams to receive GitHub summaries directly in their preferred communication channels. As part of this:\n\n- We've introduced new, dedicated endpoints for Slack webhook integration that securely handle incoming GitHub events and format them for team channels.\n- The system now supports customizable email templates that allow teams to personalize how summaries are delivered, with support for both HTML and plain text formats.\n- Behind the scenes, we've set up the necessary infrastructure to queue and deliver notifications reliably, with automatic retry mechanisms for failed deliveries.\n\n## User Interface and Experience Enhancements\n\n- **Improved Project Selection**: We've revamped the project selection flow to make it easier to connect and manage multiple GitHub repositories. The new interface includes search functionality and visual indicators for project status.\n- **Enhanced Summary Cards**: Summary cards now display more contextual information, including commit counts, author details, and timestamps. We've also added hover states and improved the overall visual hierarchy.\n- **Real-time Status Updates**: The application now provides real-time feedback when summaries are being generated, with clear visual indicators showing the progress of AI-powered summary creation.\n\n## Behind-the-Scenes Improvements\n\n- We've optimized the webhook processing pipeline to handle high-volume GitHub events more efficiently, reducing latency and improving overall system reliability.\n- Updates to the authentication middleware ensure more secure handling of GitHub API tokens and better error recovery for expired credentials.\n- The TRPC query layer has been refactored to support faster data fetching and improved caching strategies, resulting in snappier page loads throughout the application.",
  senderName: "Alex Fakel",
  senderAvatar: "https://randomuser.me/api/portraits/men/30.jpg",
  headCommitTimestamp: new Date(Date.now()).toISOString(),
};

export function AnimatedSummaryCard() {
  const [status, setStatus] = useState<SummaryStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [enterButtonClicked, setEnterButtonClicked] = useState(false);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  const commandText = "git push origin main";

  useEffect(() => {
    // Typewriter animation for the command
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < commandText.length) {
        setTypedText(commandText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
      }
    }, 50); // 50ms per character for smooth typing

    // Simulate clicking the Enter button after typing completes
    const enterClickTimer = setTimeout(
      () => {
        if (enterButtonRef.current) {
          setEnterButtonClicked(true);
          // Reset the clicked state after animation
          setTimeout(() => setEnterButtonClicked(false), 200);
        }
      },
      commandText.length * 50 + 500
    ); // After typing + 500ms delay

    // Show snippet first, then slide in the card after a delay
    const visibilityTimer = setTimeout(
      () => {
        setIsVisible(true);
      },
      1000 + commandText.length * 50
    ); // Wait for typing to complete + 1 second

    // Transition from pending to completed after showing pending state
    const statusTimer = setTimeout(
      () => {
        setStatus("completed");
      },
      4000 + commandText.length * 50
    ); // Adjust total time

    return () => {
      clearInterval(typeInterval);
      clearTimeout(enterClickTimer);
      clearTimeout(visibilityTimer);
      clearTimeout(statusTimer);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-4 w-full max-w-md md:mt-0 min-h-[200px] flex justify-center items-center">
      {!isVisible && (
        <div className="w-full">
          <div className="flex px-3 py-2.5 rounded-md border border-gray-alpha-400">
            <div className="mr-3 flex-1 flex items-center">
              <div className="font-mono text-[13px] before:content-['$_']">
                {typedText}
                {typedText.length < commandText.length && (
                  <span
                    className="inline-block w-[2px] h-4 bg-gray-100 dark:bg-gray-1000 ml-0.5 align-middle"
                    style={{
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="ml-auto cursor-pointer relative">
              <Button
                size={"xs"}
                ref={enterButtonRef}
                className={cn(enterButtonClicked && "bg-gray-600 scale-95")}
                onClick={(e) => {
                  e.preventDefault();
                  // Do nothing - just simulate the click
                }}
              >
                Push
              </Button>
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(
          "w-full",
          "transform transition-all duration-700 ease-out",
          isVisible
            ? "relative translate-x-0 opacity-100"
            : "absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3 border border-border rounded-md p-4 bg-background/90 shadow-sm shadow-black/5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-2 border-b border-border pb-2">
            <div className="flex-1 min-w-0 flex items-start gap-2">
              <div className="py-1">
                <GitBranch className="size-3" />
              </div>
              <h2 className="text-sm font-medium text-foreground line-clamp-2">
                {mockSummary.headCommitMessage}
              </h2>
            </div>
            <div className="shrink-0">
              {status === "completed" && (
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white dark:bg-green-600 h-6 min-w-6 rounded-full px-1 font-mono tabular-nums animate-in fade-in zoom-in-95 duration-500"
                >
                  <Check className="size-2" />
                </Badge>
              )}
              {status === "pending" && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-500 text-white dark:bg-yellow-600 h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
                >
                  <Spinner className="size-2" />
                </Badge>
              )}
            </div>
          </div>
          <div className="flex-1 flex items-start min-h-[80px]">
            {status === "pending" ? (
              <div className="w-full animate-in fade-in duration-300">
                <TextSkeletonAnimation />
              </div>
            ) : status === "completed" ? (
              <div className="text-sm line-clamp-3 md:line-clamp-6 w-full">
                <Markdown
                  options={{
                    overrides: {
                      h1: {
                        props: {
                          className:
                            "text-3xl font-bold mt-8 mb-4 pb-2 border-b border-border",
                        },
                      },
                      h2: {
                        props: {
                          className: "text-2xl font-bold mt-6 mb-3",
                        },
                      },
                      h3: {
                        props: {
                          className: "text-xl font-semibold mt-5 mb-2",
                        },
                      },
                      h4: {
                        props: {
                          className: "text-lg font-semibold mt-4 mb-2",
                        },
                      },
                      h5: {
                        props: {
                          className: "text-base font-semibold mt-3 mb-2",
                        },
                      },
                      h6: {
                        props: {
                          className: "text-sm font-semibold mt-3 mb-2",
                        },
                      },
                      p: {
                        props: {
                          className: "my-4 leading-7",
                        },
                      },
                      a: {
                        props: {
                          className:
                            "text-primary underline underline-offset-4 hover:text-primary/80",
                        },
                      },
                      ul: {
                        props: {
                          className:
                            "list-disc list-outside my-4 ml-6 space-y-2",
                        },
                      },
                      ol: {
                        props: {
                          className:
                            "list-decimal list-outside my-4 ml-6 space-y-2",
                        },
                      },
                      li: {
                        props: {
                          className: "pl-2",
                        },
                      },
                      blockquote: {
                        props: {
                          className:
                            "border-l-4 border-border pl-4 my-4 italic text-muted-foreground",
                        },
                      },
                      code: {
                        props: {
                          className:
                            "bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground",
                        },
                      },
                      pre: {
                        props: {
                          className:
                            "bg-muted p-4 rounded-md my-4 overflow-x-auto",
                        },
                      },
                      hr: {
                        props: {
                          className: "my-8 border-t border-border",
                        },
                      },
                      strong: {
                        props: {
                          className: "font-bold",
                        },
                      },
                      em: {
                        props: {
                          className: "italic",
                        },
                      },
                      img: {
                        props: {
                          className: "my-4 rounded-md max-w-full h-auto",
                        },
                      },
                      table: {
                        props: {
                          className: "w-full my-4 border-collapse",
                        },
                      },
                      thead: {
                        props: {
                          className: "bg-muted",
                        },
                      },
                      tbody: {
                        props: {
                          className: "divide-y divide-border",
                        },
                      },
                      tr: {
                        props: {
                          className: "border-b border-border",
                        },
                      },
                      th: {
                        props: {
                          className: "px-4 py-2 text-left font-semibold",
                        },
                      },
                      td: {
                        props: {
                          className: "px-4 py-2",
                        },
                      },
                    },
                  }}
                >
                  {mockSummary.summary || ""}
                </Markdown>
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistance(
                new Date(mockSummary.headCommitTimestamp),
                new Date(),
                { addSuffix: true }
              )}
            </p>

            <div className="flex items-center gap-2 min-w-0">
              <p className="text-xs text-muted-foreground truncate">
                by {mockSummary.senderName}
              </p>
              <Avatar className="size-5">
                <AvatarImage
                  src={mockSummary.senderAvatar ?? undefined}
                  alt={mockSummary.senderName}
                />
                <AvatarFallback className="text-xs">
                  {mockSummary.senderName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
