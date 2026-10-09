# Subagents — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as the raw Markdown of the same page (URL plus `.md`). The URLs below are the canonical page URLs.

## Sources
S1. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S2. Extend Claude with skills — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/skills — accessed 2026-10-10
S3. Commands — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S4. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
Supporting evidence (not a citable page): local `claude --help` and `claude agents --help`, Claude Code 2.1.294.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | A subagent is a specialized assistant with its own context window, system prompt, tool access, and permissions. It returns only a summary. | "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." | S1 | |
| C2 | Use a subagent when a side task would flood the main conversation with output. | "Use one when a side task would flood your main conversation with search results, logs, or file contents you won't reference again" | S1 | QA: test-run logs, large log files. |
| C3 | Subagent requests count toward the same usage limits as the main conversation. | "It also sends its own requests, which count toward the same usage limits as your main conversation." | S1 | |
| C4 | Subagents are Markdown files with YAML frontmatter. The body is the system prompt. | "Subagent files use YAML frontmatter for configuration, followed by the system prompt in Markdown" | S1 | |
| C5 | A subagent gets only its own system prompt plus basic environment details, not the Claude Code system prompt. | "Subagents receive only this system prompt plus basic environment details like the working directory, not the Claude Code system prompt." | S1 | CLAUDE.md still loads (see C31). |
| C6 | Project subagents: `.claude/agents/`. User subagents: `~/.claude/agents/`. Check project ones into version control. | "`.claude/agents/` \| Current project \| 3" / "`~/.claude/agents/` \| All your projects \| 4" | S1 | |
| C7 | Priority order of locations: managed settings (1), `--agents` CLI flag (2), `.claude/agents/` (3), `~/.claude/agents/` (4), plugin `agents/` (5, lowest). | Scope table | S1 | |
| C8 | Claude Code scans both agent folders recursively. Identity comes only from the `name` field, not the folder or filename. | "identity comes only from the `name` frontmatter field" | S1 | |
| C9 | Claude Code watches the agent folders. Edits apply within seconds with no restart. A new `agents` directory made after session start needs a restart. | "Claude Code detects the change within a few seconds and the next delegation uses the updated definition, with no restart needed." | S1 | |
| C10 | Only `name` and `description` are required. Field names are camelCase and must match exactly. Unknown fields are ignored. | "Only `name` and `description` are required." / "Claude Code ignores a field it doesn't recognize without reporting an error" | S1 | |
| C11 | A file with no `name`, or a `name` with no `description`, is skipped without a message in the session. Use `--debug` to see the reason. | "**No `name`**: Claude Code treats the file as documentation kept beside your agents." / "**A `name` but no `description`**: Claude Code skips the file" | S1 | |
| C12 | `tools` is an allowlist (comma string or YAML list). If omitted, the subagent inherits every tool available to subagents. | "Inherits every tool available to subagents if omitted." | S1 | |
| C13 | `disallowedTools` is a denylist. It is applied first, then `tools` is resolved against the rest. A tool in both is removed. | "If both are set, `disallowedTools` is applied first, then `tools` is resolved against the remaining pool. A tool listed in both is removed." | S1 | |
| C14 | A subagent inherits MCP tools from the main conversation when `tools` is omitted. | "Subagents inherit the built-in tools and MCP tools available in the main conversation" | S1 | |
| C15 | When `tools` lists only built-in tools, the subagent cannot use any MCP tools. | "This example uses `tools` to allow only Read, Grep, Glob, and Bash. The subagent can't edit files, write files, or use any MCP tools" | S1 | Confirms the audit High item: old `tools: Read, Grep, Glob, Bash` plus MCP calls cannot work. |
| C16 | `tools` and `disallowedTools` accept MCP patterns: `mcp__<server>` or `mcp__<server>__*`. In `disallowedTools`, `mcp__*` removes every MCP tool. | "Both fields accept MCP server-level patterns in addition to exact tool names: `mcp__<server>` or `mcp__<server>__*`" | S1 | Fix for qa-agent: `tools: Read, Grep, Glob, mcp__jira` (server name depends on `claude mcp add`). |
| C17 | A `disallowedTools` entry with a specifier like `Bash(git push *)` removes the whole tool. To block only some commands use a `permissions.deny` rule. | "still removes the whole tool from the subagent, not only the matching commands" | S1 | |
| C18 | `model` accepts `sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit`. | "`sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit`" | S1 | Check IDs against Models page notes. |
| C19 | Model order: per-invocation parameter, then frontmatter `model`, then `CLAUDE_CODE_SUBAGENT_MODEL`, then the main conversation model. | "1. The per-invocation `model` parameter 2. The subagent definition's `model` frontmatter ... 3. The `CLAUDE_CODE_SUBAGENT_MODEL` environment variable ... 4. The main conversation's model" | S1 | |
| C20 | `permissionMode` values: `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`; `manual` is an alias for `default`. Ignored for plugin subagents. | "`default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`, or `manual` as an alias for `default`. Ignored for plugin subagents" | S1 | |
| C21 | If the main conversation is in `bypassPermissions`, `acceptEdits`, or auto mode, the subagent uses that mode and ignores its own `permissionMode`. | "the subagent runs in that same mode and Claude Code ignores the `permissionMode` you set" | S1 | |
| C22 | A subagent runs in `bypassPermissions` only when the main conversation does (v2.1.267+). | "A subagent runs in this mode only when the main conversation does" | S1 | Safety: a subagent cannot raise its own autonomy. |
| C23 | `skills` preloads full skill content at startup (first 32 names). Subagents can still invoke other skills through the Skill tool. Skills with `disable-model-invocation: true` cannot be preloaded. | "The full skill content is injected, not only the description." / "You can't preload skills that set `disable-model-invocation: true`" | S1 | Replaces old "read SKILL.md by hand" rule (audit Med). |
| C24 | `memory` takes `user`, `project`, or `local`. Folders: `~/.claude/agent-memory/<name>/`, `.claude/agent-memory/<name>/`, `.claude/agent-memory-local/<name>/`. | Memory scope table | S1 | `project` is the recommended default. |
| C25 | With `memory` on, Read, Write, and Edit tools are enabled automatically. The first 200 lines or 25KB of `MEMORY.md` load into the prompt. | "Read, Write, and Edit tools are automatically enabled so the subagent can manage its memory files." / "the first 200 lines or 25KB of `MEMORY.md`" | S1 | Turning auto memory off disables the field. |
| C26 | `mcpServers` gives a subagent MCP servers. An entry is a server name or an inline definition. Inline servers connect when the subagent starts and disconnect when it ends. | "Each entry is either a server name referencing an already-configured server (e.g., `"slack"`) or an inline definition with the server name as key" | S1 | Ignored for plugin subagents. |
| C27 | Inline MCP servers keep tool descriptions out of the main conversation. Example: Playwright with `type: stdio`, `command: npx`, `args: ["-y", "@playwright/mcp@latest"]`. | "To keep an MCP server out of the main conversation entirely and avoid its tool descriptions consuming context there, define it inline here rather than in `.mcp.json`." | S1 | Good QA example: `browser-tester`. |
| C28 | `maxTurns` caps agentic turns. At the limit the output is marked partial and Claude can resume the subagent. | "Maximum number of agentic turns before the subagent stops." | S1 | |
| C29 | `background: true` keeps the subagent in the background. `color` takes `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. | "Set to `true` to keep this subagent in the background" / "Accepts `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`" | S1 | |
| C30 | Other fields exist: `hooks`, `effort`, `isolation: worktree`, `omitClaudeMd`, `initialPrompt`, `experimental`. | Frontmatter table | S1 | `isolation: worktree` gives a temporary git worktree. |
| C31 | Plugin subagents ignore `hooks`, `mcpServers`, and `permissionMode`. Copy the file into `.claude/agents/` to use them. | "plugin subagents don't support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields" | S1 | Link to Plugins page. |
| C32 | Explore and Plan subagents skip CLAUDE.md and git status. Every other subagent loads both. | "Explore and Plan skip your CLAUDE.md files and the git status snapshot" | S1 | |
| C33 | Built-in subagents: Explore (read-only), Plan (read-only, plan mode research), general-purpose (all tools). Helpers: `claude`, `statusline-setup`, `claude-code-guide`. | Built-in subagents section | S1 | |
| C34 | Claude delegates by matching the task to each subagent `description`. Phrases like "use proactively" encourage it. | "Claude automatically delegates tasks based on the task description in your request, the `description` field in subagent configurations, and current context. To encourage proactive delegation, include phrases like \"use proactively\"" | S1 | Fixes audit Low item: delegation is automatic. |
| C35 | The combined description size of non-built-in subagents above 15,000 tokens shows a startup warning. | "exceed 15,000 tokens, Claude Code shows a warning at startup" | S1 | Keep descriptions short. |
| C36 | Three ways to call one: name it in the prompt, @-mention it, or run the whole session as it with `--agent` or the `agent` setting. | "Natural language", "@-mention", "Session-wide" bullets | S1 | |
| C37 | @-mention syntax: `@"code-reviewer (agent)" look at the auth changes`. Typed form: `@agent-<name>`. | "`@\"code-reviewer (agent)\" look at the auth changes`" | S1 | An @-mention guarantees that subagent runs. |
| C38 | `claude --agent <name>` starts a session where the main thread uses that agent's prompt, tool limits, and model. The choice survives resume. | "Pass `--agent <name>` to start a session where the main thread itself takes on that subagent's tool restrictions and model" | S1 | Local help: "--agent <agent>  Agent for the current session. Overrides the 'agent' setting." |
| C39 | Set `"agent": "code-reviewer"` in `.claude/settings.json` to make an agent the default for a project. The CLI flag overrides it. | `{ "agent": "code-reviewer" }` / "The CLI flag overrides the setting if both are present." | S1 | |
| C40 | With `--agent`, a custom subagent system prompt replaces the default Claude Code system prompt. CLAUDE.md and project memory still load. | "a custom subagent's system prompt replaces the default Claude Code system prompt entirely" | S1 | |
| C41 | `--agents` takes a JSON object of session-only subagents. In `-p` mode it also takes a file path (v2.1.281+). | "`claude --agents '{ \"code-reviewer\": {...} }'`" / "In non-interactive mode, `--agents` also accepts the path to a JSON file" | S1 | Local help: "--agents <json-or-file>   JSON object defining custom agents". Use for CI. |
| C42 | `/agents` now prints a reminder. On v2.1.197 and earlier it opens an interactive wizard. | "Running `/agents` prints a reminder to ask Claude or edit `.claude/agents/` and `~/.claude/agents/` directly." / "On Claude Code v2.1.197 and earlier, `/agents` opens an interactive wizard" | S1, S3 | Old tutorials that say "use `/agents` to create" are outdated. |
| C43 | The CLI command `claude agents` manages background agents, not subagent definitions. | local help: "agents [options]  Manage background agents" | local help | Do not confuse with `/agents`. |
| C44 | The `Agent` tool spawns subagents. It was renamed from `Task` in v2.1.63. `Task(...)` still works as an alias. | "In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases." | S1 | |
| C45 | For an agent running as the main thread (`--agent`), `Agent(worker, researcher)` in `tools` limits which subagents it can spawn. Plain `Agent` allows all. If `Agent` is not in `tools`, it cannot spawn. | "`tools: Agent(worker, researcher), Read, Bash`" / "If you omit `Agent` from the `tools` list entirely, the agent can't spawn any subagents with the Agent tool." | S1 | |
| C46 | In a subagent definition, `Agent` in `tools` lets that subagent spawn its own subagents, but the type list in parentheses is ignored. | "any type list inside the parentheses is ignored" | S1 | |
| C47 | By default a subagent can spawn subagents up to three layers below the main conversation. At the limit the `Agent` tool is withheld. | "By default, a subagent can spawn subagents of its own, up to three layers below the main conversation." | S1 | Audit said "max 3 levels": confirmed (default raised to 3 in v2.1.219). |
| C48 | `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` changes the depth. `1` turns nesting off. | "Set `1` to turn nesting off." | S1 | |
| C49 | To stop one subagent from spawning, omit `Agent` from its `tools` or add it to `disallowedTools`. | "omit `Agent` from its `tools` list or add it to `disallowedTools`" | S1 | |
| C50 | At most 20 subagents run at once by default. More fail with `Concurrent subagent limit reached`. Change with `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`. | "when 20 subagents are running in a session, spawning another with the Agent tool fails with `Concurrent subagent limit reached`" | S1 | |
| C51 | Background subagents run at the same time as you. A background subagent keeps every MCP tool but only a reduced built-in tool set. | "a background subagent keeps every MCP tool but only these built-in tools: `Read`, `Grep`, `Glob`, `LSP`, `Bash`, ..." | S1 | `Agent` handled by the nesting rules. |
| C52 | Where fork mode is on (default in interactive sessions), Claude runs spawned subagents in the background. | "Where fork mode is on, as it is by default in an interactive session, Claude Code runs the subagent in the background" | S1 | Parallel work: ask for "separate subagents". |
| C53 | Parallel pattern prompt: "Research the authentication, database, and API modules in parallel using separate subagents". Chain pattern: "Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them". | Common patterns section | S1 | Replaces old "Spawn a separate qa-agent" advice. |
| C54 | Many subagents that return detailed results can use a lot of main context. | "Running many subagents that each return detailed results can consume significant context" | S1 | |
| C55 | Hooks in subagent frontmatter run only while that subagent runs. Example: a `PreToolUse` hook on `Bash` that blocks SQL writes with exit code 2. | "Claude Code runs them only while that subagent is running" (S4); `db-reader` example (S1) | S1, S4 | Good for DB-safe qa-agent. |
| C56 | A `permissions.deny` entry `Agent(name)` blocks one subagent. | `"deny": ["Agent(Explore)", "Agent(my-custom-agent)"]` | S1 | |
| C57 | Skill-vs-subagent rule: skill with `context: fork` supplies the task; subagent with `skills:` supplies the system prompt. | Comparison table in S2 | S2 | Link to Skills page. |
| C58 | `/tasks` lists background work including subagents. Press Ctrl+B to background a running task. | "Press **Ctrl+B** to background a running task" | S1, S3 | |
| C59 | Subagent final reports are scanned (v2.1.210+). Instruction-shaped text gets a backslash or a marker line. | "Claude Code scans each subagent's final report before Claude reads it." | S1 | Prompt-injection link for MCP page. |
| C60 | A subagent's tool calls still run your settings hooks and permission rules. Hook input then carries `agent_id` and `agent_type`. | "the input carries the `agent_id` and `agent_type` common input fields that identify the subagent" | S4 | |
| C61 | Use the main conversation, not a subagent, for work that needs back-and-forth or shares context across phases. | "Use the **main conversation** when: The task needs frequent back-and-forth or iterative refinement" | S1 | |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| agents.mdx › What is Agent? | rewrite | "Separate Claude instance … runs autonomously" is loose. Use C1 to C3. |
| agents.mdx › sdet-agent / qa-agent cards | keep, reword | Keep roles. "Uses Skills" now means `skills:` preload (C23). |
| agents.mdx › Usage Examples (`/qa-agent …`) | rewrite | Slash form works only with a command file or skill (see Skills notes C28). Show natural language, @-mention (C37), `claude --agent` (C38). |
| agents.mdx › "Spawning Sub-Agents — Same Agent (Parallel)" | rewrite | Wrong rule. Claude delegates by description (C34). Parallel needs `Agent` access and "separate subagents" prompt (C45, C53). Max 3 layers (C47). |
| agents.mdx › Cross-Agent Delegation (qa-agent delegates explain-code to sdet-agent) | rewrite | A subagent can spawn only if `Agent` is in `tools` and depth allows (C46, C47). Simplest correct design: main session orchestrates both. |
| agents.mdx › Agent Files › sdet-agent.md | rewrite | `tools: Read, Grep, Glob, Bash` blocks MCP (C15). Missing `skills`, `permissionMode`, `memory`. "MANDATORY read SKILL.md" replaced by `skills:` (C23). |
| agents.mdx › Agent Files › qa-agent.md | rewrite | Same. Also remove `Bash` for a read-only QA role; add `mcp__jira` (C16). |
| (new) frontmatter reference | add | C10 to C30. |
| (new) automatic delegation, @-mention, `--agent`, `/agents` | add | C34 to C43. |

