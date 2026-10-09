# Phase 1 – Nextra Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the 18-page tutorial site from Next.js Pages Router + Bootstrap to Nextra 4 with MDX content, grouped URLs, and a custom landing page, with no change to tutorial text.

**Architecture:** Nextra's content directory (`content/**/*.mdx`) is rendered by one App Router catch-all route. Folder `_meta.js` files define the four sidebar groups. Python check scripts compare the new static build against a baseline build of the old site, so every port task has an objective pass/fail test.

**Tech Stack:** Next.js 16.4, React 19, Nextra 4.6.1 + nextra-theme-docs 4.6.1, Pagefind 1.5, lucide-react, @next/third-parties, Python 3 stdlib (check scripts).

**Spec:** [docs/superpowers/specs/2026-10-09-nextra-reorganization-design.md](../specs/2026-10-09-nextra-reorganization-design.md)

## Global Constraints

- Tutorial text does not change. Only markup changes. The text check (`scripts/compare_text.py`) is the judge.
- Static export: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`, no `basePath`, no `assetPrefix`.
- If Nextra 4.6.1 fails to build on Next 16, pin `next@15.5.27` and record it in the commit message.
- Primary color `#7B2FF7` = HSL `hue 263, saturation 93`.
- Env vars `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID` are optional. Every build must pass without them.
- No deploy config: no `.github/workflows/`, no `CNAME`.
- No Bootstrap, no Font Awesome, no inline `style={{…}}` in content.
- New URLs come only from `scripts/route-map.json` (Task 1).
- Title template: `%s – Software Testing with AI`.
- Footer text stays: `© 2026 Road to Career.` and `Build reliable, intelligent testing systems with Claude AI`.

## Review Focus

1. **MDX-special characters in prose** (`<YourName>`, `{`, `}`) outside code fences: the build must not fail, and the text must not vanish. Covered by `compare_text.py` in each port task.
2. **Backslashes from JSX template literals** (`C:\\Users\\…` in `.js` source) must render as one `\` in MDX code fences. Covered by `compare_text.py` (it compares rendered text).
3. **Internal links to old flat routes** (`/setup`, `/skills`, …) left in content: they 404 on the new site. Covered by `scripts/check_links.py` in Tasks 3–7 and 9.
4. **Custom components in dark mode:** hard-coded light colors make text unreadable. Covered by the dark-mode screenshot check in Task 9.
5. **Wide tables and code blocks at 375 px:** they must scroll inside their own box, not the page. Covered by the mobile screenshot check in Task 9 (`document.documentElement.scrollWidth <= 375`).

---

### Task 0: Safety net and baseline build

**Files:**
- Modify: `.gitignore` (add `.baseline/`)
- Create: `.baseline/out/` (git-ignored copy of the old build)

**Interfaces:**
- Produces: `.baseline/out/<old-route>/index.html` for all 19 old routes; a git repo with the untouched old site as the first commit.

- [ ] **Step 1: Initialize git and commit the current state**

```bash
git init -b main
printf '.baseline/\n' >> .gitignore
git add -A && git commit -m "chore: snapshot of site before Nextra migration"
```
Expected: one commit. `git status` is clean.

- [ ] **Step 2: Build the old site**

Run: `npm ci && npm run build`
Expected: `out/` exists with `out/index.html` and `out/hooks/index.html`. If the old build fails on Node 26, run it with `npx -y node@20 node_modules/.bin/next build` and note that in the commit message of Task 1.

- [ ] **Step 3: Save the baseline**

Run: `mkdir -p .baseline && cp -r out .baseline/out && ls .baseline/out | wc -l`
Expected: the folder list includes all 18 page folders (`agents`, `ai-systems`, … `superpower`).

---

### Task 1: Check scripts and route map

**Files:**
- Create: `scripts/route-map.json`
- Create: `scripts/checks.py` (shared helpers)
- Create: `scripts/compare_text.py`, `scripts/check_routes.py`, `scripts/check_links.py` (thin CLIs)
- Test: `scripts/test_checks.py`

**Interfaces:**
- Produces:
  - `scripts/route-map.json`: object, old route → new route, 19 entries:
    `"/"→"/"`; `setup, models, modes` → `/getting-started/<name>/`; `ai-systems, prompt, context, principles` → `/foundations/<name>/`; `structure, claude-md, memory, commands` → `/configure/<name>/`; `skills, agents, hooks, mcp, superpower, marketplace` → `/extend/<name>/`. Keys and values end with `/`.
  - `checks.extract_text(html: str, root: str) -> list[str]` — words of the visible text inside the first element that matches `root`. `root` is `"class=main-content"` (old) or `"attr=data-pagefind-body"` (new). Skips `script`, `style`, `button`, `svg`. Splits on white space.
  - `checks.missing_runs(old_words: list[str], new_words: list[str]) -> list[str]` — the old word runs that `difflib.SequenceMatcher(autojunk=False)` marks as `delete` or `replace`, each joined with spaces.
  - `checks.route_file(out_dir: str, route: str) -> pathlib.Path` — `out_dir/route/index.html`.
  - `checks.broken_links(out_dir: str) -> list[tuple[str, str]]` — `(page_file, href)` for each `href`/`src` that starts with `/`, is not under `/_next/` or `/_pagefind/`, and does not resolve (after removing `#…` and `?…`) to a file or to `<path>/index.html` in `out_dir`.
  - CLI: `python3 scripts/compare_text.py --old .baseline/out --new out [old-route …]` (no routes = all 19). Prints `PASS <route>` or `FAIL <route>` plus the missing runs; exit 1 if any route fails or the new file is missing.
  - Flag `--same-layout`: the new side uses the old root and the old routes. Used only for the Task 1 sanity check.
  - CLI: `python3 scripts/check_routes.py out` — prints each missing new route; exit 1 if any.
  - CLI: `python3 scripts/check_links.py out` — prints each broken link; exit 1 if any.
  - New-build root fallback: if no element has `data-pagefind-body`, `compare_text.py` uses `tag=article`. The implementer confirms which one Nextra emits in Task 2 and keeps only the one that works.

