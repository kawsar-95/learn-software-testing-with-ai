# Skills & Commands — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as the raw Markdown of the same page (URL plus `.md`). The URLs below are the canonical page URLs.

## Sources
S1. Extend Claude with skills — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/skills — accessed 2026-10-10
S2. Commands — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S3. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S4. Permissions — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/permissions — accessed 2026-10-10
S5. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
Supporting evidence (not a citable page): local `claude --help` and `claude plugin --help`, Claude Code 2.1.294.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | A skill is a `SKILL.md` file. Claude uses it when relevant, or you invoke it with `/skill-name`. | "Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`." | S1 | |
| C2 | A skill body loads only when the skill is used. Long reference material costs almost nothing until then. | "Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it." | S1 | Use for "skill vs CLAUDE.md" advice. |
| C3 | Skills follow the Agent Skills open standard. Claude Code adds invocation control, subagent execution, and dynamic context injection. | "Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard" | S1 | agentskills.io not fetched. Cite only the sentence on S1. |
| C4 | Personal skills live at `~/.claude/skills/<skill-name>/SKILL.md` and load in all your projects on that machine. | "`~/.claude/skills/<skill-name>/SKILL.md` \| All your projects on this machine" | S1 | Not loaded in Cowork or cloud sessions (see C27). |
| C5 | Project skills live at `.claude/skills/<skill-name>/SKILL.md`. Commit the folder to share it with the team. | "`.claude/skills/<skill-name>/SKILL.md` \| Sessions in this repository. Commit it so your team gets it too" | S1 | |
| C6 | Plugin skills live at `<plugin>/skills/<skill-name>/SKILL.md`. They run as `/plugin-name:skill-name`. | "`<plugin>/skills/<skill-name>/SKILL.md` \| Wherever the plugin is enabled, as `/plugin-name:skill-name`" | S1 | |
| C7 | Other locations exist: enterprise (managed settings directory), nested `<subdir>/.claude/skills/`, and directories added with `--add-dir`. | "Enterprise", "Nested", "Additional directory" rows of the location table | S1 | Also a claude.ai account location (synced skills). |
| C8 | Name clash rule: enterprise beats personal, personal beats project. A skill beats a `.claude/commands/` file with the same name. Plugin skills are namespaced, so they do not clash. | "Enterprise over personal, and personal over project." / "A skill and a file in `.claude/commands/` \| The skill" | S1 | |
| C9 | Skills in a `.claude/skills/` directory below the start directory do not load at startup. They load when Claude reads or edits a file there. | "Skills in a `.claude/skills/` directory below where you started don't load at startup." | S1 | Monorepo note. |
| C10 | Custom commands are merged into skills. A command file and a skill with the same name both create the same `/name`. | "**Custom commands have been merged into skills.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way." | S1 | |
| C11 | Existing `.claude/commands/` files keep working. A command file supports the same frontmatter except `name` and `paths`. New work should use skills. | "Your existing `.claude/commands/` files keep working." / "It supports the same frontmatter except `name` and `paths`." / "Prefer a skill for new work" | S1 | Legacy format. |
| C12 | A command file in a `.claude/commands/` subfolder gets a `:` name. | "`.claude/commands/frontend/component.md` → `/frontend:component`" | S1 | |
| C13 | A skill folder can hold supporting files. Keep `SKILL.md` under 500 lines. | "Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files." | S1 | Folder example: `SKILL.md`, `reference.md`, `examples.md`, `scripts/helper.py`. |
| C14 | The frontmatter sits between `---` markers. It is read only if the opening `---` is the first line of the file. | "Claude Code reads the frontmatter only when the opening `---` is the file's first line." | S1 | |
| C15 | All frontmatter fields are optional. Only `description` is recommended. A wrong field name is ignored with no error. | "All fields are optional. Only `description` is recommended so Claude knows when to use the skill. A field name must match the table exactly, hyphens included: Claude Code ignores a field it doesn't recognize without reporting an error." | S1 | Verifies audit item "frontmatter fields". |
| C16 | `name` sets the command name. It defaults to the directory name. | "Command name shown in the `/` menu. Defaults to the directory name." | S1 | |
| C17 | `description` says what the skill does and when to use it. Claude uses it to decide when to apply the skill. Put the key use case first. | "What the skill does and when to use it. Claude uses this to decide when to apply the skill." | S1 | Audit: old descriptions lacked "when to use". |
| C18 | `description` and `when_to_use` together are cut at 1,536 characters in the skill listing. | "the combined `description` and `when_to_use` text is truncated at 1,536 characters in the skill listing" | S1 | `when_to_use` is the one field with an underscore. |
| C19 | `allowed-tools` lets Claude use the listed tools without asking, only for the turn that invokes the skill. The grant clears on your next message. It accepts a space- or comma-separated string, or a YAML list. | "Tools Claude can use without asking permission during the turn that invokes this skill. The grant clears when you send your next message." | S1 | |
| C20 | `allowed-tools` does not restrict tools. Every tool stays callable. Permission settings still apply to unlisted tools. | "It does not restrict which tools are available: every tool remains callable, and your permission settings still govern tools that are not listed." | S1 | Common error: treating it as an allowlist/sandbox. |
| C21 | Example: `allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)`. | exact line in the `commit` example | S1 | |
| C22 | Review `allowed-tools` of a repository skill before you run Claude Code there. | "A skill can grant itself broad tool access, so review the `allowed-tools` of skills checked into a repository before you run Claude Code there." | S1 | QA security note. |
| C23 | `disallowed-tools` removes tools from Claude's pool while the skill is active. It clears on the next message. | "Tools removed from Claude's available pool while this skill is active." | S1 | |
| C24 | `disable-model-invocation: true` stops Claude from loading the skill on its own. You still run it with `/name`. Default `false`. It also blocks preloading into subagents. | "Set to `true` to prevent Claude from automatically loading this skill. Use for workflows you want to trigger manually with `/name`. Also prevents the skill from being preloaded into subagents." | S1 | |
| C25 | `user-invocable: false` hides the skill from the `/` menu. Only Claude invokes it. Default `true`. | "Set to `false` when only Claude should invoke the skill: Claude Code hides it from the `/` menu and doesn't run it when you type `/name`." | S1 | For background knowledge skills. |
| C26 | Description context cost: by default the description is always in context and the full skill loads on invocation. With `disable-model-invocation: true` the description is not in context. | Table: "(default) \| Yes \| Yes \| Description always in context, full skill loads when invoked"; "`disable-model-invocation: true` \| Yes \| Not on its own \| Description not in context, full skill loads when invoked" | S1 | |
| C27 | Personal skills in `~/.claude/skills/` are not read in Cowork or cloud sessions. | "don't read `~/.claude/skills/` on your machine" | S1 | Matters for CI/routines; see GitHub Actions page. |
| C28 | `context: fork` runs the skill in a forked subagent. The `agent` field picks the subagent type. Built-in options: `Explore`, `Plan`, `general-purpose`, or any custom subagent from `.claude/agents/`. Default `general-purpose`. | "Options include built-in agents (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. If omitted, uses `general-purpose`." | S1 | Use for `/qa-agent`-style commands (outline). |
| C29 | A forked skill gets the skill content as its task. The subagent does not see the conversation history. | "The subagent doesn't see your conversation history, so the skill's instructions have to stand on their own." | S1 | |
| C30 | A forked skill runs in the background by default (v2.1.218 or later). `background: false` waits for the result. | "`background` ... Only applies with `context: fork`. Set to `false` to wait for the forked subagent's result ... Default: `true`. Requires Claude Code v2.1.218 or later." | S1 | |
| C31 | `context: fork` only suits skills with an explicit task. A skill with only guidelines returns no useful output. | "`context: fork` only makes sense for skills with explicit instructions." | S1 | |
| C32 | The two directions: skill with `context: fork` (skill = task, agent type = system prompt) versus subagent with `skills:` (subagent body = system prompt, skills = reference). | Table "Skill with `context: fork`" / "Subagent with `skills` field" | S1 | Links to subagents page. |
| C33 | `arguments` declares named positional arguments for `$name` substitution. It takes a space-separated string or a YAML list. `argument-hint` shows a hint in autocomplete. | "Named positional arguments for `$name` substitution ... Names map to argument positions in order." / "`[issue-number]` or `[filename] [format]`" | S1 | Audit asked to verify `arguments`: it exists. |
| C34 | Substitutions: `$ARGUMENTS`, `$ARGUMENTS[N]`, `$N` (0-based), `$name`, `${CLAUDE_SESSION_ID}`, `${CLAUDE_EFFORT}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}`. | Table "Available string substitutions" | S1 | `${CLAUDE_PROJECT_DIR}` needs v2.1.196 or later. |
| C35 | If a skill has no placeholder, Claude Code appends `ARGUMENTS: <value>` to the content. | "Claude Code appends `ARGUMENTS: <your input>` to the end of the skill content" | S1 | Old commands page used `$ARGUMENTS` already. |
| C36 | Multi-word arguments need quotes. `/my-skill "hello world" second` gives `$0` = `hello world`. | "Indexed arguments use shell-style quoting" | S1 | |
| C37 | You can stack skills at the start of one message. Claude Code expands the first skill plus up to five more. | "Claude Code expands the first skill plus up to five more stacked after it." | S1 | |
| C38 | `` !`<command>` `` runs a shell command before Claude sees the skill. The output replaces the placeholder. A failed command aborts the whole invocation. Add `\|\| true` to a command that can exit non-zero. | "The `` !`<command>` `` syntax runs shell commands before the skill content is sent to Claude." / "A failed command aborts the entire skill invocation, not just its own placeholder. Claude never sees the skill content for that invocation." / "append `\|\| true` to any other command you expect to exit non-zero" | S1 | Injected commands also pass permission rules first; pre-approve with `allowed-tools` (section "Permission checks on injected commands"). |
| C39 | Other fields: `model`, `effort` (`low`, `medium`, `high`, `xhigh`, `max`), `hooks`, `paths`, `shell` (`bash` or `powershell`), `metadata`, `license`, `compatibility`. | Frontmatter table rows | S1 | |
| C40 | Where you type the name matters. At the start of the message, `/deploy staging` runs the skill. After plain text, the name only gives permission. | "At the start of your message \| `/deploy staging` \| Claude Code runs the skill directly" | S1 | |
| C41 | Invoked skill content stays in the conversation. `allowed-tools` grant does not stay. After auto-compaction Claude Code keeps the first 5,000 tokens of each recent skill, within a 25,000-token shared budget. | "keeping the first 5,000 tokens of each. Re-attached skills share a combined budget of 25,000 tokens." | S1 | Put key rules at the top of `SKILL.md`. |
| C42 | Claude Code watches skill directories. Edits apply in the same session. For a new top-level skills directory run `/reload-skills`. | "run [`/reload-skills`] to pick up the skills you put there" | S1, S2 | |
| C43 | Skill descriptions share a listing budget of 1% of the context window. Long lists lose descriptions. `/doctor` and `/skill-doctor` show cost. | "The budget scales at 1% of the model's context window." | S1 | |
| C44 | If Claude skips a rule that must hold every time, move the rule into a hook. A skill can define the hook in its `hooks` frontmatter. | "**Claude skipped a rule that must hold every time**: move the rule into a [hook]" | S1 | Link to Hooks page. |
| C45 | Check frontmatter with `claude plugin validate .claude/skills` (v2.1.233 or later). | "`claude plugin validate .claude/skills` for project skills or `claude plugin validate ~/.claude/skills` for personal skills. Requires Claude Code v2.1.233 or later." | S1 | Local `claude plugin validate --help`: "Validate a plugin or marketplace manifest, or the skills, agents, and commands in a directory". |
| C46 | Bundled skills ship with Claude Code. Examples: `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api`. They are prompt-based. | "Claude Code includes a set of bundled skills, such as `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, and `/claude-api`." | S1 | |
| C47 | `/verify` runs only when you invoke it. | "others, including `/verify`, run only when you invoke them" | S1 | |
| C48 | `/run`, `/verify`, `/run-skill-generator` work together. `/verify` builds and runs the app to confirm a change, not only tests or type checks. | "Build and run your app to confirm a code change does what it should, without falling back to tests or type checks" | S1 | QA angle: acceptance check of a change in the real app. |
| C49 | `disableBundledSkills` setting turns bundled skills off. | "To turn bundled skills off, use the `disableBundledSkills` setting." | S1 | |
| C50 | A skill named `verify` or `simplify` in your own skill locations makes Claude run it before each commit (v2.1.286+), except docs or tests changes. | "tell Claude to run it right before each commit, except for changes to docs or tests. This requires Claude Code v2.1.286 or later." | S1 | Optional QA tip. |
| C51 | `/init` creates a starter `CLAUDE.md`. `CLAUDE_CODE_NEW_INIT=1` gives an interactive flow that also covers skills and hooks. | "Initialize project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files." | S2 | |
| C52 | `/memory` edits `CLAUDE.md` files, toggles auto memory, and shows auto memory entries. | "Edit `CLAUDE.md` files, enable or disable auto memory, and view auto memory entries" | S2 | |
| C53 | `/mcp` manages MCP connections and OAuth. `/mcp reconnect all`, `enable`, `disable` also work. | "Manage MCP server connections and OAuth authentication." | S2 | |
| C54 | `/plan [description]` enters plan mode from the prompt. | "Enter plan mode directly from the prompt." | S2 | |
| C55 | `/permissions` manages allow, ask, and deny rules. Alias `/allowed-tools`. | "Manage allow, ask, and deny rules for tool permissions." / "Alias: `/allowed-tools`" | S2 | |
| C56 | `/context` shows context usage as a colored grid. `/compact [instructions]` summarizes the conversation to free context. | "Visualize current context usage as a colored grid." / "Free up context by summarizing the conversation so far." | S2 | |
| C57 | `/code-review` checks the current diff, a PR number, branch, or path for correctness bugs. `--fix` applies findings. `--comment` posts them. `/review` is an alias. Effort levels `low` to `ultra`. | "`/code-review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [--max-findings n\|all\|default] [pr#\|branch\|path]` ... **Skill.**" / "`/review` is an alias." | S2 | `/code-review` is a bundled skill. `ultra` runs a cloud review. |
| C58 | `/security-review` analyzes the branch diff against origin's default branch for injection, auth issues, data exposure. It needs an `origin` remote. | "Reviews the diff between your branch and origin's default branch, identifying risks like injection, auth issues, and data exposure. Needs an `origin` remote" | S2 | |
| C59 | `/init` and `/security-review` are also available through the Skill tool. `/compact` is not. | "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`. Other built-in commands such as `/compact` are not." | S1 | |
| C60 | `/skills` lists skills. `/hooks` shows hooks. `/agents` prints a reminder to ask Claude or edit `.claude/agents/`. `/plugin` manages plugins. | rows of the command table | S2 | `/agents` changed after v2.1.197 (see Subagents notes). |
| C61 | A command is recognized only at the start of the message. Text after it is arguments. | "A command is only recognized at the start of your message." | S2 | |
| C62 | Typical flow: `/init`, then `/memory`, `/mcp`, `/permissions`. During a task: `/plan`, `/context`, `/compact`. Before ship: `/diff`, `/code-review`, `/security-review`. | "Commands across a typical workflow" section | S2 | Good outline for QA. |
| C63 | A skill with the same name as a built-in command replaces it in a local terminal session, but not its aliases. | "your skill replaces the built-in command, but not its aliases" | S1 | Example: project `code-review` skill replaces `/code-review`; `/review` still runs the bundled alias. |
| C64 | `claude --disable-slash-commands` disables all skills. | local help: "--disable-slash-commands              Disable all skills" | local help | Supporting evidence only. |
| C65 | Project `allowed-tools` apply even in `-p` runs in untrusted folders. | "Claude Code applies a project skill's `allowed-tools` even in a `-p` run in a folder you've never trusted." | S1 | CI safety note. |
| C66 | MCP prompts also show as commands: `/mcp__servername__promptname`. | see MCP notes | — | Cross-link only; claim lives in extend-mcp.md. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| skills.mdx › What is Skill? | rewrite | Add C1, C2: skill = `SKILL.md`, loads on demand, auto or `/name`. |
| skills.mdx › Available Skills (six cards) | keep, reword | Keep the six QA skills. Each gets a "when to use" description (C17). |
| skills.mdx › When to use | rewrite | Replace with description-based loading (C17, C26). |
| skills.mdx › Folder Structure | rewrite | Flat files were wrong. Use `.claude/skills/<name>/SKILL.md` (C4, C5, C13). |
| skills.mdx › SKILL.md Files (all six) | rewrite | Add frontmatter (`description`, `allowed-tools`, `disable-model-invocation`). Replace "Tool Usage (MANDATORY)" prose with `allowed-tools`. Keep output formats and rules. |
| skills.mdx › test-design skill body | rewrite | Count-only design. Hand off technique content to Test Design page (spec row 6). Keep the skill shell here. |
| commands.mdx › What is Command? | merge | Now "commands are skills" (C10, C11). |
| commands.mdx › Create Command (`commands/` folder, `$ARGUMENTS`) | rewrite | Legacy format works (C11). Show a skill with `context: fork` + `agent: qa-agent` instead (C28, C33). Keep `$ARGUMENTS` (C34). |
| (new) built-in commands | add | C51 to C62. Audit: "No built-in commands". |
| (new) frontmatter reference | add | C15 to C39. Audit: missing fields. |

