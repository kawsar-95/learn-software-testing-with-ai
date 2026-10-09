# MCP Servers — research notes (2026-10-10)

Fetch note: each code.claude.com and dbhub.ai page was fetched as raw Markdown (URL plus `.md`). GitHub README files were fetched from raw.githubusercontent.com. The URLs below are the canonical pages.

## Sources
S1. Connect Claude Code to tools via MCP — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/mcp — accessed 2026-10-10
S2. What is the Model Context Protocol (MCP)? — Model Context Protocol project — https://modelcontextprotocol.io/docs/getting-started/intro — accessed 2026-10-10
S3. The MCP Registry — Model Context Protocol project — https://modelcontextprotocol.io/registry/about — accessed 2026-10-10
S4. modelcontextprotocol/servers README — Model Context Protocol project (GitHub) — https://github.com/modelcontextprotocol/servers — accessed 2026-10-10
S5. Security (Claude Code) — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/security — accessed 2026-10-10
S6. GitHub MCP Server README — GitHub — https://github.com/github/github-mcp-server — accessed 2026-10-10
S7. DBHub README — Bytebase (GitHub) — https://github.com/bytebase/dbhub — accessed 2026-10-10
S8. DBHub: execute_sql tool, Read-Only Mode — Bytebase — https://dbhub.ai/tools/execute-sql — accessed 2026-10-10
S9. Playwright MCP README — Microsoft (GitHub) — https://github.com/microsoft/playwright-mcp — accessed 2026-10-10
S10. Atlassian Rovo MCP Server README — Atlassian (GitHub) — https://github.com/atlassian/atlassian-mcp-server — accessed 2026-10-10
S11. Getting started with the Atlassian Rovo MCP Server — Atlassian Developer — https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/ — accessed 2026-10-10
S12. Create custom subagents — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/sub-agents — accessed 2026-10-10
S13. Context7 README — Upstash (GitHub) — https://github.com/upstash/context7 — accessed 2026-10-10
S14. anthropics/claude-plugins-official `marketplace.json` — Anthropic (GitHub) — https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json — accessed 2026-10-10 (fetched from raw.githubusercontent.com)
S15. Commands — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S16. Hooks reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/hooks — accessed 2026-10-10
Supporting evidence (not a citable page): local `claude mcp --help` and `claude mcp add --help`, Claude Code 2.1.294. Quoted below as "local help".

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | MCP is an open-source standard for connecting AI applications to external systems. | "MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems." | S2 | |
| C2 | MCP is compared to a USB-C port for AI applications. | "Think of MCP like a USB-C port for AI applications." | S2 | |
| C3 | Claude Code connects to external tools and data through MCP. Servers give access to tools, databases, and APIs. | "MCP servers give Claude Code access to your tools, databases, and APIs." | S1 | |
| C4 | Typical uses: implement from an issue tracker, query databases, analyze monitoring data. | "Add the feature described in JIRA issue ENG-4521 and create a PR on GitHub." / "Find emails of 10 random users who used feature ENG-4521, based on our PostgreSQL database." | S1 | QA angle: Jira ticket, DB check. |
| C5 | Browse reviewed connectors in the Anthropic Directory. You can add any remote server listed there with `claude mcp add`. | "Browse reviewed connectors in the Anthropic Directory (https://claude.ai/directory)." / "you can add any remote server listed there with `claude mcp add`" | S1 | Fixes audit High: `mcpmarket.com` is not official. |
| C6 | The MCP Registry is the official centralized metadata repository for public MCP servers. It is in preview. | "The MCP Registry is the official centralized metadata repository for publicly accessible MCP servers" / "currently in preview" | S3 | Registry UI: https://registry.modelcontextprotocol.io/ (not citable for status). |
| C7 | The Registry stores metadata (`server.json`) that points to packages. It does not host code. | "The MCP Registry hosts metadata that points to those packages." | S3 | |
| C8 | `modelcontextprotocol/servers` holds reference implementations. To find servers use the MCP Registry. | "If you are looking for a list of MCP servers, you can browse published servers on the MCP Registry." / "reference implementations ... not as production-ready solutions" | S4 | Fixes audit Med: that repo is not "the registry". |
| C9 | Current reference servers: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time. | Reference Servers list | S4 | |
| C10 | The GitHub, PostgreSQL, Puppeteer, Slack, Sentry, SQLite, Redis, GitLab, Google Drive, Google Maps, Brave Search, AWS KB Retrieval, and EverArt servers are archived at `modelcontextprotocol/servers-archived`. | "The following reference servers are now archived and can be found at servers-archived." | S4 | Fixes audit High: `server-github` and `server-postgres` are archived. Brave Search "replaced by the official server". Slack "maintained by Zencoder". |
| C11 | Remote HTTP is the recommended transport. Syntax: `claude mcp add --transport http <name> <url>`. | "HTTP servers are the recommended option for connecting to remote MCP servers." / `claude mcp add --transport http <name> <url>` | S1 | |
| C12 | Example with a header: `claude mcp add --transport http secure-api https://api.example.com/mcp --header "Authorization: Bearer your-token"`. | exact | S1 | Local help also shows `--header` (`-H`). |
| C13 | The SSE transport is deprecated. Use HTTP where available. The `--transport http` command tries HTTP and falls back to SSE (v2.1.265+). Use `--transport sse` to force SSE. | "The SSE (Server-Sent Events) transport is deprecated. Use HTTP servers instead, where available." | S1 | |
| C14 | stdio syntax: `claude mcp add [options] <name> -- <command> [args...]`. | exact | S1 | |
| C15 | The `--` separates Claude's options from the server command. Everything after `--` goes to the server untouched. | "the `--` (double dash) separates Claude's own options, such as `--transport`, `--env`, and `--scope`, from the command and arguments that run the server." | S1 | |
| C16 | Example: `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "postgresql://..."`; env example `claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server`. | exact | S1 | |
| C17 | Place at least one other option between `--env` and the server name, or the CLI reads the name as another pair. | "place at least one other option, such as `--transport stdio`, between `--env` and the server name." | S1 | |
| C18 | Local help for `claude mcp add`: usage `claude mcp add [options] <name> <commandOrUrl> [args...]`; `-t, --transport <transport>` choices `stdio, sse, http`, default stdio; `-s, --scope <scope>` `local, user, or project`, default `local`; `-e, --env`; `-H, --header`. | "-t, --transport <transport>  Transport type (stdio, sse, http). Defaults to stdio if not specified." / "-s, --scope <scope>  Configuration scope (local, user, or project) (default: "local")" | local help | Supporting evidence. |
| C19 | WebSocket (`ws`) servers go in `.mcp.json` or `claude mcp add-json`. `claude mcp add --transport` does not accept `ws`. | "The `claude mcp add --transport` flag doesn't accept `ws`." | S1 | Optional. |
| C20 | `claude mcp add-json <name> '<json>'` adds a server from JSON (stdio, SSE, HTTP, WebSocket). | local help: "add-json [options] <name> <json>  Add an MCP server (stdio, SSE, HTTP, or WebSocket) with a JSON string" | local help | |
| C21 | A JSON entry with `url` but no `type` is an error. Write `"type": "http"` (or `sse`, `ws`). `streamable-http` is an alias for `http`. | "`MCP server \"<name>\" has a \"url\" but no \"type\"; add \"type\": \"http\" (or \"sse\" / \"ws\") to this entry`" | S1 | |
| C22 | Three scopes: local (default, current project only, not shared, in `~/.claude.json`), project (shared via version control, `.mcp.json` in project root), user (all projects, not shared, `~/.claude.json`). | Scope table | S1 | Fixes audit High: `.claude.json` is not "project root" config. |
| C23 | Scope flag: `--scope local`, `--scope project`, `--scope user`. | `claude mcp add --transport http shared-server --scope project https://example.com/mcp` | S1 | |
| C24 | Project scope writes a `.mcp.json` with a top-level `mcpServers` object. Check it into version control. | `{"mcpServers": {"shared-server": {"type": "http", "url": "https://example.com/mcp"}}}` | S1 | |
| C25 | Precedence when the same name is defined twice: local, project, user, plugin-provided, claude.ai connectors. The whole entry from the winner is used. | "1. Local scope 2. Project scope 3. User scope 4. Plugin-provided servers 5. claude.ai connectors" | S1 | |
| C26 | Claude Code asks for approval in interactive sessions before it uses a `.mcp.json` server. `claude mcp reset-project-choices` resets the choices. | "Claude Code prompts for approval in interactive sessions before using project-scoped servers from `.mcp.json` files." | S1 | |
| C27 | In `claude -p`, Agent SDK, and cloud sessions, project-scoped servers load without a prompt. To keep one out: `disabledMcpjsonServers`, `--setting-sources`, or `--strict-mcp-config`. | "Claude Code can't show that prompt: it loads project-scoped servers without asking." | S1 | CI safety. Local help: "--strict-mcp-config  Only use MCP servers from --mcp-config, ignoring all other MCP configurations". |
| C28 | `.mcp.json` supports `${VAR}` and `${VAR:-default}` in `command`, `args`, `env`, `url`, `headers`. | "`${VAR}`: expands to the value of environment variable `VAR`" / "`${VAR:-default}`" | S1 | Keep secrets out of the committed file. |
| C29 | In a remote server's `url` and `headers`, credential variables such as `ANTHROPIC_API_KEY` read as empty. | "Claude Code reads credential variables from your environment as empty rather than expanding them." | S1 | Use your own variable name. |
| C30 | Manage: `claude mcp list`, `claude mcp get <name>`, `claude mcp remove <name>`, and `/mcp` in a session. | exact block | S1 | |
| C31 | `claude mcp list` shows health such as `✔ Connected`, `! Needs authentication`, `✘ Failed to connect`. Unapproved `.mcp.json` servers show `⏸ Pending approval`. | quoted statuses | S1 | |
| C32 | Local help lists `claude mcp` subcommands: `add`, `add-from-claude-desktop`, `add-json`, `get`, `list`, `login`, `logout`, `remove`, `reset-project-choices`, `serve`. | local help | local help | |
| C33 | `/mcp` manages server connections and OAuth. `/mcp reconnect (<server>\|all)`, `enable`, `disable` are subcommands. | "Manage MCP server connections and OAuth authentication." | S15 | |
| C34 | OAuth 2.0 works for remote servers. Run `/mcp` and follow the browser steps. Tokens are stored and refreshed automatically. | "Claude Code supports OAuth 2.0 for secure connections." / "Authentication tokens are stored securely and refreshed automatically" | S1 | OAuth works with HTTP servers (tip list). |
| C35 | `claude mcp login <name>` runs the OAuth flow from the shell. `claude mcp logout <name>` clears tokens. | "The `claude mcp login <name>` command runs a configured server's OAuth flow directly from your shell" | S1 | Local help: "login [options] <name>  Authenticate with an MCP server (HTTP, SSE, or claude.ai connector)". |
| C36 | If you set `headers.Authorization` and the server rejects it, Claude Code reports a failed connection. It does not fall back to OAuth. | "Claude Code reports the connection as failed instead of falling back to OAuth." | S1 | |
| C37 | In `claude -p` runs a server that needs sign-in is unavailable. Sign in first from an interactive session. | "Complete the sign-in from an interactive session with `/mcp` or `claude mcp login <name>`." | S1 | CI note. |
| C38 | `claude mcp add-from-claude-desktop` imports servers from Claude Desktop. It works only on macOS and WSL. | "This feature only works on macOS and Windows Subsystem for Linux (WSL)" | S1 | Fixes audit Med: old "Settings → Integrations" is Desktop. |
| C39 | Tool search is on by default. Only tool names load at start. Definitions load when needed. | "Tool search keeps MCP context usage low by deferring tool definitions until Claude needs them." | S1 | |
| C40 | MCP output: warning above 10,000 tokens. Default maximum 25,000 tokens. Change with `MAX_MCP_OUTPUT_TOKENS`. | "Claude Code displays a warning when any MCP tool output exceeds 10,000 tokens" / "the default maximum is 25,000 tokens" | S1 | |
| C41 | MCP prompts show as commands `/mcp__servername__promptname`. | "Typing `/mcp__servername__promptname` also runs it." | S1 | Example `/mcp__github__list_prs`. |
| C42 | Server names added by `claude mcp` can contain only letters, numbers, hyphens, underscores. | "Server names added through `claude mcp` commands can contain only letters, numbers, hyphens, and underscores." | S1 | |
| C43 | MCP tool names look like `mcp__<server>__<tool>`. | "MCP tools follow the naming pattern `mcp__<server>__<tool>`" | S16 | Needed for subagent `tools` lists and hook matchers (see extend-hooks.md C48). |
| C44 | A subagent's `tools` list with only built-in tools blocks MCP tools. Define an inline `mcpServers` entry to give a subagent a server the main chat does not have. | "The subagent can't edit files, write files, or use any MCP tools" / "define it inline here rather than in `.mcp.json`" | S12 | Link to Subagents page. |
| C45 | Anthropic does not security-audit MCP servers. Use servers you trust or write your own. | "Anthropic reviews connectors against its listing criteria before adding them to the Anthropic Directory, but does not security-audit or manage any MCP server." | S5 | |
| C46 | Servers that fetch external content can expose you to prompt injection risk. Verify you trust each server. | "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk." | S1 | |
| C47 | Reviewing `.mcp.json` does not show every server a session can load. Other scopes, connectors, and plugins add servers. | "reviewing `.mcp.json` doesn't show every server a session can load" | S5 | |
| C48 | GitHub: GitHub hosts a remote MCP server. Docs example: `claude mcp add --transport http github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer YOUR_GITHUB_PAT"`. | exact command | S1 | The command saves config without checking the token. Run `/mcp` to see `connected` or `failed`. |
| C49 | The remote GitHub server is "hosted by GitHub and provides the easiest method". A local Docker server also exists: `claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PAT -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server`. | "The remote GitHub MCP Server is hosted by GitHub and provides the easiest method for getting up and running." | S6 | |
| C50 | The local GitHub server has a read-only mode: `--read-only` offers only read-only tools. | "To run the server in read-only mode, you can use the `--read-only` flag. This will only offer read-only tools" | S6 | Also use a fine-grained token with only needed repos (S1 says "fine-grained token"). |
| C51 | GitHub PAT advice from S1: generate a fine-grained token with access to the repositories you want Claude to use. | "generate a new fine-grained token with access to the repositories you want Claude to work with" | S1 | |
| C52 | Database option: DBHub (`@bytebase/dbhub`) connects Claude to a relational database via `--dsn`. Docs say to use a read-only database user. | "Use a read-only database user in the connection string so the queries Claude runs can't modify data" | S1 | Fixes audit High (archived `server-postgres`). |
| C53 | DBHub supports PostgreSQL, MySQL, SQL Server, MariaDB, Oracle, SQLite. Default tools: `execute_sql`, `search_objects`. | "PostgreSQL, MySQL, SQL Server, MariaDB, Oracle, and SQLite." / "2 (`execute_sql`, `search_objects`)" | S7 | |
| C54 | DBHub read-only mode: set `readonly = true` on the `execute_sql` tool in TOML. It uses a keyword classifier plus engine-level read-only (e.g. PostgreSQL `BEGIN READ ONLY`). | "`[[tools]] name = \"execute_sql\" source = \"production\" readonly = true`" | S8 | Engine-level since 0.22.6. |
| C55 | DBHub warning: read-only mode cannot stop everything a privileged DB role can do. Use a least-privilege read-only DB user. | "For untrusted or agent-driven environments, **always connect DBHub with a least-privilege, read-only database user** scoped to the data it needs." | S8 | Key QA safety rule. |
| C56 | Playwright MCP: add with `claude mcp add playwright npx @playwright/mcp@latest`. Needs Node.js 18 or newer. | "claude mcp add playwright npx @playwright/mcp@latest" / "Node.js 18 or newer" | S9 | Using `--` before `npx` follows S1 syntax: `claude mcp add playwright -- npx @playwright/mcp@latest`. Both forms have no Claude-side flags. |
| C57 | Playwright MCP uses the accessibility tree, not screenshots. | "Uses Playwright's accessibility tree, not pixel-based input." | S9 | |
| C58 | README says coding agents may prefer the Playwright CLI with skills: more token-efficient. MCP suits exploratory automation, self-healing tests, long-running loops. | "MCP remains relevant for specialized agentic loops that benefit from persistent state, rich introspection, and iterative reasoning over page structure, such as exploratory automation, self-healing tests" | S9 | Link to Playwright page. |
| C59 | Playwright MCP is not a security boundary. | "Playwright MCP is **not** a security boundary." | S9 | |
| C60 | Playwright MCP options: `--headless`, `--isolated` (profile in memory), `--browser` (chrome, firefox, webkit, msedge), `--caps` (vision, pdf, devtools). `--allowed-origins` does not serve as a security boundary. | Option table rows | S9 | |
| C61 | Playwright is also a plugin in the official marketplace (category `testing`). | `"name": "playwright", ... "category": "testing"` | S14 | |
| C62 | Atlassian official remote server covers Jira, Confluence, Jira Service Management, Bitbucket, Compass. Auth is OAuth 2.1 or API token. | "The **official Atlassian MCP Server** is a cloud-based bridge between your Atlassian Cloud site and compatible external tools." | S10 | |
| C63 | Claude Code command: `claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp`, then run `/mcp` to authenticate. | "`claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp`, then run `/mcp` in a session to authenticate" | S10 | S11: "Claude Code: Run /mcp once you've opened a Claude Code session to authenticate." |
| C64 | v2 is the recommended endpoint. The old SSE endpoint `/v1/sse` is not supported after 30 June 2026. | "**v2 is now the recommended version.** New setups should use `https://mcp.atlassian.com/v2/mcp`" / "After 30 June 2026, the legacy Server-Sent Events endpoint (`https://mcp.atlassian.com/v1/sse`) will no longer be supported." | S10 | Today is 2026-10-10: the date has passed. Do not show `/v1/sse`. |
| C65 | Atlassian: access is limited to data the user can already see. Use least privilege and review high-impact changes. | "Access is granted only to data that the user already has permission to view in Atlassian Cloud." / "Use least privilege, review high-impact changes before confirming, and monitor audit logs for unusual activity." | S10, S11 | |
| C66 | API token auth needs an admin to enable it. Jira Service Management tools only work with API token auth. | "**Admin enablement required:** An organization admin must enable API token authentication" | S10 | Optional detail for CI. |
| C67 | A plugin named `atlassian` is listed in the official marketplace. | `"name": "atlassian", "description": "Connect to Atlassian products including Jira and Confluence..."` | S14 | |
| C68 | Context7 provides up-to-date, version-specific library docs placed into the prompt. | "Context7 pulls up-to-date, version-specific documentation and code examples straight from the source — and places them directly into your prompt." | S13 | Fixes audit Med: not "multi-layer retrieval". Optional. |
| C69 | `claude mcp serve` starts Claude Code as an MCP server. | local help: "serve [options]  Start the Claude Code MCP server" | local help | Optional. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| mcp.mdx › What is MCP Server? (three cards) | rewrite | Keep Jira, DB, logs idea. Add C1 to C4. "Analyze Logs" needs a log source: say "via a server you add". |
| mcp.mdx › `claude mcp list` callout | keep | C30. |
| mcp.mdx › Add Jira MCP (`claude mcp add --scope user jira-mcp node ...`) | rewrite | Use Atlassian remote server (C63) or a custom stdio server with `--` (C14, C15). Add scope (C22) and OAuth (C34). |
| mcp.mdx › Add DB MCP (`db-mcp node ...`) | rewrite | Use DBHub with read-only user (C52, C54, C55). |
| mcp.mdx › "MCP Marketplace — Install in One Click" / mcpmarket.com | remove | Third-party site (C5, C6). |
| mcp.mdx › cards: GitHub, PostgreSQL, Context7, Brave Search, Filesystem, Slack | rewrite | GitHub remote (C48), DBHub (C52), Context7 description (C68), Brave replaced (C10), Filesystem still reference (C9), Slack archived (C10). Prefer 4 QA cards: Jira, DB, GitHub, Playwright. |
| mcp.mdx › Method 1 Claude Desktop GUI | remove | Not Claude Code. Replace with `add-from-claude-desktop` (C38). |
| mcp.mdx › Method 2 CLI (`server-github`, `server-postgres`) | remove | Both archived (C10). |
| mcp.mdx › MCP Registry (github.com/modelcontextprotocol/servers) | rewrite | Registry is registry.modelcontextprotocol.io (C6). Repo is reference servers (C8). |
| (new) scopes, `.mcp.json`, approval | add | C22 to C28. |
| (new) security section | add | C45 to C47, C55, C59. |
| (new) Playwright MCP | add | C56 to C61. |

