import Link from "next/link";

import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createServerClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("status")
    .order("created_at", { ascending: false });

  const counts = (tasks ?? []).reduce(
    (acc, task) => {
      const key = task.status ?? "backlog";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track the status of your marketing workflow.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Backlog", value: counts.backlog ?? 0 },
          { label: "In progress", value: counts.in_progress ?? 0 },
          { label: "Review", value: counts.review ?? 0 }
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-slate-900/60 p-6"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-slate-900/60 p-8">
        <h2 className="text-lg font-semibold text-white">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link className="text-muted-foreground hover:text-white" href="/board">
            Open board
          </Link>
          <Link className="text-muted-foreground hover:text-white" href="/reports/weekly">
            View weekly report
          </Link>
        </div>
      </div>
    </section>
  );
}
