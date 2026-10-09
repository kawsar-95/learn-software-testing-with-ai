# Fact-check: Skills & Commands (round 1-2, 2026-10-10)

Sources fetched 2026-10-10: [1] code.claude.com/docs/en/skills.md, [2] code.claude.com/docs/en/commands.md. All Cite numbers (1, 2) exist; both sources are cited. Local `claude --version` = 2.1.294; no `--help` check applies except `claude plugin validate --help` (lists `--strict`, `--json`).

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 1 | Lead paragraph | A skill turns a repeated procedure into a `/name` command that Claude can also use by itself | none | OPINION-OK | Lead summary; the facts are cited in "What a skill is". |
| 2 | What a skill is | `SKILL.md` with instructions; Claude uses it when relevant or you run `/skill-name` | 1 | PASS | "Create a `SKILL.md` file with instructions ... Claude uses skills when relevant, or you can invoke one directly with `/skill-name`." |
| 3 | What a skill is | Body loads only when used; long reference costs almost nothing | 1 | PASS | "a skill's body loads only when it's used, so long reference material costs almost nothing until you need it." |
| 4 | What a skill is | Follows the Agent Skills open standard | 1 | PASS | "Claude Code skills follow the Agent Skills open standard". |
| 5 | Skills and commands | `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy` | 1 | PASS | "both create `/deploy` and work the same way." |
| 6 | Skills and commands | Command files keep working; same frontmatter except `name` and `paths` | 1 | PASS | "It supports the same frontmatter except `name` and `paths`." |
| 7 | Skills and commands | Prefer a skill for new work | 1 | PASS | "Prefer a skill for new work, since skills also support supporting files." |
| 8 | Skills and commands | Same name: skill wins | 1 | PASS | Table: "A skill and a file in `.claude/commands/` \| The skill". |
| 9 | Callout "Legacy format" | Old `qa-agent.md`/`sdet-agent.md` in `.claude/commands/` "still work" | none | UNCITED | Checkable behavior with no Cite. Source 1 supports it ("Your existing `.claude/commands/` files keep working"). Add `<Cite n={1} />`. |
| 10 | Skill, CLAUDE.md, or hook? | CLAUDE.md row: Claude must always know it | none | OPINION-OK | Advice on where to put content; no checkable value. |
| 11 | Skill, CLAUDE.md, or hook? | Skill row: needed only for some tasks | 1 | PASS | "a section of CLAUDE.md has grown into a procedure rather than a fact ... a skill's body loads only when it's used". |
| 12 | Skill, CLAUDE.md, or hook? | Hook row: if Claude skips a rule that must always hold, move it into a hook | 1 | PASS | "Claude skipped a rule that must hold every time: move the rule into a hook." |
| 13 | Where skills live | Personal path `~/.claude/skills/<skill-name>/SKILL.md`, all projects on this machine | 1 | PASS | Location table, Personal row. |
| 14 | Where skills live | Project path `.claude/skills/<skill-name>/SKILL.md`; commit it | 1 | PASS | "Sessions in this repository. Commit it so your team gets it too". |
| 15 | Where skills live | Plugin path `<plugin>/skills/<skill-name>/SKILL.md`, as `/plugin-name:skill-name` | 1 | PASS | Plugin row. |
| 16 | Where skills live | Other locations: enterprise, nested `<subdir>/.claude/skills/`, `--add-dir` | 1 | PASS | Enterprise, Nested, Additional directory rows. |
| 17 | Where skills live | Enterprise over personal over project; plugin skills namespaced | 1 | PASS | "Enterprise over personal, and personal over project" and "plugin skills are namespaced as `/plugin-name:skill-name`". |
| 18 | Where skills live | Monorepo: skills below the start folder load when Claude reads/edits a file there | 1 | PASS | "They load the first time Claude reads or edits a file in that subdirectory". |
| 19 | Where skills live | Cowork and cloud sessions do not read `~/.claude/skills/` | 1 | PASS | "don't read `~/.claude/skills/` on your machine." |
| 20 | Write a SKILL.md | `SKILL.md` required; other files optional; tree example | 1 | PASS | "SKILL.md (required - overview and navigation)"; tree matches. |
| 21 | Write a SKILL.md | Keep `SKILL.md` under 500 lines | 1 | PASS | "Keep `SKILL.md` under 500 lines." |
| 22 | Write a SKILL.md | Frontmatter read only if opening `---` is the first line; all fields optional; only `description` recommended | 1 | PASS | "Claude Code reads the frontmatter only when the opening `---` is the file's first line." "All fields are optional. Only `description` is recommended". |
| 23 | Write a SKILL.md | `find-bug` example (description, `allowed-tools: Read Grep Glob`, `argument-hint`, `$ARGUMENTS`) | none | EXAMPLE-OK | Labeled "Example". Space-separated `allowed-tools` is documented in the frontmatter table. `argument-hint: [file-or-commit]` is an unquoted YAML flow list; the docs table gives `[issue-number]` as the hint text, but the docs' own YAML samples use `<issue-number>` (claude-directory.md). Suggest quoting or `<...>`. |
| 24 | Callout "misspelled field" | Unknown field is ignored with no error | 1 | PASS | "Claude Code ignores a field it doesn't recognize without reporting an error." |
| 25 | Callout "misspelled field" | "Check your skills with `claude plugin validate .claude/skills` (v2.1.233+)" implies it finds a misspelled field | 1 | FAIL | Source 1 says validate is for frontmatter that does not parse: "To find `SKILL.md` files whose frontmatter doesn't parse, run `claude plugin validate` ... Requires Claude Code v2.1.233 or later." It does not say validate flags misspelled field names. Fix: say it finds frontmatter that fails to parse, or drop the implication. |
| 26 | Write the description | Description says what and when; Claude uses it to decide | 1 | PASS | "What the skill does and when to use it. Claude uses this to decide when to apply the skill." |
| 27 | Write the description | `description` + `when_to_use` cut at 1,536 characters; key use case first | 1 | PASS | "combined `description` and `when_to_use` text is truncated at 1,536 characters". |
| 28 | Write the description | Description always in context by default; full skill loads when invoked | 1 | PASS | Invocation table, default row. |
| 29 | Write the description (cards) | Good/bad description examples | none | OPINION-OK | Style advice. |
| 30 | Who can invoke a skill | Table: default; `disable-model-invocation: true` (description not in context) | 1 | PASS | Table rows match source. |
| 31 | Who can invoke a skill | `disable-model-invocation` also stops preloading into subagents | 1 | PASS | "Also prevents the skill from being preloaded into subagents." |
| 32 | Who can invoke a skill | `user-invocable: false`: hidden from `/` menu, not run on `/name` | 1 | PASS | "Claude Code hides it from the `/` menu and doesn't run it when you type `/name`." |
| 33 | Pre-approve tools | `allowed-tools` lets Claude use tools without asking during the invoking turn; clears on next message | 1 | PASS | "The grant clears when you send your next message." |
| 34 | Pre-approve tools | Value is space/comma string or YAML list | 1 | PASS | "Accepts a space- or comma-separated string, or a YAML list." |
| 35 | Pre-approve tools | `allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)` from the docs | 1 | PASS | Identical line in the "commit" example. |
| 36 | Callout "allowed-tools as a sandbox" | Does not restrict tools; permission settings still apply | 1 | PASS | "It does not restrict which tools are available: every tool remains callable". |
| 37 | Callout "allowed-tools as a sandbox" | Use `disallowed-tools` to remove tools | 1 | PASS | "list them in `disallowed-tools`". |
| 38 | Callout "Review skills" | A skill can grant itself broad tool access; review `allowed-tools` | 1 | PASS | "A skill can grant itself broad tool access, so review the `allowed-tools`". |
| 39 | Callout "Review skills" | Project skill `allowed-tools` applies even in `-p` run in untrusted folder | 1 | PASS | "applies a project skill's `allowed-tools` even in a `-p` run in a folder you've never trusted." |
| 40 | Arguments | Text after skill name is arguments; `$ARGUMENTS` replaced | 1 | PASS | "`$ARGUMENTS` ... All arguments passed when invoking the skill." |
| 41 | Arguments | No placeholder: `ARGUMENTS: <your input>` appended | 1 | PASS | "Claude Code appends `ARGUMENTS: <your input>` to the end of the skill content". |
| 42 | Arguments | `$0`, `$1` counted from 0; shell-style quotes; `"hello world"` example | 1 | PASS | "`/my-skill "hello world" second` makes `$0` expand to `hello world`". |
| 43 | Arguments | `arguments` names positions; `argument-hint` e.g. `[issue-number]` | 1 | PASS | Frontmatter table rows. |
| 44 | Arguments | `/test-design src/checkout.js` at the start of a message runs the skill | 1 | PASS | "`/deploy staging` \| Claude Code runs the skill directly" (same rule). |
| 45 | Arguments | Command recognized only at the start of a message | 2 | PASS | "A command is only recognized at the start of your message." |
| 46 | Inject live data | `` !`<command>` `` runs before Claude sees the skill; output replaces placeholder | 1 | PASS | "The command output replaces the placeholder". |
| 47 | Inject live data | Injected commands go through permission rules; `allowed-tools` can pre-approve | 1 | PASS | "Claude Code checks each one against your permission rules first ... pre-approve it with `allowed-tools`." |
| 48 | Inject live data | Review-change example (`allowed-tools: Bash(git diff *)`, `!`git diff HEAD``) | none | EXAMPLE-OK | Labeled "Example"; `` !`git diff HEAD` `` appears in the docs' first skill. |
| 49 | Inject live data | A failed command stops the whole skill; add `\|\| true` | 1 | PASS | "A failed command aborts the entire skill invocation ... append `\|\| true`". |
| 50 | Run a skill in a subagent | `context: fork`; `agent` options `Explore`, `Plan`, `general-purpose`, custom; default `general-purpose` | 1 | PASS | "Options include built-in agents (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`." |
| 51 | Run a skill in a subagent | Skill content is the task; no conversation history | 1 | PASS | "The subagent doesn't see your conversation history". |
| 52 | Run a skill in a subagent | `context: fork` suits only skills with an explicit task | 1 | PASS | "`context: fork` only makes sense for skills with explicit instructions." |
| 53 | Run a skill in a subagent | Forked skill runs in background by default; `background: false` waits; v2.1.218+ | 1 | PASS | "Set `background: false` ... Requires Claude Code v2.1.218 or later." |
| 54 | Run a skill in a subagent | `qa-task` fork skill (`agent: qa-agent`, `background: false`, `disable-model-invocation: true`) | none | EXAMPLE-OK | Labeled "Example"; every field is documented in source 1. Same `[task]` flow-list note as row 23. |
| 55 | Run a skill in a subagent | Table: skill+fork = system prompt from agent type, task = skill content; subagent+`skills:` = subagent body, Claude's request | 1 | PASS | Source table: "From agent type \| SKILL.md content" and "Subagent's markdown body \| Claude's delegation message". |
| 56 | Six example QA skills | Intro: "examples, not a required set"; uses `allowed-tools` instead of "Tool Usage (MANDATORY)" | none | OPINION-OK | Editorial framing about this tutorial. |
| 57 | Six example QA skills | `analyze-requirement`, `explain-code` (`Bash(git show *)`), `test-design`, `analyze-security`, `analyze-rootcause` bodies | none | EXAMPLE-OK | Labeled as examples in the section intro; only documented frontmatter used (`description`, `allowed-tools`, `argument-hint`, `disable-model-invocation`). Skill bodies mention "Jira MCP server" and "read-only database MCP server" with no `mcp__` names, so no undocumented syntax. |
| 58 | Keep skills reliable | After compaction: first 5,000 tokens of each recent skill, shared 25,000-token budget | 1 | PASS | "keeping the first 5,000 tokens of each ... share a combined budget of 25,000 tokens." |
| 59 | Keep skills reliable | Descriptions share a budget of 1% of the context window | 1 | PASS | "The budget scales at 1% of the model's context window." |
| 60 | Keep skills reliable | Folders are watched; new top-level folder needs `/reload-skills` | 1, 2 | PASS | S1: "run `/reload-skills` to pick up the skills you put there." S2: `/reload-skills` row. |
| 61 | Keep skills reliable | A skill can define a hook in its `hooks` frontmatter | 1 | PASS | `hooks` row: "Hooks that Claude Code registers when the skill is invoked". |
| 62 | Keep skills reliable | "Validate in CI. Run `claude plugin validate .claude/skills`" | 1 | PASS | Command is documented (see row 25). "in CI" is advice. `claude plugin validate --help` lists `--strict` "Use in CI". |
| 63 | Built-in commands | `/init` creates starter `CLAUDE.md`; `CLAUDE_CODE_NEW_INIT=1` interactive flow covers skills, hooks, personal memory files | 2 | PASS | "Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files." |
| 64 | Built-in commands | `/memory`, `/mcp` | 2 | PASS | "Edit `CLAUDE.md` files, enable or disable auto memory, and view auto memory entries"; "Manage MCP server connections and OAuth authentication". |
| 65 | Built-in commands | `/permissions`, alias `/allowed-tools` | 2 | PASS | "Alias: `/allowed-tools`". |
| 66 | Built-in commands | `/plan [description]`, `/context` colored grid, `/compact [instructions]` | 2 | PASS | Matching rows in source 2. |
| 67 | Built-in commands | `/code-review` scope, `--fix`, `--comment`, `/review` alias | 2 | PASS | "Pass `--fix` to apply findings, `--comment` to post them"; "`/review` ... Alias of `/code-review`". |
| 68 | Built-in commands | `/security-review` diff vs origin default branch; needs `origin` remote | 2 | PASS | "Reviews the diff between your branch and origin's default branch ... Needs an `origin` remote". |
| 69 | Built-in commands | `/verify` builds and runs the app, not tests or type checks | 1 | PASS | "Build and run your app to confirm a code change does what it should, without falling back to tests or type checks." |
| 70 | Built-in commands | `/skills`, `/hooks`, `/plugin` do list / show / manage | 2 | PASS | Rows: "List available skills"; "View hook configurations"; "Manage Claude Code plugins". |
| 71 | Built-in commands | `/agents` prints a reminder | 2 | PASS | "Print a reminder to ask Claude to create or manage subagents, or to edit `.claude/agents/`". |
| 72 | Built-in commands | Typical order incl. `/diff` | 2 | PASS | "First session in a repo", "During a task", "Before you ship. `/diff` shows what changed." |
| 73 | Built-in commands | `/code-review`, `/doctor`, `/batch`, `/debug`, `/loop`, `/claude-api` are bundled skills; `disableBundledSkills` turns them off | 1 | PASS | "bundled skills, such as `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, and `/claude-api`"; "use the `disableBundledSkills` setting". |
| 74 | Built-in commands | `/verify` runs only when invoked; works with `/run` and `/run-skill-generator` | 1 | PASS | "others, including `/verify`, run only when you invoke them"; "Three bundled skills work together". |
| 75 | Built-in commands | Own skill with a built-in name replaces the command locally, not its aliases | 1 | PASS | "In a local terminal session, your skill replaces the built-in command, but not its aliases." |
| 76 | Callout "Run your own check" | Naming a skill `verify`/`simplify` means "you can tell Claude to run it before each commit"; v2.1.286+ | 1 | FAIL | Source: "Claude Code's commit instructions tell Claude to run it right before each commit ... This requires Claude Code v2.1.286 or later." It is automatic, not something you tell Claude. It also needs: skill in enterprise/personal/project/add-dir location or `.claude/commands/`, Claude able to invoke it (not `disable-model-invocation: true`), and `includeGitInstructions` on. Fix the wording and add the conditions. |
| 77 | Reference: Frontmatter fields | `name`, `description`, `when_to_use`, `allowed-tools`, `disallowed-tools`, `disable-model-invocation`, `user-invocable`, `arguments`, `argument-hint`, `context`/`agent`/`background`, `model`/`effort` (`low`..`max`), `hooks`, `shell` (`bash`/`powershell`), `paths`/`metadata`/`license`/`compatibility` | 1 | PASS | All match the frontmatter table (effort: "`low`, `medium`, `high`, `xhigh`, `max`"; shell: "`bash` (default) or `powershell`"). |
| 78 | Reference: Substitutions | `$ARGUMENTS`, `$ARGUMENTS[N]`/`$N`, `$name` | 1 | PASS | String substitutions table. |
| 79 | Reference: Substitutions | `${CLAUDE_SESSION_ID}`, `${CLAUDE_EFFORT}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}` (v2.1.196+) | 1 | PASS | "The `${CLAUDE_PROJECT_DIR}` substitution requires Claude Code v2.1.196 or later." |
| 80 | Reference | Stack skills: first plus up to five more | 1 | PASS | "Claude Code expands the first skill plus up to five more stacked after it." |
| 81 | Nav description (lib/nav.ts) | "SKILL.md files and built-in commands: find-bug, test-design, explain-code, and more." | n/a | FAIL | The colon makes `find-bug`, `test-design`, `explain-code` read as built-in commands. They are this tutorial's example skills; the built-in commands are `/init`, `/memory`, etc. Fix: "SKILL.md files, example QA skills (find-bug, test-design, explain-code), and the built-in commands testers use." |
| 82 | Nav tagline (lib/nav.ts) | "turn a good prompt into a command" | n/a | OPINION-OK | Marketing phrase; no checkable claim. |

