"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2Icon, LoaderCircleIcon, LockIcon } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { designations, team } from "@/data/team";
import { formatCurrency } from "@/lib/schedule";
import { cn } from "@/lib/utils";

const presets = [2500, 5000, 10000, 25000, 50000];

type Frequency = "one-time" | "monthly";

type Confirmation = {
  id: string;
  amountCents: number;
  frequency: Frequency;
  designation: string;
};

export function DonationForm() {
  const searchParams = useSearchParams();
  const fundParam = searchParams.get("fund");
  const initialDesignation = designations.some((d) => d.value === fundParam)
    ? (fundParam as string)
    : "general";

  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [preset, setPreset] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [designation, setDesignation] = useState(initialDesignation);
  const [employerMatch, setEmployerMatch] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const amountCents =
    preset ?? Math.round(Number.parseFloat(customAmount || "0") * 100);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setErrors({});

    const payload = {
      amountCents: Number.isFinite(amountCents) ? amountCents : 0,
      frequency,
      designation,
      donorName: String(form.get("donorName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      tribute: String(form.get("tribute") ?? ""),
      employerMatch,
      employer: String(form.get("employer") ?? ""),
      anonymous,
      note: String(form.get("note") ?? ""),
    };

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        return;
      }

      setConfirmation({
        id: data.pledge.id,
        amountCents: data.pledge.amountCents,
        frequency: data.pledge.frequency,
        designation: data.pledge.designation,
      });
    } catch {
      setErrors({
        form: "We could not reach the server. Try again, or email the booster club.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    const fundLabel =
      designations.find((d) => d.value === confirmation.designation)?.label ??
      "General program fund";

    return (
      <Card className="border-0 ring-2 ring-emerald-500/40">
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2Icon className="size-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
                Thank you, Falcon fan
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your pledge is recorded as{" "}
                <span className="font-mono font-medium text-navy-900">
                  {confirmation.id}
                </span>
                . Card processing is not switched on yet, so a booster club volunteer
                will reach out to collect the gift and send a receipt.
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 rounded-lg bg-navy-50 p-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-muted-foreground">Amount</dt>
              <dd className="mt-1 font-heading text-xl font-bold text-navy-900">
                {formatCurrency(confirmation.amountCents)}
                {confirmation.frequency === "monthly" ? " / month" : ""}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Designated to</dt>
              <dd className="mt-1 font-medium text-navy-900">{fundLabel}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Questions</dt>
              <dd className="mt-1">
                <a
                  className="font-medium text-falcon-600 hover:underline"
                  href={`mailto:${team.email}`}
                >
                  {team.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="h-10 rounded-md font-heading font-semibold tracking-wide uppercase"
              onClick={() => setConfirmation(null)}
            >
              Give again
            </Button>
            <Button
              asChild
              className="h-10 rounded-md bg-navy-900 font-heading font-semibold tracking-wide uppercase hover:bg-navy-800"
            >
              <Link href="/schedule">See the schedule</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="font-heading text-xl font-bold tracking-tight text-navy-900 uppercase">
            Make a gift
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Every field marked required keeps the receipt accurate for the activities
            account.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <fieldset>
            <legend className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
              Gift frequency
            </legend>
            <div className="mt-3 inline-flex rounded-lg bg-navy-50 p-1">
              {(["one-time", "monthly"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFrequency(option)}
                  aria-pressed={frequency === option}
                  className={cn(
                    "rounded-md px-4 py-2 font-heading text-sm font-semibold tracking-wide uppercase transition-colors",
                    frequency === option
                      ? "bg-navy-900 text-white"
                      : "text-navy-700 hover:bg-navy-100",
                  )}
                >
                  {option === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-heading text-sm font-semibold tracking-wide text-navy-900 uppercase">
              Amount
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setPreset(value);
                    setCustomAmount("");
                  }}
                  aria-pressed={preset === value}
                  className={cn(
                    "min-w-20 rounded-lg border px-4 py-2.5 font-heading text-base font-bold tabular-nums transition-colors",
                    preset === value
                      ? "border-falcon-500 bg-falcon-500 text-white"
                      : "border-input bg-white text-navy-900 hover:border-falcon-300",
                  )}
                >
                  {formatCurrency(value)}
                </button>
              ))}
            </div>
            <div className="mt-3 max-w-xs">
              <Label htmlFor="customAmount" className="text-xs text-muted-foreground">
                Or enter another amount
              </Label>
              <div className="relative mt-1">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="customAmount"
                  inputMode="decimal"
                  placeholder="75.00"
                  value={customAmount}
                  onChange={(event) => {
                    setCustomAmount(event.target.value);
                    setPreset(null);
                  }}
                  className="h-10 pl-7"
                  aria-invalid={Boolean(errors.amountCents)}
                />
              </div>
            </div>
            {errors.amountCents ? (
              <p className="mt-2 text-sm font-medium text-falcon-600">
                {errors.amountCents}
              </p>
            ) : null}
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="designation">Designate my gift to</Label>
              <Select value={designation} onValueChange={setDesignation}>
                <SelectTrigger id="designation" className="mt-1.5 h-10 w-full">
                  <SelectValue placeholder="Choose a fund" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.designation ? (
                <p className="mt-2 text-sm font-medium text-falcon-600">
                  {errors.designation}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="donorName">Name on the receipt *</Label>
              <Input
                id="donorName"
                name="donorName"
                autoComplete="name"
                placeholder="Pat Lindgren"
                className="mt-1.5 h-10"
                aria-invalid={Boolean(errors.donorName)}
              />
              {errors.donorName ? (
                <p className="mt-2 text-sm font-medium text-falcon-600">
                  {errors.donorName}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-1.5 h-10"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="mt-2 text-sm font-medium text-falcon-600">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(218) 555-0137"
                className="mt-1.5 h-10"
              />
            </div>

            <div>
              <Label htmlFor="tribute">In honor of (optional)</Label>
              <Input
                id="tribute"
                name="tribute"
                placeholder="A player, a coach, a class year"
                className="mt-1.5 h-10"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="note">Note for the booster club (optional)</Label>
              <Textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Tell us how you would like your gift used, or how to recognize it in the program."
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-navy-50 p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="employerMatch"
                checked={employerMatch}
                onCheckedChange={(value) => setEmployerMatch(value === true)}
              />
              <div>
                <Label htmlFor="employerMatch" className="font-medium text-navy-900">
                  My employer matches charitable gifts
                </Label>
                <p className="text-xs text-muted-foreground">
                  We will send the forms your employer needs.
                </p>
              </div>
            </div>

            {employerMatch ? (
              <div className="pl-7">
                <Label htmlFor="employer">Employer</Label>
                <Input
                  id="employer"
                  name="employer"
                  placeholder="Employer name"
                  className="mt-1.5 h-10 max-w-sm bg-white"
                  aria-invalid={Boolean(errors.employer)}
                />
                {errors.employer ? (
                  <p className="mt-2 text-sm font-medium text-falcon-600">
                    {errors.employer}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex items-start gap-3">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(value) => setAnonymous(value === true)}
              />
              <div>
                <Label htmlFor="anonymous" className="font-medium text-navy-900">
                  Keep my gift anonymous
                </Label>
                <p className="text-xs text-muted-foreground">
                  Your name stays off the supporter wall and out of the program.
                </p>
              </div>
            </div>
          </div>

          {errors.form ? (
            <p className="rounded-lg bg-falcon-50 px-4 py-3 text-sm font-medium text-falcon-700">
              {errors.form}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <LockIcon className="size-3.5" />
              No card details are collected on this page yet.
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 rounded-md bg-falcon-500 px-6 font-heading text-base font-bold tracking-wide uppercase hover:bg-falcon-600"
            >
              {submitting ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : null}
              {submitting
                ? "Recording pledge"
                : `Pledge ${Number.isFinite(amountCents) && amountCents > 0 ? formatCurrency(amountCents) : "my gift"}${frequency === "monthly" ? " / month" : ""}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
