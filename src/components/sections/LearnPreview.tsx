"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LEARN_TRACKS } from "@/lib/content";

export function LearnPreview() {
  return (
    <SectionWrapper tone="light" decorated>
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow index="05">Learn</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            We don&rsquo;t just build systems for people —
            <br className="hidden sm:block" /> we help them own it.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
            Every engagement is a chance to learn. We break down the logic
            behind the tools we build so you leave with more than
            software — you leave with understanding.
          </p>
          <div className="mt-8">
            <Button href="/learn" variant="primary">
              Explore Learning Paths
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {LEARN_TRACKS.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-navy-900/10 bg-white p-6 transition-colors duration-200 hover:border-blue-500/30"
            >
              <h3 className="mb-2 text-base font-medium text-navy-900">
                {track.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {track.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
