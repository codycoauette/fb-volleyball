import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Official Fertile-Beltrami falcon mark (the "F" bird). Works on light and dark
 * backgrounds as-is — the artwork already carries its own red/navy/cyan.
 */
export function FalconMark({
  className,
}: {
  className?: string;
  /** Kept for call-site compatibility; the PNG needs no color flip. */
  onDark?: boolean;
}) {
  return (
    <Image
      src="/falcon-logo.png"
      alt="Fertile-Beltrami Falcons"
      width={128}
      height={125}
      priority
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}
