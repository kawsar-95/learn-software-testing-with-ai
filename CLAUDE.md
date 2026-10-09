# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static educational site that teaches QA engineers and SDETs how to use Claude AI for software testing. The owner is [kawsar-95](https://github.com/kawsar-95).

| Part | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styles | Tailwind CSS 4 and the design tokens in `app/globals.css` |
| Content | MDX through `@next/mdx`, with `remark-gfm`, `rehype-slug` and `@shikijs/rehype` (theme `github-dark-dimmed`, at build time) |
| Search | MiniSearch in the browser, with a static index at `/search-index.json` |
| Output | Static export in `out/`. There is no backend. |

The design (the editorial shell, the tokens, the fonts) comes from the owner's reference site, [github.com/kawsar-95/All-Necessary-Topics-Related-to-AI-Engineering](https://github.com/kawsar-95/All-Necessary-Topics-Related-to-AI-Engineering).

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # static export to out/
python3 -m http.server 8000 -d out   # preview the built site at http://localhost:8000
npm test         # node --test on tests/*.test.ts
```

`npm test` runs the `.ts` test files without a compile step. Node runs TypeScript natively from 22.18 on, so `package.json` sets `engines.node` to `>=22.18.0`.

`next start` does not work with a static export. Use the `http.server` command to preview `out/`.

`next.config.ts` sets `output: 'export'`, `trailingSlash: true` and `images.unoptimized`. The MDX plugins are given by name (strings), because Turbopack passes their options to Rust and they must be serializable.

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` deploys every push to `main` to https://kawsar-95.github.io/learn-software-testing-with-ai/. It runs `npm ci`, `npm test`, and `npm run build` with two env vars from `actions/configure-pages`:

- `PAGES_BASE_PATH` (`/learn-software-testing-with-ai`): `next.config.ts` uses it as `basePath` and exposes it as `NEXT_PUBLIC_BASE_PATH`. Local builds leave it empty and serve from `/`.
- `NEXT_PUBLIC_SITE_URL`: canonical URLs, Open Graph URLs, sitemap, and robots.

Base-path rule: `next/link`, `router.push`, and the metadata add the base path. Plain `fetch()` and plain `<a>` do not. So `SearchPalette` prefixes `NEXT_PUBLIC_BASE_PATH` to its fetch, and `mdx-components.tsx` renders MDX links that start with `/` through `next/link`. Write internal links as `/group/page/`, never with the repo name.

To preview the Pages build locally: `PAGES_BASE_PATH=/learn-software-testing-with-ai npm run build`, copy `out/` to `<dir>/learn-software-testing-with-ai/`, and run `python3 -m http.server 8000 -d <dir>`. The Python check scripts expect a root build (no base path).

## Structure

