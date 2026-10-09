# Plugins & Marketplaces — research notes (2026-10-10)

Fetch note: each code.claude.com page was fetched as raw Markdown (URL plus `.md`). The README and `marketplace.json` files came from raw.githubusercontent.com. The URLs below are the canonical pages.

## Sources
S1. Plugins overview — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/overview — accessed 2026-10-10
S2. Install and manage plugins — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/install — accessed 2026-10-10
S3. Anthropic's marketplaces — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/anthropic-marketplaces — accessed 2026-10-10
S4. Plugin security and trust — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/security — accessed 2026-10-10
S5. Create a marketplace — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/create-marketplace — accessed 2026-10-10
S6. Marketplace reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/marketplace-reference — accessed 2026-10-10
S7. Plugin CLI reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/plugins/cli-reference — accessed 2026-10-10
S8. Commands — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S9. Superpowers README — Jesse Vincent / Prime Radiant (GitHub, obra/superpowers) — https://github.com/obra/superpowers — accessed 2026-10-10
S10. anthropics/claude-plugins-official `marketplace.json` — Anthropic (GitHub) — https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json — accessed 2026-10-10
S11. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
Supporting evidence (not a citable page): local `claude plugin --help`, `claude plugin install --help`, `claude plugin marketplace --help`, `claude plugin marketplace add --help`, `claude plugin list --help`, `claude plugin validate --help`, Claude Code 2.1.294. Quoted below as "local help".

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | A plugin is a directory of components that Claude Code installs and loads as one unit. | "A Claude Code plugin is a directory of skills, agents, hooks, MCP servers, or other components that Claude Code installs and loads as one unit." | S1 | |
| C2 | A plugin can bundle: skills, agents (subagents), hooks, MCP servers, and a hooks module (a "mod"). | "Skills", "Agents", "Hooks", "A hooks module", "MCP servers" bullets | S1 | |
| C3 | The manifest is `.claude-plugin/plugin.json`. It gives the plugin its name. | "The manifest, a JSON file at `.claude-plugin/plugin.json`, gives the plugin its name" | S1 | Manifest is "usually" present. |
| C4 | Layout example: `skills/review/SKILL.md`, `agents/reviewer.md`, `hooks/hooks.json`, `.mcp.json`. A plugin skill runs as `/my-plugin:review`. | Diagram alt text | S1 | |
| C5 | Use a plugin to package several components as one unit, to share a setup with a team, or to publish versioned releases. Stand-alone skills, subagents, hooks, and MCP servers work without a plugin. | "Use a plugin when you want several skills, subagents, hooks, or MCP servers packaged as one unit." | S1 | |
| C6 | An enabled plugin is part of every session. Names and descriptions of skills and agents Claude can invoke are in context each turn. | "An enabled plugin is part of every session, not only the sessions where you use it." | S1 | Context cost. `claude plugin details <name>` shows the cost. |
| C7 | Plugins in the official marketplace show a **Context cost** estimate in `/plugin`. | "Plugins in Anthropic's official marketplace show a **Context cost** estimate there." | S1 | |
| C8 | A marketplace is a repository or directory with `.claude-plugin/marketplace.json`. It is a catalog, not a hosted store. | "A marketplace is a repository or directory with a `.claude-plugin/marketplace.json` file that lists plugins and where to fetch each one. It's a catalog, not a hosted store." | S1 | |
| C9 | A plugin marketplace is not Claude Marketplace (claude.com/marketplace, a website). You cannot add that site with `/plugin marketplace add`. | "A plugin marketplace isn't Claude Marketplace." | S1 | Fixes audit High: `claudemarketplaces.com` is a community site. |
| C10 | The official marketplace name is `claude-plugins-official` (repo `anthropics/claude-plugins-official`). Claude Code adds it on the first interactive start. | "Claude Code adds it the first time you start an interactive terminal session, unless a managed policy or `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` blocks it." | S3 | |
| C11 | Anthropic has three general marketplaces: official `claude-plugins-official`; community `claude-community` (repo `anthropics/claude-plugins-community`); demo `claude-code-plugins` (repo `anthropics/claude-code`). | Table in S3 | S3 | `/plugin marketplace add anthropics/claude-code` adds the demo marketplace, not the official one. |
| C12 | Most plugins in the official marketplace come from partners and other authors, not Anthropic. | "Most of what it lists comes from partners and other authors rather than from Anthropic" | S3 | |
| C13 | Anthropic does not review third-party marketplaces. | "Anthropic doesn't review third-party marketplaces" | S3 | |
| C14 | Marketplace tiers: Official, Community, Third-party. Claude Code accepts official and community names only for marketplaces from `github.com/anthropics/` repos. | "so a third-party marketplace can't present itself as an Anthropic one" | S4 | |
| C15 | Open the plugin menu with `/plugin`. The **Discover** tab lists plugins. `/plugin install <name>@<marketplace>` opens the plugin's details so you choose a scope. | "In a session, this command doesn't install right away: it opens the `/plugin` panel on that plugin's details so you can review it and choose a scope first." | S2 | |
| C16 | `/plugin` subcommands include `list`, `install`, `enable`, `disable`. Run with no argument to open the menu. | "Run with no argument to open the plugin menu, or pass a subcommand such as `list`, `install`, `enable`, or `disable` to act directly." | S8 | `/plugin uninstall` also works (S2). |
| C17 | Install example: `/plugin install commit-commands@claude-plugins-official`. | exact | S2 | |
| C18 | Add a marketplace: `/plugin marketplace add <source>`. Sources: GitHub `owner/repo` (add `#ref` to pin), a git URL, a local path (start with `./`), a hosted `marketplace.json` URL (`https://`). | Source table | S2 | |
| C19 | `/plugin market` is a shorter form of `/plugin marketplace`. | "`/plugin market` also works as a shorter form of `/plugin marketplace`." | S2 | |
| C20 | One-step add and install: `/plugin install deploy-helper --marketplace your-org/plugins` (v2.1.275+ in session; shell form v2.1.292+). | exact | S2 | Local help: "--marketplace <source>  Install <plugin> (its bare name) from the marketplace at this source". |
| C21 | Manage marketplaces: `claude plugin marketplace list`, `update <name>`, `remove <name>` (and in session `/plugin marketplace ...`). Removing a marketplace uninstalls its plugins. | Table in S2 | S2 | Local help: `add`, `list`, `remove\|rm`, `update`. |
| C22 | Scopes: user (all your projects, `~/.claude/settings.json`), project (everyone on the repo, `.claude/settings.json`), local (you in this repo, `.claude/settings.local.json`). | "User scope ... `~/.claude/settings.json`" / "Project scope ... `.claude/settings.json`" / "Local scope ... `.claude/settings.local.json`" | S2 | Fixes audit Med: no scope info before. |
| C23 | If a plugin is set at several scopes, local overrides project, and project overrides user. | "the local setting overrides the project setting, and the project setting overrides the user setting" | S2 | |
| C24 | Committing a project-scope entry enables the plugin for teammates but does not download it. Each person runs `claude plugin install <name>@<marketplace> --scope project` once. | "Committing that entry turns the plugin on for your collaborators but doesn't download it to their machines" | S2 | |
| C25 | Shell CLI: `claude plugin install <plugin>` (`-s, --scope user|project|local`, default `user`), `uninstall` (alias `remove`), `enable`, `disable`, `update`, `list`, `details`, `validate`, `prune`, plus `marketplace` subcommands. | local help: "install|i [options] <plugin>  Install a plugin from available marketplaces (use plugin@marketplace for specific marketplace)" / "-s, --scope <scope>  Installation scope: user, project, or local (default: "user")" | local help; S7 | Also `init`, `configure`, `eval`, `tag`, `test` exist. |
| C26 | `claude plugin install` prints `Successfully installed plugin: formatter@your-org (scope: project)`. In scripts pass `--yes` to accept a marketplace-declared install command. | exact | S2 | |
| C27 | `claude plugin list` shows installed plugins. `--json` gives machine-readable output. | local help: "list [options]  List installed plugins" | local help | |
| C28 | `claude plugin details <name>` shows a plugin's component inventory and token cost. | local help: "details [options] <name>  Show a plugin's component inventory and projected token cost" | local help | |
| C29 | `claude plugin validate <path>` checks a plugin or marketplace manifest. `--strict` treats warnings as errors (CI). | local help: "--strict  Treat warnings as errors (exit 1). Use in CI" | local help | |
| C30 | `/reload-plugins` applies plugin changes in a running session. | "`Run /reload-plugins to apply.`" | S2 | After `claude plugin install` in the shell, plugins load on next start or `/reload-plugins`. |
| C31 | In `claude -p` runs `/plugin` is not available. Manage plugins with `claude plugin` commands. Installed plugins still load. | "`/plugin` doesn't run, and Claude replies `/plugin isn't available in this environment.` Plugins you already installed do load." | S2 | CI note. |
| C32 | `--plugin-dir <path>` loads a plugin from a folder for one session. No marketplace needed. | local help: "--plugin-dir <path>  Load a plugin from a directory or .zip for this session only" | local help; S1 | |
| C33 | Auto-update is on by default for the official marketplace, off for community and third-party marketplaces. | "**On by default**: `claude-plugins-official` ... **Off by default**: every other marketplace" | S2 | Security: auto-update can change files you reviewed (S4). |
| C34 | `claude plugin update <plugin>@<marketplace>` updates one plugin. There is no single command to update all. | "There's no command that updates every plugin at once." | S2 | |
| C35 | `marketplace.json` lives at `.claude-plugin/marketplace.json`. Required top-level fields: `name`, `owner`, `plugins`. | "`name`, `owner`, and `plugins` are required." | S6 | |
| C36 | Each plugin entry needs `name` and `source`. `description` is the line shown in `/plugin`. | "Each object in `plugins` is a plugin entry and needs a `name` and a `source`." | S5 | |
| C37 | Example `marketplace.json`: `{"name": "my-marketplace", "description": "Plugins for my team", "owner": {"name": "Your Name"}, "plugins": [{"name": "my-first-plugin", "source": "./plugins/my-first-plugin", "description": "..."}]}`. | exact JSON | S5 | Use a QA team name in the example. |
| C38 | Plugin `source` types: relative path, `github`, `git-subdir`, `url`, `archive`, `npm`, `command`. | "Choose a plugin source" table and list | S5 | |
| C39 | Relative `source` paths resolve from the marketplace root (the folder that holds `.claude-plugin/`). | "every relative plugin source resolves from it, not from `.claude-plugin/`" | S6 | |
| C40 | The entry `name` must equal the `name` in the plugin's `plugin.json`. | "Keep the two names the same." | S5 | |
| C41 | Reserved marketplace names: official names such as `claude-plugins-official`, community names, and any name that imitates them. | "Reserved names" section | S6 | |
| C42 | Local test loop: `claude plugin validate ./my-marketplace`, `claude plugin marketplace add ./my-marketplace`, `claude plugin install my-first-plugin@my-marketplace`, `claude plugin list`. | Steps 3 to 5 | S5 | |
| C43 | A plugin can run code with your user privileges. | "A Claude Code plugin you install can execute arbitrary code on your machine with your user privileges." | S4 | |
| C44 | What a plugin can run: hooks (shell commands), monitors, mods (JavaScript), MCP and LSP servers, a `bin/` directory added to `PATH`. Skills, commands, and agents enter Claude's context as instructions. | "Understand what a plugin can do" list | S4 | |
| C45 | Permission rules and the sandbox cover Claude's tool calls, not the code a plugin runs by itself. Hooks, monitors, MCP servers, and LSP servers run outside the sandbox. | "Claude Code runs hooks, monitors, MCP servers, LSP servers, and the processes a mod starts outside the sandbox." | S4 | |
| C46 | Review steps: run `claude plugin marketplace list` for the source; read the **Will install** pane in `/plugin`; read `hooks/hooks.json`, `.mcp.json`, and every file in `bin/`; run `claude --plugin-dir <dir> plugin details <name>`. | Steps in "Review a plugin before you install" | S4 | |
| C47 | The **Will install** pane shows that a hook exists but not what it runs. Read the files. | "The **Will install** section shows that a hook exists but not what it runs" | S4 | |
| C48 | Remove a plugin you no longer trust: `claude plugin uninstall <plugin>` with `--scope`. Remove the marketplace too if you do not trust the owner. | "In your shell, run `claude plugin uninstall <plugin>` with the `--scope` you installed it at." | S4 | Cached files stay 14 days. |
| C49 | A third-party plugin from any marketplace needs review, whatever the tier. | "A marketplace's name tells you who publishes the catalog, not what each plugin in it does" | S4 | Fixes audit Med: "Completely free and open" had no security note. |
| C50 | Superpowers is a plugin in the official marketplace, not an agent. The entry text: "Superpowers teaches Claude brainstorming, subagent driven development with built in code review, systematic debugging, and red/green TDD." | `"name": "superpowers", "description": "Superpowers teaches Claude brainstorming, subagent driven development with built in code review, systematic debugging, and red/green TDD. Additionally, it teaches Claude how to author and test new skills.", "category": "development"` | S10 | Fixes audit High: "IS an agent". |
| C51 | README definition: "a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them." | exact | S9 | |
| C52 | Skills trigger automatically. You do not run special commands. | "because the skills trigger automatically, you don't need to do anything special" | S9 | Old page listed `/brainstorming` etc. as commands and `claude /using-superpowers`. |
| C53 | Install in Claude Code: `/plugin install superpowers@claude-plugins-official`. | exact | S9 | Fixes audit High: `npm install -g @obra/superpowers` and `claude install superpowers` are wrong. |
| C54 | Alternative: `/plugin marketplace add obra/superpowers-marketplace`, then `/plugin install superpowers@superpowers-marketplace`. | exact | S9 | |
| C55 | The README says install separately for each coding agent you use. | "Installation differs by harness. If you use more than one, install Superpowers separately for each one." | S9 | |
| C56 | Superpowers skills (15): test-driven-development, systematic-debugging, verification-before-completion, diagnosing-superpowers, brainstorming, writing-plans, executing-plans, dispatching-parallel-agents, requesting-code-review, receiving-code-review, using-git-worktrees, finishing-a-development-branch, subagent-driven-development, writing-skills, using-superpowers. | "What's Inside" → "Skills Library" list (Testing 1, Debugging 3 including diagnosing-superpowers, Collaboration 9, Meta 2) | S9 | Replaces the invented "14 Mandatory Skills". Count 15 is from the README list. |
| C57 | Basic workflow in 7 steps: brainstorming, using-git-worktrees, writing-plans, subagent-driven-development or executing-plans, test-driven-development, requesting-code-review, finishing-a-development-branch. | "The Basic Workflow" list | S9 | |
| C58 | `test-driven-development` enforces RED-GREEN-REFACTOR: failing test first, then minimal code. "Deletes code written before tests." | "Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests." | S9 | QA/SDET angle. |
| C59 | `systematic-debugging` is a 4-phase root cause process. `verification-before-completion` makes sure the fix is real. | "4-phase root cause process" / "Ensure it's actually fixed" | S9 | Maps to the `analyze-rootcause` idea. |
| C60 | `subagent-driven-development` dispatches a fresh subagent per task with review after each (two-stage review: spec compliance, then code quality). `executing-plans` runs inline with one final review. | "Either dispatches a fresh subagent per task with a review after each (most thorough), or implements every task inline in the current session with one fresh review of the whole branch at the end (cheapest)." | S9 | |
| C61 | The README says "Mandatory workflows, not suggestions." and that the agent may work autonomously for a couple of hours. | "**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions." / "It's not uncommon for your agent to work autonomously for a couple hours at a time" | S9 | Process-heavy. For software development, not a test-only tool. |
| C62 | The README does not describe a "Superpower Mode" or a way to remove approval prompts. Permission behavior comes from Claude Code permission modes. | Absence in README; permission modes: see Permission Modes notes | S9 | Absence claim. Old page mixed plugin with permission modes (audit High). |
| C63 | Superpowers has an optional telemetry: a logo loaded from the maintainers' site includes the version. Disable with `SUPERPOWERS_DISABLE_TELEMETRY` or Claude Code's `DISABLE_TELEMETRY`. | "To disable this, set the environment variable `SUPERPOWERS_DISABLE_TELEMETRY` to any true value." | S9 | Optional; good example of what to read before install. |
| C64 | Superpowers is by Jesse Vincent and Prime Radiant. It is MIT licensed. | "Superpowers is built by Jesse Vincent and the rest of the folks at Prime Radiant." / "MIT License" | S9 | |
| C65 | If a Superpowers session misbehaves, ask the agent to "figure out what went wrong with superpowers in this session" to run `diagnosing-superpowers`. | exact | S9 | Optional. |
| C66 | Plugin subagents ignore `hooks`, `mcpServers`, `permissionMode` frontmatter. | "plugin subagents don't support the `hooks`, `mcpServers`, or `permissionMode` frontmatter fields" | S11 | Packaging a qa-agent as a plugin: put hooks in `hooks/hooks.json` and MCP in `.mcp.json`. |
| C67 | Skill folder with `.claude-plugin/plugin.json` loads as `<name>@skills-dir`. `claude plugin init <name>` scaffolds a plugin at `~/.claude/skills/<name>/`. | local help: "init|new [options] <name>  Scaffold a new plugin at ~/.claude/skills/<name>/ (auto-loads next session as <name>@skills-dir)" | local help; skills doc | Optional. |
| C68 | Other official-marketplace plugins useful for QA: `code-review`, `security-guidance`, `playwright`, `github`, `atlassian`, `commit-commands`, `mcp-server-dev`. | entries in `marketplace.json` | S10 | Names exist on 2026-10-10. The list changes often; do not claim a count (file had 315 entries on the fetch date). |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| superpower.mdx › intro "Superpowers IS an agent … Superpower Mode" | rewrite | It is a plugin (C50, C51). No mode (C62). |
| superpower.mdx › 14 Mandatory Superpowers Skills | remove | Invented list. Use the real 15 skills (C56). |
| superpower.mdx › Installation & Setup (`npm install -g @obra/superpowers`, `claude install superpowers`) | rewrite | Use C53, C54. |
| superpower.mdx › Verify installation (`claude /using-superpowers`) | rewrite | Use `/plugin` Installed tab, `claude plugin list` (C27) and "skills trigger automatically" (C52). |
| superpower.mdx › Core Commands table | remove | Skills are not a command set (C52). |
| superpower.mdx › Usage Examples / When to Invoke | rewrite | Use the real workflow (C57) and QA angle (C58, C59). |
| marketplace.mdx › "Largest directory … 2,400+ …" and "Official Directory: claudemarketplaces.com" | remove | Third-party community site; changing numbers (audit). Use C9, C10, C11. |
| marketplace.mdx › Main Browse / Skill Categories / MCP Server Categories (claudemarketplaces.com links) | remove | Third-party links. |
| marketplace.mdx › Resources (old docs.claude.com link, repo mert-duzgun) | remove | Old domain, third party. |
| marketplace.mdx › Quick Reference cards (Skill, Marketplace, MCP Server, Plugin) | rewrite | Keep as definitions: C1, C8. |
| marketplace.mdx › "Completely free and open" | rewrite | Replace with security review advice (C43 to C49). |
| (new) install, scopes, CLI, `marketplace.json`, create-your-own, security | add | C15 to C49. |

