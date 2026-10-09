# Phase 3 – Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Nextra with the custom shell of the owner's AI Engineering reference site, keep all MDX text and the 18 URLs, and remove every mention of the previous owner name.

**Architecture:** `@next/mdx` compiles `content/<group>/<page>.mdx`; one App Router route `[group]/[page]` renders it inside `SiteShell` (copied from the reference). `lib/nav.ts` is the single ordered source for sidebar, prev/next, home, search, sitemap and static params. Tailwind 4 + the reference's CSS tokens give the look. MiniSearch replaces Pagefind.

**Tech Stack:** Next.js 16.4.0, React 19, Tailwind CSS 4.3 (`@tailwindcss/turbopack`), `@next/mdx` 16.4.0 + `@mdx-js/loader`/`@mdx-js/react` 3.1, `rehype-slug` 6, `github-slugger` 2, `@shikijs/rehype` 4.5, MiniSearch 7.2, TypeScript 5.9, `@next/third-parties` 16.4.0, Node `--test` (native TS), Python 3 check scripts.

**Spec:** [docs/superpowers/specs/2026-10-09-editorial-redesign-design.md](../specs/2026-10-09-editorial-redesign-design.md)

**Reference source:** `github.com/kawsar-95/All-Necessary-Topics-Related-to-AI-Engineering` (the controller gives a local clone path as `REF`; read only, never run code from it). Copy files from `REF/src/...` and adapt; keep the reference's comments style.

## Global Constraints

- MDX tutorial text does not change. The 17 content pages must pass `compare_text.py` against `.baseline/out` (ordered).
- URLs unchanged: `/` and `/<group>/<page>/` — the 18 routes in `scripts/route-map.json` values.
- Static export: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`, no `basePath`, no `assetPrefix`.
- Env vars `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID` optional; every build passes without them.
- Tokens verbatim from the spec's "Tokens" section. Dark is the server default (`<html data-theme="dark">`).
- Fonts: Fraunces (display, italic, `opsz`), Inter (sans), JetBrains Mono (mono) via `next/font/google`. No Noto Sans Bengali.
- No Nextra, no Pagefind, no Bootstrap, no Font Awesome, no `lucide-react`, no inline `style={{…}}` in MDX content.
- Owner credit: `kawsar-95` → `https://github.com/kawsar-95`. No mention of the previous owner name anywhere in the repo.
- Title template `%s – Software Testing with AI`; landing `<title>` exactly `Software Testing with AI - Complete Tutorial`.
- No deploy config.
- Commit trailer: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Branch `feat/editorial-redesign`; never push.

## Review Focus

1. **Theme flash:** a reader with a saved `light` choice must never see the dark theme first. Covered by the `theme.test.ts` init-script test (Task 2) and the browser reload check (Task 8).
2. **Heading ids out of sync:** TOC links and search hits point at `#id`s; `lib/outline.ts` ids must equal the `rehype-slug` ids in the built HTML, including duplicate headings (`-1` suffix) and headings with emoji or punctuation. Covered by the outline-vs-build check (Task 3).
3. **MDX that compiled under Nextra but not under plain `@next/mdx`** (Nextra-only components or syntax). Covered by the build + `compare_text.py` in Task 2.
4. **Keyboard and screen-reader use of the new shell** (skip link, drawer focus trap and Escape, search dialog focus, `aria-current`). Covered by the keyboard checks in Task 8.
5. **Wide code/tables at 375 px** overflowing the page. Covered by `scrollWidth <= 375` in Task 8.

---

### Task 0: Baseline (controller)

- [ ] Build the current branch (Nextra) and save the baseline: `rm -rf out .next && npm run build && rm -rf .baseline && cp -r out .baseline/out`. Expected: `.baseline/out/extend/hooks/index.html` exists. (`.baseline/` is already git-ignored.)

---

### Task 1: Check-script options for the new baseline

**Files:**
- Modify: `scripts/compare_text.py`, `scripts/checks.py` (only if a helper is needed)
- Test: `scripts/test_checks.py`

