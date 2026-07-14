import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Have a question about MYCTAlgos? Send us a message and we'll get back to you.",
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
            Have a question? We&rsquo;re here to help.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
            Not ready to start a project yet? No problem. Send us a message
            about anything you&rsquo;re curious about and we&rsquo;ll get
            back to you.
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
