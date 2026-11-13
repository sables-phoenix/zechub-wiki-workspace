import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const english = JSON.parse(await readFile(path.join(root, "src/messages/ui/en.json"), "utf8"));
await mkdir(path.join(root, "src/messages/ui"), { recursive: true });

const flatten = (value, prefix = "") => {
  const entries = [];
  for (const [key, child] of Object.entries(value)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      entries.push(...flatten(child, next));
    } else if (typeof child === "string") {
      entries.push([next, child]);
    }
  }
  return entries;
};

const setPath = (target, key, value) => {
  const parts = key.split(".");
  let cursor = target;
  for (const part of parts.slice(0, -1)) {
    if (!cursor[part] || typeof cursor[part] !== "object") cursor[part] = {};
    cursor = cursor[part];
  }
  cursor[parts.at(-1)] = value;
};

const translate = async (text, locale) => {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&dt=t&tl=" +
    locale +
    "&q=" +
    encodeURIComponent(text);
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      return data[0]
        .map((part) => part[0])
        .join("")
        .replace(/[\uD800-\uDFFF]/g, "\ufffd")
        .trim();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  return text;
};

const entries = flatten(english);
const batchSize = 24;

for (const locale of locales) {
  const values = new Map();
  for (let index = 0; index < entries.length; index += batchSize) {
    const batch = entries.slice(index, index + batchSize);
    const text = batch.map(([, value]) => value).join("\n");
    const translated = await translate(text, locale);
    const lines = translated.split("\n").map((line) => line.trim());
    if (lines.length === batch.length) {
      batch.forEach(([key], offset) => values.set(key, lines[offset]));
    } else {
      for (const [key, value] of batch) {
        values.set(key, await translate(value, locale));
      }
    }
  }

  const result = {};
  for (const [key, value] of entries) {
    setPath(result, key, values.get(key) ?? value);
  }
  await writeFile(path.join(root, `src/messages/ui/${locale}.json`), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`${locale}: ${entries.length} strings`);
}

console.log(`wrote ${locales.length} UI catalogs`);
