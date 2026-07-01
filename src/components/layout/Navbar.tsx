"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6">
      <header className="mx-auto max-w-5xl rounded-full border border-navy-900/10 bg-white/90 shadow-[0_8px_30px_-12px_rgba(11,18,32,0.25)] backdrop-blur-md">
        <nav className="flex items-center justify-between px-4 py-2 sm:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt={SITE.name}
              width={200}
              height={200}
              priority
              className="h-14 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-500 transition-colors duration-200 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/discovery"
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-sky-400 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity duration-200 hover:opacity-90 md:inline-flex"
          >
            Start a Project
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-px w-6 bg-navy-900" />
            <span className="h-px w-6 bg-navy-900" />
          </button>
        </nav>

        {open && (
          <div className="border-t border-navy-900/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-ink-500 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/discovery"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-blue-600"
              >
                Start a Project
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
