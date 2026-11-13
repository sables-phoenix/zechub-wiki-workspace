import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Official brand identity, logos, vector icons, color palettes, and media guidelines for Zcash and ZecHub.",
};

const base = "https://zechub.wiki";

const assets = [
  {
    name: "Zcash",
    copyKey: "brand.zcash",
    href: `${base}/downloads/brand/Zcash.zip`,
  },
  {
    name: "Wallets",
    copyKey: "brand.wallets",
    href: `${base}/downloads/brand/All_Wallets.zip`,
  },
  {
    name: "Zcash Brasil",
    copyKey: "brand.brasil",
    href: `${base}/downloads/brand/ZcashBrasil.zip`,
  },
  {
    name: "ZecHub",
    copyKey: "brand.zechub",
    href: `${base}/zecHub-visual-identity.pdf`,
    extra: { labelKey: "brand.visualIdentity", href: `${base}/visual-identity` },
  },
  {
    name: "ECC",
    copyKey: "brand.ecc",
    href: `${base}/downloads/brand/ECC.zip`,
  },
  {
    name: "Zcash en Español",
    copyKey: "brand.spanish",
    href: `${base}/downloads/brand/ZcashEspanol.zip`,
  },
  {
    name: "Zcash Ukraine",
    copyKey: "brand.ukraine",
    href: `${base}/_next/static/immutable/media/Zcash_Ukraine.1phrz5je8ktzu.jpg`,
  },
  {
    name: "Zcash Nigeria",
    copyKey: "brand.nigeria",
    href: `${base}/downloads/brand/ZcashNigeria.zip`,
  },
] as const;

export function BrandPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);

  return (
    <>
      <SectionHero
        eyebrow={t("brand.eyebrow", "Brand")}
        title={t("brand.title", "Brand")}
        description={t("brand.description", "Official brand identity, logos, vector icons, color palettes, and media guidelines for Zcash and ZecHub.")}
        actions={
          <Button asChild>
            <a href={`${base}/downloads/brand/Midia Kit Ecossistema Zcash.zip`} target="_blank" rel="noreferrer">
              {t("brand.kit", "Download the ecosystem kit")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {assets.map((asset) => (
            <article
              key={asset.name}
              className="flex h-full flex-col rounded-card border border-line bg-paper p-5 shadow-stamp"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-gold-deep">{t("brand.folder", "Brand folder")}</p>
              <h2 className="mt-4 font-display text-2xl leading-none tracking-[-0.04em]">{asset.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(asset.copyKey, asset.copyKey)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild variant="secondary" size="sm">
                  <a href={asset.href} target="_blank" rel="noreferrer">
                    {t("brand.download", "Download")}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Button>
                {"extra" in asset && asset.extra ? (
                  <a
                    href={asset.extra.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold-deep underline underline-offset-4"
                  >
                    {t(asset.extra.labelKey, asset.extra.labelKey)}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default function BrandPage() {
  return <BrandPageContent locale={defaultLocale} />;
}
