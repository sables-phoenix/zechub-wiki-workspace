# ZecHub Wiki workspace

A desktop workspace front end for [zechub.wiki](https://zechub.wiki), built as a separate project from the ZEC Bounties redesign.

Live preview: **https://zechub-wiki-workspace.vercel.app**

Repository: **https://github.com/sables-phoenix/zechub-wiki-workspace**

## What it is

ZecHub Wiki is a large, community-maintained Zcash education site. This project turns it into a single calm workspace:

- Menu bar, dock, windows, Launchpad, Spotlight, Control Center, and a local clock.
- Eight primary apps: Home, Start Here, Wallets, Using Zcash, Learn, Build, Ecosystem, Library.
- Network, Donate, Contribute, and Settings as supporting apps.
- 232 English wiki pages mirrored from the site's public markdown endpoints.
- 20 internal language editions (Italian through Greek) with localized routes, content indexes, UI catalogs, search, and RTL Arabic.
- 41 wallet entries from the ZecHub wallet matrix, 38 active and 3 deprecated, with device, pool, operating system, wallet support, feature, NU7, rating, beta, and deprecated state.
- Full-text search over the mirrored pages.
- Live ZEC price and chain metrics from the ZecHub APIs, plus the dashboard tabs.
- Donation addresses for v0 and v1 with per-chain QR codes.
- Paper, Vault, and System themes, using the same palette and fonts as the ZEC Bounties workspace.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Checks:

```bash
npm run typecheck
npm run lint
```

## Apps and routes

| App | Routes |
| --- | --- |
| Home | `/` |
| Start Here | `/start-here`, `/start-here/[slug]` |
| Wallets | `/wallets` |
| Using Zcash | `/using-zcash`, `/using-zcash/[slug]`, `/zcash-use-cases/[slug]`, `/privacy-tools/[slug]` |
| Learn | `/learn`, `/zcash-tech/[slug]`, `/zero-to-zero-knowledge/[slug]`, `/glossary-and-faqs/[slug]` |
| Build | `/build`, `/guides/[slug]`, `/research/[...slug]`, `/tutorials/[...slug]` |
| Ecosystem | `/ecosystem`, `/zcash-community/[...slug]`, `/zcash-organizations/[slug]`, `/zfav-club/[...slug]` |
| Library | `/library` |
| Network | `/network` |
| Donate | `/donate` |
| Contribute | `/contribute`, `/contribute/[slug]` |
| Settings | `/settings` |
| Special pages | `/privacy`, `/developers`, `/visualizer`, `/hackathon`, `/zechub-tutorial`, `/zcash-global-ambassadors`, `/map`, `/zcash-organizations/brand`, `/zcash-organizations/zodl` |

Section roots such as `/zcash-tech`, `/guides`, `/zcash-community`, and `/privacy-tools` redirect to the matching app landing page. Article URLs stay close to the original zechub.wiki paths.

## Languages

- The selector switches the current page inside the workspace. It never sends the reader to zechub.wiki.
- English stays at `/`. Every other locale uses `/{locale}/...`, for example `/es/wallets` and `/fr/zcash-tech/zk-snarks`.
- `src/messages/source/{locale}.json` contains the source site's own UI dictionary. `src/messages/ui/{locale}.json` contains the workspace shell catalog.
- `src/content/i18n/{locale}.json` contains localized page metadata and search text. Article bodies are fetched from the source markdown and cached for an hour.
- A page without a localized source falls back to the English mirror with a visible notice.
- Arabic sets `dir="rtl"` and script-specific font fallbacks are in `globals.css`.

## Content pipeline

- `src/content/pages/*.md` contains the mirrored English markdown.
- `src/content/i18n/*.json` contains the localized page indexes used by localized article routes, cards, and search.
- `src/content/index.json` contains the page metadata used by the library, search, and article navigation.
- `src/content/search-index.json` contains the English full-text index used by `/api/search`.
- The localized search API uses the localized indexes and returns localized snippets.
- `src/lib/content.ts` reads a page, removes the GitHub edit badge, strips the duplicate H1, prefixes relative content images with `https://zechub.wiki`, builds the table of contents, and extracts a clean lead.
- `src/components/markdown.tsx` renders GFM tables and raw HTML, rewrites known zechub.wiki links to internal routes, and styles embeds.
- Pages that do not expose markdown are handled as custom app pages: Privacy, Developers, Brand, Visualizer, Hackathon, Tutorials, Ambassadors, and the Merchant Map.
- Content images and wallet logos are loaded from zechub.wiki. The app itself only hosts the brand assets.

## Data sources

- Pages and page metadata: `https://zechub.wiki/llms.txt` plus each page's `.md` endpoint.
- Wallets: `https://zechub.wiki/wallets`, including the `allWallets` payload and the live card data.
- Donation addresses: `https://zechub.wiki/donation`, v0 and v1.
- Price: `https://zechub.wiki/api/prices/simple`.
- Chain metrics: `https://zechub.wiki/api/blockchain-data`.
- Network pages revalidate every five minutes. The menu bar price refreshes every five minutes.

Refresh the local data:

```bash
npm run sync:wallets
npm run sync:content
npm run search:index
npm run sync:locales
npm run sync:localized
npm run translate:ui
```

## Validation

- 232 article pages and the app and special routes build statically. The sitemap contains 253 URLs.
- All key routes checked at 1440 and 390.
- No horizontal overflow in the window scroller.
- Article markdown renders headings, lists, tables, images, YouTube embeds, and internal links.
- Wallet filters cover device, pool, operating system, wallet support, feature, and NU7, with a per-card detail panel.
- Spotlight performs full-text search through `/api/search`, including body-only terms such as `3417100`.
- Launchpad, Library, menus, language links, Control Center, window controls, and the local clock are driven in the browser.
- Donation QR codes render for all v0 and v1 addresses.
- Sitemap, robots, hreflang alternates, and the Open Graph image are generated.
- Typecheck, lint, and production build pass.

## What is local only

- The English content is a mirrored snapshot. Localized article bodies are fetched from the source markdown and cached; they do not write back to zechub.wiki.
- The language menu is internal. It keeps the current page and changes the route locale; zechub.wiki is only used as a content source and for explicit source links.
- The wallet feature matrix is captured from the live `allWallets` payload. Ratings are preserved as a snapshot and new entries can show no rating until they are updated.
- The dashboard's full historical chart data, year filters, testnet switch, and PNG export stay on zechub.wiki. The workspace shows the live headline metrics, the supply split, the shielded pool snapshot, and tabs that open the source dashboards.
- The visualizer, merchant map, and full hackathon archive include launch links to the interactive source. Their workspace pages are directories, not reimplementations.
- A few source pages do not have a localized markdown file. Those pages show the English mirror with a notice.
- The donation page uses the v0 and v1 addresses captured from the source page, with QR codes that encode the plain address. Always verify an address before sending funds.

## Credits

All wiki content, brand assets, and wallet data belong to ZecHub and the Zcash community. This is an independent redesign preview.

See `RECON.md` for the site recon, page inventory, design notes, and build plan.