- [ ] **Step 1: Write the failing tests** in `scripts/test_checks.py` (`unittest`, fixtures written to `tempfile.TemporaryDirectory`):
  - `test_extract_text_reads_only_root`: `<div class="main-content"><p>Hello <b>QA</b></p><button>Copy</button></div><footer>x</footer>` → `["Hello", "QA"]`.
  - `test_missing_runs_empty_when_new_has_extra_text`: old `["a","b"]`, new `["intro","a","b","next"]` → `[]`.
  - `test_missing_runs_reports_dropped_paragraph`: old `["a","b","c","d"]`, new `["a","d"]` → `["b c"]`.
  - `test_route_map_has_19_unique_targets`: load JSON → 19 keys, 19 distinct values, all end with `/`.
  - `test_broken_links_finds_missing_page`: `out/index.html` links `/setup/` and `/getting-started/setup/#x`; only `out/getting-started/setup/index.html` exists → `[("index.html", "/setup/")]` (page path relative to `out`).

- [ ] **Step 2: Run the tests to verify they fail**

Run: `python3 -m unittest scripts/test_checks.py -v`
Expected: FAIL / ERROR (`ModuleNotFoundError: checks`).

- [ ] **Step 3: Implement `scripts/checks.py`, the three CLIs, and `scripts/route-map.json`** with `html.parser.HTMLParser` (stdlib only).

- [ ] **Step 4: Run the tests to verify they pass**

Run: `python3 -m unittest scripts/test_checks.py -v`
Expected: 5 tests, OK.

- [ ] **Step 5: Sanity-check against the baseline**

Run: `python3 scripts/compare_text.py --old .baseline/out --new .baseline/out --same-layout`
Expected: 19 × `PASS`. (`--same-layout` reads the new side with the old root and the old routes; it exists only for this sanity check.)

- [ ] **Step 6: Commit**

```bash
git add scripts/ && git commit -m "test: add text, route and link check scripts for migration"
```

---

### Task 2: Nextra skeleton, old theme and dead files removed

