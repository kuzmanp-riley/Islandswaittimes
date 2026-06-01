"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Radio, RefreshCw } from "lucide-react";
import HeroRideCard from "../components/HeroRideCard";
import LandSection from "../components/LandSection";
import ThemeToggle from "../components/ThemeToggle";
import {
  FEATURED_RIDES,
  findFeaturedRide,
} from "@/lib/waitTimes";

export default function Home() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    loadWaitTimes();

    const interval = setInterval(loadWaitTimes, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadWaitTimes() {
    if (!loading) setRefreshing(true);

    try {
      const response = await fetch("/api/wait-times");
      const data = await response.json();

      setLands(
        data.lands.map((land) => ({
          name: land.name,
          rides: land.rides.map((ride) => ({
            ...ride,
            land: land.name,
          })),
        }))
      );
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const allRides = useMemo(
    () => lands.flatMap((land) => land.rides),
    [lands]
  );

  const featured = useMemo(
    () =>
      FEATURED_RIDES.map((config) => ({
        ...config,
        ride: findFeaturedRide(allRides, config),
      })),
    [allRides]
  );

  const openCount = allRides.filter((r) => r.is_open).length;
  const openWaits = allRides.filter((r) => r.is_open).map((r) => r.wait_time);
  const avgWait =
    openWaits.length > 0
      ? Math.round(openWaits.reduce((a, b) => a + b, 0) / openWaits.length)
      : 0;

  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-lg dark:border-zinc-800/80 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/30 dark:text-sky-400">
              <Radio className="size-4" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
                Live ops
              </p>
              <h1 className="text-sm font-bold text-zinc-900 sm:text-base dark:text-white">
                Islands of Adventure
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 sm:gap-3">
            <ThemeToggle />
            <span
              className={`hidden items-center gap-1.5 sm:flex ${refreshing ? "text-sky-400" : ""}`}
            >
              <span
                className={`size-2 rounded-full bg-emerald-400 ${refreshing ? "animate-pulse" : ""}`}
              />
              Auto-refresh 60s
            </span>
            {lastRefresh && (
              <span className="flex items-center gap-1.5 tabular-nums">
                <RefreshCw
                  className={`size-3.5 ${refreshing ? "animate-spin" : ""}`}
                  aria-hidden
                />
                {lastRefresh.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white">
              Headline attractions
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Real-time waits for the park&apos;s biggest draws. Data syncs
              automatically every minute.
            </p>
          </div>

          <dl className="mb-8 grid grid-cols-3 gap-3 sm:mb-10 lg:grid-cols-3 lg:gap-4">
            <div className="rounded-xl border border-zinc-200 bg-white/80 px-3 py-3 sm:px-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">
                Total
              </dt>
              <dd className="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
                {loading ? "—" : allRides.length}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white/80 px-3 py-3 sm:px-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">
                Open
              </dt>
              <dd className="mt-1 text-xl font-bold tabular-nums text-emerald-400 sm:text-2xl">
                {loading ? "—" : openCount}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white/80 px-3 py-3 sm:px-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">
                <Activity className="size-3" aria-hidden />
                Avg wait
              </dt>
              <dd className="mt-1 text-xl font-bold tabular-nums sm:text-2xl">
                {loading ? "—" : `${avgWait}m`}
              </dd>
            </div>
          </dl>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? FEATURED_RIDES.map((f) => (
                  <div
                    key={f.id}
                    className="h-36 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
                  />
                ))
              : featured.map(({ id, label, subtitle, ride }) => (
                  <HeroRideCard
                    key={id}
                    ride={ride}
                    label={label}
                    subtitle={subtitle}
                  />
                ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:space-y-16 lg:py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 sm:text-xl dark:text-white">
            All lands
          </h2>
          <p className="text-xs text-zinc-500">
            {lands.length} sections · color-coded waits
          </p>
        </div>

        {loading ? (
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-48 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          lands.map((land) => <LandSection key={land.name} land={land} />)
        )}
      </main>

      <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-600">
        Wait times via queue-times.com · Park ID 64 · Not affiliated with
        Universal
      </footer>
    </div>
  );
}
