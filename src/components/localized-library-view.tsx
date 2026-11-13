"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { useI18n } from "@/components/i18n-provider";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/i18n";
import { externalResources, specialPages } from "@/data/resources";
import type { LibraryPage } from "@/lib/localized-pages";

const matchesQuery = (page: LibraryPage, value: string): boolean => {
  if (!value) return true;
  const haystack = `${page.title} ${page.description} ${page.section}`.toLowerCase();
  return value
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

export function LocalizedLibraryView({ pages }: { pages: readonly LibraryPage[] }) {
  const { t, locale } = useI18n();
  const basePath = locale === "en" ? "" : `/${locale}`;
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("All");

  const sections = useMemo(
    () => ["All", ...Array.from(new Set(pages.map((page) => page.section)))],
    [pages],
  );

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return pages.filter(
      (page) =>
        (activeSection === "All" || page.section === activeSection) && matchesQuery(page, value),
    );
  }, [pages, query, activeSection]);

  const grouped = useMemo(() => {
    if (query.trim()) return [{ id: "Results", label: t("library.results", "Search results"), pages: results }];
    return sections
      .filter((section) => section !== "All")
      .map((section) => ({
        id: section,
        label: t(`menuLabels.${section}`, section),
        pages: results.filter((page) => page.section === section),
      }))
      .filter((group) => group.pages.length > 0);
  }, [query, results, sections, t]);

  const totalWords = pages.reduce((sum, page) => sum + page.words, 0);

  return (
    <>
      <SectionHero
        eyebrow={t("library.title", "Site Navigation")}
        title={t("library.title", "Site Navigation")}
        description={t(
          "library.description",
          "Browse the complete hierarchy of guides, tutorials, research, developer documentation, and ecosystem resources on ZecHub.",
        )}
        actions={
          <>
            <Button asChild>
              <Link href={localePath(locale, "/start-here")}>{t("common.startHere", "Start Here")}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localePath(locale, "/network")}>{t("shell.network", "Dashboard")}</Link>
            </Button>
          </>
        }
        meta={
          <>
            <span>
              {pages.length} {t("library.pages", "pages")}
            </span>
            <span>
              {Math.round(totalWords / 1000)}k {t("library.words", "words")}
            </span>
            <span>
              {sections.length - 1} {t("library.sections", "sections")}
            </span>
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
              placeholder={t("library.searchPlaceholder", "Search all pages...")}
              className="h-11 pl-9"
              aria-label={t("library.searchPlaceholder", "Search all pages...")}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {sections.map((section) => {
              const count =
                section === "All" ? pages.length : pages.filter((page) => page.section === section).length;
              if (section !== "All" && count === 0) return null;
              return (
                <SectionChip
                  key={section}
                  active={activeSection === section}
                  onClick={() => setActiveSection(section)}
                >
                  {section === "All" ? t("wallets.all", "All") : t(`menuLabels.${section}`, section)}{" "}
                  <span className="ml-1 opacity-60">{count}</span>
                </SectionChip>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {results.length} {results.length === 1 ? t("library.page", "page") : t("library.pages", "pages")}
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
              {t("common.clear", "Clear")}
            </button>
          ) : null}
        </div>

        {results.length === 0 ? (
          <div className="mt-3 rounded-card border border-dashed border-line p-10 text-center">
            <p className="font-display text-2xl tracking-[-0.03em]">
              {t("library.noMatches", "No pages match that search.")}
            </p>
            <p className="mt-2 text-sm text-muted">
              {t("library.noMatchesCopy", "Try a broader search or a different section.")}
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-9">
            {grouped.map((group) => (
              <section key={group.id}>
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-2xl leading-none tracking-[-0.04em]">{group.label}</h2>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {group.pages.length} {t("library.pages", "pages")}
                  </span>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {group.pages.map((page) => (
                    <PageCard
                      key={page.path}
                      page={page}
                      basePath={basePath}
                      readLabel={t("common.read", "Read")}
                      sectionLabel={t(`menuLabels.${page.section}`, page.section)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <section className="mt-12 border-t border-line pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">{t("library.more", "More from ZecHub")}</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">
                {t("library.pagesAndPlaces", "Pages and places.")}
              </h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {specialPages.length + externalResources.length} {t("library.links", "links")}
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ResourceGroup
              title={t("library.zecHubPages", "ZecHub pages")}
              items={specialPages}
              basePath={basePath}
            />
            <ResourceGroup
              title={t("library.elsewhere", "Elsewhere")}
              items={externalResources}
              basePath={basePath}
            />
          </div>
        </section>
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

function ResourceGroup({
  title,
  items,
  basePath,
}: {
  title: string;
  items: readonly { label: string; href: string; note: string; external?: boolean }[];
  basePath: string;
}) {
  return (
    <div className="rounded-card border border-line bg-paper p-5 shadow-stamp">
      <p className="eyebrow">{title}</p>
      <div className="mt-3">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-3 border-b border-line py-2.5 last:border-0"
            >
              <span className="min-w-0">
                <span className="block text-sm text-ink transition-colors group-hover:text-gold-deep">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">{item.note}</span>
              </span>
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
            </a>
          ) : (
            <Link
              key={item.href}
              href={`${basePath}${item.href}`}
              className="group flex items-start justify-between gap-3 border-b border-line py-2.5 last:border-0"
            >
              <span className="min-w-0">
                <span className="block text-sm text-ink transition-colors group-hover:text-gold-deep">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">{item.note}</span>
              </span>
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
