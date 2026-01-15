import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

const defaultRole = "content";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const name = user.user_metadata?.full_name ?? user.email ?? "New member";
    await supabase.from("profiles").insert({
      id: user.id,
      name,
      role: defaultRole
    });
  } else if (!profile.name) {
    const name = user.user_metadata?.full_name ?? user.email;
    if (name) {
      await supabase.from("profiles").update({ name }).eq("id", user.id);
    }
  }

  return children;
}
