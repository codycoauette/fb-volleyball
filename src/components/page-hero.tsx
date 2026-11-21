import type { ReactNode } from "react";

import { FalconMark } from "@/components/falcon-mark";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="falcon-stripes pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-15" />
      <FalconMark
        onDark
        className="pointer-events-none absolute -right-6 -bottom-10 h-56 w-56 opacity-10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <p className="eyebrow text-falcon-300">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight uppercase sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-navy-100">{description}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
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
