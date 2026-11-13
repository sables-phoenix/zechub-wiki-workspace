import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Zcash Merchant & Global Map",
  description: "Find physical merchants, retail stores, and services that accept Zcash (ZEC) payments globally.",
};

const brands = [
  "Banco Agricola",
  "Barnes And Noble",
  "Baskin Robbins",
  "Co Co Bubble Tea",
  "Famous Footwear",
  "Fresh",
  "Game Stop",
  "International Shoppes",
  "Kiehls",
  "London Jewelers",
  "Luxury Beauty Store",
  "Mikimoto",
  "Nordstrom",
  "Nordstrom Rack",
  "Regal",
  "Sheetz",
  "The Coffee Bean",
  "Ulta Beauty",
] as const;

export default function MapPage() {
  return (
    <>
      <SectionHero
        eyebrow="Flexa store locator"
        title="Pay with ZEC in-store"
        description="Find physical merchants, retail stores, and services that accept Zcash (ZEC) payments globally."
        actions={
          <>
            <Button asChild>
              <a href="https://zecmap.com" target="_blank" rel="noreferrer">
                Open Zec Map
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://zechub.wiki/map" target="_blank" rel="noreferrer">
                Original page
              </a>
            </Button>
          </>
        }
        meta={
          <>
            <span>287 locations</span>
            <span>Dominican Republic, Mexico, United States</span>
            <span>Source: zechub.wiki/map</span>
          </>
        }
      />

      <div className="container-page grid gap-4 py-8 md:py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-card border border-line bg-paper p-6 shadow-stamp">
          <p className="eyebrow">In-store</p>
          <h2 className="mt-2 font-display text-3xl leading-none tracking-[-0.04em]">287 locations</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Locations across the Dominican Republic, Mexico, and the United States accept ZEC via Flexa.
            The full map is interactive and lives on zechub.wiki and zecmap.com.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <span
                key={brand}
                className="rounded-lg border border-line bg-paper-2 px-3 py-2 text-xs text-muted"
              >
                {brand}
              </span>
            ))}
          </div>
        </section>

        <aside className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Map</p>
          <h2 className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">Find a store</h2>
          <p className="mt-3 text-sm leading-relaxed text-vault-muted">
            The interactive map, filters, and current location list are on Zec Map. This workspace keeps the
            summary and the launch link.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="https://zecmap.com" target="_blank" rel="noreferrer">
              Open Zec Map
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </aside>
      </div>
    </>
  );
}
