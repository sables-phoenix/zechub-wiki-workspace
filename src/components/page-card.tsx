import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardPage = {
  path: string;
  title: string;
  description: string;
  section: string;
  readingMinutes: number;
};

type PageCardProps = {
  page: CardPage;
  className?: string;
  basePath?: string;
  readLabel?: string;
  sectionLabel?: string;
};

export function PageCard({
  page,
  className,
  basePath = "",
  readLabel = "Read",
  sectionLabel,
}: PageCardProps) {
  return (
    <Link
      href={`${basePath}/${page.path}`}
      className={cn(
        "group flex h-full min-w-0 flex-col rounded-card border border-line bg-paper p-4 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
          {sectionLabel ?? page.section}
        </span>
        <span className="font-mono text-[9px] text-muted">{page.readingMinutes} min</span>
      </div>
      <h3 className="mt-3 break-words font-display text-xl leading-[1.15] tracking-[-0.03em]">{page.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{page.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{readLabel}</span>
        <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </Link>
  );
}
