import Link from "next/link";

import LoginForm from "./login-form";

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
          Use your email and password to access the marketing workspace.
        </p>
        <LoginForm />
      </div>
      <Link className="text-sm text-muted-foreground hover:text-white" href="/">
        ← Back to home
      </Link>
    </section>
  );
}
