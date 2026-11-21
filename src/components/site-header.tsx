"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { HeartIcon, MapPinIcon, MenuIcon } from "lucide-react";

import { FalconMark } from "@/components/falcon-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { TeamInfo } from "@/content/types";

const nav = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/roster", label: "Roster" },
  { href: "/history", label: "History & Stats" },
  { href: "/fundraising", label: "Support Us" },
];

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 32;
}

export function SiteHeader({ team }: { team: TeamInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Every page opens on a photo hero, so the bar floats over the image until
  // the visitor scrolls, then becomes solid.
  const scrolled = useSyncExternalStore(subscribeScroll, isScrolled, () => false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "fixed top-0 right-0 left-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-navy-900/10 bg-white/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/85"
          : "bg-gradient-to-b from-navy-950/85 via-navy-950/45 to-transparent",
      )}
    >
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled ? "bg-navy-900 text-navy-100" : "text-navy-100",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs">
          <p className="flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 text-falcon-300" />
            <span className="truncate">
              {team.gym} · {team.town}
            </span>
          </p>
          <p className="hidden sm:block">{team.conference}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <FalconMark
            className="h-12 w-12 shrink-0 transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14"
          />
          <span className="leading-none">
            <span
              className={cn(
                "block font-heading text-lg font-bold tracking-tight uppercase transition-colors duration-300 sm:text-xl",
                scrolled ? "text-navy-900" : "text-white",
              )}
            >
              Fertile-Beltrami Falcons
            </span>
            <span
              className={cn(
                "eyebrow block transition-colors duration-300",
                scrolled ? "text-falcon-600" : "text-falcon-300",
              )}
            >
              Volleyball
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 font-heading text-sm font-semibold tracking-wide uppercase transition-colors",
                scrolled
                  ? isActive(item.href)
                    ? "text-navy-900"
                    : "text-navy-700/80 hover:text-navy-900"
                  : isActive(item.href)
                    ? "text-white"
                    : "text-navy-100 hover:text-white",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-falcon-500 transition-transform duration-300",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
          <Button
            asChild
            className="ml-2 h-10 rounded-md bg-falcon-500 px-4 font-heading text-sm font-bold tracking-wide uppercase transition-transform hover:-translate-y-0.5 hover:bg-falcon-600"
          >
            <Link href="/donate">
              <HeartIcon className="size-4" />
              Donate
            </Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Button
            asChild
            className="h-9 rounded-md bg-falcon-500 px-3 font-heading text-xs font-bold tracking-wide uppercase hover:bg-falcon-600"
          >
            <Link href="/donate">Donate</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Open menu"
                className={cn(
                  !scrolled &&
                    "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white",
                )}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-xs">
              <SheetHeader>
                <SheetTitle className="font-heading text-base tracking-wide uppercase">
                  Falcons Volleyball
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 pb-4">
                {[...nav, { href: "/donate", label: "Donate" }].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 font-heading text-base font-semibold tracking-wide uppercase",
                      isActive(item.href)
                        ? "bg-navy-900 text-white"
                        : "text-navy-800 hover:bg-navy-50",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {scrolled ? <div className="falcon-stripes h-1.5 bg-navy-900" /> : null}
    </header>
  );
}
