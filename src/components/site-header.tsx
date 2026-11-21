"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
import { team } from "@/data/team";

const nav = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/roster", label: "Roster" },
  { href: "/history", label: "History & Stats" },
  { href: "/fundraising", label: "Support Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="bg-navy-900 text-navy-100">
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
          <FalconMark className="h-11 w-11 shrink-0" />
          <span className="leading-none">
            <span className="block font-heading text-lg font-bold tracking-tight text-navy-900 uppercase sm:text-xl">
              Fertile-Beltrami Falcons
            </span>
            <span className="eyebrow block text-falcon-600">Volleyball</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 font-heading text-sm font-semibold tracking-wide uppercase transition-colors",
                isActive(item.href)
                  ? "bg-navy-50 text-navy-900"
                  : "text-navy-700/80 hover:bg-navy-50 hover:text-navy-900",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="ml-2 h-10 rounded-md bg-falcon-500 px-4 font-heading text-sm font-bold tracking-wide uppercase hover:bg-falcon-600"
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
              <Button variant="outline" size="icon-lg" aria-label="Open menu">
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
      <div className="falcon-stripes h-1.5 bg-navy-900" />
    </header>
  );
}
