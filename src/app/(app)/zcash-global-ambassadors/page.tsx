import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { ambassadors } from "@/data/ambassadors";

export const metadata: Metadata = {
  title: "Zcash Global Ambassadors",
  description:
    "Meet the global ambassadors promoting Zcash adoption, organizing local meetups, and translating educational resources worldwide.",
};

export default function AmbassadorsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Global network"
        title="Zcash Ambassador Globe"
        description="Meet the global ambassadors promoting Zcash adoption, organizing local meetups, and translating educational resources worldwide."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/zcash-global-ambassadors" target="_blank" rel="noreferrer">
              Original page
            </a>
          </Button>
        }
        meta={
          <>
            <span>{ambassadors.length} public cards</span>
            <span>15 active communities</span>
            <span>Source: zechub.wiki/zcash-global-ambassadors</span>
          </>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {ambassadors.map((ambassador) => (
            <article
              key={ambassador.name}
              className="flex h-full flex-col rounded-card border border-line bg-paper p-5 shadow-stamp"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 min-w-8 items-center justify-center rounded-md border border-line bg-paper-2 px-2 font-mono text-[10px] tracking-[0.08em] text-muted">
                  {ambassador.flag}
                </span>
                <h2 className="font-display text-xl leading-tight tracking-[-0.03em]">{ambassador.name}</h2>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{ambassador.description}</p>
              <a
                href={ambassador.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs text-gold-deep underline decoration-line underline-offset-4 hover:decoration-gold-deep"
              >
                Follow on X/BS
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          The original page adds a globe view and regional filters for all 15 communities. The cards here
          cover the public ambassador links.
        </p>
      </div>
    </>
  );
}
