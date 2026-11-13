"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { tutorialCategories, tutorials } from "@/data/tutorials";

export function TutorialsView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return tutorials.filter((tutorial) => {
      if (category !== "All" && tutorial.category !== category) return false;
      if (!value) return true;
      return `${tutorial.title} ${tutorial.category}`.toLowerCase().includes(value);
    });
  }, [query, category]);

  return (
    <div className="container-page py-8 md:py-10">
      <div className="rounded-card border border-line bg-paper p-4 shadow-stamp md:p-5">
        <div className="relative">
          <MagnifierIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tutorials"
            className="h-11 pl-9"
            aria-label="Search tutorials"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tutorialCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "h-7 rounded-pill border px-3 text-[10px] transition-colors",
                category === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {results.length} {results.length === 1 ? "tutorial" : "tutorials"}
        </p>
        {query || category !== "All" ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            Clear
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {results.map((tutorial) => (
            <a
              key={tutorial.url}
              href={tutorial.url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-w-0 flex-col rounded-card border border-line bg-paper p-4 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">
                {tutorial.category}
              </p>
              <h2 className="mt-3 break-words font-display text-xl leading-tight tracking-[-0.03em]">
                {tutorial.title}
              </h2>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  Watch on YouTube
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-card border border-dashed border-line p-10 text-center">
          <p className="font-display text-2xl tracking-[-0.03em]">No tutorials match that search.</p>
          <p className="mt-2 text-sm text-muted">Try a broader search or a different category.</p>
        </div>
      )}
    </div>
  );
}
