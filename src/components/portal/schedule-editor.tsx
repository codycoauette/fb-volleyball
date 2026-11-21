"use client";

import { useState } from "react";
import { LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Match, SeasonSnapshot } from "@/content/types";
import { MATCH_SITES, MATCH_TYPES } from "@/content/types";

function emptyMatch(prefix: string): Match {
  const stamp = Date.now();
  return {
    id: `${prefix}-${stamp}`,
    date: "",
    time: "7:15 PM",
    opponent: "",
    site: "Home",
    venue: "",
    type: "Conference",
  };
}

function MatchFields({
  match,
  onChange,
  onRemove,
  showResult,
}: {
  match: Match;
  onChange: (next: Match) => void;
  onRemove: () => void;
  showResult?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-xl border p-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            className="mt-1.5 h-10"
            value={match.date}
            onChange={(event) =>
              onChange({ ...match, date: event.target.value })
            }
          />
        </div>
        <div>
          <Label>Time</Label>
          <Input
            className="mt-1.5 h-10"
            value={match.time}
            onChange={(event) =>
              onChange({ ...match, time: event.target.value })
            }
          />
        </div>
        <div>
          <Label>Site</Label>
          <Select
            value={match.site}
            onValueChange={(value) =>
              onChange({ ...match, site: value as Match["site"] })
            }
          >
            <SelectTrigger className="mt-1.5 h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MATCH_SITES.map((site) => (
                <SelectItem key={site} value={site}>
                  {site}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Type</Label>
          <Select
            value={match.type}
            onValueChange={(value) =>
              onChange({ ...match, type: value as Match["type"] })
            }
          >
            <SelectTrigger className="mt-1.5 h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MATCH_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <Label>Opponent</Label>
          <Input
            className="mt-1.5 h-10"
            value={match.opponent}
            onChange={(event) =>
              onChange({ ...match, opponent: event.target.value })
            }
          />
        </div>
        <div>
          <Label>Venue</Label>
          <Input
            className="mt-1.5 h-10"
            value={match.venue ?? ""}
            onChange={(event) =>
              onChange({ ...match, venue: event.target.value })
            }
          />
        </div>
        <div className="flex items-end">
          <Button variant="outline" size="icon" onClick={onRemove}>
            <Trash2Icon className="size-4 text-falcon-600" />
          </Button>
        </div>
      </div>
      {showResult ? (
        <div className="grid gap-3 border-t pt-3 sm:grid-cols-3">
          <div>
            <Label>Result</Label>
            <Select
              value={match.result?.outcome ?? "none"}
              onValueChange={(value) => {
                if (value === "none") {
                  onChange({ ...match, result: undefined });
                  return;
                }
                onChange({
                  ...match,
                  result: {
                    outcome: value as "W" | "L",
                    sets: match.result?.sets ?? [],
                    note: match.result?.note,
                  },
                });
              }}
            >
              <SelectTrigger className="mt-1.5 h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No result yet</SelectItem>
                <SelectItem value="W">Win</SelectItem>
                <SelectItem value="L">Loss</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>Set scores (comma separated)</Label>
            <Input
              className="mt-1.5 h-10"
              placeholder="25-18, 25-21, 25-19"
              value={match.result?.sets.join(", ") ?? ""}
              disabled={!match.result}
              onChange={(event) => {
                if (!match.result) return;
                const sets = event.target.value
                  .split(",")
                  .map((part) => part.trim())
                  .filter(Boolean);
                onChange({
                  ...match,
                  result: { ...match.result, sets },
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ScheduleEditor({
  initialSchedule,
  initialResults,
  initialCurrentSeason,
  initialLastSeason,
  initialSnapshot,
}: {
  initialSchedule: Match[];
  initialResults: Match[];
  initialCurrentSeason: string;
  initialLastSeason: string;
  initialSnapshot: SeasonSnapshot;
}) {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [results, setResults] = useState(initialResults);
  const [currentSeason, setCurrentSeason] = useState(initialCurrentSeason);
  const [lastSeason, setLastSeason] = useState(initialLastSeason);
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const { saving, saveSection } = useSaveSection();

  async function saveAll() {
    if (!(await saveSection("currentSeason", currentSeason))) return;
    if (!(await saveSection("lastSeason", lastSeason))) return;
    if (!(await saveSection("seasonSnapshot", snapshot))) return;
    if (!(await saveSection("schedule", schedule))) return;
    await saveSection("lastSeasonResults", results);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            Schedule
          </h1>
          <p className="text-sm text-muted-foreground">
            Upcoming matches, last season results, and the season snapshot on the
            home page.
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

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg font-bold uppercase">
            Season labels
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label>Current season</Label>
            <Input
              className="mt-1.5 h-10"
              value={currentSeason}
              onChange={(event) => setCurrentSeason(event.target.value)}
            />
          </div>
          <div>
            <Label>Last season</Label>
            <Input
              className="mt-1.5 h-10"
              value={lastSeason}
              onChange={(event) => setLastSeason(event.target.value)}
            />
          </div>
          <div>
            <Label>Snapshot overall record</Label>
            <Input
              className="mt-1.5 h-10"
              value={snapshot.overall}
              onChange={(event) =>
                setSnapshot((current) => ({
                  ...current,
                  overall: event.target.value,
                  season: lastSeason,
                }))
              }
            />
          </div>
          <div>
            <Label>Snapshot conference record</Label>
            <Input
              className="mt-1.5 h-10"
              value={snapshot.conference}
              onChange={(event) =>
                setSnapshot((current) => ({
                  ...current,
                  conference: event.target.value,
                }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Postseason finish</Label>
            <Input
              className="mt-1.5 h-10"
              value={snapshot.finish}
              onChange={(event) =>
                setSnapshot((current) => ({
                  ...current,
                  finish: event.target.value,
                }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Snapshot note</Label>
            <Input
              className="mt-1.5 h-10"
              value={snapshot.note}
              onChange={(event) =>
                setSnapshot((current) => ({
                  ...current,
                  note: event.target.value,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            {currentSeason} schedule ({schedule.length})
          </TabsTrigger>
          <TabsTrigger value="results">
            {lastSeason} results ({results.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9 rounded-md"
              onClick={() =>
                setSchedule((current) => [
                  ...current,
                  emptyMatch(currentSeason),
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add match
            </Button>
          </div>
          {schedule.map((match, index) => (
            <MatchFields
              key={match.id}
              match={match}
              onChange={(next) =>
                setSchedule((current) =>
                  current.map((row, i) => (i === index ? next : row)),
                )
              }
              onRemove={() =>
                setSchedule((current) =>
                  current.filter((_, i) => i !== index),
                )
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="results" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="h-9 rounded-md"
              onClick={() =>
                setResults((current) => [
                  ...current,
                  {
                    ...emptyMatch(lastSeason),
                    result: { outcome: "W", sets: [] },
                  },
                ])
              }
            >
              <PlusIcon className="size-4" />
              Add result
            </Button>
          </div>
          {results.map((match, index) => (
            <MatchFields
              key={match.id}
              match={match}
              showResult
              onChange={(next) =>
                setResults((current) =>
                  current.map((row, i) => (i === index ? next : row)),
                )
              }
              onRemove={() =>
                setResults((current) => current.filter((_, i) => i !== index))
              }
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
