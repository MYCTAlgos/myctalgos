"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ContactSubmission, DiscoverySubmission } from "@/types/submissions";

type InterestFilter = "all" | "build" | "learn" | "both";

const INTEREST_FILTERS: { value: InterestFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "build", label: "Build" },
  { value: "learn", label: "Train" },
  { value: "both", label: "Both" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDayKey(iso: string) {
  return iso.slice(0, 10);
}

function formatDayLabel(dayKey: string) {
  return new Date(`${dayKey}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function matchesInterest(interests: string[], filter: InterestFilter) {
  if (filter === "all") return true;
  const hasBuild = interests.includes("build");
  const hasLearn = interests.includes("learn");
  if (filter === "both") return hasBuild && hasLearn;
  if (filter === "build") return hasBuild;
  return hasLearn;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-mono text-white/50">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function AdminDashboard({
  contacts,
  discoveries,
}: {
  contacts: ContactSubmission[];
  discoveries: DiscoverySubmission[];
}) {
  const [interestFilter, setInterestFilter] = useState<InterestFilter>("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const industries = useMemo(
    () => Array.from(new Set(discoveries.map((d) => d.industry))).sort(),
    [discoveries]
  );

  const filteredDiscoveries = useMemo(
    () =>
      discoveries.filter(
        (d) =>
          matchesInterest(d.interests, interestFilter) &&
          (industryFilter === "all" || d.industry === industryFilter)
      ),
    [discoveries, interestFilter, industryFilter]
  );

  const chartData = useMemo(() => {
    const map = new Map<
      string,
      { date: string; Contact: number; Discovery: number }
    >();
    for (const c of contacts) {
      const key = toDayKey(c.created_at);
      const entry = map.get(key) ?? { date: key, Contact: 0, Discovery: 0 };
      entry.Contact += 1;
      map.set(key, entry);
    }
    for (const d of discoveries) {
      const key = toDayKey(d.created_at);
      const entry = map.get(key) ?? { date: key, Contact: 0, Discovery: 0 };
      entry.Discovery += 1;
      map.set(key, entry);
    }
    return Array.from(map.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((entry) => ({ ...entry, label: formatDayLabel(entry.date) }));
  }, [contacts, discoveries]);

  const isFiltered = interestFilter !== "all" || industryFilter !== "all";

  return (
    <>
      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-blue-400/20 bg-navy-900 p-6">
          <p className="font-mono text-3xl font-semibold text-sky-300">
            {contacts.length}
          </p>
          <p className="mt-1 text-sm text-white/60">Contact messages</p>
        </div>
        <div className="rounded-2xl border border-blue-400/20 bg-navy-900 p-6">
          <p className="font-mono text-3xl font-semibold text-sky-300">
            {discoveries.length}
          </p>
          <p className="mt-1 text-sm text-white/60">Discovery submissions</p>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-lg font-medium text-white">
          Submissions Over Time
        </h2>
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
          {chartData.length === 0 ? (
            <p className="text-sm text-white/50">Not enough data yet.</p>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 4, right: 12, left: -12, bottom: 0 }}
                >
                  <CartesianGrid stroke="#1c2a4a" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Contact"
                    stroke="#4d8cff"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#4d8cff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Discovery"
                    stroke="#8fdcff"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#8fdcff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-lg font-medium text-white">
          Contact Messages
        </h2>
        {contacts.length === 0 ? (
          <p className="text-sm text-white/50">No messages yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-white/10 bg-navy-900 p-5"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-white">
                    {c.name}{" "}
                    <span className="font-normal text-white/50">
                      &lt;{c.email}&gt;
                    </span>
                  </p>
                  <p className="font-mono text-xs text-white/40">
                    {formatDate(c.created_at)}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-white">
            Discovery Submissions
            {isFiltered && (
              <span className="ml-2 font-mono text-sm font-normal text-white/40">
                {filteredDiscoveries.length} of {discoveries.length}
              </span>
            )}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full border border-white/10 bg-navy-900 p-1">
              {INTEREST_FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setInterestFilter(f.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    interestFilter === f.value
                      ? "bg-gradient-to-r from-blue-600 to-sky-400 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-xs font-medium text-white/70 outline-none transition-colors duration-200 focus:border-blue-400"
            >
              <option value="all">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredDiscoveries.length === 0 ? (
          <p className="text-sm text-white/50">
            {discoveries.length === 0
              ? "No submissions yet."
              : "No submissions match these filters."}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredDiscoveries.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl border border-white/10 bg-navy-900 p-6"
              >
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-base font-medium text-white">
                      {d.name}{" "}
                      <span className="font-normal text-white/50">
                        &middot; {d.business_name}
                      </span>
                    </p>
                    <p className="text-sm text-white/50">
                      {d.email}
                      {d.phone ? ` · ${d.phone}` : ""}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-white/40">
                    {formatDate(d.created_at)}
                  </p>
                </div>

                <div className="mb-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Industry
                    </p>
                    <p className="text-white/80">{d.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Business Type
                    </p>
                    <p className="text-white/80">{d.business_type}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Years Operating
                    </p>
                    <p className="text-white/80">{d.years_operating}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Audience
                    </p>
                    <p className="text-white/80">{d.audience}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Budget
                    </p>
                    <p className="text-white/80">{d.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Timeline
                    </p>
                    <p className="text-white/80">{d.timeline}</p>
                  </div>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {d.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-sky-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {d.learn_topics && d.learn_topics.length > 0 && (
                  <p className="mb-1 text-xs leading-relaxed text-white/60">
                    <span className="text-white/40">Learn topics: </span>
                    {d.learn_topics.join(", ")}
                    {d.learn_other ? `, ${d.learn_other}` : ""}
                  </p>
                )}
                {d.build_services && d.build_services.length > 0 && (
                  <p className="mb-1 text-xs leading-relaxed text-white/60">
                    <span className="text-white/40">Build services: </span>
                    {d.build_services.join(", ")}
                  </p>
                )}
                {d.build_details && (
                  <p className="mb-1 text-xs leading-relaxed text-white/60">
                    <span className="text-white/40">Build details: </span>
                    {d.build_details}
                  </p>
                )}
                {d.scale_features && d.scale_features.length > 0 && (
                  <p className="mb-1 text-xs leading-relaxed text-white/60">
                    <span className="text-white/40">Scale features: </span>
                    {d.scale_features.join(", ")}
                    {d.scale_other ? `, ${d.scale_other}` : ""}
                  </p>
                )}
                {d.referral_source && (
                  <p className="mb-1 text-xs leading-relaxed text-white/60">
                    <span className="text-white/40">Heard about us: </span>
                    {d.referral_source}
                  </p>
                )}
                {d.message && (
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {d.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