## Page outline
- ## What MCP is — C1, C2, C3, C4. Short. QA angle: read the ticket and the data without copy and paste.
- ## Find servers you can trust — C5, C6, C7, C8, C45. Anthropic Directory, MCP Registry (preview), reference servers. Warning: third-party aggregator sites are not official.
- ## Add a server
  - ### Remote HTTP — C11, C12, C13. Plus SSE note.
  - ### Local stdio — C14, C15, C16, C17. Explain `--`.
  - ### Scopes and `.mcp.json` — C22 to C28. Table. Example `.mcp.json` with `${VAR}` for secrets. Team tip: commit `.mcp.json`, keep tokens in env.
  - ### Check and manage — C30, C31, C32, C42. `/mcp`, `claude mcp list`.
  - ### Sign in with OAuth — C34 to C37. CI note: authenticate first.
  - ### Move servers from Claude Desktop — C38.
- ## Servers for testing work
  - ### Jira (Atlassian) — C62 to C67. Rewritten example. Prompt: "Read PROJ-421 and list the acceptance criteria." Explain the qa-agent link (`mcp__atlassian__...` names; see Subagents page).
  - ### Database (DBHub) — C52 to C55. Example with a read-only user. Warning box.
  - ### GitHub — C48 to C51.
  - ### Playwright — C56 to C61. Link to Playwright page.
  - ### Context7 (optional one line) — C68.
- ## MCP in agents and hooks — C43, C44. `tools: Read, mcp__atlassian` style for subagents; hooks can match `mcp__server__.*` (Hooks page).
- ## Keep it safe — C45, C46, C47, C55, C59, C27, C29. Prompt injection from tickets or web pages. Least privilege. Read-only DB users. `--strict-mcp-config` in CI.
- ## Context cost — C39, C40. Tool search, output limits. One short paragraph.

## Open questions
- Jira tool names: I did not fetch the Atlassian tool list. The writer must not print real `mcp__atlassian__<tool>` names. Use only `mcp__atlassian` (server-level pattern from the Subagents notes C16) or tell the reader to run `/mcp` to see the names.
- The docs example for the DBHub DSN uses `postgresql://readonly:pass@prod.db.com:5432/analytics`. For QA the writer should use a test/staging host in the example and say "do not point it at production".
- The MCP Registry page says "preview". Check again before publishing. The Registry site (registry.modelcontextprotocol.io) gave no status text.
- Playwright README shows `claude mcp add playwright npx @playwright/mcp@latest` (no `--`). S1 says `--` is needed only when the server command has flags. The writer can show both and say why.
