import type { AppId } from "@/lib/apps";
import type { Locale } from "@/lib/i18n";
import itIndex from "@/content/i18n/it.json";
import frIndex from "@/content/i18n/fr.json";
import esIndex from "@/content/i18n/es.json";
import deIndex from "@/content/i18n/de.json";
import ptIndex from "@/content/i18n/pt.json";
import arIndex from "@/content/i18n/ar.json";
import zhIndex from "@/content/i18n/zh.json";
import hiIndex from "@/content/i18n/hi.json";
import ruIndex from "@/content/i18n/ru.json";
import jaIndex from "@/content/i18n/ja.json";
import koIndex from "@/content/i18n/ko.json";
import trIndex from "@/content/i18n/tr.json";
import ukIndex from "@/content/i18n/uk.json";
import swIndex from "@/content/i18n/sw.json";
import yoIndex from "@/content/i18n/yo.json";
import igIndex from "@/content/i18n/ig.json";
import akIndex from "@/content/i18n/ak.json";
import eeIndex from "@/content/i18n/ee.json";
import idIndex from "@/content/i18n/id.json";
import elIndex from "@/content/i18n/el.json";

export type LocalizedPage = {
  path: string;
  title: string;
  description: string;
  section: string;
  app: AppId;
  readingMinutes: number;
  words: number;
  order: number;
  translated: boolean;
  sourceUrl: string;
  text: string;
};

const indexes: Record<Exclude<Locale, "en">, readonly LocalizedPage[]> = {
  it: itIndex as LocalizedPage[],
  fr: frIndex as LocalizedPage[],
  es: esIndex as LocalizedPage[],
  de: deIndex as LocalizedPage[],
  pt: ptIndex as LocalizedPage[],
  ar: arIndex as LocalizedPage[],
  zh: zhIndex as LocalizedPage[],
  hi: hiIndex as LocalizedPage[],
  ru: ruIndex as LocalizedPage[],
  ja: jaIndex as LocalizedPage[],
  ko: koIndex as LocalizedPage[],
  tr: trIndex as LocalizedPage[],
  uk: ukIndex as LocalizedPage[],
  sw: swIndex as LocalizedPage[],
  yo: yoIndex as LocalizedPage[],
  ig: igIndex as LocalizedPage[],
  ak: akIndex as LocalizedPage[],
  ee: eeIndex as LocalizedPage[],
  id: idIndex as LocalizedPage[],
  el: elIndex as LocalizedPage[],
};

export type LibraryPage = Pick<
  LocalizedPage,
  "path" | "title" | "description" | "section" | "app" | "readingMinutes" | "words" | "order"
>;

export const getLocalizedLibraryPages = (locale: Locale): readonly LibraryPage[] =>
  getLocalizedPages(locale).map(({ path, title, description, section, app, readingMinutes, words, order }) => ({
    path,
    title,
    description,
    section,
    app,
    readingMinutes,
    words,
    order,
  }));

export const getLocalizedPages = (locale: Locale): readonly LocalizedPage[] => {
  if (locale === "en") return [];
  return indexes[locale] ?? [];
};

export const getLocalizedPage = (locale: Locale, path: string): LocalizedPage | undefined => {
  if (locale === "en") return undefined;
  return getLocalizedPages(locale).find((page) => page.path === path);
};

export const localizedPagesForSection = (
  locale: Locale,
  section: string,
): readonly LocalizedPage[] => getLocalizedPages(locale).filter((page) => page.section === section);

export const searchLocalizedPages = (
  locale: Locale,
  query: string,
  limit = 24,
): readonly LocalizedPage[] => {
  const value = query.trim().toLowerCase();
  if (!value) return getLocalizedPages(locale).slice(0, limit);
  const terms = value.split(/\s+/).filter(Boolean);
  return getLocalizedPages(locale)
    .map((page) => {
      const title = page.title.toLowerCase();
      const description = page.description.toLowerCase();
      const text = page.text.toLowerCase();
      const score = terms.reduce((total, term) => {
        if (title.includes(term)) return total + 12;
        if (description.includes(term)) return total + 5;
        return total + (text.includes(term) ? 2 : 0);
      }, 0);
      return { page, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.page.order - b.page.order)
    .slice(0, limit)
    .map((item) => item.page);
};

export const localizedSiblings = (
  locale: Locale,
  page: LocalizedPage,
): readonly LocalizedPage[] =>
  getLocalizedPages(locale)
    .filter((item) => item.section === page.section)
    .sort((a, b) => a.order - b.order);

export const localizedAdjacent = (
  locale: Locale,
  page: LocalizedPage,
): { previous?: LocalizedPage; next?: LocalizedPage } => {
  const siblings = localizedSiblings(locale, page);
  const index = siblings.findIndex((item) => item.path === page.path);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
};

export const localizedRelated = (
  locale: Locale,
  page: LocalizedPage,
  limit = 4,
): readonly LocalizedPage[] => {
  const sameSection = getLocalizedPages(locale).filter(
    (item) => item.section === page.section && item.path !== page.path,
  );
  const sameApp = getLocalizedPages(locale).filter(
    (item) => item.app === page.app && item.section !== page.section && item.path !== page.path,
  );
  return [...sameSection, ...sameApp].slice(0, limit);
};

export const localizedSnippet = (page: LocalizedPage, query: string): string => {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const lower = page.text.toLowerCase();
  const positions = terms
    .map((term) => lower.indexOf(term))
    .filter((position) => position >= 0)
    .sort((a, b) => a - b);
  const first = positions[0];
  if (first === undefined) return page.description;
  const start = Math.max(0, first - 70);
  const end = Math.min(page.text.length, first + 180);
  return `${start > 0 ? "..." : ""}${page.text.slice(start, end)}${end < page.text.length ? "..." : ""}`;
};