## Page outline
- ## What a subagent is — C1, C2, C3, C61. QA angle: log-heavy work (test runs, large reports) stays out of the main chat.
- ## Built-in subagents — C33, C32. Explore and Plan are read-only. One short table.
- ## Create a subagent
  - ### File format and locations — C4 to C9, C11. Table of locations with priority. Tip: commit `.claude/agents/` for the QA team.
  - ### Frontmatter reference — C10, C12, C13, C18, C20, C23, C24, C26, C28, C29, C30. One table with the fields the task lists: `tools`, `disallowedTools`, `model`, `permissionMode`, `skills`, `memory`, `mcpServers`, `maxTurns`, `background`, `color`.
  - ### Tools and MCP access — C12 to C17, C27. Show the old bug (C15) and the fix (omit `tools`, or list `mcp__jira`). Show `disallowedTools: Write, Edit` for read-only.
  - ### Permissions and autonomy — C20, C21, C22. A subagent cannot exceed the main mode.
  - ### Memory — C24, C25.
- ## qa-agent and sdet-agent, rewritten — derived examples (built from C4, C12, C16, C20, C23, C24):
  - `qa-agent`: `description: Senior QA engineer. Analyzes requirements and Jira tickets, finds likely bugs, designs test cases. Use proactively when the user shares a ticket, a diff, or a feature to test.`; `tools: Read, Grep, Glob, mcp__jira`; `skills: [analyze-requirement, find-bug, test-design, analyze-security]`; `model: sonnet`; `memory: project`; `permissionMode: default`. Body: role, sanity scope, rules. No `Bash`, so it cannot change anything.
  - `sdet-agent`: `tools: Read, Grep, Glob, Bash, mcp__db`; `skills: [explain-code, analyze-rootcause, analyze-requirement, analyze-security]`; `maxTurns` set; hook on `Bash` to block SQL writes (C55) or use a read-only DB user (see MCP page).
  - Drop "MANDATORY read SKILL.md" and "Case 1..5" prose where `skills:` replaces it. Keep the decision logic as a short list in the body.
  - Note: the server names `jira` and `db` come from `claude mcp add <name>` (MCP page). Tool name format `mcp__<server>__<tool>` (see Hooks notes C48 in extend-hooks.md).
- ## Call a subagent — C34 to C43. Automatic by description, natural language, @-mention, `claude --agent qa-agent`, `agent` setting. Note `/agents` (C42, C43).
- ## Parallel work and nesting — C44 to C54. Prompt example (C53). Depth 3 (C47). 20 concurrent (C50). Cost warning (C54). Show "orchestrate from the main session" as the default pattern.
- ## Guardrails with hooks — C55, C60. Link to Hooks page.

## Open questions
- Exact MCP server name for Jira in the qa-agent example. The writer must state that `mcp__jira` assumes the server was added as `jira`. See MCP notes for the Atlassian server (the name is the user's choice).
- Whether `skills:` plus `Skill` in `tools` is needed: S1 says to use `skills` and not list `Skill` in `tools` for preloading. Do not add `Skill` to `tools` in the examples.
- Model alias to IDs: confirm names in the Models page notes before writing `model:` values other than the aliases.
