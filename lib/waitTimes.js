export function formatLastUpdated(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getWaitColor(waitTime, isOpen) {
  if (!isOpen) return "text-zinc-500";
  if (waitTime < 30) return "text-emerald-400";
  if (waitTime < 60) return "text-amber-400";
  return "text-red-400";
}

export function getWaitGlow(waitTime, isOpen) {
  if (!isOpen) return "from-zinc-600/20 to-transparent";
  if (waitTime < 30) return "from-emerald-500/20 to-transparent";
  if (waitTime < 60) return "from-amber-500/20 to-transparent";
  return "from-red-500/20 to-transparent";
}

export function getStatusStyles(isOpen) {
  if (isOpen) {
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-300";
  }
  return "border-zinc-600/40 bg-zinc-800/80 text-zinc-400";
}

export const FEATURED_RIDES = [
  {
    id: "hagrid",
    label: "Hagrid's",
    subtitle: "Motorbike Adventure",
    match: /hagrid/i,
  },
  {
    id: "veloci",
    label: "VelociCoaster",
    subtitle: "Jurassic World",
    match: /velocicoaster/i,
  },
  {
    id: "hulk",
    label: "Hulk",
    subtitle: "Incredible Hulk Coaster",
    match: /incredible hulk coaster/i,
    exclude: /single rider/i,
  },
  {
    id: "spider",
    label: "Spider-Man",
    subtitle: "Amazing Adventures",
    match: /spider-man/i,
    exclude: /single rider/i,
  },
];

export function findFeaturedRide(allRides, { match, exclude }) {
  return allRides.find(
    (ride) =>
      match.test(ride.name) && (!exclude || !exclude.test(ride.name))
  );
}

export function sortRides(rides) {
  return [...rides].sort((a, b) => {
    if (a.is_open !== b.is_open) return a.is_open ? -1 : 1;
    return b.wait_time - a.wait_time;
  });
}
