"use client";

import { FormEvent, useState } from "react";
import {
  AUDIENCES,
  BUDGET_RANGES,
  BUSINESS_TYPES,
  BUILD_SERVICE_OPTIONS,
  INDUSTRIES,
  LEARN_TOPICS,
  REFERRAL_SOURCES,
  SCALE_FEATURES,
  TIMELINES,
  YEARS_OPERATING,
} from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors duration-200 focus:border-blue-500";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-ink-500";

function toggleInArray(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function DiscoveryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setErrorMsg] = useState<string | null>(null);

  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessTypeOther, setBusinessTypeOther] = useState("");
  const [audience, setAudience] = useState("");
  const [audienceOther, setAudienceOther] = useState("");

  const [wantsLearn, setWantsLearn] = useState(false);
  const [wantsBuild, setWantsBuild] = useState(false);
  const [learnTopics, setLearnTopics] = useState<string[]>([]);
  const [buildServices, setBuildServices] = useState<string[]>([]);
  const [scaleFeatures, setScaleFeatures] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg(null);

    if (!wantsLearn && !wantsBuild) {
      setErrorMsg(
        "Let us know if you're interested in learning, building, or both."
      );
      return;
    }

    setStatus("submitting");

    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const payload = {
      name: raw.name,
      email: raw.email,
      phone: raw.phone || null,
      businessName: raw.businessName,
      industry: industry === "Other" ? industryOther : industry,
      businessType:
        businessType === "Other" ? businessTypeOther : businessType,
      yearsOperating: raw.yearsOperating,
      audience: audience === "Other" ? audienceOther : audience,
      interests: [
        ...(wantsLearn ? ["learn"] : []),
        ...(wantsBuild ? ["build"] : []),
      ],
      learnTopics,
      learnOther: raw.learnOther || null,
      buildServices,
      buildDetails: raw.buildDetails || null,
      budget: raw.budget,
      timeline: raw.timeline,
      scaleFeatures,
      scaleOther: raw.scaleOther || null,
      referralSource: raw.referralSource || null,
      message: raw.message || null,
    };

    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Request failed");
      }
      setStatus("success");
      form.reset();
      setIndustry("");
      setIndustryOther("");
      setBusinessType("");
      setBusinessTypeOther("");
      setAudience("");
      setAudienceOther("");
      setWantsLearn(false);
      setWantsBuild(false);
      setLearnTopics([]);
      setBuildServices([]);
      setScaleFeatures([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-navy-900/10 bg-mist-50 p-10 text-center">
        <p className="text-xl font-medium text-navy-900">
          Thanks for sharing where you&rsquo;re at.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-500">
          We&rsquo;ll review your answers and follow up with next steps for
          building, learning, or both.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-14">
      <div>
        <h2 className="mb-6 text-lg font-medium text-navy-900">
          About you
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your Name
            </label>
            <input id="name" name="name" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone (optional)
            </label>
            <input id="phone" name="phone" type="tel" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="businessName" className={labelClass}>
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-lg font-medium text-navy-900">
          About your business
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="industry" className={labelClass}>
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              required
              className={inputClass}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="" disabled>
                Select an industry
              </option>
              {INDUSTRIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {industry === "Other" && (
              <input
                type="text"
                placeholder="Tell us your industry"
                required
                value={industryOther}
                onChange={(e) => setIndustryOther(e.target.value)}
                className={`${inputClass} mt-3`}
              />
            )}
          </div>

          <div>
            <label htmlFor="businessType" className={labelClass}>
              What Best Describes Your Business
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              className={inputClass}
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {BUSINESS_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {businessType === "Other" && (
              <input
                type="text"
                placeholder="Tell us what your business does"
                required
                value={businessTypeOther}
                onChange={(e) => setBusinessTypeOther(e.target.value)}
                className={`${inputClass} mt-3`}
              />
            )}
          </div>

          <div>
            <label htmlFor="yearsOperating" className={labelClass}>
              Years in Operation
            </label>
            <select
              id="yearsOperating"
              name="yearsOperating"
              required
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select a range
              </option>
              {YEARS_OPERATING.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="audience" className={labelClass}>
              Who Do You Serve
            </label>
            <select
              id="audience"
              name="audience"
              required
              className={inputClass}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {AUDIENCES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {audience === "Other" && (
              <input
                type="text"
                placeholder="Tell us who you serve"
                required
                value={audienceOther}
                onChange={(e) => setAudienceOther(e.target.value)}
                className={`${inputClass} mt-3`}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-medium text-navy-900">
          What are you looking for?
        </h2>
        <p className="mb-6 text-sm text-ink-500">
          Select everything that applies. You can want both.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex items-center gap-3 text-sm text-navy-900">
            <input
              type="checkbox"
              checked={wantsLearn}
              onChange={(e) => setWantsLearn(e.target.checked)}
              className="h-4 w-4 rounded border-navy-900/30 text-blue-600 focus:ring-blue-500"
            />
            I want to learn technology skills
          </label>
          <label className="flex items-center gap-3 text-sm text-navy-900">
            <input
              type="checkbox"
              checked={wantsBuild}
              onChange={(e) => setWantsBuild(e.target.checked)}
              className="h-4 w-4 rounded border-navy-900/30 text-blue-600 focus:ring-blue-500"
            />
            I want something built for us
          </label>
        </div>

        {wantsLearn && (
          <div className="mt-8 rounded-2xl border border-navy-900/10 bg-mist-50 p-6">
            <p className={labelClass}>What do you want to learn about?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {LEARN_TOPICS.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-3 text-sm text-navy-900"
                >
                  <input
                    type="checkbox"
                    checked={learnTopics.includes(topic)}
                    onChange={() =>
                      setLearnTopics((prev) => toggleInArray(prev, topic))
                    }
                    className="h-4 w-4 rounded border-navy-900/30 text-blue-600 focus:ring-blue-500"
                  />
                  {topic}
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="learnOther" className={labelClass}>
                Anything else you want to learn?
              </label>
              <input
                id="learnOther"
                name="learnOther"
                type="text"
                className={inputClass}
              />
            </div>
          </div>
        )}

        {wantsBuild && (
          <div className="mt-8 rounded-2xl border border-navy-900/10 bg-mist-50 p-6">
            <p className={labelClass}>What do you want us to build?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {BUILD_SERVICE_OPTIONS.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-3 text-sm text-navy-900"
                >
                  <input
                    type="checkbox"
                    checked={buildServices.includes(service)}
                    onChange={() =>
                      setBuildServices((prev) => toggleInArray(prev, service))
                    }
                    className="h-4 w-4 rounded border-navy-900/30 text-blue-600 focus:ring-blue-500"
                  />
                  {service}
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="buildDetails" className={labelClass}>
                Tell us more about what you need
              </label>
              <textarea
                id="buildDetails"
                name="buildDetails"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-6 text-lg font-medium text-navy-900">
          Project Details
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className={labelClass}>
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              required
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select a range
              </option>
              {BUDGET_RANGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className={labelClass}>
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              required
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {TIMELINES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-medium text-navy-900">
          What would help you scale?
        </h2>
        <p className="mb-6 text-sm text-ink-500">
          Pick anything that would help you grow as an entrepreneur.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SCALE_FEATURES.map((feature) => (
            <label
              key={feature}
              className="flex items-center gap-3 text-sm text-navy-900"
            >
              <input
                type="checkbox"
                checked={scaleFeatures.includes(feature)}
                onChange={() =>
                  setScaleFeatures((prev) => toggleInArray(prev, feature))
                }
                className="h-4 w-4 rounded border-navy-900/30 text-blue-600 focus:ring-blue-500"
              />
              {feature}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label htmlFor="scaleOther" className={labelClass}>
            Anything else that would help you scale?
          </label>
          <input id="scaleOther" name="scaleOther" type="text" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="referralSource" className={labelClass}>
          How Did You Hear About Us? (optional)
        </label>
        <select
          id="referralSource"
          name="referralSource"
          className={inputClass}
          defaultValue=""
        >
          <option value="">Prefer not to say</option>
          {REFERRAL_SOURCES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-400 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Submitting..." : "Submit Discovery Form"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
