import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/content/store";
import { team as seedTeam } from "@/data/team";

export const metadata: Metadata = {
  title: "Fundraising",
  description: `Fundraising for ${seedTeam.program} — coming soon.`,
};

export default async function FundraisingPage() {
  const { team } = await getSiteContent();

  return (
    <>
      <PageHero
        photo={heroPhotos[3]}
        eyebrow="Falcon volleyball booster club"
        title="Support the Falcons"
        description="Campaigns, sponsorships, and online giving are on the way. Check back soon."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="eyebrow text-falcon-600">Coming soon</p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy-900 uppercase sm:text-4xl">
          Online fundraising launches next
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          We&apos;re finishing the booster campaigns and donation portal. Until
          then, reach the activities office about checks, sponsorships, or
          in-kind gifts.
        </p>
        <dl className="mx-auto mt-10 max-w-md space-y-3 text-left text-sm text-navy-800">
          <div className="flex justify-between gap-4 border-b pb-3">
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              <a className="font-medium hover:underline" href={`mailto:${team.email}`}>
                {team.email}
              </a>
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b pb-3">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-medium">{team.phone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Office</dt>
            <dd className="text-right font-medium">{team.address}</dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="h-11 rounded-md bg-falcon-500 px-5 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
          >
            <a href={`mailto:${team.email}`}>
              <MailIcon className="size-4" />
              Email the booster club
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md px-5 font-heading text-base font-bold tracking-wide uppercase"
          >
            <Link href="/schedule">Back to the schedule</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
