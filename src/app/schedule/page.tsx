import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadIcon, InfoIcon } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { SeasonTabs, SeasonTabsSkeleton } from "@/components/season-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currentSeason, lastSeason, schedule, team } from "@/data/team";

export const metadata: Metadata = {
  title: "Schedule",
  description: `${currentSeason} match schedule and ${lastSeason} results for ${team.program}.`,
};

export default function SchedulePage() {
  const homeMatches = schedule.filter((match) => match.site === "Home").length;

  return (
    <>
      <PageHero
        photo={heroPhotos[0]}
        eyebrow="Falcons volleyball"
        title={`${currentSeason} Schedule`}
        description={`${schedule.length} dates, ${homeMatches} of them in ${team.gym}. Conference matches start at 7:15 PM with JV at 6:15. Dates move when the weather does — check back the week of the match.`}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="h-11 rounded-md bg-falcon-500 px-5 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
          >
            <a href="/api/calendar" download>
              <DownloadIcon className="size-4" />
              Add to calendar
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Suspense fallback={<SeasonTabsSkeleton />}>
          <SeasonTabs />
        </Suspense>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card className="bg-navy-50">
            <CardContent>
              <p className="eyebrow text-falcon-600">Home dates</p>
              <p className="stat-figure mt-2 text-navy-900">{homeMatches}</p>
              <p className="mt-2 text-sm text-navy-800">
                Including Parents Night and Senior Night in {team.gym}.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-navy-50">
            <CardContent>
              <p className="eyebrow text-falcon-600">Conference matches</p>
              <p className="stat-figure mt-2 text-navy-900">
                {schedule.filter((m) => m.type === "Conference").length}
              </p>
              <p className="mt-2 text-sm text-navy-800">
                {team.conference} play decides the section seed.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-navy-50">
            <CardContent>
              <p className="eyebrow text-falcon-600">Tournaments</p>
              <p className="stat-figure mt-2 text-navy-900">
                {schedule.filter((m) => m.type === "Tournament").length}
              </p>
              <p className="mt-2 text-sm text-navy-800">
                All-day events; bring a chair and plan on lunch in the gym.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex gap-3 rounded-xl bg-navy-50 p-5 text-sm text-navy-800">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-falcon-600" />
          <p>
            Schedule changes are announced through the activities office and posted
            here first. Section tournament pairings are set by the seeding meeting in
            October, so opponents for section dates appear once brackets are released.
          </p>
        </div>
      </section>
    </>
  );
}
