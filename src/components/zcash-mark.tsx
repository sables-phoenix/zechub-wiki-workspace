import { cn } from "@/lib/utils";

type ZcashMarkProps = {
  className?: string;
};

export function ZcashMark({ className }: ZcashMarkProps) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      aria-hidden="true"
      className={cn("block", className)}
      fill="none"
    >
      <path
        d="m636.31,455.79v-41.09h-73.67v-45.28h-45.28v45.28h-73.67v54.5h114.16l-114.16,155v41.09h73.67v45.16h45.28v-45.16h73.67v-54.5h-114.28l114.28-155Z"
        fill="currentColor"
      />
      <path
        d="m540,270c-148.9,0-270,121.1-270,270s121.1,270,270,270,270-121.11,270-270-121.11-270-270-270Zm0,495.44c-124.34,0-225.44-101.1-225.44-225.44s101.1-225.44,225.44-225.44,225.44,101.1,225.44,225.44-101.1,225.44-225.44,225.44h0Z"
        fill="currentColor"
      />
    </svg>
  );
}
