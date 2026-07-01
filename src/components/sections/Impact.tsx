"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatCard } from "@/components/ui/StatCard";
import { IMPACT_STATS, WORKFLOW_STEPS } from "@/lib/content";

export function Impact() {
  return (
    <SectionWrapper tone="mist" decorated>
      <div className="mb-12 max-w-2xl">
        <Eyebrow index="02">Impact</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
          What structured systems actually change.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IMPACT_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <StatCard value={stat.value} label={stat.label} />
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-blue-900/20 bg-gradient-to-br from-blue-700 to-navy-900 p-8 lg:p-10">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-sky-300">
          How we get there
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 font-mono text-xs text-white">
                  {step.step}
                </span>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="hidden h-px flex-1 bg-white/20 sm:block" />
                )}
              </div>
              <h3 className="mb-2 text-base font-medium text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
