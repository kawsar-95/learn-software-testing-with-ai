# Case Study: The Practice Project — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as the raw Markdown of the same page (URL plus `.md`). The URLs below are the canonical page URLs. The playwright.dev and grafana.com pages were fetched as HTML.

REPO facts come from the author's private practice workspace, at the last commit of 2026-10-07. Paths use the neutral prefixes `api/` (the REST API project), `web/` (the web app project), and `./` (the workspace root). REPO facts get no `<Cite>` on the page.

## Sources

S1. Extend Claude with skills — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/skills — accessed 2026-10-10
S2. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S3. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
S4. Connect Claude Code to tools via MCP — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/mcp — accessed 2026-10-10
S5. Claude Code settings — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/settings — accessed 2026-10-10
S6. Authentication — Playwright docs — https://playwright.dev/docs/auth — accessed 2026-10-10
S7. Thresholds — Grafana k6 docs — https://grafana.com/docs/k6/latest/using-k6/thresholds/ — accessed 2026-10-10

## Claims

| # | Claim | Kind (DOC/REPO) | Quote or value | Source |
|---|---|---|---|---|
| C1 | The workspace has 25 commits, from 2026-09-19 to 2026-10-07. | REPO | `git log` count 25; first commit 2026-09-19, last 2026-10-07 | `./` (git history) |
| C2 | Commits per day: 1 on 09-19, 4 on 10-02, 6 on 10-03, 4 on 10-04, 10 on 10-07. | REPO | `git log --format=%ad --date=short` counted per day | `./` (git history) |
| C3 | The first commit added the app and the `.claude/` folders of the two sub-projects. | REPO | first commit adds `api/.claude/…` files; 168 files | `./` (git history) |
| C4 | The app is a REST API (Express, Sequelize, MySQL) on `localhost:5000` and a web app (Next.js 15) on `localhost:3000`. | REPO | Architecture diagram: "Next.js 15 · MUI · TS", "http://localhost:3000", "Express · Sequelize", "http://localhost:5000", MySQL | `./README.md` "Architecture"; `api/package.json`; `web/package.json` |
| C5 | The app has bugs on purpose and must not go on the internet. | REPO | "This system has known bugs and security flaws, and they are there on purpose." / "Do not deploy it to production or expose it to the internet." | `./README.md` line 5 |
| C6 | The roles are Admin, Agent, Customer, and Merchant, plus an internal SYSTEM role. | REPO | "Roles: SYSTEM (internal), Admin, Agent, Customer and Merchant." | `./README.md` "Architecture" |
| C7 | There is no balance column. The balance is the sum of credits minus the sum of debits in a ledger table. | REPO | "There is no balance column." / "`SUM(credit) - SUM(debit)`" | `./README.md` "Architecture" |
| C8 | Daily and monthly customer limits come from a database table. | REPO | "customer daily/monthly caps come from `TransactionLimits`" | `./README.md` "Architecture" |
| C9 | A customer can make 10 outgoing transactions per UTC day. | REPO | "Each customer may make 10 outgoing transactions per UTC day" | `./README.md` "Known limitations" |
| C10 | The workspace has 7 skills in `.claude/skills/`: understand-task, find-bug, blast-radius, pr-review, test-charter, test-design, execute-test. | REPO | 7 folders, each with `SKILL.md` | `./.claude/skills/` |
| C11 | `pr-review` has a supporting file, `reviewer-prompt.md`. The other six workspace skills have only `SKILL.md`. | REPO | `SKILL.md`, `reviewer-prompt.md`; the other 6 folders hold only `SKILL.md` | `./.claude/skills/pr-review/` |
| C12 | The workspace has 2 subagents: `qa-reviewer-agent` and `test-executor-agent`. | REPO | 2 files | `./.claude/agents/` |
| C13 | `qa-reviewer-agent` uses an Opus model and has only read tools: Read, Grep, Glob, Skill, and read-only Serena tools. | REPO | `tools: Read, Grep, Glob, Skill, mcp__plugin_serena_serena__…` (find/read/list tools only); `model:` an Opus model ID | `./.claude/agents/qa-reviewer-agent.md` frontmatter |
| C14 | `qa-reviewer-agent` marks each bug APPROVED, FLAGGED, or REJECTED and gives a gate PASS or BLOCKED. | REPO | "returns APPROVED / FLAGGED / REJECTED per bug plus an overall gate (PASS or BLOCKED)" | `./.claude/agents/qa-reviewer-agent.md` description |
| C15 | `test-executor-agent` uses Sonnet, has tools Read, Write, Glob, Grep, Bash, Skill, and preloads `execute-test`. | REPO | `tools: Read, Write, Glob, Grep, Bash, Skill` / `model: sonnet` / `skills: - execute-test` | `./.claude/agents/test-executor-agent.md` frontmatter |
| C16 | The workspace has 1 command file, `playwright.md`. | REPO | 1 file | `./.claude/commands/` |
| C17 | `.claude/settings.json` has one `PreToolUse` hook group with the matcher `Skill`. It runs a command hook (the graphify script, timeout 45) and then an `mcp_tool` hook (Serena `activate_project`, timeout 30). | REPO | `"matcher": "Skill"`, `"type": "command"` … `"timeout": 45`, `"type": "mcp_tool"`, `"server": "plugin:serena:serena"`, `"tool": "activate_project"`, `"timeout": 30` | `./.claude/settings.json` |
| C18 | The graphify script acts only for the `test-design` and `find-bug` skills. | REPO | the skill-name filter matches `test-design` or `find-bug`; any other skill gives `exit 0` | `./.claude/hooks/graphify-prehook.sh` line 8 |
| C19 | The script returns the graph result as `additionalContext`, with `permissionDecision` `allow`. | REPO | `{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"allow",additionalContext:$c}}` | `./.claude/hooks/graphify-prehook.sh` line 14 |
| C18a | With skill arguments, the script runs a graphify query. With no arguments, it reads the start of the graph report. | REPO | `graphify query "$args" --budget 1200`; else `sed -n '1,45p' "$d/graphify-out/GRAPH_REPORT.md"` | `./.claude/hooks/graphify-prehook.sh` |
| C20 | The script warns when the graph is older than the last commit. | REPO | "if the commit is newer, the graph may be stale; say so in your output" | `./.claude/hooks/graphify-prehook.sh` |
| C21 | The Serena `mcp_tool` hook has no skill filter. It runs for every Skill call. | REPO | matcher `Skill`, no condition on the skill name for the second hook | `./.claude/settings.json` |
| C22 | `.mcp.json` defines 3 servers: `jira` (http), `playwright` (stdio, `npx -y @playwright/mcp@latest`), and a MySQL server (stdio, a pinned package version). | REPO | `"jira": {"type": "http", …}`, `"playwright": {"type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"]}`, third server `"type": "stdio"` with a package name that ends in a fixed version number | `./.mcp.json` |
| C23 | The MySQL server config in `.mcp.json` enables write actions. It was added to `.mcp.json` on 2026-10-07. | REPO | last arg `list,read,utility,create,update,delete,execute`; added by the Playwright commit of 2026-10-07 | `./.mcp.json`; `./` (git history) |
| C24 | The README lists only `playwright` and `jira` as project MCP servers. It calls the database server a read-only server at user level (a different server name from the one in `.mcp.json`). | REPO | `.mcp.json` row: "Project MCP servers ... Browser automation, and Jira tickets"; database row: "User-level MCP server" / "**Read-only** SQL against the local …" | `./README.md` "Plugins, user-level skills and MCP servers" |
| C25 | The `execute-test` skill forbids the Playwright MCP server. | REPO | "Nothing else drives the system under test: no Playwright MCP, no test scripts, no SQL/DB tools" | `./.claude/skills/execute-test/SKILL.md` line 12 |
| C26 | `understand-task` reads Jira tickets through the Atlassian MCP server. | REPO | "Jira key/link \| Atlassian MCP `getJiraIssue`" | `./.claude/skills/understand-task/SKILL.md` line 24 |
| C27 | `api/` and `web/` each have a `.claude/skills/` folder with 8 skills. The two folders are identical. | REPO | 8 folders each; `diff -rq` reports no difference | `api/.claude/skills/`, `web/.claude/skills/` |
| C28 | The sub-project skill `analyze-requirement` made the requirement notes. | REPO | "`SM-*_requirement.md` (7 files …) … `analyze-requirement`" | `./README.md` "QA artefacts" |
| C29 | The README gives the chain find-bug → qa-reviewer-agent → bug file → issues → analyze-requirement → fix → PR → pr-review → blast-radius → test-charter → test-design + adversarial review → test-executor-agent → fix failures → retest → k6. | REPO | "QA workflow" diagram | `./README.md` "QA workflow" |
| C30 | The Send Money bug file has 7 bugs: 2 High, 2 Medium, 3 Low (SM-H01 to SM-L03). They became GitHub issues #1–#7. | REPO | summary table rows SM-H01, SM-H02 (High), SM-M01, SM-M02 (Medium), SM-L01, SM-L02, SM-L03 (Low); "filed as GitHub issues #1–#7" | `api/qa-findings/08-send-money-bugs.md` lines 111–117; `./README.md` "QA artefacts" |
| C31 | There are 7 requirement notes with 41 acceptance criteria in total. | REPO | AC per file: H01 5, H02 7, L01 6, L02 4, L03 6, M01 8, M02 5 = 41 | `api/.artifacts/SM-*_requirement.md` |
| C32 | There are 7 PR review files, one per issue. | REPO | `SM-H01_review.md` … `SM-M02_review.md` | `api/.artifacts/` |
| C33 | PR #8 changed 3 app files, +82/−22. PR #9 changed 3 app files, +75/−47 (the PR also added QA artifacts and skills). Both merged on 2026-10-07. | REPO | `git show --stat` of the two fix commits; merge commits dated 2026-10-07 | `./` (git history) |
| C34 | The charter file has 6 charters, CH-1 to CH-6. None was run. | REPO | `### CH-1` … `### CH-6`; "Status: none of these sessions has been run yet." | `api/.artifacts/PR-8_test-charter.md` line 15 |
| C35 | The PR #8 test file has a Basic Test and 23 test cases. | REPO | `## 3. Basic Test`; TC-001 … TC-023 | `api/.artifacts/PR-8.test.md` |
| C36 | The PR #8 test report has 24 rows: 17 pass, 5 failed, 2 not executed. | REPO | summary table "24 \| 17 \| 5 \| 2"; failed TC-005, 006, 007, 008, 014; not executed TC-004, TC-015 | `api/.artifacts/PR-8.test-report.md` lines 10–12 |
| C37 | PR #9 fixed 4 of the 5 failures: TC-005, TC-006, TC-007, TC-008. | REPO | commit message names TC-005, TC-007, TC-008, TC-006 | `./` (git history, PR #9 fix commit) |
| C38 | TC-014 still needs a business decision. | REPO | "Two items still need a business decision: the wording of the invalid-amount message (SM-L01), and whether an unquoted JSON `1e1` should be rejected." | `./README.md` "Known limitations" |
| C39 | The README says that PR #9 fixed all 5 failures. | REPO | "The 5 failures were then fixed in PR #9" | `./README.md` "QA artefacts" |
| C40 | Only two session logs record prompts: 2026-10-03 and 2026-10-04. | REPO | two files `SESSION-LOG-2026-10-03.md`, `SESSION-LOG-2026-10-04.md`; no other session log in the workspace | `./` |
| C41 | The 10-03 log covers the cash-in bug hunt, the `find-bug` skill, the graphify and Serena pre-hooks, and MCP changes. | REPO | headings "Part 1 — Cash-in bug hunt", "Part 2 — The `find-bug` skill", "Part 3 — Pre-hooks for graphify and Serena", "Part 4 — MCP cleanup and additions" | `./SESSION-LOG-2026-10-03.md` |
| C42 | The 10-04 log covers the executor skill and agent, the reviewer agent, and the Send Money bug hunt. | REPO | headings "Part 1 — Test executor skill and agent", "Part 4 — qa-reviewer-agent", "Part 5 — Send money bug hunt" | `./SESSION-LOG-2026-10-04.md` |
| C43 | The 10-03 log condenses the replies. The 10-04 log lightly cleans up the prompts and condenses the outputs. | REPO | "Replies are condensed, not word for word." / "Prompts are lightly cleaned up from what I typed. Outputs are condensed, not word for word." | `./SESSION-LOG-2026-10-03.md` line 5; `./SESSION-LOG-2026-10-04.md` line 5 |
| C44 | The k6 result exists only as a reference run in the README: 78 sends, 0 failures, p95 14.5 ms, max 23 ms. No k6 result file is stored. | REPO | "On the local machine, 78 sends had 0 failures, a 95th percentile of 14.5 ms and a maximum of 23 ms."; `git ls-files` has no k6 output | `./README.md` "Performance testing (k6)" |
| C45 | No Playwright run result is stored. Git ignores the result folders. | REPO | `/test-results/`, `/playwright-report/` in `.gitignore`; no tracked result file | `web/.gitignore` |
| C46 | The Playwright suite has 3 page objects, 2 setup files, 3 spec files, and 7 tests. | REPO | `e2e/pages/` 3 files; `admin.setup.ts`, `agent.setup.ts`; 3 `*.spec.ts` with 1 + 5 + 1 `test(` calls | `web/e2e/` |
| C47 | Skill, agent, hook, and MCP files were added on these dates: understand-task and blast-radius 10-02; find-bug, test-charter, test-design, hook, `.mcp.json` 10-03; execute-test and both agents 10-04; pr-review, the command, k6, Playwright 10-07. | REPO | `git log --diff-filter=A` per file | `./` (git history) |
| C48 | A project skill lives at `.claude/skills/<skill-name>/SKILL.md`. Commit it to share it with the team. | DOC | "\| Project \| `.claude/skills/<skill-name>/SKILL.md` \| Sessions in this repository. Commit it so your team gets it too \|" | S1 |
| C49 | A skill can have supporting files next to `SKILL.md`. | DOC | "### Add supporting files" / "Reference supporting files from `SKILL.md` so Claude knows what each file contains and when to load it" | S1 |
| C50 | Custom commands are merged into skills. Files in `.claude/commands/` still work. | DOC | "**Custom commands have been merged into skills.** … Your existing `.claude/commands/` files keep working." | S1 |
| C51 | Each subagent runs in its own context window with its own system prompt, tool access, and permissions. | DOC | "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." | S2 |
| C52 | The `skills` field preloads the full skill content into the subagent at startup. | DOC | "Skills to preload into the subagent's context at startup. The full skill content is injected, not only the description." | S2 |
| C53 | `tools` is the list of tools that the subagent can use. | DOC | "`tools` \| No \| Tools the subagent can use, as a comma-separated string such as `Read, Grep, Bash` or a YAML list." | S2 |
| C54 | `PreToolUse` fires before a tool call and can block it. | DOC | "`PreToolUse` \| Before a tool call executes. Can block it" | S3 |
| C55 | An `mcp_tool` hook calls a tool on a configured MCP server. | DOC | "MCP tool hooks (`type: \"mcp_tool\"`): call a tool on a configured MCP server." | S3 |
| C56 | `additionalContext` passes a string from the hook into Claude's context. | DOC | "The `additionalContext` field passes a string from your hook into Claude's context window." | S3 |
| C57 | Hooks in `.claude/settings.json` apply to one project, and you can commit the file. | DOC | "\| `.claude/settings.json` \| Single project \| Yes, can be committed to the repo \|" | S3 |
| C58 | Project-scoped MCP servers live in `.mcp.json` at the project root. | DOC | "Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project's root directory." | S4 |
| C59 | Claude Code asks for approval before it uses project-scoped servers from `.mcp.json` in an interactive session. | DOC | "Claude Code prompts for approval in interactive sessions before using project-scoped servers from `.mcp.json` files." | S4 |
| C60 | `.claude/settings.json` holds the shared project settings that the team checks into source control. | DOC | "**Shared project settings** (`.claude/settings.json`): settings your team checks into source control." | S5 |
| C61 | Playwright: a setup project authenticates first, and test projects declare it as a dependency and use the saved state as `storageState`. | DOC | "Create a new setup project in the config and declare it as a dependency for all your testing projects. … All testing projects should use the authenticated state as storageState." | S6 |
| C62 | k6 thresholds are the pass/fail criteria for test metrics. | DOC | "Thresholds are the pass/fail criteria that you define for your test metrics." | S7 |

