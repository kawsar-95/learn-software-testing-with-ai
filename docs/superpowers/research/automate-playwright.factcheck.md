# Fact-check: Browser Testing with Playwright (round 1, 2026-10-10)

Sources fetched by the checker: S1 README (raw GitHub, microsoft/playwright-mcp main); S2 RENDERED https://playwright.dev/docs/release-notes; S3 code.claude.com/docs/en/chrome.md; S4 RENDERED https://playwright.dev/docs/getting-started-mcp; S5 code.claude.com/docs/en/mcp.md; S6 RENDERED https://playwright.dev/docs/test-agents; S7 raw `packages/playwright/src/agents/generateAgents.ts` (main). Cite check: n=1..7 exist, all 7 sources cited, first-cite order 1..7. S7 URL (github.com/microsoft/playwright/blob/main/packages/playwright/src/agents/generateAgents.ts) is in `page.sources`.

Rendered-page findings: test-agents lists loops `vscode`, `claude`, `codex`, `opencode`; release notes show "Version 1.56 ... Introducing Playwright Test Agents" (page nav lists up to v1.64); getting-started-mcp says "Node.js 20 or newer" (README: "Node.js 18 or newer").

`init-agents --loop=claude` (S7, `ClaudeGenerator.init`): calls `initRepo` (creates `specs/README.md` only `if (!fs.existsSync('specs'))`; writes default seed file only `if (!seedFile)`), then `writeFile(\`.claude/agents/${agent.name}.md\`, ...)` per agent, then `writeFile('.mcp.json', JSON.stringify({ mcpServers: { 'playwright-test': mcpServer } }))`. `writeFile` = `fs.promises.writeFile(filePath, content, 'utf-8')` (overwrite, no merge; the VS Code path merges via `appendToMCPJson`, the Claude path does not). `mcpServer` = `{ command: 'npx', args: ['playwright','run-test-mcp-server'] }`, but on `win32` = `{ command: 'cmd', args: ['/c','npx','playwright','run-test-mcp-server'] }`.

