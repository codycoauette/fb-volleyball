import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  HeartIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import { FalconMark } from "@/components/falcon-mark";
import { GoalMeter } from "@/components/goal-meter";
import {
  NextMatchCard,
  NextMatchCardSkeleton,
} from "@/components/next-match-card";
import { SectionHeading } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaigns, quickLinks, roster, seasonSnapshot, team } from "@/data/team";

const icons = {
  "/schedule": CalendarDaysIcon,
  "/roster": UsersIcon,
  "/history": TrophyIcon,
  "/fundraising": HeartIcon,
} as const;

export default function HomePage() {
  const featured = campaigns[0];
  const seniors = roster.filter((player) => player.grade === "Senior").length;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="falcon-stripes pointer-events-none absolute inset-0 opacity-10" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />
        <FalconMark
          onDark
          className="pointer-events-none absolute -right-16 bottom-0 hidden h-[26rem] w-[26rem] opacity-15 lg:block"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Badge className="bg-falcon-500 text-white">
              {seasonSnapshot.season} season: {seasonSnapshot.overall} ·{" "}
              {seasonSnapshot.finish}
            </Badge>
            <h1 className="mt-5 text-5xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
              Fertile-Beltrami
              <span className="mt-1 block text-falcon-400">Falcons Volleyball</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-navy-100">
              Fall match nights in {team.gym} are a Fertile tradition. Come watch a
              match, meet the squad, dig through the record book, and help keep this
              program on the floor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-md bg-falcon-500 px-5 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
              >
                <Link href="/schedule">
                  <CalendarDaysIcon className="size-4" />
                  Season schedule
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-md border-white/30 bg-transparent px-5 font-heading text-base font-bold tracking-wide text-white uppercase hover:bg-white/10 hover:text-white"
              >
                <Link href="/donate">
                  <HeartIcon className="size-4" />
                  Support the Falcons
                </Link>
              </Button>
            </div>
          </div>

          <Suspense fallback={<NextMatchCardSkeleton />}>
            <NextMatchCard />
          </Suspense>
        </div>
      </section>

      <section className="border-b bg-navy-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:py-10 lg:grid-cols-4">
          {[
            { figure: seasonSnapshot.overall, label: `${seasonSnapshot.season} overall record` },
            { figure: seasonSnapshot.conference, label: `${team.conference} play` },
            { figure: "11", label: "Section tournament trips since 2013" },
            { figure: `${roster.length}`, label: `Players on the varsity roster · ${seniors} seniors` },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="stat-figure text-navy-900">{stat.figure}</p>
              <p className="mt-2 text-xs leading-snug font-medium text-navy-700/80 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Start here"
          title="Everything Falcon fans need"
          description="Four pages, kept current by the coaching staff and the booster club."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = icons[link.href as keyof typeof icons] ?? CalendarDaysIcon;
            return (
              <Link key={link.href} href={link.href} className="group">
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:ring-navy-900/25">
                  <CardContent className="flex h-full flex-col">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-navy-900 text-white">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-4 font-heading text-lg font-semibold tracking-tight text-navy-900 uppercase">
                      {link.label}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {link.detail}
                    </p>
                    <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-falcon-600">
                      Open
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_26rem] lg:items-center">
          <div>
            <p className="eyebrow text-falcon-300">Fund the program</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
              {featured.name}
            </h2>
            <p className="mt-4 max-w-xl text-navy-100">{featured.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-md bg-falcon-500 px-5 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
              >
                <Link href="/donate">Give today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-md border-white/30 bg-transparent px-5 font-heading text-base font-bold tracking-wide text-white uppercase hover:bg-white/10 hover:text-white"
              >
                <Link href="/fundraising">All campaigns & sponsorships</Link>
              </Button>
            </div>
          </div>
          <Card className="border-0 bg-white/10 text-white ring-1 ring-white/15">
            <CardContent>
              <GoalMeter
                onDark
                raisedCents={featured.raisedCents}
                goalCents={featured.goalCents}
              />
              <p className="mt-4 text-xs text-navy-200">{featured.closes}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <p className="eyebrow text-falcon-600">Game day</p>
              <CardTitle className="text-2xl font-bold tracking-tight text-navy-900 uppercase">
                Coming to a match
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  Where
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {team.gym}
                  <br />
                  {team.address}
                  <br />
                  Park in the east lot; enter through the activity doors.
                </p>
              </div>
              <div>
                <p className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  Admission
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {team.ticketNote}
                  <br />
                  Cash or card at the door. Senior citizens 62+ are free.
                </p>
              </div>
              <div>
                <p className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  Match format
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  C-squad at 5:30, JV at 6:15, varsity at 7:15 for most conference
                  dates. Tournament start times vary.
                </p>
              </div>
              <div>
                <p className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  Questions
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Email{" "}
                  <a
                    className="font-medium text-falcon-600 hover:underline"
                    href={`mailto:${team.email}`}
                  >
                    {team.email}
                  </a>{" "}
                  or call the activities office at {team.phone}.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-navy-50">
            <CardHeader>
              <p className="eyebrow text-falcon-600">Booster club</p>
              <CardTitle className="text-2xl font-bold tracking-tight text-navy-900 uppercase">
                Get involved
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-navy-800">
              <p>
                The booster club runs the gate, the concession stand and four
                fundraisers a year. New volunteers are always welcome — no
                experience required, just a couple hours on a match night.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-falcon-500">▸</span> Work a shift at the
                  gate or concessions
                </li>
                <li className="flex gap-2">
                  <span className="text-falcon-500">▸</span> Sponsor a banner in the
                  gym
                </li>
                <li className="flex gap-2">
                  <span className="text-falcon-500">▸</span> Donate an auction item
                  for the tip-off dinner
                </li>
              </ul>
              <Button
                asChild
                className="h-10 w-full rounded-md bg-navy-900 font-heading font-semibold tracking-wide uppercase hover:bg-navy-800"
              >
                <Link href="/fundraising">See how to help</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
