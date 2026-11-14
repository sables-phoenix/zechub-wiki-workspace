"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, Monitor } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import { rememberLocale } from "@/lib/locale-cookie";
import { GithubMark } from "@/components/github-mark";
import { useTheme } from "next-themes";
import { MoonIcon } from "@/components/animated-icons/moon-icon";
import { SunIcon } from "@/components/animated-icons/sun-icon";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { activeWallets } from "@/lib/wallets";
import { cn } from "@/lib/utils";

const languages = [
  { code: "", label: "English", native: "English" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "fr", label: "French", native: "Français" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "fa", label: "Persian", native: "فارسی" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "sw", label: "Swahili", native: "Kiswahili" },
  { code: "yo", label: "Yoruba", native: "Yorùbá" },
  { code: "ig", label: "Igbo", native: "Igbo" },
  { code: "ak", label: "Akan", native: "Akan" },
  { code: "ee", label: "Ewe", native: "Eʋegbe" },
  { code: "id", label: "Indonesian", native: "Indonesia" },
  { code: "el", label: "Greek", native: "Ελληνικά" },
] as const;

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const { path } = stripLocale(pathname);
  const mounted = useMounted();

  const options = [
    { value: "light", label: t("shell.paper", "Paper"), icon: SunIcon },
    { value: "dark", label: t("shell.vault", "Vault"), icon: MoonIcon },
    { value: "system", label: t("shell.system", "System"), icon: Monitor },
  ] as const;

  return (
    <>
      <SectionHero
        eyebrow={t("shell.settings", "Settings")}
        title={t("shell.settings", "Settings")}
        description={t("settings.description", "Theme, language, and data settings for the workspace.")}
        actions={
          <Button asChild variant="secondary">
            <a href="https://github.com/ZecHub/zechub" target="_blank" rel="noreferrer">
              <GithubMark className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        }
        meta={
          <>
            <span>{t("settings.pages", "237 pages")}</span>
            <span>{activeWallets.length} {t("wallets.activeWallets", "active wallets")}</span>
            <span>{t("settings.languageCount", "21 languages")}</span>
          </>
        }
      />

      <div className="container-page grid gap-6 py-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6">
          <p className="eyebrow">{t("settings.appearance", "Appearance")}</p>
          <h2 className="mt-1 text-2xl leading-none tracking-[-0.04em]">{t("shell.theme", "Theme")}</h2>
          <div className="mt-4 grid gap-2">
            {options.map((option) => {
              const Icon = option.icon;
              const selected = mounted && theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "flex items-center justify-between rounded-card border px-4 py-3 text-left transition-colors",
                    selected
                      ? "border-gold bg-gold/10"
                      : "border-line bg-paper hover:border-ink/30 hover:bg-paper-2",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} className="h-4 w-4 text-muted" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </span>
                  {selected ? <Check className="h-4 w-4 text-gold-deep" /> : null}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            {t("settings.themeCopy", "Paper gives you paper windows. Vault keeps the whole desk dark. System follows your device.")}
          </p>
        </section>

        <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">{t("settings.languages", "Languages")}</p>
              <h2 className="mt-1 text-2xl leading-none tracking-[-0.04em]">{t("settings.languages", "Languages")}</h2>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {languages.map((language) => (
              <button
                key={language.code || "en"}
                type="button"
                onClick={() => {
                  const next = language.code || "en";
                  rememberLocale(next);
                  router.push(localePath(next as Locale, path));
                }}
                className="rounded-lg border border-line bg-paper px-3 py-2 text-left transition-colors hover:border-ink/30 hover:bg-paper-2"
              >
                <span className="block text-sm">{language.native}</span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                  {language.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6 lg:col-span-2">
          <p className="eyebrow">{t("settings.data", "Data & source")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-paper-2 p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{t("settings.content", "Content")}</p>
              </div>
            <div className="rounded-card border border-line bg-paper-2 p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{t("shell.wallets", "Wallets")}</p>
              <p className="mt-2 text-sm">{activeWallets.length} {t("settings.walletCopy", "wallets from the ZecHub wallet matrix")}</p>
            </div>
            <div className="rounded-card border border-line bg-paper-2 p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{t("shell.network", "Network")}</p>
              <p className="mt-2 text-sm">{t("settings.networkCopy", "Live ZEC price and chain data from the ZecHub API")}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <a href="https://zechub.wiki" target="_blank" rel="noreferrer">
                {t("shell.openZechub", "Open zechub.wiki")}
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="https://github.com/ZecHub/zechub" target="_blank" rel="noreferrer">
                <GithubMark className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="https://zechub.wiki/privacy" target="_blank" rel="noreferrer">
                {t("shell.privacy", "Privacy")}
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
