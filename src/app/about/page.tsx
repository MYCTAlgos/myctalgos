import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Founders } from "@/components/sections/Founders";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description:
    "MYCTAlgos is a faith-centered technology company built on the belief that order precedes creation.",
};

const VALUES = [
  {
    title: "Order before code",
    description:
      "We map the structure of a problem before we write a single line. Clarity first, software second.",
  },
  {
    title: "Ownership over dependency",
    description:
      "A client who understands their system is more valuable to us than a client who simply pays for one.",
  },
  {
    title: "Craft with restraint",
    description:
      "Good engineering is quiet. We build things that work reliably and explain themselves clearly.",
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
          A technology company built on order, not noise.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          MYCTAlgos was founded by Mike and Yadley Charles on a simple
          conviction: technology works best when it mirrors structure that
          already exists. We call that structure order — and we believe it
          points to something greater than ourselves.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="mist">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            How We Work
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            Three principles behind everything we build.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl bg-white p-8">
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
