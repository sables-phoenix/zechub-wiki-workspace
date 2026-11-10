"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { SectionHero } from "@/components/section-hero";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pages, sections, type PageMeta } from "@/lib/pages";

const totalWords = pages.reduce((sum, page) => sum + page.words, 0);

const matchesQuery = (page: PageMeta, value: string): boolean => {
  if (!value) return true;
  const haystack = `${page.title} ${page.description} ${page.section}`.toLowerCase();
  return value
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

export function LibraryView() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("All");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return pages.filter(
      (page) =>
        (activeSection === "All" || page.section === activeSection) && matchesQuery(page, value),
    );
  }, [query, activeSection]);

  const grouped = useMemo(() => {
    if (query.trim()) {
      return [{ id: "Results", label: "Search results", pages: results }];
    }
    return sections
      .map((section) => ({
        id: section.id,
        label: section.label,
        pages: results.filter((page) => page.section === section.id),
      }))
      .filter((group) => group.pages.length > 0);
  }, [query, results]);

  return (
    <>
      <SectionHero
        eyebrow="Site Navigation"
        title="Site Navigation"
        description="Browse the complete hierarchy of guides, tutorials, research, developer documentation, and ecosystem resources on ZecHub."
        actions={
          <>
            <Link
              href="/start-here"
              className="inline-flex h-11 items-center rounded-pill border border-line bg-paper px-5 text-sm text-ink transition-colors hover:bg-paper-2"
            >
              Start Here
            </Link>
            <Link
              href="/network"
              className="inline-flex h-11 items-center rounded-pill border border-line bg-paper px-5 text-sm text-ink transition-colors hover:bg-paper-2"
            >
              Dashboard
            </Link>
          </>
        }
        meta={
          <>
            <span>{pages.length} pages</span>
            <span>{Math.round(totalWords / 1000)}k words</span>
            <span>{sections.filter((section) => section.id !== "Wiki").length} sections</span>
          </>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="rounded-card border border-line bg-paper p-4 shadow-stamp md:p-5">
          <div className="relative">
            <MagnifierIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all 232 pages..."
              className="h-11 pl-9"
              aria-label="Search all pages"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <SectionChip active={activeSection === "All"} onClick={() => setActiveSection("All")}>
              All <span className="ml-1 opacity-60">{pages.length}</span>
            </SectionChip>
            {sections
              .filter((section) => section.id !== "Wiki")
              .map((section) => {
                const count = pages.filter((page) => page.section === section.id).length;
                if (count === 0) return null;
                return (
                  <SectionChip
                    key={section.id}
                    active={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label} <span className="ml-1 opacity-60">{count}</span>
                  </SectionChip>
                );
              })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {results.length} {results.length === 1 ? "page" : "pages"}
          </p>
          {query || activeSection !== "All" ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveSection("All");
              }}
              className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
            >
              Clear
            </button>
          ) : null}
        </div>

        {results.length === 0 ? (
          <div className="mt-3 rounded-card border border-dashed border-line p-10 text-center">
            <p className="font-display text-2xl tracking-[-0.03em]">No pages match that search.</p>
            <p className="mt-2 text-sm text-muted">Try a broader search or a different section.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-9">
            {grouped.map((group) => (
              <section key={group.id}>
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-2xl leading-none tracking-[-0.04em]">{group.label}</h2>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {group.pages.length} pages
                  </span>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {group.pages.map((page) => (
                    <Link
                      key={page.path}
                      href={`/${page.path}`}
                      className="group flex min-w-0 gap-3 rounded-lg border border-line bg-paper p-3 transition-colors hover:border-ink/25 hover:bg-paper-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                          {page.section} / {page.readingMinutes} min
                        </p>
                        <p className="mt-1 break-words font-display text-lg leading-tight tracking-[-0.03em]">
                          {page.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">
                          {page.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function SectionChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-7 rounded-pill border px-3 text-[10px] transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
