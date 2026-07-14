"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Compass,
  LayoutDashboard,
  LogOut,
  Mail,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import type { ContactSubmission, DiscoverySubmission } from "@/types/submissions";

type View = "overview" | "contact" | "discovery";
type InterestFilter = "all" | "build" | "learn" | "both";

const INTEREST_FILTERS: { value: InterestFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "build", label: "Build" },
  { value: "learn", label: "Train" },
  { value: "both", label: "Both" },
];

const DAY = 86400000;

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

function initials(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

function matchesInterest(interests: string[], filter: InterestFilter) {
  if (filter === "all") return true;
  const hasBuild = interests.includes("build");
  const hasLearn = interests.includes("learn");
  if (filter === "both") return hasBuild && hasLearn;
  if (filter === "build") return hasBuild;
  return hasLearn;
}

function weekTrend(items: { created_at: string }[]) {
  const now = Date.now();
  let thisWeek = 0;
  let prevWeek = 0;
  for (const item of items) {
    const age = now - new Date(item.created_at).getTime();
    if (age <= 7 * DAY) thisWeek += 1;
    else if (age <= 14 * DAY) prevWeek += 1;
  }
  const deltaPct =
    prevWeek === 0 ? null : Math.round(((thisWeek - prevWeek) / prevWeek) * 100);
  return { thisWeek, deltaPct };
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
    <div className="rounded-lg border border-white/10 bg-navy-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      <p className="mb-1 font-mono text-white/40">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center gap-1.5" style={{ color: entry.color }}>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function TrendBadge({ deltaPct }: { deltaPct: number | null }) {
  if (deltaPct === null) return null;
  const positive = deltaPct >= 0;
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[11px] ${
        positive ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"
      }`}
    >
      {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {Math.abs(deltaPct)}%
    </span>
  );
}

export function AdminDashboard({
  contacts,
  discoveries,
  userEmail,
  signOutAction,
}: {
  contacts: ContactSubmission[];
  discoveries: DiscoverySubmission[];
  userEmail: string;
  signOutAction: () => Promise<void>;
}) {
  const [view, setView] = useState<View>("overview");
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

  const isFiltered = interestFilter !== "all" || industryFilter !== "all";

  const contactTrend = useMemo(() => weekTrend(contacts), [contacts]);
  const discoveryTrend = useMemo(() => weekTrend(discoveries), [discoveries]);

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

  const navItems: { value: View; label: string; icon: typeof Mail; count?: number }[] = [
    { value: "overview", label: "Overview", icon: LayoutDashboard },
    { value: "contact", label: "Contact", icon: Mail, count: contacts.length },
    { value: "discovery", label: "Discovery", icon: Compass, count: discoveries.length },
  ];

  const viewMeta: Record<View, { eyebrow: string; title: string }> = {
    overview: { eyebrow: "// Overview", title: "Dashboard" },
    contact: { eyebrow: "// Contact", title: "Contact Messages" },
    discovery: { eyebrow: "// Discovery", title: "Discovery Submissions" },
  };

  return (
    <div className="flex min-h-screen flex-col bg-navy-950 md:flex-row">
      <aside className="flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-navy-900/60 px-4 py-3 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:flex-col md:items-stretch md:justify-between md:overflow-visible md:border-b-0 md:border-r md:px-5 md:py-8">
        <div className="flex items-center gap-2 md:flex-col md:items-stretch">
          <div className="flex shrink-0 items-center gap-2.5 md:mb-10">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 font-mono text-sm font-bold text-white">
              M
            </div>
            <div className="hidden md:block">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-300">
                MYCTAlgos
              </p>
              <p className="text-xs text-white/40">Admin Console</p>
            </div>
          </div>

          <nav className="flex gap-1 md:flex-col md:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setView(item.value)}
                  className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-gradient-to-r from-blue-600/20 to-sky-400/10 text-white ring-1 ring-inset ring-blue-400/30"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} className={active ? "text-sky-300" : ""} />
                  {item.label}
                  {item.count !== undefined && (
                    <span
                      className={`ml-auto font-mono text-[11px] ${
                        active ? "text-sky-300" : "text-white/30"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 flex-col gap-3 border-t border-white/10 pt-5 md:flex">
          <p className="truncate text-xs text-white/40">{userEmail}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 text-sm text-white/60 transition-colors duration-200 hover:border-white/20 hover:text-white"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </form>
        </div>

        <form action={signOutAction} className="ml-auto shrink-0 md:hidden">
          <button
            type="submit"
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors duration-200 hover:border-white/20 hover:text-white"
          >
            <LogOut size={15} />
          </button>
        </form>
      </aside>

      <div className="relative flex-1 overflow-hidden">
        <BlueprintGrid tone="dark" />
        <div className="relative">
          <header className="border-b border-white/10 px-6 py-8 sm:px-8 lg:px-12">
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {viewMeta[view].eyebrow}
            </p>
            <h1 className="text-2xl font-medium text-white sm:text-3xl">
              {viewMeta[view].title}
            </h1>
          </header>

          <div className="px-6 py-10 sm:px-8 lg:px-12">
            {view === "overview" && (
              <>
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 transition-colors duration-200 hover:border-blue-400/30">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/25 to-sky-400/10 text-sky-300">
                        <Mail size={18} />
                      </div>
                      <TrendBadge deltaPct={contactTrend.deltaPct} />
                    </div>
                    <p className="font-mono text-4xl font-semibold tabular-nums text-white">
                      {contacts.length}
                    </p>
                    <p className="mt-1 text-sm text-white/50">Contact messages</p>
                    <p className="mt-4 text-xs text-white/30">
                      {contactTrend.thisWeek} in the last 7 days
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 transition-colors duration-200 hover:border-blue-400/30">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/25 to-sky-400/10 text-sky-300">
                        <Compass size={18} />
                      </div>
                      <TrendBadge deltaPct={discoveryTrend.deltaPct} />
                    </div>
                    <p className="font-mono text-4xl font-semibold tabular-nums text-white">
                      {discoveries.length}
                    </p>
                    <p className="mt-1 text-sm text-white/50">Discovery submissions</p>
                    <p className="mt-4 text-xs text-white/30">
                      {discoveryTrend.thisWeek} in the last 7 days
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-navy-900 p-6">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Submissions over time
                      </h3>
                      <p className="text-xs text-white/40">
                        Daily contact and discovery volume
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 text-white/60">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        Contact
                      </span>
                      <span className="flex items-center gap-1.5 text-white/60">
                        <span className="h-2 w-2 rounded-full bg-sky-300" />
                        Discovery
                      </span>
                    </div>
                  </div>
                  {chartData.length === 0 ? (
                    <p className="text-sm text-white/50">Not enough data yet.</p>
                  ) : (
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="contactFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#4d8cff" stopOpacity={0.35} />
                              <stop offset="100%" stopColor="#4d8cff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="discoveryFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8fdcff" stopOpacity={0.3} />
                              <stop offset="100%" stopColor="#8fdcff" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            stroke="rgba(255,255,255,0.06)"
                            vertical={false}
                            strokeDasharray="3 6"
                          />
                          <XAxis
                            dataKey="label"
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            allowDecimals={false}
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            width={28}
                          />
                          <Tooltip
                            content={<ChartTooltip />}
                            cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="Contact"
                            stroke="#4d8cff"
                            strokeWidth={2}
                            fill="url(#contactFill)"
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="Discovery"
                            stroke="#8fdcff"
                            strokeWidth={2}
                            fill="url(#discoveryFill)"
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </>
            )}

            {view === "contact" && (
              <>
                {contacts.length === 0 ? (
                  <p className="text-sm text-white/50">No messages yet.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {contacts.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-start gap-4 rounded-xl border border-white/10 bg-navy-900 p-5 transition-colors duration-200 hover:border-blue-400/20"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 font-mono text-sm font-semibold text-white">
                          {initials(c.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                            <p className="text-sm font-medium text-white">
                              {c.name}{" "}
                              <span className="font-normal text-white/40">
                                &lt;{c.email}&gt;
                              </span>
                            </p>
                            <p className="font-mono text-xs text-white/30">
                              {formatDate(c.created_at)}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-white/60">
                            {c.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {view === "discovery" && (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-xs text-white/40">
                    {isFiltered
                      ? `${filteredDiscoveries.length} of ${discoveries.length} submissions`
                      : `${discoveries.length} submissions`}
                  </p>
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
                        className="rounded-2xl border border-white/10 bg-navy-900 p-6 transition-colors duration-200 hover:border-blue-400/20"
                      >
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 font-mono text-sm font-semibold text-white">
                              {initials(d.name)}
                            </div>
                            <div>
                              <p className="text-base font-medium text-white">
                                {d.name}{" "}
                                <span className="font-normal text-white/40">
                                  &middot; {d.business_name}
                                </span>
                              </p>
                              <p className="text-sm text-white/50">
                                {d.email}
                                {d.phone ? ` · ${d.phone}` : ""}
                              </p>
                            </div>
                          </div>
                          <p className="font-mono text-xs text-white/30">
                            {formatDate(d.created_at)}
                          </p>
                        </div>

                        <div className="mb-4 grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Industry
                            </p>
                            <p className="text-white/80">{d.industry}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Business Type
                            </p>
                            <p className="text-white/80">{d.business_type}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Years Operating
                            </p>
                            <p className="text-white/80">{d.years_operating}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Audience
                            </p>
                            <p className="text-white/80">{d.audience}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Budget
                            </p>
                            <p className="text-white/80">{d.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
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
                            <span className="text-white/30">Learn topics: </span>
                            {d.learn_topics.join(", ")}
                            {d.learn_other ? `, ${d.learn_other}` : ""}
                          </p>
                        )}
                        {d.build_services && d.build_services.length > 0 && (
                          <p className="mb-1 text-xs leading-relaxed text-white/60">
                            <span className="text-white/30">Build services: </span>
                            {d.build_services.join(", ")}
                          </p>
                        )}
                        {d.build_details && (
                          <p className="mb-1 text-xs leading-relaxed text-white/60">
                            <span className="text-white/30">Build details: </span>
                            {d.build_details}
                          </p>
                        )}
                        {d.scale_features && d.scale_features.length > 0 && (
                          <p className="mb-1 text-xs leading-relaxed text-white/60">
                            <span className="text-white/30">Scale features: </span>
                            {d.scale_features.join(", ")}
                            {d.scale_other ? `, ${d.scale_other}` : ""}
                          </p>
                        )}
                        {d.referral_source && (
                          <p className="mb-1 text-xs leading-relaxed text-white/60">
                            <span className="text-white/30">Heard about us: </span>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
