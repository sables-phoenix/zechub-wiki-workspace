import { readFile, writeFile } from "node:fs/promises";

const source = "https://zechub.wiki/wallets";
const dataPath = new URL("../src/data/wallets.json", import.meta.url);

const existing = JSON.parse(await readFile(dataPath, "utf8"));
const byName = new Map(existing.map((wallet) => [wallet.name, wallet]));

const response = await fetch(source);
if (!response.ok) throw new Error(`wallets page returned ${response.status}`);
const html = await response.text();

const marker = '\\"allWallets\\":';
const markerIndex = html.indexOf(marker);
if (markerIndex === -1) throw new Error("allWallets array not found");

const start = html.indexOf("[", markerIndex);
if (start === -1) throw new Error("allWallets array start not found");

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
  if (character === "[") depth += 1;
  if (character === "]") {
    depth -= 1;
    if (depth === 0) {
      end = index + 1;
      break;
    }
  }
}

if (end === -1) throw new Error("allWallets array end not found");

const raw = html.slice(start, end);
const unescaped = JSON.parse(`"${raw}"`);
const wallets = JSON.parse(unescaped);

const merged = wallets.map((wallet) => {
  const previous = byName.get(wallet.title);
  const imageUrl = wallet.imageUrl
    ? `https://zechub.wiki${wallet.imageUrl.startsWith("/") ? "" : "/"}${wallet.imageUrl}`
    : null;

  return {
    name: wallet.title,
    href: wallet.url ?? previous?.href ?? null,
    image: imageUrl,
    nu7: wallet.nu7 ? `NU7: ${wallet.nu7}` : "",
    rating: previous?.rating ?? null,
    devices: wallet.devices ?? [],
    pools: wallet.pools ?? [],
    beta: wallet.stage === "Beta",
    deprecated: wallet.status === "Deprecated",
    note: wallet.statusReason || previous?.note || null,
    operatingSystem: wallet.operatingSystem ?? [],
    walletSupport: wallet.walletSupport ?? [],
    features: wallet.features ?? [],
  };
});

await writeFile(dataPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`wrote ${merged.length} wallets`);
