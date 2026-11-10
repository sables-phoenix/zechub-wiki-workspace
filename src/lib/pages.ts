import index from "@/content/index.json";
import type { AppId } from "@/lib/apps";

export type PageMeta = {
  path: string;
  url: string;
  file: string;
  title: string;
  description: string;
  section: string;
  app: AppId;
  readingMinutes: number;
  words: number;
  order: number;
  featured: boolean;
};

export const pages = index as readonly PageMeta[];

export const pageByPath = new Map(pages.map((page) => [page.path, page]));

export type SectionMeta = {
  id: string;
  label: string;
  app: AppId;
  href: string;
  description: string;
  order: number;
};

export const sections: readonly SectionMeta[] = [
  {
    id: "Start Here",
    label: "Start Here",
    app: "start",
    href: "/start-here",
    description: "The shortest path from curious to confident.",
    order: 1,
  },
  {
    id: "Use Zcash",
    label: "Using Zcash",
    app: "use",
    href: "/using-zcash",
    description: "Buy, receive, send, and shield ZEC.",
    order: 2,
  },
  {
    id: "Use Cases",
    label: "Use Cases",
    app: "use",
    href: "/using-zcash",
    description: "Real work, real privacy, real people.",
    order: 3,
  },
  {
    id: "Privacy Tools",
    label: "Privacy Tools",
    app: "use",
    href: "/using-zcash",
    description: "The tools around the transaction.",
    order: 4,
  },
  {
    id: "Zcash Tech",
    label: "Zcash Tech",
    app: "learn",
    href: "/zcash-tech",
    description: "The protocol, the proofs, and the pools.",
    order: 5,
  },
  {
    id: "Zero to Zero Knowledge",
    label: "Zero to Zero Knowledge",
    app: "learn",
    href: "/zero-to-zero-knowledge",
    description: "A short series on the ideas behind private cash.",
    order: 6,
  },
  {
    id: "Glossary & FAQs",
    label: "Glossary & FAQs",
    app: "learn",
    href: "/glossary-and-faqs",
    description: "Definitions, common questions, and straight answers.",
    order: 7,
  },
  {
    id: "Guides",
    label: "Guides",
    app: "build",
    href: "/guides",
    description: "Step-by-step builds for nodes, payments, and privacy.",
    order: 8,
  },
  {
    id: "Research",
    label: "Research",
    app: "build",
    href: "/research",
    description: "Long-form work on privacy, proofs, and protocol design.",
    order: 9,
  },
  {
    id: "Tutorials",
    label: "Tutorials",
    app: "build",
    href: "/build",
    description: "Workshops and practical walkthroughs.",
    order: 10,
  },
  {
    id: "Ecosystem",
    label: "Ecosystem",
    app: "ecosystem",
    href: "/ecosystem",
    description: "Communities, projects, media, and events.",
    order: 11,
  },
  {
    id: "Organizations",
    label: "Organizations",
    app: "ecosystem",
    href: "/zcash-organizations",
    description: "The teams that build, fund, and steward Zcash.",
    order: 12,
  },
  {
    id: "ZFAV Club",
    label: "ZFAV Club",
    app: "ecosystem",
    href: "/ecosystem",
    description: "Guides for creators, broadcasters, and archivists.",
    order: 13,
  },
  {
    id: "Contribute",
    label: "Contribute",
    app: "contribute",
    href: "/contribute",
    description: "Write, review, design, translate, or fund the wiki.",
    order: 14,
  },
  {
    id: "Archive",
    label: "Archive",
    app: "library",
    href: "/library",
    description: "Older material kept for reference.",
    order: 15,
  },
  {
    id: "Wiki",
    label: "Wiki",
    app: "library",
    href: "/library",
    description: "Additional pages.",
    order: 16,
  },
];

export const sectionByLabel = new Map(sections.map((section) => [section.id, section]));

export const sectionOrder = new Map(sections.map((section) => [section.id, section.order]));

export const appRoutes = new Set([
  "/",
  "/start-here",
  "/wallets",
  "/using-zcash",
  "/learn",
  "/build",
  "/ecosystem",
  "/library",
  "/network",
  "/donate",
  "/contribute",
  "/settings",
  "/zcash-tech",
  "/zero-to-zero-knowledge",
  "/glossary-and-faqs",
  "/guides",
  "/research",
  "/tutorials",
  "/zcash-community",
  "/zcash-organizations",
  "/zfav-club",
  "/privacy-tools",
  "/zcash-use-cases",
]);

export const knownPaths = new Set<string>([...appRoutes, ...pages.map((page) => `/${page.path}`)]);

export const featuredPages: readonly PageMeta[] = pages.filter((page) => page.featured);

export const pagesForSection = (section: string): readonly PageMeta[] =>
  pages.filter((page) => page.section === section);

export const pagesForApp = (app: AppId): readonly PageMeta[] =>
  pages.filter((page) => page.app === app);

export const sectionCount = (section: string): number =>
  pages.filter((page) => page.section === section).length;

export const getPage = (path: string): PageMeta | undefined =>
  pageByPath.get(path.replace(/^\/+|\/+$/g, ""));

export const getSiblingPages = (page: PageMeta): readonly PageMeta[] =>
  pages
    .filter((item) => item.section === page.section)
    .slice()
    .sort((a, b) => a.order - b.order);

export const getAdjacentPages = (
  page: PageMeta,
): { previous: PageMeta | undefined; next: PageMeta | undefined } => {
  const siblings = getSiblingPages(page);
  const index = siblings.findIndex((item) => item.path === page.path);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
};

export const getRelatedPages = (page: PageMeta, limit = 4): readonly PageMeta[] => {
  const sameSection = pages.filter((item) => item.section === page.section && item.path !== page.path);
  const sameApp = pages.filter(
    (item) => item.app === page.app && item.section !== page.section && item.path !== page.path,
  );
  return [...sameSection, ...sameApp].slice(0, limit);
};

export const searchPages = (query: string, limit = 24): readonly PageMeta[] => {
  const value = query.trim().toLowerCase();
  if (!value) return pages.slice(0, limit);
  const terms = value.split(/\s+/).filter(Boolean);
  return pages
    .map((page) => {
      const haystack = `${page.title} ${page.description} ${page.section}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { page, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.page.order - b.page.order)
    .slice(0, limit)
    .map((item) => item.page);
};
