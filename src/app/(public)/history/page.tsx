import type { Metadata } from "next";
import { AwardIcon } from "lucide-react";

import { PageHero, SectionHeading } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteContent } from "@/content/store";
import type { LeaderBoard, ProgramRecord } from "@/content/types";
import { team as seedTeam } from "@/data/team";

export const metadata: Metadata = {
  title: "History & Stats",
  description: `Career top 10s, season records and single-match marks for ${seedTeam.program}.`,
};

const CAREER_ORDER = [
  "Career assists",
  "Career kills",
  "Career blocks",
  "Career digs",
] as const;

function orderedCareerBoards(boards: LeaderBoard[]) {
  const byCategory = new Map(
    boards.map((board) => [board.category.toLowerCase(), board]),
  );
  const ordered = CAREER_ORDER.map((label) => {
    const found = byCategory.get(label.toLowerCase());
    return (
      found ?? {
        category: label,
        rows: [],
      }
    );
  });
  const extras = boards.filter(
    (board) =>
      !CAREER_ORDER.some(
        (label) => label.toLowerCase() === board.category.toLowerCase(),
      ),
  );
  return [...ordered, ...extras];
}

function RecordGrid({
  records,
  empty,
}: {
  records: ProgramRecord[];
  empty: string;
}) {
  if (records.length === 0) {
    return <p className="mt-6 text-sm text-muted-foreground">{empty}</p>;
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {records.map((record) => (
        <Card key={`${record.scope}-${record.label}-${record.holder}`}>
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
  );
}

export default async function HistoryPage() {
  const { careerLeaders, honors, programRecords, seasonSnapshot } =
    await getSiteContent();

  const boards = orderedCareerBoards(careerLeaders).map((board) => ({
    ...board,
    rows: board.rows.slice(0, 10),
  }));
  const withScope = programRecords.map((record) => {
    if (record.scope) return record;
    const label = record.label.toLowerCase();
    const scope =
      label.includes("single") || label.includes("match") || label.includes("game")
        ? ("match" as const)
        : ("season" as const);
    return { ...record, scope };
  });
  const seasonRecords = withScope.filter((record) => record.scope === "season");
  const matchRecords = withScope.filter((record) => record.scope === "match");

  return (
    <>
      <PageHero
        photo={heroPhotos[0]}
        eyebrow="Record book"
        title="History & Stats"
        description="Career top 10s in assists, kills, blocks and digs — then the season and single-match marks to beat."
      >
        <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:flex sm:flex-wrap">
          <div>
            <dt className="eyebrow text-falcon-200">Latest season</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {seasonSnapshot.overall}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">Conference</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {seasonSnapshot.conference}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">Postseason</dt>
            <dd className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
              {seasonSnapshot.finish}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-falcon-200">Career boards</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {boards.length}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="All-time"
          title="Career top 10"
          description="Assists, kills, blocks and digs across a player's varsity career."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {boards.map((board) => (
            <Card key={board.category}>
              <CardHeader className="border-b pb-3">
                <CardTitle className="font-heading text-base font-semibold tracking-wide text-navy-900 uppercase">
                  {board.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {board.rows.length === 0 ? (
                  <p className="px-5 py-6 text-sm text-muted-foreground">
                    No entries posted yet.
                  </p>
                ) : (
                  <ol>
                    {board.rows.map((row, index) => (
                      <li
                        key={`${row.name}-${row.years}`}
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Single season"
            title="Season records"
            description="Best individual and team marks in one fall."
          />
          <RecordGrid
            records={seasonRecords}
            empty="No season records posted yet."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Single match"
          title="Single-game records"
          description="The one-night highs from the match books."
        />
        <RecordGrid
          records={matchRecords}
          empty="No single-game records posted yet."
        />
      </section>

      <section className="border-t bg-navy-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
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
        </div>
      </section>
    </>
  );
}
