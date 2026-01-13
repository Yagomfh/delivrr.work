import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What are automated GitHub summaries?",
    answer:
      "Automated GitHub summaries are AI-powered reports that transform your GitHub pull requests, commits, and deployment events into clear, readable updates. Delivrr automatically generates these summaries and delivers them to your teams or clients via email and Slack, eliminating the need for manual status updates.",
  },
  {
    question: "How do pull request summaries work?",
    answer:
      "When a pull request is merged or deployed, Delivrr automatically analyzes the changes, commits, and code updates. Our AI then generates a concise summary that explains what was changed, why it matters, and how it impacts the project. These pull request summaries are delivered automatically to your configured email lists or Slack channels.",
  },
  {
    question: "Can I use this for client reporting from GitHub?",
    answer:
      "Yes! Delivrr is specifically designed for client reporting from GitHub. Many agencies and consultancies use Delivrr to automatically generate professional status updates for clients. You can customize the tone and technical depth of summaries to match your client's needs, ensuring they receive clear, non-technical updates about project progress without manual reporting work.",
  },
  {
    question: "What GitHub events trigger automated summaries?",
    answer:
      "Delivrr automatically generates summaries when pull requests are merged, commits are pushed to main branches, or deployments occur. You can configure which events trigger summaries for each repository, giving you full control over when and how often summaries are generated and delivered.",
  },
  {
    question: "How do I set up automated PR summaries for Slack and email?",
    answer:
      "Setting up automated PR summaries is simple: connect your GitHub repositories, configure your delivery channels (email lists or Slack webhooks), and customize your AI parameters. Once configured, every pull request merge automatically triggers a summary that's delivered to your selected recipients via email or Slack—no manual work required.",
  },
  {
    question: "Can I customize the tone and style of GitHub summaries?",
    answer:
      "Yes, Delivrr offers configurable AI parameters that let you control summary tone, verbosity, and technical depth. You can create summaries that are highly technical for engineering teams, or more accessible for client stakeholders. This ensures your automated GitHub summaries match your organization's communication style.",
  },
  {
    question:
      "Is this suitable for engineering manager GitHub summary reports?",
    answer:
      "Absolutely. Engineering managers use Delivrr to stay informed about team progress without diving into GitHub. Automated summaries provide high-level overviews of what's been shipped, what's in progress, and key changes—perfect for status updates, sprint reviews, and team alignment without manual reporting.",
  },
  {
    question: "How does Delivrr handle multiple GitHub repositories?",
    answer:
      "Delivrr supports unlimited GitHub repositories on Pro plans. You can connect multiple repositories, configure different delivery settings for each, and manage everything from a single dashboard. Summaries can be scoped to specific repositories or aggregated across your entire organization.",
  },
  {
    question: "What's the difference between email and Slack delivery?",
    answer:
      "Email delivery sends summaries to configured email distribution lists, perfect for client reporting and stakeholder updates. Slack delivery posts summaries directly to your Slack channels, ideal for team communication. You can use both simultaneously—summaries can be delivered to email lists and Slack channels at the same time.",
  },
  {
    question: "Can I search my GitHub summary history?",
    answer:
      "Yes, Delivrr includes a semantic search engine that lets you query your entire delivery history. Search by feature name, deployment date, or any keyword to quickly find when specific changes were shipped, verify feature status, or review past summaries. This makes it easy to track project progress over time.",
  },
  {
    question: "How accurate are AI-generated GitHub summaries?",
    answer:
      "Delivrr's AI summaries are designed to accurately capture the essence of code changes, pull requests, and deployments. The AI analyzes commit messages, code diffs, and PR descriptions to generate contextually relevant summaries. You can fine-tune the AI parameters to improve accuracy and match your team's communication style.",
  },
  {
    question: "Is Delivrr suitable for agencies and consultancies?",
    answer:
      "Yes, Delivrr is particularly popular with agencies and consultancies who need to provide regular client reporting from GitHub. Instead of manually creating status updates, Delivrr automatically generates professional summaries that keep clients informed about project progress, feature delivery, and code changes—saving hours of reporting work each week.",
  },
];

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section
      id="faq"
      className="border-b border-border/60 bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Frequently Asked Questions
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Questions about automated GitHub summaries
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Everything you need to know about pull request summaries, client
            reporting from GitHub, and automated delivery workflows.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.has(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-4 text-left transition-colors hover:bg-muted/50">
                <span className="pr-4 text-sm font-medium text-foreground sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    openItems.has(index) && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
