"use client";

import { useState } from "react";
import { LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useSaveSection } from "@/components/portal/use-save-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CollegeAthlete } from "@/content/types";

export function CollegeEditor({
  initialAthletes,
}: {
  initialAthletes: CollegeAthlete[];
}) {
  const [athletes, setAthletes] = useState(initialAthletes);
  const { saving, saveSection } = useSaveSection();

  async function saveAll() {
    await saveSection("collegeAthletes", athletes);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            College athletes
          </h1>
          <p className="text-sm text-muted-foreground">
            Past players who went on to play volleyball in college. Shown on the
            public College Athletes page.
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

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="h-9"
          onClick={() =>
            setAthletes((current) => [
              { name: "", college: "", graduationYear: "" },
              ...current,
            ])
          }
        >
          <PlusIcon className="size-4" />
          Add athlete
        </Button>
      </div>

      {athletes.length === 0 ? (
        <p className="rounded-xl border border-dashed px-5 py-8 text-center text-sm text-muted-foreground">
          No athletes yet. Add a name, college, and high school graduation year.
        </p>
      ) : (
        <div className="space-y-4">
          {athletes.map((athlete, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1.2fr_1.4fr_0.7fr_auto]"
            >
              {(
                [
                  ["name", "Name"],
                  ["college", "College"],
                  ["graduationYear", "HS graduation year"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    className="mt-1.5 h-10"
                    value={athlete[key]}
                    placeholder={
                      key === "graduationYear"
                        ? "2022"
                        : key === "college"
                          ? "e.g. Concordia Moorhead"
                          : undefined
                    }
                    onChange={(event) =>
                      setAthletes((current) =>
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
                    setAthletes((current) =>
                      current.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2Icon className="size-4 text-falcon-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
