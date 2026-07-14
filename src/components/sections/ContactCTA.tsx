"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <SectionWrapper tone="dark" decorated>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
            Ready to build, or ready to learn?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Tell us where you are and where you want to go. We&rsquo;ll help
            you figure out the rest.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            href="/discovery"
            variant="primary"
            className="!border-none !bg-gradient-to-r !from-blue-600 !to-sky-400 hover:!opacity-90"
          >
            Let&rsquo;s Build
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
