# Hooks — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as the raw Markdown of the same page (URL plus `.md`). The URLs below are the canonical page URLs.

## Sources
S1. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
S2. Automate actions with hooks (guide) — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks-guide — accessed 2026-10-10
S3. Permissions — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/permissions — accessed 2026-10-10
S4. Environment variables — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/env-vars — accessed 2026-10-10
S5. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S6. Extend Claude with skills — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/skills — accessed 2026-10-10
Local checks (not a citable page): I ran the example scripts below with `jq` 1.x and sample JSON. `claude --help` has no hook flags.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | Hooks are user-defined handlers that run at points in the Claude Code lifecycle. A handler can be a shell command, an HTTP endpoint, an MCP tool call, an LLM prompt, or a subagent. | "Hooks are user-defined shell commands, HTTP endpoints, MCP tool calls, LLM prompts, or subagents that execute automatically at specific points in Claude Code's lifecycle." | S1 | Old page said only "shell commands". |
| C2 | Config has three levels: event, matcher group, hook handlers. | "1. Choose a hook event ... 2. Add a matcher group ... 3. Define one or more hook handlers" | S1 | |
| C3 | Minimal structure: `{"hooks": {"PostToolUse": [{"matcher": "Edit\|Write", "hooks": [{"type": "command", "command": "..."}]}]}}`. | JSON example in "Matcher patterns" | S1 | |
| C4 | Hook locations: `~/.claude/settings.json` (all projects), `.claude/settings.json` (project, shareable), `.claude/settings.local.json` (project, not shared), managed policy settings, plugin `hooks/hooks.json`, skill frontmatter, subagent frontmatter. | Hook locations table | S1 | Fixes old Windows-only paths (audit Med). |
| C5 | Hook entries from different settings levels merge. They do not replace each other. | "Hook entries merge across settings levels rather than replacing each other" | S1 | |
| C6 | An identical handler defined in more than one settings file runs once. All matching hooks run in parallel. | "All matching hooks run in parallel. If you define the same handler in more than one settings file, it runs once." | S1 | So hook order is not defined. |
| C7 | Command hooks get event JSON on stdin. HTTP hooks get it as the POST body. | "For command hooks, input arrives on stdin. For HTTP hooks, it arrives as the POST request body." | S1 | |
| C8 | Common stdin fields: `session_id`, `prompt_id`, `transcript_path`, `cwd`, `permission_mode`, `effort`, `hook_event_name`. Inside a subagent also `agent_id`, `agent_type`. | Common input fields table | S1 | `permission_mode` values: `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`. |
| C9 | A `PreToolUse` Bash hook receives `tool_name`, `tool_input` (`command`, `description`, `timeout`, `run_in_background`), and `tool_use_id`. | JSON example: `"tool_name": "Bash", "tool_input": {"command": "npm test", ...}, "tool_use_id": "toolu_01ABC123..."` | S1 | |
| C10 | `Write` `tool_input` has `file_path` and `content`. `Edit` has `file_path`, `old_string`, `new_string`. | Tool input tables | S1 | |
| C11 | For `Write`, `Edit`, and `Read`, `tool_input.file_path` is always absolute. `~` and relative paths are expanded first. On Windows it has backslashes. | "`tool_input.file_path` is always absolute" / "On Windows, the path arrives with backslash separators" | S1 | Normalize `\` before you match paths. |
| C12 | `PostToolUse` input adds `tool_response` (and optional `duration_ms`). | JSON example with `"tool_response": {"filePath": "/path/to/file.txt", "type": "create"}` | S1 | |
| C13 | There are no env vars `CLAUDE_TOOL_NAME`, `CLAUDE_FILE_PATH`, `CLAUDE_TOOL_INPUT` in the docs. The data arrives as JSON on stdin. | Not found in hooks, hooks-guide, or env-vars pages (0 matches by search). | S1, S2, S4 | Absence claim, based on search of three pages. Audit High item. State it as "use stdin JSON", not "these were removed". |
| C14 | Hook scripts get these env vars: `CLAUDE_PROJECT_DIR`, `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA` (plugin hooks), `CLAUDE_EFFORT`. | "both export them as the environment variables `CLAUDE_PROJECT_DIR`, `CLAUDE_PLUGIN_ROOT`, and `CLAUDE_PLUGIN_DATA`" / `CLAUDE_EFFORT` "Set automatically in Bash tool subprocesses and hook commands" | S1, S4 | |
| C15 | `${CLAUDE_PROJECT_DIR}` is the project root where the session started. It stays fixed if Claude enters a worktree. `cwd` in the JSON follows Claude. | "`${CLAUDE_PROJECT_DIR}`: the project root where the session started." / "`${CLAUDE_PROJECT_DIR}` stays put" | S1 | |
| C16 | Reference scripts as `"$CLAUDE_PROJECT_DIR"/.claude/hooks/x.sh` in shell form (quote it). Exec form (`command` plus `args`) needs no quoting. | `"command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"` (S2); `"command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/check-style.sh", "args": []` (S1) | S1, S2 | Make scripts executable: `chmod +x`. |
| C17 | Exit 0 means success. Most events write stdout to the debug log only. | "For most events, Claude Code writes stdout to the debug log and doesn't show it in the transcript." | S1 | Fixes audit Med "stdout returned to Claude". |
| C18 | Exceptions: on `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, `PostModelSwitch`, plain stdout becomes context for Claude. | "The exceptions are `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, and `PostModelSwitch`" | S1 | |
| C19 | Exit 2 is a blocking error. On `PreToolUse` it blocks the tool call. stderr text goes to Claude as the reason. | "Exit 2 means a blocking error." / `PreToolUse` \| Yes \| "Blocks the tool call" / "Claude sees the stderr message as the denial reason." | S1 | |
| C20 | Exit 2 beats JSON. Even `permissionDecision: "allow"` cannot override it. | "even a JSON `permissionDecision` of `\"allow\"` can't override it" | S1 | |
| C21 | Any other exit code (including 1) does not block for most events. The action goes on. The transcript shows a non-blocking error with the first line of stderr. | "Without valid JSON on stdout, Claude Code treats exit code 1 as a non-blocking error and proceeds with the action, even though 1 is the conventional Unix failure code." | S1 | Fixes audit High: old `process.exit(1)` did not block. |
| C22 | A hook script that cannot start (bad path, not executable) is also non-blocking. A mistyped path leaves a policy gate off. | "a mistyped path in `settings.json` leaves the gate silently disabled" | S1 | QA tip: test the hook with sample JSON. |
| C23 | Exit 2 effect by event: `PostToolUse` shows stderr to Claude (tool already ran). `Stop` prevents stopping. `UserPromptSubmit` blocks the prompt. `Notification`, `SessionEnd` etc. cannot block. | "Exit code 2 behavior per event" table | S1 | Quote the rows needed. |
| C24 | For file edits, `PostToolUse` cannot undo them. | "`PostToolUse` hooks can't undo actions since the tool has already executed." | S2 | |
| C25 | JSON output: exit 0 and print one JSON object on stdout. Do not mix JSON with other text. | "Your hook's stdout must contain only the JSON object." | S1 | Shell profile `echo` can break it (S2 troubleshooting). |
| C26 | `PreToolUse` decision lives in `hookSpecificOutput`: `hookEventName`, `permissionDecision` (`allow`, `deny`, `ask`, `defer`), `permissionDecisionReason`, optional `updatedInput`, `additionalContext`. | JSON example `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "Database writes are not allowed"}}` | S1 | |
| C27 | `permissionDecision` at the top level is ignored. It must be inside `hookSpecificOutput`. | "`permissionDecision` belongs inside `hookSpecificOutput`, not at the top level." | S2 | |
| C28 | If hooks disagree, precedence is `deny` > `defer` > `ask` > `allow`. | "precedence is `deny` > `defer` > `ask` > `allow`" | S1 | |
| C29 | `PreToolUse` top-level `decision` and `reason` are deprecated. `"approve"` maps to `allow`, `"block"` to `deny`. | "these are deprecated for this event" | S1 | |
| C30 | Other events (`PostToolUse`, `Stop`, `UserPromptSubmit`, ...) use top-level `decision: "block"` and `reason`. The only value is `"block"`. | "The only value for `decision` is `\"block\"`." | S1 | |
| C31 | `additionalContext` in `hookSpecificOutput` adds text to Claude's context as a system reminder. Write it as facts. 10,000 character cap. | "Claude Code wraps the string in a system reminder" / "capped at 10,000 characters" | S1 | Fixes audit: how stdout reaches Claude. |
| C32 | `continue: false` with `stopReason` stops Claude entirely. | `{ "continue": false, "stopReason": "Build failed, fix errors before continuing" }` | S1 | |
| C33 | `PostToolUse` can replace a tool's output with `updatedToolOutput`. | "Replaces the tool's output with the provided value before it is sent to Claude." | S1 | Optional. |
| C34 | There are 33 hook events. | Event sections: SessionStart, Setup, InstructionsLoaded, UserPromptSubmit, UserPromptExpansion, MessageDisplay, PreToolUse, PermissionRequest, PostToolUse, PostToolUseFailure, PostToolBatch, PermissionDenied, Notification, SubagentStart, SubagentStop, TaskCreated, TaskCompleted, Stop, StopFailure, TeammateIdle, ConfigChange, CwdChanged, DirectoryAdded, FileChanged, WorktreeCreate, WorktreeRemove, PreCompact, PostCompact, PreModelSwitch, PostModelSwitch, Elicitation, ElicitationResult, SessionEnd | S1 | Counted from the `###` headings under "Hook events" (33) and the lifecycle table. Audit said 33: confirmed. |
| C35 | Event groups by cadence: per session (`SessionStart`, `SessionEnd`), per turn (`UserPromptSubmit`, `Stop`, `StopFailure`), per tool call (`PreToolUse`, `PostToolUse`). | "Events fall into three cadences" | S1 | |
| C36 | Event meanings for QA: `PreToolUse` "Before a tool call executes. Can block it". `PostToolUse` "After a tool call succeeds". `PostToolUseFailure` "After a tool call fails". `Stop` "When Claude finishes responding". `SessionStart` "When a session begins or resumes". | Lifecycle table | S1 | |
| C37 | Five hook types: `command`, `http`, `mcp_tool`, `prompt`, `agent`. | "`type` \| yes \| `\"command\"`, `\"http\"`, `\"mcp_tool\"`, `\"prompt\"`, or `\"agent\"`" | S1 | Audit asked to verify: all five exist. |
| C38 | `http` hook: `url`, `headers`, `allowedEnvVars`. It POSTs the JSON. To block, return 2xx with decision JSON. Status codes alone cannot block. | "HTTP hooks can't signal a blocking error through status codes alone." | S1 | |
| C39 | `mcp_tool` hook: `server`, `tool`, `input` (supports `${tool_input.file_path}`). | Example: `"type": "mcp_tool", "server": "my_server", "tool": "security_scan", "input": { "file_path": "${tool_input.file_path}" }` | S1 | Not available on `SessionStart` at launch or `Setup`. |
| C40 | `prompt` hook sends the input to a Claude model for a single-turn yes/no. `agent` hook spawns a subagent with tools. Agent hooks are experimental. Default timeouts: 30 s prompt, 60 s agent. | "Agent hooks are experimental." / "agent hooks have a longer default timeout of 60 seconds" | S1 | Agent hook: up to 50 turns; returns `{ "ok": true/false }`. |
| C41 | Event support by type: 12 events (incl. `PreToolUse`, `PostToolUse`, `Stop`, `UserPromptSubmit`) support all five types. `SessionStart` and `Setup` support only `command` and `mcp_tool`. | "Events that support all five hook types" list | S1 | |
| C42 | Handler default timeouts: 600 s for `command`, `http`, `mcp_tool`. `SessionEnd` hooks share a 1.5 s budget. | "Defaults: 600 for `command`, `http`, and `mcp_tool`; 30 for `prompt`; 60 for `agent`." | S1 | S2 says "10 minutes". |
| C43 | A timed-out command hook on `PreToolUse` does not block. The call goes through normal permissions. | "A timed-out `command`, `http`, or `mcp_tool` hook doesn't block the tool call." | S1 | |
| C44 | `matcher` rules: `"*"`, `""`, or omitted match all. Only letters, digits, `_`, `-`, spaces, `,`, `\|` = exact string or list. Any other character = JavaScript regex (unanchored). | Matcher table | S1 | |
| C45 | `Edit\|Write` matches either tool exactly. `Edit.*` also matches `NotebookEdit`. | "`Edit\|Write` and `Edit, Write` each match either tool exactly" / "`Edit.*` matches both `Edit` and `NotebookEdit`" | S1 | Audit Med: `"Write"` alone misses `Edit`. |
| C46 | Matchers are case-sensitive. | "Matchers are case-sensitive" | S2 | |
| C47 | Matcher field depends on the event: tool name for tool events; session start source for `SessionStart`; notification type for `Notification`; agent type for `SubagentStart`. A matcher on an event without matcher support is ignored. | "If you add a `matcher` field to an event without matcher support, it is silently ignored." | S1 | `UserPromptSubmit`, `Stop` have no matcher support. |
| C48 | MCP tool names are `mcp__<server>__<tool>`. Match a whole server with `mcp__server__.*`. A bare `mcp__server` matches nothing. | "The `.*` is required: a matcher like `mcp__memory` or `mcp__brave-search` contains only exact-match characters" | S1 | Link to MCP page. |
| C49 | `PreToolUse` input for an MCP tool also has `mcp_server` with `name` and `source` (v2.1.274+). Base trust on `source`, not on name. | "Base trust decisions on `source` rather than on `name`" | S1 | |
| C50 | The `if` field filters with permission-rule syntax. Examples `"Bash(git *)"`, `"Edit(*.ts)"`. Only on tool events. One rule per `if`. | "Only evaluated on tool events ... On other events, a hook with `if` set never runs" | S1 | `if` is best-effort for Bash. Use permissions for hard rules. |
| C51 | `"Edit(src/**)"` matches only `src` in the working directory. Use `"Edit(**/src/**)"` for any depth (v2.1.214+). | "To match a directory named `src` at any depth, write `\"Edit(**/src/**)\"`." | S1 | |
| C52 | `/hooks` opens a read-only browser of configured hooks. It labels the source of each hook. | "Type `/hooks` in Claude Code to open a read-only browser for your configured hooks." | S1 | |
| C53 | If a hook does not fire: run `/hooks`, check the matcher (case-sensitive), check the event. | "Run `/hooks` and confirm the hook appears under the correct event" | S2 | |
| C54 | Debug: `claude --debug-file /tmp/claude.log`, or `/debug` mid-session. `Ctrl+O` opens the transcript view. | "Start Claude Code with `claude --debug-file /tmp/claude.log`" | S2 | |
| C55 | Test a hook by piping sample JSON: `echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' \| ./my-hook.sh` then `echo $?`. | exact lines | S2 | |
| C56 | Hooks from settings files run only after you accept the workspace trust dialog (interactive). In `-p`/SDK runs the folder counts as trusted, so committed repo hooks run. | "`-p` or SDK session: Claude Code never shows the dialog and treats the folder as trusted" | S1 | CI safety: review `.claude/settings.json` of repos you did not write. |
| C57 | Command hooks run with your full user permissions. | "Command hooks execute shell commands with your full user permissions." | S1 | |
| C58 | Security practices: validate input, quote shell variables, block `..` in paths, use absolute paths, skip `.env`, `.git/`, keys. | "Security best practices" list | S1 | |
| C59 | A `PreToolUse` deny blocks the tool even in `bypassPermissions` and `--dangerously-skip-permissions`. | "A hook that returns `permissionDecision: \"deny\"` blocks the tool even in `bypassPermissions` mode" | S2 | Policy that users cannot bypass. |
| C60 | A hook `"allow"` does not bypass deny rules from settings. Deny and ask rules always apply. A blocking hook beats allow rules. | "PreToolUse hook decisions don't bypass permission rules." / "A blocking hook also takes precedence over allow rules." | S3 | |
| C61 | `PreToolUse` does not fire for files added with `@` in a prompt. Use a `Read` deny rule. | "no PreToolUse hook fires for them, including hooks matching `Read`" | S1 | |
| C62 | Deny `.env` with a permission rule: `Read(./.env)`. `Read` and `Edit` deny rules cover built-in file tools, recognized Bash commands (`cat`, `sed`, `tee`), and redirections. They do not cover arbitrary scripts. Use the sandbox for OS-level blocking. | "Read and Edit deny rules apply to Claude's built-in file tools, to file commands Claude Code recognizes in Bash ... They don't apply to ... arbitrary subprocesses" | S3 | Fixes audit Med: pair `Edit\|Write` hook with `permissions.deny`. |
| C63 | A `PostToolUse` hook on `Edit\|Write` does not run when a Bash command or other process rewrites the file. Use `FileChanged` for that. | "Claude Code doesn't run a `PostToolUse` hook matching `Edit\|Write` when a `Bash` command or a process outside Claude Code rewrites the same file." | S1 | Same gap applies to a `PreToolUse` file hook: a Bash command can write the file (inference; state as advice to add the deny rule, not as a quote). |
| C64 | `async: true` runs a command hook in the background. It cannot block. Output reaches Claude on the next turn via `additionalContext` or `systemMessage`. | "Async hooks can't block or control Claude's behavior" | S1 | Only on `type: "command"`. |
| C65 | `asyncRewake` wakes Claude on exit 2, even when idle. | "runs in the background and wakes Claude on exit code 2" | S1 | |
| C66 | A `Stop` hook that blocks 8 times in a row is overridden. Check `stop_hook_active` and exit 0 early. Cap is `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`. | "Claude Code overrides a Stop hook after it blocks eight times in a row" | S2 | |
| C67 | Skill and subagent frontmatter can define hooks. Subagent hooks run only while it runs. Skill hooks last for the rest of the session. `once: true` works only in skill frontmatter. | "Claude Code runs them only while that subagent is running" / "keeps running them for the rest of the session" | S1 | |
| C68 | Plugin hooks live in `hooks/hooks.json` with an optional top-level `description`. | "Define plugin hooks in `hooks/hooks.json` with an optional top-level `description` field." | S1 | |
| C69 | Settings option `disableAllHooks: true` turns hooks off. It cannot disable managed hooks from user/project settings. | "`\"disableAllHooks\": true`" | S1 | |
| C70 | Settings edits to hooks are normally picked up by a file watcher. If not, restart. | "Direct edits to hooks in settings files are normally picked up automatically by the file watcher." | S1, S2 | |
| C71 | Windows: Bash hooks need Git Bash. With no Git Bash the Bash tool is not registered. Use `Bash\|PowerShell` matcher and `"shell": "powershell"`. | "A hook that matches only `Bash` never fires there." | S1 | |
| C72 | The tool for the shell is `Bash` (and `PowerShell` on Windows). The `Agent` tool matches as `Agent`. | Matcher examples list | S1 | |

