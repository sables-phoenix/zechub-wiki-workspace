import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { hackathonProjects } from "@/data/hackathon";

export const metadata: Metadata = {
  title: "ZecHub Hackathon",
  description:
    "The 2026 ZecHub Hackathon has ended. Explore the submitted projects and see what the community built.",
};

const tracks = [
  {
    name: "Infrastructure",
    copy: "Nodes, indexers, RPC tooling, and reliability for builders and operators.",
  },
  {
    name: "Games",
    copy: "Interactive experiences and game loops where Zcash is part of the fun.",
  },
  {
    name: "FROST",
    copy: "Threshold signing, custody patterns, and safer key management on Zcash.",
  },
  {
    name: "Zcash Login",
    copy: "Auth and identity flows that use Zcash primitives for sign-in or access.",
  },
  {
    name: "Accounting",
    copy: "Reporting, reconciliation, and workflows for teams handling ZEC.",
  },
] as const;

const rules = [
  "Projects must interact with the Zcash network in a meaningful way.",
  "Teams can submit only one final project per team.",
  "All submissions must include clear setup and usage documentation.",
  "Use open-source licensing whenever possible to encourage collaboration.",
  "Respect privacy, security, and community guidelines in both code and content.",
] as const;

export default function HackathonPage() {
  return (
    <>
      <SectionHero
        eyebrow="2026 event"
        title="ZecHub Hackathon"
        description="The 2026 ZecHub Hackathon has ended. Explore the submitted projects and see what the community built."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/hackathon" target="_blank" rel="noreferrer">
              Original archive
            </a>
          </Button>
        }
        meta={
          <>
            <span>{hackathonProjects.length} public project links</span>
            <span>25 ZEC prize pool</span>
            <span>Source: zechub.wiki/hackathon</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:py-10">
        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-card border border-line bg-paper p-5 shadow-stamp md:col-span-1">
            <p className="eyebrow">Event</p>
            <h2 className="mt-2 text-3xl leading-none tracking-[-0.04em]">25 ZEC</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Community prize pool. Community voting ended July 24, 2026 at 12:00 UTC.
            </p>
          </div>
          <div className="rounded-card border border-line bg-paper p-5 shadow-stamp md:col-span-2">
            <p className="eyebrow">Tracks</p>
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
          <p className="eyebrow">Rules</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Keep it fair and easy to judge.</h2>
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
              <p className="eyebrow">Event archive</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Hackathon submissions</h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {hackathonProjects.length} projects
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
                    View on GitHub
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            The original archive lists 36 projects. This page captures the {hackathonProjects.length}{" "}
            public GitHub links. The original page has the full list.
          </p>
        </section>
      </div>
    </>
  );
}
