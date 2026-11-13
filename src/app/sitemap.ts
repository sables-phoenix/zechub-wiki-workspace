import type { MetadataRoute } from "next";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { pages } from "@/lib/pages";
import { siteUrl } from "@/lib/site";

const appRoutes = [
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
  "/privacy",
  "/developers",
  "/visualizer",
  "/hackathon",
  "/zechub-tutorial",
  "/zcash-global-ambassadors",
  "/map",
  "/zcash-organizations/brand",
  "/zcash-organizations/zodl",
] as const;

const languagesFor = (path: string): Record<string, string> => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}${localePath(locale as Locale, path)}`]),
  ),
  "x-default": `${siteUrl}${path}`,
});

const entryFor = (
  locale: Locale,
  path: string,
  priority: number,
  changeFrequency: "daily" | "weekly",
): MetadataRoute.Sitemap[number] => ({
  url: `${siteUrl}${localePath(locale, path)}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
  alternates: { languages: languagesFor(path) },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of appRoutes) {
    for (const locale of locales) {
      entries.push(entryFor(locale, path, path === "/" ? 1 : 0.7, path === "/network" ? "daily" : "weekly"));
    }
  }

  for (const page of pages) {
    for (const locale of locales) {
      entries.push(entryFor(locale, `/${page.path}`, page.featured ? 0.8 : 0.6, "weekly"));
    }
  }

  return entries;
}
