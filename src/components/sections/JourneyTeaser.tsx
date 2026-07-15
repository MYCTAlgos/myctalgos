"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function JourneyTeaser() {
  return (
    <SectionWrapper tone="light">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-xl">
          <Eyebrow index="02">The Journey</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            How MYCTAlgos helps your business.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            From idea to ownership, and back again. See the full path every
            client walks with us.
          </p>
        </div>
        <Button href="/journey" variant="primary">
          See the Journey
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
