import type { Metadata } from "next";
import Link from "next/link";
import {
  BanknoteIcon,
  CalendarHeartIcon,
  CheckIcon,
  HandHeartIcon,
  PackageIcon,
  StoreIcon,
} from "lucide-react";

import { GoalMeter } from "@/components/goal-meter";
import { PageHero, SectionHeading } from "@/components/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  campaigns,
  fundraisingEvents,
  fundraisingFaq,
  sponsorTiers,
  team,
} from "@/data/team";
import { formatCurrency } from "@/lib/schedule";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fundraising",
  description: `Campaigns, sponsorships and events supporting ${team.program}.`,
};

const waysToGive = [
  {
    icon: HandHeartIcon,
    title: "One-time or monthly gift",
    detail:
      "Give online in about a minute. Monthly gifts of $10 to $25 are what keep the equipment budget steady.",
  },
  {
    icon: StoreIcon,
    title: "Business sponsorship",
    detail:
      "Banner space in the gym, a logo on the warmups and recognition at home matches.",
  },
  {
    icon: PackageIcon,
    title: "In-kind donations",
    detail:
      "Auction items, printing, road-trip meals and gear are matched to a real need by the booster club.",
  },
  {
    icon: BanknoteIcon,
    title: "Employer matching",
    detail:
      "Many area employers double gifts to school activity programs. We will send the paperwork.",
  },
];

export default function FundraisingPage() {
  const raised = campaigns.reduce((sum, c) => sum + c.raisedCents, 0);
  const goal = campaigns.reduce((sum, c) => sum + c.goalCents, 0);

  return (
    <>
      <PageHero
        eyebrow="Falcon volleyball booster club"
        title="Support the Falcons"
        description="Gate receipts cover officials and bus fuel. Everything else — uniforms, tournament entries, the serving machine in the practice gym, the senior scholarship — comes from this community."
      >
        <div className="grid gap-6 sm:grid-cols-[22rem_auto] sm:items-end">
          <GoalMeter onDark raisedCents={raised} goalCents={goal} />
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 rounded-md bg-falcon-500 px-5 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
            >
              <Link href="/donate">Donate now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-md border-white/30 bg-transparent px-5 font-heading text-base font-bold tracking-wide text-white uppercase hover:bg-white/10 hover:text-white"
            >
              <a href="#sponsors">Sponsor the team</a>
            </Button>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="Where the money goes"
          title="Current campaigns"
          description="Every campaign has a dollar goal, a deadline and a specific purchase behind it."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {campaigns.map((campaign) => {
            const funded = campaign.raisedCents >= campaign.goalCents;
            return (
              <Card key={campaign.id} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="font-heading text-xl font-bold tracking-tight text-navy-900 uppercase">
                      {campaign.name}
                    </CardTitle>
                    {funded ? (
                      <Badge className="shrink-0 rounded-md bg-emerald-100 text-emerald-800">
                        <CheckIcon className="size-3" />
                        Funded
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-sm text-muted-foreground">{campaign.summary}</p>
                  <div className="mt-auto pt-6">
                    <GoalMeter
                      raisedCents={campaign.raisedCents}
                      goalCents={campaign.goalCents}
                    />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        {campaign.closes}
                      </p>
                      {funded ? null : (
                        <Button
                          asChild
                          variant="outline"
                          className="h-9 rounded-md font-heading font-semibold tracking-wide uppercase"
                        >
                          <Link href={`/donate?fund=${campaign.id}`}>
                            Give to this
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Four ways" title="How you can help" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {waysToGive.map((way) => (
              <Card key={way.title} className="h-full">
                <CardContent>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-falcon-500 text-white">
                    <way.icon className="size-5" />
                  </span>
                  <p className="mt-4 font-heading text-lg font-semibold tracking-tight text-navy-900">
                    {way.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{way.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsors" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12">
        <SectionHeading
          eyebrow="Business sponsors"
          title="Sponsorship levels"
          description={`Sponsorships run September through the section tournament. Email ${team.email} to reserve a level or ask about a custom package.`}
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {sponsorTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex h-full flex-col",
                tier.featured && "bg-navy-900 text-white ring-2 ring-falcon-500",
              )}
            >
              <CardHeader>
                <p
                  className={cn(
                    "eyebrow",
                    tier.featured ? "text-falcon-300" : "text-falcon-600",
                  )}
                >
                  {tier.featured ? "Most popular" : "Sponsorship"}
                </p>
                <CardTitle
                  className={cn(
                    "font-heading text-xl font-bold tracking-tight uppercase",
                    tier.featured ? "text-white" : "text-navy-900",
                  )}
                >
                  {tier.name}
                </CardTitle>
                <p
                  className={cn(
                    "font-heading text-3xl font-bold",
                    tier.featured ? "text-white" : "text-navy-900",
                  )}
                >
                  {tier.amount}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul
                  className={cn(
                    "space-y-2 text-sm",
                    tier.featured ? "text-navy-100" : "text-muted-foreground",
                  )}
                >
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <CheckIcon
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-falcon-300" : "text-falcon-500",
                        )}
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Button
                    asChild
                    className={cn(
                      "h-10 w-full rounded-md font-heading font-semibold tracking-wide uppercase",
                      tier.featured
                        ? "bg-falcon-500 hover:bg-falcon-600"
                        : "bg-navy-900 hover:bg-navy-800",
                    )}
                  >
                    <Link href="/donate?fund=general">Become a sponsor</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Mark your calendar"
              title="Fundraising events"
              description="Come eat pancakes, golf badly, and bid on a freezer full of walleye."
            />
            <ul className="mt-6 divide-y rounded-xl ring-1 ring-foreground/10">
              {fundraisingEvents.map((event) => (
                <li key={event.name} className="flex gap-4 px-5 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-900">
                    <CalendarHeartIcon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold text-falcon-600">
                      {event.date}
                    </p>
                    <p className="font-heading text-lg leading-tight font-semibold tracking-tight text-navy-900">
                      {event.name}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {event.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Before you give" title="Questions, answered" />
            <Accordion
              type="single"
              collapsible
              className="mt-6 rounded-xl px-5 ring-1 ring-foreground/10"
            >
              {fundraisingFaq.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left font-heading text-base font-semibold text-navy-900">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 rounded-xl bg-navy-900 px-6 py-7 text-white">
              <p className="eyebrow text-falcon-300">Total raised to date</p>
              <p className="mt-2 font-heading text-4xl font-bold tabular-nums">
                {formatCurrency(raised)}
              </p>
              <p className="mt-2 text-sm text-navy-200">
                Across {campaigns.length} active campaigns, from{" "}
                {formatCurrency(2500)} gifts to {formatCurrency(100000)} sponsorships.
              </p>
              <Button
                asChild
                className="mt-5 h-11 w-full rounded-md bg-falcon-500 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
              >
                <Link href="/donate">Add your gift</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
