# Fact-check: CLAUDE.md & Memory (rounds 1-2, 2026-10-10)

Sources fetched 2026-10-10 as `.md` variants: S1 memory, S2 commands, S3 claude-directory, S4 settings-reference, S5 sub-agents. Local `claude --help`: 2.1.294. All `<Cite n>` values (1-5) exist. Each source is cited at least once.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | Intro | Session starts without earlier conversation; CLAUDE.md and auto memory | none (L19) | OPINION-OK | Summary of the section below; the same fact is cited at L25 (S1 "Each Claude Code session begins with a fresh context window"). |
| 2 | Two ways | Two mechanisms: CLAUDE.md (you write), auto memory (Claude writes) | 1 | PASS | S1: "Two mechanisms carry knowledge across sessions: CLAUDE.md files ... Auto memory: notes Claude writes itself". |
| 3 | Two ways table | Auto memory at `~/.claude/projects/<project>/memory/` | 1 | PASS | S1 "Each project gets its own memory directory at `~/.claude/projects/<project>/memory/`". |
| 4 | Two ways table | CLAUDE.md loads "the full file, up to 4 MiB" | 1 | PASS | S1: "Claude Code loads a CLAUDE.md file of up to 4 MiB in full and skips a larger file." (writer concern: combines two statements; each is in S1, so PASS). Note: S1 also says a warning shows when files each under the recommended length add up past a combined limit; the page does not mention it (omission, not an error). |
| 5 | Two ways table | Auto memory loads first 200 lines or first 25KB of MEMORY.md | 1 | PASS | S1: "The first 200 lines of MEMORY.md, or the first 25KB, whichever comes first, are loaded at the start of every conversation." |
| 6 | Two ways table | Project file shared via source control; auto memory machine-local | 1 | PASS | S1 table "Team members via source control"; "Auto memory is machine-local." |
| 7 | Two ways | Context, not enforced configuration; delivered as user message after system prompt; no guarantee of strict compliance | 1 | PASS | S1: "CLAUDE.md content is delivered as a user message after the system prompt ... there's no guarantee of strict compliance". |
| 8 | Callout | A hard rule needs a `PreToolUse` hook | 1 | PASS | S1: "To block an action regardless of what Claude decides, use a PreToolUse hook instead." |
| 9 | Callout | Settings page shows a deny rule for `.env` | none | OPINION-OK | Internal cross-reference. Verified: the Settings page has `deny: Read(./.env)`. |
| 10 | Where files live | Load order broadest to most specific; project after user | 1 | PASS | S1: "lists them in load order, from broadest scope to most specific, so a project instruction appears in context after a user instruction." |
| 11 | Where table | Managed paths: macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`; Linux/WSL `/etc/claude-code/CLAUDE.md`; Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | 1 | PASS | Identical in S1 table. |
| 12 | Where table | Managed file cannot be excluded by individual settings | 1 | PASS | S1: "This file cannot be excluded by individual settings." |
| 13 | Where table | User `~/.claude/CLAUDE.md`; Project `./CLAUDE.md` or `./.claude/CLAUDE.md`; Local `./CLAUDE.local.md`, add to `.gitignore` | 1 | PASS | S1 table, same paths; Local "add to `.gitignore`". |
| 14 | Where files live | Managed content via `claudeMd` key in `managed-settings.json`; no effect in user/project/local | 1 | PASS | S1: "Setting `claudeMd` in user, project, or local settings has no effect." |
| 15 | How files load | Loads CLAUDE.md and CLAUDE.local.md from working dir and every directory above | 1 | PASS | S1 "How CLAUDE.md files load". |
| 16 | How files load | Concatenated, no override; root-to-cwd order; local after CLAUDE.md | 1 | PASS | S1: "concatenated into context rather than overriding each other ... `CLAUDE.local.md` is appended after `CLAUDE.md`". |
| 17 | How files load | Subdirectory files load when Claude reads, writes, or edits a file there | 1 | PASS | S1: "loads each one once Claude reads, writes, or edits another file in that subdirectory". |
| 18 | How files load | `--add-dir` dirs not loaded; set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | 1 | PASS | S1 "Load from additional directories". |
| 19 | How files load | Example: `tests/e2e/CLAUDE.md` loads only for files in `tests/e2e/` | none | EXAMPLE-OK | Labeled "Example"; relies on the on-demand rule in row 17. |
| 20 | Check what loaded | `/context` lists **Memory files**; `InstructionsLoaded` hook logs loads | 1 | PASS | S1 Tip and troubleshoot. |
| 21 | Check what loaded | `/memory` shows CLAUDE.md files, toggles auto memory, opens folder | 1, 2 | PASS | S1 "lists your CLAUDE.md, CLAUDE.local.md, and other memory file locations ... toggle auto memory ... open the auto memory folder"; S2 "Edit CLAUDE.md files, enable or disable auto memory". |
| 22 | /init | "`/init` is a command inside a session, not a CLI flag" | none | UNCITED (R1) -> PASS (R2) | No Cite on this sentence. S2 lists `/init` as a slash command (`/init` | "Initialize project with a CLAUDE.md guide"). Add `<Cite n={2} />`. |
| 23 | /init | Analyzes codebase, writes CLAUDE.md with build/test/conventions; suggests improvements if file exists | 1, 2 | PASS | S1: "If a CLAUDE.md already exists, /init suggests improvements rather than overwriting it." |
| 24 | /init | `CLAUDE_CODE_NEW_INIT=1`: interactive phases, asks artifacts (CLAUDE.md, skills, hooks), subagent exploration, reviewable proposal | 1, 2 | PASS | S1 Tip, same wording. |
| 25 | /init | Reads Cursor `.cursor/rules/`, `.cursorrules`; Copilot `.github/copilot-instructions.md`; with NEW_INIT also `AGENTS.md`, `.devin/rules/`, `.windsurf/rules/`/`.windsurfrules`, `.clinerules` | 1 | PASS | S1 "Migrate instructions from other tools". |
| 26 | Tip callout | Treat generated file as first draft | none | OPINION-OK | Advice. |
| 27 | What to contain | Concrete, verifiable ("Use 2-space indentation", "Run `npm test` before committing"); contradictions picked arbitrarily | 1 | PASS | S1 "Write effective instructions". |
| 28 | What to contain | Add a line when same mistake again / review catch / same correction / new teammate | 1 | PASS | S1 "When to add to CLAUDE.md" (four bullets). |
| 29 | What to contain | Multi-step procedures -> skill; one part of codebase -> path-scoped rule; hard rules -> hook | 1 | PASS | S1: "multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule"; hook per troubleshooting. |
| 30 | What to contain | "Target under 200 lines per CLAUDE.md file. Longer files use more context and reduce adherence." | 1 | PASS | S1: "**Size**: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." This is guidance, not a hard limit (S3: "Longer files still load in full but may reduce adherence"). Page states it as a target. Correct. |
| 31 | Example CLAUDE.md | Payment-service CLAUDE.md with npm scripts, paths, qa-agent/sdet-agent | none | EXAMPLE-OK | Labeled "Example ... belong to this example project"; no tool syntax beyond documented. |
| 32 | Cards | "Run `npm test` before committing" is verifiable; "Write good tests" not | 1 | PASS | S1 gives the first as a good form; vague form follows the same rule. |
| 33 | Cards | Hooks run as shell commands at fixed lifecycle events | 1 | PASS | S1: "Hooks execute as shell commands at fixed lifecycle events". |
| 34 | Imports | `@path/to/import`; loads at launch with the referencing file; relative paths resolve from the containing file; depth 4 hops | 1 | PASS | S1 "Import additional files". |
| 35 | Imports | Example `@README.md` / `@docs/testing-conventions.md` | none | EXAMPLE-OK | Labeled Example; `@path` syntax from S1. |
| 36 | Imports | Imports do not reduce context cost | 1 | PASS | S1: "Imports ... don't reduce its context cost, because imported files also load at launch." |
| 37 | Imports | Code spans/fenced blocks not parsed; backticks keep text literal | 1 | PASS | S1: "Import parsing skips Markdown code spans and fenced code blocks." |
| 38 | Imports | First external import shows approval dialog; decline keeps imports disabled | 1 | PASS | S1 Warning block. |
| 39 | Imports | Block-level HTML comments stripped; code-block comments stay | 1 | PASS | S1 "How CLAUDE.md files load". |
| 40 | Rules | Finds all `.md` files in `.claude/rules/` incl. subfolders | 1 | PASS | S1: "All `.md` files are discovered recursively" (writer concern: paraphrase is accurate). |
| 41 | Rules | Rule without `paths` loads at launch, same priority as `.claude/CLAUDE.md` | 1 | PASS | S1 "Rules without paths frontmatter are loaded at launch with the same priority as .claude/CLAUDE.md." |
| 42 | Rules | `paths` rule loads on Read/Write/Edit of match; `paths` only field; YAML list or comma string | 1 | PASS | S1 "A path-scoped rule loads when Claude uses the Read, Write, or Edit tool on a matching file"; "`paths` is the only field Claude Code reads from a rule". |
| 43 | Rules | Playwright spec rule "adapted from the docs' testing rule" | 3 | PASS | S3 explorer: `paths: "**/*.test.ts"`, "Use descriptive test names", "Clean up side effects in afterEach". Page changes the glob and adds a fixtures line; labeled "adapted". EXAMPLE-OK for the changed lines. |
| 44 | Rules | Globs `**/*.ts`, `src/**/*`, `*.md`; brace expansion `src/**/*.{ts,tsx}` | 1 | PASS | S1 pattern table and brace example. |
| 45 | Rules | User rules in `~/.claude/rules/` load before project rules; neither overrides | 1 | PASS | S1 "User-level rules". |
| 46 | File size callout | Claude Code loads CLAUDE.md up to 4 MiB in full, skips larger | 1 | PASS | S1 L550 and "Claude Code skips a file over 4 MiB". |
| 47 | File size callout | The 200-line figure for CLAUDE.md is guidance | 1 | PASS | S1 "Files over 200 lines consume more context and may reduce adherence." |
| 48 | File size callout | Hard cut-off 200 lines or 25KB applies to MEMORY.md | 1 | PASS | S1: "This limit applies only to `MEMORY.md`." and "everything past the limit is dropped on the next load". Size statements are consistent: CLAUDE.md guidance 200 lines / full load to 4 MiB / MEMORY.md 200 lines or 25KB. |
| 49 | File size | Warning at startup and in `/status` when a file is over recommended length | 1 | PASS | S1: "you see a warning at startup and when you run `/status`." |
| 50 | AGENTS.md | AGENTS.md read only when no CLAUDE.md/CLAUDE.local.md at or above cwd; otherwise CLAUDE.md files only | 1 | PASS | S1 AGENTS.md table. |
| 51 | AGENTS.md | Direct AGENTS.md reading needs v2.1.277 or later | 1 | PASS | S1 Note. |
| 52 | AGENTS.md | `@AGENTS.md` import example; symlink works but Edit/Write refuse symlink writes; unsafe on Windows clones | 1 | PASS | S1 "Share one file with other coding tools". |
| 53 | AGENTS.md | `Project instructions` setting in `/config`, default `claude-md-or-agents-md`; other values | 1 | PASS | S1 table of four values. |
| 54 | AGENTS.md | `/import` args `codex`, `gemini`, `cursor`; copies instruction files, MCP, commands, subagents, skills; v2.1.213+ | 1, 2 | PASS | S2: "/import [codex\|gemini\|cursor] ... Requires Claude Code v2.1.213 or later." |
| 55 | Monorepos | `claudeMdExcludes`: glob patterns on absolute paths; put in `.claude/settings.local.json`; arrays merge across layers; managed CLAUDE.md not excludable | 1 | PASS | S1 "Exclude specific CLAUDE.md files". |
| 56 | Monorepos | Example path `/home/me/monorepo/mobile-app/**` | none | EXAMPLE-OK | Labeled Example; key documented in S1. |
| 57 | Auto memory | On by default in local sessions; Claude writes the notes | 1, 4 | PASS | S1 "Auto memory is on by default in local sessions." S4 `autoMemoryEnabled` Default `true`. |
| 58 | Auto memory | `type`: user, feedback, project, reference | 1 | PASS | S1 four bullets. |
| 59 | Auto memory | Skips derivable and CLAUDE.md content; does not save every session | 1 | PASS | S1 two paragraphs. |
| 60 | Auto memory | `<project>` from git repo; worktrees share; outside git uses project root | 1 | PASS | S1 "Storage location". |
| 61 | Auto memory | "Saved 2 memories" / "Recalled 2 memories" | 1 | PASS | S1 "How it works". |
| 62 | Auto memory | Folder tree (MEMORY.md index, user_role.md, feedback_testing.md) | 1, 3 | PASS | S1 tree. |
| 63 | Auto memory | First 200 lines or 25KB of MEMORY.md load every conversation; topic files on demand | 1, 3 | PASS | S1 "How it works"; S3 tips. |
| 64 | Auto memory | Machine-local; not shared across machines or cloud | 1 | PASS | S1. |
| 65 | Auto memory | `cleanupPeriodDays` (default 30) does not delete memory files | 1, 3 | PASS | S3: "The default is 30 days"; "the sweep doesn't delete the memory files". |
| 66 | Control | Say "remember ..." for auto memory; "add this to CLAUDE.md" for CLAUDE.md | 1 | PASS | S1 "View and edit with /memory". |
| 67 | Control | Turn off: `/memory` toggle writes `autoMemoryEnabled` to `~/.claude/settings.json`; `"autoMemoryEnabled": false` in project settings; `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | 1, 4 | PASS | S1 "Enable or disable auto memory". |
| 68 | Control | **"The `--bare` flag also skips auto memory."** | 1 | WRONG-CITE (R1) -> PASS (R2: now Cite 4) | S1 (memory) does NOT mention `--bare` (grep: 0 hits). Supported by S4: `autoMemoryEnabled` entry: "auto memory stays on unless something that outranks this key turns it off for the session, such as `--bare`, safe mode, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY`". Also true per local `claude --help`: `--bare` ... "auto-memory ... and CLAUDE.md auto-discovery" (and the cli-reference page, which is not in `sources`). Fix: change to `<Cite n={4} />`. |
| 69 | Control | `autoMemoryDirectory` in settings; absolute path or `~/` | 1 | PASS | S1: "The value must be an absolute path or start with `~/`." |
| 70 | Subagent memory | CLAUDE.md files load into subagents: all levels, rules, CLAUDE.local.md, managed, AGENTS.md; Explore and Plan skip them | 5 | PASS | S5 "What loads at startup". |
| 71 | Subagent memory | **"The setting `omitClaudeMd: true` skips the user, project, and local CLAUDE.md files."** | 5 | FAIL (R1) -> PASS (R2) | `omitClaudeMd` is NOT a setting. S5: "set `omitClaudeMd: true` in its frontmatter or `--agents` JSON" (subagent frontmatter field; S4 has no such key; S3 lists it under `agents/*.md` frontmatter). Missing context misleads: the reader on a Configure/settings page will look for it in `settings.json`. Also S5: managed policy files still load; ignored when the agent runs as the main session agent via `--agent`; requires v2.1.271+. Fix: "A subagent whose frontmatter (or `--agents` JSON) sets `omitClaudeMd: true` skips the user, project, and local CLAUDE.md files. Managed policy files still load." |
| 72 | Subagent memory | Main conversation's auto memory not loaded into subagents; own memory only with `memory` field | 5 | PASS | S5: "the main conversation's auto memory isn't loaded." (S1 adds the fork exception; not needed here.) |
| 73 | Subagent memory | Table `user` / `project` / `local` folders | 5 | PASS | S5 scope table, identical paths. |
| 74 | Subagent memory | `project` shareable via version control; recommended default | 5 | PASS | S5: "`project` is the recommended default scope. It makes subagent knowledge shareable via version control." |
| 75 | Subagent memory | With `memory`: memory instructions, first 200 lines/25KB of own MEMORY.md, Read/Write/Edit | 5 | PASS | S5 "When memory is enabled". |
| 76 | Subagent memory | Auto memory off -> `memory` field has no effect | 5 | PASS | S5: "if you turn auto memory off ... the `memory` field has no effect". |
| 77 | Subagent memory | Example: `memory: project` on `.claude/agents/qa-agent.md` -> `.claude/agent-memory/qa-agent/` | none | EXAMPLE-OK | Labeled Example; path pattern from S5 table. |
| 78 | Troubleshooting | `/context` Memory files; contradictions; hook for must-run steps | 1 | PASS | S1 "Claude isn't following my CLAUDE.md". |
| 79 | Troubleshooting | `/doctor prompt-audit` scope, changes nothing until asked, v2.1.283+ | 1, 2 | PASS | S1 "Audit your instruction files"; S2 `/doctor [prompt-audit [path]]` "requires Claude Code v2.1.283 or later". |
| 80 | Tip callout | Project-root CLAUDE.md survives `/compact`; nested files and path rules reload on demand; chat-only instructions lost | 1 | PASS | S1 "Instructions seem lost after /compact". |
| 81 | Metadata | Page description | none | OPINION-OK | Summary. |
| 82 | nav description (lib/nav.ts) | "Teach Claude your stack and conventions once — and keep knowledge across sessions." | none | OPINION-OK | Marketing summary; the factual part (knowledge across sessions) matches S1. Not wrong. |
| 83 | nav tagline (lib/nav.ts) | "write down your conventions once" | none | OPINION-OK | Editorial tagline. |

Writer's flagged points: (1) `--bare`: WRONG-CITE, row 68. (2) 4 MiB table row: PASS, row 4. (3) `omitClaudeMd`: FAIL, row 71. (4) "found recursively": PASS, row 40. Size/limit statements: all consistent with S1 (rows 4, 30, 46-49); no FAIL.


## Round 2 (writer commit b99b46d)

| # | Row (R1) | Round 2 text | Cite | Verdict | Evidence |
|---|---|---|---|---|---|
| 22 | /init is a command, not a CLI flag | "... not a CLI flag. <Cite n={2} />" | 2 | PASS | S2 table: `/init` "Initialize project with a `CLAUDE.md` guide" (a slash command). |
| 68 | `--bare` skips auto memory | now `<Cite n={4} />` | 4 | PASS | S4 `autoMemoryEnabled`: "auto memory stays on unless something that outranks this key turns it off for the session, such as `--bare`". |
| 71 | `omitClaudeMd` | "A subagent whose frontmatter (or `--agents` JSON) sets `omitClaudeMd: true` skips the user, project, and local `CLAUDE.md` files. Managed policy files still load." | 5 | PASS | S5: "set `omitClaudeMd: true` in its frontmatter or `--agents` JSON"; "managed policy files still load, except for managed subagents". Note (not counted): the rare exception for managed subagents is not stated. |
| - | lib/nav.ts | no diff since round 1 | - | OPINION-OK | Unchanged. |

All 5 cite numbers still exist and are used. No other lines changed.
Open FAILs: 0

## Round 4 (final review fixes)

Scope: `git diff 451b292 HEAD -- content/` (commit 8a78933; later commits 6c7651c and 564d1b3 do not touch this page). Sources re-fetched 2026-10-10.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R4-1 | Callout (after /compact) | Title "Instructions in chat can be lost after /compact"; "Instructions that you gave only in the chat can be lost." | 1 | PASS | memory doc: "If an instruction disappeared after compaction, it was given only in conversation, lives in a nested CLAUDE.md that hasn't reloaded yet, or is a path-scoped rule ...". Softer wording is supported. The neighbouring sentences (root CLAUDE.md survives; nested files and path-scoped rules load again on demand) match: "Project-root CLAUDE.md survives compaction ... Nested CLAUDE.md files ... and rules with `paths:` frontmatter load again on demand." |

Cite numbers: unchanged; all 5 exist and are used.

Open FAILs: 0
