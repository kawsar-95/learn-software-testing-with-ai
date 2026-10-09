# Phase 2 – Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the tutorial into 17 pages / 5 groups, rewrite every page from current cited sources with a separate fact-check, and add the meta line + sources, richer callouts/cards, home polish, and reading aids.

**Architecture:** UI pieces first (MDX components + a `page` export per MDX file read by the page route), then the new `lib/nav.ts` and file skeletons, then content per group through research → write → fact-check agents, then audit coverage, docs, and browser checks.

**Tech Stack:** Existing: Next.js 16 + Tailwind 4 + `@next/mdx` + MiniSearch, Node `--test`, Python 3 check scripts. Research: WebFetch/WebSearch, local `claude` CLI 2.1.294 (`claude --help`, `claude mcp --help`, `claude plugin --help`).

**Spec:** [docs/superpowers/specs/2026-10-10-content-refresh-design.md](../specs/2026-10-10-content-refresh-design.md)

## Global Constraints

- 17 pages, 5 groups, slugs exactly as the spec's "New structure" table; 18 routes with `/`.
- Sources: official first (code.claude.com/docs, platform.claude.com/docs, modelcontextprotocol.io, playwright.dev, github.com repos of named tools), then primary (vendor docs, ISTQB/ASTQB). No blogs, forums, AI summaries.
- Every changed/new factual claim (version, command, flag, path, price, limit, behavior) has a `<Cite n>` to a source in that page's `page.sources`.
- A page is done only when its fact-check report has 0 open FAILs.
- Research notes: `docs/superpowers/research/<group>-<slug>.md`; fact-check reports: `docs/superpowers/research/<group>-<slug>.factcheck.md`.
- MDX page template (order fixed):
  ```mdx
  export const metadata = { title: '…', description: '…' }
  export const page = { updated: '2026-10-10', sources: [ { title, publisher, url, accessed } ] }

  # Title

  Lede paragraph (one paragraph).

  <PageMeta />

  ## First section
  ```
- Callout types: `note`, `tip`, `warning`, `danger` (`info` → `note`, `error` → `danger` aliases); optional `title`.
- MDX gotcha: when a component body ends in a Markdown list, the closing tag goes at column 0.
- No inline `style` in MDX. All text ≥ 4.5:1 in both themes. Owner credit `kawsar-95` only.
- Static export, no basePath, env vars optional — unchanged.
- Commit trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; branch `feat/content-refresh`; never push.

## Review Focus

1. **Plausible but wrong facts** (a flag, path, price, or behavior that reads right but the source does not say) — covered by the per-claim fact-check (Tasks 4–8) and its 0-FAIL gate.
2. **Cites that point at the wrong source** (`[3]` next to a fact that source 3 does not support) — the fact-check verifies the claim against the cited source number, not any source.
3. **Lost QA value in merges** (useful examples from old pages dropped silently) — each content task lists, per merged old page, which sections were kept, rewritten, or dropped and why (in the research notes).
4. **Meta line / sources markup drifting from the check script** — covered by `check_sources.py` fixtures (Task 1) and the real build (Task 9).
5. **Reading aids on short pages / keyboard users** (back-to-top never appears on short pages; focus target) — covered by browser checks (Task 9).

---

### Task 1: UI components, `page` export, `check_sources.py`

**Files:**
- Create: `lib/page.ts`, `components/content/MetaLine.tsx`, `components/content/Sources.tsx`, `components/mdx/Cite.tsx`, `scripts/check_sources.py`, `tests/page.test.ts`
- Modify: `components/mdx/Callout.tsx`, `components/mdx/InfoCard.tsx`, `mdx-components.tsx`, `app/(site)/[group]/[page]/page.tsx`, `app/globals.css`, `scripts/test_checks.py`

