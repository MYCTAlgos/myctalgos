"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/content";

export function Philosophy() {
  return (
    <SectionWrapper tone="dark" decorated>
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow index="03" tone="dark" centered>
            Our Philosophy
          </Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl"
        >
          Every system worth building begins with order.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60"
        >
          We believe structure, logic, and creation flow from a source
          greater than ourselves. That conviction shapes how we work: with
          discipline, with clarity, and with the belief that good technology
          — like good order — should serve people rather than confuse them.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-sm font-medium tracking-wide text-sky-300"
        >
          {SITE.tagline}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
