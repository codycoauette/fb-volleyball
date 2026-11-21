import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { getSiteContent } from "@/content/store";
import { formatMatchDate, nextMatch } from "@/lib/schedule";

export function ScoreboardStripSkeleton() {
  return (
    <section className="border-b border-white/10 bg-navy-900">
      <div className="mx-auto h-[6.5rem] max-w-6xl animate-pulse px-4 py-6">
        <div className="h-full rounded-lg bg-white/5" />
      </div>
    </section>
  );
}

export async function ScoreboardStrip() {
  const {
    schedule,
    lastSeason,
    lastSeasonResults,
    seasonSnapshot,
  } = await getSiteContent();

  const upcoming = nextMatch(schedule);
  const lastResult = lastSeasonResults.filter((match) => match.result).at(-1);

  return (
    <section className="border-b border-white/10 bg-navy-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-px px-4 sm:grid-cols-3">
        <div className="py-5 sm:pr-6">
          <p className="eyebrow text-falcon-300">
            {upcoming ? "Next match" : "Season complete"}
          </p>
          {upcoming ? (
            <>
              <p className="mt-1.5 font-heading text-xl font-bold tracking-tight uppercase">
                {upcoming.site === "Away" ? "at" : "vs."} {upcoming.opponent}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-navy-200">
                <span className="font-medium text-white">
                  {formatMatchDate(upcoming.date)}
                </span>
                <span>·</span>
                <span>{upcoming.time}</span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="size-3.5 text-falcon-300" />
                  {upcoming.venue ?? upcoming.site}
                </span>
              </p>
            </>
          ) : (
            <p className="mt-1.5 text-sm text-navy-200">
              Next fall&apos;s dates post as soon as the conference sets them.
            </p>
          )}
        </div>

        <div className="border-t border-white/10 py-5 sm:border-t-0 sm:border-l sm:px-6">
          <p className="eyebrow text-falcon-300">Last result</p>
          {lastResult?.result ? (
            <>
              <p className="mt-1.5 font-heading text-xl font-bold tracking-tight uppercase">
                <span
                  className={
                    lastResult.result.outcome === "W"
                      ? "text-emerald-400"
                      : "text-falcon-400"
                  }
                >
                  {lastResult.result.outcome === "W" ? "Win" : "Loss"}
                </span>{" "}
                {lastResult.opponent.replace(/^Section 8A \w+ vs\. /, "")}
              </p>
              <p className="mt-1 font-mono text-sm text-navy-200 tabular-nums">
                {lastResult.result.sets.join(" · ")}
              </p>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 py-5 sm:border-t-0 sm:border-l sm:pl-6">
          <div>
            <p className="eyebrow text-falcon-300">{lastSeason} record</p>
            <p className="mt-1.5 font-heading text-xl font-bold tracking-tight uppercase tabular-nums">
              {seasonSnapshot.overall}
            </p>
            <p className="mt-1 text-sm text-navy-200">{seasonSnapshot.finish}</p>
          </div>
          <Link
            href="/schedule"
            className="group flex shrink-0 items-center gap-1 font-heading text-sm font-semibold tracking-wide text-falcon-300 uppercase hover:text-white"
          >
            Schedule
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
