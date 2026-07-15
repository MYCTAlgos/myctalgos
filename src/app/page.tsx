import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { JourneyTeaser } from "@/components/sections/JourneyTeaser";
import { Philosophy } from "@/components/sections/Philosophy";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { LearnPreview } from "@/components/sections/LearnPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

// One continuous background spanning Hero through LearnPreview, so the
// page reads as a single gradual journey (bright/open -> rich/immersive)
// instead of stacked light/dark sections. Ends at navy-900 to hand off
// seamlessly to ContactCTA and the Footer, which are already that color.
const CHAPTER_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #ffffff 20%, #eef3fb 34%, #c3d3ef 46%, #3d5ba8 58%, #16234a 72%, #0b1220 86%, #0b1220 100%)";

export default function Home() {
  return (
    <>
      <div style={{ background: CHAPTER_GRADIENT }}>
        <Hero />
        <WhatWeDo />
        <JourneyTeaser />
        <Philosophy />
        <FeaturedWork />
        <LearnPreview />
      </div>
      <ContactCTA />
    </>
  );
}
