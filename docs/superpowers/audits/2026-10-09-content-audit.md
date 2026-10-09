# Content Audit – 2026-10-09

Read-only audit of the 18 pages in `pages/` and `components/Sidebar.js`. Each claim was checked against the official docs on 2026-10-09. This audit is the input for **phase 2 (content update)**.

Sources: **CC** = `https://code.claude.com/docs/en/`, **PL** = `https://platform.claude.com/docs/en/about-claude/`. Line numbers refer to the old `pages/*.js` files.

## Findings by page

| Page | Line | Current text (short) | Problem | Correct current practice | Source | Severity |
|---|---|---|---|---|---|---|
| Sidebar / index / modes | Sidebar 12; index 90-91; modes 5, 9, 42-58 | "Plan vs Act Mode", "Act Mode … Default mode" | Claude Code has no "Act mode". The default in terminal and VS Code is **auto** mode (since v2.1.283). | Teach permission modes: `default` (Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. | CC permission-modes | High |
| modes | 25 | Plan mode "Does NOT … run any commands" | Plan mode reads files and runs shell commands. Only source edits wait for plan approval. | "Research, then propose; edits wait for approval." | CC permission-modes | Med |
| modes | 34, 82 | "Shift+Tab (toggle in Claude Code VSCode)" | Shift+Tab cycles 4+ modes in the CLI and JetBrains. VS Code uses the mode indicator. | CLI: Shift+Tab, `/plan`, `--permission-mode plan`. VS Code: mode indicator or `claudeCode.initialPermissionMode`. | CC permission-modes | Med |
| modes | 49 | Act mode "Requests your approval before destructive actions" | Approval behavior depends on the mode. | Explain approval behavior per mode. | CC permission-modes | Med |
| setup | 16-17 | `npm install -g @anthropic-ai/claude-code` | npm is no longer recommended. It needs Node.js 22+. | `curl -fsSL https://claude.ai/install.sh \| bash`; `irm https://claude.ai/install.ps1 \| iex`; Homebrew, WinGet, apt, dnf, apk. | CC setup | Med |
| setup | 15, 24 | "Create API key…", "enter API key" | A subscription login needs no API key. Console URL is now platform.claude.com. | Run `claude`, log in through the browser. `ANTHROPIC_API_KEY` only for API billing. | CC setup | High |
| setup | 14 | "Get subscription from anthropic.com" | Does not say that the free plan excludes Claude Code. | Needs Pro, Max, Team, Enterprise, or Console. | CC setup | Low |
| setup | 19, 21 | `claude` to check; `claude /login` | Checks are `claude --version`, `claude doctor`. Login: `/login` or `claude auth login`. | As stated. | CC setup, cli-reference | Med |
| setup | missing | — | No Windows/WSL guidance. | Add Windows/WSL note. | CC setup | Low |
| models | 18, 30, 42, 57-59 | `claude-opus-4`, `claude-sonnet-4`, `claude-haiku-3` | All three are retired. | Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5. | PL model-deprecations | High |
| models | 57-59 | "~$15/$75", "~$3/$15", "~$0.25/$1.25" | Prices outdated. | Per MTok in/out: Fable 5.1 $10/$50, Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 from $0.10/$0.50. | PL models/overview | High |
| models | 11, 89 | "three model tiers"; "Start with sonnet" | Missing `fable`, `best` aliases. Default is Opus 5.5. | Show aliases, `opusplan`, effort levels, `/model`, `--model`. | CC model-config | Med |
| models | 63 | "A token ≈ 0.75 words" | Current ratio ≈ 0.55 words/token. Task size unverified. | Use current ratio; point to `/context`. | PL models/overview | Low |
| structure | 18-23, 59, 203-206 | `~/.claude/memory/MEMORY.md` loaded every conversation | Path does not exist. | `~/.claude/projects/<project>/memory/MEMORY.md`; first 200 lines / 25KB load. | CC memory | High |
| structure | 25-31 | `skills/find-bug.md` (flat files) | Skills are directories. | `.claude/skills/<name>/SKILL.md` | CC skills | High |
| structure | 43, 131-132, 227-230 | "`.claude.json (project root)` ← project MCP config" | `~/.claude.json` is in home and app-managed. | Project MCP servers go in `.mcp.json`. | CC settings, mcp | High |
| structure | 41, 233-236 | Only `~/.claude/settings.json` | Settings hierarchy missing. | managed → CLI `--settings` → `.claude/settings.local.json` → `.claude/settings.json` → user. | CC settings | Med |
| structure | 37-39, 112-117 | `commands/` is "the entry point" | Commands are merged into skills (legacy format). | Use skills. | CC skills | Med |
| structure | 81 | Skills "rigid" or "flexible" | Superpowers convention, not Claude Code. | Remove or label. | CC skills | Low |
| structure | 11 vs Sidebar 13 | Title mismatch | Tree misses `.claude/rules/`, `CLAUDE.local.md`, `.claude/agent-memory/`, output-styles. | One title; add paths. | CC memory | Low |
| claude-md | 21 | `C:\Users\<YourName>\.claude\CLAUDE.md` | Windows-only. | `~/.claude/CLAUDE.md`; managed-policy paths per OS. | CC memory | Med |
| claude-md | 18-21 | Only project and global | Missing `.claude/CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/`, `@path` imports, AGENTS.md. | Add these; "under 200 lines" guidance. | CC memory | Med |
| claude-md | 42 | `claude /init` | Docs run `/init` inside a session. | `claude`, then `/init`. | CC memory (unverified form) | Low |
| memory | 11, 20, 24 | "Claude has no memory between sessions" | Auto memory is on by default; CLAUDE.md loads every session. | Explain CLAUDE.md vs auto memory. | CC memory | High |
| memory | 45, 93, 106, 115, 121 | `.claude/memory/MEMORY.md` vs `~/.claude/memory/MEMORY.md` | Wrong path, self-contradiction. Loads automatically. | `~/.claude/projects/<project>/memory/`; `/memory`. | CC memory | High |
| memory | 73 | "When referenced by agent or you" | Loads at every session start. | Fix row. | CC memory | High |
| memory | 35 | "Agents load memory automatically" | Subagents need the `memory:` field. | `memory: project`. | CC sub-agents | Med |
| memory | 86 | "under 1,000 tokens" | Invented. | 200 lines / 25KB. | CC memory | Low |
| memory | 98-110 | "Hooks Cannot Update Memory … Method 1 MANDATORY" | Hooks can inject context; `memory:` field replaces Method 1. | Use `memory:` field or auto memory. | CC hooks, sub-agents | Med |
| skills | 33-39 vs agents 133-136, 171-174 | `.claude/skills/` vs `~/.claude/skills/` | Paths mixed; agents read SKILL.md by hand. | Subagent `skills:` field. | CC sub-agents | Med |
| skills | 48-197 | Frontmatter only name/description | Missing `allowed-tools`, `disable-model-invocation`, `context: fork` + `agent`, `arguments`. Descriptions lack "when to use". | Add fields and "when to use". | CC skills | Low |
| skills | 131-149 | test-design counts only | No named techniques; manual cases only. | EP, BVA, decision tables, state transition, pairwise; Playwright tests. | ASTQB; playwright.dev/docs/test-agents | Med |
| agents | 122, 160 vs 139-140, 177-178 | `tools: Read, Grep, Glob, Bash` + MANDATORY MCP calls | Explicit `tools` list gives no MCP tools. | Add MCP tools or omit `tools`. | CC sub-agents | High |
| agents | 48-51, 75, 85, 187 | "Spawn a separate qa-agent" | Needs `Agent` in `tools`; max 3 levels. | Add `Agent` or orchestrate from main session. | CC sub-agents | High |
| agents | 110 | "Parallel sub-agents do not spawn automatically" | Claude delegates by `description`; background subagents run in parallel. | Explain delegation, @-mention, `claude --agent`. | CC sub-agents | Low |
| agents | 119-188 | Minimal frontmatter | Missing `permissionMode`, `skills`, `memory`, `mcpServers`, `disallowedTools`, `maxTurns`, `background`, `color`. | Show fields. | CC sub-agents | Low |
| hooks | 74-77, 48, 54, 94, 115, 135 | `$CLAUDE_TOOL_NAME`, `$CLAUDE_FILE_PATH`, `$CLAUDE_TOOL_INPUT` | Env vars do not exist. Hooks get JSON on stdin. All examples are no-ops. | `jq -r '.tool_input.file_path' \| xargs npx prettier --write` | CC hooks, hooks-guide | High |
| hooks | 21, 94-98, 148 | "exiting non-zero" blocks; `process.exit(1)` | Exit 1 does not block. Only exit 2 or JSON `permissionDecision: "deny"`. | `exit 2` with reason on stderr. | CC hooks | High |
| hooks | 39-40 | Windows paths | Missing `.claude/settings.local.json`. | Cross-platform paths; `"$CLAUDE_PROJECT_DIR"`. | CC hooks | Med |
| hooks | 53, 91, 112 | `"matcher": "Write"` | Edit tool bypasses it. | `"Edit\|Write"`; `permissions.deny` for `.env`. | CC hooks-guide, settings | Med |
| hooks | 150 | "stdout returned to Claude" | For most events stdout goes to debug log only. | Explain `additionalContext`, exit-2 stderr. | CC hooks | Med |
| hooks | 11, 18-32 | "shell commands"; only Pre/PostToolUse | 5 hook types, 33 events. | Add events and hook types table. | CC hooks | Med |
| commands | 39-58 | "Create a folder named commands" | Legacy format. | Skill with `context: fork` + `agent`, @-mention, `claude --agent`. | CC skills, sub-agents | Med |
| commands | missing | — | No built-in commands. | `/init`, `/memory`, `/mcp`, `/plan`, `/permissions`, `/context`, `/compact`, `/code-review`, `/security-review`, `/verify`. | CC commands | Med |
| mcp | 38 | "official registry at mcpmarket.com" | Third-party site. | Anthropic Directory, MCP Registry. | CC mcp | High |
| mcp | 75 | github.com/modelcontextprotocol/servers as registry | Reference servers only. | Link MCP Registry. | modelcontextprotocol/servers | Med |
| mcp | 64-69 | `server-github`, `server-postgres` | Both archived. | GitHub remote MCP via `--transport http`; DBHub with read-only user. | CC mcp | High |
| mcp | 43-44, 46 | Context7 "multi-layer retrieval"; Brave, Slack | Wrong description; archived servers. | Context7 = up-to-date library docs. | upstash/context7 | Med |
| mcp | 52-57 | "Claude Desktop → Settings → Integrations" | That is Desktop, not Claude Code. | `claude mcp add-from-claude-desktop`. | CC mcp | Med |
| mcp | 29, 33 | `claude mcp add --scope user jira-mcp node …` | Not documented form; scopes, OAuth, trust warning missing. | `claude mcp add --transport stdio jira-mcp -- node …` | CC mcp | Low |
| superpower | 9-13, 146; index 234-235; principles 117-118 | "Superpowers IS an agent" | It is a plugin of skills. | Present as plugin. | obra/superpowers | High |
| superpower | 15-44 | "14 Mandatory Superpowers Skills" | Invented list. | Real skills: brainstorming, writing-plans, executing-plans, TDD, systematic-debugging, … | obra/superpowers | High |
| superpower | 50-52, 56 | `npm install -g @obra/superpowers`; `claude install superpowers` | Wrong commands. | `/plugin install superpowers@claude-plugins-official` | obra/superpowers | High |
| superpower / index | index 234-235; superpower 5, 100-108 | "Superpower Mode — remove approval prompts" | Mixes plugin with permission modes. | `auto` mode; `bypassPermissions` only in containers/VMs. | CC permission-modes | High |
| principles | 10 vs 5; index 247 | "12 principles" vs "8 principles" | Self-contradiction. | Pick one. | — | Low |
| principles | 58 | "No permission prompts for trusted agents" | Unsafe. | Auto mode, allow/deny rules, subagent `permissionMode`. | CC permission-modes | Med |
| principles / context / ai-systems | principles 68; context 18, 30; ai-systems 27; index 151 | "RAG", "vector DB", "Memory (RAG)" | Claude Code gathers context with tools; memory is files. | Agentic context gathering. | CC how-claude-code-works | Med |
| principles | 18 vs ai-systems 36 | Interface Layer defined twice differently | Inconsistent. | One definition. | — | Low |
| principles | 128, 142 | "switch to Act Mode or invoke Superpowers" | Terms do not exist. | Approve the plan. | CC permission-modes | Med |
| ai-systems | 49, 55 | commands → agents → SKILL.md flow | Legacy. | Skills called directly; `skills:` preload. | CC skills, sub-agents | Low |
| context | 43-48 | "Power: Limited/Massive" | Unsourced. | Remove or source. | unverified | Low |
| marketplace | 13-14 | "Official Directory: claudemarketplaces.com" | Community site. | `claude-plugins-official`; claude.com/marketplace. | CC discover-plugins | High |
| marketplace | 10, 24, 34, 44 | "2,400+ skills …" | Third-party, changing numbers. | Remove or date. | unverified | Low |
| marketplace | 146 | "Completely free and open" | No security warning. | Review plugins before install. | CC discover-plugins | Med |
| marketplace | missing, 91 | No install steps; old docs domain | Not actionable. | `/plugin marketplace add`, `/plugin install`, `marketplace.json`. | CC discover-plugins, plugin-marketplaces | Med |
| index | 67, 79 | "subscription, API key"; "Opus vs Sonnet vs Haiku" | Misleading; Fable missing. | Align with fixed pages. | CC setup, model-config | Low |
| prompt | 33-39 | Role, Context, Scope, Constraints | Incomplete: no verification criteria. | Add verification criteria and examples. | unverified | Low |

## Missing topics

1. Permission modes and allow/ask/deny rules, `/permissions`.
2. Settings hierarchy: managed, CLI, local, project, user; `.mcp.json`, `~/.claude.json`.
3. Plugins: install, scopes, `marketplace.json`. Superpowers as one example.
4. Headless and CI: `claude -p`, `--output-format json`, `--json-schema`, `--bare`, `--allowedTools`, `--permission-mode dontAsk`, `--max-turns`, `--max-budget-usd`.
5. GitHub Actions: `anthropics/claude-code-action@v1`, `/install-github-app`, `claude setup-token`, @claude mentions.
6. Built-in QA commands: `/code-review`, `/security-review`, `/verify`.
7. Playwright: Test Agents (`npx playwright init-agents --loop=claude`), Playwright MCP, Claude in Chrome (`--chrome`).
8. Test design techniques: EP, BVA, decision tables, state transition, pairwise; flaky-test triage; automated test generation.
9. Memory features: auto memory, `.claude/rules/`, `CLAUDE.local.md`, AGENTS.md, `@imports`.
10. Context and safety: `/context`, `/compact`, MCP tool search, checkpoints (Esc Esc), worktrees, sandboxing, MCP prompt-injection risk.
11. Hooks reference: events, stdin JSON schema, JSON decision output, hook types, `/hooks`.

## Suggested merges and splits

- Merge prompt + context + ai-systems → "Foundations".
- Merge claude-md + memory → one page.
- Merge commands into skills.
- Replace modes with "Permission modes"; move autonomy content from superpower and principles into it.
- Merge superpower + marketplace → "Plugins & Marketplaces".
- Reduce structure to a `.claude/` directory and settings reference.
- Trim principles to principles only.
- Add "CI / Headless / GitHub Actions" and "Browser testing with Playwright".

## Recheck before publishing

Items marked "unverified" in the Source column.

## Resolution (2026-10-10)

Phase 2 (content refresh, branch `feat/content-refresh`) replaced the 18 old pages with 17 new pages. Each row below was checked against the new MDX file. "Section" is the `##` or `###` heading in the new page.

- **fixed**: the new page states the correct practice, with a cite.
- **obsolete**: the old page or claim is gone and no new page repeats it. The reason says what replaced it.

### High and Med rows

| # | Old page (line) | Sev. | Status | New page › section | Evidence |
|---|---|---|---|---|---|
| 1 | Sidebar / index / modes (Act mode) | High | fixed | `/getting-started/permission-modes/` › The six modes | Lists `default` (Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. "Act mode" appears on no page. |
| 2 | modes 25 (plan runs no commands) | Med | fixed | `/getting-started/permission-modes/` › Plan (`plan`) | "Plan mode does run shell commands to explore. It does not edit your source until you approve the plan." |
| 3 | modes 34, 82 (Shift+Tab in VS Code) | Med | fixed | `/getting-started/permission-modes/` › Switch modes (In the CLI, In VS Code, In JetBrains IDEs) | CLI cycle with `Shift+Tab`, `/plan`, `--permission-mode`; VS Code mode indicator and `claudeCode.initialPermissionMode`. |
| 4 | modes 49 (Act mode approvals) | Med | fixed | `/getting-started/permission-modes/` › The six modes | The mode table and one `###` per mode say what each mode asks for. |
| 5 | setup 16-17 (npm install) | Med | fixed | `/getting-started/setup/` › Native installer (recommended); Homebrew, WinGet, and Linux package managers; npm (alternative) | npm "needs Node.js 22 or later"; native installer is the recommended path. |
| 6 | setup 15, 24 (API key needed) | High | fixed | `/getting-started/setup/` › Subscription login in the browser; Console account or API key | "Run `claude` and follow the browser prompts to log in." `ANTHROPIC_API_KEY` only for Console/API billing, with a warning that it overrides the subscription. |
| 7 | setup 19, 21 (`claude`, `claude /login`) | Med | fixed | `/getting-started/setup/` › Verify the install; Login commands | `claude --version`, `claude doctor`, `/login`, `claude auth login`. |
| 8 | models 18-59 (Claude 4 / Haiku 3 IDs) | High | fixed | `/getting-started/models/` › The current lineup; Retired and deprecated models | Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5; old IDs listed as retired. |
| 9 | models 57-59 (old prices) | High | fixed | `/getting-started/models/` › The current lineup; Price details | $10/$50, $4/$20, $2/$10, from $0.10/$0.50 per MTok. |
| 10 | models 11, 89 (three tiers, start with sonnet) | Med | fixed | `/getting-started/models/` › Model aliases in Claude Code; Which model you get by default; Effort levels | `fable`, `best`, `opusplan` aliases; default Opus 5.5; `/model`, `--model`, effort levels. |
| 11 | structure 18-23, 59, 203-206 (`~/.claude/memory/MEMORY.md`) | High | fixed | `/configure/claude-md/` › Auto memory; `/configure/settings/` › The .claude folder | `~/.claude/projects/<project>/memory/`; first 200 lines or 25KB of `MEMORY.md` load. Settings page: "It is not in `~/.claude/memory/`." |
| 12 | structure 25-31 (flat skill files) | High | fixed | `/extend/skills/` › Where skills live; Write a SKILL.md | `.claude/skills/<name>/SKILL.md`. |
| 13 | structure 43, 131-132, 227-230 (`.claude.json` in project root) | High | fixed | `/configure/settings/` › MCP configuration files; `/extend/mcp/` › Scopes and .mcp.json | Project servers in `.mcp.json`; local and user scope in `~/.claude.json`, which Claude Code writes for itself. |
| 14 | structure 41, 233-236 (one settings file) | Med | fixed | `/configure/settings/` › Settings files; Which setting wins | Managed → `--settings` → `.claude/settings.local.json` → `.claude/settings.json` → `~/.claude/settings.json`. |
| 15 | structure 37-39, 112-117 (`commands/` is the entry point) | Med | fixed | `/extend/skills/` › Skills and commands | "Custom commands have been merged into skills." Legacy-format callout. |
| 16 | claude-md 21 (Windows-only path) | Med | fixed | `/configure/claude-md/` › Where CLAUDE.md files live | `~/.claude/CLAUDE.md`; managed-policy paths for macOS, Linux and WSL, Windows. |
| 17 | claude-md 18-21 (only project and global) | Med | fixed | `/configure/claude-md/` › Where CLAUDE.md files live; Keep it small: imports, rules, and AGENTS.md | `.claude/CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/`, `@path` imports, AGENTS.md, "Target under 200 lines". |
| 18 | memory 11, 20, 24 ("no memory between sessions") | High | fixed | `/configure/claude-md/` › Two ways Claude remembers | Table of CLAUDE.md vs auto memory; both load at session start. |
| 19 | memory 45, 93, 106, 115, 121 (wrong memory path) | High | fixed | `/configure/claude-md/` › Auto memory; Control auto memory | `~/.claude/projects/<project>/memory/`; `/memory` opens the folder. |
| 20 | memory 73 ("when referenced") | High | fixed | `/configure/claude-md/` › Two ways Claude remembers; How the files load | "What loads at session start" row; load order from the filesystem root down. |
| 21 | memory 35 ("agents load memory automatically") | Med | fixed | `/configure/claude-md/` › Subagent memory; `/extend/subagents/` › Memory | "A subagent gets its own memory only with the `memory` field." |
| 22 | memory 98-110 ("Hooks cannot update memory … Method 1 MANDATORY") | Med | fixed | `/configure/claude-md/` › Subagent memory; `/extend/hooks/` › JSON output | The `memory` field replaces "Method 1"; hooks add context with `additionalContext`. |
| 23 | skills 33-39 vs agents (mixed paths, manual SKILL.md reads) | Med | fixed | `/extend/skills/` › Where skills live; `/extend/subagents/` › The qa-agent and the sdet-agent | "`skills:` preloads the full skill content at startup." |
| 24 | skills 131-149 (test-design counts only) | Med | fixed | `/foundations/test-design/` › Equivalence partitioning … Pairwise testing; From designed cases to automated tests; A reusable test-design skill | EP, BVA, decision tables, state transition, pairwise; Playwright parameterized tests and Test Agents. |
| 25 | agents 122, 160 (`tools` list without MCP) | High | fixed | `/extend/subagents/` › Tools and MCP access | "`tools` is an allowlist"; `mcp__<server>` patterns; example `tools: Read, Grep, Glob, mcp__atlassian`. |
| 26 | agents 48-51, 75, 85, 187 ("spawn a separate qa-agent") | High | fixed | `/extend/subagents/` › The qa-agent and the sdet-agent; Parallel work and nesting | "`Agent` is not in its `tools` list, so it cannot spawn a subagent"; main conversation calls each subagent; nesting depth limit. |
| 27 | hooks 74-77 etc. (`$CLAUDE_TOOL_NAME` env vars) | High | fixed | `/extend/hooks/` › What your hook receives | JSON on stdin; "Common mistake: $CLAUDE_FILE_PATH" callout; `jq` examples in QA examples. |
| 28 | hooks 21, 94-98, 148 (exit 1 blocks) | High | fixed | `/extend/hooks/` › Exit codes | "Exit 1 does not block" callout; exit 2 or `permissionDecision: "deny"` blocks. |
| 29 | hooks 39-40 (Windows paths, no local settings) | Med | fixed | `/extend/hooks/` › Where hooks live; What your hook receives | `.claude/settings.local.json` row; `CLAUDE_PROJECT_DIR`. |
| 30 | hooks 53, 91, 112 (`"matcher": "Write"`) | Med | fixed | `/extend/hooks/` › Matchers; Block edits to .env and migrations | "Use `Edit\|Write` for file changes." |
| 31 | hooks 150 ("stdout returned to Claude") | Med | fixed | `/extend/hooks/` › Exit codes; JSON output | "For most events, stdout goes to the debug log"; `additionalContext`; exit-2 stderr. |
| 32 | hooks 11, 18-32 (shell only, Pre/PostToolUse only) | Med | fixed | `/extend/hooks/` › Events; Hook types; All 33 events | 33 events; `command`, `http`, `mcp_tool`, `prompt`, `agent` types. |
| 33 | commands 39-58 ("create a folder named commands") | Med | fixed | `/extend/skills/` › Skills and commands; Run a skill in a subagent; `/extend/subagents/` › Call a subagent | `context: fork` + `agent`; @-mention; `claude --agent`. |
| 34 | commands, missing (no built-in commands) | Med | fixed | `/extend/skills/` › Built-in commands for QA | `/code-review`, `/security-review`, `/verify`, `/plan`, and others in one table. |
| 35 | mcp 38 (mcpmarket.com as registry) | High | fixed | `/extend/mcp/` › Find servers you can trust | Anthropic Directory and MCP Registry. mcpmarket.com appears on no page. |
| 36 | mcp 75 (`modelcontextprotocol/servers` as registry) | Med | fixed | `/extend/mcp/` › Find servers you can trust | "Reference implementations, not production-ready servers." |
| 37 | mcp 64-69 (`server-github`, `server-postgres`) | High | fixed | `/extend/mcp/` › Find servers you can trust; GitHub; Test database (DBHub) | Archived servers named; GitHub remote server over `--transport http`; DBHub read-only mode. |
| 38 | mcp 43-46 (Context7 "multi-layer retrieval", Brave, Slack) | Med | fixed | `/extend/mcp/` › Library docs (Context7); Find servers you can trust | "Context7 puts up-to-date, version-specific library documentation … into your prompt." Brave and Slack listed as archived. |
| 39 | mcp 52-57 (Claude Desktop → Integrations) | Med | fixed | `/extend/mcp/` › Sign in with OAuth | "`claude mcp add-from-claude-desktop` copies servers from Claude Desktop. It works only on macOS and WSL." |
| 40 | superpower 9-13, 146 ("Superpowers IS an agent") | High | fixed | `/extend/plugins/` › Example: the Superpowers plugin › What it is | "Superpowers is a plugin in the official marketplace." Card "Superpowers as a plugin of skills". |
| 41 | superpower 15-44 ("14 Mandatory Superpowers Skills") | High | fixed | `/extend/plugins/` › The skills | The README's 15 skills, grouped. |
| 42 | superpower 50-56 (npm / `claude install`) | High | fixed | `/extend/plugins/` › Install | `/plugin install superpowers@claude-plugins-official`; "Common mistake: old install commands" callout. |
| 43 | superpower / index ("Superpower Mode — remove approval prompts") | High | fixed | `/getting-started/permission-modes/` › Auto (`auto`); Bypass permissions (`bypassPermissions`); Run unattended safely | Auto mode classifier; `bypassPermissions` only in containers or VMs. The plugin page presents Superpowers as skills, not a mode. |
| 44 | principles 58 ("no permission prompts for trusted agents") | Med | fixed | `/foundations/principles/` › 6. Grant the least permission that works | Auto mode, deny/allow rules, `/permissions`, `/sandbox`. |
| 45 | principles / context / ai-systems ("RAG", "vector DB") | Med | fixed | `/foundations/how-claude-code-works/` › How Claude finds context | "Claude Code gathers context with tools: it searches, reads files, and runs commands." No page says RAG or vector DB. The context and ai-systems pages were merged into this page. |
| 46 | principles 128, 142 ("switch to Act Mode or invoke Superpowers") | Med | fixed | `/getting-started/permission-modes/` › Plan (`plan`) | Approval options "Yes, and use auto mode", "Yes, manually approve edits", "No, keep planning". Principles page no longer has this text. |
| 47 | marketplace 13-14 (claudemarketplaces.com as official) | High | fixed | `/extend/plugins/` › Marketplaces | Official `claude-plugins-official`; "A plugin marketplace is not Claude Marketplace (claude.com/marketplace)". |
| 48 | marketplace 146 ("completely free and open") | Med | fixed | `/extend/plugins/` › Marketplaces | "Anthropic does not review third-party marketplaces." The review steps follow in › Review before you install. |
| 49 | marketplace 91, missing (no install steps, old domain) | Med | fixed | `/extend/plugins/` › Install and manage; Build a team marketplace | `/plugin marketplace add`, `/plugin install`, `marketplace.json`. |

Result: 49 High and Med rows. 49 fixed, 0 obsolete. Every row whose old page was merged (context, ai-systems, memory, commands, structure, superpower, marketplace) is resolved on the merged page named above.

### Low rows

All 18 Low rows are fixed or obsolete. Examples: the free plan exclusion and Windows/WSL notes are on `/getting-started/setup/` (Before you install; Windows and WSL); the token ratio is on `/getting-started/models/` (Tokens and words); `/init` inside a session is on `/configure/claude-md/` (Generate a first file with /init); skill and subagent frontmatter are in the Reference sections of `/extend/skills/` and `/extend/subagents/`; principles is "eight" on every page; verification criteria are on `/foundations/prompting/` (Give Claude a way to verify its work). The unsourced "2,400+ skills" counts and "Power: Limited/Massive" table are obsolete: their pages were merged and no new page repeats them.

### Missing topics

| # | Topic | Covered by |
|---|---|---|
| 1 | Permission modes, allow/ask/deny rules, `/permissions` | `/getting-started/permission-modes/` › The six modes; Allow, ask, and deny rules |
| 2 | Settings hierarchy, `.mcp.json`, `~/.claude.json` | `/configure/settings/` › Which setting wins; MCP configuration files |
| 3 | Plugins: install, scopes, `marketplace.json`, Superpowers as one example | `/extend/plugins/` › Install and manage; Scopes; Build a team marketplace; Example: the Superpowers plugin |
| 4 | Headless and CI flags | `/automate/headless/` › Output formats; Make CI runs repeatable with --bare; Permissions in unattended runs; Limits and budgets |
| 5 | GitHub Actions: `@v1`, `/install-github-app`, `claude setup-token`, @claude | `/automate/github-actions/` › What the Action does; Set it up; Respond to @claude in issues and PRs |
| 6 | Built-in QA commands `/code-review`, `/security-review`, `/verify` | `/extend/skills/` › Built-in commands for QA |
| 7 | Playwright Test Agents, Playwright MCP, Claude in Chrome (`--chrome`) | `/automate/playwright/` › Playwright MCP; Playwright Test Agents; Claude in Chrome |
| 8 | Test design techniques, flaky-test triage, automated test generation | `/foundations/test-design/` (all technique sections; From designed cases to automated tests); `/automate/github-actions/` › Triage a flaky test; `/automate/headless/` › QA example: triage a failing test in CI |
| 9 | Auto memory, `.claude/rules/`, `CLAUDE.local.md`, AGENTS.md, `@imports` | `/configure/claude-md/` › Auto memory; Keep it small: imports, rules, and AGENTS.md; Where CLAUDE.md files live |
| 10 | `/context`, `/compact`, MCP tool search, checkpoints, worktrees, sandboxing, MCP prompt injection | `/foundations/how-claude-code-works/` › Check it with /context; Compaction; Checkpoints and rewind; `/extend/mcp/` › Keep it safe; Context cost; `/getting-started/permission-modes/` › Run unattended safely (sandbox). **Worktrees: not covered.** No page teaches `claude --worktree`; it was out of the spec's page scope. |
| 11 | Hooks reference: events, stdin JSON, JSON output, hook types, `/hooks` | `/extend/hooks/` › What your hook receives; JSON output; Events; Hook types; When a hook does not fire |
