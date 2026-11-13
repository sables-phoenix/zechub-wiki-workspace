import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CopyLinkButton } from "@/components/copy-link";
import { Markdown } from "@/components/markdown";
import { PageCard } from "@/components/page-card";
import { getTranslator } from "@/lib/messages.server";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { desktopApps } from "@/lib/apps";
import { sections } from "@/lib/pages";
import {
  localizedAdjacent,
  localizedRelated,
  localizedSiblings,
  type LocalizedPage,
} from "@/lib/localized-pages";
import type { TocEntry } from "@/lib/content";

type LocalizedArticleViewProps = {
  locale: Locale;
  page: LocalizedPage;
  markdown: string;
  toc: readonly TocEntry[];
  lead: string | null;
  fallback: boolean;
};

const appKey: Record<string, string> = {
  home: "shell.startHere",
  start: "shell.startHere",
  wallets: "shell.wallets",
  use: "shell.usingZcash",
  learn: "shell.learn",
  build: "shell.build",
  ecosystem: "shell.ecosystem",
  library: "shell.library",
  network: "shell.network",
  donate: "shell.donate",
  contribute: "shell.contribute",
  settings: "shell.settings",
};

export function LocalizedArticleView({
  locale,
  page,
  markdown,
  toc,
  lead,
  fallback,
}: LocalizedArticleViewProps) {
  const t = getTranslator(locale);
  const basePath = locale === "en" ? "" : `/${locale}`;
  const section = sections.find((item) => item.label === page.section);
  const app = desktopApps.find((item) => item.id === page.app);
  const siblings = localizedSiblings(locale, page);
  const orderedSiblings = [page, ...siblings.filter((item) => item.path !== page.path)];
  const { previous, next } = localizedAdjacent(locale, page);
  const related = localizedRelated(locale, page);
  const sectionHref = section ? localePath(locale, section.href) : localePath(locale, "/library");
  const sectionLabel = t(`menuLabels.${page.section}`, page.section);

  return (
    <div className="container-page py-7 md:py-9">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_210px]">
        <aside className="hidden lg:block">
          <div className="sticky top-4">
            <Link
              href={sectionHref}
              className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t(appKey[app?.id ?? ""] ?? "common.allPages", app?.label ?? page.section)}
            </Link>
            <p className="eyebrow mt-6">{sectionLabel}</p>
            <nav className="mt-2 max-h-[58vh] overflow-y-auto pr-2 window-scroll" aria-label={`${sectionLabel} pages`}>
              {orderedSiblings.map((item) => (
                <Link
                  key={item.path}
                  href={`${basePath}/${item.path}`}
                  className={
                    item.path === page.path
                      ? "block border-l-2 border-gold py-1.5 pl-3 text-xs font-medium text-ink"
                      : "block border-l-2 border-transparent py-1.5 pl-3 text-xs text-muted transition-colors hover:border-line hover:text-ink"
                  }
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <article className="mx-auto w-full min-w-0 max-w-[760px]">
          <Link href={sectionHref} className="mb-5 inline-flex items-center gap-2 text-xs text-muted lg:hidden">
            <ArrowLeft className="h-3.5 w-3.5" />
            {sectionLabel}
          </Link>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            <span>{sectionLabel}</span>
            <span className="text-line">/</span>
            <span>{t("common.article", "Article")}</span>
          </div>

          <h1 className="mt-4 text-balance font-display text-4xl leading-[0.98] tracking-[-0.05em] md:text-5xl">
            {page.title}
          </h1>

          {lead ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p> : null}

          {fallback ? (
            <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-gold-deep">
              {t("common.fallbackNotice", "This page is not translated yet. Showing the English version.")}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-3 text-[11px] text-muted">
            <span>
              {page.readingMinutes} {t("common.minRead", "min read")}
            </span>
            <span className="text-line">/</span>
            <span className="font-mono text-[10px]">/{locale === "en" ? "" : `${locale}/`}{page.path}</span>
            <div className="ml-auto flex items-center gap-1">
              <CopyLinkButton path={`${basePath}/${page.path}`} />
            </div>
          </div>

          <div className="mt-8">
            <Markdown markdown={markdown} pagePath={page.path} basePath={basePath} />
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <p className="eyebrow">{t("common.keepReading", "Keep reading")}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <PageCard key={item.path} page={item} basePath={basePath} readLabel={t("common.read", "Read")}
                      sectionLabel={t(`menuLabels.${item.section}`, item.section)} />
              ))}
            </div>
          </div>

          <nav className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
            {previous ? (
              <Link
                href={`${basePath}/${previous.path}`}
                className="group flex max-w-[48%] items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span className="truncate">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`${basePath}/${next.path}`}
                className="group flex max-w-[48%] items-center gap-2 text-right text-muted transition-colors hover:text-ink"
              >
                <span className="truncate">{next.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-4">
            <p className="eyebrow">{t("common.onThisPage", "On this page")}</p>
            {toc.length > 0 ? (
              <nav className="mt-3 space-y-1.5 border-l border-line pl-3">
                {toc.map((entry) => (
                  <a
                    key={`${entry.id}-${entry.text}`}
                    href={`#${entry.id}`}
                    className={
                      entry.level === 3
                        ? "block pl-2 text-[11px] leading-snug text-muted transition-colors hover:text-ink"
                        : "block text-xs leading-snug text-muted transition-colors hover:text-ink"
                    }
                  >
                    {entry.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="mt-3 text-xs text-muted">{t("common.noHeadings", "No section headings.")}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
