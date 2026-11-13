import type { ReactNode } from "react";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { I18nProvider } from "@/components/i18n-provider";
import { defaultLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages.server";

export default function AppLayout({ children }: { children: ReactNode }) {
  const english = getMessages(defaultLocale);
  return (
    <I18nProvider locale={defaultLocale} messages={english} english={english}>
      <DesktopShell>{children}</DesktopShell>
    </I18nProvider>
  );
}
