import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { PageMeta } from "@/lib/pages";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

const contentDir = path.join(process.cwd(), "src", "content", "pages");

const stripInline = (value: string): string =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const parseFrontmatter = (raw: string): { body: string } => {
  if (!raw.startsWith("---")) return { body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { body: raw };
  return { body: raw.slice(end + 4).replace(/^\n+/, "") };
};

const removeEditBadge = (body: string): string =>
  body.replace(/<a\b[^>]*github\.com\/[^>]*zechub[^>]*>[\s\S]*?<\/a>/gi, "").replace(
    /<a\b[^>]*>[\s\S]*?img\.shields\.io[\s\S]*?<\/a>/gi,
    "",
  );

const removeFirstHeading = (body: string): string =>
  body.replace(/^#\s+.*(?:\r?\n|$)/m, "").replace(/^\s*\n+/, "");

const absoluteContentImages = (body: string): string =>
  body
    .replace(/(src|href)=["']\/content-images\//g, '$1="https://zechub.wiki/content-images/')
    .replace(/(src|href)=["']\/images\//g, '$1="https://zechub.wiki/images/')
    .replace(/<script\b[\s\S]*?<\/script>/gi, "");

const buildToc = (body: string): TocEntry[] => {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const marker = match[1];
    const heading = match[2];
    if (!marker || !heading) continue;
    const level = marker.length;
    const text = stripInline(heading);
    if (!text) continue;
    entries.push({ id: slugger.slug(text), text, level });
  }
  return entries;
};

const extractLead = (markdown: string): string | null => {
  for (const line of markdown.split("\n")) {
    const value = line.trim();
    if (!value) continue;
    if (
      value.startsWith("#") ||
      value.startsWith("|") ||
      value.startsWith("<") ||
      value.startsWith("---") ||
      value.startsWith("- ") ||
      value.startsWith("* ") ||
      value.startsWith(">") ||
      value.startsWith("![") ||
      /^\d+\.\s/.test(value)
    ) {
      continue;
    }
    const clean = stripInline(value);
    if (clean.length < 80) continue;
    const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [clean];
    return sentences.slice(0, 2).join(" ").replace(/\s+/g, " ").slice(0, 260).trim();
  }
  return null;
};

export const readPage = (
  page: PageMeta,
): { markdown: string; toc: readonly TocEntry[]; lead: string | null } => {
  const raw = fs.readFileSync(path.join(contentDir, page.file), "utf8");
  const { body } = parseFrontmatter(raw);
  const markdown = absoluteContentImages(removeFirstHeading(removeEditBadge(body)));
  return { markdown, toc: buildToc(markdown), lead: extractLead(markdown) };
};

export const pageSourceUrl = (page: PageMeta): string => `https://zechub.wiki/${page.path}`;
