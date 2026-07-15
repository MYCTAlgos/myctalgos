"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function FeaturedWork() {
  return (
    <SectionWrapper tone="transparent-light">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow index="05" tone="dark">
            Featured Work
          </Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            A live example, not just a mockup.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            Our first build was a client discovery intake platform for a
            wellness-adjacent services business: a form that adapts based on
            each client&rsquo;s industry, backed by a live database.
            You&rsquo;re looking at the same kind of system right now, our
            own Discovery form runs on the exact same pattern.
          </p>
          <div className="mt-8">
            <Button
              href="/discovery"
              variant="primary"
              className="!border-none !bg-gradient-to-r !from-blue-600 !to-sky-400 hover:!opacity-90"
            >
              Try It Yourself
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-navy-950 p-6"
        >
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="space-y-2 font-mono text-xs text-sky-300">
            <p>{"> intake.industry.detect()"}</p>
            <p>{"> form.render({ dynamic: true })"}</p>
            <p>{"> supabase.insert(submission)"}</p>
            <p className="text-white/40">{"// live in production"}</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
