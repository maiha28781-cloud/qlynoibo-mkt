export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Marketing made simple
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Launch campaigns that turn visitors into lifelong customers.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Qlynoibo helps teams plan, launch, and track beautiful product
          storytelling in one workspace. Keep your brand consistent, move faster,
          and celebrate every conversion.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
            Start a campaign
          </button>
          <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400 hover:text-slate-200">
            View demo
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Strategy",
            description: "Align your launch plan with clear goals and focused messaging."
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
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
