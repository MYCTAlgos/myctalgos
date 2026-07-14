"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search, Code2, BookOpen, Key, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FEATURED_STAT, JOURNEY_STEPS } from "@/lib/content";

const ICONS = {
  Lightbulb,
  Search,
  Code2,
  BookOpen,
  Key,
} as const;

const ARC_COLORS = [
  "var(--color-sky-300)",
  "var(--color-sky-400)",
  "var(--color-blue-400)",
  "var(--color-blue-500)",
  "var(--color-blue-600)",
] as const;

const SIZE = 560;
const CENTER = SIZE / 2;
const RADIUS = 215;
const NODE_MARGIN_DEG = 16;

function polarToCartesian(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round((CENTER + RADIUS * Math.cos(rad)) * 100) / 100,
    y: Math.round((CENTER + RADIUS * Math.sin(rad)) * 100) / 100,
  };
}

function describeArc(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
}

export function Impact() {
  const count = JOURNEY_STEPS.length;
  const angleStep = 360 / count;

  return (
    <SectionWrapper tone="light" decorated>
      <div className="mb-16 max-w-2xl">
        <Eyebrow index="02">Impact</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
          How MYCTAlgos helps your business.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-500">
          From idea to ownership, and back again. This is the cycle every
          client goes through with us.
        </p>
      </div>

      {/* Wheel diagram: desktop / tablet */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          <defs>
            {ARC_COLORS.map((color, i) => (
              <marker
                key={i}
                id={`arrowhead-${i}`}
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill={color} />
              </marker>
            ))}
          </defs>
          {JOURNEY_STEPS.map((_, i) => {
            const startAngle = -90 + i * angleStep + NODE_MARGIN_DEG;
            const endAngle = -90 + (i + 1) * angleStep - NODE_MARGIN_DEG;
            return (
              <path
                key={i}
                d={describeArc(startAngle, endAngle)}
                fill="none"
                stroke={ARC_COLORS[i % ARC_COLORS.length]}
                strokeWidth={3}
                strokeLinecap="round"
                markerEnd={`url(#arrowhead-${i})`}
              />
            );
          })}
        </svg>

        {JOURNEY_STEPS.map((step, i) => {
          const angle = -90 + i * angleStep;
          const { x, y } = polarToCartesian(angle);
          const Icon = ICONS[step.icon as keyof typeof ICONS];

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{
                left: `${Math.round((x / SIZE) * 10000) / 100}%`,
                top: `${Math.round((y / SIZE) * 10000) / 100}%`,
              }}
            >
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border border-blue-300 bg-mist-50 text-blue-600 shadow-sm">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-xs font-medium text-navy-900">
                {step.title}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-ink-500">
                {step.description}
              </p>
            </motion.div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-mono text-3xl font-semibold text-blue-600">
            {FEATURED_STAT.value}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-ink-500">
            {FEATURED_STAT.label}
          </p>
        </div>
      </div>

      {/* Vertical fallback: mobile */}
      <div className="flex flex-col items-stretch gap-6 md:hidden">
        {JOURNEY_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon as keyof typeof ICONS];
          const isLast = i === JOURNEY_STEPS.length - 1;

          return (
            <div key={step.title} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex w-full flex-col items-center px-4 text-center"
              >
                <div className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-300 bg-mist-50 text-blue-600 shadow-sm">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-medium text-navy-900">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </motion.div>

              {!isLast && (
                <ArrowRight
                  className="my-2 h-4 w-4 rotate-90 text-blue-400"
                  strokeWidth={1.5}
                />
              )}
            </div>
          );
        })}

        <div className="mt-4 text-center">
          <p className="font-mono text-3xl font-semibold text-blue-600">
            {FEATURED_STAT.value}
          </p>
          <p className="mx-auto mt-1 max-w-xs text-xs leading-snug text-ink-500">
            {FEATURED_STAT.label}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
