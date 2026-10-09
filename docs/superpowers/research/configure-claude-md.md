# CLAUDE.md & Memory — research notes (2026-10-10)

## Sources
S1. How Claude remembers your project (Memory) — Anthropic, Claude Code docs — https://code.claude.com/docs/en/memory — accessed 2026-10-10
S2. Create custom subagents (sub-agents) — Anthropic, Claude Code docs — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S3. Explore the .claude directory — Anthropic, Claude Code docs — https://code.claude.com/docs/en/claude-directory — accessed 2026-10-10
S4. Commands — Anthropic, Claude Code docs — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S5. Settings reference — Anthropic, Claude Code docs — https://code.claude.com/docs/en/settings-reference — accessed 2026-10-10
S6. Deploy managed settings — Anthropic, Claude Code docs — https://code.claude.com/docs/en/managed-settings — accessed 2026-10-10

Local CLI evidence (supporting, not a cited source): `claude --version` = 2.1.294 (Claude Code). `claude --help` line: "--bare  Minimal mode: skip hooks ..., attribution, auto-memory, background prefetches, keychain reads, and CLAUDE.md auto-discovery." `claude --help` has no `/init` or `/memory` entry (they are in-session slash commands, not CLI flags). `claude --help` line: "--setting-sources <sources>  Comma-separated list of setting sources to load (user, project, local)."

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote | Source | Notes |
|---|---|---|---|---|
| C1 | Each session starts with a fresh context window. Two mechanisms carry knowledge across sessions: CLAUDE.md files (you write) and auto memory (Claude writes). | "Each Claude Code session begins with a fresh context window. Two mechanisms carry knowledge across sessions" | S1 | Fixes audit High: "Claude has no memory between sessions". |
| C2 | Claude treats both as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook. | "Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead." | S1 | |
| C3 | CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt. There is no guarantee of strict compliance. | "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself." | S1 | |
| C4 | Managed policy CLAUDE.md paths: macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`; Linux and WSL `/etc/claude-code/CLAUDE.md`; Windows `C:\Program Files\ClaudeCode\CLAUDE.md`. | exact paths | S1 | Same system directories as `managed-settings.json` (S6). |
| C5 | A managed CLAUDE.md cannot be excluded by individual settings. | "This file cannot be excluded by individual settings." / "Managed policy CLAUDE.md files cannot be excluded." | S1 | |
| C6 | The `claudeMd` key in `managed-settings.json` puts managed CLAUDE.md content inside the settings file. It has no effect in user, project, or local settings. | "Setting `claudeMd` in user, project, or local settings has no effect." | S1 | Niche; admin topic. |
| C7 | User CLAUDE.md is `~/.claude/CLAUDE.md` (personal preferences for all projects). | "`~/.claude/CLAUDE.md`" | S1 | Fixes audit Med: Windows-only path. Windows home path is covered in configure-settings.md. |
| C8 | Project CLAUDE.md can be `./CLAUDE.md` or `./.claude/CLAUDE.md`. Team shares it through source control. | "`./CLAUDE.md` or `./.claude/CLAUDE.md`" | S1 | |
| C9 | Local instructions file is `./CLAUDE.local.md`. It holds personal project-specific preferences. Add it to `.gitignore`. | "`./CLAUDE.local.md` ... personal project-specific preferences; add to `.gitignore`" | S1 | |
| C10 | The scope table lists locations in load order, broadest to most specific, so a project instruction appears in context after a user instruction. | "listed in load order, from broadest scope to most specific, so a project instruction appears in context after a user instruction" | S1 | Order: managed, user, project, local. |
| C11 | Claude Code loads CLAUDE.md and CLAUDE.local.md from the working directory and every directory above it. Files are concatenated, not overridden. Order is from filesystem root down to the working directory. Within a directory, CLAUDE.local.md is appended after CLAUDE.md. | "All discovered files are concatenated into context rather than overriding each other." / "`CLAUDE.local.md` is appended after `CLAUDE.md`" | S1 | |
| C12 | CLAUDE.md files in subdirectories below the working directory load on demand, when Claude reads, writes, or edits a file in that subdirectory. | "Instead of loading them at launch, Claude Code loads each one once Claude reads, writes, or edits another file in that subdirectory." | S1 | QA use: a `tests/CLAUDE.md` loads only when Claude touches test files. |
| C13 | `@path/to/import` imports a file. Imported files load at launch with the CLAUDE.md that references them. Relative paths resolve from the file that contains the import. Max depth is four hops. | "Imported files can recursively import other files, with a maximum depth of four hops." | S1 | |
| C14 | Imports do not reduce context cost, because imported files also load at launch. | "Imports help you organize a long file but don't reduce its context cost, because imported files also load at launch." | S1 | |
| C15 | Import parsing skips code spans and fenced code blocks. Wrap a path in backticks to mention it without importing it. | "writing `@README` keeps the text literal, while `@README` outside backticks imports the file" | S1 | Example uses backticked `@README`. |
| C16 | The first time a project has external imports (path outside the working directory), Claude Code shows an approval dialog. If you decline, imports stay disabled. | "it shows an approval dialog listing the files. If you decline, the imports stay disabled" | S1 | Does not apply to user-scope files such as `~/.claude/CLAUDE.md`. |
| C17 | Block-level HTML comments in CLAUDE.md are stripped before injection into context. Comments inside code blocks stay. | "Block-level HTML comments (`<!-- maintainer notes -->`) in CLAUDE.md files are stripped before the content is injected" | S1 | |
| C18 | `.claude/rules/` holds topic markdown files. All `.md` files are found recursively. Rules without `paths` frontmatter load at launch with the same priority as `.claude/CLAUDE.md`. | "Rules without `paths` frontmatter are loaded at launch with the same priority as `.claude/CLAUDE.md`." | S1 | |
| C19 | A rule with `paths` frontmatter loads when Claude uses Read, Write, or Edit on a matching file (also a single-file `cat`/`head` read in Bash). | "A path-scoped rule loads when Claude uses the Read, Write, or Edit tool on a matching file." | S1 | |
| C20 | `paths` is the only frontmatter field Claude Code reads from a rule. It takes a YAML list or a comma-separated string. | "`paths` is the only field Claude Code reads from a rule; any other field is ignored without an error." | S1 | |
| C21 | Example path-scoped rule for tests: `paths:` list with `"**/*.test.ts"` and `"**/*.test.tsx"`, then rules such as "Use descriptive test names", "Clean up side effects in afterEach". | S3 example `rule-testing` (testing.md) | S3 | Page can adapt to Playwright: `tests/**/*.spec.ts`. |
| C22 | Glob patterns: `**/*.ts`, `src/**/*`, `*.md`, `src/components/*.tsx`; brace expansion such as `src/**/*.{ts,tsx}` works. | pattern table | S1 | |
| C23 | User-level rules live in `~/.claude/rules/` and load before project rules. If a user rule and a project rule conflict, Claude may follow either. | "Neither set overrides the other" | S1 | |
| C24 | Target under 200 lines per CLAUDE.md. Longer files use more context and reduce adherence. | "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." | S1 | Fixes audit Med "under 200 lines". |
| C25 | Claude Code loads a CLAUDE.md up to 4 MiB in full and skips a larger file. | "Claude Code loads a CLAUDE.md file of up to 4 MiB in full and skips a larger file." | S1 | The 200-line figure is guidance, not a hard cut-off for CLAUDE.md (hard 200-line/25KB cut applies only to MEMORY.md, C34). |
| C26 | Claude Code warns at startup and in `/status` when an instruction file is over the recommended length. | "you see a warning at startup and when you run `/status`" | S1 | |
| C27 | Write concrete, verifiable instructions: "Use 2-space indentation", "Run `npm test` before committing". Contradicting instructions: Claude may pick one arbitrarily. | quotes | S1 | |
| C28 | Add to CLAUDE.md when Claude repeats a mistake, a code review catches something Claude should know, you retype the same correction, or a new teammate needs the same context. | list in "When to add to CLAUDE.md" | S1 | |
| C29 | Multi-step procedures and rules for one part of the codebase belong in a skill or a path-scoped rule, not in CLAUDE.md. | "If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule" | S1 | Links to Skills page. |
| C30 | `/init` generates a starting CLAUDE.md. Claude analyzes the codebase and writes build commands, test instructions, and conventions. If a CLAUDE.md exists, `/init` suggests improvements instead of overwriting. | "If a CLAUDE.md already exists, `/init` suggests improvements rather than overwriting it." | S1, S4 | Run inside a session: `claude`, then `/init`. Old page `claude /init` is wrong (audit Low). `/init` in S4: "Initialize project with a `CLAUDE.md` guide." |
| C31 | With `CLAUDE_CODE_NEW_INIT=1`, `/init` runs an interactive multi-phase flow. It asks which artifacts to set up (CLAUDE.md files, skills, hooks), explores with a subagent, and shows a reviewable proposal before writing files. | exact text | S1, S4 | Env var may be set in shell or in the `env` block of a settings file. |
| C32 | `/init` also reads Cursor rules (`.cursor/rules/`, `.cursorrules`) and Copilot rules (`.github/copilot-instructions.md`). With `CLAUDE_CODE_NEW_INIT=1` it also reads `AGENTS.md`, `.devin/rules/`, `.windsurf/rules/` or `.windsurfrules`, and `.clinerules`. | list | S1 | |
| C33 | AGENTS.md: if the repo has an AGENTS.md and no CLAUDE.md or CLAUDE.local.md in the working directory or above, Claude reads AGENTS.md. If a CLAUDE.md or CLAUDE.local.md exists, Claude reads only the CLAUDE.md files. Reading AGENTS.md directly needs v2.1.277 or later. | table rows 1-2; "Reading `AGENTS.md` directly requires Claude Code v2.1.277 or later." | S1 | Installed CLI is 2.1.294, so it applies. |
| C34 | To share one file with other tools, put `@AGENTS.md` at the top of a CLAUDE.md, then Claude-specific text below. A symlink `ln -s AGENTS.md CLAUDE.md` also works, but Edit/Write refuse to write through a symlink, and it is not safe on Windows clones. | code sample `@AGENTS.md` / "## Claude Code" | S1 | |
| C35 | The **Project instructions** setting (in `/config`) has values `claude-md-or-agents-md` (default), `claude-md-and-agents-md`, `claude-md`, `managed-only`. | value table | S1 | Page may show only the default and `claude-md-and-agents-md`. |
| C36 | `claudeMdExcludes` (glob list of absolute paths) skips CLAUDE.md files in monorepos. Put it in `.claude/settings.local.json` to keep it local. Arrays merge across layers. | JSON example | S1 | Managed CLAUDE.md cannot be excluded. |
| C37 | CLAUDE.md from `--add-dir` directories is not loaded by default. Set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` to load it. | exact | S1 | Shared test-config repo use case. |
| C38 | `/context` lists loaded files under **Memory files**. `/memory` lists CLAUDE.md, CLAUDE.local.md and other memory locations, toggles auto memory, and opens the auto memory folder. | "To confirm the file loaded, run `/context` ... check the list under **Memory files**." | S1, S4 | S4: "/memory — Edit `CLAUDE.md` files, enable or disable auto memory, and view auto memory entries". |
| C39 | `/doctor prompt-audit` checks CLAUDE.md, CLAUDE.local.md, AGENTS.md, rules, skills, etc. for outdated or conflicting content. It changes nothing until you ask. Needs v2.1.283 or later. | exact | S1, S4 | |
| C40 | Project-root CLAUDE.md survives `/compact`: Claude re-reads it from disk. Nested CLAUDE.md files and path-scoped rules reload on demand. Instructions given only in chat are lost. | "Project-root CLAUDE.md survives compaction" | S1 | |
| C41 | Auto memory is on by default in local sessions. Notes are written by Claude. | "Auto memory is on by default in local sessions." | S1, S5 | S5 `autoMemoryEnabled` Default: `true`. |
| C42 | Auto memory note types (frontmatter `type`): `user`, `feedback`, `project`, `reference`. Claude skips what it can derive from code or what CLAUDE.md already says, and does not save every session. | exact | S1 | |
| C43 | Auto memory directory: `~/.claude/projects/<project>/memory/`. `<project>` comes from the git repo, so all worktrees and subdirectories of one repo share it. Outside a git repo, the project root is used. | exact | S1 | Fixes audit High: old path `~/.claude/memory/MEMORY.md` or `.claude/memory/MEMORY.md` is wrong. |
| C44 | Layout: `MEMORY.md` (index, one line per memory) plus one topic file per memory, e.g. `user_role.md`, `feedback_testing.md`. | tree in S1 | S1, S3 | |
| C45 | The first 200 lines of MEMORY.md, or the first 25KB, whichever comes first, load at the start of every conversation. | exact | S1, S3 | Fixes audit High/Low ("under 1,000 tokens" invented). |
| C46 | Topic files are not loaded at startup. Claude reads them on demand with file tools. | "Claude Code doesn't load topic files such as `user_role.md` or `feedback_testing.md` at startup." | S1 | |
| C47 | Auto memory is machine-local. Files are not shared across machines or cloud environments. | "Auto memory is machine-local." | S1 | |
| C48 | The retention sweep (`cleanupPeriodDays`, default 30) does not delete memory files. | "excludes the memory files in the memory directory from that retention sweep" | S1, S3 | |
| C49 | Turn auto memory off: `/memory` toggle (writes `autoMemoryEnabled` to `~/.claude/settings.json`), `"autoMemoryEnabled": false` in project settings, or env `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. `--bare` also skips auto-memory. | exact | S1, S5 | `--bare` from local `claude --help`. |
| C50 | `autoMemoryDirectory` in settings moves the storage. Value must be an absolute path or start with `~/`. | exact | S1 | |
| C51 | To save a fact to auto memory say "remember that the API tests require a local Redis instance". To put it in CLAUDE.md say "add this to CLAUDE.md". | quotes | S1 | |
| C52 | Messages "Saved N memories" / "Recalled N memories" appear when Claude writes or reads auto memory. | "Saved 2 memories" / "Recalled 2 memories" | S1 | |
| C53 | CLAUDE.md files load into subagents too (all levels, including `~/.claude/CLAUDE.md`, rules, CLAUDE.local.md, managed files, AGENTS.md). Built-in Explore and Plan skip it. `omitClaudeMd: true` skips user/project/local CLAUDE.md. | exact | S2 | |
| C54 | The main conversation's auto memory is not loaded into subagents. A subagent gets its own memory only with the `memory` field. | "the main conversation's auto memory isn't loaded." | S2, S1 | Fixes audit Med: "Agents load memory automatically". |
| C55 | Subagent `memory` field values: `user` = `~/.claude/agent-memory/<name-of-agent>/`; `project` = `.claude/agent-memory/<name-of-agent>/`; `local` = `.claude/agent-memory-local/<name-of-agent>/`. | scope table | S2, S3 | |
| C56 | `project` is the recommended default scope for subagent memory (shareable via version control). | "`project` is the recommended default scope." | S2 | QA angle: `qa-agent` with `memory: project` keeps recurring-bug notes in the repo. |
| C57 | When subagent memory is on: system prompt gets read/write instructions, the first 200 lines or 25KB of the subagent's `MEMORY.md`, and Read/Write/Edit tools are enabled. If auto memory is off, `memory` has no effect. | bullets | S2 | |
| C58 | Hooks cannot be replaced by memory. For must-run steps (before every commit) use a hook. | "write it as a hook instead. Hooks execute as shell commands at fixed lifecycle events" | S1 | Fixes audit Med (old "Hooks cannot update memory / Method 1 MANDATORY" section: remove). |
| C59 | `InstructionsLoaded` hook can log which CLAUDE.md and rules files load and why. | "Use the `InstructionsLoaded` hook" | S1 | |
| C60 | `/import [codex|gemini|cursor]` copies another tool's config (instruction files, MCP servers, commands, subagents, skills). Needs v2.1.213 or later. | exact | S1, S4 | Optional. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| claude-md.mdx › What is CLAUDE.md? | rewrite | Keep "onboarding doc" idea; add that it is context, not enforcement (C2, C3) |
| claude-md.mdx › Where to place it | rewrite | Windows-only path wrong; add all four scopes (C4, C7-C9) |
| claude-md.mdx › Why it matters | rewrite/trim | Drop "enforces consistent behavior"; Claude may not follow (C2) |
| claude-md.mdx › Generate it with /init | rewrite | `claude /init` wrong; run `/init` in a session; does not overwrite (C30, C31) |
| claude-md.mdx › Example CLAUDE.md for a QA Project | rewrite | Keep QA example; replace "Agent Routing" slash-command lines with subagent names; "Do not modify .env" belongs in `permissions.deny` (C2); shorten |
| claude-md.mdx › CardGrid (Tech Stack / Agent Routing / Constraints) | rewrite | Constraints are not enforced; point to permissions/hooks |
| memory.mdx › intro "no memory between sessions" | drop | False (C1, C41) |
| memory.mdx › Without/With Memory cards | drop | Rewrite as CLAUDE.md vs auto memory table (C1, C41) |
| memory.mdx › How Memory Works (`.claude/memory/MEMORY.md`) | rewrite | Wrong path (C43) |
| memory.mdx › Example MEMORY.md | rewrite | Show a realistic auto-memory index and topic file; frame as Claude-written (C42, C44) |
| memory.mdx › Memory vs CLAUDE.md table | rewrite | Row "When loaded: when referenced" is wrong; both load at session start (C45) |
| memory.mdx › Memory & Token Cost (under 1,000 tokens) | drop | Invented figure; use 200 lines / 25KB (C45) |
| memory.mdx › How to Use Memory with Agents (`Read ~/.claude/memory/MEMORY.md`) | drop | Wrong path, loads automatically; replace with `memory:` field (C54-C57) |
| memory.mdx › Keeping Memory Updated, Methods 1-3 | drop | Method 1 replaced by `memory:` field; Method 2 `/save-memory` command is custom and path wrong; Method 3 becomes "ask Claude to remember" (C51) |
| memory.mdx › Why Hooks Cannot Update Memory | drop | Misleading (C58) |

## Page outline
- ## Two ways Claude remembers — fresh context each session; CLAUDE.md (you write) vs auto memory (Claude writes); context not enforcement; table (C1, C2, C3)
- ## Where CLAUDE.md files live — table of 4 scopes with managed paths per OS, `~/.claude/CLAUDE.md`, `./CLAUDE.md` or `./.claude/CLAUDE.md`, `./CLAUDE.local.md` (C4-C10)
  - ### How files load — walk up directories, concatenation, root-to-cwd order, local after project, subdirectory on demand, `--add-dir` (C11, C12, C37)
  - ### Check what loaded — `/context` Memory files, `/memory`, `InstructionsLoaded` hook (C38, C59)
- ## Generate a first file with /init — run in session, no overwrite, `CLAUDE_CODE_NEW_INIT=1`, refine (C30, C31, C32)
- ## What a test project's CLAUDE.md should contain — QA angle: run commands (`npx playwright test`, single-test command, lint), test layout, locator and fixture conventions, test data and env rules, definition of "done" (tests pass), flaky-test policy, pointers to Jira/DB MCP usage; what to leave out (derivable facts, procedures, secrets); example file under 200 lines; concrete-and-verifiable wording (C24, C27, C28, C29)
  - Do/Don't cards: concrete vs vague; hard rules in `permissions.deny` or hooks, not CLAUDE.md (C2, C58)
- ## Keep it small: imports, rules, AGENTS.md — `@path` imports (C13-C16); `.claude/rules/` and path-scoped rule example for `tests/**` (C18-C22); user rules (C23); size guidance 200 lines, 4 MiB (C24-C26); comments (C17); AGENTS.md table and `@AGENTS.md` bridge (C33-C35); monorepo `claudeMdExcludes` (C36)
- ## Auto memory — on by default, 4 note types, storage path, MEMORY.md index + topic files, 200 lines / 25KB, machine-local, not swept (C41-C48)
  - ### Control it — `/memory`, `autoMemoryEnabled`, env var, `autoMemoryDirectory`, "remember that ..." vs "add this to CLAUDE.md" (C49-C52)
- ## Subagent memory — `memory:` field, three scopes and paths, recommend `project`, what loads, main auto memory not inherited, CLAUDE.md does load; QA example `qa-agent` remembering recurring defect patterns (C53-C57)
- ## When Claude ignores your instructions — `/context` check, specificity, conflicts, hooks for must-run, `/compact` behavior, `/doctor prompt-audit` (C39, C40, C58)

## Open questions
- None blocking. Item to word carefully: the 200-line guidance for CLAUDE.md is a target, while 200 lines / 25KB is a hard load cut-off only for MEMORY.md (C25 vs C45).
- The docs do not give a token estimate for CLAUDE.md. Do not state one.
- `CLAUDE.local.md` is documented but `/init` only creates it with `CLAUDE_CODE_NEW_INIT=1` (personal option). Do not say default `/init` creates it.
