"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TypingCode } from "@/components/ui/TypingCode";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { BackgroundBlobs } from "@/components/ui/BackgroundBlobs";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <BackgroundBlobs tone="dark" />
      <BlueprintGrid tone="dark" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,111,237,0.22),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-40 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-36 lg:pt-48 lg:px-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sky-300"
          >
            {SITE.name}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl text-5xl font-medium leading-[1.1] tracking-tight text-white sm:text-6xl"
          >
            {SITE.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-white/70"
          >
            {SITE.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              href="/discovery"
              variant="primary"
              className="!border-none !bg-gradient-to-r !from-blue-600 !to-sky-400 hover:!opacity-90"
            >
              Build With Us
            </Button>
            <Button
              href="/learn"
              variant="secondary"
              className="!border-white/25 !text-white hover:!border-gold-400 hover:!text-gold-300"
            >
              Learn With Us
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex justify-center lg:justify-end"
        >
          <TypingCode />
        </motion.div>
      </div>
    </section>
  );
}
