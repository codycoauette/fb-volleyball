"use client";

import { useState } from "react";
import { LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type {
  HonorYear,
  LeaderBoard,
  Milestone,
  ProgramRecord,
  SeasonRow,
} from "@/content/types";
import { RECORD_SCOPES } from "@/content/types";

export function HistoryEditor({
  initialRecords,
  initialSeasons,
  initialLeaders,
  initialMilestones,
  initialHonors,
}: {
  initialRecords: ProgramRecord[];
  initialSeasons: SeasonRow[];
  initialLeaders: LeaderBoard[];
  initialMilestones: Milestone[];
  initialHonors: HonorYear[];
}) {
  const [records, setRecords] = useState(initialRecords);
  const [seasons, setSeasons] = useState(initialSeasons);
  const [leaders, setLeaders] = useState(initialLeaders);
  const [milestones, setMilestones] = useState(initialMilestones);
  const [honors, setHonors] = useState(initialHonors);
  const { saving, saveSection } = useSaveSection();

  async function saveAll() {
    if (!(await saveSection("programRecords", records))) return;
    if (!(await saveSection("seasonHistory", seasons))) return;
    if (!(await saveSection("careerLeaders", leaders))) return;
    if (!(await saveSection("programMilestones", milestones))) return;
    await saveSection("honors", honors);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            History & stats
          </h1>
          <p className="text-sm text-muted-foreground">
            Career top 10s, season and single-game records, and honors.
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

      <Tabs defaultValue="records">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="seasons">Seasons</TabsTrigger>
          <TabsTrigger value="leaders">Leaders</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="honors">Honors</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setRecords((current) => [
                  ...current,
                  {
                    label: "",
                    value: "",
                    holder: "",
                    year: "",
                    scope: "season",
                  },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add record
            </Button>
          </div>
          {records.map((record, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_0.7fr_1fr_0.6fr_0.8fr_auto]"
            >
              {(
                [
                  ["label", "Stat"],
                  ["value", "Value"],
                  ["holder", "Holder"],
                  ["year", "Year"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={record[key]}
                    onChange={(event) =>
                      setRecords((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, [key]: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
              ))}
              <div>
                <Label>Scope</Label>
                <select
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  value={record.scope}
                  onChange={(event) =>
                    setRecords((current) =>
                      current.map((row, i) =>
                        i === index
                          ? {
                              ...row,
                              scope: event.target.value as ProgramRecord["scope"],
                            }
                          : row,
                      ),
                    )
                  }
                >
                  {RECORD_SCOPES.map((scope) => (
                    <option key={scope} value={scope}>
                      {scope === "season" ? "Season" : "Single game"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setRecords((current) =>
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

        <TabsContent value="seasons" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setSeasons((current) => [
                  {
                    season: "",
                    overall: "",
                    conference: "",
                    postseason: "",
                  },
                  ...current,
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add season
            </Button>
          </div>
          {seasons.map((season, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[0.7fr_0.7fr_0.7fr_1.4fr_auto]"
            >
              {(
                [
                  ["season", "Season"],
                  ["overall", "Overall"],
                  ["conference", "Conference"],
                  ["postseason", "Postseason"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={season[key]}
                    onChange={(event) =>
                      setSeasons((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, [key]: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
              ))}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSeasons((current) =>
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

        <TabsContent value="leaders" className="mt-4 space-y-4">
          {leaders.map((board, boardIndex) => (
            <Card key={board.category}>
              <CardHeader>
                <CardTitle className="font-heading text-base font-bold uppercase">
                  {board.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {board.rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid gap-2 sm:grid-cols-[1.2fr_0.7fr_0.9fr_auto]"
                  >
                    <Input
                      value={row.name}
                      placeholder="Name"
                      onChange={(event) =>
                        setLeaders((current) =>
                          current.map((b, bi) =>
                            bi === boardIndex
                              ? {
                                  ...b,
                                  rows: b.rows.map((r, ri) =>
                                    ri === rowIndex
                                      ? { ...r, name: event.target.value }
                                      : r,
                                  ),
                                }
                              : b,
                          ),
                        )
                      }
                    />
                    <Input
                      value={row.value}
                      placeholder="Value"
                      onChange={(event) =>
                        setLeaders((current) =>
                          current.map((b, bi) =>
                            bi === boardIndex
                              ? {
                                  ...b,
                                  rows: b.rows.map((r, ri) =>
                                    ri === rowIndex
                                      ? { ...r, value: event.target.value }
                                      : r,
                                  ),
                                }
                              : b,
                          ),
                        )
                      }
                    />
                    <Input
                      value={row.years}
                      placeholder="Years"
                      onChange={(event) =>
                        setLeaders((current) =>
                          current.map((b, bi) =>
                            bi === boardIndex
                              ? {
                                  ...b,
                                  rows: b.rows.map((r, ri) =>
                                    ri === rowIndex
                                      ? { ...r, years: event.target.value }
                                      : r,
                                  ),
                                }
                              : b,
                          ),
                        )
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setLeaders((current) =>
                          current.map((b, bi) =>
                            bi === boardIndex
                              ? {
                                  ...b,
                                  rows: b.rows.filter(
                                    (_, ri) => ri !== rowIndex,
                                  ),
                                }
                              : b,
                          ),
                        )
                      }
                    >
                      <Trash2Icon className="size-4 text-falcon-600" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="h-9"
                  onClick={() =>
                    setLeaders((current) =>
                      current.map((b, bi) =>
                        bi === boardIndex
                          ? {
                              ...b,
                              rows: [
                                ...b.rows,
                                { name: "", value: "", years: "" },
                              ],
                            }
                          : b,
                      ),
                    )
                  }
                >
                  <PlusIcon className="size-4" />
                  Add row
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setMilestones((current) => [
                  ...current,
                  { year: "", title: "", detail: "" },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add milestone
            </Button>
          </div>
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <div className="grid gap-3 sm:grid-cols-[0.5fr_1.5fr_auto]">
                <div>
                  <Label>Year</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={milestone.year}
                    onChange={(event) =>
                      setMilestones((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, year: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={milestone.title}
                    onChange={(event) =>
                      setMilestones((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, title: event.target.value }
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
                      setMilestones((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2Icon className="size-4 text-falcon-600" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Detail</Label>
                <Textarea
                  className="mt-1.5"
                  rows={2}
                  value={milestone.detail}
                  onChange={(event) =>
                    setMilestones((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, detail: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="honors" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9"
              onClick={() =>
                setHonors((current) => [
                  { season: "", items: [""] },
                  ...current,
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add year
            </Button>
          </div>
          {honors.map((year, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label>Season</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={year.season}
                    onChange={(event) =>
                      setHonors((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, season: event.target.value }
                            : row,
                        ),
                      )
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setHonors((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
              {year.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(event) =>
                      setHonors((current) =>
                        current.map((row, i) =>
                          i === index
                            ? {
                                ...row,
                                items: row.items.map((entry, ei) =>
                                  ei === itemIndex
                                    ? event.target.value
                                    : entry,
                                ),
                              }
                            : row,
                        ),
                      )
                    }
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setHonors((current) =>
                        current.map((row, i) =>
                          i === index
                            ? {
                                ...row,
                                items: row.items.filter(
                                  (_, ei) => ei !== itemIndex,
                                ),
                              }
                            : row,
                        ),
                      )
                    }
                  >
                    <Trash2Icon className="size-4 text-falcon-600" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="h-9"
                onClick={() =>
                  setHonors((current) =>
                    current.map((row, i) =>
                      i === index
                        ? { ...row, items: [...row.items, ""] }
                        : row,
                    ),
                  )
                }
              >
                <PlusIcon className="size-4" />
                Add honor
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
