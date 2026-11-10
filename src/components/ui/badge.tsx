import * as React from "react";
import { cn } from "@/lib/utils";
import { toneClasses, type Tone } from "@/lib/status";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = "muted", ...props }, ref) => {
    const colors = toneClasses[tone];
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex h-6 items-center gap-1.5 rounded-pill border px-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em]",
          colors.border,
          colors.bg,
          colors.text,
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
