# Settings & the .claude Folder — research notes (2026-10-10)

## Sources
S1. Settings files and precedence (Settings) — Anthropic, Claude Code docs — https://code.claude.com/docs/en/settings — accessed 2026-10-10
S2. Explore the .claude directory — Anthropic, Claude Code docs — https://code.claude.com/docs/en/claude-directory — accessed 2026-10-10
S3. Settings reference — Anthropic, Claude Code docs — https://code.claude.com/docs/en/settings-reference — accessed 2026-10-10
S4. Connect Claude Code to tools via MCP — Anthropic, Claude Code docs — https://code.claude.com/docs/en/mcp — accessed 2026-10-10
S5. Deploy managed settings — Anthropic, Claude Code docs — https://code.claude.com/docs/en/managed-settings — accessed 2026-10-10
S6. Skills — Anthropic, Claude Code docs — https://code.claude.com/docs/en/skills — accessed 2026-10-10
S7. Output styles — Anthropic, Claude Code docs — https://code.claude.com/docs/en/output-styles — accessed 2026-10-10
S8. Commands — Anthropic, Claude Code docs — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S9. How Claude remembers your project (Memory) — Anthropic, Claude Code docs — https://code.claude.com/docs/en/memory — accessed 2026-10-10

Local CLI evidence (supporting): `claude --version` = 2.1.294. `claude --help`: "--settings <file-or-json>  Path to a settings JSON file or a JSON string to load additional settings from"; "--setting-sources <sources>  Comma-separated list of setting sources to load (user, project, local)."; "--permission-mode <mode> ... (choices: "acceptEdits", "auto", "bypassPermissions", "manual", "dontAsk", "plan")"; "--model <model>  Model for the current session. Provide an alias for the latest model (e.g. 'fable', 'opus', or 'sonnet') or a model's full name."; "--mcp-config <configs...>"; "--strict-mcp-config  Only use MCP servers from --mcp-config, ignoring all other MCP configurations"; subcommands `doctor` ("Check the health of your Claude Code ...") and `mcp`.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote | Source | Notes |
|---|---|---|---|---|
| C1 | Settings are JSON keys that change how Claude Code behaves: default model, what runs without asking, which files it cannot read, and what an organization enforces. | "Settings are the JSON keys that change how Claude Code behaves" | S1 | |
| C2 | Four settings scopes: User `~/.claude/settings.json`; Shared project `.claude/settings.json`; Project local `.claude/settings.local.json`; Managed `managed-settings.json` and other managed sources. | scope table | S1 | |
| C3 | Precedence, highest first: 1 Managed, 2 Command line (`--settings`), 3 Project local, 4 Shared project, 5 User. | numbered list in "Settings precedence" | S1 | Fixes audit Med (hierarchy missing). Matches audit text. |
| C4 | A key set at a higher level overrides the same key lower down. | "uses the value from the highest level that sets it" | S1 | |
| C5 | List keys such as `permissions.allow` merge across files instead of overriding. | "Claude Code combines the lists instead of picking one" | S1 | Scalar keys like `model` use the highest level (S2: "scalar settings like `model` use the most specific value"). |
| C6 | Managed settings cannot be overridden by user, project, local files or `--settings`. A few restrictive keys are exceptions (e.g. `disableClaudeAiConnectors: true` from any scope). | "Nothing in your own settings files or `--settings` overrides a managed key" | S1 | Keep exceptions to one sentence. |
| C7 | Environment variables are not a level in the stack. Some pairs: `ANTHROPIC_MODEL` in the shell applies over the `model` key from any file. `--model` overrides both for a session. | "Environment variables aren't a level in this stack." | S1 | |
| C8 | Installing Claude Code does not create any settings file. | "Installing Claude Code doesn't create any settings file." | S1 | |
| C9 | Claude Code writes `~/.claude/settings.json` the first time you change a user-stored option in `/config`. It writes `.claude/settings.local.json` the first time you give a standing approval ("Yes, and don't ask again"). | exact | S1 | |
| C10 | Commit `.claude/settings.json` so teammates get the same permissions, hooks, and plugins. Each teammate can override in `.claude/settings.local.json`. | "Commit `.claude/settings.json` so everyone who clones the repository gets the same permissions, hooks, and plugins." | S1 | |
| C11 | `.claude/settings.local.json` is for personal overrides in one project. Claude Code adds `**/.claude/settings.local.json` to your global git excludes when it first writes the file. If you create it by hand, add it to `.gitignore` yourself. | exact | S1, S2 | S2: badge "gitignored". |
| C12 | In a git repo, if you start in a subdirectory, Claude Code reads and writes `.claude/settings.local.json` at the repository root (since v2.1.211). The shared `.claude/settings.json` is read from the session's primary working directory. | exact | S1 | Edge case; one line at most. |
| C13 | Settings files are strict JSON. A `//` comment or trailing comma is a syntax error. | "Settings files are strict JSON: a `//` comment or a trailing comma is a syntax error" | S1 | |
| C14 | Add `"$schema": "https://json.schemastore.org/claude-code-settings.json"` for editor autocomplete and validation. | exact | S1 | |
| C15 | Claude Code watches settings files and applies most edits (permissions, hooks) to the running session without restart. | "applies most edits to the running session without a restart, including edits to `permissions`, `hooks`" | S1 | |
| C16 | `/status` shows a `Setting sources` line with the loaded files. `claude doctor` lists entries Claude Code rejected. `/config` opens the settings menu; `/config key=value` sets one option. | exact | S1, S8 | `claude doctor` confirmed in local `claude --help` ("doctor  Check the health of your Claude Code ..."). |
| C17 | `claude --settings '<json-or-file>'` applies keys for one session. It sits above user/project/local files and below managed settings. Example: `claude --settings '{"model": "claude-opus-5-5"}'`. | exact | S1 | Model ID is the one in the doc example; the Models page owns model IDs. Prefer an alias in the page. |
| C18 | `permissions.allow`, `permissions.ask`, `permissions.deny` take rule strings `Tool` or `Tool(specifier)`: `Bash`, `Bash(npm run *)`, `Read(./.env)`, `WebFetch(domain:example.com)`. | rule table | S3 | |
| C19 | Rules evaluate `deny` first, then `ask`, then `allow`. The first match decides. | "Claude Code evaluates `deny` rules first, then `ask`, then `allow`, and the first match decides" | S3 | |
| C20 | `permissions.deny` blocks matching files from discovery and search, denies reads, and blocks Edit/Write. Example denies `Read(./.env)`, `Read(./.env.*)`. It does not cover a command that reads files without naming them (`grep -r pattern .`) or arbitrary subprocesses. Use the sandbox for OS-level enforcement. | exact | S3, S1 | Fixes audit Med: use `permissions.deny` for `.env`. |
| C21 | `permissions.allow` rules from a committed `.claude/settings.json` apply only after the user accepts the workspace trust dialog. `deny` and `ask` rules apply at once. | exact | S3, S1 | |
| C22 | `permissions.ask` prompts even in modes that would approve, e.g. `"Bash(git push *)"`. | exact | S3 | |
| C23 | `permissions.defaultMode` values: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`, `manual` (alias of `default`). `auto` and `bypassPermissions` do not take effect from project or local settings. | exact | S3 | Permission Modes page owns detail. |
| C24 | `env` sets environment variables for every session and its subprocesses, e.g. `{"env": {"DISABLE_AUTO_COMPACT": "1"}}`. Project and local settings cannot set some variables (telemetry export). | exact | S3 | QA use: `BASE_URL` for the test environment (writer must label as an example). |
| C25 | `hooks` is an object keyed by hook event. Each value is an array of `{ "matcher", "hooks" }` groups. Handler `type` values: `command`, `prompt`, `agent`, `http`, `mcp_tool`. Hooks merge across files. | exact | S3 | Hooks page owns detail. |
| C26 | Example hook in `.claude/settings.json`: `PostToolUse` with matcher `Edit|Write` and a `command` handler that runs Prettier. | S2 example | S2 | Fixes audit Med: use `Edit|Write`, not `Write`. |
| C27 | `model` sets the model for new sessions. Type: alias or full model ID. Default unset. `--model` beats `ANTHROPIC_MODEL`, and both beat this key for one session. | exact | S3 | |
| C28 | `autoMemoryEnabled` (default `true`) and `autoMemoryDirectory` are settings keys. `claudeMdExcludes` and `outputStyle` are settings keys. | S3 / S9 / S7 | S3, S9, S7 | Cross-reference to the CLAUDE.md page. |
| C29 | `cleanupPeriodDays` deletes old session transcripts. Default 30 days, minimum 1; `0` fails validation. | exact | S2 | Optional. |
| C30 | `~/.claude.json` is a fifth file that Claude Code writes for itself. It holds sign-in session, MCP server configs, per-project state such as trust decisions, and global config keys. You do not need to edit it. | "that it writes for itself; you don't need to edit it" | S1 | Fixes audit High: old page said `.claude.json (project root)`. |
| C31 | `~/.claude.json` is in the home directory. Corrupt-file backups go to `~/.claude/backups/`; Claude Code keeps five newest backups. | exact | S1, S2 | |
| C32 | Project-shared MCP servers go in `.mcp.json` at the project root (not inside `.claude/`). Commit it. | "`.mcp.json` in project root"; "Lives at the project root, not inside `.claude/`" | S4, S2 | Fixes audit High. |
| C33 | MCP scopes: Local (default; stored in `~/.claude.json`, current project only, private), Project (`.mcp.json`, shared via version control), User (`~/.claude.json`, all your projects). | scope table | S4 | MCP page owns detail. |
| C34 | `claude mcp add --transport http shared-server --scope project https://example.com/mcp` writes `.mcp.json`. Claude Code asks approval before using project-scoped servers in interactive sessions. | exact | S4 | In `claude -p` runs it loads them without asking. |
| C35 | `.mcp.json` supports env var references such as `${NOTION_TOKEN}` so secrets stay out of the file. | "Use environment variable references for secrets: `${NOTION_TOKEN}`" | S2, S4 | QA: `${JIRA_TOKEN}`, `${DB_URL}` for Jira/DB MCP. |
| C36 | Managed settings file paths: macOS `/Library/Application Support/ClaudeCode/managed-settings.json`; Linux and WSL `/etc/claude-code/managed-settings.json`; Windows `C:\Program Files\ClaudeCode\managed-settings.json`. | exact | S5 | Other delivery: MDM, server-managed from claude.ai console. |
| C37 | On Windows `~/.claude` means `%USERPROFILE%\.claude`. `CLAUDE_CONFIG_DIR` moves settings, session history, and plugins. | exact | S1 | |
| C38 | Project `.claude/` folder layout: `settings.json` (committed), `settings.local.json` (gitignored), `rules/`, `skills/`, `commands/`, `output-styles/`, `agents/`, `workflows/`, `agent-memory/`. At project root: `CLAUDE.md`, `.mcp.json`, `.worktreeinclude`. | file reference table | S2 | `workflows/` and `.worktreeinclude`: mention only in a short "also" line. |
| C39 | Skills live at `.claude/skills/<name>/SKILL.md` (a directory, not a flat file). User skills: `~/.claude/skills/`. | "Each skill is a folder with a SKILL.md file" | S2, S6 | Fixes audit High (`skills/find-bug.md`). |
| C40 | Custom commands merged into skills. `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy`. Existing `commands/` files keep working. If a skill and a command share a name, the skill wins. New work should use skills. | "Custom commands have been merged into skills." | S6, S2 | Fixes audit Med ("commands/ is the entry point"). Label `commands/` as legacy. |
| C41 | Subagents live in `.claude/agents/*.md` (project) and `~/.claude/agents/` (user). | file reference / S2 tree | S2 | |
| C42 | `.claude/rules/*.md` holds topic rules, optionally path-gated with `paths:` frontmatter. | exact | S2 | CLAUDE.md page owns detail. |
| C43 | `output-styles/*.md` exist in both `~/.claude/output-styles` and `.claude/output-styles`. Select a style with the `outputStyle` setting. Current. | "User: `~/.claude/output-styles`; Project: `.claude/output-styles`" | S7, S2 | Optional mention. |
| C44 | User-level `~/.claude/` holds: `CLAUDE.md`, `settings.json`, `keybindings.json`, `themes/`, `projects/<project>/memory/` (auto memory), `rules/`, `skills/`, `commands/`, `output-styles/`, `agents/`, `agent-memory/`. | S2 global tree | S2 | Old tree listed `~/.claude/memory/` — wrong (C45). |
| C45 | Auto memory lives at `~/.claude/projects/<project>/memory/`, not `~/.claude/memory/`. | exact | S9, S2 | Fixes audit High (structure.mdx). |
| C46 | Commit vs local, per file: commit `CLAUDE.md`, `.claude/settings.json`, `.claude/rules/`, `.claude/skills/`, `.claude/agents/`, `.mcp.json`, `.claude/agent-memory/`. Keep local: `.claude/settings.local.json`, `CLAUDE.local.md`, `~/.claude.json`, `.claude/agent-memory-local/`. | badges in S2; `CLAUDE.local.md` from S9 | S2, S9 | |
| C47 | Choose-the-right-file table: project context → `CLAUDE.md`; allow/block tool calls → `settings.json` `permissions` or `hooks`; env vars → `settings.json` `env`; personal overrides → `settings.local.json`; `/name` prompt → `skills/<name>/SKILL.md`; subagent → `agents/*.md`; MCP → `.mcp.json`; formatting → `output-styles/*.md`. | table | S2 | Good for a "which file?" table. |
| C48 | settings.json is enforced; CLAUDE.md is guidance. "Unlike CLAUDE.md, which Claude reads as guidance, these are enforced whether Claude follows them or not." | exact | S2 | |
| C49 | A committed key may not reach teammates: some keys never apply from a repository file (see Scope column in the settings index), and `permissions.allow`, `additionalDirectories`, `extraKnownMarketplaces`, most `env` values wait for workspace trust. | exact | S1 | |
| C50 | In cloud sessions only shared project `.claude/settings.json` (committed) is read; user and local files are not. | exact | S1 | Relevant to CI page; one line. |
| C51 | `--setting-sources user,project,local` chooses which file scopes load. | `--setting-sources <sources>  Comma-separated list ... (user, project, local)` | local help, S9 | Useful for CI isolation. |
| C52 | Image `/resources/mermaid-diagram.png` shows a flowchart: User Prompt, Understanding Intent, Load Memory Context, Select Command, Invoke Agent, Agent Decision Engine, Skills, "Need External Data?", MCP Server Request, Final Response. | viewed the file | local file | Not a documented Claude Code mechanism (commands and agents are not a fixed pipeline; skills and subagents are chosen by Claude). Decision: drop from this page. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| structure.mdx › title "Claude Context Engineering Architecture" / intro | rewrite | New title "Settings & the .claude Folder"; Claude Code docs call this "the .claude directory" (S2) |
| structure.mdx › ASCII tree | rewrite | `memory/` path wrong (C45); skills are folders (C39); `.claude.json (project root)` wrong (C30, C32); add `rules/`, `settings.local.json`, `output-styles/` (C38, C44) |
| structure.mdx › What Each Part Does: memory/ | drop (move) | Covered on CLAUDE.md & Memory page; link there (C45) |
| structure.mdx › skills/ card ("rigid or flexible") | rewrite | Rigid/flexible is a Superpowers convention, not Claude Code (audit Low); say folder with SKILL.md (C39) |
| structure.mdx › agents/ card | rewrite | Keep; link to Subagents page (C41) |
| structure.mdx › commands/ card | rewrite | Legacy; merged into skills (C40) |
| structure.mdx › `~/.claude.json` card "(project root)" | rewrite | Wrong location; split into `~/.claude.json` (app state, personal MCP) vs `.mcp.json` (team MCP) (C30-C33) |
| structure.mdx › How It All Flows Together (5 cards) | drop | Pipeline is invented: commands are not a separate stage before agents; memory is not injected as a step (C52) |
| structure.mdx › Agent Decision Flow + mermaid-diagram.png | drop | Not a documented mechanism (C52). Image is also referenced by `app/layout.tsx:45` (OpenGraph `images`) and `app/globals.css:388`; the file must NOT be deleted until those are changed. Decision for the repo: drop from the page, keep the file or replace the OG image in a separate task. |
| structure.mdx › Quick Reference table | rewrite | Wrong paths (`~/.claude/memory/`, `.claude.json`); replace with settings scope table (C2) and "which file?" table (C47) |

