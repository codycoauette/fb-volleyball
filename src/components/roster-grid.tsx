"use client";

import { useMemo, useState } from "react";
import { SearchIcon, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Player } from "@/data/team";
import { cn } from "@/lib/utils";

const groups = ["All", "Hitters", "Setters", "Defense", "Seniors"] as const;

function matchesGroup(player: Player, group: (typeof groups)[number]) {
  switch (group) {
    case "Hitters":
      return /Hitter|Middle|Right Side/.test(player.position);
    case "Setters":
      return player.position.includes("Setter");
    case "Defense":
      return /Libero|Defensive/.test(player.position);
    case "Seniors":
      return player.grade === "Senior";
    default:
      return true;
  }
}

export function RosterGrid({ roster }: { roster: Player[] }) {
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return roster.filter((player) => {
      if (!matchesGroup(player, group)) return false;
      if (!term) return true;
      return (
        player.name.toLowerCase().includes(term) ||
        player.position.toLowerCase().includes(term) ||
        String(player.number) === term
      );
    });
  }, [group, query, roster]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs
          value={group}
          onValueChange={(value) => setGroup(value as (typeof groups)[number])}
        >
          <TabsList>
            {groups.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, number, position"
            className="h-10 pl-9"
            aria-label="Search the roster"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed px-6 py-14 text-center">
          <p className="font-heading text-lg font-semibold tracking-tight text-navy-900 uppercase">
            No players match that search
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a jersey number, a last name, or clear the filter above.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((player) => (
              <Card key={player.number} className="overflow-hidden">
                <div className="falcon-stripes h-1 bg-navy-900" />
                <CardContent className="flex gap-4">
                  <div
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-lg font-heading text-2xl font-bold tabular-nums",
                      player.captain
                        ? "bg-falcon-500 text-white"
                        : "bg-navy-900 text-white",
                    )}
                  >
                    {player.number}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-lg leading-tight font-semibold tracking-tight text-navy-900">
                      {player.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {player.position} · {player.height} · {player.grade}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {player.captain ? (
                        <Badge className="rounded-md bg-falcon-50 text-falcon-700">
                          <StarIcon className="size-3" />
                          Captain
                        </Badge>
                      ) : null}
                    </div>
                    {player.note ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {player.note}
                      </p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Height</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((player) => (
                  <TableRow key={player.number}>
                    <TableCell className="font-mono tabular-nums">
                      {player.number}
                    </TableCell>
                    <TableCell className="font-medium text-navy-900">
                      {player.name}
                      {player.captain ? (
                        <span className="ml-2 text-xs font-semibold text-falcon-600">
                          (C)
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.grade}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.height}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
