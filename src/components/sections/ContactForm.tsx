"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-navy-900/10 bg-mist-50 p-8">
        <p className="text-lg font-medium text-navy-900">Message sent.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Thanks for reaching out. We personally read every message and
          reply within 1&ndash;2 business days. We&rsquo;ve also sent a
          confirmation to your email &mdash; check your spam folder if you
          don&rsquo;t see it in your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-500"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors duration-200 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-500"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors duration-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-500"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors duration-200 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-full bg-navy-900 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-navy-800 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