## Page outline
- ## What a plugin bundles — C1 to C6. Diagram-like list. QA angle: ship the qa-agent, the six skills, a hook, and the Jira MCP entry as one install for the whole team.
  - ### Plugin or loose files? — C5, C6, C7. When one is better. Mention context cost (`claude plugin details`).
- ## Marketplaces — C8 to C14. Catalog, not store. Table of the three Anthropic marketplaces (C11). Note: claude.com/marketplace is a website (C9).
- ## Install and manage
  - ### In a session — C15 to C19, C30. `/plugin`, `/plugin install name@marketplace`, `/plugin marketplace add`.
  - ### From the shell — C20, C21, C25 to C29, C31. Table of `claude plugin` commands (local help). CI note (C31).
  - ### Scopes — C22, C23, C24. Table: who gets it, which file. Team rule: project scope, then each person runs install once.
  - ### Updates — C33, C34.
- ## Review before you install — C43 to C49. Warning first. Checklist from C46. Hooks and MCP servers run outside the sandbox (C45). Auto-update can change reviewed files (C33 and S4 sentence in C44's source).
- ## Example: Superpowers — C50 to C65.
  - ### What it is — C50, C51, C52. A plugin of skills. Not an agent. Not a permission mode (C62).
  - ### Install — C53, C54, C55.
  - ### The skills — C56, C57. Table of the 15 skills in 4 groups with one-line purpose from the README.
  - ### What it gives a tester — C58, C59, C60. TDD, systematic-debugging, verification-before-completion, subagent-driven-development. Honest limit: it is built for software development with mandatory workflows (C61). Try it on one task before you adopt it.
  - ### Check what you install — C63 (telemetry example), C46.
- ## Build your own team marketplace — C35 to C42, C66, C67. Small `marketplace.json` example (C37). Local test loop (C42). Note on plugin subagents (C66).
- ## Other plugins QA people use — C68. One short list. Say "check `/plugin` Discover for the current list".

## Open questions
- Plugin install paths on disk (`~/.claude/plugins/`) were read from S1 but not tested. Do not give more path detail than S1.
- I did not fetch the Superpowers `skills/*/SKILL.md` files. One-line skill purposes must come from the README text only (C56 to C60).
- C62 is an absence claim. The writer should say "the README describes no such mode", not "there is no such mode".
- Whether `superpowers` skills appear as `/superpowers:<skill>` was not confirmed from a doc for this plugin. S2 and S1 say plugin skills are namespaced `/plugin:skill`; state only the general rule.
- Version pinning of the Superpowers plugin was not researched.
