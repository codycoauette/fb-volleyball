import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { FalconMark } from "@/components/falcon-mark";
import type { TeamInfo } from "@/content/types";

/** Cached so the copyright year does not make every page render per request. */
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const columns = [
  {
    heading: "Team",
    links: [
      { href: "/schedule", label: "Schedule" },
      { href: "/roster", label: "Roster & coaches" },
      { href: "/history", label: "History & stats" },
      { href: "/college", label: "College athletes" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/fundraising", label: "Fundraising campaigns" },
      { href: "/fundraising#sponsors", label: "Business sponsorships" },
      { href: "/donate", label: "Make a donation" },
    ],
  },
];

export async function SiteFooter({ team }: { team: TeamInfo }) {
  const year = await copyrightYear();

  return (
    <footer className="mt-20 bg-navy-900 text-navy-100">
      <div className="falcon-stripes h-1.5 bg-falcon-700" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-3">
            <FalconMark className="h-14 w-14" />
            <div>
              <p className="font-heading text-lg font-bold tracking-tight text-white uppercase">
                Fertile-Beltrami Falcons
              </p>
              <p className="eyebrow text-falcon-300">Volleyball</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-navy-200">
            Home of Falcons volleyball in {team.town}. Follow the team all season,
            meet the squad, dig through the record book and help fund the program.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-falcon-300" />
              <dd>
                {team.gym}, {team.address}
              </dd>
            </div>
            <div className="flex items-start gap-2">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-falcon-300" />
              <dd>
                <a className="hover:text-white" href={`mailto:${team.email}`}>
                  {team.email}
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-falcon-300" />
              <dd>{team.phone}</dd>
            </div>
          </dl>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <p className="eyebrow text-falcon-300">{column.heading}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {team.school} Volleyball Booster Club.
          </p>
          <p>
            <Link className="hover:text-white" href="/portal">
              Coach portal
            </Link>
            {" · "}
            Content is editable by the coaching staff.
          </p>
        </div>
      </div>
    </footer>
  );
}
