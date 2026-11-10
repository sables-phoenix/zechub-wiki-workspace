# ZecHub Wiki recon

Date: 2026-11-10
Target: https://zechub.wiki

## What the site is

ZecHub Wiki is a Next.js content site on Vercel. It is the community education hub for Zcash.

- 232 English content pages in the curated `llms.txt` index.
- About 237,000 words of English content.
- 19 languages. English is canonical.
- Every content page has a raw markdown endpoint. Append `.md` to the path.
- `llms.txt` is a clean page index. `llms-full.txt` is the concatenated English corpus.
- The site exposes live data at `/api/blockchain-data` and `/api/prices/simple`.
- The wallets page is a filterable matrix of 38 wallets, not a markdown page.
- The dashboard is a live metrics page with network, governance, ZCG, YouTube, and Code Pulse tabs.
- The donation page has chain-specific addresses.
- The sitemap is a complete page directory.

## Navigation

Top bar: Use Zcash, Ecosystem, Guides, Organizations, More, Bounties, Dashboard, English, Donate.

Footer groups: Start Here, Tutorials, Using Zcash, Guides, Zcash Tech, Zero to Zero Knowledge, Zcash Organizations, Zcash Community, ZKAV Club, Privacy Tools, Research, Glossary and FAQs, Contribute, Shop, Sitemap, Privacy.

## Page inventory

| Section | Pages |
| --- | ---: |
| Start Here | 12 |
| Use Zcash | 29 |
| Use Cases | 12 |
| Privacy Tools | 12 |
| Zcash Tech | 41 |
| Zero to Zero Knowledge | 14 |
| Glossary and FAQs | 4 |
| Guides | 37 |
| Research | 21 |
| Tutorials | 2 |
| Ecosystem | 16 |
| Organizations | 13 |
| ZFAV Club | 10 |
| Contribute | 6 |
| Archive | 3 |
| Wiki | 0 |
| Total | 232 |

Five indexed pages do not expose markdown: `/developers`, `/dex`, `/payment-processors`, `/using-zcash/blockchain-explorers`, `/zcash-organizations/brand`.

Four top-level pages are custom apps, not markdown: `/wallets`, `/dashboard`, `/donation`, `/sitemap`.

## Design system

- Background: `#070a13`.
- Foreground: `#cff`.
- Primary token: `#0ff`.
- Accent token: `#9947eb`.
- Muted: `#1b2232`.
- Border: `#20283c`.
- Card: `#272c35`.
- Body and headings: Inter.
- Mono: Geist Mono.
- Rounded cards, blue action buttons, yellow Zcash shield.
- Brand assets: `hero-dark.png`, `hero-white.png`, `zechubLogo-white.png`, `ZecHubBlue.png`.
- The 3D wordmark is the strongest brand asset. It appears as a large hero band on the home page.

## Current UX issues

- Every article lives inside a dense docs shell with a long section sidebar and a second page header. The content is good, but the shell is heavy.
- The home page is a long marketing scroll. The best content is several clicks away.
- The wallets page is powerful but visually dense. Filters and cards compete with the site chrome.
- The dashboard is separated from the content. There is no sense of a single workspace.
- The 19-language surface is a dropdown, not a reading experience.
- There is no persistent local navigation, no reading progress, no saved place, no command palette, and no cross-content search.
- The article pages have no table of contents that follows the reader.
- The raw markdown is excellent. The presentation is the opportunity.

## Workspace concept

Working name: **ZecHub Field Guide**.

A Mac-style desktop workspace for the wiki. The desktop is a dark navy library. The windows are cool paper reading surfaces. The brand accent is Zcash yellow. Cyan and blue are secondary, used for links and live data.

