"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/content";

export function Philosophy() {
  return (
    <SectionWrapper tone="transparent-light">
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
          Technology is at its best when it helps people do meaningful work.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60"
        >
          At MYCTAlgos, we believe innovation should create clarity, not
          confusion. Every application, system, and solution we build is
          designed with purpose: to solve real problems, empower people, and
          create lasting value.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60"
        >
          Our faith reminds us that wisdom, creativity, and thoughtful design
          are gifts to be stewarded well. That belief influences how we
          build: with integrity, excellence, and a commitment to serving
          people first.
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
