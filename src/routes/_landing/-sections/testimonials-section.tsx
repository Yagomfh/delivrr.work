import { TestimonialsColumn } from "@/components/blocks/testimonials";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The automated delivery workflows are a game-changer. We set it up once and now every deployment automatically sends summaries to our product team via Slack, no manual work needed.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Head of Engineering · Remote SaaS team",
  },
  {
    text: "I love how Delivrr automatically delivers summaries to both email and Slack. Our stakeholders get updates in their preferred channel without us having to remember who wants what.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Staff Engineer · Platform",
  },
  {
    text: "The semantic search engine saved me hours last week. I needed to verify when a feature was deployed and found it instantly by searching our delivery history instead of digging through GitHub.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Engineering Manager",
  },
  {
    text: "Being able to configure the AI parameters means our summaries match our team's communication style perfectly. We tuned it to be concise but technical, and it's exactly what we needed.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "VP of Product",
  },
  {
    text: "The multi-channel delivery is brilliant. Our engineering team gets Slack notifications, while executives get email digests. Everyone stays informed without any extra configuration.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Technical Lead",
  },
  {
    text: "I use the semantic search constantly to track delivery artifacts across our project timeline. It's like having a searchable history of everything we've shipped.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Product Operations",
  },
  {
    text: "The automated workflows mean we never miss a delivery update. Every PR merge and deployment automatically triggers a summary, it's completely hands-off now.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "CTO · Early-stage startup",
  },
  {
    text: "Configuring the AI parameters to match our tone was easy. Now our summaries read like they were written by our team, not a generic bot. Stakeholders love it.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Founder",
  },
  {
    text: "The event-driven distribution is perfect for our async team. Summaries automatically go to the right channels at the right time, keeping everyone aligned without meetings.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Engineering Director",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="border-b border-border/60 bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center space-y-3"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Beta feedback
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            What our beta users say
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Early adopters are already using Delivrr to automate their delivery
            workflows and keep their teams aligned with AI-powered summaries.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center gap-4 md:gap-6 lg:gap-8 mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden w-full">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={20}
          />
        </div>
      </div>
    </section>
  );
}
