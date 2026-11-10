import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";

type AvatarProps = {
  name: string;
  mark?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-7 w-7 text-[9px]",
  md: "h-9 w-9 text-[10px]",
  lg: "h-14 w-14 text-sm",
};

const Avatar = ({ name, mark, className, size = "md" }: AvatarProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-full border border-ink bg-ink font-mono font-medium uppercase tracking-[0.04em] text-paper",
      sizeClasses[size],
      className,
    )}
    aria-hidden="true"
  >
    {mark ?? initials(name)}
  </span>
);

export { Avatar };
