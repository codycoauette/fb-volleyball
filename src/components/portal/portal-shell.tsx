"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SchoolIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import { FalconMark } from "@/components/falcon-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PORTAL_SECTIONS } from "@/content/types";

const icons = {
  team: SchoolIcon,
  roster: UsersIcon,
  schedule: CalendarDaysIcon,
  history: TrophyIcon,
  college: GraduationCapIcon,
  fundraising: HandCoinsIcon,
} as const;

export function PortalShell({
  children,
  updatedAt,
  usingDefaultPassword,
}: {
  children: React.ReactNode;
  updatedAt?: string;
  usingDefaultPassword?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="border-b border-navy-900/10 bg-navy-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/portal" className="flex items-center gap-3">
            <FalconMark className="h-10 w-10" />
            <span>
              <span className="block font-heading text-lg font-bold tracking-tight uppercase">
                Coach portal
              </span>
              <span className="eyebrow text-falcon-300">Falcons Volleyball</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="h-9 rounded-md border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/" target="_blank">
                View site
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="h-9 rounded-md border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {usingDefaultPassword ? (
        <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
          Using the default portal password. Set{" "}
          <code className="font-mono">PORTAL_PASSWORD</code> before going live.
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[14rem_1fr]">
        <aside className="h-fit rounded-xl bg-white p-2 ring-1 ring-foreground/10 lg:sticky lg:top-4">
          <nav className="flex flex-col gap-0.5">
            <Link
              href="/portal"
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2.5 font-heading text-sm font-semibold tracking-wide uppercase",
                pathname === "/portal"
                  ? "bg-navy-900 text-white"
                  : "text-navy-800 hover:bg-navy-50",
              )}
            >
              <LayoutDashboardIcon className="size-4" />
              Overview
            </Link>
            {PORTAL_SECTIONS.map((section) => {
              const Icon = icons[section.slug];
              const href = `/portal/${section.slug}`;
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={section.slug}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 font-heading text-sm font-semibold tracking-wide uppercase",
                    active
                      ? "bg-navy-900 text-white"
                      : "text-navy-800 hover:bg-navy-50",
                  )}
                >
                  <Icon className="size-4" />
                  {section.label}
                </Link>
              );
            })}
          </nav>
          {updatedAt ? (
            <p className="mt-3 border-t px-3 pt-3 text-xs text-muted-foreground">
              Last saved{" "}
              {new Date(updatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          ) : null}
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