| C63 | The README chain ends with a retest and a k6 check, but no retest report after PR #9 is stored. | REPO | README: "fix failures ──▶ re-test ──▶ k6 performance check"; `api/.artifacts/` has one PR #8 run report only (`PR-8.test-report.md`), and it has no retest section | `./README.md` "QA workflow"; `api/.artifacts/` |
| C64 | `.claude/settings.json` holds only the hook chain. It has no `permissions` block. | REPO | the file has one top-level key, `hooks` | `./.claude/settings.json` |
| C65 | A second, adversarial agent (a sub-project skill) reviewed the PR #8 test cases. | REPO | README row for `PR-8.test.md` + `PR-8.review.md`: "adversarial review record", made with `test-design` (API-scoped) plus the sub-project adversarial skill | `./README.md` "QA artefacts" |
| C66 | The README lists a database MCP server for SQL checks during analysis. | REPO | "used to check facts during analysis" | `./README.md` "Plugins, user-level skills and MCP servers" |
| C67 | The Playwright config has one setup project per role (admin, agent). Each test project depends on its setup project and uses the saved session as `storageState`. | REPO | `{ name: 'admin-setup', … }`, `{ name: 'agent-setup', … }`, `dependencies: ['admin-setup']`, `storageState: authFile('admin')` (same for agent) | `web/playwright.config.ts` lines 24–36 |
| C68 | The OTP login test cases were added on 2026-10-02, the cash-in bug report on 2026-10-03, and the Send Money bug report on 2026-10-04. | REPO | `git log --diff-filter=A` | `./` (git history) |
| C69 | The work is about the Send Money feature (issues #1–#7, PR #8, PR #9). | REPO | "The Send Money work (issues #1–#7, PRs #8 and #9) followed it end to end" | `./README.md` "QA workflow" |

Totals: 70 claims. DOC 15, REPO 55.
