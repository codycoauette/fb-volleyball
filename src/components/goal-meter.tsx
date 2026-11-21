import { formatCurrency } from "@/lib/schedule";
import { cn } from "@/lib/utils";

export function GoalMeter({
  raisedCents,
  goalCents,
  className,
  onDark = false,
}: {
  raisedCents: number;
  goalCents: number;
  className?: string;
  onDark?: boolean;
}) {
  const pct = Math.min(100, Math.round((raisedCents / goalCents) * 100));
  const complete = raisedCents >= goalCents;

  return (
    <div className={className}>
      <div
        className={cn(
          "flex items-baseline justify-between gap-2 font-heading",
          onDark ? "text-white" : "text-navy-900",
        )}
      >
        <span className="text-2xl font-bold tabular-nums">
          {formatCurrency(raisedCents)}
        </span>
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            onDark ? "text-white/80" : "text-muted-foreground",
          )}
        >
          of {formatCurrency(goalCents)}
        </span>
      </div>
      <div
        className={cn(
          "mt-2 h-2.5 w-full overflow-hidden rounded-full",
          onDark ? "bg-white/20" : "bg-navy-100",
        )}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Fundraising progress"
      >
        <div
          className={cn(
            "h-full rounded-full",
            complete ? "bg-emerald-500" : "bg-falcon-500",
          )}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
      <p
        className={cn(
          "mt-2 text-xs font-medium",
          onDark ? "text-white/75" : "text-muted-foreground",
        )}
      >
        {complete
          ? "Goal met — thank you, Falcon fans."
          : `${pct}% funded · ${formatCurrency(goalCents - raisedCents)} to go`}
      </p>
    </div>
  );
}
