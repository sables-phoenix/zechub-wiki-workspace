import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: path === "/network" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...pages.map((page) => ({
      url: `${siteUrl}/${page.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.featured ? 0.8 : 0.6,
    })),
  ];
}
