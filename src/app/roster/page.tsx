import type { Metadata } from "next";

import { PageHero, SectionHeading } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { RosterGrid } from "@/components/roster-grid";
import { Card, CardContent } from "@/components/ui/card";
import { coaches, currentSeason, roster, team } from "@/data/team";

export const metadata: Metadata = {
  title: "Roster",
  description: `${currentSeason} varsity roster and coaching staff for ${team.program}.`,
};

export default function RosterPage() {
  const byGrade = roster.reduce<Record<string, number>>((acc, player) => {
    acc[player.grade] = (acc[player.grade] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHero
        photo={heroPhotos[3]}
        eyebrow={`${currentSeason} varsity squad`}
        title="Roster"
        description={`${roster.length} players, three captains, and a staff that has coached together for most of a decade. Jersey numbers below match the printed program sold at the gate.`}
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {Object.entries(byGrade).map(([grade, count]) => (
            <div key={grade}>
              <dt className="eyebrow text-falcon-200">
                {grade === "Freshman"
                  ? "Freshmen"
                  : grade === "Sophomore"
                    ? "Sophomores"
                    : `${grade}s`}
              </dt>
              <dd className="font-heading text-3xl font-bold tabular-nums">
                {count}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <RosterGrid roster={roster} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <SectionHeading
          eyebrow="Staff"
          title="Coaches"
          description="Reach the staff through the activities office; messages are returned after practice."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((coach) => (
            <Card key={coach.name} className="bg-navy-50">
              <CardContent>
                <p className="eyebrow text-falcon-600">{coach.role}</p>
                <p className="mt-2 font-heading text-lg font-semibold tracking-tight text-navy-900">
                  {coach.name}
                </p>
                <p className="mt-1 text-sm text-navy-800">{coach.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-navy-900 px-6 py-8 text-white">
          <p className="eyebrow text-falcon-300">Joining the program</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight uppercase">
            Tryouts and open gyms
          </h3>
          <p className="mt-3 max-w-2xl text-navy-100">
            Open gyms run Sunday evenings in June and July and are free for any
            Fertile-Beltrami student entering grades 7-12. Tryouts for the varsity,
            JV and C-squad rosters are held the week before the first match. Players
            need a current MSHSL physical on file with the activities office before
            they can step on the floor.
          </p>
          <p className="mt-4 text-sm text-navy-200">
            Questions about eligibility or equipment? Email{" "}
            <a className="font-medium text-white hover:underline" href={`mailto:${team.email}`}>
              {team.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
