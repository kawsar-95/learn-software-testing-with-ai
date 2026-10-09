# Fact-check: Settings & the .claude Folder (rounds 1-2, 2026-10-10)

Sources fetched 2026-10-10 as `.md` variants: S1 settings, S2 claude-directory, S3 settings-reference, S4 managed-settings, S5 memory, S6 output-styles, S7 commands, S8 skills, S9 mcp. Local `claude --help` 2.1.294. All `<Cite n>` values (1-9) exist. Each source is cited at least once.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | Settings files | Settings are JSON keys for model, auto-approval, unreadable files, org enforcement | 1 | PASS | Summary of S1 intro and sections. |
| 2 | Scope table | Four scopes; files `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`, `managed-settings.json` and other managed sources | 1 | PASS | S1 table: same files. |
| 3 | Scope table | User: "You, in all your projects" | 1 | PASS | S1: "You, in every project on this machine". Minor: add "on this machine" (the file is per machine). Not counted. |
| 4 | Scope table | Shared project: "Everyone who clones the repository" | 1 | FAIL (R1) -> PASS (R2) | S1: "Everyone working in the folder that contains it. In a git repository, commit it so teammates get it"; "It reaches your teammate's clone ... only if you commit the file ... until you do ... nobody else has it". The cell states it as always true. Fix: "Everyone working in the folder; teammates get it when you commit it". |
| 5 | Scope table | Project local: "You, in this project only" | 1 | PASS | S1: "You, in this one project only." |
| 6 | Scope table | Managed: "Everyone in the organization" | 1 | FAIL (R1) -> PASS (R2) | S1: "Everyone your organization deploys it to"; "every project on every machine your organization deploys it to". Not automatically everyone. Fix: "Everyone your organization deploys it to". |
| 7 | Settings files | Installing creates no settings file | 1 | PASS | S1: "Installing Claude Code doesn't create any settings file." |
| 8 | Settings files | `~/.claude/settings.json` written on first user option change in `/config` | 1 | PASS | S1 "Find or create your settings files". |
| 9 | Settings files | `.claude/settings.local.json` written on first standing approval | 1 | PASS | Same paragraph. |
| 10 | Settings files | Windows `%USERPROFILE%\.claude`; `CLAUDE_CONFIG_DIR` moves settings, history, plugins | 1 | PASS | S1 Info block. |
| 11 | Settings files | `~/.claude.json` fifth file; holds sign-in, MCP configs, per-project state (trust), global config keys; no need to edit | 1 | PASS | S1 paragraph, same list. |
| 12 | Settings files | "If the file is corrupt, Claude Code puts backups in `~/.claude/backups/` and keeps the five newest." | 1, 2 | FAIL (R1) -> PASS (R2) | Conflates two behaviors. S2 `backups/`: "Earlier versions of `~/.claude.json`, copied when Claude Code rewrites the file. Claude Code keeps the five newest, plus a copy of any version it couldn't parse." S1: it saves `.claude.json.backup.<timestamp>` files "before it writes the file", and copies a broken file to `~/.claude/backups/.claude.json.corrupted.<timestamp>`. Backups are made on every rewrite, not only on corruption. Fix: "Claude Code copies earlier versions of `~/.claude.json` into `~/.claude/backups/` when it rewrites the file, keeps the five newest, and also keeps a copy of any version it could not parse." |
| 13 | Valid JSON | Strict JSON; `//` comment or trailing comma is an error | 1 | PASS | S1: "Settings files are strict JSON: a `//` comment or a trailing comma is a syntax error". |
| 14 | Valid JSON | `$schema` gives autocomplete/validation; URL `https://json.schemastore.org/claude-code-settings.json` | 1 | PASS | S1 L175 and example. |
| 15 | Which wins | Highest level that sets the key wins; order managed > `--settings` > project local > shared project > user | 1 | PASS | S1 "Settings precedence" numbered list. |
| 16 | Which wins | List keys such as `permissions.allow` merge | 1 | PASS | S1 "Lists merge instead of overriding". |
| 17 | Which wins | Single-value key such as `model` uses the most specific value | 2 | PASS | S2: "scalar settings like `model` use the most specific value". (S3: "Every other key takes the value from the highest source that sets it".) |
| 18 | Which wins | Managed highest; nothing in own files or `--settings` overrides a managed key | 1 | PASS | S1 list item 1. |
| 19 | Which wins | Exceptions, e.g. `disableClaudeAiConnectors: true` from any scope | 1 | PASS | S1 exceptions table. |
| 20 | Which wins | Env vars not a level; `ANTHROPIC_MODEL` over `model`; `--model` overrides both | 1, 3 | PASS | S1: "ANTHROPIC_MODEL exported in your shell applies over the model key from any file ... --model overrides both for a session". S3 `model`: "`--model` takes precedence over `ANTHROPIC_MODEL`, and both take precedence over this key". |
| 21 | Which wins | Managed file paths (macOS, Linux/WSL, Windows) | 4 | PASS | S4: `/Library/Application Support/ClaudeCode/managed-settings.json`, `/etc/claude-code/managed-settings.json`, `C:\Program Files\ClaudeCode\managed-settings.json`. |
| 22 | Which wins | Example: team `sonnet`, local `opus` -> `opus` | 1 | EXAMPLE-OK | S1 gives the same pattern with model IDs; aliases `sonnet`, `opus` are documented in S3. |
| 23 | permissions | Rule form `Tool` / `Tool(specifier)`; examples `Bash`, `Bash(npm run *)`, `Read(./.env)`, `WebFetch(domain:example.com)` | 3 | PASS | S3 rule table, same rows. |
| 24 | permissions | deny first, then ask, then allow; first match decides | 3 | PASS | S3: "evaluates `deny` rules first, then `ask`, then `allow`, and the first match decides". |
| 25 | permissions | Example shared settings.json | none | EXAMPLE-OK | Labeled Example; `allow`/`ask`/`deny` and rule forms from S3 and S1. |
| 26 | permissions | Deny blocks `.env` from discovery/search, denies reads, blocks Edit and Write | 3 | PASS | S3 `permissions.deny`. |
| 27 | permissions | `ask` prompts even in a mode that would approve | 3 | PASS | S3 `permissions.ask`. |
| 28 | permissions | Committed `allow` waits for trust dialog; `deny` and `ask` apply at once | 3 | WRONG-CITE (R1) -> PASS (R2) | S3 supports only the first half ("only after you accept the workspace trust dialog"). The second half is in S1: "`deny` and `ask` rules apply right away." Fix: add `<Cite n={1} />`. |
| 29 | Callout | Deny does not cover `grep -r pattern .` or subprocess; use sandbox for OS-level | 3, 1 | PASS | S3: "they don't apply to a command that reads files without naming them, such as `grep -r pattern .`, or to arbitrary subprocesses, so for OS-level enforcement enable the sandbox." |
| 30 | permissions | `defaultMode` values: default, acceptEdits, plan, auto, dontAsk, bypassPermissions, manual (alias of default); `auto`/`bypassPermissions` not from project/local | 3 | PASS | S3 `permissions.defaultMode`. |
| 31 | env | `env` sets variables for every session and subprocesses | 3 | PASS | S3 `env`. |
| 32 | env | Docs example `DISABLE_AUTO_COMPACT: "1"` | 3 | PASS | S3 example (shows it with a second key; page shows one key; fine). |
| 33 | env | Project/local cannot set some variables, e.g. telemetry export | 3 | PASS | S3 "Variables Claude Code ignores in `env`": OpenTelemetry exporter variables. |
| 34 | env | Example `BASE_URL` for staging; keep secrets out of committed files | none | EXAMPLE-OK | Labeled "Example"; `env` object from S3. Advice part is OPINION-OK. |
| 35 | hooks | Object keyed by event; groups with `matcher` and `hooks`; type command/prompt/agent/http/mcp_tool; merge | 3 | PASS | S3 `hooks`. |
| 36 | hooks | Docs show `PostToolUse` in `.claude/settings.json`, matcher `Edit\|Write`, command handler running Prettier | 2 | PASS | S2 settings.json example: `"PostToolUse" ... "matcher": "Edit|Write" ... "npx prettier --write"`. |
| 37 | hooks | Example with `./scripts/format-changed-file.sh` | none | EXAMPLE-OK | Labeled "Example with a script from your own repository"; structure from S3 and S2. |
| 38 | model | Alias or full model ID; unset by default; `--model` beats `ANTHROPIC_MODEL`; both beat key | 3 | PASS | S3 `model`. |
| 39 | model | `"model": "sonnet"` | none | EXAMPLE-OK | S3 documents family aliases `sonnet`/`opus`. |
| 40 | Other keys | `autoMemoryEnabled` default true; `autoMemoryDirectory` | 3, 5 | PASS | S3 `autoMemoryEnabled` "Default: `true`"; S5 storage section. |
| 41 | Other keys | `claudeMdExcludes` skips CLAUDE.md in monorepo | 5 | PASS | S5. |
| 42 | Other keys | `outputStyle` selects an output style | 6 | PASS | S6: "set `outputStyle` in `~/.claude/settings.json`". |
| 43 | Other keys | `cleanupPeriodDays` deletes old transcripts; default 30; min 1; `0` fails validation | 2 | PASS | S2: "The default is 30 days and the minimum is 1; setting `0` fails with a validation error." |
| 44 | Check/change | `/config` opens settings menu; `/config key=value` | 1, 7 | PASS | S7: "`/config [key=value ...]` ... Pass one or more `key=value` pairs". |
| 45 | Check/change | `/status` `Setting sources` line | 1 | PASS | S1 "Confirm what loaded". |
| 46 | Check/change | `claude doctor` lists rejected entries | 1 | PASS | S1: "To list entries Claude Code rejected, run `claude doctor`". Local `claude doctor --help` exists. |
| 47 | Check/change | Watches files; applies most edits incl. `permissions`, `hooks` without restart | 1 | PASS | S1 "When edits take effect". |
| 48 | Check/change | `--settings` takes JSON string or file path; above user/project/local, below managed | 1 | PASS | S1: "pass a key as JSON, inline or as a path to a file. Claude Code applies it above your user, project, and local files and below managed settings." Local `--help`: `--settings <file-or-json>`. |
| 49 | Check/change | `claude --settings '{"model": "opus"}'` | none | EXAMPLE-OK | Mirrors S1 example (with alias). |
| 50 | Check/change | **`--setting-sources` takes comma-separated `user`, `project`, `local`** | 5 | WRONG-CITE (R1) -> PASS (R2: sentence removed) | S5 (memory) only mentions the flag in passing ("skipped if you exclude `local` from `--setting-sources`"); it does not state the format. The format is in local `--help` ("Comma-separated list of setting sources to load (user, project, local)") and the cli-reference page, which is not in `sources`. Fix: add `https://code.claude.com/docs/en/cli-reference` as a source and cite it. |
| 51 | Check/change | CI example `claude -p "..." --setting-sources project` | none | EXAMPLE-OK | Labeled "Example"; `-p` and `--setting-sources` are in `claude --help`. |
| 52 | .claude folder | Project tree: `CLAUDE.md`, `.mcp.json`, `.claude/{settings.json, settings.local.json, rules/, skills/, commands/, output-styles/, agents/, workflows/, agent-memory/}` | 2 | PASS | S2 file reference table lists each (`workflows/*.js`, `agent-memory/<name>/`, etc.). |
| 53 | .claude folder | Tree comment "`commands/` ← legacy, use skills/" | 2 | WRONG-CITE (R1) -> PASS (R2) | S2 says only "Single-file prompts; same mechanism as skills". "Legacy / use skills" is in S8: "`.claude/commands/` is the older format and still works ... Prefer a skill for new work". Fix: add `<Cite n={8} />`. |
| 54 | .claude folder | Tree comments `settings.json ← committed`, `settings.local.json ← gitignored` | 2 | PASS | S2: badges "committed" / "gitignored" (gitignored "when Claude Code saves a setting to it"; the page explains this at the end). |
| 55 | .claude folder | Project root can hold `.worktreeinclude` | 2 | PASS | S2 table "`.worktreeinclude` | Project only". |
| 56 | .claude folder | User `~/.claude/` holds CLAUDE.md, settings.json, keybindings.json, themes/, projects/<project>/memory/, rules/, skills/, commands/, output-styles/, agents/, agent-memory/ | 2 | PASS | S2 explorer "Global" section and table (global `workflows/` also exists; page list is not claimed complete). |
| 57 | Path table | Skill = folder with `SKILL.md`; user skills `~/.claude/skills/` | 2, 8 | PASS | S8 location table. |
| 58 | Path table | Commands merged into skills; existing files work; new work use skills | 8, 2 | PASS | S8: "Custom commands have been merged into skills ... Your existing `.claude/commands/` files keep working." |
| 59 | Path table | `agents/*.md`; user `~/.claude/agents/` | 2 | PASS | S2 table. |
| 60 | Path table | `rules/*.md` with `paths:` frontmatter | 2 | PASS | S2 table. |
| 61 | Path table | Output styles; user `~/.claude/output-styles` | 6, 2 | PASS | S6: "User: `~/.claude/output-styles`", "Project: `.claude/output-styles`". |
| 62 | Path table | Auto memory at `~/.claude/projects/<project>/memory/`, not `~/.claude/memory/` | 5, 2 | PASS | S5/S2 give the real path. |
| 63 | Skill vs command | `/deploy` from either file; skill wins on same name | 8 | PASS | S8: table row "A skill and a file in `.claude/commands/` | The skill". |
| 64 | Which file | Choose-the-file rows | 2 | PASS | S2 "Choose the right file" table (same rows). |
| 65 | Callout | Quote "Unlike CLAUDE.md, which Claude reads as guidance, these are enforced whether Claude follows them or not." | 2 | PASS | S2 explorer description for settings.json, verbatim. |
| 66 | MCP | Three scopes; Local (default) `~/.claude.json`, Project `.mcp.json`, User `~/.claude.json`; who gets it | 9 | PASS | S9 "MCP installation scopes" table. |
| 67 | MCP | `.mcp.json` at project root, not in `.claude/`; commit to share | 9, 2 | PASS | S2: "Lives at the project root, not inside `.claude/`". |
| 68 | MCP | `claude mcp add --transport http shared-server --scope project https://example.com/mcp` writes `.mcp.json` | 9 | PASS | S9 "Project scope" identical command. |
| 69 | MCP | Approval prompt before using project-scoped server in interactive sessions | 9 | PASS | S9: "prompts for approval in interactive sessions before using project-scoped servers". |
| 70 | MCP | `${NOTION_TOKEN}`-style references; example `${JIRA_TOKEN}`, `${DB_URL}` | 2, 9 | PASS / EXAMPLE-OK | S9 "`${VAR}` expands to the value of environment variable `VAR`"; S2 uses `${NOTION_TOKEN}`. The Jira/DB names are the example's own. |
| 71 | What to commit | Commit `.claude/settings.json` for permissions/hooks/plugins; teammates override in local | 1 | PASS | S1 "Share settings with your team". |
| 72 | What to commit | Commit/keep-local table (CLAUDE.md, settings.json, rules, skills/agents, .mcp.json, agent-memory; local: settings.local.json, CLAUDE.local.md, ~/.claude.json, agent-memory-local) | 2, 5 | PASS | S2 `committed` badges; S2 agent-memory: "`memory: local` ... `.claude/agent-memory-local/`" for out of version control; S5 `CLAUDE.local.md` "add to `.gitignore`". |
| 73 | What to commit | First write adds `**/.claude/settings.local.json` to global git excludes; hand-made file needs `.gitignore` | 1, 2 | PASS | S1 and S2 text. |
| 74 | What to commit | Some keys never apply from repo file; `permissions.allow`, `additionalDirectories`, `extraKnownMarketplaces`, most `env` wait for trust | 1 | PASS | S1 "A committed key doesn't reach teammates". |
| 75 | What to commit | "In a git repository, if you start in a subdirectory, it reads and writes `.claude/settings.local.json` at the repository root (v2.1.211 or later)"; shared file from primary working directory | 1 | FAIL (R1) -> PASS (R2) | Overgeneral. S1: the file "stays with `.claude/settings.json` instead: outside a git repository, when the repository root is your home directory, on Windows, or when the repository root or its `.git` or `.claude` entry isn't owned by your user." The page names no exception, and the page itself shows Windows paths. v2.1.211 and the primary-working-directory part PASS. Fix: add "On Windows, and in a few other cases, the file stays with `.claude/settings.json`." |
| 76 | What to commit | "In cloud sessions, Claude Code reads only the committed `.claude/settings.json`. It does not read user or local settings files." | 1 | FAIL (R1) -> PASS (R2) | "only" is wrong. S1 "Settings in cloud sessions": server-managed settings also reach a cloud session; with several repositories only `enabledPlugins` and `extraKnownMarketplaces` are read from each `.claude/settings.json`. User/local not read: PASS. Fix: "Among the settings files, a cloud session reads the committed `.claude/settings.json` (not user or local files); server-managed settings also reach it." |
| 77 | Example tree | Payment-service tree | none | EXAMPLE-OK | Labeled Example; layout from S2. |
| 78 | Intro | Page intro | none | OPINION-OK | Framing. |
| 79 | nav description (lib/nav.ts) | "Inside `.claude/` and `settings.json` — what each file does and where it lives." | none | OPINION-OK | Matches S2 purpose ("Where Claude Code reads CLAUDE.md, settings.json, hooks, skills ..."); no checkable error. |
| 80 | nav tagline (lib/nav.ts) | "know what each file in .claude does" | none | OPINION-OK | Editorial tagline. |

