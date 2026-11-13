import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { I18nProvider } from "@/components/i18n-provider";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages.server";

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  const english = getMessages(defaultLocale);
  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages} english={english}>
      <DesktopShell>{children}</DesktopShell>
    </I18nProvider>
  );
}
