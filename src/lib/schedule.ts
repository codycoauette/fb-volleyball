import type { Match } from "@/data/team";

/** Parses an ISO date as a local calendar day so dates never shift by a timezone. */
export function parseLocalDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatMatchDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  },
) {
  return parseLocalDate(iso).toLocaleDateString("en-US", options);
}

export function formatLongDate(iso: string) {
  return formatMatchDate(iso, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isUpcoming(match: Match, now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return parseLocalDate(match.date) >= start;
}

export function nextMatch(matches: Match[], now = new Date()) {
  return (
    matches
      .filter((match) => !match.result && isUpcoming(match, now))
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  );
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
