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

`next.config.ts` sets `output: 'export'`, `trailingSlash: true` and `images.unoptimized`. It sets no `basePath` and no `assetPrefix`. The MDX plugins are given by name (strings), because Turbopack passes their options to Rust and they must be serializable.

## Structure

| Path | Content |
|---|---|
| `app/layout.tsx` | Fonts, the theme init script, the metadata, optional Google Analytics |
| `app/globals.css` | Design tokens (both themes), Tailwind, the MDX element styles (`.mdx`, `.code-block`, `.mdx-table`, `details`) |
| `app/(site)/layout.tsx` | The site shell (`SiteShell`) and the search dialog |
| `app/(site)/page.tsx` | The home page (`components/pages/HomePage.tsx`): the contents, grouped |
| `app/(site)/[group]/[page]/page.tsx` | Loads `content/<group>/<page>.mdx`. Static params come from `lib/nav.ts`. |
| `app/search-index.json/route.ts` | The static search index: one doc per page intro and one per `##` section |
| `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx` | Sitemap, robots, 404 page |
| `components/layout/` | `SiteShell`, `SiteHeader`, `Sidebar`, `SidebarList`, `MobileNav`, `ThemeToggle` |
| `components/navigation/` | `SectionNav` ("On this page"), `SearchPalette` (Ctrl/Cmd+K) |
| `components/content/` | `PageHeader` (the `PART 05 · CONFIGURE` eyebrow), `PrevNext`, `CopyButton` |
| `components/mdx/` | `Callout`, `CardGrid`, `InfoCard`, `CodeBlock` (the `pre` wrapper) |
| `lib/nav.ts` | The single source of the page order. See below. |
| `lib/outline.ts`, `lib/headings.ts` | The `##`/`###` outline of an MDX file, with the same ids as `rehype-slug` |
| `lib/search.ts` | Builds the search docs, the index, and runs a search |
| `lib/theme.ts` | The theme init script, `resolveTheme`, `nextTheme` |
| `lib/site.ts` | `SITE_URL`, `GA_ID`, `SITE_NAME`, `OWNER` |
| `lib/ui.ts` | The English strings of the shell |
| `lib/scroll-lock.ts` | One page-scroll lock, shared by the drawer and the search dialog |
| `mdx-components.tsx` | Registers the MDX components |
| `content/<group>/<page>.mdx` | The 17 tutorial pages |
| `tests/` | `node --test` tests for `nav`, `outline`, `search`, `theme`, `ui` |
| `scripts/` | Python check scripts. See below. |

`lib/nav.ts` is the one ordered list of groups and pages (slug, title, description). It drives the sidebar, the part numbers (`PART 01`…`PART 17`, continuous across the groups), prev/next, the home contents, the search index, the sitemap, and the static params.

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

1. Create `content/<group>/<slug>.mdx`. Start it with `export const metadata = { title: '…', description: '…' }`, then one `#` heading. The first paragraph after the `#` heading gets the lede style.
2. Add the page to its group in `lib/nav.ts` (`slug`, `title` for the sidebar, `description` for the home page). The position in the list sets the part number. The part count in the footer and in the search dialog comes from this list.
3. Add `"/<group>/<slug>/": "/<group>/<slug>/"` to `scripts/route-map.json`. The old URL is the key. A new page has no old URL, so use the new route as the key. `check_routes.py` and `check_outline.py` read only the values in this file. A page that is not in it gets no check.

Then run `npm test`, `npm run build`, and the checks below.

| Mistake | What catches it |
|---|---|
| The MDX file is missing, or the `.mdx` file is not in `lib/nav.ts` | `npm test` (`PAGES lists exactly the content/**/*.mdx files`). A nav entry without a file also fails `npm run build`. |
| The MDX file has no `export const metadata` | `npm test` (`every MDX file exports its metadata`) |
| The route is not in `scripts/route-map.json` | `npm test` (`every href is /<group>/<page>/ and is a known route`) |
| A route in `scripts/route-map.json` has no built page | `check_routes.py out` |

To add a group, add it to `SOURCE` in `lib/nav.ts` and to the `GroupSlug` type, and create the folder in `content/`.

## MDX Components

