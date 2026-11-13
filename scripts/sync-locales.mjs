import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const locales = [
  "en",
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
const output = path.join(root, "src/messages/source");
await mkdir(output, { recursive: true });

const extractMessages = (html) => {
  const marker = '\\"messages\\":';
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) throw new Error("messages object not found");
  const start = html.indexOf("{", markerIndex + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;

  for (let index = start; index < html.length; index += 1) {
    const character = html[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (character === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        end = index + 1;
        break;
      }
    }
  }

  if (end === -1) throw new Error("messages object end not found");
  return JSON.parse(JSON.parse(`"${html.slice(start, end)}"`));
};

const fetchMessages = async (locale) => {
  const url = `https://zechub.wiki/${locale}/wallets`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return extractMessages(await response.text());
};

let next = 0;
const queue = [...locales];
const workers = Array.from({ length: 4 }, async () => {
  while (next < queue.length) {
    const locale = queue[next];
    next += 1;
    if (!locale) continue;
    const messages = await fetchMessages(locale);
    await writeFile(path.join(output, `${locale}.json`), `${JSON.stringify(messages, null, 2)}\n`);
    console.log(`${locale}: ${Object.keys(messages).length} groups`);
  }
});

await Promise.all(workers);
console.log(`wrote ${locales.length} locale dictionaries`);
