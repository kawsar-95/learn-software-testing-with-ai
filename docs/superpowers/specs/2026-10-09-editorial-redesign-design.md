# Design Spec: Phase 3 – Editorial Redesign (Reference Shell)
**Date:** 2026-10-09
**Status:** Draft – waiting for review
**Branch:** `feat/editorial-redesign` (from `feat/nextra-migration`)

## Summary

Replace Nextra with the custom shell of the owner's reference site, **AI Engineering** (`https://kawsar-95.github.io/All-Necessary-Topics-Related-to-AI-Engineering/`, source `github.com/kawsar-95/All-Necessary-Topics-Related-to-AI-Engineering`). The site gets the reference's editorial look: warm paper / near-black themes, teal accent, Fraunces display type, Inter body, JetBrains Mono labels. Remove every mention of the previous owner name; the owner credit becomes the GitHub handle `kawsar-95`.

The tutorial text and the 18 URLs do not change. Content fixes stay in phase 2 ([audit](../audits/2026-10-09-content-audit.md)).

## Decisions

| Topic | Decision |
|---|---|
| Approach | Drop Nextra. Copy and adapt the reference shell components (option B). |
| Stack | Next.js 16 + React 19 + Tailwind CSS 4 + `@next/mdx` + MiniSearch. Static export (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`), no `basePath`. |
| Language | New shell files are TypeScript (`.tsx`/`.ts`), copied as close to the reference as possible. Existing `.js` files may stay. |
| Content | Stays in `content/<group>/<page>.mdx`. Text unchanged. |
| Navigation source | One file, `lib/nav.ts`: ordered groups and pages (slug, title, description). It drives sidebar, prev/next, home contents, search index, sitemap, static params. `_meta.js` files are removed. |
| URLs | Unchanged: `/` and `/<group>/<page>/` (18 routes). |
| Themes | Dark (default) and light, on `<html data-theme>`, set by an inline script before first paint; saved choice in `localStorage` key `theme`; without a saved choice, follow `prefers-color-scheme`. |
| Owner credit | `kawsar-95`, linking to `https://github.com/kawsar-95`. |
| Env vars | Unchanged: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, both optional. |

## Architecture

```
app/
  layout.tsx                      ← fonts, theme init script, metadata, optional GA
  globals.css                     ← reference tokens + Tailwind 4 + MDX element styles
  (site)/layout.tsx               ← SiteShell
  (site)/page.tsx                 ← home page
  (site)/[group]/[page]/page.tsx  ← loads content/<group>/<page>.mdx
  search-index.json/route.ts      ← static MiniSearch docs
  sitemap.ts, robots.ts           ← same env rules as phase 1
  not-found.tsx
components/
  layout/   SiteShell, SiteHeader, Sidebar, SidebarList, MobileNav, ThemeToggle
  navigation/ SectionNav (TOC), SearchPalette
  content/  PageHeader (eyebrow), PrevNext, CopyButton
  mdx/      Callout, CardGrid, InfoCard, CodeBlock wrapper (pre)
lib/
  nav.ts       ← groups, pages, part numbers, neighbors
  outline.ts   ← ## / ### headings of an MDX file with rehype-slug-compatible ids
  search.ts    ← build docs, create index, run search (from reference)
  theme.ts     ← theme init script, resolveTheme, nextTheme (from reference)
  site.ts      ← SITE_URL, GA_ID (phase 1 logic, ported)
mdx-components.tsx
content/<group>/<page>.mdx (17) — unchanged text
```

### MDX pipeline
- `@next/mdx` with `rehype-slug` (heading ids) and `@shikijs/rehype` (theme `github-dark-dimmed`, build time).
- Frontmatter becomes `export const metadata = { title, description }` (same values).
- `Callout` is a local component registered in `mdx-components.tsx`; the `import { Callout } from 'nextra/components'` lines are removed. `CardGrid`, `InfoCard` stay registered.
- The page route imports `content/${group}/${page}.mdx` dynamically; `generateStaticParams` comes from `lib/nav.ts`.

### Copied from the reference and adapted
`SiteShell`, `SiteHeader`, `Sidebar`, `SidebarList`, `MobileNav`, `ThemeToggle`, `theme.ts`, `SectionNav`, `SearchPalette`, `search.ts`, `PrevNext`, `CopyButton`, the code-block and callout styles, and the `globals.css` tokens.

### Not copied
Bangla / language switch / `i18n.ts` (UI strings become plain English constants), install button, service worker, manifest, voice switcher, practice list, videos, sources, diagrams, content schema (zod).

## Visual design

### Tokens (verbatim from the reference `globals.css`)
- Dark (default): `--bg #0f1013`, `--bg-raised #16181d`, `--bg-raised-2 #1c1f25`, `--border #262931`, `--border-strong #353944`, `--text #ebe8e2`, `--text-dim #a4a19a`, `--text-faint #8a867f`, `--accent #5ec8d8`, `--good #6fcf9f`, `--warn #e5b454`, `--danger #ef7f86`, `--code-bg #121317`.
- Light: `--bg #fbfaf7`, `--bg-raised #f3f1ec`, `--bg-raised-2 #ebe8e1`, `--border #e2ded5`, `--border-strong #cfc9bd`, `--text #1d1c1a`, `--text-dim #4f4c46`, `--text-faint #6a665e`, `--accent #0e6f86`, `--good #1b7a4c`, `--warn #8f5a00`, `--danger #b4303a`, `--code-bg #ffffff`.
- Fonts via `next/font/google`: Fraunces (display, italic, opsz), Inter (sans), JetBrains Mono (mono). No Noto Sans Bengali.

### Header
56 px, sticky, blurred `--bg` at 85 %. Left: mobile menu button (< `lg`), logo mark `QA` (italic Fraunces in the reference's bordered box, accent color) + wordmark "Software Testing with AI" (Fraunces 17 px semibold). Right: search trigger with `Ctrl K` hint, theme toggle.

### Sidebar
260 px, sticky below the header, scrolls on its own, hidden < `lg` (drawer instead). Four groups; each group label is mono 11 px uppercase, letter-spaced, `--text-faint`: `GETTING STARTED`, `FOUNDATIONS`, `CONFIGURE`, `EXTEND`. Each item: mono 10.5 px label `PART 01`…`PART 17` (continuous numbering in `lib/nav.ts` order) above the title (13.5 px). Active item: 2 px accent left border, `--bg-raised`, accent part label. Labels are the current sidebar labels.

### Home page (`/`)
1. Eyebrow (mono, accent): `TUTORIAL · 17 PARTS · 4 GROUPS`.
2. H1 (Fraunces, `clamp(2.5rem, 8vw, 4.5rem)`): `🤖 Software Testing with Claude AI` (current title).
3. Lede: the current subtitle "Master Prompt Engineering, Context Engineering, Skills, Agents & MCP Servers in Claude", then the current intro sentence "A complete guide to building autonomous AI testing systems with Claude Code."
4. `CONTENTS` label, then per group a mono group label and rows: big light Fraunces number `01`, title (Fraunces, links to the page; whole row clickable), the current card description, `→` (hover accent).

Removed from the home page: hero box, "Get Started" button, "Tutorial Overview" heading, the "Each section is a dedicated page — click any card to dive in." sentence, icon cards.
Page `<title>`: `Software Testing with AI - Complete Tutorial` (unchanged).

### Content page
- Eyebrow above the title (mono 11 px, accent): `PART 05 · CONFIGURE`.
- The MDX `#` heading styled as the reference topic title (Fraunces, `clamp(2.5rem, 7vw, 3.75rem)`).
- The first paragraph after the `#` heading uses the lede style (18–20 px, `--text-dim`).
- Content column max 680 px; at ≥ 1280 px a 220 px right column with sticky "ON THIS PAGE" (`SectionNav`, `##` and `###`, active item tracking).
- Bottom: `PrevNext` cards (`← PART 04` / `PART 06 →`, Fraunces titles). The landing page is not in the prev/next chain.

### MDX element styles
| Element | Style |
|---|---|
| `h2` / `h3` | Fraunces, reference section-title sizes, scroll margin for the sticky header |
| Paragraphs, lists | Inter 16–17 px, line height 1.7, `--text` / `--text-dim` |
| Links, inline code | Accent; inline code in mono on `--bg-raised` with border |
| Code blocks | Shiki `github-dark-dimmed`, `#22272e`, dark in both themes, 10 px radius, language label top right (hidden for `text`), copy button |
| `Callout` | 10 px radius, 3 px left border, 8 % tint of the variant color (`info` → accent, `warning` → warn, `error` → danger) |
| `CardGrid` / `InfoCard` | Reference "panels": `--bg-raised`, 1 px `--border`, 12 px radius; title 16 px semibold |
| Tables | Reference table: raised box, uppercase 12 px headers on `--bg-raised-2`, dim cells, horizontal scroll inside the box |
| `<details>` | Raised box, 1 px border, mono summary with a rotating `▸` |
| Images | Structure diagram keeps the 480 px cap, centered |

### Footer
One line, mono-small, `--text-faint`: `17 parts · Software Testing with AI · © 2026 kawsar-95` with `kawsar-95` linked to `https://github.com/kawsar-95`.

## Metadata

- Title template `%s – Software Testing with AI`; landing title absolute (unchanged).
- `authors: [{ name: 'kawsar-95', url: 'https://github.com/kawsar-95' }]`.
- `viewport.themeColor`: dark `#0f1013`, light `#fbfaf7`.
- SITE_URL / GA rules exactly as phase 1 (canonical with trailing slash, `og:url`, absolute `og:image`, sitemap 18 routes or empty, robots sitemap line only with SITE_URL).

## Search

- `app/search-index.json/route.ts` (`force-static`) emits one doc per `##` section of every page (plus one doc for the page intro), fields `id`, `href` (`/<group>/<page>/#<id>`), `part`, `group`, `title`, `text`.
- `SearchPalette`: header button and `Ctrl/Cmd+K`; loads the index on first open; keyboard navigation as in the reference.

## Removed

| Item | Reason |
|---|---|
| `nextra`, `nextra-theme-docs`, `pagefind`, `lucide-react`, `"overrides": {"zod": …}` | Not used |
| `app/[[...mdxPath]]/`, `app/layout.jsx`, `mdx-components.js`, all `content/**/_meta.js` | Replaced |
| `components/landing/`, `components/mdx/mdx.css`, `lib/site.js` (ported to `.ts`) | Replaced |
| `postbuild` Pagefind script | MiniSearch replaces Pagefind |
| Every mention of the previous owner name, in all files including `docs/` | Owner request |

## Verification

0. **Baseline first:** before any change, build the current branch (Nextra) and copy `out/` to `.baseline/out/` (git-ignored).
1. `npm run build` passes with no warnings.
2. `python3 scripts/check_routes.py out` and `python3 scripts/check_links.py out` pass.
3. `compare_text.py` gets `--old-root` (default `class=main-content`) and `--same-routes` (old route = new route). `python3 scripts/compare_text.py --old .baseline/out --new out --old-root attr=data-pagefind-body --same-routes <17 page routes>` → 17 × PASS (ordered). New root: the element that wraps the MDX content (chosen in the plan). The home page is checked visually, not by text.
4. Unit tests: the Python suite plus `node --test` tests (from the reference where possible) for `theme.ts` (init script = `resolveTheme`), `search.ts` (every page indexed; "hooks" ranks the Hooks page first), `nav.ts` (17 pages, order, part numbers, neighbors), `outline.ts` (ids equal the `rehype-slug` ids in the built HTML).
5. Env build: `NEXT_PUBLIC_SITE_URL=https://example.com NEXT_PUBLIC_GA_ID=G-TEST123` → 18 `<loc>`, GA tag, canonical and `og:url` `https://example.com/extend/hooks/`; build without env vars → none of these.
6. Browser (Playwright): theme toggle + persistence + no flash of the wrong theme; Ctrl K search opens and finds "hooks"; mobile drawer at 375 px; TOC active item changes on scroll; copy button copies code; every text token ≥ 4.5:1 in both themes; `scrollWidth <= 375` on `/` and `/configure/structure/`; side-by-side screenshots with the reference home and topic pages.
7. `grep -rni "road to caree[r]" --exclude-dir=node_modules --exclude-dir=.git .` → no output.

## Out of scope

- Tutorial text, page names, page count (phase 2).
- Bangla, PWA, practice tasks, videos, citations.
- Deploy config.
