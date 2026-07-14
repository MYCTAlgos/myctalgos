import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo-dark.png"
              alt={SITE.name}
              width={548}
              height={300}
              className="mb-4 h-10 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/60">
              We build custom web applications and empower people to
              understand and own the technology behind their work.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Site
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-sky-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Connect
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hello@myctalgos.com"
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-sky-300"
                  >
                    hello@myctalgos.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="italic text-white/30">
            Capability, not dependency.
          </p>
        </div>
      </div>
    </footer>
  );
}
