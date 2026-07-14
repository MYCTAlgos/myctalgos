"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search, Code2, BookOpen, Key } from "lucide-react";
import { FEATURED_STAT, JOURNEY_STEPS } from "@/lib/content";

const ICONS = {
  Lightbulb,
  Search,
  Code2,
  BookOpen,
  Key,
} as const;

const BADGE_COLORS = [
  "bg-sky-400",
  "bg-sky-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
] as const;

export function JourneyPath() {
  return (
    <div className="relative">
      {/* Center line, desktop only */}
      <div
        className="absolute left-1/2 top-4 bottom-4 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-sky-300 via-blue-500 to-blue-700 md:block"
        aria-hidden
      />

      <div className="flex flex-col gap-10 md:gap-16">
        {JOURNEY_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon as keyof typeof ICONS];
          const isLeft = i % 2 === 0;

          return (
            <div key={step.title} className="relative flex md:min-h-[9rem]">
              {/* Badge on the center line, desktop */}
              <div
                className={`absolute left-1/2 top-8 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full font-mono text-base font-semibold text-navy-950 shadow-[0_0_0_6px_var(--color-navy-950)] md:flex ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
              >
                {i + 1}
              </div>

              <motion.div
                initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`w-full rounded-3xl border border-white/10 bg-navy-800 p-6 sm:p-8 md:w-[calc(50%-3.5rem)] ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="mb-4 flex items-center gap-3 md:hidden">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-navy-950 ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
                  >
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-sky-300" strokeWidth={1.75} />
                </div>
                <Icon
                  className="mb-4 hidden h-6 w-6 text-sky-300 md:block"
                  strokeWidth={1.75}
                />
                <h3 className="mb-2 text-lg font-medium text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {step.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-16 flex flex-col items-center rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-600 to-navy-900 p-10 text-center"
      >
        <p className="font-mono text-4xl font-semibold text-white">
          {FEATURED_STAT.value}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
          {FEATURED_STAT.label}
        </p>
      </motion.div>
    </div>
  );
}
