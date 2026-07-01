import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description:
    "Tell us where you are and where you want to go — we'll help you figure out the rest.",
};

export default function ContactPage() {
  return (
    <SectionWrapper tone="light" innerClassName="!pt-32">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            Contact
          </p>
          <h1 className="max-w-lg text-4xl font-medium leading-tight tracking-tight text-navy-900 sm:text-5xl">
            Let&rsquo;s build something with order.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
            Whether you need a system built or want to understand how to
            build one yourself, tell us a bit about what you&rsquo;re
            working on.
          </p>

          <div className="mt-12 flex flex-col gap-2 text-sm text-ink-500">
            <p className="text-xs font-medium uppercase tracking-wider text-navy-900">
              Email
            </p>
            <a
              href="mailto:hello@myctalgos.com"
              className="transition-colors duration-200 hover:text-blue-600"
            >
              hello@myctalgos.com
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
