import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import { TutorialsView } from "@/components/tutorials-view";
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
        meta={
          <>
            <span>
              {tutorials.length} {t("tutorials.tutorials", "tutorials")}
            </span>
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
