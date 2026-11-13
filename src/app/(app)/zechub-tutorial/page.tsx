import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import { TutorialsView } from "@/components/tutorials-view";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data/tutorials";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Practical hands-on tutorials and video guides for the Zcash ecosystem.",
};

export default function TutorialsPage() {
  return (
    <>
      <SectionHero
        eyebrow="ZecHub Learning Library"
        title="Learn Zcash, one tutorial at a time."
        description="Practical video guides for wallets, privacy, payments, development, and the wider Zcash ecosystem."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/zechub-tutorial" target="_blank" rel="noreferrer">
              Original page
            </a>
          </Button>
        }
        meta={
          <>
            <span>{tutorials.length} tutorials</span>
            <span>Source: zechub.wiki/zechub-tutorial</span>
          </>
        }
      />
      <TutorialsView />
    </>
  );
}
