import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SERVICES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Services — ${SITE.name}`,
  description:
    "Custom web applications, dashboards, automation, and systems architecture built around how your business actually works.",
};

const PROCESS = [
  {
    step: "01",
    title: "Understand the structure",
    description:
      "We start by mapping how your operation actually works — the data, the decisions, the people involved.",
  },
  {
    step: "02",
    title: "Design the system",
    description:
      "We design an architecture that mirrors that structure, not one that forces you to change how you work.",
  },
  {
    step: "03",
    title: "Build and hand off",
    description:
      "We build it, test it against real use, and make sure you understand it well enough to own it.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper tone="light" innerClassName="!pb-16 !pt-32">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
          Services
        </p>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-navy-900 sm:text-5xl">
          Systems built around how your business actually runs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          We design and build the software layer of your operation —
          applications, dashboards, and automation that hold up under real
          use.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="mist">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            Process
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            How an engagement works.
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {PROCESS.map((step) => (
            <div key={step.step}>
              <p className="mb-4 text-sm font-medium text-blue-500">
                {step.step}
              </p>
              <h3 className="mb-3 text-lg font-medium text-navy-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <ContactCTA />
    </>
  );
}
