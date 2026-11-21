import Link from "next/link";
import {
  CalendarDaysIcon,
  HandCoinsIcon,
  SchoolIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getSiteContent } from "@/content/store";
import { PORTAL_SECTIONS } from "@/content/types";

const icons = {
  team: SchoolIcon,
  roster: UsersIcon,
  schedule: CalendarDaysIcon,
  history: TrophyIcon,
  fundraising: HandCoinsIcon,
} as const;

export default async function PortalDashboardPage() {
  const content = await getSiteContent();

  const stats = [
    { label: "Players", value: String(content.roster.length) },
    { label: "Upcoming matches", value: String(content.schedule.length) },
    { label: "Campaigns", value: String(content.campaigns.length) },
    { label: "Season", value: content.currentSeason },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-navy-900 uppercase">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit anything that appears on the public site. Changes save to a local
          content file for now — the same API will point at Supabase when you are
          ready.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white">
            <CardContent>
              <p className="eyebrow text-falcon-600">{stat.label}</p>
              <p className="mt-2 font-heading text-3xl font-bold text-navy-900 tabular-nums">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PORTAL_SECTIONS.map((section) => {
          const Icon = icons[section.slug];
          return (
            <Link key={section.slug} href={`/portal/${section.slug}`}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:ring-navy-900/20">
                <CardContent className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-bold tracking-tight text-navy-900 uppercase">
                      {section.label}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
