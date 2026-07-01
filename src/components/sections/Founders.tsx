"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FOUNDERS } from "@/lib/content";

export function Founders() {
  return (
    <SectionWrapper tone="mist" decorated>
      <div className="mb-16 max-w-2xl">
        <Eyebrow index="06">Founders</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
          Built by Mike &amp; Yadley Charles.
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {FOUNDERS.map((founder, i) => (
          <motion.div
            key={founder.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-navy-900/10 bg-white p-8 transition-colors duration-200 hover:border-blue-500/30"
          >
            <Image
              src={founder.photo}
              alt={founder.name}
              width={96}
              height={96}
              className="mb-6 h-20 w-20 rounded-full object-cover"
            />
            <h3 className="text-lg font-medium text-navy-900">
              {founder.name}
            </h3>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-blue-500">
              {founder.role}
            </p>
            <p className="mb-6 text-sm leading-relaxed text-ink-500">
              {founder.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {founder.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-navy-900/10 bg-mist-50 px-3 py-1 font-mono text-xs text-navy-900"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
