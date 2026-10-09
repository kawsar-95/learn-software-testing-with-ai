# Fact-check: Subagents (round 1-2, 2026-10-10)

Sources fetched 2026-10-10: [1] code.claude.com/docs/en/sub-agents.md, [2] .../commands.md, [3] .../hooks.md, [4] .../skills.md. All Cite numbers (1-4) exist; all four sources are cited. Local `claude --version` = 2.1.294; `claude agents --help` prints "Manage background agents"; `claude --help` lists `--agent`, `--agents <json-or-file>`.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | Lead paragraph | Subagent = specialist in own context, returns a summary | none | OPINION-OK | Lead summary; facts cited below. |
| 2 | What a subagent is | Own context window, custom system prompt, tool access, independent permissions | 1 | PASS | "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." |
| 3 | What a subagent is | Use when side task would flood main conversation | 1 | PASS | "Use one when a side task would flood your main conversation with search results, logs, or file contents". |
| 4 | What a subagent is | Gets only own system prompt plus environment details, not the Claude Code system prompt | 1 | PASS | "Subagents receive only this system prompt plus basic environment details like the working directory, not the Claude Code system prompt." |
| 5 | What a subagent is | Requests count toward the same usage limits | 1 | PASS | "which count toward the same usage limits as your main conversation." |
| 6 | What a subagent is | Use main conversation for back-and-forth | 1 | PASS | "The task needs frequent back-and-forth or iterative refinement". |
| 7 | Built-in subagents | `Explore` read-only; `Plan` read-only research in plan mode; `general-purpose` all tools | 1 | PASS | "read-only tools; Write and Edit are denied"; "A research agent used during plan mode"; "every tool available to subagents" (docs wording is "every tool available to subagents", not literally all tools; minor simplification). |
| 8 | Built-in subagents | Helper subagents `claude`, `statusline-setup`, `claude-code-guide` | 1 | PASS | "Other" tab table lists the three. |
| 9 | Built-in subagents | `Explore` and `Plan` skip CLAUDE.md and git status; every other subagent loads both | 1 | PASS | "Explore and Plan skip your CLAUDE.md files and the git status snapshot ... Every other built-in and custom subagent loads both" (unless `omitClaudeMd`). |
| 10 | Create a subagent | Markdown file with YAML frontmatter; body = system prompt | 1 | PASS | "Subagent files use YAML frontmatter for configuration, followed by the system prompt in Markdown". |
| 11 | Create a subagent | Location/priority table (managed 1, `--agents` 2, `.claude/agents/` 3, `~/.claude/agents/` 4, plugin 5) | 1 | PASS | Source table matches. |
| 12 | Create a subagent | Commit `.claude/agents/` for the team | 1 | PASS | "Check them into version control so your team can use and improve them collaboratively." |
| 13 | Create a subagent | Scans folders recursively; identity only from `name` | 1 | PASS | "Claude Code scans `.claude/agents/` and `~/.claude/agents/` recursively ... identity comes only from the `name` frontmatter field." |
| 14 | Create a subagent | Only `name` and `description` required; no `name` or no `description` = skipped; `--debug` | 1 | PASS | "Only `name` and `description` are required"; "A `name` but no `description`: Claude Code skips the file and writes the reason to the debug log." No `name`: "treats the file as documentation". |
| 15 | Create a subagent | Folder is watched; "An edit applies within a few seconds, with no restart" | 1 | FAIL | Source gives exceptions: "Three cases still need a restart: ... after creating a scope's first agent file in a new `agents` directory ... directories added with `--add-dir` ... `--disable-slash-commands`". Fix: add "except when the `agents` folder did not exist at session start". |
| 16 | Callout "/agents" | `/agents` only prints a reminder; wizard existed in v2.1.197 and earlier | 1, 2 | PASS | S1: "Running `/agents` prints a reminder ... On Claude Code v2.1.197 and earlier, `/agents` opens an interactive wizard". S2 `/agents` row says the same. |
| 17 | Callout "/agents" | "The shell command `claude agents` manages background agents, not subagent definitions" | none | UNCITED | Not in any of the 4 listed sources (grep of sub-agents.md: no `claude agents`). Official pages that support it: `https://code.claude.com/docs/en/cli-reference` ("`claude agents` \| Open agent view to monitor and dispatch parallel background sessions") and `.../agent-view` ("Agent view, opened with `claude agents`, is one screen for all your background sessions"). Local help: "Manage background agents". Add one as a source and cite it. |
| 18 | Tools and MCP access | `tools` is an allowlist; omitted = inherits every tool available to subagents, including MCP tools of main conversation | 1 | PASS | "Inherits every tool available to subagents if omitted"; "Subagents inherit the built-in tools and MCP tools available in the main conversation". |
| 19 | Tools and MCP access | Only built-in tools in `tools` = no MCP tools | 1 | PASS | "This example uses `tools` to allow only Read, Grep, Glob, and Bash. The subagent can't edit files, write files, or use any MCP tools". |
| 20 | Tools and MCP access | `mcp__<server>` or `mcp__<server>__*` patterns | 1 | PASS | "Both fields accept MCP server-level patterns ...: `mcp__<server>` or `mcp__<server>__*`". |
| 21 | Tools and MCP access | Server name = name given in `claude mcp add` | none (links MCP page) | EXAMPLE-OK | Not stated in source 1, but the MCP page uses `claude mcp add ... atlassian` and `... db`, and the `claude mcp add` name is the server name. Consistent with mcp.mdx lines 161, 181. |
| 22 | Tools and MCP access | `disallowedTools` applied first, then `tools`; both = removed | 1 | PASS | "`disallowedTools` is applied first, then `tools` is resolved against the remaining pool. A tool listed in both is removed." |
| 23 | Tools and MCP access | `Bash(git push *)` in `disallowedTools` removes whole tool; use `permissions.deny` | 1 | PASS | "still removes the whole tool ... add a Bash deny rule ... to `permissions.deny`". |
| 24 | Tools and MCP access (cards) | Bad: `tools: Read, Grep, Glob, Bash` + MCP calls fails; Good: `mcp__atlassian`; or omit `tools` | 1 | PASS | Same as rows 19, 20, 18. |
| 25 | Tools and MCP access | Inline `mcpServers`: connects at start, disconnects at finish; tool descriptions not in main context | 1 | PASS | "connected when the subagent starts ... and disconnected when it finishes"; "avoid its tool descriptions consuming context there". |
| 26 | Tools and MCP access | Inline `mcpServers` YAML (list entry, server name as key, `type: stdio`, `command: npx`, `args: ["-y", "@playwright/mcp@latest"]`) | 1 | PASS | The doc's `browser-tester` example is identical: `mcpServers:` / `- playwright:` / `type: stdio` / `command: npx` / `args: ["-y", "@playwright/mcp@latest"]`. Shape confirmed. Note (not counted): source says inline servers from a project `.claude/agents/` file load only after you trust the folder ("skips every inline server in that agent file"); page omits this. |
| 27 | Permissions and autonomy | `permissionMode` values incl. `manual` alias for `default` | 1 | PASS | "`default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`, or `manual` as an alias for `default`." |
| 28 | Permissions and autonomy | Main in `bypassPermissions`/`acceptEdits`/auto: subagent runs in that mode, `permissionMode` ignored | 1 | PASS | Quote in source "Permission modes". |
| 29 | Permissions and autonomy | Subagent runs in `bypassPermissions` only when main does (v2.1.267+) | 1 | PASS | "A subagent runs in this mode only when the main conversation does"; "requires Claude Code v2.1.267 or later". |
| 30 | Memory | `memory` values and folders (`user` `~/.claude/agent-memory/<name>/`, `project` `.claude/agent-memory/<name>/`, `local` `.claude/agent-memory-local/<name>/`) | 1 | PASS | Scope table matches. |
| 31 | Memory | Read/Write/Edit auto-enabled; first 200 lines or 25KB of `MEMORY.md` loaded | 1 | PASS | "Read, Write, and Edit tools are automatically enabled"; "the first 200 lines or 25KB of `MEMORY.md`". (Source also says `memory` has no effect if auto memory is off; page omits, not counted.) |
| 32 | qa-agent / sdet-agent intro | The two agents use six skills, Jira server `atlassian`, read-only DB server `db` | none | EXAMPLE-OK | Labeled as this tutorial's examples; server names match mcp.mdx. |
| 33 | Old form card | `tools: Read, Grep, Glob, Bash` + MCP body = cannot use MCP tools | 1 | PASS | See row 19. |
| 34 | Old form card | "Skill Usage (MANDATORY)" table in old version | none | OPINION-OK | Describes the old tutorial text, not a product fact. |
| 35 | Old form card | `Agent` not in `tools` = cannot spawn a subagent | 1 | PASS | "If you omit `Agent` from the `tools` list entirely, the agent can't spawn any subagents with the Agent tool." |
| 36 | Current form card | `tools` names MCP servers; `skills:` preloads full content | 1 | PASS | "The full content of each listed skill is injected into the subagent's context at startup." |
| 37 | qa-agent file | Frontmatter: `name`, `description` ("Use proactively"), `tools: Read, Grep, Glob, mcp__atlassian`, `skills` list, `model: sonnet`, `memory: project` | none | EXAMPLE-OK | Labeled "Example"; all fields and value forms are documented (`tools` comma string, `skills` YAML list, `memory: project`, `model: sonnet`). The three preloaded skills do not set `disable-model-invocation`, so they can be preloaded. `mcp__atlassian` reaches the server named `atlassian`. With `memory: project` Read/Write/Edit are on, as the page says (rows 31, 43). |
| 38 | qa-agent note | `test-design` not preloaded because `disable-model-invocation: true` blocks preloading | 1 | PASS | "You can't preload skills that set `disable-model-invocation: true`". |
| 39 | sdet-agent file | `tools: Read, Grep, Glob, Bash, mcp__db`; four skills; `model: sonnet`; `maxTurns: 30` | none | EXAMPLE-OK (syntax) | Syntax and fields documented. See row 40 for a semantic problem. |
| 40 | sdet-agent file | sdet-agent preloads `analyze-requirement`, whose body (skills page) says "If the input is a Jira key, read the ticket through the Jira MCP server" | none | FAIL | The example must work per the docs. sdet-agent `tools` has `mcp__db` only, no `mcp__atlassian`, so that skill instruction cannot work inside sdet-agent (source: "`tools` ... allow only ... The subagent can't ... use any MCP tools" beyond those listed). Fix: drop `analyze-requirement` from sdet-agent, or add `mcp__atlassian`. (qa-agent body says "design test cases", while `test-design` cannot be preloaded; the page explains this, so not counted.) |
| 41 | After sdet-agent | `skills:` injects full content; subagent can still invoke other skills via Skill tool | 1 | PASS | "Subagents can still invoke unlisted project, user, and plugin skills through the Skill tool". |
| 42 | After sdet-agent | `maxTurns` stops after that many agentic turns | 1 | PASS | "Maximum number of agentic turns before the subagent stops." |
| 43 | After sdet-agent | With `memory: project` the qa-agent gets Write and Edit | 1 | PASS | Row 31. |
| 44 | After sdet-agent | `model: sonnet` alias; models page lists aliases | none | PASS | Alias in source 1 ("`sonnet`, `opus`, `haiku`, or `fable`"); link to internal page is navigation. |
| 45 | Call a subagent | Claude delegates by matching `description`; "use proactively" encourages delegation | 1 | PASS | "include phrases like "use proactively" in your subagent's description field." |
| 46 | Call a subagent | Three ways to call: name it, @-mention, `--agent` | 1 | PASS | "Three patterns escalate from a one-off suggestion to a session-wide default". |
| 47 | Call a subagent | @-mention guarantees it runs; `@"code-reviewer (agent)" look at the auth changes` | 1 | PASS | Exact string in source. |
| 48 | Call a subagent | `@agent-<name>` manual form | 1 | PASS | "`@agent-<name>` for local subagents". |
| 49 | Call a subagent | `claude --agent sdet-agent`: main thread uses agent's prompt, tools, model; persists on resume | 1 | PASS | "the main thread itself takes on that subagent's tool restrictions and model"; "the choice persists when you resume the session". |
| 50 | Call a subagent | Custom agent prompt replaces default; CLAUDE.md and project memory still load | 1 | PASS | "`CLAUDE.md` files and project memory still load through the normal message flow". |
| 51 | Call a subagent | `"agent": "sdet-agent"` in `.claude/settings.json`; flag overrides setting | 1 | PASS | "set `agent` in `.claude/settings.json`"; "The CLI flag overrides the setting". |
| 52 | Call a subagent | `--agents` JSON for the session; file path in non-interactive mode, v2.1.281+ | 1 | PASS | "`--agents` also accepts the path to a JSON file ... requires Claude Code v2.1.281 or later." |
| 53 | Parallel work | Where fork mode is on (default interactive), spawned subagents run in background | 1 | PASS | "Where fork mode is on, as it is by default in an interactive session, Claude Code runs the subagent in the background". |
| 54 | Parallel work | Parallel pattern text and chain example | 1 | PASS | "Research the authentication, database, and API modules in parallel using separate subagents"; "Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them". |
| 55 | Parallel work | QA parallel prompt on `src/auth/*.js` | none | EXAMPLE-OK | Labeled "Example for QA"; uses the documented parallel pattern. |
| 56 | Callout "Who can spawn" | Main spawns with `Agent` tool; `Agent` in `tools` lets a subagent spawn; omit or `disallowedTools` to stop | 1 | PASS | "listing `Agent` in `tools` lets that subagent spawn subagents of its own"; "omit `Agent` from its `tools` list or add it to `disallowedTools`". |
| 57 | Parallel work | Depth: three layers; `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`; `1` turns nesting off | 1 | PASS | "up to three layers below the main conversation"; "Set `1` to turn nesting off." |
| 58 | Parallel work | 20 concurrent; `Concurrent subagent limit reached`; `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | 1 | PASS | "when 20 subagents are running ... fails with `Concurrent subagent limit reached`". |
| 59 | Parallel work | Many detailed results can use much main context | 1 | PASS | Warning block in "Run parallel research". |
| 60 | Parallel work | `/tasks` lists background work incl. subagents; `Ctrl+B` backgrounds a running task | 1, 2 | PASS | S2: "`/tasks` | View and manage background work ... including subagents". S1: "Press **Ctrl+B** to background a running task". |
| 61 | Guardrails | Frontmatter hooks run only while that subagent runs | 3 | PASS | "Subagent hooks: Claude Code runs them only while that subagent is running and removes them when it finishes." |
| 62 | Guardrails | Docs show `PreToolUse` hook on `Bash` that blocks SQL writes with exit code 2 | 1 | PASS | `db-reader` example; "exits with code 2 to block write operations". |
| 63 | Guardrails | Subagent tool calls also run hooks and permission rules from settings; hook input has `agent_id`, `agent_type` | 3 | WRONG-CITE | Hooks part is in S3: "the input carries the `agent_id` and `agent_type`". The "permission rules" part is not in S3; S1 supports it ("The rule applies to the main conversation and to subagents"; built-ins "inherit the parent conversation's permission rules"). Add Cite 1. |
| 64 | Guardrails | `Agent(<name>)` in `permissions.deny`, e.g. `"Agent(Explore)"` | 1 | PASS | `"deny": ["Agent(Explore)", ...]`. |
| 65 | Guardrails | Subagent final report scanned (v2.1.210+) | 1 | PASS | "Subagent output scanning requires Claude Code v2.1.210 or later." |
| 66 | Reference: fields | `name`/`description` required; `tools`/`disallowedTools` string or list | 1 | PASS | Frontmatter table. |
| 67 | Reference: fields | `model` values: `sonnet`, `opus`, `haiku`, `fable`, full ID e.g. `claude-opus-5-5`, `inherit` | 1 | PASS | Exact list in table. |
| 68 | Reference: fields | `skills`: first 32 names | 1 | PASS | "up to the first 32 distinct names in the list". |
| 69 | Reference: fields | `maxTurns` at limit output marked partial; `background`; `color` list; `isolation: worktree` | 1 | PASS | Table rows (`red, blue, green, yellow, purple, orange, pink, cyan`). |
| 70 | Reference: fields | Camel-case names must match; unknown field ignored silently | 1 | PASS | "Claude Code ignores a field it doesn't recognize without reporting an error." |
| 71 | Reference: fields | Plugin subagents ignore `hooks`, `mcpServers`, `permissionMode` | 1 | PASS | "plugin subagents don't support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields". |
| 72 | Reference: model order | 1 invocation param, 2 frontmatter, 3 `CLAUDE_CODE_SUBAGENT_MODEL`, 4 main model | 1 | PASS | Ordered list in "Choose a model". |
| 73 | Reference: other facts | `Agent` was `Task` before v2.1.63; `Task(...)` still aliases | 1 | PASS | "In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references ... still work as aliases." |
| 74 | Reference: other facts | Warning if own descriptions exceed 15,000 tokens | 1 | PASS | "exceed 15,000 tokens, Claude Code shows a warning at startup". |
| 75 | Reference: other facts | Background subagent keeps every MCP tool, reduced built-ins | 1 | PASS | "a background subagent keeps every MCP tool but only these built-in tools". |
| 76 | Reference: other facts | `Agent(worker, researcher)` limits spawn for `--agent` main thread; ignored in subagent file | 1 | PASS | "applies only to an agent running as the main thread with `claude --agent` ... any type list inside the parentheses is ignored." |
| 77 | Reference: other facts | Skill `context: fork` vs subagent `skills:` | 4 | PASS | S4 table: "Skill with `context: fork` ... Subagent with `skills` field". |
| 78 | Nav description (lib/nav.ts) | "qa-agent and sdet-agent subagents: tool and MCP access, how to call them, and parallel work." | n/a | PASS | Matches page sections (Tools and MCP access, Call a subagent, Parallel work). No old "cross-agent delegation". |
| 79 | Nav tagline (lib/nav.ts) | "give each testing job its own specialist" | n/a | OPINION-OK | Marketing phrase. |

Round 1 Open FAILs: 4 (row 15 FAIL, row 17 UNCITED, row 40 FAIL, row 63 WRONG-CITE)

## Round 2 (2026-10-10, commit 050af01 vs 8b9ad68)

Renumbering: new source 3 = CLI reference (https://code.claude.com/docs/en/cli-reference); old 3 (Hooks reference) is now 4; old 4 (Skills) is now 5. In the round-1 table above, "Cite 3" means Hooks reference and "Cite 4" means Skills; in round 2 they are 4 and 5. Sources re-fetched this round (sub-agents, commands, cli-reference, hooks, skills). All Cite numbers (1-5) exist; all five sources are cited.

Cite audit, every `<Cite n>` with n >= 3 (old numbers mapped by `git diff`):
| Line (heading) | Cite | Verdict | Evidence |
|---|---|---|---|
| Guardrails: frontmatter hooks run only while that subagent runs | 4 (Hooks) | PASS | hooks.md: "Subagent hooks: Claude Code runs them only while that subagent is running and removes them when it finishes." |
| Guardrails: tool calls also run settings hooks and permission rules | 1 + 4 | PASS | S4 (hooks.md): "Hooks from settings files, managed policy settings, and plugins also run inside subagents." S1: "The rule applies to the main conversation and to subagents." (permissions.deny) |
| Guardrails: hook input has `agent_id`, `agent_type` | 4 | PASS | hooks.md: "the input carries the `agent_id` and `agent_type` common input fields". |
| Reference, other facts: `context: fork` vs `skills:` | 5 (Skills) | PASS | skills.md table: "Skill with `context: fork`" / "Subagent with `skills` field". |
| Common mistake callout: `claude agents` | 3 (CLI ref) | PASS | See row 17 below. |

Changed or open rows:
| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 15 | Create a subagent | Edits apply within seconds, no restart; "Some cases still need a restart, for example the first agent file in an `agents` folder that you create after the session starts." | 1 | PASS | sub-agents.md: "Three cases still need a restart: The watcher covers only directories that existed when the session started, so after creating a scope's first agent file in a new `agents` directory, restart to load it." |
| 17 | Callout "/agents" | "`claude agents` ... opens agent view, to monitor and dispatch parallel background sessions" | 3 | PASS | cli-reference.md: "`claude agents` \| Open agent view to monitor and dispatch parallel background sessions." Local help: "Manage background agents". |
| 40 | sdet-agent file | `analyze-requirement` removed from sdet-agent `skills:` | none | PASS (EXAMPLE-OK) | Remaining skills `explain-code`, `analyze-rootcause`, `analyze-security` need no Jira MCP; `analyze-rootcause` uses the read-only database server, and sdet-agent has `mcp__db`. `analyze-requirement` now appears only in qa-agent (which has `mcp__atlassian`). |
| 63 | Guardrails | Settings hooks and permission rules apply in subagents | 1 + 4 | PASS | Cite 1 added for the permission-rules part (see Cite audit). |

Round-1 PASS/EXAMPLE-OK/OPINION-OK rows that carried old cites 3 and 4 (rows 61, 62-65 area and 77) were re-verified in the Cite audit above. Nav description and tagline unchanged (no diff): still PASS / OPINION-OK.

Open FAILs: 0
