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
- 38 wallets from the ZecHub wallet matrix, with device, pool, NU7, rating, beta, and deprecated state.
- Live ZEC price and chain metrics from the ZecHub APIs.
- Day, Night, and System themes.

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

Section roots such as `/zcash-tech`, `/guides`, `/zcash-community`, and `/privacy-tools` redirect to the matching app landing page. Article URLs stay close to the original zechub.wiki paths.

## Content pipeline

- `src/content/pages/*.md` contains the mirrored English markdown.
- `src/content/index.json` contains the page metadata used by the library, search, and article navigation.
- `src/lib/content.ts` reads a page, removes the GitHub edit badge, strips the duplicate H1, prefixes relative content images with `https://zechub.wiki`, builds the table of contents, and extracts a clean lead.
- `src/components/markdown.tsx` renders GFM tables and raw HTML, rewrites known zechub.wiki links to internal routes, and styles embeds.
- The 5 pages that do not expose markdown and the 4 special pages are handled as custom apps or source links.
- Content images and wallet logos are loaded from zechub.wiki. The app itself only hosts the brand assets.

## Data sources

- Pages and page metadata: `https://zechub.wiki/llms.txt` plus each page's `.md` endpoint.
- Wallets: `https://zechub.wiki/wallets`.
- Donation addresses: `https://zechub.wiki/donation`.
- Price: `https://zechub.wiki/api/prices/simple`.
- Chain metrics: `https://zechub.wiki/api/blockchain-data`.
- Network pages revalidate every five minutes. The menu bar price refreshes every five minutes.

## Validation

- 232 article pages and 13 app routes build statically.
- All key routes checked at 1440, 1024, 768, and 390.
- No horizontal overflow in the window scroller.
- Article markdown renders headings, lists, tables, images, YouTube embeds, and internal links.
- Wallet filters, Spotlight search, Launchpad navigation, Control Center themes, window controls, and the local clock are driven in the browser.
- Typecheck, lint, and production build pass.

## What is local only

- The content is a mirrored snapshot. It does not write back to zechub.wiki.
- The language menu links to the original editions. Only English is mirrored here.
- The wallet feature-level matrix is summarized. The source matrix has the full feature detail.
- The dashboard's full chart history is not exposed by the public summary API. The workspace shows the live headline metrics and links to the full dashboard.
- The donation page uses the v1 addresses captured from the source page. Always verify an address before sending funds.

## Credits

All wiki content, brand assets, and wallet data belong to ZecHub and the Zcash community. This is an independent redesign preview.

See `RECON.md` for the site recon, page inventory, design notes, and build plan.
