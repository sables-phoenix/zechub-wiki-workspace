import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "Privacy",
  description: "No analytics, no ad networks, no tracking cookies, no fingerprinting.",
};

const sections = [
  { titleKey: "privacy.s1", bodyKey: "privacy.s1b" },
  { titleKey: "privacy.s2", bodyKey: "privacy.s2b" },
  { titleKey: "privacy.s3", bodyKey: "privacy.s3b" },
  { titleKey: "privacy.s4", bodyKey: "privacy.s4b" },
  { titleKey: "privacy.s5", bodyKey: "privacy.s5b" },
  { titleKey: "privacy.s6", bodyKey: "privacy.s6b" },
] as const;

export function PrivacyPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);

  return (
    <>
      <SectionHero
        eyebrow={t("privacy.title", "Privacy")}
        title={t("privacy.title", "Privacy")}
        description={t("privacy.description", "No analytics, no ad networks, no tracking cookies, no fingerprinting.")}
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/privacy" target="_blank" rel="noreferrer">
              {t("privacy.original", "Original statement")}
            </a>
          </Button>
        }
        meta={<span>{t("privacy.source", "Source: zechub.wiki/privacy")}</span>}
      />

      <div className="container-page py-8 md:py-10">
        <div className="max-w-3xl space-y-8 rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
          <p className="text-base leading-relaxed text-muted">
            {t(
              "privacy.intro",
              "ZecHub is an open-source education hub for a privacy-preserving currency, so we hold the site itself to the same standard. This page describes, plainly, who can observe that you visited.",
            )}
          </p>
          {sections.map((section) => (
            <section key={section.titleKey}>
              <h2 className="text-2xl leading-tight tracking-[-0.04em]">
                {t(section.titleKey, section.titleKey)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(section.bodyKey, section.bodyKey)}
              </p>
            </section>
          ))}
          <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Read the source statement at{" "}
            <a
              href="https://zechub.wiki/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-gold-deep underline underline-offset-4"
            >
              zechub.wiki/privacy
            </a>
            .{" "}
            <Link href={localePath(locale, "/settings")} className="text-gold-deep underline underline-offset-4">
              {t("privacy.back", "Back to settings")}
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default function PrivacyPage() {
  return <PrivacyPageContent locale={defaultLocale} />;
}
