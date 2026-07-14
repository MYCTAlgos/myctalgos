import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { signOut } from "./login/actions";
import type { ContactSubmission, DiscoverySubmission } from "@/types/submissions";

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

        <AdminDashboard contacts={contacts ?? []} discoveries={discoveries ?? []} />
      </div>
    </div>
  );
}
