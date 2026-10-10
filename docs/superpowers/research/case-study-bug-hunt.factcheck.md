# Fact-check: Bug Hunting with a Review Gate (2026-10-10)

Checker: independent pass. DOC sources were fetched on 2026-10-10 as raw Markdown (page URL plus `.md`): S1 hooks, S2 sub-agents, S3 skills, S4 hooks-guide. All four `page.sources` entries are cited, and every `<Cite n>` (1 to 4) has a source. REPO facts were checked against the private workspace (state of 2026-10-07, 25 commits). Paths use the neutral prefixes `api/`, `web/`, `./`. Prompts were compared word for word with the two session logs. Excerpts were compared with the files.

| # | Section | Claim | Kind | Cite or path | Verdict | Quote or value |
|---|---|---|---|---|---|---|
| 1 | Metadata | Title and description: 7 reviewed Send Money bugs | REPO | `api/qa-findings/08-send-money-bugs.md` | PASS | 7 bugs in the summary table; reviewer gate PASS before the report was written |
| 2 | Lede | Skill, hook before the skill, read-only reviewer that must say PASS | REPO | `./.claude/skills/find-bug/SKILL.md`, `./.claude/hooks/graphify-prehook.sh`, `./.claude/agents/qa-reviewer-agent.md` | PASS | All three files exist; gate text "PASS only when every bug is APPROVED" |
| 3 | Callout | 25 commits from 2026-09-19; state of 2026-10-07 | REPO | `./` git history | PASS | `git log`: 25 commits; first 2026-09-19; last 2026-10-07 |
| 4 | Callout | Placeholders for emails, phones, project names | R1 R2 R5 | page text | PASS | No email, phone, person name, credential, or app name on the page; `<project>` placeholder in the settings excerpt; denylist scan 0 matches |
| 5 | Flow diagram | 2026-10-03: limits report, gap G-1 | REPO | `api/.artifacts/transaction-limits.report.md` | PASS | "**Date:** 2026-10-03"; G-1 in the gaps table; file added 2026-10-03 |
| 6 | Flow diagram | 2026-10-03: cash-in hunt, owner asks if Serena and graphify ran | REPO | `./SESSION-LOG-2026-10-03.md` 16:45, 16:51 | PASS | Prompt at 16:51: `are you using serena and knowledge base using graphify` |
| 7 | Flow diagram | 2026-10-03: find-bug skill from a pasted spec | REPO | `./SESSION-LOG-2026-10-03.md` 17:51 | PASS | "Spec for the skill (pasted)"; "now create a find bug skill" |
| 8 | Flow diagram | 2026-10-03: PreToolUse hook on Skill, graph context plus Serena project | REPO | `./.claude/settings.json`, `./SESSION-LOG-2026-10-03.md` Part 3 | PASS | Hook file and settings added 2026-10-03; matcher `Skill` |
| 9 | Flow diagram | 2026-10-04: qa-reviewer-agent, PASS/BLOCKED gate | REPO | `./.claude/agents/qa-reviewer-agent.md` | PASS | File added 2026-10-04; "Gate: PASS \| BLOCKED" |
| 10 | Flow diagram | 2026-10-04: Send Money hunt and review, 7 bugs, issues #1-#7 | REPO | `api/qa-findings/08-send-money-bugs.md`, `./README.md` | PASS | Report added 2026-10-04; README: "filed as GitHub issues #1-#7" |
| 11 | Flow at a glance | "The hunt took two days. Most steps left a file ... The GitHub issues came after the hunt." | REPO | `./SESSION-LOG-2026-10-03.md`, `./SESSION-LOG-2026-10-04.md` | FAIL → fixed: was "The work took two days. Each step left a file", but the issues are not a file of the hunt and came after it | Two logs (10-03, 10-04); issues are filed from the report |
| 12 | Flow at a glance | Links `/case-study/pr-review/` and `/case-study/overview/` exist | MDX | `lib/nav.ts`, `content/case-study/` | PASS | Both slugs in nav and both `.mdx` files exist |
| 13 | Predict | A report on customer transaction limits was added on 2026-10-03; its gaps were found while reading the code | REPO | `api/.artifacts/transaction-limits.report.md` lines 3-4 | PASS | "the gaps found while reading the code" |
| 14 | Predict | Daily limit for a Customer: 10 outgoing transactions and 5,000 Tk | REPO | same report, section 2 | PASS | "Customer \| daily \| 5,000.00 Tk \| 10" |
| 15 | Predict | Gap G-1 (High): check runs before the transaction, usage query takes no lock | REPO | same report, section 6 | PASS | "`checkCustomerLimits` runs *before* `sequelize.transaction(...)` and its usage query takes no lock" ... "High" |
| 16 | Predict | Two parallel requests can read the same usage, both pass, both commit | REPO | same report | PASS | "Two parallel requests can both read the same usage, both pass, and both commit." |
| 17 | Predict | Test idea: 2 or more parallel requests that together exceed the remaining quota | REPO | same report, section 8 (TL-13) | PASS | "Fire 2+ parallel sends that each fit but together exceed the remaining quota" |
| 18 | Predict | "One day later, the Send Money hunt ran a test of the same kind" | REPO | `api/qa-findings/08-send-money-bugs.md` SM-H02 | FAIL → fixed: was "ran that test"; the report does not say that TL-13 was run as written | "Send 14 parallel requests" on 2026-10-04; report: "confirmed here live" |
| 19 | Predict | Customer had used 6 of 10; 12 of 14 parallel sends returned HTTP 201 | REPO | same report, SM-H02 | PASS | "Customer 1 had 6 outgoing transactions today"; "12 of the 14 requests returned 201"; maxCount 10 |
| 20 | Predict | Report files it as SM-H02 and names G-1 as the earlier code-only prediction | REPO | same report | PASS | "Earlier code-only prediction: `.artifacts/transaction-limits.report.md` G-1, confirmed here live." |
| 21 | Tip callout | Advice: give each guess an ID, write it in the bug report | OPINION-OK | page text | OPINION-OK | Marked "The tutorial's advice" in the title |
| 22 | Prompts | Time 16:45 prompt, word for word | REPO | `./SESSION-LOG-2026-10-03.md` | PASS | `find out some bugs in cash-in module prioritize high, medium and low` |
| 23 | Prompts | Claude read the code and returned a High/Medium/Low list; nothing was run | REPO | same log, 16:45 | PASS | "Returned a High / Medium / Low list" ... "nothing was run" |
| 24 | Prompts | File saved at 16:47 had 23 bugs | REPO | same log, 16:47 | PASS | "with 23 bugs (7 High, 8 Medium, 8 Low)" |
| 25 | Prompts | 16:51 prompt, word for word | REPO | same log | PASS | `are you using serena and knowledge base using graphify` |
| 26 | Prompts | Claude said no; only `initial_instructions` called; graphify not used at all | REPO | same log, 16:51 | PASS | "Admitted it was not. Serena: only `initial_instructions` was called ... graphify: not used at all." |
| 27 | Prompts | 17:51: pasted spec ending "now create a find bug skill"; Claude wrote `.claude/skills/find-bug/SKILL.md` | REPO | same log, 17:51 | PASS | "Created `.claude/skills/find-bug/SKILL.md` following the spec" |
| 28 | Prompts | 18:41 prompt, word for word | REPO | same log | PASS | `i told to rewite this not a new one using Serena, graphify and the browser` |
| 29 | Prompts | Claude wrote the run into a new file; rewrote the old report in place; new file gone | REPO | same log, 17:57 and 18:41 | FAIL → fixed: was "removed the new file"; the log says "confirmed `08` was gone" | "rewrote `07-cash-in-bugs.md` in place, and confirmed `08` was gone" |
| 30 | Prompts | "The `find-bug` skill came out of one day of work (2026-10-03)" | REPO | same log, 16:45 to 18:41 | FAIL → fixed: was "one afternoon", but the log runs to 18:41 and has a separate session at 17:58 | Log times 16:45 to 18:41, one date |
| 31 | Prompts | Log records prompts from saved sessions; replies are condensed | REPO | same log, header | PASS | "Prompts and replies are taken from the saved Claude Code sessions" / "Replies are condensed, not word for word." |
| 32 | Prompts | Spec points: Serena, graphify, `/blast-radius`; frontend first with `agent-browser`; API if UI cannot reproduce; no fix order | REPO | same log, 17:51 | PASS | Spec bullets 1, 2, 4, 6 |
| 33 | Prompts | "Each bug has six fields, and one of them is a confidence" | REPO | same log, 17:51 | FAIL → fixed: was "six fields and a confidence" (7); the log lists six fields including Confidence | "Each bug has: Bug Id, Bug Title, Confidence, Step to reproduce, Expected result, Actual result." |
| 34 | Hard rules excerpt | Six rules, text matches the skill; rule 6 shortened with `[...]` | REPO | `./.claude/skills/find-bug/SKILL.md` lines 10-16 | PASS | Rules 1-5 verbatim; rule 6 matches up to "Never edit application code." then marked cut |
| 35 | Hard rules excerpt | Length 8 lines, no application code (R6) | R6 | page text | PASS | 8 lines in the block; owner's own skill text |
| 36 | Skill docs | Claude uses a skill when relevant, or you invoke it with `/skill-name` | DOC | S3 (cite 3) | PASS | "Claude uses skills when relevant, or you can invoke one directly with `/skill-name`." |
| 37 | Skill docs | Only descriptions in context in a regular session; full content loads on invoke | DOC | S3 (cite 3) | PASS | "skill descriptions are loaded into context so Claude knows what's available, but full skill content only loads when invoked" |
| 38 | Skill docs | "So the hard rules apply only after the skill loads" | OPINION-OK | page text | OPINION-OK | Direct consequence of row 37 |
| 39 | Skill docs | Link `/extend/skills/` exists | MDX | `lib/nav.ts` | PASS | Page exists |
| 40 | Hook | Hooks give deterministic control; an action always happens, not the model's choice | DOC | S4 (cite 4) | PASS | "which gives you deterministic control: certain actions always happen rather than relying on the LLM to choose to run them" |
| 41 | Hook | Owner asked for hooks at 18:52 and 18:55 | REPO | `./SESSION-LOG-2026-10-03.md` Part 3 | PASS | Prompts at 18:52 and 18:55 (18:50 was interrupted) |
| 42 | Hook | 18:55 prompt, word for word | REPO | same log | PASS | `create 2 hooks for graphify and serena to load before test case design and find bug. must call graphify and serena in prehook` |
| 43 | Hook | First design blocked the skills until Claude called the tools; second design makes the calls in the hook | REPO | same log, 18:52, 18:55 | PASS | "Each blocked the `test-design` and `find-bug` skills until Claude had called the tool." / "The hooks now make the calls themselves" |
| 44 | Settings excerpt | Matcher `Skill`; command hook with timeout 45; `mcp_tool` hook, server `plugin:serena:serena`, tool `activate_project`, input with `session_id`, timeout 30 | REPO | `./.claude/settings.json` | PASS | Values identical; `statusMessage` lines removed (stated as "shortened"); project value replaced by `<project>` (R2/R5 placeholder) |
| 45 | Settings excerpt | The entry is in the `PreToolUse` list | REPO | same file | PASS | `"hooks": { "PreToolUse": [ { "matcher": "Skill" ...` |
| 46 | Settings bullets | `PreToolUse` runs after Claude creates tool parameters and before the tool call runs | DOC | S1 (cite 1) | PASS | "Runs after Claude creates tool parameters and before processing the tool call." |
| 47 | Settings bullets | For tool events the matcher is compared with `tool_name` | DOC | S1 | PASS | "For tool events, that field is `tool_name`." |
| 48 | Settings bullets | An `mcp_tool` hook calls a tool on a configured MCP server | DOC | S1 | PASS | "`type: \"mcp_tool\"`: call a tool on a configured MCP server" |
| 49 | Settings bullets | `server` takes `plugin:<plugin-name>:<server-name>` for a plugin server, not the bare key | DOC | S1 | PASS | "this is the scoped name `plugin:<plugin-name>:<server-name>` ... not the bare server key" |
| 50 | Settings bullets | Log records the same lesson: name had to be `plugin:serena:serena` | REPO | `./SESSION-LOG-2026-10-03.md` 18:55 | PASS | "the MCP server name must be `plugin:serena:serena`" |
| 51 | Settings bullets | String values in `input` support `${path}` substitution from the hook's JSON input | DOC | S1 | PASS | "String values support `${path}` substitution from the hook's JSON input" |
| 52 | Script excerpt | Lines match `graphify-prehook.sh` lines 6-8, 10, 14, 22-23, 26; omitted lines marked with `…` | REPO | `./.claude/hooks/graphify-prehook.sh` | FAIL → fixed: the two `what=` lines inside the `if` were left out without a marker; two `…` lines added | Re-checked line by line: all other text identical; block is 14 lines (R6 limit 15) |
| 53 | Script excerpt | R6: owner's own hook script, no application code | R6 | page text | PASS | Script reads stdin and calls `graphify`; no app code |
| 54 | Script bullets | A command hook gets its input as JSON on stdin | DOC | S1 | PASS | "For command hooks, input arrives on stdin." |
| 55 | Script bullets | `PreToolUse` input has `tool_name`, `tool_input`, `tool_use_id` | DOC | S1 | PASS | "PreToolUse hooks receive `tool_name`, `tool_input`, and `tool_use_id`." |
| 56 | Script bullets | Script acts only for `test-design` and `find-bug`; other skills exit with no output | REPO | hook script lines 8 | PASS | `grep -qE '(^\|:)(test-design\|find-bug)$' \|\| exit 0` |
| 57 | Script bullets | Queries the graph with the skill arguments; with none, reads the top of the graph report | REPO | hook script lines 22-28 | PASS | `graphify query "$args"`; else `sed -n '1,45p' .../GRAPH_REPORT.md` |
| 58 | Script bullets | Adds graph date and last-commit date; if no graph exists, tells Claude to say so | REPO | hook script lines 16-18, 30-34 | PASS | "no graphify-out/graph.json found ... Say so in your output"; `built=`, `head_c=` |
| 59 | Script bullets | `additionalContext` is a string that Claude Code adds to Claude's context | DOC | S1 | PASS | "String added to Claude's context alongside the tool result." |
| 60 | Script bullets | `additionalContext` is capped at 10,000 characters | DOC | S1 | PASS | "A hook's `additionalContext` ... are capped at 10,000 characters" |
| 61 | Script bullets | The script cuts the query output to 70 lines | REPO | hook script line 23 | PASS | `\| head -70` |
| 62 | Script bullets | `permissionDecision: "allow"` skips the permission prompt; deny and ask rules still apply | DOC | S1 | PASS | "`\"allow\"` skips the permission prompt, except for ..." / "Deny and ask rules are still evaluated" |
| 63 | After script | Log records three results: both hooks verified live; `if` filters never matched; Serena hook only activates the project | REPO | `./SESSION-LOG-2026-10-03.md` 18:55 | PASS | "Both were verified live."; "the `if` filters I tried never matched"; "the Serena hook only activates the project" |
| 64 | Warning callout | A `PreToolUse` hook on `Skill` fires only when Claude calls the tool; `/skillname` typed directly bypasses it; `UserPromptExpansion` covers that path | DOC | S1 | PASS | "a `PreToolUse` hook matching the `Skill` tool fires only when Claude calls the tool, but typing `/skillname` directly bypasses `PreToolUse`. `UserPromptExpansion` fires on that direct path." |
| 65 | Warning callout | A timed-out `command` or `mcp_tool` hook does not block the tool call | DOC | S1 | PASS | "A timed-out `command`, `http`, or `mcp_tool` hook doesn't block the tool call." |
| 66 | Warning callout | "Use a hook like this one to add context, not to prove that a rule ran" | OPINION-OK | page text | OPINION-OK | Advice; derived from rows 64-65; also repeated in Take-aways (marked own) |
| 67 | Hook | Link `/extend/hooks/` exists | MDX | `lib/nav.ts` | PASS | Page exists |
| 68 | Reviewer | 2026-10-04 owner asked for a reviewer; log says prompts are lightly cleaned up | REPO | `./SESSION-LOG-2026-10-04.md` header, Part 4 | PASS | "Prompts are lightly cleaned up from what I typed." |
| 69 | Reviewer | Quoted request: "an adversarial sub-agent on the Opus 5.5 model", "reviews the bugs Claude reports before `bug.md` is created", "no write permission, so it only reads and verifies" | REPO | same log, Part 4 | PASS | All three fragments appear word for word in the "Create the reviewer" prompt |
| 70 | Reviewer | Second prompt added graphify as the knowledge base | REPO | same log, Part 4 | PASS | "You missed using graphify as the knowledge base. Mention it in `qa-reviewer-agent.md`." |
| 71 | Reviewer excerpt | Frontmatter: name, description (shortened with `[…]`), tools (shortened with `[…]`), `model: claude-opus-5-5` | REPO | `./.claude/agents/qa-reviewer-agent.md` lines 1-6 | PASS | Name, description pieces, first six tool names, last tool name and model identical; cuts marked |
| 72 | Reviewer | The `tools` list names 14 read-only Serena tools; no Write, Edit, or Bash | REPO | same file, line 4 | PASS | Counted: initial_instructions, activate_project, get_current_config, list_dir, find_file, get_symbols_overview, find_symbol, find_referencing_symbols, find_declaration, find_implementations, search_for_pattern, read_file, list_memories, read_memory = 14; tools line has no Write, Edit, Bash |
| 73 | Reviewer bullets | A subagent runs in its own context window with its own system prompt, tool access, permissions | DOC | S2 (cite 2) | PASS | "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." |
| 74 | Reviewer bullets | `tools` is an allowlist; if omitted, the subagent gets every tool available to subagents | DOC | S2 | PASS | "use the `tools` field as an allowlist" / "Inherits every tool available to subagents if omitted." |
| 75 | Reviewer bullets | Example: Read, Grep, Glob, Bash only means no edit, no write, no MCP tools | DOC | S2 | PASS | "allow only Read, Grep, Glob, and Bash. The subagent can't edit files, write files, or use any MCP tools" |
| 76 | Reviewer bullets | `tools` accepts exact tool names, so it can name single MCP tools | DOC | S2 | PASS | "Both fields accept MCP server-level patterns in addition to exact tool names" |
| 77 | Reviewer bullets | Tools of a plugin MCP server are named `mcp__plugin_<plugin-name>_<server-name>__<tool>` | DOC | S1 (cite 1) | PASS | "use a scoped server segment that includes the plugin name: `mcp__plugin_<plugin-name>_<server-name>__<tool>`" (hooks reference, matcher section); cite 1 is correct |
| 78 | Reviewer bullets | `model` accepts an alias such as `opus`, a full model ID, or `inherit` | DOC | S2 | PASS | "`sonnet`, `opus`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit`" |
| 79 | Ten checks | Ten check names, in order, in the two-column table | REPO | same agent file, section 4 | PASS | Rows 1-10: Requirement basis, Is it actually a bug?, Evidence vs claim, Code trace agrees, Steps reproduce it, Expected vs actual, Priority, Confidence, Duplicate / overlap, Format and rules |
| 80 | Ten checks | The reviewer tries to disprove each bug; a bug that fails one check gets FLAGGED | REPO | same file | PASS | "try to **disprove** each one"; "Fail any one and the bug is flagged." |
| 81 | Ten checks | Verdicts APPROVED, FLAGGED, REJECTED; one gate for the whole draft | REPO | same file, section 5, output format | PASS | "Verdict per bug"; "**Gate: PASS \| BLOCKED**" |
| 82 | Gate excerpt | PASS and BLOCKED rules and instruction texts match; `<numbered list of required changes>` replaced by `[…]` | REPO | same file lines 92-94 | PASS | Text identical except the marked placeholder |
| 83 | Gate text | The reviewer cannot write the report; only the main session can | REPO | same file | PASS | "You have no Write, Edit or Bash tool"; description "It cannot write files" |
| 84 | Gate text | The `find-bug` skill does not call the reviewer | REPO | `./.claude/skills/find-bug/SKILL.md` | PASS | `grep -i review` returns no line |
| 85 | Gate text | "So the main session must start the review" | OPINION-OK | page text | OPINION-OK | Consequence of row 84; same advice repeated in Take-aways |
| 86 | Gate text | When a task matches a subagent's description, Claude delegates | DOC | S2 | PASS | "When Claude encounters a task that matches a subagent's description, it delegates to that subagent" |
| 87 | Gate text | Naming a subagent in a prompt: Claude decides; an @-mention guarantees it runs | DOC | S2 | PASS | "Natural language: name the subagent in your prompt; Claude decides whether to delegate" / "@-mention: guarantees the subagent runs for one task" |
| 88 | Gate text | Link `/extend/subagents/` exists | MDX | `lib/nav.ts` | PASS | Page exists |
| 89 | Send Money | Prompt 1, word for word, with the skill names | REPO | `./SESSION-LOG-2026-10-04.md` Part 5 | PASS | `Find out bugs from the send money feature with /qa-agent /qa-agent-advocate /find-bug /validate-bug.` The controller ruled that this prompt may be quoted; no file text from those skills is used |
| 90 | Send Money | Prompt 2, word for word | REPO | same log | PASS | `You don't have to reproduce. Just find bugs from the send money feature and verify them by the reviewer agent.` |
| 91 | Send Money | The hunt had two rounds on 2026-10-04 | REPO | same log, Part 5 | PASS | Two prompts in Part 5 of the 2026-10-04 log |
| 92 | Send Money | `/blast-radius` found no application-code changes against `main`; impact traced by hand | REPO | `api/qa-findings/08-send-money-bugs.md` section 2; log Part 5 | PASS | "no application-code changes vs `main` ... so the impact was traced manually" |
| 93 | Rounds table | Round 1: 6 bugs reproduced with `agent-browser` and `curl`; BLOCKED (6 flagged, 0 rejected), then PASS; 6 approved | REPO | log Part 5; report section 2 | PASS | "Reproduced six bugs with agent-browser and curl ... First pass: BLOCKED (all six flagged, none rejected). After fixes: PASS."; report: "second pass PASS with all six approved" |
| 94 | Rounds table | Round 2: 5 candidates from code trace only; 4 rejected; 1 approved after two rounds of fixes; SM-L03 added | REPO | log Part 5; report section 2 | PASS | "Found five more candidates by code trace. The reviewer rejected four and approved one after two rounds of fixes." |
| 95 | Bug counts | Final report has 7 bugs: 2 High, 2 Medium, 3 Low | REPO | report section 2 | PASS | Summary table: High 2, Medium 2, Low 3 |
| 96 | Bug table | IDs, titles, confidence, "Reproduced via" for all 7 rows | REPO | report section 2 | PASS | Every cell identical to the report's summary table (H01 High/API; H02 High/API+SQL; M01 High/UI+API; M02 Medium/UI+API; L01 High/API; L02 Low/UI+API; L03 Low/Code not executed) |
| 97 | Bug table | R5/R6/R7: titles only, no seeded data, no credentials, no exploit steps | R1 R2 R6 R7 | page text | PASS | No account numbers, tokens, or request bodies in the table |
| 98 | Bug table | SM-L03 is the only bug not executed; confidence Low; report says so | REPO | report | PASS | "Code (not executed)"; "SM-L03 is a code trace only and was not executed" |
| 99 | Bug table | The 7 bugs became GitHub issues #1-#7 | REPO | `./README.md` | PASS | "7 Send Money bugs (SM-H01 to SM-L03), filed as GitHub issues #1-#7" |
| 100 | Withdrawn | First cash-in report came from code reading only | REPO | `./SESSION-LOG-2026-10-03.md` 16:45 | PASS | "Everything came from reading the code, and nothing was run." |
| 101 | Withdrawn | Claude drove the UI with `agent-browser` and checked results with SQL, then rewrote the report | REPO | same log, 18:41 | PASS | "drove the UI with `agent-browser`"; "Confirmed in the UI plus SQL"; "rewrote `07-cash-in-bugs.md` in place" |
| 102 | Withdrawn | Final report has 19 bugs (6 High, 6 Medium, 7 Low) | REPO | `api/qa-findings/07-cash-in-bugs.md` section 2 | PASS | Summary table: High 6, Medium 6, Low 7, Total 19 |
| 103 | Withdrawn | Section "Candidates withdrawn after testing" exists | REPO | same file | PASS | "**Candidates withdrawn after testing:**" |
| 104 | Withdrawn | Cap breach for a customer with no ledger rows did not reproduce in 5 attempts with two different Agent accounts | REPO | same file | PASS | "not reproduced in 5 attempts with two different Agents" |
| 105 | Withdrawn | Empty-body request returns HTTP 400, does not crash | REPO | same file | PASS | "returns HTTP 400, no crash" |
| 106 | Withdrawn | The report says the code-only first version made both claims and both were wrong | REPO | same file | PASS | "Its claims about the zero-row cap breach and the `{}` crash were wrong and are replaced here." |
| 107 | Rejected table | Row 1: wallet cap not checked on Send Money; requirements apply the cap to Deposit and Stripe only | REPO | report section 2 "Not verified / limitations" | PASS | "BRD section 8.5 and section 9 apply the cap to Deposit and Stripe only" |
| 108 | Rejected table | Row 2: error response for an unknown receiver; the requirements ask for it | REPO | same | PASS | "the 404 for an unknown receiver (required by BRD sections 7.3 and 15)"; row words it without an exploit angle (R7) |
| 109 | Rejected table | Row 3: "current balance" under overlapping sends is correct at response time; no requirement covers it | REPO | same | PASS | "accurate at response time, no requirement" |
| 110 | Rejected table | Row 4: no client-side phone or minimum-amount check; the server enforces both | REPO | same | PASS | "the server enforces both" |
| 111 | Rejected table | Four rejections match the log's four dropped items | REPO | `./SESSION-LOG-2026-10-04.md` Part 5 | PASS | Wallet cap; phone-number check in error responses; current balance; phone format and minimum amount |
| 112 | Rejected table | Open requirement question: does the wallet cap apply to Send Money credits? Reviewer did not file it as a bug | REPO | report | PASS | "**Open requirement question:** should the 10,000 BDT wallet cap also apply to Send Money credits?" listed under "not filed" limitations |
| 113 | Take-aways | Marked "the tutorial's own advice"; six bullets | OPINION-OK | page text | OPINION-OK | Intro line: "These points are the tutorial's own advice, based on this workspace." |
| 114 | Take-aways | "If a skill does not start the reviewer, start it yourself, for example with an @-mention" | OPINION-OK | page text | OPINION-OK | Advice; supported by rows 84 and 87 |
| 115 | MDX | Template order: metadata, page, `#` title, lede, `<PageMeta />` | MDX | page | PASS | Order correct |
| 116 | MDX | Callout "Where these facts come from" right after `<PageMeta />`, 4 sentences | MDX | page | PASS | Present, type note |
| 117 | MDX | Cites 1-4 all have sources; all four sources cited; source URLs are https | MDX | page | PASS | Cite 1 x13, cite 2 x7, cite 3 x2, cite 4 x1 |
| 118 | MDX | No closing tag after a list at an indented column; no inline style | MDX | page | PASS | Callouts hold paragraphs; closing tags at column 0 |
| 119 | MDX | Internal links are `/group/page/` and exist | MDX | page | PASS | `/case-study/overview/`, `/case-study/pr-review/`, `/extend/skills/`, `/extend/hooks/`, `/extend/subagents/` |
| 120 | R1-R8 | Personal data, secrets, other-project material, private repo identity, app and course names, app code, exploit steps, invented prompts | R1-R8 | page, note | PASS | None found. `/qa-agent` and `/qa-agent-advocate` appear only inside the quoted prompt (controller ruling); no text from those skills. Denylist scan: 0 matches. All prompts come from the two logs; no invented number |

## Fixes made

1. Row 11: flow intro now says "The hunt took two days" and that the GitHub issues came after the hunt.
2. Row 18: "ran that test" changed to "ran a test of the same kind".
3. Row 29: "removed the new file" changed to "confirmed that the new file was gone" (the log wording).
4. Row 30: "one afternoon" changed to "one day of work (2026-10-03)".
5. Row 33: "six fields and a confidence" changed to "six fields, and one of them is a confidence".
6. Row 52: two `…` markers added to the hook script excerpt for the omitted `what=` lines. The research note excerpt line was updated to match.

Open FAILs: 0
