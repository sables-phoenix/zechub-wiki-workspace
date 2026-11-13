import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const locales = [
  "it",
  "fr",
  "es",
  "de",
  "pt",
  "ar",
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
const outputDir = path.join(root, "src/content/i18n");
await mkdir(outputDir, { recursive: true });

const englishIndex = JSON.parse(await readFile(path.join(root, "src/content/index.json"), "utf8"));

const field = (frontmatter, name) => {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  if (!match?.[1]) return undefined;
  return match[1].trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
};

const safe = (value) =>
  Array.from(value, (character) => {
    const code = character.codePointAt(0) ?? 0;
    return code >= 0xd800 && code <= 0xdfff ? "\ufffd" : character;
  }).join("");

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

const englishText = new Map();
for (const page of englishIndex) {
  const markdown = await readFile(path.join(root, "src/content/pages", page.file), "utf8");
  englishText.set(page.path, plain(markdown).slice(0, 4000));
}

const fetchPage = async (locale, page) => {
  const url = `https://zechub.wiki/${locale}/${page.path}.md`;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status === 404) return { translated: false };
      if (!response.ok) throw new Error(`${response.status}`);
      const body = await response.text();
      const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
      if (!frontmatter) return { translated: false };
      const title = field(frontmatter, "title");
      const description = field(frontmatter, "description");
      const words = plain(body).split(/\s+/).filter(Boolean).length;
      return {
        translated: Boolean(title && description),
        title: title ? safe(title) : title,
        description: description ? safe(description) : description,
        words,
        text: safe(plain(body)).slice(0, 4000),
      };
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
    }
  }
  return { translated: false };
};

let completed = 0;
const total = locales.length * englishIndex.length;

for (const locale of locales) {
  const pages = [];
  let next = 0;

  const workers = Array.from({ length: 8 }, async () => {
    while (next < englishIndex.length) {
      const page = englishIndex[next];
      next += 1;
      if (!page) continue;
      const result = await fetchPage(locale, page);
      const fallbackText = englishText.get(page.path) ?? "";
      const title = safe(result.title ?? page.title);
      const description = safe(result.description ?? page.description);
      const words = result.words ?? page.words;
      pages.push({
        path: page.path,
        title,
        description,
        section: page.section,
        app: page.app,
        readingMinutes: Math.max(1, Math.ceil(words / 220)),
        words,
        order: page.order,
        translated: result.translated,
        sourceUrl: `https://zechub.wiki/${locale}/${page.path}`,
        text: result.text ?? fallbackText,
      });
      completed += 1;
      if (completed % 500 === 0) console.log(`${completed}/${total}`);
    }
  });

  await Promise.all(workers);
  pages.sort((a, b) => a.order - b.order);
  await writeFile(path.join(outputDir, `${locale}.json`), `${JSON.stringify(pages, null, 2)}\n`);
  console.log(`${locale}: ${pages.length} pages, ${pages.filter((page) => page.translated).length} translated`);
}

console.log(`wrote ${locales.length} localized indexes`);
