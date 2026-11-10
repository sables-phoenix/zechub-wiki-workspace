import type { ReactNode } from "react";

type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  meta?: ReactNode;
};

export function SectionHero({ eyebrow, title, description, actions, meta }: SectionHeroProps) {
  return (
    <div className="container-page pt-7">
      <section className="rounded-card border border-line bg-paper p-6 md:p-8">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-balance font-display text-4xl leading-[0.96] tracking-[-0.05em] md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
        {meta ? (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            {meta}
          </div>
        ) : null}
      </section>
    </div>
  );
}
