import { MatchList } from "@/components/match-list";
import { SectionHeading } from "@/components/page-hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSiteContent } from "@/content/store";
import { nextMatch } from "@/lib/schedule";

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
  const {
    schedule,
    currentSeason,
    lastSeason,
    lastSeasonResults,
    seasonSnapshot,
  } = await getSiteContent();

  const upcoming = nextMatch(schedule);

  return (
    <Tabs defaultValue="current">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          eyebrow="Match by match"
          title="Season calendar"
          description="Home matches in navy, road matches in light blue, neutral-site tournaments in red."
        />
        <TabsList>
          <TabsTrigger value="current">
            {currentSeason} season ({seasonSnapshot.overall})
          </TabsTrigger>
          <TabsTrigger value="previous">{lastSeason} results</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="current" className="mt-8">
        <MatchList
          matches={schedule}
          highlightId={upcoming?.id}
          emptyMessage={`The ${currentSeason} schedule is still being finalized with the conference office.`}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          {seasonSnapshot.note} Overall {seasonSnapshot.overall}, conference{" "}
          {seasonSnapshot.conference} — see the{" "}
          <a className="font-medium text-falcon-600 hover:underline" href="/history">
            history page
          </a>{" "}
          for prior seasons.
        </p>
      </TabsContent>

      <TabsContent value="previous" className="mt-8">
        <MatchList
          matches={lastSeasonResults}
          emptyMessage={`${lastSeason} match results have not been posted here yet.`}
        />
      </TabsContent>
    </Tabs>
  );
}
