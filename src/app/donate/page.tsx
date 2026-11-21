import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CreditCardIcon, InfoIcon, ShieldCheckIcon } from "lucide-react";

import { DonationForm } from "@/components/donation-form";
import { GoalMeter } from "@/components/goal-meter";
import { PageHero } from "@/components/page-hero";
import { heroPhotos } from "@/data/photos";
import { Card, CardContent } from "@/components/ui/card";
import { campaigns, team } from "@/data/team";
import { formatCurrency } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${team.program} with a one-time or monthly gift.`,
};

const impact = [
  { amount: 2500, detail: "A case of match balls for the practice gym" },
  { amount: 5000, detail: "One player's tournament entry and travel meal" },
  { amount: 10000, detail: "A game jersey in the new uniform set" },
  { amount: 25000, detail: "Film and stats software for a full season" },
  { amount: 100000, detail: "A banner in the gym and a season of sponsorship" },
];

export default function DonatePage() {
  const raised = campaigns.reduce((sum, c) => sum + c.raisedCents, 0);
  const goal = campaigns.reduce((sum, c) => sum + c.goalCents, 0);

  return (
    <>
      <PageHero
        photo={heroPhotos[1]}
        eyebrow="Donation portal"
        title="Give to Falcon Volleyball"
        description="One-time or monthly, designated or general. Gifts go to the volleyball activity account at Fertile-Beltrami High School and are spent by the booster club on the needs listed on the fundraising page."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <div className="text-sm text-amber-900">
            <p className="font-heading font-semibold tracking-wide uppercase">
              Card processing is not live yet
            </p>
            <p className="mt-1">
              This form records a pledge so the booster club can test the flow. No
              card or bank information is collected and no money moves. Once the
              school finishes the payment-processor paperwork, the same form will hand
              off to a secure checkout. Until then a volunteer follows up on every
              pledge, or you can drop a check at the activities office.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <Suspense
            fallback={
              <Card>
                <CardContent className="py-16 text-center text-sm text-muted-foreground">
                  Loading the donation form…
                </CardContent>
              </Card>
            }
          >
            <DonationForm />
          </Suspense>

          <div className="space-y-4 lg:sticky lg:top-28">
            <Card className="bg-navy-900 text-white">
              <CardContent>
                <p className="eyebrow text-falcon-300">All campaigns</p>
                <GoalMeter onDark raisedCents={raised} goalCents={goal} />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="eyebrow text-falcon-600">What your gift buys</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {impact.map((item) => (
                    <li key={item.amount} className="flex gap-3">
                      <span className="w-14 shrink-0 font-heading font-bold text-navy-900 tabular-nums">
                        {formatCurrency(item.amount)}
                      </span>
                      <span className="text-muted-foreground">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-navy-50">
              <CardContent className="space-y-3 text-sm text-navy-800">
                <p className="flex items-center gap-2 font-heading font-semibold tracking-wide text-navy-900 uppercase">
                  <ShieldCheckIcon className="size-4 text-falcon-600" />
                  Other ways to give
                </p>
                <p>
                  <span className="font-medium">By check:</span> payable to
                  Fertile-Beltrami Volleyball Booster Club, {team.address}.
                </p>
                <p>
                  <span className="font-medium">In person:</span> the gate table at any
                  home match in {team.gym}.
                </p>
                <p className="flex items-start gap-2">
                  <CreditCardIcon className="mt-0.5 size-4 shrink-0 text-falcon-600" />
                  <span>
                    Business sponsorships and in-kind donations are outlined on the{" "}
                    <Link
                      className="font-medium text-falcon-700 hover:underline"
                      href="/fundraising#sponsors"
                    >
                      fundraising page
                    </Link>
                    .
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
