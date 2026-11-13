import searchIndex from "@/content/search-index.json";
import { isLocale } from "@/lib/i18n";
import { localizedSnippet, searchLocalizedPages } from "@/lib/localized-pages";

type SearchDocument = {
  path: string;
  title: string;
  description: string;
  section: string;
  app: string;
  readingMinutes: number;
  order: number;
  text: string;
};

type SearchHit = Omit<SearchDocument, "text"> & {
  snippet: string;
};

const documents = searchIndex as SearchDocument[];

const snippetFor = (text: string, terms: readonly string[]): string => {
  const lower = text.toLowerCase();
  const positions = terms
    .map((term) => lower.indexOf(term))
    .filter((position) => position >= 0)
    .sort((a, b) => a - b);
  const first = positions[0];
  if (first === undefined) return text.slice(0, 180);
  const start = Math.max(0, first - 70);
  const end = Math.min(text.length, first + 180);
  return `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`;
};

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const locale = url.searchParams.get("locale") ?? "en";
  if (!query) return Response.json({ results: [] satisfies SearchHit[] });

  if (isLocale(locale) && locale !== "en") {
    const results = searchLocalizedPages(locale, query, 24).map((page) => ({
      path: page.path,
      title: page.title,
      description: page.description,
      section: page.section,
      app: page.app,
      readingMinutes: page.readingMinutes,
      order: page.order,
      snippet: localizedSnippet(page, query),
    }));
    return Response.json({ results });
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = documents
    .map((document) => {
      const title = document.title.toLowerCase();
      const description = document.description.toLowerCase();
      const text = document.text.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 12;
        if (description.includes(term)) score += 5;
        if (document.section.toLowerCase().includes(term)) score += 2;
        const occurrences = text.split(term).length - 1;
        score += Math.min(occurrences, 12);
      }
      return { document, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.document.order - b.document.order)
    .slice(0, 24)
    .map(({ document }) => {
      const { text, ...rest } = document;
      return { ...rest, snippet: snippetFor(text, terms) };
    });

  return Response.json({ results });
}
