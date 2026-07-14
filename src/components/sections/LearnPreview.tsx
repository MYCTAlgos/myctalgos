"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function LearnPreview() {
  return (
    <SectionWrapper tone="dark" decorated>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Eyebrow index="05" tone="dark" centered>
          Learn
        </Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
          We don&rsquo;t just build systems for people.
          <br className="hidden sm:block" /> We help them own it.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70">
          Every engagement is a chance to learn. We break down the logic
          behind the tools we build so you leave with more than
          software. You leave with understanding.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            href="/learn"
            variant="primary"
            className="!border-none !bg-gradient-to-r !from-blue-600 !to-sky-400 hover:!opacity-90"
          >
            Explore Learning Paths
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