## Verified example scripts (derived; run locally with sample JSON)
- Block `.env`, migrations, `.git/` (adapted from S2 `protect-files.sh`; pattern list changed to `".env" "/migrations/" ".git/"`). Test: `Write` to `/p/db/migrations/001.sql` gave exit 2 and the stderr text. `Edit` of `/p/src/pay.js` gave exit 0.
- Audit log (own example, from C9): `jq -r '[(now|todate), .session_id, .tool_input.command] | @tsv' >> "$CLAUDE_PROJECT_DIR"/.claude/bash-audit.log`. Test: printed `2026-10-09T18:32:34Z	abc123	npm test`.
- Formatter (verbatim from S2): `jq -r '.tool_input.file_path' | xargs npx prettier --write` on `PostToolUse`, matcher `Edit|Write`.
- Tests after edits (S1 async example): script `run-tests-async.sh` returns `hookSpecificOutput.additionalContext`; config uses `"async": true`, matcher `Write|Edit`.

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| hooks.mdx › intro and PreToolUse/PostToolUse cards | rewrite | "Can block by exiting non-zero" is wrong (C21). Block = exit 2 or JSON deny (C19, C26). Only two events shown, 33 exist (C34). |
| hooks.mdx › Where to Configure Hooks (Windows paths) | rewrite | Use C4 table. |
| hooks.mdx › Hook Configuration Format | rewrite | `$CLAUDE_TOOL_INPUT`, `$CLAUDE_FILE_PATH` are not in the docs (C13). Use stdin JSON (C7). |
| hooks.mdx › Available Matchers | rewrite | Add `Edit\|Write` (C45), MCP (C48), per-event matcher field (C47). |
| hooks.mdx › Environment Variables in Hooks | replace | Replace with "Input JSON" (C8 to C12) and real env vars (C14). |
| hooks.mdx › QA example: block .env and migrations | rewrite | Uses `process.env.CLAUDE_FILE_PATH` and `exit(1)`: no-op. New script uses stdin and exit 2 (verified). Add `permissions.deny` pairing (C62). |
| hooks.mdx › QA example: prettier on Write | rewrite | Matcher `Edit\|Write`, stdin `jq` (C45, S2 example). |
| hooks.mdx › QA example: audit log | rewrite | `$CLAUDE_TOOL_INPUT` not available. Use `jq` on stdin (verified). |
| hooks.mdx › Key Rules callout | rewrite | "Exit non-zero = blocked" and "stdout returned to Claude" are wrong (C17, C21). "0 tokens" claim: drop unless sourced. |
| (new) event list, hook types, JSON output, `/hooks`, debugging, security | add | C34 to C72. |

