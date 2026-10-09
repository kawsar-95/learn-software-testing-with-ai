# Key Principles — research notes (2026-10-10)

## Sources
S1. Best practices for Claude Code — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/best-practices — accessed 2026-10-10
S2. Choose a permission mode — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/permission-modes — accessed 2026-10-10
S3. Security — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/security — accessed 2026-10-10
S4. Extend Claude Code — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/features-overview — accessed 2026-10-10
S5. How Claude remembers your project — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/memory — accessed 2026-10-10
S6. How Claude Code works — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/how-claude-code-works — accessed 2026-10-10
S7. Glossary — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/glossary — accessed 2026-10-10
S8. ISTQB Certified Tester Foundation Level Syllabus v4.0 (2023-04-21), section 4.1 and 4.2.3 — ISTQB, hosted by ASTQB — https://astqb.org/assets/documents/ISTQB_CTFL_Syllabus-v4.0.pdf — accessed 2026-10-10
S9. Set up Claude Code in a monorepo or large codebase — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/large-codebases — accessed 2026-10-10

Local CLI check (2.1.294): `claude --help` prints `--dangerously-skip-permissions  Bypass all permission checks. Recommended only for sandboxes with no internet access.` and the `--permission-mode` choices `"acceptEdits", "auto", "bypassPermissions", "manual", "dontAsk", "plan"`.

