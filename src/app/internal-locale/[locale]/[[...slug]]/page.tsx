import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import WalletsPage from "@/app/(app)/wallets/page";
import { NetworkPageContent } from "@/app/(app)/network/page";
import DonatePage from "@/app/(app)/donate/page";
import SettingsPage from "@/app/(app)/settings/page";
import { PrivacyPageContent } from "@/app/(app)/privacy/page";
import { DevelopersPageContent } from "@/app/(app)/developers/page";
import { VisualizerPageContent } from "@/app/(app)/visualizer/page";
import { HackathonPageContent } from "@/app/(app)/hackathon/page";
import { TutorialsPageContent } from "@/app/(app)/zechub-tutorial/page";
import { AmbassadorsPageContent } from "@/app/(app)/zcash-global-ambassadors/page";
import { MapPageContent } from "@/app/(app)/map/page";
import { BrandPageContent } from "@/app/(app)/zcash-organizations/brand/page";
import { HomeView } from "@/components/home-view";
import { LocalizedCollectionPage } from "@/components/localized-collection-page";
import { LocalizedLibraryView } from "@/components/localized-library-view";
import { LocalizedArticleView } from "@/components/localized-article-view";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { getPage } from "@/lib/pages";
import { readPage, processMarkdown } from "@/lib/content";
import { getLocalizedLibraryPages, getLocalizedPage, type LocalizedPage } from "@/lib/localized-pages";
import { getTranslator } from "@/lib/messages.server";

type LocalizedPageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

const appRoutes: Record<string, { title: string; description?: string }> = {
  "": { title: "ZecHub Wiki" },
  "start-here": { title: "shell.startHere" },
  wallets: { title: "wallets.title", description: "wallets.description" },
  "using-zcash": { title: "shell.usingZcash" },
  learn: { title: "shell.learn" },
  build: { title: "shell.build" },
  ecosystem: { title: "shell.ecosystem" },
  library: { title: "library.title", description: "library.description" },
  network: { title: "network.title", description: "network.description" },
  donate: { title: "donate.title", description: "donate.description" },
  contribute: { title: "shell.contribute" },
  settings: { title: "shell.settings" },
  privacy: { title: "shell.privacy" },
  developers: { title: "shell.developers" },
  visualizer: { title: "shell.visualizers" },
  hackathon: { title: "shell.hackathon" },
  "zechub-tutorial": { title: "tutorials.title", description: "tutorials.description" },
  "zcash-global-ambassadors": { title: "shell.ambassadors" },
  map: { title: "shell.merchantMap" },
  "zcash-organizations/brand": { title: "shell.brand" },
};

const renderAppRoute = (path: string, locale: Locale): ReactNode | null => {
  switch (path) {
    case "":
      return <HomeView locale={locale} />;
    case "start-here":
      return <LocalizedCollectionPage locale={locale} collection="start-here" />;
    case "wallets":
      return <WalletsPage />;
    case "using-zcash":
      return <LocalizedCollectionPage locale={locale} collection="using-zcash" />;
    case "learn":
      return <LocalizedCollectionPage locale={locale} collection="learn" />;
    case "build":
      return <LocalizedCollectionPage locale={locale} collection="build" />;
    case "ecosystem":
      return <LocalizedCollectionPage locale={locale} collection="ecosystem" />;
    case "library":
      return <LocalizedLibraryView pages={getLocalizedLibraryPages(locale)} />;
    case "network":
    case "dashboard":
      return <NetworkPageContent locale={locale} />;
    case "donate":
    case "donation":
      return <DonatePage />;
    case "contribute":
      return <LocalizedCollectionPage locale={locale} collection="contribute" />;
    case "settings":
      return <SettingsPage />;
    case "privacy":
      return <PrivacyPageContent locale={locale} />;
    case "developers":
      return <DevelopersPageContent locale={locale} />;
    case "visualizer":
      return <VisualizerPageContent locale={locale} />;
    case "hackathon":
      return <HackathonPageContent locale={locale} />;
    case "zechub-tutorial":
      return <TutorialsPageContent locale={locale} />;
    case "zcash-global-ambassadors":
      return <AmbassadorsPageContent locale={locale} />;
    case "map":
      return <MapPageContent locale={locale} />;
    case "zcash-organizations/brand":
      return <BrandPageContent locale={locale} />;
    default:
      return null;
  }
};

const resolvePath = (path: string): string => {
  if (path === "dashboard") return "network";
  if (path === "donation") return "donate";
  if (path === "sitemap") return "library";
  if (path === "dex") return "using-zcash/dex";
  if (path === "payment-processors") return "using-zcash/payment-processors";
  if (path === "using-zcash/blockchain-explorers") return "guides/blockchain-explorers";
  if (path === "zcash-organizations/zodl") return "zcash-organizations/ZODL";
  return path;
};

const getLocalizedContent = async (
  locale: Locale,
  page: LocalizedPage,
): Promise<{ markdown: string; toc: readonly { id: string; text: string; level: number }[]; lead: string | null; fallback: boolean }> => {
  if (page.translated) {
    try {
      const response = await fetch(`${page.sourceUrl}.md`, { next: { revalidate: 3600 } });
      if (response.ok) {
        const raw = await response.text();
        if (raw.startsWith("---")) {
          return { ...processMarkdown(raw), fallback: false };
        }
      }
    } catch {
      // fall through to the English mirror
    }
  }

  const english = getPage(page.path);
  if (english) {
    return { ...readPage(english), fallback: true };
  }
  return { markdown: page.text, toc: [], lead: page.description, fallback: true };
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const path = resolvePath(slug?.join("/") ?? "");
  const canonicalPath = path === "" ? "/" : `/${path}`;
  const languages = {
    ...Object.fromEntries(
      locales.map((item) => [item, `${siteUrl}${localePath(item, canonicalPath)}`]),
    ),
    "x-default": `${siteUrl}${canonicalPath}`,
  };
  const localized = getLocalizedPage(locale, path);
  if (localized) {
    return {
      title: localized.title,
      description: localized.description,
      alternates: { canonical: `${siteUrl}${localePath(locale, canonicalPath)}`, languages },
    };
  }
  const app = appRoutes[path];
  if (app) {
    const t = getTranslator(locale);
    return {
      title: path === "" ? { absolute: t(app.title, app.title) } : t(app.title, app.title),
      description: app.description ? t(app.description) : undefined,
      alternates: { canonical: `${siteUrl}${localePath(locale, canonicalPath)}`, languages },
    };
  }
  return { title: "404" };
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") notFound();
  const locale = rawLocale;
  const path = resolvePath(slug?.join("/") ?? "");

  const localized = getLocalizedPage(locale, path);
  if (localized) {
    const content = await getLocalizedContent(locale, localized);
    return (
      <LocalizedArticleView
        locale={locale}
        page={localized}
        markdown={content.markdown}
        toc={content.toc}
        lead={content.lead}
        fallback={content.fallback}
      />
    );
  }

  const app = renderAppRoute(path, locale);
  if (app) return app;

  notFound();
}
