import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "src/content/index.json");
const pagesDir = path.join(root, "src/content/pages");
const index = JSON.parse(await readFile(indexPath, "utf8"));

const additions = [
  { path: "zcash-use-cases/donate-zec-and-claim-a-us-tax-deduction", section: "Use Cases", app: "use" },
  { path: "zcash-use-cases/run-a-zec-fundraising-campaign", section: "Use Cases", app: "use" },
  { path: "guides/akash-network-zakura", section: "Guides", app: "build" },
  { path: "guides/thus-spoke-zakura-akash", section: "Guides", app: "build" },
  { path: "guides/zcash-js", section: "Guides", app: "build" },
];

const field = (frontmatter, name) => {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  if (!match?.[1]) return undefined;
  return match[1].trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
};

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
  return text.replace(/\s+/g, " ").trim();
};

let order = Math.max(...index.map((page) => page.order)) + 1;

for (const addition of additions) {
  if (index.some((page) => page.path === addition.path)) continue;
  const response = await fetch(`https://zechub.wiki/${addition.path}.md`);
  if (!response.ok) throw new Error(`${addition.path} returned ${response.status}`);
  const body = await response.text();
  const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (!frontmatter) throw new Error(`${addition.path} has no frontmatter`);
  const file = `${addition.path.replaceAll("/", "__")}.md`;
  await writeFile(path.join(pagesDir, file), body);
  const text = plain(body);
  const words = text.split(/\s+/).filter(Boolean).length;
  index.push({
    path: addition.path,
    url: `https://zechub.wiki/${addition.path}`,
    file,
    title: field(frontmatter, "title") ?? addition.path,
    description: field(frontmatter, "description") ?? "",
    section: addition.section,
    app: addition.app,
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
    words,
    order,
    featured: false,
  });
  order += 1;
}

await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`index now has ${index.length} pages`);
