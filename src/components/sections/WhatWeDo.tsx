"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PANELS = [
  {
    label: "Build",
    title: "We build the systems your business runs on.",
    description:
      "Custom web applications, dashboards, and automation tools designed around how your business actually works, not a generic template.",
  },
  {
    label: "Empower",
    title: "We help you understand and own what we build.",
    description:
      "Technology should make people more capable, not more dependent. We teach the thinking behind the systems so you can grow into a builder yourself.",
  },
] as const;

export function WhatWeDo() {
  return (
    <SectionWrapper tone="light">
      <div className="mb-16 max-w-2xl">
        <Eyebrow index="01">What We Do</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
          Two sides of the same mission.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700 p-10 lg:p-12"
          >
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              {panel.label}
            </p>
            <h3 className="mb-4 text-2xl font-medium tracking-tight text-white">
              {panel.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/75">
              {panel.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
