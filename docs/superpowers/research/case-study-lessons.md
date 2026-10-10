# Case study: What to Fix in the Setup — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as the raw Markdown of the same page (URL plus `.md`). The URLs below are the canonical page URLs.

Workspace note: REPO rows were checked in the private clone of the practice workspace (state of 2026-10-07). Paths use the neutral prefixes `api/`, `web/`, and `./` (workspace root). Some mistakes are in files that were copied from an unrelated project into `api/.claude/` and `web/.claude/`. These rows describe the mistake only. They do not quote those files, and they do not name that project.

## Sources

S1. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S2. Error reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/errors — accessed 2026-10-10
S3. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
S4. Configure permissions — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/permissions — accessed 2026-10-10
S5. Claude Code settings — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/settings — accessed 2026-10-10
S6. Connect Claude Code to tools via MCP — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/mcp — accessed 2026-10-10
S7. Extend Claude with skills — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/skills — accessed 2026-10-10
S8. Model configuration — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/model-config — accessed 2026-10-10
S9. Plugins overview — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/overview — accessed 2026-10-10

Page cite numbers: `<Cite n={k} />` on the page is source Sk.

## Claims

| # | Claim | Kind (DOC/REPO) | Quote or value | Source |
|---|---|---|---|---|
| C1 | The workspace has 25 commits, from 2026-09-19 to 2026-10-07. | REPO | `git log` count 25; first date 2026-09-19, last 2026-10-07 | `./` (git history) |
| C2 | A copied agent lists its MCP tools with server names that are not the workspace names: the Jira name has an extra `-mcp` suffix, and the database name is a different one. The workspace servers are named `jira` and `<db-server>`. | REPO | `tools` line of the copied adversarial reviewer agent; `.mcp.json` keys `jira`, `playwright`, and the DB server key | `api/.claude/agents/` (same in `web/.claude/agents/`), `./.mcp.json` |
| C3 | MCP tool names have the form `mcp__<server>__<tool>`. | DOC | "MCP tools follow the naming pattern `mcp__<server>__<tool>`" | S3 |
| C4 | `tools` and `disallowedTools` accept `mcp__<server>` or `mcp__<server>__*`, which grants or removes every tool of that server. | DOC | "`mcp__<server>` or `mcp__<server>__*` grants or removes every tool from the named server" | S1 |
| C5 | Claude Code refuses to launch a subagent when every entry in `tools` fails to match a tool. | DOC | "Every entry in the subagent's `tools` list failed to match a usable tool, so Claude Code refused to launch the subagent" | S2 |
| C6 | An entry that names a tool of a server that is not connected matches no tools in the session. | DOC | "the entry is valid but no tool in the current session matches it right now, such as `mcp__github__*` with no GitHub MCP server connected" | S2 |
| C7 | If `tools` lists only built-in tools, the subagent cannot use MCP tools. | DOC | "This example uses `tools` to allow only Read, Grep, Glob, and Bash. The subagent can't edit files, write files, or use any MCP tools" | S1 |
| C8 | A second copied agent tells Claude to delegate work to three other agents. None of the three is defined in the workspace. | REPO | Delegation section names three agents; workspace agent files: `qa-reviewer-agent`, `test-executor-agent` (root) and two copied agents (api/web) | `api/.claude/agents/`, `./.claude/agents/` |
| C9 | The same copied agent lists `Task` in `tools`. | REPO | `tools` list contains `Task` | `api/.claude/agents/` |
| C10 | In v2.1.63 the Task tool was renamed to Agent. `Task(...)` references still work as aliases. | DOC | "In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases." | S1 |
| C11 | By default a subagent can spawn its own subagents, up to three layers below the main conversation. | DOC | "By default, a subagent can spawn subagents of its own, up to three layers below the main conversation." | S1 |
| C12 | The executor agent has `tools: Read, Write, Glob, Grep, Bash, Skill`, model `sonnet`, and preloads `execute-test`. | REPO | frontmatter lines 4–7 | `./.claude/agents/test-executor-agent.md` |
| C13 | The executor's rule "only `agent-browser` for UI steps and `curl` for API steps" is in its prompt and its skill. No permission rule enforces it. | REPO | agent line 14; skill rule 1; `./.claude/settings.json` has no `permissions` key | `./.claude/agents/test-executor-agent.md`, `./.claude/skills/execute-test/SKILL.md`, `./.claude/settings.json` |
| C14 | Permission rules are enforced by Claude Code, not by the model. Prompt or CLAUDE.md instructions do not change what Claude Code allows. | DOC | "Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or `CLAUDE.md` shape what Claude tries to do, but they don't change what Claude Code allows." | S4 |
| C15 | `Bash(npm run *)` style wildcards; `:*` at the end is equal to a trailing ` *`. | DOC | "The `:*` suffix is an equivalent way to write a trailing wildcard, so `Bash(ls:*)` matches the same commands as `Bash(ls *)`." | S4 |
| C16 | A Bash rule matches the command text. It does not match the same program in another form, so it is not a security boundary. For enforcement that does not depend on the text, use sandboxing. | DOC | "It doesn't match the same program invoked in a different form, so a deny or ask rule covers the invocation Claude usually produces and isn't a security boundary around the program." / "For filesystem and network enforcement that doesn't depend on the command text, use sandboxing." | S4 |
| C17 | The reviewer agent sets `model: claude-opus-5-5`, a full model ID. | REPO | frontmatter line 5 | `./.claude/agents/qa-reviewer-agent.md` |
| C18 | `model` accepts an alias (`sonnet`, `opus`, `haiku`, `fable`), a full model ID, or `inherit`. | DOC | "`sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit`" | S1 |
| C19 | Aliases update over time. To pin a version, use the full model name. | DOC | "Aliases point to the recommended version for your provider and update over time. To pin to a specific version, use the full model name" | S8 |
| C20 | `api/.claude/` and `web/.claude/` are identical copies (agents, skills, commands, settings). | REPO | `diff -rq` prints no difference | `api/.claude/`, `web/.claude/` |
| C21 | `find-bug` and `test-design` exist at the root and in each sub-project, with different content and frontmatter. The copies have frontmatter fields from another tool (`version`, `author`, `license`, `platforms`, `metadata`). | REPO | root vs copy differ from line 3 | `./.claude/skills/find-bug/SKILL.md`, `api/.claude/skills/find-bug/SKILL.md` |
| C22 | A nested skill loads when Claude first reads or edits a file in that directory. When it has the name of a root skill, both stay available. `/name` runs the root skill; the nested one is listed with a directory-qualified name. | DOC | "Skills in a `.claude/skills/` directory below where you started don't load at startup. They load the first time Claude reads or edits a file in that subdirectory" / "`/deploy` runs the root skill." / "`/apps/web:deploy` runs the nested skill on its own." | S7 |
| C23 | Use a plugin to package skills, subagents, hooks, or MCP servers as one unit and install it in many projects. | DOC | "Use a plugin when you want several skills, subagents, hooks, or MCP servers packaged as one unit. ... Make one to give your own setup to teammates, install it in many projects, or publish versioned releases." | S9 |
| C24 | The workspace has one command file, `./.claude/commands/playwright.md`. | REPO | file list | `./.claude/commands/` |
| C25 | Custom commands are merged into skills. `.claude/commands/<name>.md` and `.claude/skills/<name>/SKILL.md` both create `/<name>`. Command files keep working. | DOC | "Custom commands have been merged into skills. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way. Your existing `.claude/commands/` files keep working." | S7 |
| C26 | Prefer a skill for new work, because skills support supporting files. | DOC | "Prefer a skill for new work, since skills also support supporting files" | S7 |
| C27 | In each sub-project, a command file and a skill have the same name. | REPO | `commands/<name>.md` and `skills/<name>/SKILL.md` with the same name | `api/.claude/commands/`, `api/.claude/skills/` |
| C28 | If a skill and a `.claude/commands/` file have the same name, the skill runs. | DOC | "A skill and a file in `.claude/commands/`: The skill" | S7 |
| C29 | Three copied skill bodies have 508, 549, and 660 lines (about 39 KB, 31 KB, and 55 KB). The largest root skill has 329 lines (about 20 KB). | REPO | `wc -l`, `wc -c` (508/39489, 549/31094, 660/55602; root 329/20132) | `api/.claude/skills/`, `./.claude/skills/blast-radius/SKILL.md` |
| C30 | Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files. | DOC | "Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files." | S7 |
| C31 | A loaded skill's content stays in context across turns, so every line is a recurring token cost. | DOC | "Once a skill loads, its content stays in context across turns, so every line is a recurring token cost." | S7 |
| C32 | The `find-bug` skill does not tell Claude to run the reviewer agent. | REPO | 0 matches for "reviewer" | `./.claude/skills/find-bug/SKILL.md` |
| C33 | A copied PreToolUse Bash hook returns `permissionDecision: "allow"` for every git command except `add`, `commit`, and `push`, and `"ask"` for those three. It finds them with `grep -E` regular expressions. | REPO | hook command text (not quoted) | `api/.claude/settings.json` (same in `web/`) |
| C34 | `permissionDecision: "allow"` skips the permission prompt. | DOC | "`\"allow\"` skips the permission prompt" | S3 |
| C35 | `PreToolUse` hook decisions do not bypass permission rules. A matching deny rule blocks the call even when the hook returned `"allow"`. | DOC | "PreToolUse hook decisions don't bypass permission rules. Claude Code evaluates deny and ask rules regardless of what a PreToolUse hook returns: a matching deny rule blocks the call" | S4 |
| C36 | Copied PostToolUse hooks return `decision: "block"` after an agent or a skill finished, to require a second review. | REPO | `PostToolUse` entries for `Agent` and `Skill` | `api/.claude/settings.json` |
| C37 | PostToolUse hooks fire after the tool ran. `decision: "block"` adds the reason next to the tool result; Claude still sees the original output. | DOC | "`PostToolUse` hooks fire after a tool has already executed successfully." / "`\"block\"` adds the `reason` next to the tool result. Claude still sees the original output" | S3 |
| C38 | The longest hook text in the copied settings is about 2,000 characters; the PostToolUse reasons are about 1,600 and 1,100 characters. | REPO | measured lengths 2024, 1597, 1067 | `api/.claude/settings.json` |
| C39 | A hook's `additionalContext`, `systemMessage`, `initialUserMessage`, and plain stdout are capped at 10,000 characters. (The `reason` field is not in the list. The page states only the `additionalContext` cap.) | DOC | "are capped at 10,000 characters" | S3 |
| C40 | The root `PreToolUse` group with matcher `Skill` runs the graphify script and an `mcp_tool` hook that activates a Serena project (timeout 30 s). The `mcp_tool` hook has no filter. The script itself acts only for `test-design` and `find-bug`. | REPO | `./.claude/settings.json`; script line 8 | `./.claude/settings.json`, `./.claude/hooks/graphify-prehook.sh` |
| C41 | The `if` field takes one permission rule and filters when a hook runs. It is evaluated on tool events such as PreToolUse. | DOC | "Permission rule syntax to filter when this hook runs ... The hook command only runs if the tool call matches the pattern." / "The `if` field holds exactly one permission rule." | S3 |
| C42 | Skill permission syntax: `Skill(name)` for exact match, `Skill(name *)` for prefix match with arguments. | DOC | "Permission syntax: `Skill(name)` for exact match, `Skill(name *)` for prefix match with any arguments." | S7 |
| C43 | Claude Code reads the shared `.claude/settings.json` from the session's primary working directory. | DOC | "Claude Code reads the shared `.claude/settings.json` from the session's primary working directory, so to use a file committed at the repository root, start Claude Code there." | S5 |
| C44 | The workspace is one git repository; `api/` and `web/` each have their own `.claude/settings.json` with hooks. The root settings have only the Skill hooks and no `permissions`. | REPO | file contents | `./.claude/settings.json`, `api/.claude/settings.json`, `web/.claude/settings.json` |
| C45 | The DB MCP server in `.mcp.json` connects as an admin database user and enables `create`, `update`, `delete`, and `execute` permissions. The `find-bug` and `pr-review` skills describe read-only SQL use. | REPO | `args` of the DB server (values not copied) | `./.mcp.json` |
| C46 | The README names a user-level DB server (not the project server) as "Read-only". The README text is out of date for the project server. Its tree line says `.mcp.json` holds `playwright, jira`. | REPO | README table row and tree line 41 | `./README.md` |
| C47 | The MCP docs advise a read-only database user in the connection string so that queries cannot modify data. | DOC | "Use a read-only database user in the connection string so the queries Claude runs can't modify data" | S6 |
| C48 | The `pr-review` skill calls a DB tool with a server prefix that is not the `.mcp.json` key of the DB server. | REPO | line 54 of the skill vs `.mcp.json` key | `./.claude/skills/pr-review/SKILL.md`, `./.mcp.json` |
| C49 | The DB connection URL is in `args` and uses `${VAR:-}` (empty default) for the password. | REPO | pattern `${VAR:-}` in `args` | `./.mcp.json` |
| C50 | `.mcp.json` supports `${VAR}` and `${VAR:-default}`, in `command`, `args`, `env`, `url`, and `headers`. | DOC | "`${VAR}`: expands to the value of environment variable `VAR`" / "`${VAR:-default}`: expands to `VAR` if set, otherwise uses `default`" | S6 |
| C51 | If a referenced variable is not set and has no default, Claude Code warns in `claude mcp list` and `/mcp`, and loads the server with the unexpanded text. | DOC | "if a `${VAR}` reference ... names a variable that isn't set and has no `:-default`, Claude Code warns in `claude mcp list` output and in `/mcp`, naming the variable" | S6 |
| C52 | The Playwright MCP server runs `npx -y @playwright/mcp@latest`. No skill, agent, or command uses it; `execute-test` forbids it. | REPO | `.mcp.json`; grep for Playwright MCP use: only the prohibition in `execute-test` | `./.mcp.json`, `./.claude/` |
| C53 | Verify that you trust each MCP server before you connect it. | DOC | "Verify you trust each server before connecting it." | S6 |
| C54 | `GRAPHIFY_SETUP.md` step 5 says to commit `graphify-out`, but `.gitignore` ignores `graphify-out/`, and git tracks 0 files in it. | REPO | step "5. Commit the graph"; `.gitignore` line 1; `git ls-files` count 0 | `./GRAPHIFY_SETUP.md`, `./.gitignore` |
| C55 | When the graph is missing, the hook tells Claude that graphify was not queried. | REPO | first `emit` branch | `./.claude/hooks/graphify-prehook.sh` |
| C56 | One README table row says the 5 failures were fixed in PR #9. PR #9 fixed TC-005 to TC-008. TC-014 waits for a business decision (README "Known limitations"). | REPO | README line 310; commit `b69662d` message; README "Known limitations" | `./README.md`, `./` (git history) |
| C57 | The reviewer agent lists Read, Grep, Glob, Skill and read-only Serena tools, with no Write, Edit, or Bash, and returns a PASS or BLOCKED gate. | REPO | frontmatter line 4; body | `./.claude/agents/qa-reviewer-agent.md` |
| C58 | Plugin MCP tool names have the form `mcp__plugin_<plugin-name>_<server-name>__<tool-name>`. | DOC | "The full form is `mcp__plugin_<plugin-name>_<server-name>__<tool-name>`" | S6 |
| C59 | A subagent with preloaded skills gets the full skill content at startup. | DOC | "Subagents with preloaded skills work differently: the full skill content is injected at startup." | S7 |
| C60 | `pr-review` keeps the reviewer prompt in a supporting file, `reviewer-prompt.md`. | REPO | folder content | `./.claude/skills/pr-review/` |
| C61 | The executor's skill marks a case `not executed` with a "Not run:" reason. | REPO | result rules table | `./.claude/skills/execute-test/SKILL.md` |
| C62 | Add a `Read` deny rule such as `Read(./.env)` to block file tools from reading a file. | DOC | "add a `Read` deny rule for its path, such as `Read(./.env)`" | S4 |
| C63 | Deny rules from any scope are evaluated before allow rules. | DOC | "deny rules from any scope are evaluated before allow rules" | S4 |
| C64 | In `default` mode, a call that is not allowed by a rule asks for permission (`dontAsk` auto-denies such calls; allowed tools still run). | DOC | "`dontAsk`: Auto-denies every call that would otherwise prompt ... as do tools pre-approved via `/permissions` or `permissions.allow` rules" | S4 |

