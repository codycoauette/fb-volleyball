import { CalendarOffIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Match } from "@/content/types";
import { formatMatchDate, parseLocalDate } from "@/lib/schedule";
import { cn } from "@/lib/utils";

const siteStyles: Record<Match["site"], string> = {
  Home: "bg-navy-900 text-white",
  Away: "bg-navy-100 text-navy-800",
  Neutral: "bg-falcon-50 text-falcon-700",
};

export function MatchList({
  matches,
  emptyMessage = "No matches posted yet.",
  highlightId,
}: {
  matches: Match[];
  emptyMessage?: string;
  highlightId?: string | null;
}) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-14 text-center">
        <CalendarOffIcon className="size-6 text-muted-foreground" />
        <p className="font-heading text-lg font-semibold tracking-tight text-navy-900 uppercase">
          Nothing on the calendar
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y rounded-xl ring-1 ring-foreground/10">
      {matches.map((match) => {
        const date = parseLocalDate(match.date);
        const highlighted = highlightId === match.id;

        return (
          <li
            key={match.id}
            className={cn(
              "grid gap-3 px-4 py-4 sm:grid-cols-[6rem_1fr_auto] sm:items-center sm:gap-5 sm:px-5",
              highlighted && "bg-falcon-50/60",
            )}
          >
            <div className="flex items-baseline gap-2 sm:block">
              <p className="font-heading text-xs font-semibold tracking-[0.18em] text-falcon-600 uppercase">
                {date.toLocaleDateString("en-US", { month: "short" })}
              </p>
              <p className="font-heading text-2xl leading-none font-bold text-navy-900 tabular-nums">
                {date.getDate()}
              </p>
              <p className="text-xs text-muted-foreground sm:mt-1">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("rounded-md", siteStyles[match.site])}>
                  {match.site === "Neutral" ? "Neutral site" : match.site}
                </Badge>
                {highlighted ? (
                  <Badge className="rounded-md bg-falcon-500 text-white">
                    Next up
                  </Badge>
                ) : null}
                <Badge variant="outline" className="rounded-md">
                  {match.type}
                </Badge>
              </div>
              <p className="mt-2 font-heading text-lg leading-tight font-semibold tracking-tight text-navy-900">
                {match.opponent}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {match.time}
                {match.venue ? ` · ${match.venue}` : ""}
              </p>
              {match.result?.note ? (
                <p className="mt-1 text-xs text-muted-foreground italic">
                  {match.result.note}
                </p>
              ) : null}
            </div>

            <div className="sm:text-right">
              {match.result ? (
                <>
                  <p
                    className={cn(
                      "font-heading text-xl font-bold",
                      match.result.outcome === "W"
                        ? "text-emerald-600"
                        : "text-falcon-600",
                    )}
                  >
                    {match.result.outcome === "W" ? "Win" : "Loss"}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {match.result.sets.join(", ")}
                  </p>
                </>
              ) : (
                <p className="text-sm font-medium text-muted-foreground">
                  {formatMatchDate(match.date, {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit",
                  })}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