**Interfaces:**
- Produces CLI flags on `compare_text.py`:
  - `--old-root <spec>` (default `class=main-content`), `--new-root <spec>` (default `attr=data-pagefind-body`). `<spec>` is `class=…` or `attr=…`.
  - `--same-routes`: the new route of each given route is the route itself (no `route-map.json` lookup); routes are given as new routes (e.g. `/extend/hooks/`).
- Phase 3 command (used from Task 2 on): `python3 scripts/compare_text.py --old .baseline/out --new out --old-root attr=data-pagefind-body --new-root attr=data-content --same-routes <17 page routes>`.

- [ ] **Step 1: Write failing tests** in `scripts/test_checks.py`: `test_compare_cli_custom_roots` (fixtures: old page root `<main data-pagefind-body>`, new page root `<article data-content>`, same text → exit 0) and `test_compare_cli_same_routes` (route `/a/b/` read from `old/a/b/index.html` and `new/a/b/index.html`; missing paragraph in new → exit 1). Run the CLI via `subprocess` with `sys.executable`.
- [ ] **Step 2:** `python3 -m unittest scripts/test_checks.py -v` → the 2 new tests FAIL.
- [ ] **Step 3: Implement** the three flags with `argparse`; keep current defaults and behavior.
- [ ] **Step 4:** tests → all PASS (14). Also `python3 scripts/compare_text.py --old .baseline/out --new .baseline/out --old-root attr=data-pagefind-body --new-root attr=data-pagefind-body --same-routes /extend/hooks/` → `PASS`.
- [ ] **Step 5: Commit** `test: add root and same-route options to compare_text`.

---

### Task 2: Foundation — Next + MDX + Tailwind, content route, Nextra removed

**Files:**
- Delete: `app/layout.jsx`, `app/[[...mdxPath]]/`, `mdx-components.js`, `content/_meta.js`, `content/*/_meta.js`, `content/index.mdx`, `components/landing/`, `components/mdx/mdx.css`, `lib/site.js`, `app/sitemap.js`, `app/robots.js`
- Create: `tsconfig.json` (reference copy, `paths: { "@/*": ["./*"] }`), `next.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/(site)/layout.tsx` (temporary: `<main>{children}</main>` only), `app/(site)/[group]/[page]/page.tsx`, `app/(site)/page.tsx` (temporary: title only), `mdx-components.tsx`, `components/mdx/Callout.tsx`, `components/mdx/CardGrid.tsx`, `components/mdx/InfoCard.tsx` (ported from `.jsx`), `lib/nav.ts`, `lib/theme.ts`, `lib/site.ts`, `tests/nav.test.ts`, `tests/theme.test.ts`
- Modify: `package.json`, `package-lock.json`, every `content/<group>/<page>.mdx` (frontmatter → `export const metadata`, remove `nextra/components` imports)

**Interfaces:**
- `lib/nav.ts`:
  - `export type GroupSlug = 'getting-started' | 'foundations' | 'configure' | 'extend'`
  - `export type NavPage = { group: GroupSlug; slug: string; title: string; description: string; part: number; href: string }` — `href` = `/<group>/<slug>/`, `part` 1–17 in order.
  - `export type NavGroup = { slug: GroupSlug; title: string; pages: NavPage[] }`
  - `export const GROUPS: NavGroup[]`, `export const PAGES: NavPage[]` (flat, in order)
  - `export function getPage(group: string, slug: string): NavPage | undefined`
  - `export function getNeighbors(group: string, slug: string): { prev?: NavPage; next?: NavPage }`
  - Order, group titles and page titles = the current `content/**/_meta.js` (read them before deleting). `description` = the card text for that page in `components/landing/topics.js` (Marketplaces has no card: use its MDX `description`).
