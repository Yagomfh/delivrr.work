import { SiteHeader } from "./site-header";
import { HeroSection } from "./sections/hero-section";
import { CompaniesSection } from "./sections/companies-section";
import { FeaturesSection } from "./sections/features-section";
import { HowItWorksSection } from "./sections/how-it-works-section";
import { PricingSection } from "./sections/pricing-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { CtaSection } from "./sections/cta-section";
import { SiteFooter } from "./site-footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CompaniesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