Writer's flagged points: (1) Scope table "Who it affects": rows 3-6; two cells overstate (rows 4, 6). (2) `--setting-sources` cite: WRONG-CITE, row 50. (3) "single-value key uses most specific value" S2: PASS, row 17. (4) `/config key=value` and `claude doctor`: PASS, rows 44, 46.


## Round 2 (writer commit b99b46d)

| # | Row (R1) | Round 2 text | Cite | Verdict | Evidence |
|---|---|---|---|---|---|
| 4 | Scope table, Shared project | "Everyone working in the folder. Teammates get it when you commit it." | 1 | PASS | S1: "Everyone working in the folder that contains it. In a git repository, commit it so teammates get it". |
| 6 | Scope table, Managed | "Everyone your organization deploys it to" | 1 | PASS | S1: "Everyone your organization deploys it to". |
| 12 | `~/.claude.json` backups | "When Claude Code rewrites `~/.claude.json`, it copies earlier versions into `~/.claude/backups/`. It keeps the five newest, and also a copy of any version that it could not parse." | 2 | PASS | S2 `backups/`: "Earlier versions of `~/.claude.json`, copied when Claude Code rewrites the file. Claude Code keeps the five newest, plus a copy of any version it couldn't parse." |
| 28 | deny/ask apply at once | now `<Cite n={3} /> <Cite n={1} />` | 3, 1 | PASS | S1: "`deny` and `ask` rules apply right away." |
| 50 | `--setting-sources` | sentence and CI example removed (grep: 0 hits in settings.mdx) | - | PASS | Nothing left to check. Rows 50-51 are void. S5 is still cited 5 times. |
| 53 | commands/ legacy | "The `commands/` folder is the older format: it still works, but prefer a skill for new work. <Cite n={2} /> <Cite n={8} />" | 2, 8 | PASS | S8: "a Markdown file in `.claude/commands/` is the older format and still works ... Prefer a skill for new work". |
| 75 | settings.local.json at repo root | adds "On Windows, outside a git repository, and in a few other cases, the local file stays next to `.claude/settings.json`." | 1 | PASS | S1: "stays with `.claude/settings.json` instead: outside a git repository, when the repository root is your home directory, on Windows, or when ... isn't owned by your user." |
| 76 | Cloud sessions | "Of the settings files, a cloud session reads the committed `.claude/settings.json`. It does not read user or local settings files. Server-managed settings also reach a cloud session." | 1 | PASS | S1: shared project read; "User and project local settings ... not read"; "Your organization's server-managed settings do". Note (not counted): S1 says a multi-repository Anthropic-hosted session reads only `enabledPlugins` and `extraKnownMarketplaces` from each repository's file. |
| - | lib/nav.ts | no diff since round 1 | - | OPINION-OK | Unchanged. |