**Files:**
- Move: `pages/` → `legacy/pages/`, `components/Layout.js` and `components/Sidebar.js` → `legacy/components/` (port source; deleted in Task 9)
- Delete: `styles/`, `styles.css`, `script.js`, `resources/`, `scripts/fix-pre-colors.py`, `.superpowers/`, `.github/`, `public/googlec85fd345958cb9c8.html`, `public/robots.txt`, `public/sitemap.xml`, `next.config.js`
- Create: `next.config.mjs`, `app/layout.jsx`, `app/[[...mdxPath]]/page.jsx`, `mdx-components.js`, `content/_meta.js`, `content/index.mdx` (stub)
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Produces:
  - `mdx-components.js`: `export function useMDXComponents(components?: object): object` — returns `{ ...nextraThemeComponents, ...customComponents, ...components }`. Later tasks add custom components here.
  - `content/_meta.js`: `export default { index: { title: 'Home', display: 'hidden', theme: { layout: 'full', toc: false, sidebar: false, breadcrumb: false, pagination: false, timestamp: false } } }`. Port tasks add `'getting-started': 'Getting Started'`, `foundations: 'Foundations'`, `configure: 'Configure'`, `extend: 'Extend'` in this order.
  - `app/layout.jsx`: root layout with `Head color={{ hue: 263, saturation: 93 }}`, `Navbar logo={<b>Software Testing with AI</b>}` (no `projectLink`), `Footer` with the two footer lines, `editLink={null}`, `feedback={{ content: null }}`, `pageMap={await getPageMap()}`, `import 'nextra-theme-docs/style.css'`. Exported `metadata`: `title: { default: 'Software Testing with AI', template: '%s – Software Testing with AI' }`, default description from the spec, `authors: [{ name: 'Road to Career' }]`.
  - `app/[[...mdxPath]]/page.jsx`: the standard Nextra 4 catch-all (`generateStaticParamsFor('mdxPath')`, `importPage`, `generateMetadata` returning the page `metadata`, rendering through `useMDXComponents().wrapper`).

- [ ] **Step 1: Write the failing check**

Run: `python3 scripts/check_routes.py out` after `rm -rf out`
Expected: FAIL, 19 routes missing.

- [ ] **Step 2: Move the port source and delete the dead files** (list above). Then set dependencies:

```bash
npm uninstall bootstrap
npm install next@16.4.0 react@19 react-dom@19 nextra@4.6.1 nextra-theme-docs@4.6.1
npm install -D pagefind@1.5.2
```

- [ ] **Step 3: Create the skeleton files** listed in Files with the Interfaces above. `next.config.mjs` wraps the Global Constraints config with `nextra({})`. `content/index.mdx` contains only `# Software Testing with Claude AI` for now.

- [ ] **Step 4: Build and verify**

Run: `npm run build && ls out/index.html && python3 scripts/check_routes.py out`
Expected: build OK; `out/index.html` exists; `check_routes.py` lists exactly the 18 page routes as missing (`/` is present). Open `out/index.html` and confirm whether the content root has `data-pagefind-body` or is `<article>`; remove the unused branch from `compare_text.py`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "refactor: replace Pages Router and Bootstrap theme with Nextra skeleton"
```

---

### Task 3: Shared MDX components and landing page

**Files:**
- Create: `components/mdx/CardGrid.jsx`, `components/mdx/InfoCard.jsx`, `components/mdx/mdx.css`
- Create: `components/landing/Hero.jsx`, `components/landing/TopicCards.jsx`, `components/landing/topics.js`, `components/landing/landing.css`
- Modify: `mdx-components.js` (register `CardGrid`, `InfoCard`), `app/layout.jsx` (import the two CSS files), `content/index.mdx`
- Modify: `package.json` (add `lucide-react@1.54.0`)

**Interfaces:**
- Consumes: `useMDXComponents` (Task 2), `scripts/route-map.json` (Task 1) for every `href`.
- Produces:
  - `CardGrid({ cols = 2, children })` — responsive grid: `cols` columns at ≥ 768 px, 1 column below.
  - `InfoCard({ title, subtitle?, children })` — bordered content card. All colors come from CSS variables with a `html.dark` override. No inline styles.
  - `Hero({ title, subtitle, ctaHref, ctaLabel })`.
  - `TopicCards({ groups })` where `groups: { title: string, items: { href: string, icon: string, title: string, text: string }[] }[]`; `icon` is a lucide-react export name (for example `'Download'`).
  - `topics.js`: `export const TOPIC_GROUPS` — the four groups from the spec's sidebar table, card titles and texts copied verbatim from `legacy/pages/index.js`.

- [ ] **Step 1: Write the failing check**

Run: `npm run build && python3 scripts/compare_text.py --old .baseline/out --new out /`
Expected: FAIL `/` (hero, overview and card text missing).

- [ ] **Step 2: Implement the components** with the Interfaces above.

- [ ] **Step 3: Write `content/index.mdx`**: frontmatter `title` and `description` from `legacy/pages/index.js` (`PAGE_TITLE`, `PAGE_DESCRIPTION`); `<Hero>` with the old hero text and `ctaHref="/getting-started/setup/"`; the overview heading and intro text; `<TopicCards groups={TOPIC_GROUPS} />`; any other old landing sections as Markdown in the old order.

- [ ] **Step 4: Verify**

Run: `npm run build && python3 scripts/compare_text.py --old .baseline/out --new out / && python3 scripts/check_links.py out`
Expected: `PASS /`. `check_links.py` reports only links to the 18 not-yet-ported pages (they are ported in Tasks 4–7).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add landing page and shared MDX card components"
```

