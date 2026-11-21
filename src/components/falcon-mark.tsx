import { cn } from "@/lib/utils";

/**
 * Placeholder program mark: a winged volleyball in the team's red, navy and
 * white. Swap in the school's official falcon logo by dropping the artwork in
 * `public/` and replacing the usages of this component.
 */
export function FalconMark({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const navy = onDark ? "#ffffff" : "#0d2140";
  const ball = onDark ? "#08172e" : "#ffffff";

  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="Fertile-Beltrami Falcons volleyball mark"
      className={cn("h-10 w-10", className)}
    >
      <g fill="#c8102e">
        <path d="M54 30 L2 54 L7 64 L57 44 Z" />
        <path d="M49 50 L4 76 L10 86 L52 64 Z" />
        <path d="M45 70 L15 92 L23 100 L49 82 Z" />
      </g>
      <circle cx="78" cy="62" r="38" fill={ball} stroke={navy} strokeWidth="6" />
      <g
        clipPath="url(#falcon-ball-clip)"
        fill="none"
        stroke={navy}
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M42 44 Q 76 56 114 40" />
        <path d="M44 80 Q 76 68 116 82" />
        <path d="M66 26 Q 56 62 68 98" />
        <path d="M96 24 Q 106 62 96 100" />
      </g>
      <defs>
        <clipPath id="falcon-ball-clip">
          <circle cx="78" cy="62" r="35" />
        </clipPath>
      </defs>
    </svg>
  );
}
