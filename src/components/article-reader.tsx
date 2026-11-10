import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CopyLinkButton } from "@/components/copy-link";
import { Markdown } from "@/components/markdown";
import { PageCard } from "@/components/page-card";
import { desktopApps } from "@/lib/apps";
import { pageSourceUrl, readPage } from "@/lib/content";
import {
  getAdjacentPages,
  getRelatedPages,
  getSiblingPages,
  sectionByLabel,
  type PageMeta,
} from "@/lib/pages";

type ArticleReaderProps = {
  page: PageMeta;
};

export function ArticleReader({ page }: ArticleReaderProps) {
  const { markdown, toc, lead } = readPage(page);
  const section = sectionByLabel.get(page.section);
  const app = desktopApps.find((item) => item.id === page.app);
  const siblings = getSiblingPages(page);
  const orderedSiblings = [page, ...siblings.filter((item) => item.path !== page.path)];
  const { previous, next } = getAdjacentPages(page);
  const related = getRelatedPages(page);
  const sectionHref = section?.href ?? "/library";

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
              {app?.label ?? page.section}
            </Link>
            <p className="eyebrow mt-6">{page.section}</p>
            <nav className="mt-2 max-h-[58vh] overflow-y-auto pr-2 window-scroll" aria-label={`${page.section} pages`}>
              {orderedSiblings.map((item) => (
                <Link
                  key={item.path}
                  href={`/${item.path}`}
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
            {page.section}
          </Link>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            <span>{page.section}</span>
            <span className="text-line">/</span>
            <span>Article</span>
          </div>

          <h1 className="mt-4 text-balance font-display text-4xl leading-[0.98] tracking-[-0.05em] md:text-5xl">
            {page.title}
          </h1>

          {lead ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p> : null}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-3 text-[11px] text-muted">
            <span>{page.readingMinutes} min read</span>
            <span className="text-line">/</span>
            <span className="font-mono text-[10px]">/{page.path}</span>
            <div className="ml-auto flex items-center gap-1">
              <CopyLinkButton path={`/${page.path}`} />
              <a
                href={pageSourceUrl(page)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-pill px-3 text-[11px] text-muted transition-colors hover:bg-paper-2 hover:text-ink"
              >
                Source
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-8">
            <Markdown markdown={markdown} pagePath={page.path} />
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <p className="eyebrow">Keep reading</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <PageCard key={item.path} page={item} />
              ))}
            </div>
          </div>

          <nav className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
            {previous ? (
              <Link
                href={`/${previous.path}`}
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
                href={`/${next.path}`}
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
            <p className="eyebrow">On this page</p>
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
              <p className="mt-3 text-xs text-muted">No section headings.</p>
            )}
            <div className="mt-6 rounded-card border border-line bg-paper-2 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">Source</p>
              <a
                href={pageSourceUrl(page)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                zechub.wiki/{page.path}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
