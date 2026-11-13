import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import { TutorialsView } from "@/components/tutorials-view";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data/tutorials";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Practical hands-on tutorials and video guides for the Zcash ecosystem.",
};

export function TutorialsPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);

  return (
    <>
      <SectionHero
        eyebrow={t("tutorials.eyebrow", "ZecHub Learning Library")}
        title={t("tutorials.title", "Learn Zcash, one tutorial at a time.")}
        description={t(
          "tutorials.description",
          "Practical video guides for wallets, privacy, payments, development, and the wider Zcash ecosystem.",
        )}
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/zechub-tutorial" target="_blank" rel="noreferrer">
              {t("donate.originalPage", "Original page")}
            </a>
          </Button>
        }
        meta={
          <>
            <span>
              {tutorials.length} {t("tutorials.tutorials", "tutorials")}
            </span>
            <span>Source: zechub.wiki/zechub-tutorial</span>
          </>
        }
      />
      <TutorialsView />
    </>
  );
}

export default function TutorialsPage() {
  return <TutorialsPageContent locale={defaultLocale} />;
}
