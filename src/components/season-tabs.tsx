import { connection } from "next/server";

import { MatchList } from "@/components/match-list";
import { SectionHeading } from "@/components/page-hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  currentSeason,
  lastSeason,
  lastSeasonResults,
  schedule,
} from "@/data/team";
import { nextMatch, recordFromResults } from "@/lib/schedule";

export function SeasonTabsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-72 animate-pulse rounded-lg bg-navy-50" />
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="h-20 animate-pulse rounded-xl bg-navy-50" />
      ))}
    </div>
  );
}

export async function SeasonTabs() {
  // The "next up" badge is relative to today.
  await connection();

  const upcoming = nextMatch(schedule);
  const lastRecord = recordFromResults(lastSeasonResults);

  return (
    <Tabs defaultValue="current">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Match by match"
          title="Season calendar"
          description="Home matches in navy, road matches in light blue, neutral-site tournaments in red."
        />
        <TabsList>
          <TabsTrigger value="current">{currentSeason} season</TabsTrigger>
          <TabsTrigger value="previous">
            {lastSeason} results ({lastRecord.label})
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="current" className="mt-8">
        <MatchList
          matches={schedule}
          highlightId={upcoming?.id}
          emptyMessage={`The ${currentSeason} schedule is still being finalized with the conference office.`}
        />
      </TabsContent>

      <TabsContent value="previous" className="mt-8">
        <MatchList matches={lastSeasonResults} />
        <p className="mt-4 text-sm text-muted-foreground">
          Conference and section matches shown. Tournament pool play is summarized on
          the{" "}
          <a className="font-medium text-falcon-600 hover:underline" href="/history">
            history page
          </a>
          .
        </p>
      </TabsContent>
    </Tabs>
  );
}
