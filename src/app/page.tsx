import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { JourneyTeaser } from "@/components/sections/JourneyTeaser";
import { Philosophy } from "@/components/sections/Philosophy";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { LearnPreview } from "@/components/sections/LearnPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <JourneyTeaser />
      <Philosophy />
      <FeaturedWork />
      <LearnPreview />
    </>
  );
}
