import { TestimonialsColumn } from "@/components/blocks/testimonials";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "We joined the alpha expecting rough edges, but the delivery workflows are already a game-changer. Even in this early version, every deployment automatically sends summaries to our product team via Slack.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Solo founder",
  },
  {
    text: "It’s clearly still a WIP, but Delivrr already handles the boring parts for us. Summaries go out to both email and Slack automatically, so stakeholders get updates without us juggling channels.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Freelance platform engineer",
  },
  {
    text: "The alpha’s semantic search saved me hours last week. I needed to verify when a feature was deployed and found it instantly by searching our delivery history instead of digging through GitHub.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Agency owner",
  },
  {
    text: "You can tell the AI controls are still evolving, but they’re already super useful. With a bit of tuning, our summaries feel close to how our team actually writes updates.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Open source collaborator",
  },
  {
    text: "For an alpha, the multi-channel delivery is surprisingly polished. Our engineers get Slack pings, execs get email digests, and everyone stays informed with almost no extra setup.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Freelance tech lead",
  },
  {
    text: "Even though the UI is still changing, I use the semantic search in the alpha constantly. It already feels like a searchable history of everything we’ve shipped.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Founder",
  },
  {
    text: "There are a few alpha quirks here and there, but the automated workflows mean we basically never miss a delivery update anymore. Every PR merge and deployment triggers a summary for the right people.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Agency owner",
  },
  {
    text: "We’re still tweaking things as the alpha ships new builds, but configuring the AI to match our tone was straightforward. Our summaries already feel like they were written by our team, not a generic bot.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Freelance product consultant",
  },
  {
    text: "Even in alpha, the event-driven distribution fits our async team really well. Summaries flow to the right channels at the right time, so we stay aligned without adding more meetings.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Open source maintainer",
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
            Alpha feedback
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            What our early users say
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Delivrr is still in alpha, but our first users are already
            automating delivery workflows and keeping their teams aligned with
            AI-powered summaries—rough edges and all.
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
