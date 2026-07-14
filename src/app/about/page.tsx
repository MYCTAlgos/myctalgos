import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Founders } from "@/components/sections/Founders";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${SITE.name}`,
  description:
    "MYCTAlgos is a technology company that helps small businesses, nonprofits, and entrepreneurs use technology, including AI, with confidence.",
};

const VALUES = [
  {
    title: "Empowerment over dependency",
    description:
      "The goal is always client capability, not client reliance on us.",
  },
  {
    title: "Plain language, always",
    description: "No unnecessary jargon in client-facing work, ever.",
  },
  {
    title: "Right-sized solutions",
    description:
      "Tools that fit your real capacity and budget, not over-built systems.",
  },
  {
    title: "Relationship first",
    description: "Long-term trust over one-off transactions.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <SectionWrapper tone="light" innerClassName="!pb-16 !pt-32">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
          About
        </p>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-navy-900 sm:text-5xl">
          A technology company built for confidence, not confusion.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          MYCTAlgos was founded by Mike and Yadley Charles on a simple
          belief: technology should feel accessible, not intimidating.
          Understandable, not mysterious. That&rsquo;s what it means to
          translate technology into something you can actually use, and we
          believe clarity like that reflects something greater than
          ourselves.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            How We Work
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            Our core values.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl bg-mist-50 p-8">
              <div className="mb-6 h-px w-8 bg-blue-500" />
              <h3 className="mb-3 text-lg font-medium text-navy-900">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <Founders />
      <ContactCTA />
    </>
  );
}
