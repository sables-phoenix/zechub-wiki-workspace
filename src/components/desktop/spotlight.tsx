"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/i18n-provider";
import { searchPages, type PageMeta } from "@/lib/pages";

type SearchHit = PageMeta & {
  snippet?: string;
};

type SpotlightProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (href: string) => void;
};

export function Spotlight({ open, onOpenChange, onNavigate }: SpotlightProps) {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [remoteResults, setRemoteResults] = useState<SearchHit[] | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const value = query.trim();
    if (!value) return;

    const controller = new AbortController();
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      if (cancelled) return;
      setRemoteResults(null);
      setSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}&locale=${locale}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search failed");
        const data = (await response.json()) as { results: SearchHit[] };
        if (!cancelled) setRemoteResults(data.results);
      } catch (error) {
        if (!cancelled && !(error instanceof DOMException && error.name === "AbortError")) {
          setRemoteResults(null);
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query, locale]);

  const results = useMemo<readonly SearchHit[]>(() => {
    const value = query.trim();
    if (!value) return [];
    return remoteResults ?? searchPages(value, 24);
  }, [query, remoteResults]);

  const navigate = (href: string) => {
    onOpenChange(false);
    onNavigate(href);
  };

  const quickLinks = [
    { label: t("shell.startHere", "Start Here"), href: "/start-here" },
    { label: t("shell.wallets", "Wallets"), href: "/wallets" },
    { label: t("shell.library", "Library"), href: "/library" },
    { label: t("shell.network", "Network"), href: "/network" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] max-w-2xl translate-y-0 p-0">
        <DialogHeader className="border-b border-line p-5">
          <DialogTitle className="text-2xl">{t("common.searchTheWiki", "Search the wiki")}</DialogTitle>
          <DialogDescription>
            {t("common.searchHint", "Full-text search across every page.")}
          </DialogDescription>
        </DialogHeader>
        <div className="border-b border-line p-4">
          <div className="relative">
            <MagnifierIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("common.searchPlaceholder", "Search pages, wallets, proofs, privacy...")}
              className="h-11 pl-9"
              aria-label={t("common.searchTheWiki", "Search the wiki")}
            />
          </div>
        </div>
        <div className="max-h-[58vh] overflow-y-auto p-2 window-scroll">
          {!query.trim() ? (
            <div className="mb-2 flex flex-wrap gap-2 px-2 py-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigate(link.href)}
                  className="rounded-pill border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {link.label}
                </button>
              ))}
            </div>
          ) : null}
          {results.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted">{t("common.noResults", "No pages match that search.")}</p>
          ) : (
            results.map((page) => (
              <button
                key={page.path}
                type="button"
                onClick={() => navigate(`/${page.path}`)}
                className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-paper-2"
              >
                <span className="mt-0.5 flex w-14 shrink-0 items-center justify-center rounded-md border border-line bg-paper-2 px-1 py-1 font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                  {t(`menuLabels.${page.section}`, page.section).split(" ")[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg leading-tight tracking-[-0.03em]">
                    {page.title}
                  </span>
                  <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-muted">
                    {page.snippet ?? page.description}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 pt-1 font-mono text-[8px] text-muted">
                  {page.readingMinutes} {t("common.minRead", "min read")}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
            {searching && query.trim()
              ? t("common.searching", "Searching...")
              : query.trim()
                ? `${results.length} results`
                : t("common.startHere", "Start here")}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{t("common.escToClose", "Esc to close")}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
