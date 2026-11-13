import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const index = JSON.parse(await readFile(path.join(root, "src/content/index.json"), "utf8"));

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
  text = text.replace(/&[a-z]+;/gi, " ");
  return text.replace(/\s+/g, " ").trim();
};

const documents = [];
for (const page of index) {
  const markdown = await readFile(path.join(root, "src/content/pages", page.file), "utf8");
  documents.push({
    path: page.path,
    title: page.title,
    description: page.description,
    section: page.section,
    app: page.app,
    readingMinutes: page.readingMinutes,
    order: page.order,
    text: plain(markdown),
  });
}

await writeFile(
  path.join(root, "src/content/search-index.json"),
  `${JSON.stringify(documents)}\n`,
);
console.log(`wrote ${documents.length} documents`);
