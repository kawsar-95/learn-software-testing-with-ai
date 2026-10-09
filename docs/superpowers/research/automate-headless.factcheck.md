# Fact-check: Headless & CI (round 1, 2026-10-10)

Sources fetched by the checker: S1 code.claude.com/docs/en/headless.md, S2 cli-reference.md, S3 permission-modes.md, S4 gitlab-ci-cd.md, S5 authentication.md (all `.md` variants, 2026-10-10). Also read permissions.md (not a listed source). Local `claude --help` = 2.1.294. Cite check: n=1..5 all exist, all 5 sources cited, first-cite order 1..5.

`--help` coverage: present in `--help`: -p/--print, --bare, --output-format, --json-schema, --max-budget-usd, --permission-mode (lists `manual`, not `default`), --permission-prompts, --dangerously-skip-permissions, --allowedTools/--allowed-tools, --disallowedTools/--disallowed-tools, --tools, -c/--continue, -r/--resume, --fork-session, --no-session-persistence, --append-system-prompt, --system-prompt, --include-partial-messages, --verbose, --settings, --mcp-config, --agents, --plugin-dir, --plugin-url, --bg, `claude auth status --text`. NOT in `--help` (docs list them; not a FAIL): `--max-turns`, `--append-system-prompt-file`. CLI reference line 58: "`claude --help` does not list every flag, so a flag's absence from `--help` does not mean it is unavailable." (supports the callout).

