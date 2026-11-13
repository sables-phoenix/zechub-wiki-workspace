import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { hackathonProjects } from "@/data/hackathon";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "ZecHub Hackathon",
  description:
    "The 2026 ZecHub Hackathon has ended. Explore the submitted projects and see what the community built.",
};

const trackKeys = [
  { nameKey: "hackathon.t1", copyKey: "hackathon.t1c" },
  { nameKey: "hackathon.t2", copyKey: "hackathon.t2c" },
  { nameKey: "hackathon.t3", copyKey: "hackathon.t3c" },
  { nameKey: "hackathon.t4", copyKey: "hackathon.t4c" },
  { nameKey: "hackathon.t5", copyKey: "hackathon.t5c" },
] as const;

const ruleKeys = ["hackathon.r1", "hackathon.r2", "hackathon.r3", "hackathon.r4", "hackathon.r5"] as const;



export function HackathonPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);
  const tracks = trackKeys.map((track) => ({ name: t(track.nameKey, track.nameKey), copy: t(track.copyKey, track.copyKey) }));
  const rules = ruleKeys.map((rule) => t(rule, rule));

  return (
    <>
      <SectionHero
        eyebrow={t("hackathon.eyebrow", "2026 event")}
        title={t("hackathon.title", "ZecHub Hackathon")}
        description={t("hackathon.description", "The 2026 ZecHub Hackathon has ended. Explore the submitted projects and see what the community built.")}
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/hackathon" target="_blank" rel="noreferrer">
              {t("hackathon.original", "Original archive")}
            </a>
          </Button>
        }
        meta={
          <>
            <span>{hackathonProjects.length} {t("hackathon.publicLinks", "public project links")}</span>
            <span>{t("hackathon.prizePool", "25 ZEC prize pool")}</span>
            <span>{t("hackathon.source", "Source: zechub.wiki/hackathon")}</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:py-10">
        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-card border border-line bg-paper p-5 shadow-stamp md:col-span-1">
            <p className="eyebrow">{t("hackathon.event", "Event")}</p>
            <h2 className="mt-2 text-3xl leading-none tracking-[-0.04em]">{t("hackathon.prize", "25 ZEC")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("hackathon.prizeCopy", "Community prize pool. Community voting ended July 24, 2026 at 12:00 UTC.")}
            </p>
          </div>
          <div className="rounded-card border border-line bg-paper p-5 shadow-stamp md:col-span-2">
            <p className="eyebrow">{t("hackathon.tracks", "Tracks")}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {tracks.map((track) => (
                <div key={track.name}>
                  <p className="text-sm font-medium">{track.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{track.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="eyebrow">{t("hackathon.rules", "Rules")}</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("hackathon.rulesTitle", "Keep it fair and easy to judge.")}</h2>
          <ol className="mt-4 grid gap-2 md:grid-cols-2">
            {rules.map((rule, index) => (
              <li
                key={rule}
                className="flex gap-3 rounded-card border border-line bg-paper p-4 text-sm leading-relaxed text-muted shadow-stamp"
              >
                <span className="font-mono text-[10px] text-gold-deep">0{index + 1}</span>
                {rule}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t("hackathon.archive", "Event archive")}</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("hackathon.submissions", "Hackathon submissions")}</h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {hackathonProjects.length} {t("hackathon.projects", "projects")}
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {hackathonProjects.map((project) => (
              <a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-card border border-line bg-paper p-4 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <h3 className="break-words font-display text-xl leading-tight tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-2 truncate font-mono text-[9px] text-muted">{project.path}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {t("hackathon.github", "View on GitHub")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            {t("hackathon.note", "The original archive lists 36 projects. This page captures the public GitHub links. The original page has the full list.")}
          </p>
        </section>
      </div>
    </>
  );
}

export default function HackathonPage() {
  return <HackathonPageContent locale={defaultLocale} />;
}
