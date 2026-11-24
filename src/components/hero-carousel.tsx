"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  UsersIcon,
} from "lucide-react";

function SlideCtaIcon({ href }: { href?: string }) {
  if (href === "/fundraising" || href === "/donate") {
    return <HeartIcon className="size-4" />;
  }
  if (href === "/roster") {
    return <UsersIcon className="size-4" />;
  }
  return <CalendarDaysIcon className="size-4" />;
}

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

const SLIDE_MS = 7000;

export function HeroCarousel({
  photos,
  badge,
}: {
  photos: Photo[];
  badge: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIndex((next + photos.length) % photos.length),
    [photos.length],
  );

  const autoplay = playing && !reducedMotion && photos.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % photos.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(timer);
  }, [autoplay, photos.length, index]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  const active = photos[index];

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Falcons volleyball photos"
      onKeyDown={handleKeyDown}
      className="relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden bg-navy-950 text-white lg:min-h-[42rem]"
    >
      {photos.map((photo, slide) => (
        <div
          key={photo.src}
          aria-hidden={slide !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            slide === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={slide === 0}
            sizes="100vw"
            style={{ objectPosition: photo.position }}
            className={cn(
              "object-cover",
              slide === index && "animate-ken-burns",
            )}
          />
        </div>
      ))}

      <div className="photo-scrim absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-32 pb-8 sm:pb-10">
        <div key={index} className="max-w-2xl">
          <p className="animate-slide-in eyebrow flex items-center gap-2 text-falcon-200">
            <span className="relative flex size-2">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-falcon-400" />
              <span className="relative size-2 rounded-full bg-falcon-500" />
            </span>
            {active.kicker}
          </p>
          <h1 className="text-on-photo animate-rise mt-3 text-5xl leading-[0.92] font-bold tracking-tight uppercase [animation-delay:120ms] sm:text-6xl lg:text-7xl">
            {active.headline}
          </h1>
          <p className="text-on-photo animate-rise mt-4 max-w-xl text-lg font-medium text-white/95 [animation-delay:240ms]">
            {active.blurb}
          </p>
          <p className="animate-rise mt-2 font-heading text-sm font-semibold tracking-wide text-falcon-200 uppercase [animation-delay:300ms]">
            {badge}
          </p>
          <div className="animate-rise mt-7 flex flex-wrap gap-3 [animation-delay:360ms]">
            <Button
              asChild
              className="h-12 rounded-md bg-falcon-500 px-6 font-heading text-base font-bold tracking-wide uppercase shadow-lg shadow-falcon-900/30 transition-transform hover:bg-falcon-600 hover:-translate-y-0.5"
            >
              <Link href={active.href ?? "/schedule"}>
                <SlideCtaIcon href={active.href} />
                {active.cta ?? "Season schedule"}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-md border-white/50 bg-navy-950/55 px-6 font-heading text-base font-bold tracking-wide text-white uppercase backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-navy-950/75 hover:text-white"
            >
              <Link
                href={
                  active.href === "/fundraising" || active.href === "/donate"
                    ? "/schedule"
                    : "/fundraising"
                }
              >
                {active.href === "/fundraising" || active.href === "/donate" ? (
                  <>
                    <CalendarDaysIcon className="size-4" />
                    Season schedule
                  </>
                ) : (
                  <>
                    <HeartIcon className="size-4" />
                    Support the Falcons
                  </>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy-950/85">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {photos.map((photo, slide) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => go(slide)}
                  aria-label={`Show photo ${slide + 1}: ${photo.caption}`}
                  aria-current={slide === index}
                  className="group relative flex h-8 w-12 items-center sm:w-16"
                >
                  <span className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                    <span
                      key={`${slide}-${index}`}
                      className={cn(
                        "absolute inset-0 origin-left rounded-full bg-falcon-500",
                        slide === index
                          ? autoplay
                            ? "animate-progress"
                            : "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-25 group-hover:transition-transform",
                      )}
                      style={
                        slide === index && autoplay
                          ? { animationDuration: `${SLIDE_MS}ms` }
                          : undefined
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
            <p className="hidden text-xs text-navy-200 sm:block">
              {active.caption}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white"
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label={
                playing ? "Pause the photo carousel" : "Play the photo carousel"
              }
              onClick={() => setPlaying((current) => !current)}
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white"
            >
              {playing && !reducedMotion ? <PauseIcon /> : <PlayIcon />}
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Next photo"
              onClick={() => go(index + 1)}
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