## Page outline
- ## Settings files — what settings are (C1); the four scopes table with paths and who they affect (C2); `~/.claude.json` is separate and app-managed (C30); `CLAUDE_CONFIG_DIR` and Windows home (C37); Claude Code creates files on first change (C8, C9)
- ## Which setting wins — precedence list, managed > `--settings` > local > shared project > user (C3, C4); lists merge, scalars override (C5); env vars are not a level (C7); managed exceptions in one sentence (C6); worked QA example: team sets `model`, you override in local file (C27)
- ## The settings you will use most — short JSON examples
  - ### permissions — allow/ask/deny, rule syntax, deny first (C18-C23); QA example: allow `Bash(npx playwright test *)`, deny `Read(./.env)` and `Read(./.env.*)`; deny does not cover everything, add sandbox (C20)
  - ### env — (C24)
  - ### hooks — one example with `Edit|Write` (C25, C26)
  - ### model — (C27)
  - `$schema` and strict JSON (C13, C14)
- ## Check and change settings — `/config`, `/config key=value`, `/status` Setting sources, `claude doctor`, `--settings` for one session, `--setting-sources`; live reload (C15-C17, C51)
- ## The .claude folder — project vs user tree; one table of path, what it holds, commit or local (C38, C39-C46); skills are directories (C39); `commands/` is legacy (C40); auto memory path (C45)
  - ### Which file do I edit? — table from C47
- ## MCP configuration files — `.mcp.json` (team) vs `~/.claude.json` (personal); scopes; env var refs for Jira/DB tokens (C32-C35); link to MCP page
- ## What to commit — commit list vs local list (C46), team sharing and workspace trust (C10, C11, C21, C49); CI note: cloud sessions read only the committed project file (C50)
- QA scenario: repo with `.claude/settings.json` (allow test commands, deny `.env`), `.claude/skills/` for test-design, `.claude/agents/qa-agent.md` and `sdet-agent.md`, `.mcp.json` with Jira and DB servers using `${...}` tokens.

## Open questions
- Managed-settings precedence between several managed sources is detailed in S5 and was not read in full; the page must not describe it beyond "managed is the top level".
- The docs list `.claude/workflows/` and `.worktreeinclude`; not part of the QA story. Writer may skip or mention in one line.
- Whether `mermaid-diagram.png` can be removed from the repo depends on `app/layout.tsx:45` (OpenGraph image) and `app/globals.css:388`. The research does not decide this; the page drops the image.
- Model IDs in the doc examples (`claude-sonnet-5`, `claude-opus-5-5`) belong to the Models page research. Use aliases (`sonnet`, `opus`) in the settings page unless that page confirms IDs.