---

### Tasks 4–7: Port one sidebar group each

Each of these four tasks follows the same steps. Only the group differs.

| Task | Folder | `_meta.js` order and labels (from the old sidebar) | Old routes |
|---|---|---|---|
| 4 | `content/getting-started/` | `setup: 'Install Claude'`, `models: 'Claude Models'`, `modes: 'Plan vs Act Mode'` | `/setup/ /models/ /modes/` |
| 5 | `content/foundations/` | `'ai-systems': 'AI Systems'`, `prompt: 'Prompt Engineering'`, `context: 'Context Engineering'`, `principles: 'Key Principles'` | `/ai-systems/ /prompt/ /context/ /principles/` |
| 6 | `content/configure/` | `structure: 'Claude Architecture'`, `'claude-md': 'CLAUDE.md'`, `memory: 'Memory'`, `commands: 'Commands'` | `/structure/ /claude-md/ /memory/ /commands/` |
| 7 | `content/extend/` | `skills: 'Skills'`, `agents: 'Agents'`, `hooks: 'Hooks'`, `mcp: 'MCP Server'`, `superpower: '⚡ Superpower'`, `marketplace: 'Marketplaces'` | `/skills/ /agents/ /hooks/ /mcp/ /superpower/ /marketplace/` |

**Files (per task):**
- Create: `content/<group>/_meta.js`, one `content/<group>/<name>.mdx` per page
- Modify: `content/_meta.js` (add the group entry)
- Source: `legacy/pages/<name>.js`

**Interfaces:**
- Consumes: `CardGrid`, `InfoCard` (Task 3); `Callout` from `nextra/components`; `scripts/route-map.json`.