## Proposed principle set (fixes the 8-vs-12 contradiction)
Pick EIGHT. The old metadata said "8 core principles" and the body said "12". The new count is derived from what the page lists (render the number from the card count, or write "Eight" and keep 8 cards). Cards:
1. Verify first (C1 to C4)
2. Plan before you act, when the scope is unclear (C5 to C7)
3. Be specific and give context (C8, C9)
4. Keep the context small (C10 to C13)
5. Put rules in CLAUDE.md, enforce with hooks (C14 to C19)
6. Grant the least permission that works (C20 to C27)
7. Treat outside content as untrusted (C28 to C31)
8. Test what matters: choose by risk and technique (C32 to C34)

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | Give Claude a check it can run (tests, a build, a screenshot). With a pass/fail check the loop closes: Claude works, runs the check, reads the result, iterates until it passes. | "Give Claude something that produces a pass or fail, and the loop closes on its own." | S1 | |
| C2 | Without a check you are the verification loop. | "you become the verification loop: every mistake waits for you to notice it" | S1 | |
| C3 | Ask for evidence, not an assertion of success: test output, the command and its result, or a screenshot. | "Have Claude show evidence rather than asserting success" | S1 | Replaces old "Evidence-Based Output … cite code line, log message, or DB query" (keep as a QA example; drop "RAG always"). |
| C4 | Verification failure pattern: "The trust-then-verify gap". Fix: always provide verification. "If you can't verify it, don't ship it." An independent reviewer in a fresh subagent context is a second check, but it will usually report gaps, so limit it to correctness and stated requirements. | "If you can't verify it, don't ship it." / "A reviewer prompted to find gaps will usually report some, even when the work is sound" | S1 | S7 glossary "Verification loop": "without one, the only thing deciding the agent is finished is the agent itself." |
| C5 | Explore first, then plan, then code, to avoid solving the wrong problem. Four phases: Explore, Plan, Implement, Commit. | "Separate research and planning from implementation to avoid solving the wrong problem." | S1 | |
| C6 | Plan mode: Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source. Edits stay blocked until you approve the plan. Enter with `Shift+Tab`, `/plan` or `claude --permission-mode plan`. | "Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source." | S2 | Replaces "Plan Mode First … then switch to Act Mode or invoke Superpowers". There is no Act mode: approving the plan exits plan mode and switches to the mode of the approve option. S2: "Approving a plan exits plan mode and switches the session to the permission mode each approve option describes, so Claude starts editing." |
| C7 | Planning has a cost. Skip it when the scope is clear and small. "If you could describe the diff in one sentence, skip the plan." Plan when unsure of the approach, when many files change, or when the code is unfamiliar. | quote above | S1 | So the principle is conditional ("when the scope is unclear"), not "always". The old text said "Always Plan Mode". |
| C8 | Precise instructions reduce corrections. Reference specific files, mention constraints, point to example patterns. | "Reference specific files, mention constraints, and point to example patterns." | S1 | Replaces "Role + Context + Scope" card. Details on the Prompting page. |
| C9 | Delegate with context and direction. You need not list which files to read. | "Give context and direction, then trust Claude to figure out the details" | S6 | |
| C10 | The context window is the main constraint: it fills fast and performance degrades as it fills. | "Claude's context window fills up fast, and performance degrades as it fills." | S1 | |
| C11 | `/clear` between unrelated tasks. After two failed corrections on one issue, `/clear` and write a better first prompt. | "A clean session with a better prompt almost always outperforms a long session with accumulated corrections." | S1 | |
| C12 | Subagents work in a separate context window and return a summary, so research does not fill the main context. Scope investigations narrowly. | "Delegate research with "use subagents to investigate X". They explore in a separate context" | S1 | |
| C13 | Skills load on demand and MCP tool schemas are deferred, so move rarely needed knowledge to skills and disconnect unused servers. | "Claude loads them on demand without bloating every conversation." | S1, S4 | S4: tool search "on by default, so idle MCP tools consume minimal context". |
| C14 | CLAUDE.md is read at the start of every session. It holds persistent context Claude cannot infer from code (commands, style, test runners, gotchas). | "CLAUDE.md is a special file that Claude reads at the start of every conversation." | S1 | Detail on the CLAUDE.md page. |
| C15 | Keep CLAUDE.md short: target under 200 lines per file. Longer files use more context and lower adherence. A bloated file makes Claude ignore real instructions. | "target under 200 lines per CLAUDE.md file" | S5 | S1: "Would removing this cause Claude to make mistakes?" test per line. |
| C16 | CLAUDE.md is context, not enforced configuration. | "Claude treats them as context, not enforced configuration." | S5 | |
| C17 | For something that must happen every time, use a hook. Hooks are deterministic. CLAUDE.md is advisory. | "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens." | S1 | S4: "An instruction like "never edit `.env`" in CLAUDE.md or a skill is a request, not a guarantee. A `PreToolUse` hook that blocks the edit is enforcement." Hooks page owns the mechanics (exit code 2, JSON). |
| C18 | Auto memory is Claude's own notes. Both CLAUDE.md and auto memory load at the start of every session (auto memory: first 200 lines or 25KB). | "Both are loaded at the start of every conversation." | S5 | Corrects the old principle "Store patterns in MEMORY.md" and the old claim that Claude has no memory between sessions (audit: High). |
| C19 | Skills are the reusable layer: reference or action. User-only skills use `disable-model-invocation: true`. The rule of thumb: always-true rules in CLAUDE.md, sometimes-needed knowledge in skills. | "Put it in CLAUDE.md if Claude should always know it" / "Put it in a skill if it's reference material Claude needs sometimes" | S4 | The six named QA skills on the old page are this tutorial's examples. Drop the word "mandatory". No source says they are mandatory. |
| C20 | A permission mode sets which actions Claude can take without asking. Modes: `default` (labelled Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. | Table "Available modes" | S2 | Local help choices include `manual` as an alias. |
| C21 | In Manual mode Claude Code starts with read-only permissions and asks before edits and commands. It runs a built-in set of read-only commands (`ls`, `cat`, `git status`) without asking. | "Claude Code starts with read-only permissions." | S3 | |
| C22 | Auto mode: a separate classifier model reviews actions and blocks risky ones. It is the built-in starting mode for interactive terminal and VS Code sessions from v2.1.283 (earlier: only on Pro, Max and Team). Your explicit ask and deny rules still apply. | "With Claude Code v2.1.283 or later, auto mode is the built-in starting permission mode" | S2, S3 | Replaces the old "no permission prompts for trusted agents". Autonomy comes from auto mode plus rules, not from removing prompts. |
| C23 | Allow rules and deny rules refine the mode. Deny rules block in every mode, including `bypassPermissions`. Allow rules have no effect in `bypassPermissions`. | "Deny rules block in every mode, including `bypassPermissions`." | S2 | |
| C24 | Pre-approve trusted commands with `/permissions` (for example `npm run lint`, `git commit`) to cut prompts. Sandboxing (`/sandbox`) isolates Bash at OS level. | "Permission allowlists: permit specific tools you know are safe" | S1, S3 | |
| C25 | `bypassPermissions` skips checks: use only in isolated containers and VMs. The CLI help says the flag is "Recommended only for sandboxes with no internet access." | table "Best for": "Isolated containers and VMs only" | S2; local help | Replaces the old Superpowers "remove approval prompts" idea (audit: High). |
| C26 | For CI use `dontAsk` with an exact allowlist: anything that would prompt is denied. Example: `claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"`. | exact command in S2 "Common setups" | S2 | Headless page owns it. |
| C27 | You are responsible for reviewing proposed code and commands before you approve them. | "You're responsible for reviewing proposed code and commands for safety before approval." | S3 | |
| C28 | Prompt injection: hostile instructions inside a file, web page or tool result that try to redirect Claude. | "Hostile instructions embedded in a file, web page, or tool result" | S7 | |
| C29 | Best practices for untrusted content: review suggested commands before approval; avoid piping untrusted content directly to Claude; verify proposed changes to critical files; use VMs for scripts and tool calls with external web services. | numbered list in S3 | S3 | "no system is completely immune to all attacks". |
| C30 | MCP servers: use your own or providers you trust. Anthropic reviews connectors against listing criteria before adding them to the Anthropic Directory but "does not security-audit or manage any MCP server". Reviewing `.mcp.json` does not show every server a session can load. | "does not security-audit or manage any MCP server" | S3 | For Jira MCP and DB MCP: read-only access where possible (DBHub read-only user is on the MCP page). |
| C31 | Network fetch commands (`curl`, `wget`) are not auto-approved by default. Deny rules in `permissions.deny` stop them. Workspace trust dialog appears for folders you have not trusted. | "Commands that fetch content from the web such as `curl` and `wget` are not auto-approved by default." | S3 | |
| C32 | Test techniques exist to build a "relatively small, but sufficient, set of test cases in a systematic way". | quote | S8 | Replaces "Sanity Scope" card; the old text had no source. |
| C33 | Decision tables grow exponentially with conditions. A minimized table or a risk-based approach reduces the rule count. | "a minimized decision table or a risk-based approach may be used" | S8 | |
| C34 | Test design techniques are covered on the Test Design page (EP, BVA, decision tables, state transitions, pairwise). | page cross-link | — | No claim; link only. |
| C35 | Checkpoints undo file edits (`Esc Esc` or `/rewind`). They do not undo Bash side effects or changes in remote systems (databases, APIs, deployments). You control those with permission mode and rules. | "Actions that affect remote systems (databases, APIs, deployments) can't be checkpointed." | S6 | Good safety card note for DB MCP. |
| C36 | In a large repo, scope Claude to the code a task touches (per-directory CLAUDE.md, `Read` deny rules for generated or vendored code) to avoid unrelated file reads. | "scope Claude to the part of the codebase a task touches" | S9 | Optional. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| principles.mdx › Intro "12 foundational principles" and metadata "8 core principles" | rewrite | Contradiction (audit: Low). New set has 8 cards; derive the count from the list. |
| › Card "Three-Layer Architecture" (Core + Context + Interface) | drop | No official source for these layers. How Claude Code Works page now explains the documented structure. Also defined inconsistently on the old ai-systems page (audit: Low). |
| › Card "Role + Context + Scope" | merge into "Be specific and give context" | C8, C9. Role is optional (Prompting page). |
| › Card "Real Data First … via MCP. Never work from assumptions" | rewrite → "Treat outside content as untrusted" plus a line in "Verify first" | Real data via tools is valid (Claude gathers context with tools). Add the risk side (C28 to C31). Drop the "MCP always" tone. |
| › Card "Skills-Based Reusability … 6 core QA skills … mandatory" | rewrite into card 5 | C19. Keep the six skills as this tutorial's examples; remove "mandatory". |
| › Card "Agents + Full Tools … No permission prompts for trusted agents" | drop and replace by "Grant the least permission that works" | Unsafe (audit: Med). C20 to C27. Also relied on "Superpowers" as an agent (it is a plugin; audit: High). |
| › Card "Evidence-Based Output … No generic guessing — RAG always" | rewrite → card 1 | C3. Drop "RAG always" (audit: Med). |
| › Card "Memory Persistence … MEMORY.md" | merge into card 5 | C18. Mention CLAUDE.md and auto memory; do not tell users to hand-write `MEMORY.md`. |
| › Card "Hooks = Automatic Guardrails" | keep, re-ground in card 5 | C17. Old text "block dangerous ops, auto-enforce standards" is fine; PreToolUse and PostToolUse detail moves to the Hooks page. |
| › Card "CLAUDE.md Foundation" | keep in card 5 | C14, C15. "ONCE" is wrong: CLAUDE.md should be reviewed and pruned (S1). |
| › Card "Sanity Scope (Not Exhaustive)" | rewrite → card 8 | C32, C33, link to Test Design. |
| › Card "Superpowers = Autonomous Agent … 14 mandatory skills" | drop | Superpowers is a plugin, and the "14 mandatory skills" list is invented (audit: High). The Plugins page covers it. |
| › Card "Plan Mode First … switch to Act Mode or invoke Superpowers" | rewrite → card 2 | No "Act mode" exists (audit: Med, High). C5 to C7. |
| › "The Complete Workflow (7 Steps)" | rewrite | New 6-step loop: write CLAUDE.md → set permissions and hooks → explore and plan → implement with a check → review evidence → clear or compact and save lessons. Steps 6 ("Switch to Act Mode or invoke Superpowers") and "agents fetch REAL context via MCP" are reworded. Each step cites a claim. |
| › Callout "Core Truth: precise prompting + real context + autonomous agents + automatic guardrails" | rewrite | Replace "autonomous agents" with "verification" (C1). Avoid unsourced absolutes ("No component alone is sufficient"). |

## Page outline
- ## Lede — eight principles; each links to the page that explains it.
- ## The eight principles (CardGrid, one card each; each card cites its claim ids):
  - ### 1. Verify first — C1 to C4. Card text: give a check, ask for evidence, add an independent review for risky work. QA: failing test first, then fix.
  - ### 2. Plan before you act — C5 to C7. Conditional on uncertainty; plan mode; no Act mode.
  - ### 3. Be specific and give context — C8, C9. Link to Prompting.
  - ### 4. Keep the context small — C10 to C13, C36. `/clear`, subagents, skills on demand.
  - ### 5. Rules in CLAUDE.md, guarantees in hooks — C14 to C19. 200 lines; advisory vs deterministic; auto memory.
  - ### 6. Grant the least permission that works — C20 to C27, C35. Modes, rules, sandbox, `bypassPermissions` only in isolation, `dontAsk` for CI; checkpoints cannot undo DB writes.
  - ### 7. Treat outside content as untrusted — C28 to C31. Logs, web pages, tickets, MCP results. Use trusted MCP servers.
  - ### 8. Test what matters — C32, C33. Technique plus risk; link to Test Design.
- ## A working loop for QA and SDET tasks — six steps (see Old content). The qa-agent / sdet-agent / Jira MCP / DB MCP scenario as one worked example: Jira ticket (MCP) → plan mode → test design → tests run → evidence → review. Keep it short; cite the claims, no new facts.
- ## Where to go next — links to Permission Modes, How Claude Code Works, Prompting, Test Design, Hooks, CLAUDE.md pages.

## Open questions
- Q1. S3 says "A `-p` session shows neither prompt" (trust dialog and `.mcp.json` approval). The page about CI owns this. Do not repeat it here.
- Q2. The claim that the "qa-agent" can fetch Jira tickets depends on subagent `tools` and MCP rules (audit: High). Principles page must not show agent files; keep the scenario at the "what Claude does" level and link to Subagents and MCP pages.
- Q3. "Independent review" in card 1 uses the docs' `/code-review` and verification-subagent pattern. Command details are on the Skills and Subagents pages. Cite S1 only.
- Q4. The exact auto-mode classifier rules and which models support auto mode are in S2 and were not read in full ("Requires a supported model"). Do not list supported models.