- `lib/theme.ts`: copy of `REF/src/lib/theme.ts` (`Theme`, `THEME_STORAGE_KEY = "theme"`, `resolveTheme`, `nextTheme`, `THEME_INIT_SCRIPT`).
- `lib/site.ts`: `SITE_URL: string | null`, `GA_ID: string | null` (same logic as `lib/site.js`), `SITE_NAME = 'Software Testing with AI'`, `OWNER = { name: 'kawsar-95', url: 'https://github.com/kawsar-95' }`.
- `next.config.ts`: `createMDX({ extension: /\.mdx?$/, options: { rehypePlugins: [['rehype-slug'], ['@shikijs/rehype', { theme: 'github-dark-dimmed' }]] } })` (plugins as strings — Turbopack needs serializable options), `pageExtensions: ['ts','tsx','js','jsx','md','mdx']`, Global Constraints export settings, and the reference's `turbopack.rules` for `*.css` → `@tailwindcss/turbopack`. If Turbopack cannot load the MDX plugins, build with `next build --webpack` and record it.
- `app/(site)/[group]/[page]/page.tsx`: `generateStaticParams()` from `PAGES`; `dynamicParams = false`; `generateMetadata` returns the MDX module's `metadata`; renders `<article data-content className="mdx">` with the MDX component. Unknown params → `notFound()`.
- `app/layout.tsx`: fonts (CSS vars `--font-fraunces`, `--font-inter`, `--font-mono-jb`), `<html lang="en" data-theme="dark" suppressHydrationWarning>`, `THEME_INIT_SCRIPT` in `<head>`, `metadata` title template + default description, `viewport.themeColor` per spec.
- `app/globals.css`: `@import "tailwindcss"`, the `light` custom variant, the spec tokens for `:root,[data-theme=dark]` and `[data-theme=light]`, the reference `@theme inline` block (without voice/Bangla entries; font stacks without Noto Bengali), base body styles from the reference.
- `components/mdx/Callout.tsx`: `Callout({ type = 'info', children })`, `type: 'info' | 'warning' | 'error'`; spec style (reference Callout markup; the color comes from a class per type, not an inline style).
- `CardGrid({ cols = 2, children })`, `InfoCard({ title, subtitle?, children })`: same props as now, Tailwind classes in the reference "panels" style; InfoCard title stays a `<p>`.
- `package.json` scripts: `dev`, `build` (no `postbuild`), `test` = `node --test "tests/**/*.test.ts"`. Remove `nextra`, `nextra-theme-docs`, `pagefind`, `lucide-react`, the `zod` override. Add the Tech Stack packages (`typescript@^5`, `@types/react`, `@types/node`, `@types/mdx`). Keep `engines`.

- [ ] **Step 1: Write failing tests**: `tests/theme.test.ts` = reference `tests/theme.test.ts` with the import path changed to `../lib/theme.ts`. `tests/nav.test.ts`: `PAGES.length === 17`; parts are 1..17 in order; `GROUPS.map(g => g.slug)` = `['getting-started','foundations','configure','extend']`; every `href` matches `^/[a-z-]+/[a-z-]+/$` and appears in `scripts/route-map.json` values; `getNeighbors('getting-started','setup').prev === undefined`; `getNeighbors('extend','marketplace').next === undefined`; `getNeighbors('foundations','ai-systems').prev.slug === 'modes'`.
- [ ] **Step 2:** `npm test` → FAIL (modules missing).
- [ ] **Step 3: Implement** the Files list. Convert each MDX frontmatter block to `export const metadata = { title: '…', description: '…' }` with the same strings. Delete the `import { Callout } from 'nextra/components'` lines.
- [ ] **Step 4: Verify**: `npm test` → PASS; `rm -rf out .next && npm run build` → exit 0, no warnings; then the Task 1 phase-3 `compare_text.py` command → 17 × PASS; `python3 scripts/check_routes.py out` → OK (all 18 present).
- [ ] **Step 5: Commit** `refactor: replace Nextra with @next/mdx, Tailwind 4 and nav config`.

---

### Task 3: Site shell, page header, TOC, prev/next

**Files:**
- Create: `components/layout/SiteShell.tsx`, `SiteHeader.tsx`, `Sidebar.tsx`, `SidebarList.tsx`, `MobileNav.tsx`, `ThemeToggle.tsx`; `components/navigation/SectionNav.tsx`; `components/content/PageHeader.tsx`, `PrevNext.tsx`; `lib/outline.ts`; `lib/ui.ts`; `tests/outline.test.ts`; `scripts/check_outline.py`
- Modify: `app/(site)/layout.tsx`, `app/(site)/[group]/[page]/page.tsx`

