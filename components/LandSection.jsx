import RideCard from "./RideCard";
import { sortRides } from "@/lib/waitTimes";

export default function LandSection({ land }) {
  const rides = sortRides(land.rides);
  const openCount = rides.filter((r) => r.is_open).length;

  return (
    <section className="scroll-mt-24">
      <div className="mb-4 flex flex-col gap-1 border-b border-zinc-800 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {land.name}
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            {openCount} of {rides.length} attractions operating
          </p>
        </div>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400" />
            &lt;30 min
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-400" />
            30–59 min
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-400" />
            60+ min
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} showLand={false} />
        ))}
      </div>
    </section>
  );
}
