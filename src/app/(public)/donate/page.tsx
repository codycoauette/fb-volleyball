import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/content/store";
import { team as seedTeam } from "@/data/team";

export const metadata: Metadata = {
  title: "Donate",
  description: `Online donations for ${seedTeam.program} — coming soon.`,
};

export default async function DonatePage() {
  const { team } = await getSiteContent();

  return (
    <>
      <PageHero
        photo={heroPhotos[3]}
        eyebrow="Donation portal"
        title="Give to Falcon Volleyball"
        description="Online giving is coming soon. Until then, gifts can go through the activities office."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="eyebrow text-falcon-600">Coming soon</p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy-900 uppercase sm:text-4xl">
          Card donations are not live yet
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          The secure checkout is still being set up. Drop a check at the school
          activities office, or email the booster club and a volunteer will
          follow up.
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
              Email about a gift
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md px-5 font-heading text-base font-bold tracking-wide uppercase"
          >
            <Link href="/fundraising">Fundraising updates</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