| # | Location | Claim | Cite | Verdict | Evidence / Fix |
|---|---|---|---|---|---|
| 1 | What headless mode is | `-p`/`--print` runs non-interactively; docs example `claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"` | 1 | PASS | "Add the `-p` (or `--print`) flag to any `claude` command to run it non-interactively"; example identical. |
| 2 | same | `claude -p` uses the Agent SDK via CLI; Python/TypeScript packages exist | 1 | PASS | "This page covers using the Agent SDK via the CLI (`claude -p`)"; "available ... as Python and TypeScript packages". |
| 3 | same | Exit 0 on success, non-zero on failure | 1 | PASS | "exits with code 0 on success and a non-zero code when the run fails". |
| 4 | same | Invalid flag -> stderr before run; in-run failure such as missing auth printed as result on stdout | 1 | PASS | Same paragraph, near-verbatim. |
| 5 | same | Claude Code rejects `--bg` with `-p` | 1 | PASS | "Claude Code rejects `--bg`" (also CLI ref: "Can't be combined with `-p`/`--print`"). |
| 6 | Callout | CLI reference says `--help` does not list every flag | 2 | PASS | Quote above. |
| 7 | Pipe a test log | Docs example `cat build-error.txt \| claude -p '...' > output.txt` | 1 | PASS | Identical block. |
| 8 | same | Piped stdin capped at 10MB; for larger, write file and name it in prompt | 1 | PASS | "Piped stdin is capped at 10MB ... write the content to a file and reference the file path". |
| 9 | same | "Example: explain failures..." npm test + pipe | - | EXAMPLE-OK | Labeled Example; only `-p` + stdin (S1). |
| 10 | Output formats | `--output-format` works only in print mode | 2 | PASS | "Specify output format for print mode". |
| 11 | table | text (default) / json (result, session ID, metadata) / stream-json (NDJSON streaming) | 1 | PASS | Bullet list in "Get structured output". |
| 12 | bullets | `jq -r '.result'` extracts text answer from json | 1 | PASS | "# Extract the text result ... jq -r '.result'". |
| 13 | bullets | json payload has `total_cost_usd` and per-model breakdown; client-side estimates, can differ from bill | 1 | PASS | "includes `total_cost_usd` and a per-model cost breakdown ... client-side estimates and can differ". |
| 14 | bullets | stream-json "needs `--verbose`"; `--include-partial-messages` gives tokens; last line is `result` message | 1 | UNCITED | S1 only says "Use `--output-format stream-json` with `--verbose` and `--include-partial-messages`". No source says `--verbose` is required (CLI ref: `--include-partial-messages` "Requires `--print` and `--output-format stream-json"`). Fix: "The docs use `--verbose` with `stream-json`" or drop "needs". (Last-line and partial-messages parts PASS.) |
| 15 | Validate answer | `--json-schema` + json -> `structured_output` field | 1 | PASS | "structured output in the `structured_output` field". |
| 16 | same | Invalid schema -> `Error: --json-schema is not a valid JSON Schema` | 1 | PASS | Verbatim. |
| 17 | same | `format` keyword accepted as annotation, not enforced | 1 | PASS | Verbatim; CLI ref agrees. |
| 18 | QA example | Triage command: `--bare -p --permission-mode dontAsk --output-format json --json-schema ... > triage.json`; `jq '.structured_output'` | 1,2 | EXAMPLE-OK | Labeled "Example"; every flag documented (S1 bare/json-schema/jq; S2 permission-mode `dontAsk`). |
| 19 | QA example bullets | Save triage.json as artifact; route on category; treat as first guess | - | OPINION-OK | Advice, no checkable claim. |
| 20 | --bare | `--bare` skips hooks, skills, custom commands, subagents, plugins, MCP servers, auto memory, CLAUDE.md; without it `-p` loads same context as interactive | 1 | PASS | "skipping auto-discovery of hooks, skills, custom commands, subagents, installed plugins, MCP servers, auto memory, and CLAUDE.md. Without it, `claude -p` loads the same context an interactive session would". |
| 21 | bullets | Useful for CI (same result every machine); starts faster | 1 | PASS | "useful for CI and scripts where you need the same result on every machine"; "reduce startup time". |
| 22 | bullets | Bare has Bash, file read, file edit tools | 1 | PASS | Verbatim. |
| 23 | bullets | Only `--mcp-config` servers connect; no background tasks; limits hold fully from v2.1.286 | 1 | PASS | "only servers supplied on the command line connect"; "Background tasks: none run"; "Before v2.1.286, these limits held only partly". |
| 24 | bullets | `--bare` recommended for scripted/SDK calls; will become default for `-p` | 1 | PASS | Note callout, verbatim. |
| 25 | table | Context flags: `--append-system-prompt(-file)`, `--settings`, `--mcp-config`, `--agents`, `--plugin-dir`, `--plugin-url` | 1 | PASS | Identical table. (`--append-system-prompt-file` absent from `--help`; documented in S2.) |
| 26 | para | `--append-system-prompt` adds and keeps default prompt; `--system-prompt` replaces | 1,2 | PASS | S2: "Append custom text to the end of the default system prompt"; "Replace the entire system prompt". |
| 27 | para | "Use the append form for test-review rules so Claude keeps default tool guidance" | - | OPINION-OK | Advice; S2 "Appending preserves the default tool guidance" backs it. |
| 28 | Warning callout | Without `--bare`, `-p` runs hooks in `.claude/settings.json`, connects `.mcp.json` servers, even in never-trusted folder; no trust dialog / per-server prompt | 1 | PASS | Verbatim. |
| 29 | Warning callout | "If a CI job checks out code from a pull request, that code can change the hooks and servers. Use `--bare` for such jobs." | none (follows cite 1) | UNCITED | Inference; not in S1. Checkable parts: PR code can change hooks/servers; `--bare` is the fix. Supported only by permissions.md "What runs before you trust a folder" (not in `sources`): "Start with `--bare` so Claude Code reads no hooks, skills, ... or `.mcp.json` servers from the project. The project's `env` block and helpers such as `awsAuthRefresh` in its settings files still apply". So "Use `--bare`" is incomplete as a full fix. Fix: add permissions.md as a source and cite it, mention the `env`/helper caveat, or label as the tutorial's advice and drop the factual claim. |
| 30 | para | Bare mode does not use subscription login; set `ANTHROPIC_API_KEY` or `apiKeyHelper` in `--settings` JSON | 1 | PASS | "Set `ANTHROPIC_API_KEY` ... because bare mode doesn't use your subscription login"; "supply an `apiKeyHelper` in the `--settings` JSON". |
| 31 | Permissions | Allow-flags table: `--allowedTools`/alias "Tools that run without a prompt", permission rule syntax | 2 | PASS | "Tools that execute without prompting ... See permission rule syntax". |
| 32 | table | `--disallowedTools`/alias: bare name removes tool from context (`"Edit"`); `Bash(rm *)` denies only matching calls | 2 | PASS | Verbatim. |
| 33 | table | `--tools`: `""` disables all, `"default"`, names; not MCP tools; deny with `--disallowedTools "mcp__*"` | 2 | PASS | Verbatim. |
| 34 | para | Trailing space+star = prefix match; `Bash(git diff *)` | 1 | PASS | "The trailing ` *` enables prefix matching, so `Bash(git diff *)` allows any command starting with `git diff`". |
| 35 | Set the permission mode | `--permission-mode` values incl. `manual` alias for `default` | 2 | PASS | Verbatim. `--help` lists `manual`, not `default`; S2 notes this. |
| 36 | bullets | `dontAsk` behavior | 1 | PASS | "denies every call that would otherwise prompt ... file reads in your working directories ... read-only command set ... `--allowedTools` entries or `permissions.allow` rules". |
| 37 | bullets | `acceptEdits` behavior | 1 | PASS | "writes files without prompting ... `mkdir`, `touch`, `mv`, and `cp` ... other shell commands and network requests still need an `--allowedTools` entry". |
| 38 | code | `claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"` | 3 | PASS | Identical row in S3 mode table. |
| 39 | Tip | No mode set -> built-in starting mode, can be `auto`; pass the mode | 1 | PASS | Verbatim. |
| 40 | prompts | `--permission-prompts none` denies without asking host, tells Claude not to retry; choices `host` (default)/`none` | 1,2 | PASS | S1 "Anything that would prompt is denied ... Claude is told ... not to retry"; S2 "With the default `host`...Pass `none`". |
| 41 | prompts | Needs v2.1.259+ | 2 | PASS | "Requires Claude Code v2.1.259 or later". |
| 42 | para | `--dangerously-skip-permissions` = `--permission-mode bypassPermissions` | 2 | PASS | "Equivalent to". |
| 43 | para | Use only in container/VM/sandbox runtime; non-root on Linux/macOS | 3 | PASS | S3 row: "Required: a container, VM, or the sandbox runtime; on Linux and macOS, run it as a non-root user". |
| 44 | Limits table | `--max-turns <n>`: limits agentic turns, print mode only; exits with an error at the limit; no limit by default | 2 | PASS | "Limit the number of agentic turns (print mode only). Exits with an error when the limit is reached. No limit by default." Stated per CLI reference only, as required. |
| 45 | Limits table | `--max-budget-usd <amount>` stops run once estimated spend reaches amount, print mode only | 2 | PASS | Verbatim. |
| 46 | bullets | Budget uses client-side estimate; subagent spend counts; can pass the cap | 2 | PASS | Verbatim. |
| 47 | bullets | `claude --help` may not show `--max-turns`; CLI reference documents it | 2 | PASS | Confirmed: `--max-turns` absent from 2.1.294 `--help`; S2 documents it. |
| 48 | bullets | "Do not depend on a specific exit code at the turn limit. Check for a non-zero exit code." | none | UNCITED | The first sentence is fine, but "Check for a non-zero exit code" asserts that the turn-limit run exits non-zero. S2 says only "Exits with an error"; no source gives an exit status for this case. Fix: "Claude Code exits with an error at the limit (S2); check the output, not a specific exit code" or remove the second sentence. |
| 49 | bullets | GitLab docs advise `--max-turns` and job `timeout` | 4 | PASS | "Set appropriate `--max-turns` and job `timeout` values". |
| 50 | bullets | SIGTERM -> exit 143, current turn unfinished; SIGINT ends turn first | 1 | PASS | Verbatim. |
| 51 | code | `claude --bare -p ... --permission-mode dontAsk --max-turns 5 --max-budget-usd 1.00` | 1,2 | EXAMPLE-OK | Labeled "Example"; all flags documented in S2. |
| 52 | Sessions | `--continue`/`-c` = most recent conversation in cwd; with `-p` includes `-p`/SDK sessions | 1,2 | PASS | S2: "`claude -p --continue` includes `-p`, SDK, and `/loop` sessions". |
| 53 | Sessions | `--resume`/`-r` by ID or name; since v2.1.223 finds ID in any project | 1,2 | PASS | S2 "Resume a specific session by ID or name"; S1 "Before v2.1.223 ... only the current project directory". |
| 54 | Sessions | `--fork-session` with `--resume`/`--continue` creates new ID | 2 | PASS | Verbatim. |
| 55 | Sessions | `--no-session-persistence`: not saved, cannot resume, print mode only | 2 | PASS | Verbatim. |
| 56 | code | `session_id=$(claude -p ... --output-format json \| jq -r '.session_id')` + `--resume` | 1 | PASS | Identical. |
| 57 | para | QA example: first call triages, second asks for fix plan in same session | - | EXAMPLE-OK | Labeled "Example for QA"; uses documented session-ID pattern (S1). |
| 58 | Auth table | `ANTHROPIC_API_KEY`; in `-p` mode always used when present | 5 | PASS | "In non-interactive mode (`-p`), the key is always used when present." |
| 59 | Auth table | `claude setup-token`, store as `CLAUDE_CODE_OAUTH_TOKEN`; valid one year; prints, does not save | 5 | PASS | "generate a one-year OAuth token"; "does not save the token anywhere". |
| 60 | bullets | Needs Pro, Max, Team, or Enterprise | 5 | PASS | Verbatim. |
| 61 | bullets | Token only makes model requests; no Remote Control or claude.ai connectors; local MCP still works | 5 | PASS | Verbatim. |
| 62 | bullets | Bare mode does not read `CLAUDE_CODE_OAUTH_TOKEN`; use API key or apiKeyHelper | 5 | PASS | Verbatim. |
| 63 | bullets | `ANTHROPIC_API_KEY` ranks above `CLAUDE_CODE_OAUTH_TOKEN` | 5 | PASS | Precedence list: item 3 vs item 5. |
| 64 | bullets | "Set only one of them in a job"; "Store as CI secret, never in repo" | - | OPINION-OK | Advice. |
| 65 | para | `claude auth status`: exit 0 signed in, 1 if not; `--text` readable | 2 | PASS | "Exits with code 0 if logged in, 1 if not"; `claude auth status --help` lists `--text`. |
| 66 | Where next | GitLab CI/CD is in beta and GitLab maintains it | 4 | PASS | "currently in beta"; "maintained by GitLab". |
| 67 | Where next | Agent SDK has Python and TypeScript packages | 1 | PASS | See row 2. |
| 68 | nav description | "Run Claude Code in scripts and CI jobs with no interactive session." | - | OPINION-OK | Summary of the page topic; matches S1 "non-interactive mode". |
| 69 | nav tagline | "run Claude from scripts and CI" | - | OPINION-OK | Marketing phrase, no checkable claim. |

Open FAILs (round 1): 3 (rows 14, 29, 48; all UNCITED)

## Round 2 (2026-10-10, diff 3748346..cf32eeb)
Sources now: S1 headless, S2 cli-reference, S3 permissions (new), S4 permission-modes, S5 gitlab-ci-cd, S6 authentication. Cite check by script: 6 sources, n=1..6 all cited, first-cite order 1..6. Renumbering verified: every old 3 -> 4 (permission-modes rows 38, 43), old 4 -> 5 (GitLab rows 49, 66), old 5 -> 6 (authentication rows 58-63); each re-checked against the same quotes as round 1 and still PASS. S3 permissions.md re-fetched.

| # | Location | Claim | Cite | Verdict | Evidence / Fix |
|---|---|---|---|---|---|
| 14 | Output formats | "The docs use `stream-json` with `--verbose` and `--include-partial-messages` to receive tokens..."; last line is `result` message | 1 | PASS | S1: "Use `--output-format stream-json` with `--verbose` and `--include-partial-messages` to receive tokens as they're generated"; "The last line of the stream is a `result` message with the final response text, cost, and session metadata." "Needs" removed. |
| 29a | Warning callout | Without `--bare`, `-p` runs project hooks and `.mcp.json` servers even in an untrusted folder; no trust dialog or per-server prompt (title now "A repository can decide what runs") | 1 | PASS | Unchanged from round 1 (S1 verbatim). |
| 29b | Warning callout | With `--bare`, Claude Code reads no hooks, skills, custom commands, subagents, plugins, or `.mcp.json` servers from the project | 3 | PASS | S3 "What runs before you trust a folder": "Start with `--bare` so Claude Code reads no hooks, skills, custom commands, subagents, plugins, or `.mcp.json` servers from the project." |
| 29c | Warning callout | Project's `env` block and helpers such as `awsAuthRefresh` still apply under `--bare` | 3 | PASS | S3: "The project's `env` block and helpers such as `awsAuthRefresh` in its settings files still apply". |
| 29d | Warning callout | "So `--bare` alone does not block everything from a repository that you did not write" | 3 | PASS | Direct consequence of row 29c (stated in S3 as the caveat to the `--bare` option). |
| 29e | Warning callout | `--setting-sources user` makes Claude Code read neither project settings files nor its `.mcp.json` | 3 | PASS | S3: "Pass `--setting-sources user ... so Claude Code reads neither the project's settings files nor its `.mcp.json`". Flag also in `claude --help` 2.1.294 ("Comma-separated list of setting sources to load (user, project, local)") and CLI reference. The old uncited PR-checkout inference is gone. |
| 48 | Limits bullets | "At the limit, Claude Code exits with an error. The CLI reference gives no specific exit code for this case." | 2 | PASS | S2 `--max-turns`: "Exits with an error when the limit is reached." No exit status is given there; the sentence makes no exit-code claim. |

Changed-line sweep: only the lines above plus the cite renumbering changed on this page. `lib/nav.ts` has no diff between the two commits (nav rows 68-69 unchanged, still OPINION-OK).

Open FAILs: 0
