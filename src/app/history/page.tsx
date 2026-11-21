import type { Metadata } from "next";
import { AwardIcon } from "lucide-react";

import { PageHero, SectionHeading } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  careerLeaders,
  honors,
  programMilestones,
  programRecords,
  seasonHistory,
  team,
} from "@/data/team";

export const metadata: Metadata = {
  title: "History & Stats",
  description: `Record book, season-by-season results and career leaders for ${team.program}.`,
};

export default function HistoryPage() {
  const totals = seasonHistory.reduce(
    (acc, season) => {
      const [wins, losses] = season.overall.split("-").map(Number);
      return { wins: acc.wins + wins, losses: acc.losses + losses };
    },
    { wins: 0, losses: 0 },
  );
  const winPct = (totals.wins / (totals.wins + totals.losses)) * 100;

  return (
    <>
      <PageHero
        photo={heroPhotos[2]}
        eyebrow="Record book"
        title="History & Stats"
        description="Program records, season-by-season results, career leaders and postseason finishes. Numbers come from match books kept by the coaching staff and student statisticians."
      >
        <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:flex sm:flex-wrap">
          <div>
            <dt className="eyebrow text-falcon-200">Seasons listed</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {seasonHistory.length}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">Wins in those seasons</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {totals.wins}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">Winning percentage</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {winPct.toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">State tournament trips</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">1</dd>
          </div>
        </dl>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Single-season & single-match"
          title="Program records"
          description="The marks to beat. Submit a correction to the activities office if a match book says otherwise."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programRecords.map((record) => (
            <Card key={record.label}>
              <CardContent>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {record.label}
                </p>
                <p className="stat-figure mt-2 text-navy-900">{record.value}</p>
                <p className="mt-3 text-sm font-medium text-navy-900">
                  {record.holder}
                </p>
                <p className="text-xs text-muted-foreground">{record.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Year by year"
              title="Season results"
              description="Overall record, conference finish and how far the Falcons went in Section 8A."
            />
            <div className="mt-6 overflow-x-auto rounded-xl ring-1 ring-foreground/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Season</TableHead>
                    <TableHead>Overall</TableHead>
                    <TableHead>Conference</TableHead>
                    <TableHead>Postseason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seasonHistory.map((season) => (
                    <TableRow key={season.season}>
                      <TableCell className="font-mono font-medium text-navy-900 tabular-nums">
                        {season.season}
                      </TableCell>
                      <TableCell className="tabular-nums">{season.overall}</TableCell>
                      <TableCell className="tabular-nums">
                        {season.conference}
                      </TableCell>
                      <TableCell>{season.postseason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Seasons before 2013 are being transcribed from printed programs and will
              be added as they are verified.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Milestones" title="Program moments" />
            <ol className="mt-6 space-y-5 border-l-2 border-navy-100 pl-6">
              {programMilestones
                .slice()
                .reverse()
                .map((milestone) => (
                  <li key={milestone.year} className="relative">
                    <span className="absolute top-1.5 -left-[1.9rem] size-3 rounded-full bg-falcon-500 ring-4 ring-white" />
                    <p className="font-mono text-xs font-semibold text-falcon-600">
                      {milestone.year}
                    </p>
                    <p className="font-heading text-lg font-semibold tracking-tight text-navy-900">
                      {milestone.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {milestone.detail}
                    </p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="All-time leaders"
            title="Career leaderboards"
            description="Totals across a player's varsity career."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {careerLeaders.map((board) => (
              <Card key={board.category}>
                <CardHeader className="border-b pb-3">
                  <CardTitle className="font-heading text-base font-semibold tracking-wide text-navy-900 uppercase">
                    {board.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ol>
                    {board.rows.map((row, index) => (
                      <li
                        key={row.name}
                        className="flex items-center gap-3 border-b px-5 py-3 last:border-0"
                      >
                        <span className="w-5 font-mono text-sm text-muted-foreground tabular-nums">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-navy-900">
                            {row.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {row.years}
                          </span>
                        </span>
                        <span className="font-heading text-lg font-bold text-navy-900 tabular-nums">
                          {row.value}
                        </span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Honors"
          title="All-conference & academic awards"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {honors.map((year) => (
            <Card key={year.season}>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-lg font-bold text-navy-900">
                    {year.season}
                  </CardTitle>
                  <Badge variant="outline" className="rounded-md">
                    <AwardIcon className="size-3" />
                    {year.items.length} honors
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-navy-800">
                  {year.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-falcon-500">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
