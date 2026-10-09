# Browser Testing with Playwright — research notes (2026-10-10)

## Sources
S1. Playwright Test Agents — Microsoft (playwright.dev) — https://playwright.dev/docs/test-agents — accessed 2026-10-10
S2. Playwright release notes (v1.56 entry, latest version) — Microsoft (playwright.dev) — https://playwright.dev/docs/release-notes — accessed 2026-10-10
S3. microsoft/playwright-mcp README — Microsoft (GitHub) — https://github.com/microsoft/playwright-mcp and https://raw.githubusercontent.com/microsoft/playwright-mcp/main/README.md — accessed 2026-10-10
S4. Getting started with Playwright MCP — Microsoft (playwright.dev) — https://playwright.dev/docs/getting-started-mcp — accessed 2026-10-10
S5. Playwright source: generateAgents.ts (what `init-agents --loop=claude` writes) — Microsoft (GitHub) — https://github.com/microsoft/playwright/blob/main/packages/playwright/src/agents/generateAgents.ts — accessed 2026-10-10
S6. Playwright docs source for test agents (JS) — Microsoft (GitHub) — https://raw.githubusercontent.com/microsoft/playwright/main/docs/src/test-agents-js.md — accessed 2026-10-10
S7. Use Claude Code with Chrome — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/chrome — accessed 2026-10-10
S8. Connect Claude Code to tools via MCP — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/mcp — accessed 2026-10-10 (first 100,000 of 119,516 characters read)
S9. CLI reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/cli-reference — accessed 2026-10-10

Note: the fetch tool returned condensed text for S1, S3, S5, S6 (not verbatim). Exact strings below that came through quoted are marked "quoted". Others are paraphrase; the fact-checker should re-fetch.

