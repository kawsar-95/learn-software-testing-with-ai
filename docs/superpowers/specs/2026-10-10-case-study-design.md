# Case Study group — design

Date: 2026-10-10. Status: written for the owner's review in the pull request.

## 1. Goal

Add a new group, **Case Study**, to the tutorial. It shows one real QA workspace in which the owner used Claude Code skills, subagents, hooks, and MCP servers from a bug hunt to a merged fix and a retest.

The other 17 pages teach each feature alone. The case study shows the features together, with real outputs, real numbers, and the mistakes that the owner found later.

## 2. Source material

| Item | Value |
|---|---|
| Source | The owner's private practice workspace on GitHub. It is private, and it stays private. |
| State used | The last commit of 2026-10-07 (25 commits from 2026-09-19 to 2026-10-07) |
| Application under test | A practice money-transfer app from a public SDET training course: a REST API (Node.js, MySQL) and a web app (Next.js). It runs on `localhost` only. It has bugs on purpose. |
| Owner's work | 7 workspace skills, 2 workspace subagents, 1 command, 1 hook chain, 3 MCP servers, bug reports, requirement notes, PR reviews, an impact report, test charters, test cases, test reports, 2 fix PRs, a k6 script, and a Playwright suite |
| Analysis | Two read-only analysis reports in the controller's scratchpad. They are not committed, because they quote private files. |

## 3. Publishing rules (binding)

The site is public. A published page cannot be taken back. These rules apply to every committed file: pages, research notes, fact-check reports, this spec, the plan, and commit messages.

| Rule | Detail |
|---|---|
| R1. No personal data | No email address, phone number, person name, OS user name, or local path from the workspace. Use placeholders: `<customer-1>`, `01XXXXXXXXX`, `<agent-email>`. |
| R2. No secrets or default credentials | No password, partner key, JWT secret, OTP bypass value, database URL, database user, or database name from the workspace. Show the `${VAR}` pattern only. |
| R3. No employer or other-project material | The workspace has files copied from an unrelated work project. No name, path, ticket key, or text from those files. |
| R4. No private repo identity | No URL or name of the private repo. Issue and PR numbers (`#8`, `#9`) are allowed. |
| R5. Neutral app name | Call the app "the practice app" or "a practice money-transfer app". Do not name the app, the course, or the course author. The owner decides about names and credit in the PR. |
| R6. No application code | Do not copy the app's code. Short excerpts (15 lines or fewer) of the owner's own files are allowed: skills, agent frontmatter, reports, the k6 thresholds, the Playwright config. |
| R7. No exploit recipes | Do not publish the security findings or any step that forges a token or bypasses a login. |
| R8. Honest records | Say which prompts are recorded (two session logs only) and which results have no stored run (k6, Playwright). Do not invent prompts, numbers, or durations. |

A denylist of the exact private strings lives in the controller's scratchpad only. It is not committed, because the list itself would publish the strings. Every task runs a scan with it before its commit, and the final review runs it on the whole branch diff.

## 4. Pages

The new group is `case-study` (title **Case Study**), after Automate. It adds parts 18 to 23.

| Part | Slug | Title | Content |
|---|---|---|---|
| 18 | `overview` | The Practice Project | The workspace and the app. The setup inventory table (skill, agent, hook, MCP server), each row linked to the tutorial page for that feature. The full chain from bug hunt to retest, as a text diagram. What is recorded and what is not. |
| 19 | `bug-hunt` | Bug Hunting with a Review Gate | A code-reading report that predicted a limit race. The `find-bug` skill that the owner wrote from a pasted spec (recorded prompts). The hook that adds knowledge-graph context before the skill runs. The read-only reviewer subagent and its PASS/BLOCKED gate. The 7 Send Money bugs. The claims that the owner withdrew after real runs. |
| 20 | `pr-review` | From Issue to Reviewed PR | Requirement analysis with acceptance criteria and gaps. The fix PR. The `pr-review` skill with a supporting prompt file, a fresh reviewer, and re-verification of each claim. The zero-width-space finding. The blast-radius report and how it compares with a knowledge graph. |
| 21 | `test-and-retest` | Design, Execute, Fix, Retest | Test charters with oracles. Test cases with a title contract and traceability. A second agent that challenged the test cases before the run. The test-executor subagent that preloads a skill (recorded prompt). The result: 17 pass, 5 failed, 2 not executed. The second PR that fixed 4 failures. |
| 22 | `automation` | Load and Browser Automation | The k6 script with the business limits built into the test data, and its thresholds. The Playwright suite: one setup project per role, saved sessions, an email OTP helper, and a check of UI, API, and data in one test. The `/playwright` command rule "prove that the assertion can fail". |
| 23 | `lessons` | What to Fix in the Setup | The improvement notes, each with the official rule that it breaks: MCP tool names, a `tools` allowlist that hides MCP tools, a database MCP server with write access, a hook that auto-allows destructive git commands, what a `PostToolUse` block can and cannot do, the settings scope of nested projects, duplicated skills, legacy commands, pinned model IDs, unpinned `npx` packages, large skill bodies. |