**Port rules** (apply the spec's markup mapping table):
- Frontmatter: `title` = the old `Layout` `title` prop without the ` - Software Testing with AI` suffix; `description` = the old `description` prop.
- The old top `<h2>` of the page becomes the page `#` heading. Lower headings shift up one level.
- Code blocks: fenced, with a language tag (`bash`, `json`, `markdown`, `yaml`, `js`, or `text` for directory trees). Replace each `\\` from JSX template literals with `\`.
- `.code-block`/`.highlight`/note boxes → `<Callout>` (`type="info"` default, `"warning"` for warning boxes).
- Card grids → `<CardGrid cols={N}>` + `<InfoCard>`.
- Bootstrap tables → Markdown tables (same column and row order).
- Accordions (`agents`, `hooks`, `skills`) → `<details><summary>…</summary>` with the body as Markdown.
- Escape prose `<` as `&lt;` and `{`/`}` as `\{`/`\}` outside code.
- Internal links use the new route from `route-map.json`. The structure page image uses `/resources/mermaid-diagram.png`.

- [ ] **Step 1: Write the failing check**

Run: `npm run build && python3 scripts/compare_text.py --old .baseline/out --new out <old routes of this group>`
Expected: FAIL for each route (new file missing).

- [ ] **Step 2: Port each page** with the port rules. Add the group `_meta.js` and the group entry in `content/_meta.js`.

- [ ] **Step 3: Verify**

Run: `npm run build && python3 scripts/compare_text.py --old .baseline/out --new out <old routes of this group> && python3 scripts/check_links.py out`
Expected: `PASS` for each route of this group. `check_links.py` reports only links to groups not yet ported (none after Task 7). `grep -rn "style=\|className=\|fa-" content/<group>/` returns nothing.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: port <Group> pages to MDX"
```

---

### Task 8: Metadata, analytics, sitemap, robots and search

**Files:**
- Create: `lib/site.js`, `app/sitemap.js`, `app/robots.js`
- Modify: `app/layout.jsx`, `package.json` (`postbuild` script; add `@next/third-parties@16.4.0`)

**Interfaces:**
- Consumes: `getPageMap()` from `nextra/page-map`.
- Produces:
  - `lib/site.js`: `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null` and `export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || null`.
  - `lib/site.js`: `export async function allRoutes(): Promise<string[]>` — every MDX page route from the page map, with a trailing `/` (19 routes).
  - `app/layout.jsx` metadata: if `SITE_URL`, set `metadataBase: new URL(SITE_URL)`, `alternates: { canonical: './' }`, `openGraph: { siteName: 'Software Testing with AI', type: 'website', images: ['/resources/mermaid-diagram.png'] }`. If `GA_ID`, render `<GoogleAnalytics gaId={GA_ID} />` from `@next/third-parties/google`.
  - `app/sitemap.js`: `export const dynamic = 'force-static'`; returns `[]` if no `SITE_URL`, else one entry per `allRoutes()` route as `SITE_URL + route`.
  - `app/robots.js`: `export const dynamic = 'force-static'`; allows all; adds `sitemap: SITE_URL + '/sitemap.xml'` only if `SITE_URL`.
  - `package.json`: `"postbuild": "pagefind --site .next/server/app --output-path out/_pagefind"` (the path from the Nextra 4 search docs for static export; if the index is empty, use `--site out`).

- [ ] **Step 1: Write the failing checks**

Run: `npm run build && grep -c "<loc>" out/sitemap.xml; ls out/_pagefind`
Expected: FAIL (no `out/sitemap.xml`, no `out/_pagefind`).

- [ ] **Step 2: Implement** the Interfaces above.

- [ ] **Step 3: Verify without env vars**

Run: `rm -rf out .next && npm run build && grep -c "<loc>" out/sitemap.xml; grep -l "googletagmanager" -r out --include=index.html | wc -l; grep -c 'rel="canonical"' out/index.html; ls out/_pagefind/pagefind.js`
Expected: `0`, `0`, `0`, and the Pagefind file exists.

- [ ] **Step 4: Verify with env vars**

Run: `rm -rf out .next && NEXT_PUBLIC_SITE_URL=https://example.com NEXT_PUBLIC_GA_ID=G-TEST123 npm run build && grep -c "<loc>" out/sitemap.xml && grep -c "G-TEST123" out/index.html && grep -o 'rel="canonical" href="[^"]*"' out/extend/hooks/index.html`
Expected: `19`; at least `1`; `href="https://example.com/extend/hooks/"`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add env-based SEO metadata, analytics, sitemap and Pagefind search"
```

---

### Task 9: Final cleanup, docs and full verification

**Files:**
- Delete: `legacy/`, `.baseline/` (after Step 3 passes)
- Modify: `CLAUDE.md` (full rewrite)

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Full automated check**

Run: `rm -rf out .next && npm run build && python3 scripts/check_routes.py out && python3 scripts/compare_text.py --old .baseline/out --new out && python3 scripts/check_links.py out && python3 -m unittest scripts/test_checks.py`
Expected: no missing routes, 19 × `PASS`, no broken links, tests OK. The build log has no lines from Nextra that start with `warn` or `⚠`.

- [ ] **Step 2: Browser check** (serve with `python3 -m http.server 8000 -d out`; use Playwright via `npx -y playwright@1 screenshot` or the `run` skill)
  - Desktop 1280 px: landing page, `/extend/hooks/` (sidebar groups, copy button on a code block, prev/next links).
  - Mobile 375 px: landing and `/configure/structure/`; `document.documentElement.scrollWidth <= 375` on both.
  - Dark mode (`colorScheme: 'dark'`): `/extend/hooks/` — `InfoCard` text is readable.
  - Search: type `hooks` in the search box on `/` → the Hooks page is a result.
  - Logo link on `/extend/hooks/` goes back to `/`.

Expected: all items OK. Save screenshots to the scratchpad and fix any failure before Step 3.

- [ ] **Step 3: Rewrite `CLAUDE.md`** for the new structure: stack (Next 16 + Nextra 4, static export), `npm run dev` / `npm run build` (output `out/`), `content/` layout and `_meta.js` groups, how to add a page (MDX file + `_meta.js` entry + `scripts/route-map.json` if it replaces an old route), custom MDX components, the two optional env vars, the check scripts, and the pointers to `docs/superpowers/` (spec, plan, content audit for phase 2). Remove all mentions of `index.html`, `styles.css`, `script.js`, and the `.txt` source file.

- [ ] **Step 4: Remove the port sources**

Run: `rm -rf legacy .baseline && npm run build && python3 scripts/check_routes.py out`
Expected: build OK, no missing routes.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "docs: rewrite CLAUDE.md for Nextra structure; remove legacy sources"
```