Local CLI evidence (2.1.294): `claude mcp add --help`:
- `Usage: claude mcp add [options] <name> <commandOrUrl> [args...]`
- `# Add stdio server with subprocess flags:  claude mcp add my-server -- my-command --some-flag arg1`
- `-s, --scope <scope>  Configuration scope (local, user, or project) (default: "local")`
- `-t, --transport <transport>  Transport type (stdio, sse, http). Defaults to stdio if not specified.`
- `claude --help`: `--chrome  Enable Claude in Chrome integration`; `--no-chrome  Disable Claude in Chrome integration`.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | Playwright MCP is an MCP server from Microsoft (`microsoft/playwright-mcp`) that lets an LLM drive a browser through Playwright using structured accessibility snapshots, not screenshots, so no vision model is needed. | "Uses Playwright's accessibility tree, not pixel-based input." (paraphrase of README intro) | S3, S4 | |
| C2 | Add it to Claude Code with `claude mcp add playwright npx @playwright/mcp@latest`. | exact command | S3, S4 | Claude docs (S8) and help show the stdio form with `--` before the server command: `claude mcp add [options] <name> -- <command> [args...]`. Writer: show `claude mcp add --transport stdio playwright -- npx @playwright/mcp@latest`? That exact form was NOT in S3; both work in principle (no dash-flags after the name), but state the S3 command as the vendor's and note `--` for stdio per S8. |
| C3 | The standard MCP client config is `{"mcpServers":{"playwright":{"command":"npx","args":["@playwright/mcp@latest"]}}}`. | JSON shown in S3 | S3, S4 | Project scope stores it in `.mcp.json` (C6). |
| C4 | Node.js requirement: README says 18 or newer; playwright.dev getting-started page says 20 or newer. | S3: "Node.js 18 or newer"; S4: "requires Node.js 20 or newer" | S3, S4 | Conflict. Writer: say "Node.js 20 or newer (the Playwright docs; the README says 18)" or use 20 as the safe bound. |
| C5 | `claude mcp add` scopes: local (default; stored in `~/.claude.json`, current project only), project (`.mcp.json` in project root, shared via version control), user (all projects, `~/.claude.json`). Choose with `-s` / `--scope`. | scope table in S8 | S8 | help: `-s, --scope <scope>  Configuration scope (local, user, or project) (default: "local")` |
| C6 | For stdio servers, `--` separates Claude's own options (`--transport`, `--env`, `--scope`) from the server command; everything after `--` goes to the server untouched. | quoted in S8 | S8 | |
| C7 | Claude Code asks for approval in interactive sessions before using project-scoped servers from `.mcp.json`; reset with `claude mcp reset-project-choices`. | quoted in S8 | S8 | |
| C8 | Trust warning: verify you trust each MCP server; servers that fetch external content can expose you to prompt injection. | "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk." | S8 | Relevant: the browser reads untrusted page content. |
| C9 | Playwright MCP is not a security boundary. Origin allow/block lists (`--allowed-origins`, `--blocked-origins`), secret redaction, and workspace-root file restrictions are guardrails, not hard boundaries. | README states Playwright MCP is "**not** a security boundary" (condensed quote) | S3 | |
| C10 | The tool `browser_run_code_unsafe` runs arbitrary JavaScript in the Playwright server process; README calls it RCE-equivalent. | README (paraphrase) | S3 | Consider `--disallowedTools "mcp__playwright__browser_run_code_unsafe"` — the tool-name prefix `mcp__<server>__<tool>` is composed, not shown for Playwright in a source. S9 shows `mcp__*` deny pattern only. Mark as suggestion. |
| C11 | Snapshot mode is the default: core tools include `browser_snapshot` (accessibility snapshot), `browser_navigate`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_select_option`, `browser_press_key`, `browser_wait_for`, `browser_take_screenshot`, `browser_console_messages`, `browser_network_requests`, `browser_handle_dialog`, `browser_file_upload`, `browser_tabs`, `browser_evaluate`. | tool list in S3 | S3 | Core group is on by default. |
| C12 | Vision mode: `--caps=vision` adds coordinate-based mouse tools (`browser_mouse_click_xy`, `browser_mouse_move_xy`, `browser_mouse_drag_xy`, `browser_mouse_down`, `browser_mouse_up`, `browser_mouse_wheel`). | list in S3 | S3 | Use only when snapshots cannot find an element (canvas, custom widgets). |
| C13 | Other opt-in capabilities: `--caps=pdf` (`browser_pdf_save`), `--caps=testing` (`browser_generate_locator`, `browser_verify_element_visible`, `browser_verify_list_visible`, `browser_verify_text_visible`, `browser_verify_value`), `--caps=devtools` (tracing, video, recording, highlight tools). | lists in S3 | S3 | Reconcile: the condensed S3 text for the Testing group says `--caps=testing`; S4 summary of options said "vision, pdf, devtools". Re-check in fact-check. |
| C14 | Useful options: `--headless` (headed by default), `--browser` (chrome, firefox, webkit, msedge), `--isolated` (profile in memory, lost when the browser closes), `--storage-state <file>` (load cookies/local storage), `--user-data-dir`, `--allowed-origins`, `--blocked-origins`, `--test-id-attribute` (default `data-testid`), `--output-dir`, `--viewport-size`, `--device`. Every flag has a `PLAYWRIGHT_MCP_*` env var. | options table in S3 | S3 | Pass server flags after `--`: `claude mcp add playwright -- npx @playwright/mcp@latest --headless --isolated` (composed from C6 + C14; label as example). |
| C15 | Playwright MCP can also run as a standalone HTTP server: `npx @playwright/mcp@latest --port 8931`. | S4 | S4 | Optional. |
| C16 | README notes that for coding agents a CLI + SKILLs workflow (Playwright CLI) may be more token-efficient; MCP suits exploratory automation, self-healing tests, and long-running workflows with persistent browser state. | condensed paraphrase | S3 | Mention as a trade-off: MCP tool schemas use context. |
| C17 | Playwright Test Agents: three agent definitions — planner, generator, healer — introduced in Playwright v1.56. The latest Playwright version shown in the release notes is 1.64 (at access time). | "Introducing Playwright Test Agents, three custom agent definitions designed to guide LLMs" | S2 | Version requirement for the feature: v1.56 or newer (inferred from introduction version; S1 states no minimum for Playwright itself). |
| C18 | Setup command: `npx playwright init-agents --loop=claude`. Other loops: `--loop=vscode`, `--loop=codex`, `--loop=opencode`. | exact commands in S1 | S1, S2 | S5 source also has a Copilot generator (not in S1 list). |
| C19 | Re-run `init-agents` whenever Playwright is updated, so the agent definitions pick up new tools and instructions. | S1 (paraphrase) | S1 | |
| C20 | For the Claude loop, init writes one agent file per agent to `.claude/agents/<agent-name>.md` and a `.mcp.json` in the project root with a server named `playwright-test`. The MCP server command is `npx playwright run-test-mcp-server` (on Windows `cmd /c npx playwright run-test-mcp-server`). It also creates `specs/README.md` and a default seed test if none exists. | S5 (paraphrased by fetch tool) | S5 | Agent file names like `playwright-test-planner` are inferred, not seen. S1 says definitions live in `.github/` — that is the VS Code loop. Fact-checker: confirm by reading the source or the generated files. |
| C21 | Planner: explores the app and produces a Markdown test plan, saved under `specs/` (example `specs/basic-operations.md`). Inputs: a request, a seed test, optionally a Product Requirements Document. | S1 (paraphrase) | S1 | Fits a QA requirement-analysis step: feed the PRD. |
| C22 | Generator: turns the Markdown plan into Playwright Test files under `tests/`, verifying selectors and assertions live while it runs the scenarios; the output may contain initial errors. | S1 (paraphrase) | S1 | |
| C23 | Healer: runs the failing tests, inspects the current UI for equivalent elements or flows, suggests a fix and re-runs until the test passes or guardrails stop it; it skips a test it believes covers broken functionality. | S1, S2 (paraphrase: "healer executes the test suite and automatically repairs failing tests") | S1, S2 | Teaching point: a healer that skips or "fixes" a real bug is a risk; review every healed diff. |
| C24 | Project layout after init: agent definitions (`.github/` for VS Code loop), `specs/` for plans, `tests/` for generated tests with `tests/seed.spec.ts` as the seed test that gives a ready `page` context, and `playwright.config.ts`. | S1 | S1 | |
| C25 | The three agents can run independently, in sequence, or in an agentic loop. | S6 (paraphrase) | S6 | |
| C26 | VS Code v1.105 or later is required for the agentic experience in VS Code (not needed for the Claude loop). | S1 | S1 | Mention only to avoid confusion. |
| C27 | Claude in Chrome: `claude --chrome` connects Claude Code to the Claude in Chrome extension (v1.0.36 or later) for browser automation and web-app testing; `/chrome` checks status and manages permissions. | "Start Claude Code with the `--chrome` flag" ; "extension version 1.0.36 or later" | S7, S9 | help: `--chrome  Enable Claude in Chrome integration`, `--no-chrome  Disable Claude in Chrome integration`. |
| C28 | Chrome integration needs Chrome or Edge (other Chromium browsers detected: Brave, Arc, Vivaldi, Opera), the extension, and a direct Anthropic plan (Pro, Max, Team, Enterprise). Not supported in WSL; not available through Bedrock, Vertex (Agent Platform), or Foundry. | quoted in S7 | S7 | |
| C29 | Chrome integration requires signing in with `/login`. If you authenticate with an API key or a `claude setup-token` token, Chrome integration stays off even with `--chrome`. So it is not for CI/headless runs. | quoted in S7 | S7 | Key contrast with Playwright MCP for CI. |
| C30 | Claude in Chrome uses your real browser: a visible window, shared login state (it can access sites you are signed into). It pauses for login pages and CAPTCHAs. Site permissions are inherited from the extension. | quoted in S7 | S7 | Safety: use a separate Chrome profile with test accounts. |
| C31 | Capabilities relevant to QA: test a local web app (e.g. open localhost:3000, submit invalid form data, check messages), read console errors and DOM state, check visual regressions and user flows, record a GIF, save screenshots, upload files (up to 10 MB total). | list and examples in S7 | S7 | The recorded GIF captures everything visible, including account details: review before sharing. |
| C32 | "Enabled by default" (set in `/chrome`) loads browser tools every session and raises context use; connect only when needed with `--chrome`. | Note box in S7 | S7 | |
| C33 | Claude in Chrome tools can be listed: run `/mcp`, select `claude-in-chrome`, then **View tools**. | text in S7 | S7 | |
| C34 | Rule for the page: Playwright (MCP or Test Agents) when the output must be repeatable code that runs in CI; Claude in Chrome for interactive exploration/debugging in your own browser session. | Derived from C21–C24, C27–C29 | S1, S7 | Mark as the tutorial's guidance, not a vendor statement. |
| C35 | Workflow step 1, explore: ask Claude (with Playwright MCP) to open the app and describe flows, using snapshots; planner does the same under `init-agents`. | C1, C21 | S1, S3 | Composed. |
| C36 | Workflow steps: planner writes `specs/*.md`; generator writes `tests/*.spec.ts`; run `npx playwright test`; run healer on failures; review the diff. | C21–C24 | S1 | `npx playwright test` is the standard runner command (not fetched in this task); label as standard Playwright usage. |
| C37 | Test data safety: use the `--isolated` profile with `--storage-state` for a test account's saved session; use test accounts and a non-production environment; restrict origins with `--allowed-origins` (a guardrail, not a security boundary). | options in S3 | S3 | Production data must not appear in snapshots/screenshots that go to the model. |
| C38 | Docker image of Playwright MCP supports only headless Chromium. | S3 | S3 | Optional (CI note). |

## Old content
No old files feed this page (new page). Covers audit "Missing topics" #7 (Test Agents `npx playwright init-agents --loop=claude`, Playwright MCP, Claude in Chrome `--chrome`). Audit row "skills 131-149 ... Playwright tests; playwright.dev/docs/test-agents" is also addressed (generator writes Playwright tests).

## Page outline
- ## Three ways to put Claude in a browser — Playwright MCP, Playwright Test Agents, Claude in Chrome; when to use which (C34, C16)
- ## Playwright MCP — install (C2, C3, C5, C6), requirements (C4), snapshot vs vision vs other caps (C11–C13), useful flags (C14), standalone HTTP (C15)
  - ### Safety — not a security boundary, `browser_run_code_unsafe`, prompt injection, project-scope approval (C7–C10, C37)
- ## Playwright Test Agents — `npx playwright init-agents --loop=claude`, v1.56+, re-run after upgrades, files written (C17–C20, C24–C26)
  - ### Planner, generator, healer (C21–C23)
- ## Claude in Chrome — `--chrome`, prerequisites, login restriction, what it is good for, limits (C27–C33)
- ## Workflow: explore, plan, generate, run, heal — numbered steps (C35, C36) with example prompts for each step; QA/SDET angle: feed the PRD or Jira acceptance criteria (via Jira MCP) to the planner; human reviews the plan before generation; review healer changes
- ## Keep it safe — test accounts, non-prod, `--isolated` + `--storage-state`, allowed origins, secrets, no real customer data (C8–C10, C29, C30, C37)

## Open questions
- Exact file names written by `init-agents --loop=claude` (S5 paraphrase: `.claude/agents/<name>.md`, `.mcp.json` server `playwright-test`). Fact-check by re-fetching S5 raw or by running `init-agents` in a scratch project (the research agent was not allowed to run it).
- Node.js minimum conflicts: 18 (README) vs 20 (playwright.dev).
- Whether `--caps=testing` is the right flag name for the testing group (README tool list says so; the getting-started summary listed only vision/pdf/devtools).
- No documented minimum Playwright version for `init-agents`; v1.56 is the release that introduced it.
- The `mcp__playwright__<tool>` naming for deny rules is composed from the general `mcp__*` convention; not shown for Playwright in a source. Omit or label as a suggestion.
- S1, S3, S5, S6 were condensed by the fetch tool; quotes marked as paraphrase must be re-verified.