| Path | Content |
|---|---|
| `app/layout.tsx` | Fonts, the theme init script, the metadata, optional Google Analytics |
| `app/globals.css` | Design tokens (both themes), Tailwind, the MDX element styles (`.mdx`, `.code-block`, `.mdx-table`, `details`) |
| `app/(site)/layout.tsx` | The site shell (`SiteShell`) and the search dialog |
| `app/(site)/page.tsx` | The home page (`components/pages/HomePage.tsx`): the START HERE strip, then the contents by group with a part count per group and a tagline per page |
| `app/(site)/[group]/[page]/page.tsx` | Loads `content/<group>/<page>.mdx`. Static params come from `lib/nav.ts`. It renders the meta line for `<PageMeta />`, the Sources list from `page.sources`, the reading progress bar, and the back-to-top button. |
| `app/search-index.json/route.ts` | The static search index: one doc per page intro and one per `##` section |
| `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx` | Sitemap, robots, 404 page |
| `app/manifest.ts`, `app/sw.js/route.ts` | The PWA: `/manifest.webmanifest` and the service worker `/sw.js`, both from `lib/pwa.ts` |
| `app/icon.svg`, `app/apple-icon.png`, `public/icons/` | The favicon, the iOS home-screen icon, and the manifest icons (192 px, 512 px, maskable 512 px) |
| `components/layout/` | `SiteShell`, `SiteHeader`, `Sidebar`, `SidebarList`, `MobileNav`, `ThemeToggle`, `RegisterServiceWorker` |
| `components/navigation/` | `SectionNav` ("On this page"), `SearchPalette` (Ctrl/Cmd+K) |
| `components/content/` | `PageHeader` (the `PART 05 · CONFIGURE` eyebrow), `MetaLine` (the meta line), `Sources`, `ReadingProgress`, `BackToTop`, `PrevNext`, `CopyButton` |
| `components/mdx/` | `Callout`, `CardGrid`, `InfoCard`, `Cite`, `CodeBlock` (the `pre` wrapper) |
| `lib/nav.ts` | The single source of the page order. See below. |
| `lib/outline.ts`, `lib/headings.ts` | The `##`/`###` outline of an MDX file, with the same ids as `rehype-slug` |
| `lib/search.ts` | Builds the search docs, the index, and runs a search |
| `lib/theme.ts` | The theme init script, `resolveTheme`, `nextTheme` |
| `lib/site.ts` | `SITE_URL`, `GA_ID`, `BASE_PATH`, `SITE_NAME`, `SITE_SHORT_NAME`, `SITE_DESCRIPTION`, `OWNER` |
| `lib/pwa.ts` | The web manifest, the precache list (all 18 routes, the 404 page, the search index), and the source of the service worker |
| `lib/page.ts` | The `page` export type (`updated`, `sources`), `formatUpdated`, `editUrl` (the "Suggest an edit" link) |
| `lib/home.ts` | The home group labels and the three START HERE pages |
| `lib/reading.ts` | `articleProgress` and `showBackToTop` for the reading aids |
| `lib/ui.ts` | The English strings of the shell |
| `lib/scroll-lock.ts` | One page-scroll lock, shared by the drawer and the search dialog |
| `mdx-components.tsx` | Registers the MDX components |
| `content/<group>/<page>.mdx` | The 17 tutorial pages |
| `tests/` | `node --test` tests for `home`, `nav`, `outline`, `page`, `pwa`, `reading`, `search`, `theme`, `ui` |
| `docs/superpowers/research/` | The research notes and fact-check reports of each page. See "Content Workflow". |
| `scripts/` | Python check scripts. See below. |

`lib/nav.ts` is the one ordered list of groups and pages (slug, title, description, tagline). It drives the sidebar, the part numbers (`PART 01`…`PART 17`, continuous across the groups), prev/next, the home contents, the search index, the sitemap, and the static params.

The site has 18 routes: `/` and `/<group>/<page>/` for the 17 pages.

| Group | Folder | Pages |
|---|---|---|
| Getting Started | `content/getting-started/` | `setup`, `models`, `permission-modes` |
| Foundations | `content/foundations/` | `how-claude-code-works`, `prompting`, `test-design`, `principles` |
| Configure | `content/configure/` | `claude-md`, `settings` |
| Extend | `content/extend/` | `skills`, `subagents`, `hooks`, `mcp`, `plugins` |
| Automate | `content/automate/` | `headless`, `github-actions`, `playwright` |

## How to Add a Page

Do all three steps. Each step is required.

1. Create `content/<group>/<slug>.mdx` from the page template below.
2. Add the page to its group in `lib/nav.ts` (`slug`, `title` for the sidebar, `description` and `tagline` for the home page). The position in the list sets the part number. The part count in the footer and in the search dialog comes from this list.
3. Add `"/<group>/<slug>/": "/<group>/<slug>/"` to `scripts/route-map.json`. The map is an identity map: each key is the same route as its value. `check_routes.py`, `check_outline.py`, and `check_sources.py` read only the values in this file. A page that is not in it gets no check.

### Page template

The order is fixed:

```mdx
export const metadata = { title: '…', description: '…' }
export const page = {
  updated: '2026-10-10',
  sources: [
    { title: '…', publisher: '…', url: 'https://…', accessed: '2026-10-10' },
  ],
}

# Title

Lede paragraph (one paragraph).

<PageMeta />

## First section
```