- Menu bar: wiki menus, search, live ZEC price, language, control center, local clock.
- Dock: Home, Start Here, Wallets, Use Zcash, Learn, Build, Ecosystem, Library, Launchpad.
- Windows: each route becomes a window. Traffic lights minimize, close, and maximize.
- Launchpad: every app and a page directory.
- Spotlight: command search across all 232 pages.
- Control Center: Day, Night, System, language, data source, source link.
- Desktop wallpaper: 3D ZecHub wordmark, live clock, ZEC price, shielded share, Resume reading.
- Article reader: section sidebar, readable body, table of contents, source link, previous and next.
- Wallets: real 38-wallet matrix with device, pool, NU7, search, and sort.
- Network: live price, market cap, circulation, shielded value, blocks, 24h transactions.
- Donate: real Zcash address with copy.
- Contribute: real contribution paths and pages.
- Settings: theme, language links, reading preferences, source.

## Page map

| App | Routes |
| --- | --- |
| Home | `/` |
| Start Here | `/start-here`, `/start-here/[slug]` |
| Wallets | `/wallets` |
| Use Zcash | `/using-zcash`, `/using-zcash/[slug]`, `/zcash-use-cases/[slug]`, `/privacy-tools/[slug]` |
| Learn | `/learn`, `/zcash-tech/[slug]`, `/zero-to-zero-knowledge/[slug]`, `/glossary-and-faqs/[slug]` |
| Build | `/build`, `/guides/[slug]`, `/research/[...slug]`, `/tutorials/[...slug]` |
| Ecosystem | `/ecosystem`, `/zcash-community/[...slug]`, `/zcash-organizations/[slug]`, `/zfav-club/[...slug]` |
| Library | `/library` |
| Network | `/network` |
| Donate | `/donate` |
| Contribute | `/contribute`, `/contribute/[slug]` |
| Settings | `/settings` |

Article URLs stay identical to zechub.wiki wherever possible.

## Content strategy

- Mirror all 232 English markdown pages.
- Keep the original path for every article so links and citations survive.
- Render markdown with GFM tables and raw HTML support.
- Prefix relative content images with `https://zechub.wiki`.
- Remove the GitHub edit badge from the reading surface.
- Keep the original source link on every article.
- The 5 pages without markdown and the 4 special pages are custom apps or source links.
- English only in the workspace. The Settings app links to all 19 language editions on zechub.wiki.

## Build order

1. Scaffold the new repo and the design tokens.
2. Desktop shell, menu bar, dock, window frame, wallpaper, clock.
3. Home, Start Here, Use, Learn, Build, Ecosystem, Library.
4. Article reader and markdown pipeline.
5. Wallets matrix.
6. Network, Donate, Contribute, Settings.
7. Spotlight, Launchpad, Control Center.
8. Responsive pass at 1440, 1024, 768, 390.
9. Build, typecheck, lint, deploy to a new Vercel project.

## Validation

- Every route returns 200.
- No horizontal overflow at 1440 and 390.
- Article markdown renders tables, images, iframes, and links.
- Wallet filters return the expected cards.
- Search returns page results and navigates.
- Window minimize, close, maximize, and reopen work.
- Theme switching works across windows and articles.
- The clock is local to the viewer.
- The live ZEC price and network data load.
- The mobile window is one full-screen page with a bottom dock.

## Risks

- Content images are hotlinked from zechub.wiki. They can change.
- The dashboard's full chart history is not exposed by the public summary API. The workspace shows the live headline metrics and links to the full dashboard.
- Wallet feature-level data is collapsed on the source page. The workspace includes device, pool, NU7, rating, beta, and deprecated state, then links to the source matrix for details.
- Some markdown pages use custom HTML. The renderer needs a raw HTML pass and tolerant styling.
- The 19-language editions are linked, not mirrored.

## Screenshots

- `home-1440.png`
- `wallets.png`
- `start-here.png`
- `zk-snarks.png`
- `buying-zec.png`
- `using-zec-privately.png`
- `dashboard-loaded.png`
- `donation.png`
- `sitemap.png`
- `community-links.png`
- `organizations.png`
- `faq.png`
- `z2z.png`
