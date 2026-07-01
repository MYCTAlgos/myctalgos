import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Impact } from "@/components/sections/Impact";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { LearnPreview } from "@/components/sections/LearnPreview";
import { Founders } from "@/components/sections/Founders";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Impact />
      <Philosophy />
      <ServicesPreview />
      <LearnPreview />
      <Founders />
      <ContactCTA />
    </>
  );
}
