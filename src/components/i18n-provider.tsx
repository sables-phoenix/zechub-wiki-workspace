"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { createTranslator, type Messages, type Translator } from "@/lib/messages";
import { localeMeta, type Locale } from "@/lib/i18n";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Translator;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  english,
  children,
}: {
  locale: Locale;
  messages: Messages;
  english: Messages;
  children: ReactNode;
}) {
  const dir = localeMeta[locale].dir;
  const t = useMemo(
    () => createTranslator(messages, english, locale !== "en"),
    [messages, english, locale],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    root.dataset.locale = locale;
  }, [locale, dir]);

  const value = useMemo(() => ({ locale, dir, t }), [locale, dir, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
