import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "src/content/index.json");
const pagesPath = path.join(root, "src/content/pages");
const index = JSON.parse(await readFile(indexPath, "utf8"));

const field = (frontmatter, name) => {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  if (!match?.[1]) return undefined;
  return match[1].trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
};

const wordCount = (markdown) => {
  const text = markdown
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
};

let updated = 0;
let skipped = 0;

for (const page of index) {
  const response = await fetch(`${page.url}.md`);
  if (!response.ok) {
    skipped += 1;
    continue;
  }
  const body = await response.text();
  const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (!frontmatter) {
    skipped += 1;
    continue;
  }

  const title = field(frontmatter, "title");
  const description = field(frontmatter, "description");
  const words = wordCount(body);
  if (title) page.title = title;
  if (description) page.description = description;
  if (words > 0) {
    page.words = words;
    page.readingMinutes = Math.max(1, Math.ceil(words / 220));
  }

  await writeFile(path.join(pagesPath, page.file), body);
  updated += 1;
  await new Promise((resolve) => setTimeout(resolve, 40));
}

await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`updated ${updated} pages, skipped ${skipped}`);
