import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Marketing made simple
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Launch campaigns that turn visitors into lifelong customers.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Qlynoibo helps teams plan, launch, and track beautiful product
          storytelling in one workspace. Keep your brand consistent, move faster,
          and celebrate every conversion.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className={buttonVariants()} href="/login">
            Get started
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/login">
            Go to login
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Strategy",
            description:
              "Align your launch plan with clear goals and focused messaging."
          },
          {
            title: "Execution",
            description: "Coordinate content, creative, and channels in one place."
          },
          {
            title: "Insights",
            description: "Track results in real time and keep improving your funnel."
          }
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-slate-900/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
