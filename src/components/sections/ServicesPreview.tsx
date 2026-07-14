"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/content";

export function ServicesPreview() {
  return (
    <SectionWrapper tone="light" decorated>
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <Eyebrow index="04">Services</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            What we build for businesses.
          </h2>
        </div>
        <Button href="/services" variant="ghost" className="!px-0">
          View all services →
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
