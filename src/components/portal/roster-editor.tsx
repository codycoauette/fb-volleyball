"use client";

import { useState } from "react";
import { LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Coach, Grade, Player } from "@/content/types";
import { GRADES } from "@/content/types";

function emptyPlayer(): Player {
  return {
    number: 0,
    name: "",
    grade: "Freshman",
    position: "",
    height: "",
    captain: false,
    note: "",
  };
}

function emptyCoach(): Coach {
  return { name: "", role: "", detail: "" };
}

export function RosterEditor({
  initialRoster,
  initialCoaches,
}: {
  initialRoster: Player[];
  initialCoaches: Coach[];
}) {
  const [roster, setRoster] = useState(initialRoster);
  const [coaches, setCoaches] = useState(initialCoaches);
  const { saving, saveSection } = useSaveSection();

  async function saveAll() {
    const nextRoster = await saveSection("roster", roster);
    if (!nextRoster) return;
    const nextCoaches = await saveSection("coaches", coaches);
    if (nextCoaches) {
      setRoster(nextCoaches.roster);
      setCoaches(nextCoaches.coaches);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            Roster & coaches
          </h1>
          <p className="text-sm text-muted-foreground">
            Jersey numbers, positions, captains and the coaching staff.
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
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="font-heading text-lg font-bold uppercase">
            Varsity roster ({roster.length})
          </CardTitle>
          <Button
            variant="outline"
            className="h-9 rounded-md"
            onClick={() => setRoster((current) => [...current, emptyPlayer()])}
          >
            <PlusIcon className="size-4" />
            Add player
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {roster.length === 0 ? (
            <p className="text-sm text-muted-foreground">No players yet.</p>
          ) : null}
          {roster.map((player, index) => (
            <div
              key={`${player.number}-${index}`}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-6"
            >
              <div>
                <Label>No.</Label>
                <Input
                  type="number"
                  className="mt-1.5 h-10"
                  value={player.number || ""}
                  onChange={(event) => {
                    const number = Number(event.target.value);
                    setRoster((current) =>
                      current.map((row, i) =>
                        i === index ? { ...row, number } : row,
                      ),
                    );
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Name</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={player.name}
                  onChange={(event) =>
                    setRoster((current) =>
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
                <Label>Grade</Label>
                <Select
                  value={player.grade}
                  onValueChange={(value) =>
                    setRoster((current) =>
                      current.map((row, i) =>
                        i === index ? { ...row, grade: value as Grade } : row,
                      ),
                    )
                  }
                >
                  <SelectTrigger className="mt-1.5 h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={player.position}
                  onChange={(event) =>
                    setRoster((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, position: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={player.height}
                  placeholder="5-8"
                  onChange={(event) =>
                    setRoster((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, height: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div className="sm:col-span-4">
                <Label>Note (optional)</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={player.note ?? ""}
                  onChange={(event) =>
                    setRoster((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, note: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div className="flex items-end justify-between gap-3 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={Boolean(player.captain)}
                    onCheckedChange={(value) =>
                      setRoster((current) =>
                        current.map((row, i) =>
                          i === index
                            ? { ...row, captain: value === true }
                            : row,
                        ),
                      )
                    }
                  />
                  Captain
                </label>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Remove player"
                  onClick={() =>
                    setRoster((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="font-heading text-lg font-bold uppercase">
            Coaches ({coaches.length})
          </CardTitle>
          <Button
            variant="outline"
            className="h-9 rounded-md"
            onClick={() => setCoaches((current) => [...current, emptyCoach()])}
          >
            <PlusIcon className="size-4" />
            Add coach
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {coaches.map((coach, index) => (
            <div
              key={`${coach.name}-${index}`}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_1fr_1.4fr_auto]"
            >
              <div>
                <Label>Name</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={coach.name}
                  onChange={(event) =>
                    setCoaches((current) =>
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
                <Label>Role</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={coach.role}
                  onChange={(event) =>
                    setCoaches((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, role: event.target.value }
                          : row,
                      ),
                    )
                  }
                />
              </div>
              <div>
                <Label>Detail</Label>
                <Input
                  className="mt-1.5 h-10"
                  value={coach.detail}
                  onChange={(event) =>
                    setCoaches((current) =>
                      current.map((row, i) =>
                        i === index
                          ? { ...row, detail: event.target.value }
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
                  aria-label="Remove coach"
                  onClick={() =>
                    setCoaches((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
