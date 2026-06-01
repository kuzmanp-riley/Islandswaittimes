import {
  formatLastUpdated,
  getStatusStyles,
  getWaitColor,
  getWaitGlow,
} from "@/lib/waitTimes";

export default function HeroRideCard({ ride, label, subtitle }) {
  if (!ride) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="mt-4 text-3xl font-bold text-zinc-400 dark:text-zinc-600">
          —
        </p>
        <p className="mt-2 text-xs text-zinc-500">No data</p>
      </div>
    );
  }

  const isOpen = ride.is_open;
  const waitColor = getWaitColor(ride.wait_time, isOpen);
  const glow = getWaitGlow(ride.wait_time, isOpen);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-lg ring-1 ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:ring-white/5">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow}`}
        aria-hidden
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              {label}
            </h3>
            <p className="text-xs text-zinc-500">{subtitle}</p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(isOpen)}`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>

        <p
          className={`text-4xl font-bold tabular-nums sm:text-5xl ${waitColor}`}
        >
          {isOpen ? (
            <>
              {ride.wait_time}
              <span className="ml-1 text-lg font-semibold text-zinc-500">min</span>
            </>
          ) : (
            "—"
          )}
        </p>

        <p className="text-xs text-zinc-500">
          Updated {formatLastUpdated(ride.last_updated)}
        </p>
      </div>
    </article>
  );
}
