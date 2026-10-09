# Design Spec: Phase 2 – Content Refresh, Restructure, and UI Additions
**Date:** 2026-10-10
**Status:** Draft – waiting for review
**Branch:** `feat/content-refresh` (from `feat/editorial-redesign`)

## Summary

Re-audit every tutorial page against current official and primary sources on the internet, fix all outdated or wrong facts, restructure the pages (merges, renames, a new "Automate" group), and add missing topics. Every changed fact gets a source and is fact-checked by a separate agent. Add four UI features: a page meta line with citations and a sources list, richer callouts and do/don't cards, home page polish, and reading aids.

Input: [content audit 2026-10-09](../audits/2026-10-09-content-audit.md) (70+ findings). The audit is re-checked against live sources; it is a starting list, not the source of truth.

## Decisions

| Topic | Decision |
|---|---|
| Content scope | Fix all outdated facts, apply merges/renames, add new pages (CI/headless, GitHub Actions, Playwright, test design). |
| Sources | Official first (code.claude.com/docs, platform.claude.com/docs, modelcontextprotocol.io, playwright.dev, github.com repos of the tools named), then primary sources (vendor docs, standards bodies such as ISTQB/ASTQB for test design). No blogs, forums, or AI-generated summaries as sources. |
| Citations | Every changed or new factual claim (versions, commands, flags, paths, prices, limits, behaviors) has a numbered source on its page. |
| Fact-check | A separate agent verifies each page's claims against the cited sources; a page is done only with 0 open FAILs. CLI flags are also checked against the locally installed `claude --help` (version 2.1.294 at spec time). |
| Research notes | Kept in the repo: `docs/superpowers/research/<group>-<slug>.md`. |
| Page count | 17 pages in 5 groups + home (18 routes). |
| URLs | New slugs below. No redirects (the site is not live at these URLs yet). |
| Credit | `kawsar-95` only (unchanged). |

## New structure

| # | Group (`slug`) | Page title | Slug | From |
|---|---|---|---|---|
| 1 | Getting Started (`getting-started`) | Install Claude Code | `setup` | setup |
| 2 | | Claude Models | `models` | models |
| 3 | | Permission Modes | `permission-modes` | modes (replaced) + autonomy parts of superpower/principles |
| 4 | Foundations (`foundations`) | How Claude Code Works | `how-claude-code-works` | ai-systems + context (merged) |
| 5 | | Prompting for QA | `prompting` | prompt |
| 6 | | Test Design with Claude | `test-design` | new (test-design skill content from skills + techniques) |
| 7 | | Key Principles | `principles` | principles (trimmed) |
| 8 | Configure (`configure`) | CLAUDE.md & Memory | `claude-md` | claude-md + memory (merged) |
| 9 | | Settings & the .claude Folder | `settings` | structure (replaced) |
| 10 | Extend (`extend`) | Skills & Commands | `skills` | skills + commands (merged) |
| 11 | | Subagents | `subagents` | agents |
| 12 | | Hooks | `hooks` | hooks (rewritten) |
| 13 | | MCP Servers | `mcp` | mcp |
| 14 | | Plugins & Marketplaces | `plugins` | superpower + marketplace (merged) |
| 15 | Automate (`automate`) | Headless & CI | `headless` | new |
| 16 | | GitHub Actions | `github-actions` | new |
| 17 | | Browser Testing with Playwright | `playwright` | new |

Removed slugs: `modes`, `ai-systems`, `context`, `prompt`, `structure`, `memory`, `commands`, `agents`, `superpower`, `marketplace`.

Each page keeps the QA/SDET angle of the tutorial: examples use test automation, bug analysis, requirement review, and the existing `qa-agent` / `sdet-agent` / Jira MCP / DB MCP scenario where it still fits current practice.

## UI additions

