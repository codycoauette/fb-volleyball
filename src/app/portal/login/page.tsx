"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircleIcon, LockIcon } from "lucide-react";

import { FalconMark } from "@/components/falcon-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PortalLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      router.push("/portal");
      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-12">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="items-center text-center">
          <FalconMark className="h-16 w-16" />
          <CardTitle className="mt-3 font-heading text-2xl font-bold tracking-tight text-navy-900 uppercase">
            Coach portal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to update the roster, schedule, record book and fundraising
            content on the site.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Portal password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5 h-11"
                placeholder="Enter password"
                required
              />
            </div>
            {error ? (
              <p className="rounded-lg bg-falcon-50 px-3 py-2 text-sm font-medium text-falcon-700">
                {error}
              </p>
            ) : null}
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full rounded-md bg-navy-900 font-heading text-base font-bold tracking-wide uppercase hover:bg-navy-800"
            >
              {submitting ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : (
                <LockIcon className="size-4" />
              )}
              {submitting ? "Signing in" : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Local default password is{" "}
            <code className="font-mono">falcons2027</code> until you set{" "}
            <code className="font-mono">PORTAL_PASSWORD</code>.
          </p>
          <p className="mt-3 text-center text-xs">
            <Link href="/" className="font-medium text-falcon-600 hover:underline">
              ← Back to the public site
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
