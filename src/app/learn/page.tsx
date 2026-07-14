import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { LEARN_TRACKS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Learn | ${SITE.name}`,
  description:
    "We teach people how to understand technology, including AI, so they can grow from users into builders.",
};

const AUDIENCE = [
  {
    title: "Business owners",
    description:
      "Understand the systems running your business well enough to make confident decisions about them.",
  },
  {
    title: "Teams",
    description:
      "Help your team understand and take care of the tools they use every day.",
  },
  {
    title: "Individuals",
    description:
      "Start from zero and build a real understanding of how software and technology actually work.",
  },
] as const;

export default function LearnPage() {
  return (
    <>
      <SectionWrapper tone="light" innerClassName="!pb-16 !pt-32">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
          Learn
        </p>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-navy-900 sm:text-5xl">
          Understand the technology behind your work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          We don&rsquo;t just build systems for people. We help them
          understand and own their systems. Learning is not an add-on to
          what we do. It is half of what we do.
        </p>
        <div className="mt-10">
          <Button href="/discovery" variant="primary">
            Start Learning
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            Learning Paths
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            Three ways to grow.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {LEARN_TRACKS.map((track) => (
            <div key={track.title} className="rounded-2xl bg-mist-50 p-8">
              <div className="mb-6 h-px w-8 bg-blue-500" />
              <h3 className="mb-3 text-lg font-medium text-navy-900">
                {track.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {track.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            Who It&rsquo;s For
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            Built for anyone ready to understand, not just use.
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {AUDIENCE.map((item) => (
            <div key={item.title}>
              <h3 className="mb-3 text-lg font-medium text-navy-900">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <ContactCTA />
    </>
  );
}
