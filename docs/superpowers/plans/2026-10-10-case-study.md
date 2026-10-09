# Case Study Group Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Case Study group (parts 18–23): six cited, fact-checked pages about one real QA workspace that used Claude Code from bug hunt to retest.

**Architecture:** Six new MDX pages in `content/case-study/`, registered in `lib/nav.ts` and `scripts/route-map.json`. Each page has a research note and an independent fact-check report. Six existing pages get a "See it in practice" link. The docs get the new counts.

**Tech Stack:** Next.js 16 static export, MDX, `node --test`, Python 3 check scripts.

**Spec:** `docs/superpowers/specs/2026-10-10-case-study-design.md`

## Global Constraints

- Publishing rules R1–R8 of the spec section 3 apply to every committed file and every commit message.
- Run the denylist scan before each commit: `python3 -I <scratchpad>/scan_denylist.py <files…>` must print `0 matches`. The denylist and the script stay in the scratchpad. Never commit them.
- Page template order: `export const metadata` → `export const page = { updated: '2026-10-10', sources: [...] }` → `# Title` → one lede paragraph → `<PageMeta />` → `##` sections.
- Claude Code facts: official sources only (`code.claude.com/docs`, `modelcontextprotocol.io`, `playwright.dev`, `grafana.com/docs/k6`, tool GitHub repos). Each one gets a `<Cite n>`.
- Workspace facts: no `<Cite>`. The first element after `<PageMeta />` is a `Callout type="note"` with the title `Where these facts come from`.
- Writing style: ASD-STE100 (short sentences, active voice, one fact per sentence), as on the other pages.
- Components: `Callout`, `CardGrid`, `InfoCard`, `Cite`, fenced code. No inline `style`, no icon packages. A closing tag after a Markdown list goes at column 0.
- Excerpts: 15 lines or fewer, from the owner's own files only, with placeholders for any value that R1–R3 cover.
- Internal links: `/group/page/` form.
- Writers do not commit. The controller commits each page after its fact-check ends with `Open FAILs: 0`.
- Do not merge, do not push to `main`, do not deploy.

## Review Focus

1. A private string in a research note or a fact-check report (not only in the page). The scan covers all committed files.
2. A number on a page that differs from the workspace file (for example 17/5/2, 41 AC, 78 sends). The fact-check compares each number with its file.
3. A workspace fact written as if it were general Claude Code behavior, or the reverse. Each fact is one of the two kinds of spec section 5.
4. A prompt shown as "recorded" that is not in the two session logs. Rule R8.
5. A cross-link callout that adds a new claim to an existing page. The callout only names the case-study page.

---

### Task 1: Register the group

**Files:**
- Modify: `lib/nav.ts`, `scripts/route-map.json`, `tests/nav.test.ts`
- Create: `content/case-study/{overview,bug-hunt,pr-review,test-and-retest,automation,lessons}.mdx` (skeletons)

**Interfaces:**
- Produces: `GroupSlug` includes `"case-study"`; routes `/case-study/<slug>/` for the 6 slugs of spec section 4, in that order, parts 18–23.

- [ ] **Step 1: Update `tests/nav.test.ts`.** Add the 6 hrefs after `/automate/playwright/`, add `"case-study"` to the group list, set the page count to 23, and change the last-page assertions to `getNeighbors("case-study", "lessons").next === undefined` and `.prev?.slug === "automation"`. Keep a check that `automate/playwright` has `next.slug === "overview"`.
- [ ] **Step 2: Run `npm test`.** Expected: FAIL in `nav.test.ts`.
- [ ] **Step 3: Add the group to `lib/nav.ts`** with the titles of spec section 4, a `description` (one line) and a `tagline` (plain words, no claims) per page. Add the 6 routes to `route-map.json`. Create the 6 skeletons: `metadata`, `page` with an empty `sources`, `# Title`, a one-line lede. No `<PageMeta />` yet.
- [ ] **Step 4: Run `npm test` and `npm run build`.** Expected: both pass. `check_sources.py out --allow-missing` reports 17 checked, 6 skipped.
- [ ] **Step 5: Commit** `feat(case-study): register the Case Study group`.

### Tasks 2–7: One page each