- `metadata` sets the HTML title and description.
- `page.updated` is a `YYYY-MM-DD` date. The meta line shows it as `updated Oct 2026`.
- `page.sources` is the numbered source list at the end of the page. Source k gets the id `src-k`.
- `<PageMeta />` renders the meta line: `N sections · N sources · updated Mon YYYY · Suggest an edit`. The edit link is `editUrl(group, slug)`, the MDX file on GitHub.
- The first paragraph after the `#` heading gets the lede style.

Then run `npm test`, `npm run build`, and the checks below.

| Mistake | What catches it |
|---|---|
| The MDX file is missing, or the `.mdx` file is not in `lib/nav.ts` | `npm test` (`PAGES lists exactly the content/**/*.mdx files`). A nav entry without a file also fails `npm run build`. |
| The MDX file has no `export const metadata` | `npm test` (`every MDX file exports its metadata`) |
| No `page.sources`, no `<PageMeta />`, a `<Cite n>` without a source, or a source without a cite | `check_sources.py out` |
| The route is not in `scripts/route-map.json` | `npm test` (`every href is /<group>/<page>/ and is a known route`) |
| A route in `scripts/route-map.json` has no built page | `check_routes.py out` |

To add a group, add it to `SOURCE` in `lib/nav.ts` and to the `GroupSlug` type, and create the folder in `content/`.

## MDX Components

`mdx-components.tsx` registers the components. MDX files use them without an import.

| Component | Use |
|---|---|
| `Callout` (`type`: `note` default, `tip`, `warning`, `danger`; optional `title`) | A note box with an icon: 3 px left border and an 8 % tint of the type color. `info` is an alias of `note`, and `error` is an alias of `danger`. |
| `CardGrid` (`cols`: 1–4, default 2) | A grid of cards. One column on phones. |
| `InfoCard` (`title`, optional `subtitle`, optional `tone`: `good` or `bad`) | A raised card with a Markdown body. `tone="good"` adds a green top border and a ✓; `tone="bad"` adds a red top border and a ✗. Screen readers hear "Do" or "Don't". |
| `Cite` (`n`) | A small `[n]` link to source n of `page.sources` (`#src-n`). Put it after the claim that it supports. |
| Fenced code block | Shiki colors, a language label (hidden for `text`) and a Copy button |
| GFM table | A raised box that scrolls sideways on narrow screens |

Code blocks stay dark in both themes. Use fenced code blocks for code, prompts, diagrams and trees.

MDX gotcha: when a component body ends in a Markdown list, put the closing tag at column 0. An indented closing tag becomes part of the last list item and breaks the body. This applies to `Callout`, `InfoCard`, and `<details>`.

Do not use inline `style={{...}}`, Bootstrap, Font Awesome or icon packages in content.

Use the Callout types this way: `note` for background, `tip` for a suggestion or an example, `warning` for a common mistake, `danger` for a risk of data loss or a security risk. If a callout gives the tutorial's own advice and not a fact from a source, say so in the callout.

## Content Workflow

Every factual claim on a page has a source. A claim is a version, a command, a flag, a path, a price, a limit, or a behavior.

| Rule | Detail |
|---|---|
| Source order | Official docs first: `code.claude.com/docs`, `platform.claude.com/docs`, `modelcontextprotocol.io`, `playwright.dev`, and the GitHub repos of the named tools. Then primary sources: vendor docs, ISTQB/ASTQB. No blogs, forums, or AI summaries. |
| Cite | Each changed or new claim has a `<Cite n={k} />` to an entry in that page's `page.sources`. |
| Research notes | `docs/superpowers/research/<group>-<slug>.md`: the sources (S1, S2, …) and a claims table with quotes. Write it before the page. |
| Fact-check report | `docs/superpowers/research/<group>-<slug>.factcheck.md`: one row per claim with the cite, a PASS or FAIL verdict, and the quote. It ends with `Open FAILs: N`. |
| Done | A page is done only when its fact-check report ends with `Open FAILs: 0`. |

To change a page:

1. Update the research notes with the new source and quote.
2. Change the MDX. Add or update the `<Cite n>` and the `page.sources` entry. Set `page.updated`.
3. Fact-check each changed claim against its source. Fix each FAIL and check again.
4. Run `npm run build` and `python3 scripts/check_sources.py out`.