**Interfaces:**
- Consumes: `lib/nav.ts`, `lib/theme.ts`, `lib/site.ts`.
- `lib/ui.ts`: English UI strings replacing the reference `i18n.ts` (`skipLink`, `partsNav = 'Parts'`, `onThisPage = 'On this page'`, `prevNextNav`, `menuOpen`, `menuClose`, `themeToLight`, `themeToDark`, `footerSummary = '17 parts · Software Testing with AI'`), `partLabel(n: number): string` → `PART 05` (zero-padded to 2).
- `lib/outline.ts`: `type OutlineItem = { id: string; title: string; level: 2 | 3 }`; `getOutline(group: string, slug: string): OutlineItem[]` — reads the MDX file, ignores fenced code, finds every heading line `^\s*#{1,6}\s` in document order, strips Markdown inline syntax for the title, and slugs EVERY heading (levels 1–6, in order) with one `GithubSlugger` instance per page — the same algorithm as `rehype-slug`, so duplicates get `-1` — but returns only levels 2–3.
- `SiteShell({ children })`: reference layout (skip link to `#content`, header, 260 px sticky sidebar ≥ `lg`, `<main id="content">`, footer). Footer: `{footerSummary} · © 2026 <a href={OWNER.url}>kawsar-95</a>`.
- `SiteHeader`: reference header; logo mark text `QA`, wordmark `SITE_NAME`; right side: `searchSlot` (filled in Task 5) and `ThemeToggle`. No language switch, no install button.
- `SidebarList({ activePath, onNavigate? })`: per group a mono label (group title, uppercase via CSS) and items with `partLabel(page.part)` + title; active when `activePath === page.href`; `aria-current="page"`.
- `MobileNav`: reference drawer (focus trap, Escape, body scroll lock) rendering `SidebarList`.
- `PageHeader({ page })`: eyebrow `PART 05 · CONFIGURE` (mono, accent) placed before the article.
- Page layout: reference `TopicPage` grid (content max 680 px, 220 px TOC column ≥ `xl`), `PrevNext` from `getNeighbors` with `partLabel`.
- `scripts/check_outline.py out`: for each page in `scripts/route-map.json` values except `/`, every TOC link `href="#id"` in the built page has a matching element `id`; exit 1 listing mismatches.

- [ ] **Step 1: Write failing tests**: `tests/outline.test.ts` with temp MDX fixtures through an exported `outlineFromSource(source: string): OutlineItem[]`: skips `##` inside ``` fences; duplicate `## Setup` twice → ids `setup`, `setup-1`; `# Hooks` then `## Hooks` → the `##` item id is `hooks-1` and the `#` heading is not returned; `## ⚡ Superpower Mode!` → id equals `new GithubSlugger().slug('⚡ Superpower Mode!')`; `**bold**` and `` `code` `` stripped from titles.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement** the Files list from the reference components (adapt imports; remove `lang`/i18n parameters).
- [ ] **Step 4: Verify**: `npm test` PASS; build exit 0; phase-3 `compare_text.py` → 17 × PASS; `python3 scripts/check_outline.py out` → OK; `python3 scripts/check_links.py out` → OK.
- [ ] **Step 5: Commit** `feat: add reference site shell, page header, TOC and prev/next`.

---

### Task 4: Home page

**Files:**
- Create: `components/pages/HomePage.tsx`
- Modify: `app/(site)/page.tsx`

**Interfaces:**
- Consumes: `GROUPS`, `PAGES`, `partLabel`.
- `HomePage()`: reference `HomePage` structure with the spec's home content: eyebrow `TUTORIAL · 17 PARTS · 4 GROUPS`, H1 `🤖 Software Testing with Claude AI`, lede = the two current sentences from the spec, `CONTENTS` label, per group a mono label and rows (`01`…`17` from `page.part`, title link with full-row hit area, `description`, `→`).
- `app/(site)/page.tsx` metadata: `title: { absolute: 'Software Testing with AI - Complete Tutorial' }`, description = the old landing description (from `.baseline/out/index.html` meta description).

