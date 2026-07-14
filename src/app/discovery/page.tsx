import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DiscoveryForm } from "@/components/sections/DiscoveryForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Discovery | ${SITE.name}`,
  description:
    "Tell us about your business so we can figure out the right way to build with you, teach you, or both.",
};

export default function DiscoveryPage() {
  return (
    <>
      <SectionWrapper tone="dark" decorated innerClassName="!pb-16 !pt-32">
        <Eyebrow tone="dark">Discovery</Eyebrow>
        <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
          Let&rsquo;s figure out where you are and where we can take you.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          A few questions about your business help us know whether to build
          with you, teach you, or both. Takes about five minutes.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="light" innerClassName="!max-w-3xl">
        <DiscoveryForm />
      </SectionWrapper>
    </>
  );
}
