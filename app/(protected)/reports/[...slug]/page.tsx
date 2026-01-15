import { createServerClient } from "@/lib/supabase/server";

export default async function ReportsPage({
  params
}: {
  params: { slug?: string[] };
}) {
  const supabase = createServerClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id")
    .order("created_at", { ascending: false });

  const reportName = params.slug?.join("/") ?? "overview";

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Reports
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{reportName}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {tasks?.length ?? 0} tasks tracked in the workspace.
        </p>
      </div>
      <div className="rounded-3xl border border-border bg-slate-900/60 p-8 text-sm text-muted-foreground">
        Customize this report view to show KPIs, velocity, and launch results.
      </div>
    </section>
  );
}
