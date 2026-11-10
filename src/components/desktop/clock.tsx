"use client";

import { useLocalNow } from "@/hooks/use-local-now";
import { cn } from "@/lib/utils";

type DesktopClockProps = {
  className?: string;
  compact?: boolean;
  showDate?: boolean;
};

export function DesktopClock({ className, compact = false, showDate = true }: DesktopClockProps) {
  const now = useLocalNow();

  const date = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now)
    : "--";

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--";

  return (
    <div className={cn(className)}>
      {showDate ? (
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">{date}</p>
      ) : null}
      <p
        className={cn(
          "font-display leading-none tracking-[-0.06em] text-vault-text",
          showDate && "mt-1",
          compact ? "text-4xl" : "text-[clamp(2.8rem,4vw,4.5rem)]",
        )}
      >
        {time}
      </p>
    </div>
  );
}
