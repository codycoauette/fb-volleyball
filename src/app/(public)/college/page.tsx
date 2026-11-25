import type { Metadata } from "next";
import { GraduationCapIcon } from "lucide-react";

import { PageHero, SectionHeading } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { getSiteContent } from "@/content/store";
import type { CollegeAthlete } from "@/content/types";
import { team as seedTeam } from "@/data/team";

export const metadata: Metadata = {
  title: "College Athletes",
  description: `Past ${seedTeam.program} players who went on to play volleyball in college.`,
};

function sortAthletes(athletes: CollegeAthlete[]) {
  return [...athletes].sort((a, b) => {
    const yearDiff =
      Number.parseInt(b.graduationYear, 10) -
      Number.parseInt(a.graduationYear, 10);
    if (yearDiff !== 0 && !Number.isNaN(yearDiff)) return yearDiff;
    return a.name.localeCompare(b.name);
  });
}

export default async function CollegeAthletesPage() {
  const { collegeAthletes } = await getSiteContent();
  const athletes = sortAthletes(collegeAthletes);

  return (
    <>
      <PageHero
        photo={heroPhotos[0]}
        eyebrow="Beyond high school"
        title="College Athletes"
        description="Falcons who carried the program onto a college court — name, school, and the year they graduated from Fertile-Beltrami."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="eyebrow text-falcon-200">Listed athletes</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums">
              {athletes.length}
            </dd>
          </div>
        </dl>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Alumni"
          title="Playing after high school"
          description="Name, college program, and high school graduation year."
        />

        {athletes.length === 0 ? (
          <p className="mt-8 flex items-start gap-3 rounded-xl bg-navy-50 px-5 py-6 text-sm text-navy-800">
            <GraduationCapIcon className="mt-0.5 size-5 shrink-0 text-falcon-600" />
            No college athletes listed yet. Coaches can add names in the portal
            under College athletes.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-navy-900/15">
                  <th className="eyebrow py-3 pr-4 font-semibold text-falcon-700">
                    Name
                  </th>
                  <th className="eyebrow py-3 pr-4 font-semibold text-falcon-700">
                    College
                  </th>
                  <th className="eyebrow py-3 text-right font-semibold text-falcon-700">
                    HS class
                  </th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete) => (
                  <tr
                    key={`${athlete.name}-${athlete.graduationYear}-${athlete.college}`}
                    className="border-b border-navy-900/8 last:border-0"
                  >
                    <td className="py-3.5 pr-4 font-heading text-base font-semibold tracking-tight text-navy-900">
                      {athlete.name}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-navy-800">
                      {athlete.college}
                    </td>
                    <td className="py-3.5 text-right font-heading text-base font-bold text-navy-900 tabular-nums">
                      {athlete.graduationYear}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
