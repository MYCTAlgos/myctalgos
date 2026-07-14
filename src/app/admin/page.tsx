import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { signOut } from "./login/actions";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  message: string;
  created_at: string;
};

type DiscoverySubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  industry: string;
  business_type: string;
  years_operating: string;
  audience: string;
  interests: string[];
  learn_topics: string[] | null;
  learn_other: string | null;
  build_services: string[] | null;
  build_details: string | null;
  budget: string;
  timeline: string;
  scale_features: string[] | null;
  scale_other: string | null;
  referral_source: string | null;
  message: string | null;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/admin/login");
  }

  const [{ data: contacts }, { data: discoveries }] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<ContactSubmission[]>(),
    supabase
      .from("discovery_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<DiscoverySubmission[]>(),
  ]);

  const contactList = contacts ?? [];
  const discoveryList = discoveries ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-950">
      <BlueprintGrid tone="dark" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {"// Admin"}
            </p>
            <h1 className="text-3xl font-medium text-white">Dashboard</h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition-colors duration-200 hover:border-white/30 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-400/20 bg-navy-900 p-6">
            <p className="font-mono text-3xl font-semibold text-sky-300">
              {contactList.length}
            </p>
            <p className="mt-1 text-sm text-white/60">Contact messages</p>
          </div>
          <div className="rounded-2xl border border-blue-400/20 bg-navy-900 p-6">
            <p className="font-mono text-3xl font-semibold text-sky-300">
              {discoveryList.length}
            </p>
            <p className="mt-1 text-sm text-white/60">Discovery submissions</p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-lg font-medium text-white">
            Contact Messages
          </h2>
          {contactList.length === 0 ? (
            <p className="text-sm text-white/50">No messages yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {contactList.map((c) => (
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
          <h2 className="mb-6 text-lg font-medium text-white">
            Discovery Submissions
          </h2>
          {discoveryList.length === 0 ? (
            <p className="text-sm text-white/50">No submissions yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {discoveryList.map((d) => (
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
      </div>
    </div>
  );
}