Round 1 Open FAILs: 4 (row 9 UNCITED, row 25 FAIL, row 76 FAIL, row 81 FAIL)

## Round 2 (2026-10-10, commit 050af01 vs 8b9ad68)

Re-checked: every round-1 non-PASS row, every changed line (`git diff 8b9ad68 050af01`), and the skills nav description. Source numbering unchanged (1 = skills, 2 = commands). Sources re-fetched this round.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| 9 | Callout "Legacy format" | Old `.claude/commands/` agent files "still work" | 1 | PASS | Cite 1 added. Source: "Your existing `.claude/commands/` files keep working." |
| 25 | Callout "misspelled field" | "Check the spelling yourself. To find `SKILL.md` files whose frontmatter does not parse, run `claude plugin validate .claude/skills` (v2.1.233+)" | 1 | PASS | Overclaim removed. Source: "To find `SKILL.md` files whose frontmatter doesn't parse, run `claude plugin validate` ... for example `claude plugin validate .claude/skills` ... Requires Claude Code v2.1.233 or later." |
| 62 | Keep skills reliable | "`claude plugin validate .claude/skills` finds `SKILL.md` files whose frontmatter does not parse" (changed line) | 1 | PASS | Same quote as row 25. |
| 76 | Callout "Run your own check" | Claude Code's commit instructions tell Claude to run `verify`/`simplify` before each commit, except docs/tests; v2.1.286+; three conditions (location incl. `.claude/commands/`; Claude can invoke it, no `disable-model-invocation: true`; `includeGitInstructions` on) | 1 | PASS | Source: "Claude Code's commit instructions tell Claude to run it right before each commit, except for changes to docs or tests. This requires Claude Code v2.1.286 or later." Conditions: "loads from the enterprise, personal, project, or additional-directory location, or from a `.claude/commands/` file"; "If you've stopped Claude from invoking it ... `disable-model-invocation: true`, Claude doesn't get the instruction"; "you haven't turned off `includeGitInstructions`". |
| 81 | Nav description (lib/nav.ts) | "SKILL.md files, example QA skills (find-bug, test-design, explain-code), and the built-in commands testers use." | n/a | PASS | Example skills are now separate from built-in commands; matches the sections "Six example QA skills" and "Built-in commands for QA". |

Cite check: all Cite numbers are 1 or 2; both sources are cited. The diff touches only the five rows above; all other round-1 rows stand.

Open FAILs: 0