**Interfaces:**
- `lib/page.ts`: `type Source = { title: string; publisher: string; url: string; accessed: string }`; `type PageInfo = { updated: string; sources: Source[] }`; `formatUpdated(iso: string): string` → `"Oct 2026"`; `editUrl(group: string, slug: string): string` → `https://github.com/kawsar-95/learn-software-testing-with-ai/blob/main/content/<group>/<slug>.mdx`; `const REPO_URL`.
- Page route: imports `{ default, metadata, page }` from the MDX module; renders `<MDXContent components={{ PageMeta: () => <MetaLine …/> }} />`; renders `<Sources sources={page.sources} />` before `PrevNext` when `page` exists. A page without `page` export (until Tasks 4–8) renders no meta line and no sources and must still build.
- `MetaLine({ sections, sources, updated, editHref })`: element with `data-page-meta`, mono line `{sections} sections · {sources} sources · updated {formatUpdated} · Suggest an edit` (link). `sections` = number of level-2 items from `getOutline`.
- `Cite({ n })`: `<sup><a class="cite" href={`#src-${n}`} aria-label={`Source ${n}`}>[{n}]</a></sup>`; reference `a.cite` style.
- `Sources({ sources })`: `<section aria-labelledby="sources">` with `<h2 id="sources">Sources</h2>` and `<ol>`; item `k` has `id="src-k"`, title link (`https`), publisher, `accessed {date}`. The `sources` heading is not part of the TOC outline.
- `Callout({ type = 'note', title?, children })`: types per Global Constraints; inline SVG icon per type (`aria-hidden`); `title` bold.
- `InfoCard({ title, subtitle?, tone?, children })`: `tone` adds ✓/✗ marker with visually-hidden "Do"/"Don't" and a 2 px top border (`--good` / `--danger`).
- `scripts/check_sources.py out [--routes …]`: for each content route (route-map values except `/`): exactly one `[data-page-meta]` containing an `updated` text; ≥ 1 `li[id^="src-"]`; every `a.cite` href `#src-k` exists; every `src-k` is cited at least once; every source link is `https://`. Exit 1 with a list of problems. `--allow-missing` skips pages without a meta line (used until Task 8).

- [ ] **Step 1: Write failing tests**: `tests/page.test.ts` (`formatUpdated('2026-10-10') === 'Oct 2026'`; `editUrl('extend','hooks')` exact URL). `scripts/test_checks.py`: `test_check_sources_ok`, `test_check_sources_unknown_cite`, `test_check_sources_uncited_source`, `test_check_sources_http_link`, `test_check_sources_missing_meta` (fixtures).
- [ ] **Step 2:** `npm test` and the Python suite → new tests FAIL.
- [ ] **Step 3: Implement.** Do not change any `content/` file in this task; the components are verified by the unit tests, the fixtures, and a clean build.
- [ ] **Step 4: Verify**: tests PASS; build clean; `check_routes`, `check_links`, `check_outline` pass; `python3 scripts/check_sources.py out --allow-missing` → OK.
- [ ] **Step 5: Commit** `feat: add page meta line, citations, sources list, richer callouts and cards`.

---

### Task 2: Restructure — nav, routes, file skeletons

**Files:**
- Modify: `lib/nav.ts`, `tests/nav.test.ts`, `tests/search.test.ts` (if it pins pages), `scripts/route-map.json`, `scripts/test_checks.py`, `CLAUDE.md` (structure table only)
- Create/Move/Delete under `content/`: per the spec table

**Interfaces:**
- `lib/nav.ts`: `GroupSlug` adds `'automate'`; `NavPage` adds `tagline: string` (fill with `''` here; Task 3 writes them). Order, titles, slugs = spec table.
- `scripts/route-map.json`: identity map of the 18 new routes (`"/x/y/": "/x/y/"`).
- Merged pages (skeleton): the new file contains the old pages' MDX bodies concatenated in the "From" order, under the new `#` title, old `#` titles demoted to `##`; one `metadata` block (new title; description from the first source page); no `page` export yet. Old files deleted.
- New pages (`test-design`, `headless`, `github-actions`, `playwright`): skeleton with `metadata`, `# Title`, one lede sentence, one `## Overview` heading.
- `scripts/test_checks.py`: replace the hard-coded `18` with `len(content mdx files) + 1`.

- [ ] **Step 1: Failing tests**: update `tests/nav.test.ts` pinned order to the spec table (17 slugs in order, 5 groups) → FAIL.
- [ ] **Step 2: Implement.**
- [ ] **Step 3: Verify**: `npm test`, Python suite, build clean, `check_routes`, `check_links`, `check_outline`, `check_sources --allow-missing` pass.
- [ ] **Step 4: Commit** `refactor: restructure pages into 5 groups with merged skeletons`.

---

### Task 3: Home polish and reading aids

**Files:**
- Create: `components/content/ReadingProgress.tsx`, `components/content/BackToTop.tsx`
- Modify: `lib/nav.ts` (taglines), `components/pages/HomePage.tsx`, `app/(site)/[group]/[page]/page.tsx`, `app/globals.css`

**Interfaces:**
- Taglines: one short italic line per page (≤ 8 words, plain, no claims needing a source), e.g. "from zero to a working CLI".
- Home: eyebrow from data `TUTORIAL · 17 PARTS · 5 GROUPS`; group labels `{TITLE} · {n} PARTS`; `START HERE` strip with links to `/getting-started/setup/`, `/getting-started/permission-modes/`, `/foundations/how-claude-code-works/` showing `PART 01`, `PART 03`, `PART 04`; rows show the tagline under the title.
- `ReadingProgress`: client; 2 px fixed bar under the header, width = article scroll progress (0–100 %), `aria-hidden`, `transition: none` under reduced motion.
- `BackToTop`: client; rendered when `scrollY > innerHeight`, otherwise not in the DOM; button "↑ Top"; on click scrolls to top (instant under reduced motion) and focuses `#content`.

