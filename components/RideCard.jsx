import { Clock } from "lucide-react";
import {
  formatLastUpdated,
  getStatusStyles,
  getWaitColor,
} from "@/lib/waitTimes";

export default function RideCard({ ride, showLand = true }) {
  const isOpen = ride.is_open;
  const waitColor = getWaitColor(ride.wait_time, isOpen);
  const status = isOpen ? "Open" : "Closed";

  return (
    <article className="flex min-h-[200px] flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 ring-1 ring-white/5 transition-colors hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-zinc-100">
          {ride.name}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(isOpen)}`}
        >
          {status}
        </span>
      </div>

      <div className="my-5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Wait time
        </p>
        <p className={`text-4xl font-bold tabular-nums ${waitColor}`}>
          {isOpen ? (
            <>
              {ride.wait_time}
              <span className="ml-1.5 text-lg font-medium text-zinc-500">min</span>
            </>
          ) : (
            <span className="text-3xl text-zinc-600">—</span>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-zinc-800 pt-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 shrink-0" aria-hidden />
          <time dateTime={ride.last_updated}>
            {formatLastUpdated(ride.last_updated)}
          </time>
        </span>
        {showLand && ride.land && (
          <span className="truncate text-right text-zinc-600">{ride.land}</span>
        )}
      </div>
    </article>
  );
}
