import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageMeta } from "@/lib/pages";

type PageCardProps = {
  page: PageMeta;
  className?: string;
};

export function PageCard({ page, className }: PageCardProps) {
  return (
    <Link
      href={`/${page.path}`}
      className={cn(
        "group flex h-full min-w-0 flex-col rounded-card border border-line bg-paper p-4 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{page.section}</span>
        <span className="font-mono text-[9px] text-muted">{page.readingMinutes} min</span>
      </div>
      <h3 className="mt-3 break-words font-display text-xl leading-[1.15] tracking-[-0.03em]">{page.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{page.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">Read</span>
        <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </Link>
  );
}