## Design

- The tokens are CSS variables on `:root` in `app/globals.css`: dark (the default) and light. `@theme inline` maps them to Tailwind colors (`bg-bg-raised`, `text-text-dim`, `text-accent`, …). The values come from the reference repo's `globals.css`.
- The theme is on `<html data-theme>`. The server HTML has `data-theme="dark"`. The init script in `lib/theme.ts` runs in `<head>` before the first paint: a saved choice (`localStorage` key `theme`) wins, else it follows `prefers-color-scheme`. `tests/theme.test.ts` checks that the script and `resolveTheme` agree.
- Fonts come from `next/font/google`: Fraunces (display), Inter (body), JetBrains Mono (labels).
- Every text color has 4.5:1 contrast or more on its background in both themes. If you change a token, measure it again.

## PWA

The site installs as an app and works offline.

- The service worker caches all 18 routes and their build files at install. Pages use network first, so an online reader gets the newest version. Files in `/_next/static/` use cache first, because their names have a content hash.
- Each build writes a new cache version into `/sw.js`. The new worker deletes the old caches.
- Only production builds register the service worker. `npm run dev` has none. To test it, run `npm run build` and serve `out/`.
- A new page in `lib/nav.ts` goes into the precache list automatically.

## Environment Variables

Both variables are optional. The build passes without them. `lib/site.ts` reads them.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sets `metadataBase`, canonical URLs, Open Graph data, `sitemap.xml` entries, and the `robots.txt` sitemap line. |
| `NEXT_PUBLIC_GA_ID` | Adds Google Analytics. |

## Checks

| Command | Purpose |
|---|---|
| `npm test` | Unit tests for `lib/home.ts`, `lib/nav.ts`, `lib/outline.ts`, `lib/page.ts`, `lib/pwa.ts`, `lib/reading.ts`, `lib/search.ts`, `lib/theme.ts`, `lib/ui.ts`, and the page and route-map lists |
| `python3 -m unittest scripts/test_checks.py` | Unit tests of the Python checks |
| `python3 scripts/check_routes.py out` | Lists each route from `route-map.json` that has no page in `out/` |
| `python3 scripts/check_links.py out` | Lists broken internal links and assets |
| `python3 scripts/check_outline.py out` | Checks that each "On this page" link points to an element id |
| `python3 scripts/check_sources.py out` | Checks each content page: one meta line with `updated Mon YYYY`, 1 or more sources, a `#src-k` target for each `[k]` cite, a cite for each source, and `https://` source links |
| `scripts/compare_text.py` | Historical record of the phase-3 migration. It cannot run now. See below. |

The Python scripts need only Python 3. Run the `out` checks after `npm run build`.

Run `check_sources.py` without flags. The normal command is `python3 scripts/check_sources.py out`, and it must print `OK 17 pages checked, 0 skipped`. The `--allow-missing` flag skips a page that has no meta line and no sources. It exists for skeleton pages during a rewrite and for the unit tests. Do not use it for a release.

`compare_text.py` is a historical record of the phase-3 migration. It compared the visible text of the old build (`.baseline/out`) with the new build. `.baseline/out` is deleted, and the old routes no longer exist, so the script cannot run now.

## Docs

- `docs/superpowers/specs/2026-10-09-editorial-redesign-design.md` is the design of the editorial shell (phase 3).
- `docs/superpowers/plans/2026-10-09-editorial-redesign.md` is its plan.
- `docs/superpowers/specs/2026-10-09-nextra-reorganization-design.md` and `docs/superpowers/plans/2026-10-09-nextra-reorganization.md` are the earlier migration to the grouped URLs.
- `docs/superpowers/audits/2026-10-09-content-audit.md` lists the outdated claims in the old tutorial text. Its "Resolution (2026-10-10)" section maps each High and Med row to the new page that fixes it.
- `docs/superpowers/specs/2026-10-10-content-refresh-design.md` and `docs/superpowers/plans/2026-10-10-content-refresh.md` are phase 2 (content refresh): the 17 pages, the cite and sources model, and the reading aids.
- `docs/superpowers/research/` holds the research notes and the fact-check reports of each page.