| # | Location | Claim | Cite | Verdict | Evidence / Fix |
|---|---|---|---|---|---|
| 1 | Three ways table | Playwright MCP lets Claude work with pages through structured accessibility snapshots, without screenshots | 1 | PASS | README: "interact with web pages through structured accessibility snapshots, bypassing the need for screenshots or visually-tuned models". |
| 2 | table | Test Agents = three agent definitions (planner, generator, healer) that guide an LLM through building a Playwright test | 2 | PASS | Release notes 1.56: "three custom agent definitions designed to guide LLMs through the core process of building a Playwright test". |
| 3 | table | Claude in Chrome = connection from Claude Code to the extension in your own browser | 3 | PASS | "integrates with the Claude in Chrome browser extension"; "shares your browser's login state". |
| 4 | table "Use it for" column | Exploring/finding locators; plans and code you keep in repo; interactive debugging | - | OPINION-OK | Usage advice, no checkable claim. |
| 5 | Rule-of-thumb callout | Choice advice (tutorial's rule) | - | OPINION-OK | Labeled as the tutorial's rule. |
| 6 | callout | Claude in Chrome does not work with API-key or setup-token sign-in | 3 | PASS | "If you authenticate with an API key or a long-lived token from `claude setup-token`, Claude Code keeps Chrome integration off, even when you pass `--chrome`". |
| 7 | Add the server | README command `claude mcp add playwright npx @playwright/mcp@latest` | 1 | PASS | README line: identical (also S4 "Claude Code" section). |
| 8 | bullets | Playwright docs ask Node.js 20 or newer | 4 | PASS | Rendered page: "Node.js 20 or newer". |
| 9 | bullets | README says Node.js 18 or newer | 1 | PASS | README: "Node.js 18 or newer". |
| 10 | bullets | "Use Node.js 20 or newer to meet both" | - | OPINION-OK | Advice that follows from rows 8-9. |
| 11 | bullets | `--` before server command; everything after goes to the server unchanged | 5 | PASS | "the `--` (double dash) separates Claude's own options ... Everything after `--` is passed to the server untouched". |
| 12 | bullets | `--scope project` stores server in `.mcp.json`, shared with team | 5 | PASS | "`project`: shared with everyone in the project via the `.mcp.json` file". |
| 13 | code | `claude mcp add --transport stdio playwright -- npx @playwright/mcp@latest --headless --isolated` | 5,1 | EXAMPLE-OK | Labeled "Example". Syntax matches S5 (`claude mcp add --transport stdio myserver -- npx server`); `--headless`, `--isolated` are in README options table. |
| 14 | Snapshots | Uses accessibility tree, not pixel-based input; no vision model needed | 1 | PASS | README: "Uses Playwright's accessibility tree, not pixel-based input"; "No vision models needed". |
| 15 | Snapshots | Claude acts on `browser_snapshot`; cannot act on a `browser_take_screenshot` screenshot | 1 | PASS | README tool text: "You can't perform actions based on the screenshot, use browser_snapshot for actions." |
| 16 | Snapshots | `--caps` possible values are `vision`, `pdf`, `devtools` | 1 | FAIL | The README options table says "possible values: vision, pdf, devtools", but the same README's Tools section lists more opt-in groups: "(opt-in via --caps=config)", "--caps=network", "--caps=storage", "--caps=testing". The page states the list as exhaustive ("The possible values are"). Fix: "Values include `vision`, `pdf`, and `devtools`" or omit the list. |
| 17 | Snapshots | `--caps=vision` adds coordinate-based mouse tools, e.g. `browser_mouse_click_xy` | 1 | PASS | README: "Coordinate-based (opt-in via --caps=vision)" with `browser_mouse_click_xy`. |
| 18 | Snapshots | "Use it only when the snapshot cannot reach an element" | - | OPINION-OK | Advice. |
| 19 | Options table | `--headless`: headless; default headed | 1 | PASS | "run browser in headless mode, headed by default". |
| 20 | table | `--browser`: chrome, firefox, webkit, msedge | 1 | PASS | "possible values: chrome, firefox, webkit, msedge". |
| 21 | table | `--isolated`: profile in memory, not saved to disk | 1 | PASS | "keep the browser profile in memory, do not save it to disk". |
| 22 | table | `--storage-state <path>`: loads cookies and local storage into isolated context | 1 | PASS | "load cookies and local storage from the file into an isolated browser context". |
| 23 | table | `--allowed-origins`: semicolon-separated trusted origins; default allows all | 1 | PASS | Verbatim. |
| 24 | table | `--test-id-attribute`: default `data-testid` | 1 | PASS | Verbatim. |
| 25 | table | `--device`: e.g. `"iPhone 15"` | 1 | PASS | Verbatim. |
| 26 | MCP or CLI | Coding agents may prefer CLI with skills (fewer tokens); MCP stays useful for exploratory automation, self-healing tests, long workflows with continuous browser context | 1 | PASS | README bullets "CLI ... more token-efficient"; "MCP remains relevant ... exploratory automation, self-healing tests, or long-running autonomous workflows where maintaining continuous browser context". |
| 27 | Safety | README: Playwright MCP is not a security boundary | 1 | PASS | "Playwright MCP is **not** a security boundary." |
| 28 | Safety | `--allowed-origins` and `--blocked-origins` not a security boundary, do not affect redirects | 1 | PASS | Both rows: "*does not* serve as a security boundary and *does not* affect redirects". |
| 29 | Safety | `browser_run_code_unsafe` runs arbitrary JS in the server process; RCE-equivalent | 1 | PASS | "executes arbitrary JavaScript in the Playwright server process and is RCE-equivalent". |
| 30 | Safety | Servers that fetch external content can expose you to prompt injection | 5 | PASS | "Servers that fetch external content can expose you to prompt injection risk". |
| 31 | Safety | "Text on a web page is data, not instructions" | - | OPINION-OK | Advice. |
| 32 | Safety | Claude Code asks for approval before using a `.mcp.json` server in interactive sessions | 5 | PASS | "Claude Code prompts for approval in interactive sessions before using project-scoped servers from `.mcp.json` files". |
| 33 | Test Agents | Three agents: planner explores and produces Markdown plan; generator transforms plan into test files; healer executes suite and repairs failures | 6 | PASS | Rendered page, Introduction (same three lines). |
| 34 | para | Agents can run independently, sequentially, or as chained calls in an agentic loop | 6 | PASS | "These agents can be used independently, sequentially, or as the chained calls in the agentic loop." |
| 35 | para | Playwright v1.56 introduced them | 2 | PASS | Rendered release notes: "Version 1.56 ... Introducing Playwright Test Agents". |
| 36 | Set up | `npx playwright init-agents --loop=claude` | 6 | PASS | Rendered page: identical command in Claude Code tab. |
| 37 | Set up | Re-run on each Playwright update to get new tools/instructions | 6 | PASS | "should be regenerated whenever Playwright is updated to pick up new tools and instructions". |
| 38 | Set up | Other loops: `vscode`, `codex`, `opencode` | 6 | PASS | Rendered page tabs: VS Code, Claude Code, Codex, OpenCode. Note: source code also has a `copilot` generator not shown on the page; the cited doc lists exactly those three. |
| 39 | Files list | One agent file per agent in `.claude/agents/` | 7 | PASS | `writeFile(\`.claude/agents/${agent.name}.md\`, ...)` in a loop over agents. |
| 40 | Files list | `.mcp.json` with one server `playwright-test` running `npx playwright run-test-mcp-server` | 7 | PASS | `mcpServers: { 'playwright-test': mcpServer }` with `command: 'npx', args: ['playwright','run-test-mcp-server']`. Caveat: on Windows the code writes `cmd /c npx playwright run-test-mcp-server`. Optional note. |
| 41 | Files list | `specs/README.md` if `specs/` does not exist | 7 | PASS | `if (!fs.existsSync('specs')) { ... writeFile(path.join('specs','README.md'), ...)`. |
| 42 | Files list | Default seed test if project has no seed test | 7 | PASS | `if (!seedFile) { seedFile = defaultSeedFile(project); await writeFile(seedFile, seedFileContent, ...)`. |
| 43 | Warning callout | The Claude loop writes a new `.mcp.json` with only `playwright-test` (existing `.mcp.json` is replaced) | 7 | PASS | Code: unconditional `writeFile('.mcp.json', JSON.stringify({ mcpServers: { 'playwright-test': mcpServer } }))` -> `fs.promises.writeFile` overwrite, no read/merge. Contrast: VS Code path reads and merges `.vscode/mcp.json`. The claim is supported by the cited source code. |
| 44 | Warning callout | "Commit it first; use `git diff` to add other servers back" | - | OPINION-OK | Advice. |
| 45 | Planner/generator/healer table | Planner input: clear request, seed test, optional PRD | 6 | PASS | "A clear request to the planner"; "A seed test..."; "(optional) A Product Requirement Document (PRD)". |
| 46 | table | Planner output: Markdown plan in `specs/`, e.g. `specs/basic-operations.md` | 6 | PASS | "A Markdown test plan saved as specs/basic-operations.md." |
| 47 | table | Generator input: Markdown plan from `specs/`; output: suite under `tests/`; verifies selectors/assertions live | 6 | PASS | "Markdown plan from specs/"; "A test suite under tests/"; "It verifies selectors and assertions live as it performs the scenarios." |
| 48 | table | Healer input: failing test name; output: passing test or skipped test if functionality believed broken | 6 | PASS | Verbatim. |
| 49 | bullets | Seed test `tests/seed.spec.ts` in docs; gives ready `page` context; planner runs it for all setup; uses it as example for generated tests | 6 | PASS | "Planner will run this test to execute all the initialization..."; "use this seed test as an example of all the generated tests"; "Seed tests provide a ready-to-use `page` context"; plan shows `tests/seed.spec.ts`. |
| 50 | bullets | Generated tests may include initial errors; healer can fix them | 6 | PASS | "may include initial errors that can be healed automatically by the healer agent". |
| 51 | bullets | Healer replays, inspects UI for equivalents, suggests patch, re-runs until pass or guardrails stop | 6 | PASS | Verbatim list. |
| 52 | Warning callout | "A skipped test can mean a real product bug... review every diff" | - | OPINION-OK | Advice; the skip rule itself is S6 (row 48). |
| 53 | Claude in Chrome | `claude --chrome` connects to the extension | 3 | PASS | "Start Claude Code with the `--chrome` flag". |
| 54 | Claude in Chrome | Test a local web app, read console errors and DOM state, record GIF | 3 | PASS | Capabilities list: "Live debugging: read console errors and DOM state"; "Session recording: record browser interactions as GIFs"; "Test a local web application". |
| 55 | bullets | Extension 1.0.36+; direct Anthropic plan (Pro, Max, Team, Enterprise) | 3 | PASS | Prerequisites, verbatim. |
| 56 | bullets | Works with Chrome and Edge; not supported in WSL | 3 | PASS | "works with Google Chrome and Microsoft Edge ... isn't supported in WSL" (also detects other Chromium browsers; not a conflict). |
| 57 | bullets | Must sign in with `/login`; API key or setup-token keeps Chrome off even with `--chrome` | 3 | PASS | "requires signing in with `/login`... Claude Code keeps Chrome integration off, even when you pass `--chrome`". |
| 58 | bullets | "So it is not for CI" | - | OPINION-OK | Inference from row 57; advice. |
| 59 | bullets | Shares browser login state; pauses on login page/CAPTCHA | 3 | PASS | Verbatim. |
| 60 | bullets | `/mcp` -> `claude-in-chrome` -> **View tools** | 3 | PASS | "Run `/mcp`, select `claude-in-chrome`, then select **View tools**". |
| 61 | code | Docs prompt (login form validation, localhost:3000) | 3 | PASS | Identical text in S3. |
| 62 | Workflow | Explore/Plan/Generate/Run/Heal steps and prompts (staging.example.com, `specs/checkout-criteria.md`) | 1,6 | EXAMPLE-OK | Callout labels "The steps and prompts below are the tutorial's workflow". Uses only documented parts: MCP (S1), planner/generator/healer and `specs/`, `tests/seed.spec.ts` (S6); planner prompt mirrors S6 "Generate a plan for guest checkout". `specs/checkout-criteria.md` is an invented file in a labeled example. |
| 63 | Workflow | Jira ticket via Jira MCP server | - | OPINION-OK | Internal cross-link; no external claim. |
| 64 | Keep test data safe | Use test accounts, non-production env; page content goes into Claude's context | - | OPINION-OK | Advice; the context fact is general. |
| 65 | bullets | "Sign in once as test user, save the session to a file, and load it with `--isolated` and `--storage-state`" | 1 | WRONG-CITE | Load part is S1 (README "Isolated" config uses `--isolated` + `--storage-state=`). The "save the session to a file" part is not in the README; S4 (rendered) says "Storage state ... Save state: Persist authentication and session data to a file." Fix: cite 4 for the saving step. |
| 66 | bullets | `--allowed-origins` is a guardrail, not a security boundary | 1 | PASS | See row 28. |
| 67 | bullets | `--secrets <path>` dotenv file; replaces matching plain text in tool responses; README calls it a convenience, not a security feature | 1 | PASS | Table: "path to a file containing secrets in the dotenv format"; config comment: "replace matching plain text in the tool responses ... It is a convenience and not a security feature". |
| 68 | bullets | Claude in Chrome uses browser login state; use only test accounts | 3 | PASS | See row 59 (second half is advice). |
| 69 | nav description | "Explore, plan, generate, and heal browser tests with Playwright MCP and the Playwright Test Agents." | - | PASS | Agents: S6 (plan/generate/heal); MCP: S1 (explore). |
| 70 | nav tagline | "write, run, and fix browser tests" | - | OPINION-OK | Marketing phrase. |

Checked as requested: Node statements (rows 8-10) PASS; "introduced in v1.56" (row 35) PASS against the rendered page; `.mcp.json` replacement warning (row 43) supported by cited source code and S7 URL is in `page.sources`; `--chrome` auth limitation (rows 6, 57) PASS.

Open FAILs: 2 (rows 16 FAIL, 65 WRONG-CITE)
