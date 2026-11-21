"use client";

import { useState } from "react";
import { LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type {
  Campaign,
  Designation,
  FaqItem,
  FundraisingEvent,
  SponsorTier,
} from "@/content/types";

function dollarsToCents(value: string) {
  const n = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export function FundraisingEditor({
  initialCampaigns,
  initialTiers,
  initialEvents,
  initialDesignations,
  initialFaq,
}: {
  initialCampaigns: Campaign[];
  initialTiers: SponsorTier[];
  initialEvents: FundraisingEvent[];
  initialDesignations: Designation[];
  initialFaq: FaqItem[];
}) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [tiers, setTiers] = useState(initialTiers);
  const [events, setEvents] = useState(initialEvents);
  const [designations, setDesignations] = useState(initialDesignations);
  const [faq, setFaq] = useState(initialFaq);
  const { saving, saveSection } = useSaveSection();

  async function saveAll() {
    if (!(await saveSection("campaigns", campaigns))) return;
    if (!(await saveSection("sponsorTiers", tiers))) return;
    if (!(await saveSection("fundraisingEvents", events))) return;
    if (!(await saveSection("designations", designations))) return;
    await saveSection("fundraisingFaq", faq);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            Fundraising
          </h1>
          <p className="text-sm text-muted-foreground">
            Campaign goals, sponsorship levels, events, donate designations and FAQ.
          </p>
        </div>
        <Button
          disabled={saving}
          onClick={saveAll}
          className="h-10 rounded-md bg-navy-900 font-heading font-semibold tracking-wide uppercase hover:bg-navy-800"
        >
          {saving ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            <SaveIcon className="size-4" />
          )}
          Save all
        </Button>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="designations">Donate funds</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setCampaigns((current) => [
                  ...current,
                  {
                    id: `campaign-${Date.now()}`,
                    name: "",
                    goalCents: 0,
                    raisedCents: 0,
                    summary: "",
                    closes: "",
                  },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add campaign
            </Button>
          </div>
          {campaigns.map((campaign, index) => (
            <Card key={campaign.id}>
              <CardContent className="grid gap-3 pt-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Name</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={campaign.name}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, name: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Goal ($)</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={centsToDollars(campaign.goalCents)}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? {
                                ...row,
                                goalCents: dollarsToCents(event.target.value),
                              }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Raised ($)</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={centsToDollars(campaign.raisedCents)}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? {
                                ...row,
                                raisedCents: dollarsToCents(event.target.value),
                              }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Closes</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={campaign.closes}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, closes: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Id (for donate links)</Label>
                  <Input
                    className="mt-1.5 h-10 font-mono"
                    value={campaign.id}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, id: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Summary</Label>
                  <Textarea
                    className="mt-1.5"
                    rows={2}
                    value={campaign.summary}
                    onChange={(event) =>
                      setCampaigns((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, summary: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCampaigns((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2Icon className="size-4 text-falcon-600" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sponsors" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setTiers((current) => [
                  ...current,
                  { name: "", amount: "", perks: [""], featured: false },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add tier
            </Button>
          </div>
          {tiers.map((tier, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_0.7fr_auto_auto]">
                <div>
                  <Label>Name</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={tier.name}
                    onChange={(event) =>
                      setTiers((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, name: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={tier.amount}
                    onChange={(event) =>
                      setTiers((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, amount: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <label className="flex items-end gap-2 pb-2 text-sm">
                  <Checkbox
                    checked={Boolean(tier.featured)}
                    onCheckedChange={(value) =>
                      setTiers((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, featured: value === true }
                            : row,
                        ),
                      )
                    }
                  />
                  Featured
                </label>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setTiers((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2Icon className="size-4 text-falcon-600" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Perks (one per line)</Label>
                <Textarea
                  className="mt-1.5"
                  rows={4}
                  value={tier.perks.join("\n")}
                  onChange={(event) =>
                    setTiers((current) =>
                      current.map((row, i) =>
                        i === index
                          ? {
                              ...row,
                              perks: event.target.value
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean),
                            }
                          : row,
                      ),
                    )
                  }
                />
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="events" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setEvents((current) => [
                  ...current,
                  { date: "", name: "", detail: "" },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add event
            </Button>
          </div>
          {events.map((event, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[0.8fr_1fr_1.4fr_auto]"
            >
              <div>
                <Label>Date</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={event.date}
                  onChange={(e) =>
                    setEvents((current) =>
                      current.map((row, i) =>
                        i === index ? { ...row, date: e.target.value } : row,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <Label>Name</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={event.name}
                  onChange={(e) =>
                    setEvents((current) =>
                      current.map((row, i) =>
                        i === index ? { ...row, name: e.target.value } : row,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <Label>Detail</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={event.detail}
                  onChange={(e) =>
                    setEvents((current) =>
                      current.map((row, i) =>
                        i === index ? { ...row, detail: e.target.value } : row,
                      ),
                    )
                  }
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setEvents((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="designations" className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            These options appear in the donate form&apos;s &quot;Designate my gift
            to&quot; dropdown. Match campaign ids when you want a fund preselected.
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setDesignations((current) => [
                  ...current,
                  { value: "", label: "" },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add designation
            </Button>
          </div>
          {designations.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[0.8fr_1.4fr_auto]"
            >
              <div>
                <Label>Value / id</Label>
                <Input
                  className="mt-1.5 h-10 font-mono"
                  value={item.value}
                  onChange={(event) =>
                    setDesignations((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, value: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <Label>Label</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={item.label}
                  onChange={(event) =>
                    setDesignations((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, label: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setDesignations((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="faq" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setFaq((current) => [
                  ...current,
                  { question: "", answer: "" },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add question
            </Button>
          </div>
          {faq.map((item, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label>Question</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={item.question}
                    onChange={(event) =>
                      setFaq((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, question: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setFaq((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2Icon className="size-4 text-falcon-600" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Answer</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={item.answer}
                  onChange={(event) =>
                    setFaq((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, answer: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
