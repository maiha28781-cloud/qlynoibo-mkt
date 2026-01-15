import Link from "next/link";
import { notFound } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

export default async function TaskDetailPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const { data: task } = await supabase
    .from("tasks")
    .select(
      "id, title, description, status, type, priority, due_date, profiles(name)"
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!task) {
    notFound();
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("id, body, created_at, profiles(name)")
    .eq("task_id", params.id)
    .order("created_at", { ascending: true });

  const { data: links } = await supabase
    .from("links")
    .select("id, label, url")
    .eq("task_id", params.id)
    .order("created_at", { ascending: true });

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Link className="text-sm text-muted-foreground hover:text-white" href="/board">
          ← Back to board
        </Link>
        <h1 className="text-3xl font-semibold text-white">{task.title}</h1>
        <p className="text-sm text-muted-foreground">
          {task.description ?? "No description yet."}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-1">
            {task.type ?? "other"}
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            {task.status}
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Priority {task.priority ?? 3}
          </span>
          {task.profiles?.name ? (
            <span className="rounded-full border border-border px-3 py-1">
              Assigned to {task.profiles.name}
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Comments</h2>
          <div className="mt-4 flex flex-col gap-4">
            {(comments ?? []).map((comment) => (
              <div
                key={comment.id}
                className="rounded-2xl border border-border bg-slate-950/70 p-4"
              >
                <p className="text-sm text-foreground">{comment.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {comment.profiles?.name ?? "Member"}
                </p>
              </div>
            ))}
            {(comments ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No comments yet.
              </p>
            ) : null}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Links</h2>
          <div className="mt-4 flex flex-col gap-3">
            {(links ?? []).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-border bg-slate-950/70 px-4 py-3 text-sm text-foreground hover:border-white/40"
              >
                <p className="font-semibold text-white">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.url}</p>
              </a>
            ))}
            {(links ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No links yet.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
