import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { getLocalizedPages } from "@/lib/localized-pages";
import { getTranslator } from "@/lib/messages.server";

type CollectionKey = "start-here" | "learn" | "build" | "ecosystem" | "using-zcash" | "contribute";

const configs: Record<
  CollectionKey,
  {
    banner: string;
    titleKey?: string;
    descriptionKey?: string;
    sections: readonly string[];
    fallbackTitle: string;
    fallbackDescription: string;
    primary?: { label: string; path: string };
    secondary?: { label: string; path: string };
  }
> = {
  "start-here": {
    banner: "start-here",
    sections: ["Start Here"],
    fallbackTitle: "Start Here",
    fallbackDescription: "Start your journey with Zcash. Essential guides, core concepts, and introductory resources for beginners.",
    primary: { label: "collection.openGuide", path: "start-here/new-user-guide" },
    secondary: { label: "collection.pickWallet", path: "wallets" },
  },
  learn: {
    banner: "zcash-tech",
    sections: ["Zcash Tech", "Zero to Zero Knowledge", "Glossary & FAQs"],
    fallbackTitle: "Zcash Tech",
    fallbackDescription: "Technical specifications, cryptography, zero-knowledge proofs (zk-SNARKs), and protocol architecture of Zcash.",
    primary: { label: "collection.startZk", path: "zcash-tech/zk-snarks" },
    secondary: { label: "collection.zeroToZero", path: "zero-to-zero-knowledge/zero-to-zero-knowledge" },
  },
  build: {
    banner: "guides",
    sections: ["Guides", "Research", "Tutorials"],
    fallbackTitle: "Guides",
    fallbackDescription: "Step-by-step guides and technical walkthroughs for setting up nodes, mining, integrations, and tools on Zcash.",
    primary: { label: "collection.usePrivately", path: "guides/using-zec-privately" },
    secondary: { label: "collection.runNode", path: "guides/raspberry-pi-4-full-node" },
  },
  ecosystem: {
    banner: "organizations",
    sections: ["Organizations", "Ecosystem", "ZFAV Club"],
    fallbackTitle: "Zcash Community",
    fallbackDescription: "Community initiatives, grants, global ambassadors, and grassroots projects supporting Zcash.",
    primary: { label: "collection.communityLinks", path: "zcash-community/community-links" },
    secondary: { label: "collection.organizations", path: "zcash-organizations/ZODL" },
  },
  "using-zcash": {
    banner: "using-zcash",
    titleKey: "navigation.usingZcash.label",
    descriptionKey: "collection.usingDescription",
    sections: ["Use Zcash", "Use Cases", "Privacy Tools"],
    fallbackTitle: "Using Zcash",
    fallbackDescription: "Learn how to use Zcash for private digital payments, explore wallets, exchanges, and shielded transactions.",
    primary: { label: "collection.buyingZec", path: "using-zcash/buying-zec" },
    secondary: { label: "collection.walletMatrix", path: "wallets" },
  },
  contribute: {
    banner: "contribute",
    sections: ["Contribute"],
    fallbackTitle: "Contribute",
    fallbackDescription: "If you're a member of the Zcash community, and want to contribute to building ZecHub, there are a few things that are super helpful.",
    primary: { label: "collection.contributingGuide", path: "contribute/contributing-guide" },
  },
};

export function LocalizedCollectionPage({
  locale,
  collection,
}: {
  locale: Locale;
  collection: CollectionKey;
}) {
  const t = getTranslator(locale);
  const config = configs[collection];
  const pages = getLocalizedPages(locale).filter((page) => config.sections.includes(page.section));
  const basePath = locale === "en" ? "" : `/${locale}`;
  const title = config.titleKey
    ? t(config.titleKey, config.fallbackTitle)
    : t(`sectionBanners.${config.banner}.title`, config.fallbackTitle);
  const description = config.descriptionKey
    ? t(config.descriptionKey, config.fallbackDescription)
    : t(`sectionBanners.${config.banner}.sub`, config.fallbackDescription);
  const primary = config.primary
    ? { label: t(config.primary.label, config.primary.label), href: localePath(locale, `/${config.primary.path}`) }
    : null;
  const secondary = config.secondary
    ? { label: t(config.secondary.label, config.secondary.label), href: localePath(locale, `/${config.secondary.path}`) }
    : null;

  return (
    <>
      <SectionHero
        eyebrow={title}
        title={title}
        description={description}
        actions={
          <>
            {primary ? (
              <Button asChild>
                <Link href={primary.href}>{primary.label}</Link>
              </Button>
            ) : null}
            {secondary ? (
              <Button asChild variant="secondary">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
            {collection === "contribute" ? (
              <Button asChild variant="secondary">
                <a href="https://github.com/ZecHub/zechub" target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            ) : null}
          </>
        }
        meta={
          <>
            <span>
              {pages.length} {t("library.pages", "pages")}
            </span>
            <span>
              {config.sections.length} {t("library.sections", "sections")}
            </span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:space-y-12 md:py-10">
        {config.sections.map((section) => {
          const sectionPages = pages.filter((page) => page.section === section);
          if (sectionPages.length === 0) return null;
          return (
            <section key={section}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">{t("library.section", "Section")}</p>
                  <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">
                    {t(`menuLabels.${section}`, section)}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {t(`sectionBanners.${section}.sub`, "")}
                  </p>
                </div>
                <Link
                  href={localePath(locale, "/library")}
                  className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block"
                >
                  {t("common.fullLibrary", "Full library")}
                </Link>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {sectionPages.map((page) => (
                  <PageCard
                    key={page.path}
                    page={page}
                    basePath={basePath}
                    readLabel={t("common.read", "Read")}
                    sectionLabel={t(`menuLabels.${section}`, section)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
