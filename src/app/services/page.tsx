import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PACKAGES, SERVICES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Services | ${SITE.name}`,
  description:
    "Custom web applications, AI-assisted tools, dashboards, and automation built around how your business actually works.",
};

const PROCESS = [
  {
    step: "01",
    title: "Understand how you work",
    description:
      "We start by learning how your business actually runs: the data, the decisions, and the people involved.",
  },
  {
    step: "02",
    title: "Design the plan",
    description:
      "We design a plan that fits how you work, not one that forces you to change.",
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
        <Eyebrow index="01">Services</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight text-navy-900 sm:text-5xl">
          Systems built around how your business actually runs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
          We design and build the software your business runs on, including
          applications, dashboards, and automation that hold up under real
          use.
        </p>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <Eyebrow index="02">What We Build</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            Software, tailored to your business.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="dark" decorated>
        <div className="mb-16 max-w-2xl">
          <Eyebrow index="03" tone="dark">
            Packages
          </Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            How we price.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Every package is flat-rate and scoped up front, never open-ended
            hourly billing. Exact pricing depends on the project, but the
            structure is always clear before we start.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-2xl border border-blue-300 bg-white p-8"
            >
              <h3 className="mb-3 text-lg font-medium text-navy-900">
                {pkg.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-500">
                {pkg.included}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                Best for
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">
                {pkg.bestFor}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="light">
        <div className="mb-16 max-w-2xl">
          <Eyebrow index="04">Process</Eyebrow>
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