## Page outline
- ## What a skill is — C1, C2, C3. A skill is a folder with `SKILL.md`. Auto load by description or `/name`.
  - ### Skills, commands, and CLAUDE.md — C10, C11, C2. Commands merged. When to use a skill instead of a CLAUDE.md section.
- ## Where skills live — C4 to C9, C27. Table: personal, project, plugin, enterprise. Precedence (C8). QA tip: commit project skills so the team shares them.
- ## Write a SKILL.md — C13, C14, C15. First example: a `find-bug` skill.
  - ### Frontmatter fields — C16 to C25, C33, C39. One table. Mark the fields that matter for QA.
  - ### Who can invoke a skill — C24, C25, C26, C40. Table of the three modes.
  - ### Pre-approve tools — C19 to C22. Warning: `allowed-tools` is not an allowlist (C20).
  - ### Arguments and substitutions — C33 to C37. `/test-design checkout.js`.
  - ### Inject live data — C38. Example: `!`git diff HEAD`` in a review skill.
  - ### Run a skill in a subagent — C28 to C32. Example `qa-agent` skill with `context: fork` replaces the old `/qa-agent` command file.
- ## The six QA skills — rewrite each in the current format. Suggested frontmatter (derived from claims C15, C17, C19, C24; not new facts):
  - `analyze-requirement`: `description: Analyzes a requirement or Jira ticket for scope, risks, gaps, and edge cases. Use when the user shares a ticket, story, or spec.`
  - `explain-code`: `description: Explains the flow and logic of a file or change. Use when the user asks what code does or what a change affects.` Add `allowed-tools: Read Grep Glob`.
  - `find-bug`: `description: Finds high-probability bugs with evidence in code or a diff. Use after code changes or before test design.` `allowed-tools: Read Grep Glob`.
  - `test-design`: `description: Designs test cases for a feature or change using named techniques. Use when the user asks for test cases or coverage.` Link to Test Design page.
  - `analyze-security`: `description: Reviews code for real, relevant security issues with attack steps. Use for auth, payment, or data-handling changes.`
  - `analyze-rootcause`: `description: Ranks likely root causes from an error, log, or failing test. Use when the user pastes a stack trace or log.`
  - Keep each output format and rules from the old page. Replace "Tool Usage (MANDATORY)" with `allowed-tools`.
- ## Keep skills reliable — C41, C43, C44, C45, C13. Put key rules first. Use a hook for must-hold rules. Validate with `claude plugin validate`.
- ## Built-in commands for QA — C51 to C63. Table: `/init`, `/memory`, `/mcp`, `/plan`, `/permissions`, `/context`, `/compact`, `/code-review`, `/security-review`, `/verify`, plus `/skills`, `/hooks`, `/agents`, `/plugin`. QA angle: `/code-review --fix`, `/security-review` on a branch, `/verify` to run the app after a change (C48). Workflow order from C62.

## Open questions
- `/verify` and `/security-review` need a git `origin` or a runnable app. The page should say "if your project needs setup, run `/run-skill-generator`" (C48 source) and not promise results.
- Agent Skills spec (agentskills.io) was not fetched. State nothing beyond S1.
