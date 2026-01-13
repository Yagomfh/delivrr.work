import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "./-sections/hero-section";
import { CompaniesSection } from "./-sections/companies-section";
import { FeaturesSection } from "./-sections/features-section";
import { HowItWorksSection } from "./-sections/how-it-works-section";
import { PricingSection } from "./-sections/pricing-section";
import { TestimonialsSection } from "./-sections/testimonials-section";
import { FaqSection } from "./-sections/faq-section";
import { CtaSection } from "./-sections/cta-section";

const landingTitle = "Automated GitHub summaries | delivrr.work";
const landingDescription =
  "Delivrr Work turns noisy GitHub activity into clear, AI-crafted summaries of pull requests and commits, automatically delivered to your teams or clients via email and Slack.";
const landingUrl = "https://delivrr.work/";

export const Route = createFileRoute("/_landing/")({
  head: () => ({
    meta: [
      {
        title: landingTitle,
      },
      {
        name: "description",
        content: landingDescription,
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        property: "og:title",
        content: landingTitle,
      },
      {
        property: "og:description",
        content: landingDescription,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: landingUrl,
      },
      {
        property: "og:image",
        content: "https://delivrr.work/dashboard.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: landingTitle,
      },
      {
        name: "twitter:description",
        content: landingDescription,
      },
      {
        name: "twitter:image",
        content: "https://delivrr.work/dashboard.png",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: landingUrl,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "delivrr.work",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          url: landingUrl,
          description: landingDescription,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            category: "Free",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What are automated GitHub summaries?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Automated GitHub summaries are AI-powered reports that transform your GitHub pull requests, commits, and deployment events into clear, readable updates. Delivrr automatically generates these summaries and delivers them to your teams or clients via email and Slack, eliminating the need for manual status updates.",
              },
            },
            {
              "@type": "Question",
              name: "How do pull request summaries work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "When a pull request is merged or deployed, Delivrr automatically analyzes the changes, commits, and code updates. Our AI then generates a concise summary that explains what was changed, why it matters, and how it impacts the project. These pull request summaries are delivered automatically to your configured email lists or Slack channels.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use this for client reporting from GitHub?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Delivrr is specifically designed for client reporting from GitHub. Many agencies and consultancies use Delivrr to automatically generate professional status updates for clients. You can customize the tone and technical depth of summaries to match your client's needs, ensuring they receive clear, non-technical updates about project progress without manual reporting work.",
              },
            },
            {
              "@type": "Question",
              name: "How do I set up automated PR summaries for Slack and email?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Setting up automated PR summaries is simple: connect your GitHub repositories, configure your delivery channels (email lists or Slack webhooks), and customize your AI parameters. Once configured, every pull request merge automatically triggers a summary that's delivered to your selected recipients via email or Slack—no manual work required.",
              },
            },
            {
              "@type": "Question",
              name: "Is this suitable for engineering manager GitHub summary reports?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Engineering managers use Delivrr to stay informed about team progress without diving into GitHub. Automated summaries provide high-level overviews of what's been shipped, what's in progress, and key changes—perfect for status updates, sprint reviews, and team alignment without manual reporting.",
              },
            },
            {
              "@type": "Question",
              name: "Is Delivrr suitable for agencies and consultancies?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Delivrr is particularly popular with agencies and consultancies who need to provide regular client reporting from GitHub. Instead of manually creating status updates, Delivrr automatically generates professional summaries that keep clients informed about project progress, feature delivery, and code changes—saving hours of reporting work each week.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

export function LandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CompaniesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
    </main>
  );
}