- [ ] **Step 1: Failing check**: build; `grep -o 'START HERE' out/index.html | wc -l` → 0.
- [ ] **Step 2: Implement.**
- [ ] **Step 3: Verify**: build; `grep -o 'START HERE' out/index.html | wc -l` ≥ 1; `grep -o '<li[^>]*data-home-row' out/index.html | wc -l` → 17; a unit test in `tests/nav.test.ts` asserts 17 non-empty taglines of ≤ 8 words; all checks pass.
- [ ] **Step 4: Commit** `feat: add home taglines, start-here strip, reading progress and back-to-top`.

---

### Tasks 4–8: Content per group (research → write → fact-check)

| Task | Group | Pages |
|---|---|---|
| 4 | Getting Started | setup, models, permission-modes |
| 5 | Foundations | how-claude-code-works, prompting, test-design, principles |
| 6 | Configure | claude-md, settings |
| 7 | Extend | skills, subagents, hooks, mcp, plugins |
| 8 | Automate | headless, github-actions, playwright |

Roles (separate agents, dispatched by the controller; the writer never fact-checks its own page):

**Research (per group; may run before the task, in parallel with other groups' research):**
- Input: the group's current skeleton MDX, the matching rows of the 2026-10-09 audit, the spec's source rules.
- Output per page: `docs/superpowers/research/<group>-<slug>.md` with:
  - `## Sources` — `S1. Title — Publisher — https://url — accessed 2026-10-10` (only sources actually fetched).
  - `## Claims` — table `# | Claim | Exact value or short quote | Source (S-id) | Notes`.
  - `## Old content` — for each section of the skeleton: keep / rewrite / drop + reason (QA examples kept where still correct).
  - `## Page outline` — proposed `##`/`###` headings with the QA angle.
  - CLI claims also checked against local `claude … --help` output (quote it, source = official doc).

**Write (per group, the task implementer):**
- Rewrites each page from its notes only, using the Global Constraints template; every claim from the notes that appears in the page carries `<Cite n>`; `page.sources` = the notes' sources actually cited, in first-cite order; `updated: '2026-10-10'`; uses `Callout` types/titles and `InfoCard tone` where they help (wrong vs right examples).
- Keeps the tutorial voice: QA/SDET examples, short sections, runnable commands.

**Fact-check (per group, separate agent, read-only on content):**
- For each page: re-fetch each cited source; for every factual sentence/command in the page, record `Claim | Location (heading) | Cite | Verdict PASS/FAIL/UNCITED | Evidence (quote) | Fix`. Writes `docs/superpowers/research/<group>-<slug>.factcheck.md` ending with `Open FAILs: N`.
- Any FAIL/UNCITED goes back to the writer; the fact-checker re-checks only the changed claims; repeat until 0.

**Task verification (after fact-check reaches 0):**
- Build clean; all tests; `check_routes`, `check_links`, `check_outline`; `python3 scripts/check_sources.py out --routes <this group's routes>` → OK.
- Commit `feat(content): refresh <Group> pages with cited sources` (notes + reports + MDX together).

---

### Task 9: Audit coverage, docs, browser checks

**Files:**
- Modify: `docs/superpowers/audits/2026-10-09-content-audit.md` (add `## Resolution (2026-10-10)` table), `CLAUDE.md`

- [ ] **Step 1:** Audit resolution table: every High/Med row → `fixed` (new page + section) or `obsolete` (reason). Missing-topics list → page that covers each.
- [ ] **Step 2:** `python3 scripts/check_sources.py out` (no `--allow-missing`) → OK for all 17 pages; all other checks and tests pass; build clean.
- [ ] **Step 3: Browser (Playwright, scratch dir):** callout (4 types, with title) and tone-card text ≥ 4.5:1 in both themes; progress bar width changes with scroll, no transition under reduced motion; back-to-top absent at top, present after 1 viewport, click → top and focus on `#content`; home START HERE + taglines visible; `scrollWidth <= 375` on `/`, `/extend/hooks/`, `/automate/github-actions/`, `/foundations/test-design/`; `[k]` cite click lands on its source; no console errors. Screenshots light/dark of `/`, `/extend/hooks/`.
- [ ] **Step 4:** CLAUDE.md: new structure table, page template (metadata + page export + `<PageMeta />`), Cite/Sources, Callout types, InfoCard tone, research/fact-check workflow and file locations, `check_sources.py`.
- [ ] **Step 5: Commit** `docs: resolve content audit and document the content workflow`.
