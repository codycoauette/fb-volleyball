import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  HeartIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import { CountUp } from "@/components/count-up";
import { GoalMeter } from "@/components/goal-meter";
import { HeroCarousel } from "@/components/hero-carousel";
import { SectionHeading } from "@/components/page-hero";
import { PhotoRail } from "@/components/photo-rail";
import { Reveal } from "@/components/reveal";
import {
  ScoreboardStrip,
  ScoreboardStripSkeleton,
} from "@/components/scoreboard-strip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { galleryPhotos, heroPhotos } from "@/data/photos";
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

  const stats = [
    {
      figure: seasonSnapshot.overall,
      label: `${seasonSnapshot.season} overall record`,
    },
    { figure: seasonSnapshot.conference, label: `${team.conference} play` },
    { figure: "11", label: "Section tournament trips since 2013" },
    {
      figure: `${roster.length}`,
      label: `Players on the varsity roster · ${seniors} seniors`,
    },
  ];

  return (
    <>
      <HeroCarousel
        photos={heroPhotos}
        badge={`${seasonSnapshot.overall} and a section semifinal in ${seasonSnapshot.season}`}
      />

      <Suspense fallback={<ScoreboardStripSkeleton />}>
        <ScoreboardStrip />
      </Suspense>

      <section className="border-b bg-navy-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {stats.map((stat, slot) => (
            <Reveal key={stat.label} delay={slot * 90}>
              <p className="stat-figure text-navy-900">
                <CountUp value={stat.figure} />
              </p>
              <p className="mt-2 text-xs leading-snug font-medium text-navy-700/80 uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <SectionHeading
            eyebrow="Start here"
            title="Everything Falcon fans need"
            description="Four pages, kept current by the coaching staff and the booster club."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, slot) => {
            const Icon = icons[link.href as keyof typeof icons] ?? CalendarDaysIcon;
            const photo = heroPhotos[slot % heroPhotos.length];

            return (
              <Reveal key={link.href} delay={slot * 90} className="h-full">
                <Link href={link.href} className="group block h-full">
                  <div className="relative flex h-72 flex-col justify-end overflow-hidden rounded-xl bg-navy-900 ring-1 ring-navy-900/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <Image
                      src={photo.src}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectPosition: photo.position }}
                      className="object-cover opacity-70 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />
                    <div className="relative p-5">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-falcon-500 text-white shadow-lg shadow-falcon-900/30">
                        <Icon className="size-5" />
                      </span>
                      <p className="mt-4 font-heading text-xl font-bold tracking-tight text-white uppercase">
                        {link.label}
                      </p>
                      <p className="mt-1 text-sm text-navy-200">{link.detail}</p>
                      <span className="mt-3 flex items-center gap-1 font-heading text-sm font-semibold tracking-wide text-falcon-300 uppercase">
                        Open
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-falcon-500 transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-950 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="eyebrow text-falcon-300">From the gym</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
              Season gallery
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-navy-200">
              Photos from this fall. Hover to stop the rail — more go up after every
              home match.
            </p>
          </Reveal>
        </div>
        <div className="mt-8">
          <PhotoRail photos={galleryPhotos} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={heroPhotos[1].src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 35%" }}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_26rem] lg:items-center">
          <Reveal>
            <p className="eyebrow text-falcon-300">Fund the program</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
              {featured.name}
            </h2>
            <p className="mt-4 max-w-xl text-navy-100">{featured.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-md bg-falcon-500 px-6 font-heading text-base font-bold tracking-wide uppercase transition-transform hover:-translate-y-0.5 hover:bg-falcon-600"
              >
                <Link href="/donate">Give today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-md border-white/40 bg-white/5 px-6 font-heading text-base font-bold tracking-wide text-white uppercase hover:bg-white/15 hover:text-white"
              >
                <Link href="/fundraising">All campaigns & sponsorships</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Card className="border-0 bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
              <CardContent>
                <GoalMeter
                  onDark
                  raisedCents={featured.raisedCents}
                  goalCents={featured.goalCents}
                />
                <p className="mt-4 text-xs text-navy-200">{featured.closes}</p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card className="h-full">
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
          </Reveal>

          <Reveal delay={150}>
            <Card className="h-full bg-navy-50">
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
                    <span className="text-falcon-500">▸</span> Sponsor a banner in
                    the gym
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