- [ ] **Step 1: Failing check**: `grep -c 'data-home-row' out/index.html` after build → `0` (rows carry `data-home-row`).
- [ ] **Step 2: Implement.**
- [ ] **Step 3: Verify**: build; `grep -c 'data-home-row' out/index.html` → `17`; `grep -o '<title>[^<]*' out/index.html` → `<title>Software Testing with AI - Complete Tutorial`; `python3 scripts/check_links.py out` OK.
- [ ] **Step 4: Commit** `feat: add contents-style home page`.

---

### Task 5: Search

**Files:**
- Create: `lib/search.ts`, `app/search-index.json/route.ts`, `components/navigation/SearchPalette.tsx`, `tests/search.test.ts`
- Modify: `components/layout/SiteHeader.tsx` (search slot), `app/(site)/layout.tsx`

**Interfaces:**
- `lib/search.ts`: `type SearchDoc = { id: string; href: string; part: number; group: string; page: string; title: string; text: string }`; `buildSearchDocs(pages: { page: NavPage; source: string }[]): SearchDoc[]` — one doc for the page intro (text before the first `##`, title = page title, href = page href) and one per `##` section (href `page.href + '#' + id`, ids from the same slugger rules as `lib/outline.ts`); text = MDX source with code fences kept as text, JSX tags and Markdown syntax stripped. `createIndex(docs)` and `runSearch(index, query, limit = 8)` copied from the reference (fields `title`, `page`, `text`; boost `title: 3, page: 1.5`).
- `app/search-index.json/route.ts`: `export const dynamic = 'force-static'`; reads all MDX sources via `PAGES`; returns `buildSearchDocs(...)` JSON.
- `SearchPalette`: reference component; fetches `/search-index.json`; result row shows `partLabel(part)` and page + section title.

- [ ] **Step 1: Write failing tests** `tests/search.test.ts`: built from the real `content/` files: every one of the 17 pages has at least one doc; no doc text contains `import ` or `</`; `runSearch(createIndex(docs), 'hooks')[0].href` starts with `/extend/hooks/`; `runSearch(index, '')` → `[]`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Verify**: `npm test` PASS; build; `python3 -c "import json;d=json.load(open('out/search-index.json'));print(len(d))"` → ≥ 17; every `href` in it resolves (route part) to a built page.
- [ ] **Step 5: Commit** `feat: add MiniSearch search palette`.

---

### Task 6: MDX element styles

**Files:**
- Create: `components/mdx/CodeBlock.tsx` (client: wraps Shiki `<pre>`, language label, `CopyButton`), `components/content/CopyButton.tsx` (reference)
- Modify: `app/globals.css` (`.mdx` element styles), `mdx-components.tsx` (map `pre` → `CodeBlock`)

**Interfaces:**
- Consumes: `.mdx` class on `<article data-content>` (Task 2).
- Styles per the spec's "MDX element styles" table: `h1` (topic title), `h1 + p` (lede), `h2`/`h3` (with `scroll-margin-top: 5rem`), `p`, `ul/ol`, `a`, inline `code`, `.code-block` (reference CSS verbatim, `#22272e`), `table` (reference Table look via CSS on `.mdx table`), `details/summary` (raised box, mono summary, rotating `▸`), `img[src*="mermaid-diagram"]` (480 px cap, centered), `hr`, `blockquote`.
- Language label from Shiki's `data-language`/class on `<pre>`; hidden when the language is `text`.