### 1. Page meta line, citations, sources
- MDX files export `page`: `export const page = { updated: 'YYYY-MM-DD', sources: Source[] }` with `type Source = { title: string; publisher: string; url: string; accessed: 'YYYY-MM-DD' }` (type in `lib/page.ts`).
- Under the lede (the first paragraph after the `#` title): mono line `{n} sections · {m} sources · updated {Mon YYYY} · Suggest an edit`. `n` = number of `##` headings; `m` = `sources.length`.
- `<Cite n={k} />` (registered MDX component) renders a small `[k]` link to `#src-k` in the reference's citation style (`a.cite`); `k` is 1-based into `sources`.
- Sources section at the page bottom, before prev/next, in the reference `Sources` style: heading "Sources", numbered list with `id="src-k"`, title (linked), publisher, "accessed {date}".
- "Suggest an edit" links to `https://github.com/kawsar-95/learn-software-testing-with-ai/blob/main/content/<group>/<slug>.mdx`.

### 2. Callouts and cards
- `Callout` types: `note` (accent), `tip` (good), `warning` (warn), `danger` (danger); optional `title` prop rendered bold before the body; a small inline SVG icon per type (decorative, `aria-hidden`). Existing `info` is an alias of `note`. Style: reference callout (10 px radius, 3 px left border, 8 % tint).
- `InfoCard` gets `tone?: 'good' | 'bad'`: a ✓ / ✗ marker before the title (marker text has an accessible label "Do" / "Don't") and a 2 px top border in `--good` / `--danger`. Without `tone`, unchanged.
- All text in callouts and cards ≥ 4.5:1 in both themes.

### 3. Home page polish
- `NavPage` gets `tagline: string` (italic Fraunces line under the title on the home page, reference style). Taglines are new text, written in `lib/nav.ts`, reviewed with the content.
- Group labels show counts: `GETTING STARTED · 3 PARTS`.
- "Start here" strip above `CONTENTS`: label `START HERE` and three linked steps — Install Claude Code → Permission Modes → How Claude Code Works — each with its part number.
- Eyebrow becomes `TUTORIAL · 17 PARTS · 5 GROUPS` (derived from data).

### 4. Reading aids (content pages only)
- Reading progress bar: 2 px `--accent` bar fixed under the header, width = scroll progress of the article; `aria-hidden`; no transition when `prefers-reduced-motion: reduce`.
- Back-to-top button: bottom-right, mono "↑ Top", appears after scrolling one viewport height, moves focus to `#content` top on activation; keyboard reachable; hidden when not needed (not just transparent).
- "Updated" date and "Suggest an edit" are in the meta line (section 1).

## Workflow

1. UI components and the `page` export type (no content changes).
2. Restructure: new `lib/nav.ts` (5 groups, 17 pages, taglines), new `scripts/route-map.json` (identity map of the 18 new routes), files moved/merged as skeletons; tests and scripts derive counts from data (fixes the hard-coded 18 in `scripts/test_checks.py`).
3. Content, one group per task. For each page: research agent → notes file with claims, source URL, exact quote/value, access date; writer agent → MDX from the notes only, with `<Cite>` and `page`; fact-check agent → per-claim PASS/FAIL report in `docs/superpowers/research/<group>-<slug>.factcheck.md`; FAILs return to the writer until 0 open.
4. Final: browser checks, CLAUDE.md update, audit doc marked resolved with a coverage table.

## Verification

1. `npm run build` with no warnings; `npm test`; `python3 -m unittest scripts/test_checks.py`.
2. `check_routes.py`, `check_links.py`, `check_outline.py` pass.
3. New `scripts/check_sources.py out` (stdlib, unit-tested): every content page has an updated date in the meta line and ≥ 1 source; every `[k]` cite link targets an existing `#src-k`; every source id is cited at least once; every source URL is `https://`.
4. Every page has a fact-check report with 0 open FAILs; every claim in the report cites a source listed on that page.
5. Audit coverage: each High/Med item in the 2026-10-09 audit is marked fixed (with page) or obsolete (page removed/merged, with reason) in the audit doc.
6. Browser (Playwright): callout/card contrast ≥ 4.5:1 in both themes; progress bar tracks scroll and respects reduced motion; back-to-top appears/disappears and moves focus; home strip and taglines render; `scrollWidth <= 375` on home and three content pages; no console errors.

## Out of scope

- Deploy config, redirects for old slugs, i18n.
- Changing the visual design system beyond the four UI additions.
