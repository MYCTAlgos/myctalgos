import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JourneyPath } from "@/components/sections/JourneyPath";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `The Journey | ${SITE.name}`,
  description:
    "From idea to ownership, here's the path every client walks with MYCTAlgos.",
};

export default function JourneyPage() {
  return (
    <>
      <SectionWrapper tone="dark" decorated innerClassName="!pt-32">
        <div className="mb-20 max-w-2xl">
          <Eyebrow tone="dark">The Journey</Eyebrow>
          <h1 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            How MYCTAlgos helps your business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            From idea to ownership, and back again. This is the cycle every
            client goes through with us.
          </p>
        </div>

        <JourneyPath />
      </SectionWrapper>

      <ContactCTA />
    </>
  );
}