Each page has the normal template (`metadata`, `page` with `updated` and `sources`, `# Title`, a lede, `<PageMeta />`, `##` sections).

## 5. Facts and sources

The case-study pages have two kinds of facts.

| Kind | Example | Source | Fact-check |
|---|---|---|---|
| Claude Code, MCP, Playwright, or k6 behavior | "A `tools` list with only built-in tools gives the subagent no MCP tools." | Official docs, with `<Cite n>` and a `page.sources` entry, as on the other pages | Against the cited page, as before |
| A fact about the workspace | "The test run had 17 pass, 5 failed, 2 not executed." | The workspace files. There is no public URL. | Against the clone, by a checker that did not write the page. The report gives the file path with neutral prefixes (`api/`, `web/`, `./`), never the private repo name. |

Each case-study page starts with a `Callout type="note"` that says where the workspace facts come from and that the workspace is private. Workspace facts do not get a `<Cite>`. Every page still has 1 or more official sources, so `check_sources.py` passes without a flag.

## 6. Changes to existing files

| File | Change |
|---|---|
| `lib/nav.ts` | Add `"case-study"` to `GroupSlug`. Add the group with the 6 pages, in the order of section 4. |
| `scripts/route-map.json` | Add the 6 routes. |
| `tests/nav.test.ts` | Add the 6 hrefs and the group slug. The page count becomes 23. The last page becomes `case-study/lessons`. |
| `content/extend/skills.mdx`, `subagents.mdx`, `hooks.mdx`, `mcp.mdx`, `content/foundations/test-design.mdx`, `content/automate/playwright.mdx` | One `Callout type="tip" title="See it in practice"` each, with a link to the matching case-study page. The callout adds no new fact. |
| `components/pages/HomePage.tsx` | Add the case study to the hero sentence. |
| `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md` | 17 pages → 23, 18 routes → 24, `PART 17` → `PART 23`, 5 groups → 6. The group table gets the Case Study row. The citation count is measured again. The docs list gets this spec and its plan. |

The service worker precache, the search index, the sitemap, and the home contents read `lib/nav.ts`. They need no change.

## 7. Done criteria

1. `npm test` passes.
2. `python3 -m unittest scripts/test_checks.py` passes.
3. `npm run build` passes, and `check_routes`, `check_links`, `check_outline` pass on `out/`.
4. `python3 scripts/check_sources.py out` prints `OK 23 pages checked, 0 skipped`.
5. Each of the 6 new pages has a research note and a fact-check report that ends with `Open FAILs: 0`.
6. The denylist scan of the branch diff finds 0 matches.
7. A final whole-branch review on the most capable model finds no open Critical or Important issue.
8. The branch is pushed and a PR is open. The PR is not merged. Nothing is deployed.

## 8. Out of scope

- Making the private workspace public.
- Copying skills or agents from the workspace into this repo as files.
- Security findings of the practice app.
- New UI components.

## 9. Decisions for the owner (in the PR)

1. Name the practice app and the course, and credit the course author? Default: no names.
2. Link the workspace if the owner makes it public? Default: no link.
3. Keep or cut part 23 ("What to Fix in the Setup"). It shows the owner's own mistakes in public.
