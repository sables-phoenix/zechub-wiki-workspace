import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const locales = [
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
];

const root = path.resolve(import.meta.dirname, "..");
const indexDir = path.join(root, "src/content/i18n");

const plain = (markdown) => {
  let text = markdown.replace(/^---[\s\S]*?---\s*/, "");
  text = text.replace(/```[\s\S]*?```/g, " ");
  text = text.replace(/<[^>]+>/g, " ");
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^>\s?/gm, "");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  text = text.replace(/\|/g, " ");
  text = text.replace(/[*_`~]/g, "");
  return text.replace(/\s+/g, " ").trim().slice(0, 4000);
};

const field = (frontmatter, name) => {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  if (!match?.[1]) return undefined;
  return match[1].trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
};

for (const locale of locales) {
  const file = path.join(indexDir, `${locale}.json`);
  const pages = JSON.parse(await readFile(file, "utf8"));
  let updated = 0;
  for (const page of pages) {
    if (page.translated) continue;
    const response = await fetch(`${page.sourceUrl}.md`);
    if (!response.ok) continue;
    const body = await response.text();
    if (!body.startsWith("---")) continue;
    const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    const title = field(frontmatter, "title");
    const description = field(frontmatter, "description");
    if (title) page.title = title;
    if (description) page.description = description;
    page.text = plain(body) || page.text;
    page.translated = true;
    updated += 1;
  }
  await writeFile(file, `${JSON.stringify(pages, null, 2)}\n`);
  console.log(`${locale}: repaired ${updated}; fallback ${pages.filter((page) => !page.translated).length}`);
}
