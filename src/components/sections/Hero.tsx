"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Blob } from "@/components/ui/Blob";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { SITE } from "@/lib/content";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <motion.div style={{ y: blobY }} className="absolute inset-0">
          <Blob
            size={620}
            top="-2%"
            left="calc(50% - 310px)"
            from="var(--color-sky-400)"
            mid="var(--color-blue-500)"
            to="var(--color-blue-700)"
            opacity={0.6}
            duration={30}
            sheen
            shadow
            className="hidden sm:block"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-8 pt-28 text-center sm:px-8 sm:pb-12 sm:pt-36 lg:pb-16 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={1536}
            height={1024}
            priority
            className="h-16 w-auto sm:h-20"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-medium leading-[1.08] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl"
        >
          {SITE.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink-500"
        >
          {SITE.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            href="/discovery"
            variant="primary"
            className="!border-none !bg-gradient-to-r !from-blue-600 !to-sky-400 hover:!opacity-90"
          >
            Build With Us
          </Button>
          <Button href="/learn" variant="secondary">
            Learn With Us
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </section>
  );
}