- [ ] **Step 1: Failing check**: build; `grep -c 'class="code-block' out/extend/hooks/index.html` → `0`.
- [ ] **Step 2: Implement.**
- [ ] **Step 3: Verify**: build; that grep → equals the number of fenced blocks in `content/extend/hooks.mdx` (count ```` ``` ```` pairs); phase-3 `compare_text.py` → 17 × PASS (the copy button text "Copy" is extra text and allowed).
- [ ] **Step 4: Commit** `feat: add reference-style MDX element styles and code blocks`.

---

### Task 7: Metadata, analytics, sitemap, robots, owner credit

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx` (reference style, uses `SiteShell`)
- Modify: `app/layout.tsx`, `docs/superpowers/plans/2026-10-09-nextra-reorganization.md` (remove the previous owner name), any other file `grep` finds

**Interfaces:**
- Consumes: `SITE_URL`, `GA_ID`, `OWNER`, `PAGES`.
- `app/layout.tsx` metadata: `authors: [OWNER]`; if `SITE_URL`: `metadataBase`, `alternates: { canonical: './' }`, `openGraph: { siteName, type: 'website', url: './', images: ['/resources/mermaid-diagram.png'] }`, `twitter: { card: 'summary_large_image' }`. If `GA_ID`: `<GoogleAnalytics gaId={GA_ID} />`.
- `app/sitemap.ts`: `force-static`; `[]` without `SITE_URL`; else `/` + every `PAGES` href (18).
- `app/robots.ts`: `force-static`; allow all; `sitemap` line only with `SITE_URL`.

- [ ] **Step 1: Failing check**: `grep -rni "road to caree[r]" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=out --exclude-dir=.next --exclude-dir=.baseline .` → prints matches.
- [ ] **Step 2: Implement.**
- [ ] **Step 3: Verify**: that grep → no output. Clean build: `grep -c "<loc>" out/sitemap.xml` → 0; `grep -c 'rel="canonical"' out/index.html` → 0; no `googletagmanager` in `out/**/index.html`. Env build (`NEXT_PUBLIC_SITE_URL=https://example.com NEXT_PUBLIC_GA_ID=G-TEST123`): 18 `<loc>`; `G-TEST123` in `out/index.html`; canonical and `og:url` of `out/extend/hooks/index.html` = `https://example.com/extend/hooks/`; `out/robots.txt` has `Sitemap: https://example.com/sitemap.xml`. Finish with a clean build without env vars.
- [ ] **Step 4: Commit** `feat: port SEO metadata and credit kawsar-95`.

---

### Task 8: Browser verification, docs, cleanup

**Files:**
- Modify: `CLAUDE.md` (rewrite for the new stack); `scripts/route-map.json` is read by the checks (no URL changes)

- [ ] **Step 1: Full automated check**: `rm -rf out .next && npm run build` (no warnings) `&& npm test && python3 -m unittest scripts/test_checks.py && python3 scripts/check_routes.py out && python3 scripts/check_links.py out && python3 scripts/check_outline.py out` + phase-3 `compare_text.py` → 17 × PASS.
- [ ] **Step 2: Browser check** (Playwright in the scratch dir; serve `python3 -m http.server 8000 -d out`):
  - Theme: default follows `prefers-color-scheme`; toggle switches and persists across reload; with `localStorage.theme='light'` and dark color scheme, the first paint is light (screenshot right after `domcontentloaded`).
  - Search: `Ctrl+K` opens the dialog, focus in the input; typing `hooks` lists the Hooks page first; Enter navigates; Escape closes and focus returns to the button.
  - Mobile 375 px: menu opens the drawer, Tab stays inside, Escape closes; `scrollWidth <= 375` on `/`, `/configure/structure/`, `/extend/hooks/`.
  - TOC: on `/extend/hooks/` at 1280 px the active TOC item changes after scrolling to a later `##`.
  - Copy button copies the code text.
  - Skip link: first Tab focuses "Skip to content"; Enter moves focus to `#content`.
  - Contrast ≥ 4.5:1 in both themes for body text, dim text, faint text, accent links, sidebar labels.
  - Screenshots: `/` and `/extend/hooks/` in both themes at 1280 px, plus the reference home and topic pages, saved side by side in the scratch dir.
  Fix any failure (styles/markup only, no text changes), rebuild, re-run Step 1.
- [ ] **Step 3: Rewrite `CLAUDE.md`**: stack, commands (`npm run dev`, `npm run build` → `out/`, preview `python3 -m http.server 8000 -d out`, `npm test`), structure (`app/`, `components/`, `lib/nav.ts` as the single source, `content/`), how to add a page (MDX file with `export const metadata` + entry in `lib/nav.ts` + value in `scripts/route-map.json`; all three are required), MDX components and the closing-tag-at-column-0 gotcha, design tokens location and the reference repo link, env vars, check scripts, docs pointers (specs, plans, content audit for phase 2).
- [ ] **Step 4: Commit** `docs: rewrite CLAUDE.md for the editorial shell`.
