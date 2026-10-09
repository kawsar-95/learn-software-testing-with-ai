# Fact-check: GitHub Actions (round 1, 2026-10-10)

Sources fetched by the checker: S1 code.claude.com/docs/en/github-actions.md; S2 github.com/anthropics/claude-code-action releases (GitHub API: `releases/latest` = tag `v1`, name "Claude Code GitHub Action v1.0"; newest tag v1.0.248, 2026-10-09; no tag outside `v1`/`v1.0.*`); S3 raw docs/security.md; S4 raw docs/usage.md. Cite check: n=1..4 exist, all 4 cited, first-cite order 1..4.

Verbatim diff (script compares fenced blocks of the page with fenced blocks of the docs, exact after trim):
- "Claude Code" `@claude` workflow = exact match of S1 "Respond to @claude mentions" block.
- "Code Review" workflow = exact match of S1 "Run a skill" block.
- "Detect flaky tests" snippet = exact match of S4 usage.md block.
- `claude_args: "--max-turns 5 --model claude-sonnet-5 --mcp-config /path/to/config.json"` = exact match of S1 "Pass CLI arguments" block.
- "Test Review" workflow = the page's own example (no match, as labeled).

| # | Location | Claim | Cite | Verdict | Evidence / Fix |
|---|---|---|---|---|---|
| 1 | What the Action does | `anthropics/claude-code-action` runs Claude Code inside workflows | 1 | PASS | "a GitHub Action that runs Claude Code inside your repository's workflows". |
| 2 | bullets | `@claude` mention -> analyze, implement, push commits | 1 | PASS | Verbatim. |
| 3 | bullets | A `prompt` runs on any GitHub event, e.g. issues to PRs | 1 | PASS | Verbatim. |
| 4 | bullets | Current major version `v1`; use `@v1` | 1,2 | PASS | S1 workflows use `@v1`; S2 releases: tag `v1`, newest v1.0.248; no v2 tag. |
| 5 | para | Code Review = automatic review on every PR without workflow; page covers workflow integration only | 1 | PASS | "Code Review: automatic review on every pull request, without writing a workflow". |
| 6 | Two modes table | Interactive: no `prompt`; waits for trigger phrase (`@claude` default) in comment, review, or new issue; result as comment | 1 | PASS | "Interactive mode: when the workflow provides no `prompt` input ... in an issue or pull request comment, in a pull request review, or in the body or title of a newly opened issue". |
| 7 | table | Automation: `prompt` input; runs without mention; result in run log by default | 1 | PASS | Verbatim. |
| 8 | para | `claude -p` runs in any CI without this Action | - | OPINION-OK | Cross-link; no cited claim (consistent with headless page). |
| 9 | Set it up | Admin access needed for both paths | 1 | PASS | "For either path, you need admin access to the repository." |
| 10 | Quick setup | Open `claude`, run `/install-github-app` | 1 | PASS | Verbatim. |
| 11 | Quick setup | Needs GitHub CLI signed in with `gh auth login` | 1 | PASS | Verbatim. |
| 12 | Quick setup | github.com repositories only | 1 | PASS | "works only with github.com repositories". |
| 13 | Quick setup | Installs GitHub App; saves secret `ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN` | 1 | PASS | Verbatim. |
| 14 | Quick setup | Pushes branch with workflow files, opens PR to create; after merge `@claude` works | 1 | PASS | Verbatim. |
| 15 | Manual setup | Install app at github.com/apps/claude | 1 | PASS | Link in S1. |
| 16 | Manual setup | Secret `ANTHROPIC_API_KEY` (Console) or `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token`; Pro/Max/Team/Enterprise | 1 | PASS | Verbatim. |
| 17 | Manual setup | Copy `examples/claude.yml` to `.github/workflows/` | 1 | PASS | Verbatim. |
| 18 | para | Pass secret to `anthropic_api_key` or `claude_code_oauth_token` | 1 | PASS | Verbatim. |
| 19 | bullets | Three permissions: Contents, Issues, Pull requests, read+write | 1 | PASS | Manual setup step 1. |
| 20 | bullets | Full app permission set larger; cannot accept a subset | 1 | PASS | "GitHub doesn't let you accept a subset." |
| 21 | bullets | Many repos: use Console API key (OAuth token tied to one person's subscription) | 1 | PASS | Verbatim. |
| 22 | bullets | Workload identity federation avoids stored secret; needs `id-token: write` | 1 | PASS | Verbatim. |
| 23 | @claude workflow | Docs workflow (copied) | 1 | PASS | Exact match with S1 block (see diff above). Only documented keys by construction. |
| 24 | bullets | `id-token: write` required for default App auth; `actions: read` reads CI results; checkout gives local copy | 1 | PASS | "The parts of this workflow that aren't boilerplate". |
| 25 | para | Claude replies in a comment, updates it as it works | 1 | PASS | Verbatim. |
| 26 | Who can trigger | Trigger user needs write access on issue/PR events | 1 | PASS | Verbatim. |
| 27 | Who can trigger | Bot actor rejected unless in `allowed_bots` | 1 | PASS | Verbatim. |
| 28 | Who can trigger | `allowed_non_write_users` bypasses write check; security docs mark risky, only for very limited permissions | 3 | PASS | "allows bypassing the write permission requirement. **This is a significant security risk and should only be used for workflows with extremely limited permissions**". |
| 29 | QA example | Sample `@claude` requests; docs show same form (`@claude fix the TypeError...`) | 1 | EXAMPLE-OK | Labeled "Example"; form matches S1. |
| 30 | bullets | CLAUDE.md test standards; Claude follows guidelines when creating PRs | 1 | PASS | "Claude follows these guidelines when creating PRs and responding to requests." |
| 31 | bullets | Default: no PR created; commits to new branch; gives link; person creates PR | 3 | PASS | "Claude does not create pull requests automatically ... The user must click the link and create the PR themselves". |
| 32 | bullets | Default `GITHUB_TOKEN` commits do not trigger workflows; do not pass `github_token: ${{ secrets.GITHUB_TOKEN }}` so Action authenticates as the App | 1 | PASS | Troubleshooting "CI not running on Claude's commits". |
| 33 | Review PRs | Code Review workflow (copied); installs `code-review` plugin; triggers opened/synchronize/ready_for_review/reopened | 1 | PASS | Exact match with S1 block. |
| 34 | bullets | `--comment`: inline comment per issue or one summary comment; without it findings stay in run log | 1 | PASS | Verbatim. |
| 35 | bullets | Keep `claude_args`; MCP server for inline comments starts only when `--allowedTools` names it | 1 | PASS | Verbatim. |
| 36 | bullets | Skips draft/closed PRs, PRs judged not to need review, PRs with Claude comment | 1 | PASS | Verbatim. |
| 37 | bullets | Public repos: secrets withheld from fork-PR runs; review only runs for same-repo branches | 1 | PASS | Verbatim. |
| 38 | Run own skill | Repo skill: checkout first, `/skill-name`; plugin skill: `plugin_marketplaces`+`plugins`, `/plugin-name:skill-name` | 1 | PASS | "Run a skill" section. |
| 39 | Run own skill | Plain-text prompt: no shell/GitHub API until `--allowedTools` in `claude_args` or `permissions.allow` in `settings`; skill uses its `allowed-tools` | 1 | PASS | "Run on a schedule" paragraph. |
| 40 | QA example | "Test Review" workflow: keys `on.pull_request.types`, `permissions`, `actions/checkout@v6` + `fetch-depth`, `anthropic_api_key`, `prompt: "/review-tests"`, multi-line `claude_args: \|` with `--max-turns 10` and `--allowedTools "mcp__github_inline_comment__create_inline_comment"` | 1 | EXAMPLE-OK | Labeled Example. Every key/flag is in the S1 workflows: multi-line `claude_args: \|` (S1 schedule example), `--max-turns` (S1 CLI args), `--allowedTools` + inline-comment tool (S1 review workflow), skill as `prompt` (S1 "Run a skill"). `timeout-minutes` correctly removed. |
| 41 | para | Skill to check three things (test exists, strong assertions, flakiness) | - | OPINION-OK | Tutorial guidance. |
| 42 | Triage flaky | `--json-schema` in `claude_args` -> step output `structured_output`, one JSON string | 4 | PASS | "All fields are returned in a single `structured_output` JSON string". |
| 43 | Triage flaky | Flaky-test snippet (copied) | 4 | PASS | Exact match with usage.md block. |
| 44 | para | "A retry hides a flaky test... record summary in ticket" | - | OPINION-OK | Advice. |
| 45 | Schedule | With a `prompt`, runs on any event incl. cron | 1 | PASS | Verbatim. |
| 46 | bullets | Schedules run only from default branch; public repos disable after 60 days idle | 1 | PASS | Verbatim. |
| 47 | bullets | Docs example runs at `"0 9 * * *"` with two GitHub MCP tools via `--allowedTools` | 1 | PASS | "Daily Report" block. |
| 48 | para | Nightly prompt example | - | EXAMPLE-OK | Labeled Example; uses `prompt` + `--allowedTools` (S1). |
| 49 | Pass CLI args | `claude_args` accepts any Claude Code CLI argument; docs example string | 1 | PASS | Exact match. |
| 50 | table | `--max-turns`, `--model` (default model if omitted), `--mcp-config`, `--allowedTools` (comma-separated; alias `--allowed-tools`), `--debug` | 1 | PASS | "Common arguments" list. |
| 51 | para | `Bash(git diff *)` permission rule form | - | OPINION-OK | Points to the headless page, which cites S1 for it; no new claim. |
| 52 | Danger callout | Never commit keys; use GitHub Secrets; least permissions; review changes | 1 | PASS | "Protect your credentials" warning. |
| 53 | Cost | Runs use Actions minutes and API tokens; OAuth token = subscription instead of API billing | 1 | PASS | "Manage costs". |
| 54 | Cost | Control list (specific requests, issue templates, short CLAUDE.md, `--max-turns`, timeouts, concurrency) | 1 | PASS | Near-verbatim list. |
| 55 | Risk | Action restores `.claude/`, `.mcp.json`, `.claude.json`, `.gitmodules`, `.ripgreprc`, `CLAUDE.md`, `CLAUDE.local.md`, `.husky/` from base branch on PRs | 3 | PASS | "Which files come from the base branch on pull requests" (identical list). |
| 56 | Risk | `pull_request_target`/`workflow_run` use base repo secrets; PR-head checkout before Action = Claude works on it | 3 | PASS | Verbatim. "Do not do this for untrusted PRs" follows S3 "Do not check out an untrusted ref". |
| 57 | Risk | Strips HTML comments, invisible chars, image alt text, hidden attributes, entities; new bypasses may appear | 3 | PASS | Verbatim. |
| 58 | Risk | `include_comments_by_actor` limits comments on public repos | 3 | PASS | Verbatim. |
| 59 | Risk | Commits unsigned by default; `show_full_output` off by default for security | 3 | PASS | "By default, commits made by Claude are unsigned"; "disabled by default for security reasons". |
| 60 | Upgrade | `@beta` -> `@v1`; remove `mode`; `direct_prompt` -> `prompt`; `max_turns`/`model` into `claude_args`; `custom_instructions` -> `--append-system-prompt` | 1 | PASS | "Upgrade from beta" steps 1-4. |
| 61 | Upgrade | usage docs list `allowed_tools` as deprecated; use `--allowedTools` | 4 | PASS | Deprecated Inputs table: "`allowed_tools` DEPRECATED: Use `claude_args` with `--allowedTools`". |
| 62 | Upgrade | "A tutorial that shows `direct_prompt:`/`allowed_tools:` is out of date" | - | OPINION-OK | Follows from rows 60-61. |
| 63 | Troubleshoot | Four checks (app installed, workflows on, secret set, complete word `@claude`, write access) | 1 | PASS | Verbatim list. |
| 64 | Last para | `use_bedrock`/`use_vertex`/`use_foundry` = `"true"`, OIDC auth | 1 | PASS | "Use a cloud provider". |
| 65 | nav description | "Answer @claude in pull requests and review tests automatically with the Claude Code GitHub Action." | - | EXAMPLE-OK | `@claude` is S1. "Review tests" is the page's own labeled Example (repo skill `/review-tests`), which uses only documented keys; the Action has no built-in test-review feature. Acceptable, but "review tests" is the tutorial's use, not a product feature. |
| 66 | nav tagline | "put Claude to work in your pipeline" | - | OPINION-OK | Marketing phrase. |

Open FAILs: 0

## Round 2 (2026-10-10, diff 3748346..cf32eeb)
No changes to `content/automate/github-actions.mdx` or to its `lib/nav.ts` rows between the two commits (git diff empty). Round 1 had no open items. Cite check unchanged (4 sources, all cited).

Open FAILs: 0

## Round 3 (review polish, 6b5b76d)

Diff checked: `git show 6b5b76d -- content/automate/github-actions.mdx lib/nav.ts`. S1 (`github-actions.md`) re-fetched. Two description rewrites; no body line changed.

| # | Location (heading) | Claim (short) | Cite | Verdict | Evidence (quote) / Fix |
|---|---|---|---|---|---|
| R3-1 | metadata.description | "Run Claude Code in GitHub workflows: set up claude-code-action, answer @claude in PRs, review pull requests automatically, and control cost and risk." | page, S1 | PASS | S1: "Mention `@claude` in a pull request or issue comment". Page sections "Set it up", "Respond to @claude in issues and PRs", "Review pull requests automatically" (code-review plugin workflow, S1), "Control cost and risk". The old "review tests automatically" wording is gone. |
| R3-2 | nav description (lib/nav.ts) | "Answer @claude in pull requests and run your own test-review step in CI with the Claude Code GitHub Action." | page | PASS | "@claude" part as R3-1. "Your own test-review step" matches "QA example: review the tests in every PR" (the tutorial's own `/review-tests` skill workflow, labeled as the tutorial's example). The claim is now limited to what the page shows. |

Cite numbers: unchanged; all 4 sources still cited.

Open FAILs: 0
