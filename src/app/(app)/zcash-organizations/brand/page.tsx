import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Official brand identity, logos, vector icons, color palettes, and media guidelines for Zcash and ZecHub.",
};

const base = "https://zechub.wiki";

const assets = [
  {
    name: "Zcash",
    copy: "Zcash is a digital currency providing censorship resistant, secure and private payments.",
    href: `${base}/downloads/brand/Zcash.zip`,
  },
  {
    name: "Wallets",
    copy: "Brand assets for all Zcash shielded wallets.",
    href: `${base}/downloads/brand/All_Wallets.zip`,
  },
  {
    name: "Zcash Brasil",
    copy: "Brand assets for the Zcash Brazil ambassador program.",
    href: `${base}/downloads/brand/ZcashBrasil.zip`,
  },
  {
    name: "ZecHub",
    copy: "ZecHub is the community-driven education hub for the Zcash cryptocurrency (ZEC).",
    href: `${base}/zecHub-visual-identity.pdf`,
    extra: { label: "Visual identity", href: `${base}/visual-identity` },
  },
  {
    name: "ECC",
    copy: "Electric Coin Co. (ECC) created and launched the Zcash digital currency in 2016.",
    href: `${base}/downloads/brand/ECC.zip`,
  },
  {
    name: "Zcash en Español",
    copy: "Zcash en Español provides Spanish resources, news, guides, and community support for Zcash users.",
    href: `${base}/downloads/brand/ZcashEspanol.zip`,
  },
  {
    name: "Zcash Ukraine",
    copy: "A community-led hub bridging Zcash to Ukraine, with localized education and grassroots advocacy.",
    href: `${base}/_next/static/immutable/media/Zcash_Ukraine.1phrz5je8ktzu.jpg`,
  },
  {
    name: "Zcash Nigeria",
    copy: "Zcash Nigeria promotes financial privacy by educating and onboarding Nigerians to Zcash.",
    href: `${base}/downloads/brand/ZcashNigeria.zip`,
  },
] as const;

export default function BrandPage() {
  return (
    <>
      <SectionHero
        eyebrow="Brand"
        title="Brand"
        description="Official brand identity, logos, vector icons, color palettes, and media guidelines for Zcash and ZecHub."
        actions={
          <Button asChild>
            <a href={`${base}/downloads/brand/Midia Kit Ecossistema Zcash.zip`} target="_blank" rel="noreferrer">
              Download the ecosystem kit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={<span>Source: zechub.wiki/zcash-organizations/brand</span>}
      />

      <div className="container-page py-8 md:py-10">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {assets.map((asset) => (
            <article
              key={asset.name}
              className="flex h-full flex-col rounded-card border border-line bg-paper p-5 shadow-stamp"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-gold-deep">Brand folder</p>
              <h2 className="mt-4 font-display text-2xl leading-none tracking-[-0.04em]">{asset.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{asset.copy}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild variant="secondary" size="sm">
                  <a href={asset.href} target="_blank" rel="noreferrer">
                    Download
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
                    {asset.extra.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Downloads open on zechub.wiki. The ZecHub mark used in this workspace comes from the public brand
          folder.
        </p>
      </div>
    </>
  );
}