| C65 | A bare file name such as `Read(.env)` matches at any depth. | DOC | "Bare filenames follow gitignore semantics and match at any depth, so `Read(.env)` and `Read(**/.env)` are equivalent" | S4 |
| C66 | The fix example keeps only the non-write permission groups of the DB server (`list,read,utility`). The group names come from the workspace config, not from an official page. | REPO | permission list in `args` | `./.mcp.json` |

Skill rule forms (C42): the page advises testing the `if` rule with a call that has arguments and one that has none, because the docs do not say whether `Skill(name *)` matches a call with no arguments. This is marked as the tutorial's own advice.

C64 detail: in `default` mode, built-in read-only Bash commands run without a prompt (permissions page, "Yes, except a built-in set of read-only commands"). The page says so.

Tutorial examples (no claim): the allow list `Bash(npx playwright test *)`, `Bash(k6 run *)`, the deny list for `git reset --hard`, `git clean`, `git branch -D`, and the `if` handler for the `mcp_tool` hook are the tutorial's own fix examples. Each one uses only rule syntax from C15, C35, C41, C42.

## Dropped or changed notes

- "Subagents cannot start other subagents": not true now (C11). The page says that `Task` still works as an alias (C10) and moves the real problem to the missing delegation targets (C8).
- "`${VAR:?}`": the docs list only `${VAR}` and `${VAR:-default}` (C50). The page advises `${VAR}` with no default, so that a missing variable gives a warning (C51).
- "A password in `args` is visible in `ps`": not in the cited docs. The page states it as the tutorial's own observation, without a cite.
- "Pin `npx` packages": not in the cited docs. The page states it as the tutorial's own advice and cites only the trust rule (C53).
- "Three names for one DB server": the clone shows two names plus a README tree line that leaves the DB server out (C46, C48). The page says "different names".
