import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-3xl border border-border bg-slate-900/60 p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Welcome back
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Sign in to Qlynoibo
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This is a placeholder login screen. Hook this up to your auth provider
          when you&apos;re ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button">Continue with email</Button>
          <Button type="button" variant="outline">
            Contact sales
          </Button>
        </div>
      </div>
      <Link className="text-sm text-muted-foreground hover:text-white" href="/">
        ← Back to home
      </Link>
    </section>
  );
}
