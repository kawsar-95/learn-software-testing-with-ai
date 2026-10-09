# Fact-check: Key Principles (rounds 1-2, 2026-10-10)

Sources fetched by the checker on 2026-10-10: S1 best-practices, S2 permission-modes, S3 glossary, S4 CTFL syllabus v4.0 PDF, S5 how-claude-code-works, S6 features-overview, S7 large-codebases, S8 memory, S9 security (all `.md` variants; S4 via pdftotext). All 9 sources are cited at least once; every `<Cite n>` (1-9) exists.

ISTQB version check: S4 is the CTFL v4.0 PDF (cover "v4.0", "released ... 21 April 2023"). The source title on the page says "v4.0 (2023)": matches. The page uses S4 only for the "relatively small, but sufficient" quote and the decision-table growth sentence; both are in S4 section 4.1 and 4.2.3.

Writer-flagged item: "MCP tool search is on by default, so idle MCP tools use minimal context" (S6) = row 26 (PASS).

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | Lede | Eight principles; each links to a detail page | none | OPINION-OK | Describes the page's own structure (8 cards counted on the page). |
| 2 | Card 1 / Verify first | Give Claude a check it can run; ask for evidence, not a claim of success | 1 | PASS | S1: "Give Claude a check it can run"; "Have Claude show evidence rather than asserting success". |
| 3 | Card 2 / Plan | Explore and plan before implementing, unless you can describe the change in one sentence | 1 | PASS | S1: "If you could describe the diff in one sentence, skip the plan." |
| 4 | Card 3 | Reference specific files, mention constraints, point to example patterns | 1 | PASS | S1: "Reference specific files, mention constraints, and point to example patterns." |
| 5 | Card 4 | Performance degrades as the context window fills; clear between tasks; delegate research | 1 | PASS | S1: "context window fills up fast, and performance degrades as it fills"; "`/clear`: reset context between unrelated tasks"; "Delegate research with 'use subagents to investigate X'". |
| 6 | Card 5 | `CLAUDE.md` is advisory; hooks are deterministic | 1 | PASS | S1: "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens." |
| 7 | Card 6 | Pick the permission mode by risk; refine with allow and deny rules | 2 | PASS | S2: "Modes set the baseline. Layer permission rules on top to pre-approve or block specific tools." "By risk" is advice (OPINION-OK). |
| 8 | Card 7 | Files, web pages, tool results can carry hostile instructions | 3 | PASS | S3 "Prompt injection": "Hostile instructions embedded in a file, web page, or tool result that attempt to redirect Claude". |
| 9 | Card 8 | Test techniques build a small but sufficient set of cases | 4 | PASS | S4 4.1: "a relatively small, but sufficient, set of test cases in a systematic way". |
| 10 | 1. Verify first | Pass/fail check closes the loop: Claude works, runs the check, reads result, iterates; without a check you are the verification loop | 1 | PASS | S1: "Give Claude something that produces a pass or fail, and the loop closes on its own."; "you become the verification loop: every mistake waits for you to notice it." |
| 11 | 1. Verify first | Glossary quote: without a verification loop, "the only thing deciding the agent is finished is the agent itself" | 3 | PASS | S3 "Verification loop": "without one, the only thing deciding the agent is finished is the agent itself." |
| 12 | 1. Verify first | Evidence = test output, command and result, screenshot | 1 | PASS | S1: "the test output, the command it ran and what it returned, or a screenshot of the result". |
| 13 | 1. Verify first | "For a bug report, this tutorial also asks for the file and line, the log message, or the query result" | none | OPINION-OK | Labeled the tutorial's own request. |
| 14 | 1. Verify first | Docs name "the trust-then-verify gap"; "If you can't verify it, don't ship it." | 1 | PASS | S1 Common failure patterns: "The trust-then-verify gap ... If you can't verify it, don't ship it." |
| 15 | 1. Verify first | Independent reviewer in a fresh subagent; a reviewer told to find gaps usually reports some even when work is sound; limit to correctness and requirements | 1 | PASS | S1: "have a subagent review the diff in a fresh context and report gaps"; "A reviewer prompted to find gaps will usually report some, even when the work is sound ... flag only gaps that affect correctness or the stated requirements". |
| 16 | 2. Plan | Separate research and planning from implementation; four phases: explore, plan, implement, commit | 1 | PASS | S1: "Separate research and planning from implementation to avoid solving the wrong problem."; "four phases". |
| 17 | 2. Plan | Plan mode: reads files, runs shell commands to explore, writes a plan, does not edit source | 2 | PASS | S2: "Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source." |
| 18 | 2. Plan | Enter with `Shift+Tab`, `/plan`, or `claude --permission-mode plan` | 2 | PASS | S2: "Enter plan mode by pressing `Shift+Tab` or prefixing a single prompt with `/plan`. You can also start in plan mode from the CLI: `claude --permission-mode plan`". `claude --help` lists `plan` as a choice. |
| 19 | 2. Plan | Approving the plan exits plan mode and switches to the mode the approve option describes, so Claude starts editing | 2 | PASS | S2: "Approving a plan exits plan mode and switches the session to the permission mode each approve option describes, so Claude starts editing." |
| 20 | 2. Plan | Plan when unsure, many files, unfamiliar code; skip when clear and small; quote "If you could describe the diff in one sentence, skip the plan." | 1 | PASS | S1 Callout, same wording. |
| 21 | 3. Be specific | Precise instructions reduce corrections; no need to list every file; give context and direction | 1, 5 | PASS | S1: "the fewer corrections you'll need". S5 "Delegate, don't dictate": "Give context and direction, then trust Claude to figure out the details"; "You don't need to specify which files to read". |
| 22 | 4. Keep the context small | Context window is the main constraint; fills up fast; performance degrades | 1 | PASS | S1: "Claude's context window fills up fast, and performance degrades as it fills."; "Since context is your fundamental constraint". |
| 23 | 4. Keep the context small | `/clear` between unrelated tasks; corrected more than twice then `/clear` with a better first prompt; clean session almost always beats a long one with corrections | 1 | PASS | S1: "A clean session with a better prompt almost always outperforms a long session with accumulated corrections." |
| 24 | 4. Keep the context small | Send research to subagents; separate context; return a summary | 1 | PASS | S1: "Subagents run in separate context windows and report back summaries". |
| 25 | 4. Keep the context small | Skills load on demand | 1 | PASS | S1: "Claude loads them on demand without bloating every conversation." |
| 26 | 4. Keep the context small | "MCP tool search is on by default, so idle MCP tools use minimal context." | 6 | PASS | S6 "Context cost": "Tool search is on by default, so idle MCP tools consume minimal context." Cite 6 is the right source. |
| 27 | 4. Keep the context small | In a large repository, scope Claude to the part of the codebase a task touches | 7 | PASS | S7: "This guide shows ... how to scope Claude to the part of the codebase a task touches." |
| 28 | 5. Rules in CLAUDE.md | Claude reads `CLAUDE.md` at the start of every conversation; use it for context Claude cannot infer (test commands, style, gotchas) | 1 | PASS | S1: "CLAUDE.md is a special file that Claude reads at the start of every conversation"; table "Include": "Bash commands Claude can't guess"; "Testing instructions and preferred test runners"; "Common gotchas". |
| 29 | 5. Rules in CLAUDE.md | Docs target under 200 lines; longer files use more context and lower adherence | 8 | PASS | S8: "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." |
| 30 | 5. Rules in CLAUDE.md | "Would removing this cause Claude to make mistakes?"; review and prune | 1 | PASS | S1: "*\"Would removing this cause Claude to make mistakes?\"*"; "review it when things go wrong, prune it regularly". |
| 31 | 5. Rules in CLAUDE.md | Claude treats `CLAUDE.md` as context, not enforced configuration | 8 | PASS | S8: "Claude treats CLAUDE.md files as context, not enforced configuration". |
| 32 | 5. Rules in CLAUDE.md | Hooks are deterministic and guarantee the action | 1 | PASS | S1 (see row 6). |
| 33 | 5. Rules in CLAUDE.md | "never edit `.env`" is a request; a `PreToolUse` hook that blocks the edit is enforcement | 6 | PASS | S6: "An instruction like 'never edit `.env`' in CLAUDE.md or a skill is a request, not a guarantee. A `PreToolUse` hook that blocks the edit is enforcement." |
| 34 | 5. Rules in CLAUDE.md | Auto memory = notes Claude writes itself; both CLAUDE.md and auto memory load at start of every conversation | 8 | PASS | S8: "Both are loaded at the start of every conversation."; "Auto memory lets Claude accumulate knowledge across sessions without you writing anything." |
| 35 | 5. Rules in CLAUDE.md | Rule in CLAUDE.md if always needed; reference material in a skill if needed sometimes | 6 | PASS | S6: "CLAUDE.md holds always-on rules; skills hold reference material loaded on demand". |
| 36 | 5. Rules in CLAUDE.md | "This tutorial's example skills are `analyze-requirement`, `explain-code`, `find-bug`, `test-design`, `analyze-security`, `analyze-rootcause`. They are examples, not a required set." | none | EXAMPLE-OK | Labeled as the tutorial's examples; makes no claim about the docs. |
| 37 | 6. Least permission | Permission mode sets which actions Claude can take without asking; six modes with `default` (Manual) | 2 | PASS | S2: "Each mode makes a different tradeoff ... Manual mode appears under its config value, `default`"; table lists all six. |
| 38 | 6. Least permission | Manual mode: read-only permissions, asks before edits and commands | 9 | PASS | S9: "Manual mode: Claude Code starts with read-only permissions. When it needs to edit files, run tests, or execute commands, it asks you first". |
| 39 | 6. Least permission | Auto mode: separate classifier model reviews actions, blocks risky ones; from v2.1.283 the built-in starting mode for interactive terminal and VS Code | 2 | PASS | S2: "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions." S3 "Auto mode" says "a separate classifier model reviews actions instead of you". |
| 40 | 6. Least permission | Your explicit ask and deny rules still apply in auto mode | 9 | PASS | S9: "Your explicit ask and deny rules still apply". |
| 41 | 6. Least permission | Deny rules block in every mode including `bypassPermissions`; allow rules have no effect in `bypassPermissions` | 2 | PASS | S2: "Deny rules block in every mode, including `bypassPermissions`. ... Allow rules have no effect in `bypassPermissions`." |
| 42 | 6. Least permission | Pre-approve trusted commands such as `npm run lint` with `/permissions` | 1 | PASS | S1: "Permission allowlists: permit specific tools you know are safe, like `npm run lint` or `git commit`"; "pre-approve the tools you trust with `/permissions`". |
| 43 | 6. Least permission | `/sandbox` isolates Bash at the OS level | 9 | PASS | S9: "Configure with `/sandbox`"; "To restrict Bash commands at the operating system level, turn on sandboxing". |
| 44 | 6. Least permission | Use `bypassPermissions` only in isolated containers and VMs | 2 | PASS | S2 table: "`bypassPermissions` | Everything | Isolated containers and VMs only". |
| 45 | 6. Least permission | In CI use `dontAsk` with an exact allowlist; anything that would prompt is denied | 2 | PASS | S2: "`dontAsk` | Reads and pre-approved tools; anything that would prompt is denied | Locked-down CI and scripts"; "Run in CI with an exact allowlist". |
| 46 | 6. Least permission | You are responsible for reviewing proposed code and commands before approval | 9 | PASS | S9 "User responsibility": "You're responsible for reviewing proposed code and commands for safety before approval." |
| 47 | 6. Least permission | CI example `claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"` | 2 | PASS | S2 row "Run in CI with an exact allowlist": identical command. `claude --help` lists `-p`, `--permission-mode` (choices include `dontAsk`) and `--allowedTools`. |
| 48 | Callout: checkpoints | `/rewind` undoes file edits; actions on remote systems (databases, APIs, deployments) cannot be checkpointed | 5 | PASS | S5: "Actions that affect remote systems (databases, APIs, deployments) can't be checkpointed." |
| 49 | 7. Untrusted content | Prompt injection = hostile instructions in a file, web page, or tool result that try to redirect Claude | 3 | PASS | S3 definition (see row 8). |
| 50 | 7. Untrusted content | "For a QA team, that includes test logs, bug tickets, web pages under test, and MCP results." | none | OPINION-OK | Application of the S3 definition to QA content; names no new fact about Claude Code. |
| 51 | 7. Untrusted content | Practices: review suggested commands; do not pipe untrusted content directly to Claude; verify changes to critical files | 9 | PASS | S9: "Review suggested commands before approval; Avoid piping untrusted content directly to Claude; Verify proposed changes to critical files". |
| 52 | 7. Untrusted content | "Use VMs to run scripts and make tool calls, especially when they reach external web services." (round 2 wording) | 9 | PASS (round 2) | Round 2: the page now says "especially when they reach external web services". S9: "Use virtual machines (VMs) to run scripts and make tool calls, especially when interacting with external web services". Matches. Round 1 verdict was FAIL. Round 1 note: | S9: "Use virtual machines (VMs) to run scripts and make tool calls, especially when interacting with external web services". The page narrows "especially" into "only those that reach external services". Fix: "Use VMs to run scripts and make tool calls, especially when they reach external web services." |
| 53 | 7. Untrusted content | Use MCP servers you wrote or from providers you trust; Anthropic reviews connectors before adding to the Directory but does not security-audit or manage any MCP server | 9 | PASS | S9: "We encourage either writing your own MCP servers or using MCP servers from providers that you trust. Anthropic reviews connectors against its listing criteria before adding them to the Anthropic Directory, but does not security-audit or manage any MCP server." |
| 54 | 7. Untrusted content | `curl` and `wget` are not auto-approved by default | 9 | PASS | S9: "Commands that fetch content from the web such as `curl` and `wget` are not auto-approved by default." |
| 55 | 8. Test what matters | Quote "a relatively small, but sufficient, set of test cases in a systematic way" | 4 | PASS | S4 4.1, same text. |
| 56 | 8. Test what matters | Decision-table rules grow exponentially; minimized table or risk-based approach keeps number down | 4 | PASS | S4 4.2.3: "the number of rules grows exponentially with the number of conditions ... a minimized decision table or a risk-based approach may be used." |
| 57 | 8. Test what matters | "More cases are not always better." | none | OPINION-OK | Editorial framing; the S4 quote (small but sufficient set) supports the idea but this sentence states no checkable fact. |
| 58 | Working loop for QA/SDET | Six-step loop is "this tutorial's summary"; steps cite S1, S2, S8 | 1, 2, 8 | OPINION-OK | Labeled as the tutorial's own summary. The factual pieces inside it (CLAUDE.md for test commands, deny rules, hooks, plan mode) are covered in rows 28, 33, 41, 17. |
| 59 | Working loop for QA/SDET | PAY-4201 refund-bug story (Jira MCP, plan mode, fresh reviewer session) | none | EXAMPLE-OK | Labeled "Example"; uses only documented features (MCP, plan mode, fresh-session review). |
| 60 | Callout: why they work together | "This summary is this tutorial's view." | none | OPINION-OK | Explicitly labeled opinion. |
| 61 | nav description | "Eight principles for reliable testing with Claude Code." | page | PASS | The page has exactly 8 principle cards. "Reliable" is framing, not a checkable claim. Tagline "principles to design AI testing by" makes no checkable claim. |
| 62 | metadata description | "Eight principles ...: verify, plan, be specific, keep context small, enforce rules, limit permissions, distrust input, test by risk." | page | PASS | Matches the eight cards. Card 8 ("Test what matters") names a risk-based approach, so "test by risk" is a fair short form. |

## Round 2 (2026-10-10, writer commit 709ada9)

Diff checked: `git diff 64592ce 709ada9 -- content/foundations/principles.mdx lib/nav.ts`. One changed line (row 52). `lib/nav.ts` is unchanged. All other rows keep their round-1 verdicts.

Open FAILs: 0

## Round 3 (review polish, 6b5b76d)

Diff checked: `git show 6b5b76d -- content/foundations/principles.mdx`. S2 (`permission-modes.md`) re-fetched. Two changed lines.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R3-1 | 6. Least permission | "From Claude Code v2.1.283, when auto mode is available, it is the built-in starting mode for interactive terminal and VS Code sessions." | 2 | PASS | S2: "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions."; "When the flag, a settings file, or the built-in default selects `auto` but auto mode isn't available to the session, Claude Code starts the session in Manual instead." The new qualifier is correct. |
| R3-2 | metadata.description | "... limit permissions, distrust input, test what matters." | page | PASS | Matches card 8, "8. Test what matters" (principles.mdx lines 65 and 157). Round 1 row 62 stands. |

Cite numbers: all exist; no cite was added or removed.

Open FAILs: 0
