export default function AboutPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          About us
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          A marketing studio built for modern product teams.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          We blend creative direction, analytics, and campaign execution so your
          team can ship launches with confidence. Our playbooks help you stay
          aligned, from kickoff through post-launch insights.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Our mission</h2>
          <p className="mt-3 text-sm text-slate-300">
            Build unforgettable product stories that feel human, helpful, and
            measurable.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">How we work</h2>
          <p className="mt-3 text-sm text-slate-300">
            Pair strategic messaging with fast iteration, so teams can deliver
            impact without guesswork.
          </p>
        </div>
      </div>
    </section>
  );
}
