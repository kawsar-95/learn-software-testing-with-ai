# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static educational site that teaches QA engineers and SDETs how to use Claude AI for software testing. The stack is Next.js 16 (App Router) and Nextra 4 (`nextra-theme-docs`). The pages are MDX. The build is a static export in `out/`. There is no backend.

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # static export to out/, then Pagefind builds the search index
python3 -m http.server 8000 -d out   # preview the built site at http://localhost:8000
```

`next start` does not work with a static export. Use the `http.server` command to preview `out/`.

`package.json` has `"overrides": {"zod": "4.3.6"}`. Keep it. With zod 4.4 or newer, `nextra-theme-docs` 4.6.1 fails with "expected nonoptional at children".

`next.config.mjs` sets `output: 'export'`, `images.unoptimized`, and `trailingSlash: true`. It sets no `basePath` and no `assetPrefix`. Nextra runs with `defaultShowCopyCode: true`, so every code block has a copy button.

## Content Structure

The site has 18 routes: the landing page `/` and 17 pages. Each page is one MDX file. `_meta.js` in each folder sets the sidebar order and the titles.

| Group | Folder | Pages |
|---|---|---|
| Getting Started | `content/getting-started/` | `setup`, `models`, `modes` |
| Foundations | `content/foundations/` | `ai-systems`, `prompt`, `context`, `principles` |
| Configure | `content/configure/` | `structure`, `claude-md`, `memory`, `commands` |
| Extend | `content/extend/` | `skills`, `agents`, `hooks`, `mcp`, `superpower`, `marketplace` |

`content/index.mdx` is the landing page. Its `theme` entry in `content/_meta.js` hides the sidebar, the table of contents, and the pagination. The route list in `components/landing/topics.js` builds the topic cards.

`scripts/route-map.json` maps each old route to its new route.

## How to Add a Page

1. Create `content/<group>/<slug>.mdx`. Start it with front matter (`title`, `description`), then one `#` heading.
2. Add `<slug>: 'Title'` to `content/<group>/_meta.js`. The order of the entries is the sidebar order.
3. Add a card for the page to `components/landing/topics.js`.
4. Run `npm run build` and `python3 scripts/check_routes.py out`.

To add a group, create the folder with its `_meta.js`. Then add the group to `content/_meta.js`.

## Custom MDX Components

`mdx-components.js` registers the components. The code is in `components/mdx/` and the styles are in `components/mdx/mdx.css`.

- `CardGrid` (`cols`, default 2) lays out cards in a grid.
- `InfoCard` (`title`, optional `subtitle`) is a card with a Markdown body.
- Use the Nextra `Callout` for note and highlight boxes.
- Use fenced code blocks for code, prompts, diagrams, and trees.
- The structure diagram is an image on `/configure/structure/`. `mdx.css` limits its width to 480 px.

MDX gotcha: put the closing tag of `InfoCard` and `<details>` at column 0. Markdown inside the tag is parsed only if the closing tag is not indented. An indented closing tag breaks the body, for example a list.

Do not use inline `style={{...}}`, Bootstrap, or Font Awesome in content. Landing icons come from `lucide-react`.

## Environment Variables

Both variables are optional. The build passes without them. `lib/site.js` reads them.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sets `metadataBase`, canonical URLs, Open Graph data, `sitemap.xml`, and the `robots.txt` sitemap line. |
| `NEXT_PUBLIC_GA_ID` | Adds Google Analytics. |

## Check Scripts

All scripts are in `scripts/` and need only Python 3.

| Command | Purpose |
|---|---|
| `python3 scripts/check_routes.py out` | Lists each route from `route-map.json` that has no page in `out/`. |
| `python3 scripts/check_links.py out` | Lists broken internal links and assets. It ignores `/_next/` and `/_pagefind/`. |
| `python3 -m unittest scripts/test_checks.py` | Runs the unit tests of the checks. |
| `python3 scripts/compare_text.py --old .baseline/out --new out` | Compares the visible text of the old and new build. |

`compare_text.py` needs `.baseline/out`, the build of the old site. This is a migration-only tool. The folder is git-ignored and can be absent. Without it, only the first three checks apply. For `/`, add `--unordered` (the landing cards are grouped).

## Docs

- `docs/superpowers/specs/2026-10-09-nextra-reorganization-design.md` is the design of the migration.
- `docs/superpowers/plans/2026-10-09-nextra-reorganization.md` is the plan of the migration.
- `docs/superpowers/audits/2026-10-09-content-audit.md` lists the outdated claims in the tutorial text. It is the input for phase 2 (content update).

The migration did not change the tutorial text. Phase 2 changes the text.