`mdx-components.tsx` registers the components. MDX files use them without an import.

| Component | Use |
|---|---|
| `Callout` (`type`: `info` default, `warning`, `error`) | A note box: 3 px left border and an 8 % tint of the type color |
| `CardGrid` (`cols`: 1–4, default 2) | A grid of cards. One column on phones. |
| `InfoCard` (`title`, optional `subtitle`) | A raised card with a Markdown body |
| Fenced code block | Shiki colors, a language label (hidden for `text`) and a Copy button |
| GFM table | A raised box that scrolls sideways on narrow screens |

Code blocks stay dark in both themes. Use fenced code blocks for code, prompts, diagrams and trees.

MDX gotcha: when a component body ends in a Markdown list, put the closing tag at column 0. An indented closing tag becomes part of the last list item and breaks the body. This applies to `InfoCard` and `<details>`.

Do not use inline `style={{...}}`, Bootstrap, Font Awesome or icon packages in content.

## Design

- The tokens are CSS variables on `:root` in `app/globals.css`: dark (the default) and light. `@theme inline` maps them to Tailwind colors (`bg-bg-raised`, `text-text-dim`, `text-accent`, …). The values come from the reference repo's `globals.css`.
- The theme is on `<html data-theme>`. The server HTML has `data-theme="dark"`. The init script in `lib/theme.ts` runs in `<head>` before the first paint: a saved choice (`localStorage` key `theme`) wins, else it follows `prefers-color-scheme`. `tests/theme.test.ts` checks that the script and `resolveTheme` agree.
- Fonts come from `next/font/google`: Fraunces (display), Inter (body), JetBrains Mono (labels).
- Every text color has 4.5:1 contrast or more on its background in both themes. If you change a token, measure it again.

## Environment Variables

Both variables are optional. The build passes without them. `lib/site.ts` reads them.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sets `metadataBase`, canonical URLs, Open Graph data, `sitemap.xml` entries, and the `robots.txt` sitemap line. |
| `NEXT_PUBLIC_GA_ID` | Adds Google Analytics. |

## Checks

| Command | Purpose |
|---|---|
| `npm test` | Unit tests for `lib/nav.ts`, `lib/outline.ts`, `lib/search.ts`, `lib/theme.ts`, `lib/ui.ts`, and the page and route-map lists |
| `python3 -m unittest scripts/test_checks.py` | Unit tests of the Python checks |
| `python3 scripts/check_routes.py out` | Lists each route from `route-map.json` that has no page in `out/` |
| `python3 scripts/check_links.py out` | Lists broken internal links and assets |
| `python3 scripts/check_outline.py out` | Checks that each "On this page" link points to an element id |
| `python3 scripts/compare_text.py …` | Migration record only. See below. |

The Python scripts need only Python 3. Run the `out` checks after `npm run build`.

`compare_text.py` compares the visible text of two builds. It needs `.baseline/out`, the build of the site before the migration (git-ignored). It is for the migration only: `.baseline/out` will be deleted after this phase, and then the script cannot run. The phase-3 command was:

```bash
python3 scripts/compare_text.py --old .baseline/out --new out --old-root attr=data-pagefind-body --new-root attr=data-content --same-routes /getting-started/setup/ /getting-started/models/ /getting-started/modes/ /foundations/ai-systems/ /foundations/prompt/ /foundations/context/ /foundations/principles/ /configure/structure/ /configure/claude-md/ /configure/memory/ /configure/commands/ /extend/skills/ /extend/agents/ /extend/hooks/ /extend/mcp/ /extend/superpower/ /extend/marketplace/
```

## Docs

- `docs/superpowers/specs/2026-10-09-editorial-redesign-design.md` is the design of the editorial shell (phase 3).
- `docs/superpowers/plans/2026-10-09-editorial-redesign.md` is its plan.
- `docs/superpowers/specs/2026-10-09-nextra-reorganization-design.md` and `docs/superpowers/plans/2026-10-09-nextra-reorganization.md` are the earlier migration to the grouped URLs.
- `docs/superpowers/audits/2026-10-09-content-audit.md` lists the outdated claims in the tutorial text. It is the input for phase 2 (content update).

The redesign did not change the tutorial text. Phase 2 changes the text.