| Task | Page | Research note | Fact-check report |
|---|---|---|---|
| 2 | `content/case-study/overview.mdx` | `docs/superpowers/research/case-study-overview.md` | `…/case-study-overview.factcheck.md` |
| 3 | `content/case-study/bug-hunt.mdx` | `…/case-study-bug-hunt.md` | `…/case-study-bug-hunt.factcheck.md` |
| 4 | `content/case-study/pr-review.mdx` | `…/case-study-pr-review.md` | `…/case-study-pr-review.factcheck.md` |
| 5 | `content/case-study/test-and-retest.mdx` | `…/case-study-test-and-retest.md` | `…/case-study-test-and-retest.factcheck.md` |
| 6 | `content/case-study/automation.mdx` | `…/case-study-automation.md` | `…/case-study-automation.factcheck.md` |
| 7 | `content/case-study/lessons.mdx` | `…/case-study-lessons.md` | `…/case-study-lessons.factcheck.md` |

The content of each page is the row of spec section 4. Each task has the same steps:

- [ ] **Step 1: Research note.** Sources S1…Sn (official URLs, accessed 2026-10-10). Claims table with columns `#`, `Claim`, `Kind` (`DOC` or `REPO`), `Quote or value`, `Source` (Sn for DOC; neutral path such as `api/.artifacts/PR-8.test-report.md` for REPO).
- [ ] **Step 2: Page.** Write the MDX from the note. 150–350 lines, as the other pages. At least 1 diagram or excerpt in a fenced block. End with a section `## Take-aways` (3–6 bullets, the tutorial's own advice, marked as such).
- [ ] **Step 3: Self-check.** Run the denylist scan on the 2 files. Expected: `0 matches`.
- [ ] **Step 4: Independent fact-check** (a different agent). One row per claim: `#`, claim, kind, cite or path, `PASS`/`FAIL`, quote. DOC rows against the URL. REPO rows against the clone. Ends with `Open FAILs: N`.
- [ ] **Step 5: Fix each FAIL** and check again, until `Open FAILs: 0`.
- [ ] **Step 6: Run** `npm run build` and `python3 scripts/check_sources.py out --allow-missing`. Expected: the page is checked, not skipped, with no error.
- [ ] **Step 7: Commit** `docs(case-study): add <page title>` with the page, the note, and the report.

### Task 8: Links and docs

**Files:**
- Modify: `content/extend/{skills,subagents,hooks,mcp}.mdx`, `content/foundations/test-design.mdx`, `content/automate/playwright.mdx`, `components/pages/HomePage.tsx`, `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`

- [ ] **Step 1: Cross-links.** One `Callout type="tip" title="See it in practice"` per page, at the end of the section that matches:

  | Page | Target |
  |---|---|
  | `extend/skills` | `/case-study/bug-hunt/` and `/case-study/pr-review/` |
  | `extend/subagents` | `/case-study/bug-hunt/` (read-only reviewer) and `/case-study/test-and-retest/` (executor) |
  | `extend/hooks` | `/case-study/bug-hunt/` (context hook) and `/case-study/lessons/` |
  | `extend/mcp` | `/case-study/lessons/` |
  | `foundations/test-design` | `/case-study/test-and-retest/` |
  | `automate/playwright` | `/case-study/automation/` |

- [ ] **Step 2: Home hero.** Add one short clause about the case study to the hero sentence in `HomePage.tsx`.
- [ ] **Step 3: Docs.** Apply spec section 6 to `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`. Count the citations again with a script over `content/**/*.mdx` (`<Cite` count, unique source URLs) and write the new numbers.
- [ ] **Step 4: Run** `npm test`, `npm run build`, all 4 `out` checks. Expected: `OK 23 pages checked, 0 skipped`.
- [ ] **Step 5: Scan and commit** `docs: link the case study and update the counts`.

### Task 9: Final review and PR

- [ ] **Step 1:** Run every check of spec section 7 on a clean build.
- [ ] **Step 2:** Run the denylist scan on `git diff main...HEAD`. Expected: `0 matches`.
- [ ] **Step 3:** Final whole-branch review on the most capable model. One fix wave, one scoped re-review.
- [ ] **Step 4:** Push `feat/case-study` and open a PR to `main`. The PR body lists the 6 pages, the checks, and the decisions of spec section 9. Do not merge.
