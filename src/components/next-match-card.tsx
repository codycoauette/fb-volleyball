import Link from "next/link";
import { connection } from "next/server";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { schedule, team } from "@/data/team";
import { formatLongDate, formatMatchDate, nextMatch } from "@/lib/schedule";

export function NextMatchCardSkeleton() {
  return (
    <Card className="border-0 bg-white/95 shadow-2xl ring-0">
      <CardHeader className="border-b pb-4">
        <p className="eyebrow text-falcon-600">Next match</p>
        <div className="mt-2 h-7 w-3/4 animate-pulse rounded bg-navy-100" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="h-4 w-full animate-pulse rounded bg-navy-50" />
        ))}
      </CardContent>
    </Card>
  );
}

export async function NextMatchCard() {
  // Which match is "next" depends on today's date.
  await connection();

  const upcoming = nextMatch(schedule);
  const following = schedule
    .filter((match) => !match.result && match.id !== upcoming?.id)
    .slice(0, 2);

  return (
    <Card className="border-0 bg-white/95 shadow-2xl ring-0">
      <CardHeader className="border-b pb-4">
        <p className="eyebrow text-falcon-600">
          {upcoming ? "Next match" : "Season complete"}
        </p>
        <CardTitle className="text-2xl font-bold tracking-tight text-navy-900 uppercase">
          {upcoming ? upcoming.opponent : "Thanks for a great season"}
        </CardTitle>
        <CardDescription>
          {upcoming
            ? `${upcoming.site === "Home" ? "Home match" : upcoming.site === "Away" ? "On the road" : "Neutral site"} · ${upcoming.type}`
            : "Next fall's schedule is posted as soon as the conference sets dates."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcoming ? (
          <>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-falcon-500" />
                <dd className="font-medium text-navy-900">
                  {formatLongDate(upcoming.date)}
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-falcon-500" />
                <dd>{upcoming.time} · varsity follows JV</dd>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-falcon-500" />
                <dd>{upcoming.venue ?? upcoming.site}</dd>
              </div>
              <div className="flex items-start gap-3">
                <TicketIcon className="mt-0.5 size-4 shrink-0 text-falcon-500" />
                <dd>{team.ticketNote}</dd>
              </div>
            </dl>

            {following.length > 0 ? (
              <div className="border-t pt-4">
                <p className="eyebrow text-muted-foreground">Then</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {following.map((match) => (
                    <li
                      key={match.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="font-medium text-navy-900">
                        {match.opponent}
                      </span>
                      <span className="shrink-0 text-muted-foreground tabular-nums">
                        {formatMatchDate(match.date)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Check the record book for how the season finished, or help fund next fall
            on the support page.
          </p>
        )}

        <Button
          asChild
          variant="outline"
          className="h-10 w-full rounded-md font-heading font-semibold tracking-wide uppercase"
        >
          <Link href="/schedule">
            Full schedule
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
