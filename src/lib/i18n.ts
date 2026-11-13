export const defaultLocale = "en" as const;

export const locales = [
  "en",
  "it",
  "fr",
  "es",
  "de",
  "pt",
  "ar",
  "fa",
  "zh",
  "hi",
  "ru",
  "ja",
  "ko",
  "tr",
  "uk",
  "sw",
  "yo",
  "ig",
  "ak",
  "ee",
  "id",
  "el",
] as const;

export type Locale = (typeof locales)[number];

export type LocaleMeta = {
  code: Locale;
  label: string;
  dir: "ltr" | "rtl";
  source: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { code: "en", label: "English", dir: "ltr", source: "en" },
  it: { code: "it", label: "Italiano", dir: "ltr", source: "it" },
  fr: { code: "fr", label: "Français", dir: "ltr", source: "fr" },
  es: { code: "es", label: "Español", dir: "ltr", source: "es" },
  de: { code: "de", label: "Deutsch", dir: "ltr", source: "de" },
  pt: { code: "pt", label: "Português", dir: "ltr", source: "pt" },
  ar: { code: "ar", label: "العربية", dir: "rtl", source: "ar" },
  fa: { code: "fa", label: "فارسی", dir: "rtl", source: "fa" },
  zh: { code: "zh", label: "中文", dir: "ltr", source: "zh" },
  hi: { code: "hi", label: "हिन्दी", dir: "ltr", source: "hi" },
  ru: { code: "ru", label: "Русский", dir: "ltr", source: "ru" },
  ja: { code: "ja", label: "日本語", dir: "ltr", source: "ja" },
  ko: { code: "ko", label: "한국어", dir: "ltr", source: "ko" },
  tr: { code: "tr", label: "Türkçe", dir: "ltr", source: "tr" },
  uk: { code: "uk", label: "Українська", dir: "ltr", source: "uk" },
  sw: { code: "sw", label: "Kiswahili", dir: "ltr", source: "sw" },
  yo: { code: "yo", label: "Yorùbá", dir: "ltr", source: "yo" },
  ig: { code: "ig", label: "Igbo", dir: "ltr", source: "ig" },
  ak: { code: "ak", label: "Akan", dir: "ltr", source: "ak" },
  ee: { code: "ee", label: "Eʋegbe", dir: "ltr", source: "ee" },
  id: { code: "id", label: "Indonesia", dir: "ltr", source: "id" },
  el: { code: "el", label: "Ελληνικά", dir: "ltr", source: "el" },
};

export const nonDefaultLocales = locales.filter((locale) => locale !== defaultLocale);

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localePath = (locale: Locale, path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

export const stripLocale = (
  pathname: string,
): { locale: Locale; path: string } => {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, path: rest ? `/${rest}` : "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
};

export const sourcePath = (locale: Locale, path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};
