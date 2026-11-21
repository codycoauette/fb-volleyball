"use client";

import { useState } from "react";
import { LoaderCircleIcon, SaveIcon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TeamInfo } from "@/content/types";

const fields: { key: keyof TeamInfo; label: string; multiline?: boolean }[] = [
  { key: "school", label: "School name" },
  { key: "program", label: "Program name" },
  { key: "shortName", label: "Short name / nickname" },
  { key: "town", label: "Town" },
  { key: "conference", label: "Conference" },
  { key: "section", label: "Section / class" },
  { key: "gym", label: "Home gym name" },
  { key: "address", label: "Address" },
  { key: "email", label: "Contact email" },
  { key: "phone", label: "Phone" },
  { key: "ticketNote", label: "Ticket / admission note", multiline: true },
];

export function TeamEditor({ initial }: { initial: TeamInfo }) {
  const [team, setTeam] = useState(initial);
  const { saving, saveSection } = useSaveSection();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="font-heading text-xl font-bold tracking-tight text-navy-900 uppercase">
            Team info
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Shows up in the header, footer, and game-day sections.
          </p>
        </div>
        <Button
          disabled={saving}
          onClick={async () => {
            const saved = await saveSection("team", team);
            if (saved) setTeam(saved.team);
          }}
          className="h-10 rounded-md bg-navy-900 font-heading font-semibold tracking-wide uppercase hover:bg-navy-800"
        >
          {saving ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            <SaveIcon className="size-4" />
          )}
          Save
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.multiline ? "sm:col-span-2" : undefined}
          >
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.multiline ? (
              <Textarea
                id={field.key}
                className="mt-1.5"
                rows={3}
                value={team[field.key]}
                onChange={(event) =>
                  setTeam((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              />
            ) : (
              <Input
                id={field.key}
                className="mt-1.5 h-10"
                value={team[field.key]}
                onChange={(event) =>
                  setTeam((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
