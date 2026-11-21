import Image from "next/image";
import type { ReactNode } from "react";

import { FalconMark } from "@/components/falcon-mark";
import type { Photo } from "@/data/photos";

export function PageHero({
  eyebrow,
  title,
  description,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: photo.position }}
            className="animate-ken-burns object-cover"
          />
          <div className="photo-scrim absolute inset-0" />
        </>
      ) : (
        <FalconMark
          onDark
          className="pointer-events-none absolute -right-6 -bottom-10 h-56 w-56 opacity-10"
        />
      )}
      {photo ? null : (
        <div className="falcon-stripes pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-[0.08]" />
      )}

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-14 sm:pt-36 sm:pb-20">
        <p className="animate-slide-in eyebrow text-falcon-200">{eyebrow}</p>
        <h1 className="text-on-photo animate-rise mt-2 text-4xl font-bold tracking-tight uppercase [animation-delay:100ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="text-on-photo animate-rise mt-4 max-w-2xl font-medium text-white/95 [animation-delay:200ms]">
            {description}
          </p>
        ) : null}
        {children ? (
          <div className="animate-rise mt-7 [animation-delay:300ms]">
            {photo ? (
              // A glass panel keeps stats and meters readable over the photo.
              <div className="inline-block max-w-full rounded-xl bg-navy-950/70 px-5 py-4 ring-1 ring-white/15 backdrop-blur-sm">
                {children}
              </div>
            ) : (
              children
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow text-falcon-600">{eyebrow}</p> : null}
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-navy-900 uppercase sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