All 9 cite numbers still exist and are used. No other lines changed.
Open FAILs: 0

## Round 4 (final review fixes)

Scope: `git diff 451b292 HEAD -- content/` (commit 8a78933; later commits 6c7651c and 564d1b3 do not touch this page). Sources re-fetched 2026-10-10.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R4-1 | Settings: .mcp.json | Example: `${QA_DB_DSN}` for the test database server; each tester sets the real value in the shell | 2, 9 | PASS | MCP doc, "Environment variable expansion in `.mcp.json`" documents `${VAR}` references. Example variable name is the page's own. |
| R4-2 | Settings: .mcp.json | Atlassian server for Jira is remote and signs in with OAuth: run `/mcp` and follow the steps in your browser, so the file holds no Jira token | 9 | EXAMPLE-OK | MCP doc: "Claude Code supports OAuth 2.0 for secure connections." and "use the command `/mcp` ... Then follow the steps in your browser to log in." Note: the Atlassian-specific OAuth fact is not in source 9. It is in the Atlassian README (cited on the MCP page, source 7: "Authentication uses OAuth 2.1 or API tokens"). The sentence is part of a labeled example, so I do not count it. Optional: cite the Atlassian README on this page. |
| R4-3 | Settings: example tree | Comment: `.mcp.json` Jira (OAuth) and test database (${QA_DB_DSN}) servers | (follows R4-1, R4-2) | EXAMPLE-OK | Example tree comment, consistent with the paragraph above. No leftover `${JIRA_TOKEN}` or `${DB_URL}` anywhere in `content/` (grep). |
| R4-4 | Settings: `.claude/` tree | `workflows/` holds dynamic workflow scripts that orchestrate many subagents | 2 | PASS | claude-directory: `workflows/` entry, "Dynamic workflow scripts that orchestrate many subagents". |
| R4-5 | Settings: `.claude/` tree | `agent-memory/` holds subagent persistent memory, separate from the auto memory of your main session | 2 | PASS | claude-directory: `agent-memory/` entry, "Subagent persistent memory, separate from your main session auto memory". |
| R4-6 | Sources | Title of source 8 changed "Skills" -> "Extend Claude with skills"; URL unchanged | 8 | PASS | Fetched H1: "Extend Claude with skills". URL list unchanged (script check). |

Cite numbers: all 9 exist and are used. No other lines changed.

Open FAILs: 0
