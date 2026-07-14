import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
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
    <AdminDashboard
      contacts={contacts ?? []}
      discoveries={discoveries ?? []}
      userEmail={userData.user.email ?? "Admin"}
      signOutAction={signOut}
    />
  );
}