## Page outline
- ## What hooks are — C1, C35. Hooks run your code at fixed points. Claude cannot skip them. Contrast with CLAUDE.md and skills: a rule that must hold every time belongs in a hook (S6; see Skills notes C44 in extend-skills.md).
- ## How a hook is built — C2 to C6.
  - ### Where hooks live — C4, C5.
  - ### Event, matcher, handler — C3, C44 to C47, C48, C50.
- ## What your hook receives — C7 to C12, C13, C14. Show the Bash `PreToolUse` JSON. Say clearly: no `$CLAUDE_FILE_PATH`; read stdin with `jq`. `${CLAUDE_PROJECT_DIR}` for script paths (C15, C16).
- ## What your hook can answer
  - ### Exit codes — C17 to C23. Table: 0, 2, other. Warning on exit 1 (C21). Test with sample JSON (C55).
  - ### JSON output — C25 to C32. `permissionDecision` example (C26, C27, C28). `additionalContext` (C31).
- ## Events — C34 to C36, C41. Table of the 33 names grouped by cadence. Mark the QA-useful ones: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `Stop`, `SessionStart`, `UserPromptSubmit`, `SubagentStop`, `FileChanged`, `PreCompact`.
- ## Hook types — C37 to C41. Table of five types. Note agent hooks are experimental (C40). `mcp_tool` example for a security scan (C39).
- ## QA examples (each verified)
  - ### Block edits to .env and migrations — protect script plus `PreToolUse` `Edit|Write`. Pair with `Read(./.env)` deny rule and note the Bash gap (C62, C63).
  - ### Format after edits — C45, S2 example.
  - ### Run tests after edits — async example (C64). Warn: `Write|Edit` only, a Bash edit does not trigger (C63).
  - ### Audit-log Bash commands — `jq` example. Note: log can hold secrets in commands; keep the file out of git.
- ## Debug and stay safe — C52 to C59, C61, C66, C70, C71. `/hooks`, `--debug-file`. Trust and CI (C56). Deny beats bypass (C59).

## Open questions
- C13 is an absence claim from search. The writer should phrase it as "the docs define no such variables; use stdin JSON".
- The statement in C63 about a Bash command bypassing a `PreToolUse` file hook is inference from the `PostToolUse` quote. Write it as advice ("also add a `Read`/`Edit` deny rule"), not as a quoted fact.
- Audit-log example is not from the docs. The writer may keep it as "example" and must not cite a source for the script itself, only for the stdin fields (C9).
- Windows commands for the examples were not tested.
