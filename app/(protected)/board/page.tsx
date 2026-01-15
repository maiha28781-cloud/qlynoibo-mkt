import Link from "next/link";

import { createServerClient } from "@/lib/supabase/server";

const columns = [
  { key: "backlog", title: "Backlog" },
  { key: "todo", title: "To do" },
  { key: "in_progress", title: "In progress" },
  { key: "review", title: "Review" },
  { key: "done", title: "Done" }
] as const;

type TaskStatus = (typeof columns)[number]["key"];

type TaskRecord = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  type: string | null;
  priority: number | null;
  due_date: string | null;
  assignee_id: string | null;
  profiles?: { name: string | null } | null;
};

export default async function BoardPage() {
  const supabase = createServerClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select(
      "id, title, description, status, type, priority, due_date, assignee_id, profiles(name)"
    )
    .order("created_at", { ascending: true });

  const grouped = (tasks ?? []).reduce(
    (acc, task) => {
      const status = (task.status ?? "backlog") as TaskStatus;
      acc[status] = [...(acc[status] ?? []), task as TaskRecord];
      return acc;
    },
    {} as Record<TaskStatus, TaskRecord[]>
  );

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Kanban board</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Stay on top of the marketing pipeline from backlog to done.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        {columns.map((column) => (
          <div
            key={column.key}
            className="rounded-2xl border border-border bg-slate-900/40 p-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                {column.title}
              </h2>
              <span className="text-xs text-muted-foreground">
                {(grouped[column.key] ?? []).length}
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {(grouped[column.key] ?? []).map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="rounded-2xl border border-border bg-slate-950/70 p-4 text-sm text-foreground transition hover:border-white/40"
                >
                  <p className="font-semibold text-white">{task.title}</p>
                  {task.description ? (
                    <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
                      {task.description}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded-full border border-border px-2 py-1">
                      {task.type ?? "other"}
                    </span>
                    <span className="rounded-full border border-border px-2 py-1">
                      Priority {task.priority ?? 3}
                    </span>
                    {task.profiles?.name ? (
                      <span className="rounded-full border border-border px-2 py-1">
                        {task.profiles.name}
                      </span>
                    ) : null}
                  </div>
                </Link>
              ))}
              {(grouped[column.key] ?? []).length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No tasks in this column yet.
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
