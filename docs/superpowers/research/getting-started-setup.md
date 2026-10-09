# Install Claude Code — research notes (2026-10-10)

## Sources
S1. Advanced setup — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/setup — accessed 2026-10-10
S2. Quickstart — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/quickstart — accessed 2026-10-10
S3. Authentication — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/authentication — accessed 2026-10-10
S4. CLI reference — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/cli-reference — accessed 2026-10-10
S5. Commands — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/commands — accessed 2026-10-10
S6. Use Claude Code in VS Code — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/vs-code — accessed 2026-10-10
S7. JetBrains IDEs — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/jetbrains — accessed 2026-10-10
S8. Choose a permission mode — Anthropic (Claude Code docs) — https://code.claude.com/docs/en/permission-modes — accessed 2026-10-10

Supporting evidence (not a cited source): local CLI help, `claude --version` = `2.1.294 (Claude Code)`. Help lines are quoted in Notes.

## Claims
| # | Claim (one fact, as the page will state it) | Exact value or short verbatim quote from the source | Source | Notes |
|---|---|---|---|---|
| C1 | Supported operating systems: macOS 13.0+, Windows 10 1809+ or Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ | "macOS 13.0+ / Windows 10 1809+ or Windows Server 2019+ / Ubuntu 20.04+ / Debian 10+ / Alpine Linux 3.19+" | S1 | |
| C2 | Hardware: 4 GB+ RAM, x64 or ARM64 processor. Internet connection required. | "4 GB+ RAM, x64 or ARM64 processor" ; "internet connection required" | S1 | |
| C3 | Supported shells: Bash, Zsh, PowerShell, or CMD | "Shell: Bash, Zsh, PowerShell, or CMD." | S1 | |
| C4 | Native install command for macOS, Linux, WSL | `curl -fsSL https://claude.ai/install.sh \| bash` | S1, S2 | Labelled "Native Install (Recommended)" |
| C5 | Native install command for Windows PowerShell | `irm https://claude.ai/install.ps1 \| iex` | S1, S2 | |
| C6 | Native install command for Windows CMD | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` | S1, S2 | If `The token '&&' is not a valid statement separator` appears, the user is in PowerShell, not CMD. If `'irm' is not recognized as an internal or external command` appears, the user is in CMD, not PowerShell. |
| C7 | The installer shows no progress; after it finishes, open a new terminal and run `claude --version` | "The install command shows no progress while it downloads Claude Code. When the installer finishes, open a new terminal window and run `claude --version`." | S1 | If `claude` is not found, the install directory is not on PATH. |
| C8 | Native installs update themselves in the background | "Native installations automatically update in the background to keep you on the latest version." | S1 | |
| C9 | Homebrew install command; two casks: `claude-code` (stable channel, about a week behind) and `claude-code@latest` | `brew install --cask claude-code` ; "`claude-code` tracks the stable release channel, which is typically about a week behind" | S1 | Homebrew does not auto-update; run `brew upgrade claude-code` or `brew upgrade claude-code@latest`. |
| C10 | WinGet install command | `winget install Anthropic.ClaudeCode` | S1 | WinGet does not auto-update; run `winget upgrade Anthropic.ClaudeCode`. |
| C11 | apt, dnf and apk repositories exist for Debian/Ubuntu, Fedora/RHEL and Alpine. They have `stable` and `latest` channels and do not auto-update through Claude Code. | "Claude Code publishes signed apt, dnf, and apk repositories." ; "Package manager installations do not auto-update through Claude Code" | S1 | Upgrade: `sudo apt update && sudo apt upgrade claude-code`; `sudo dnf upgrade claude-code`; `apk update && apk upgrade claude-code`. apt install is `sudo apt install claude-code` after adding the repo (see S1 for the key and repo steps). Writer should link to S1 for the full repo steps, not copy them. |
| C12 | npm install is still supported and needs Node.js 22 or later. It installs the same native binary. | `npm install -g @anthropic-ai/claude-code` ; "The npm package requires Node.js 22 or later." ; "The npm package installs the same native binary as the standalone installer." | S1 | The docs list npm under "Advanced installation options". The install tab "Native Install (Recommended)" is the first choice. On older Node, npm prints an `EBADENGINE` warning but the install completes. |
| C13 | Do not use `sudo npm install -g` | "Do NOT use `sudo npm install -g` as this can lead to permission issues and security risks." | S1 | |
| C14 | To upgrade an npm install, run `npm install -g @anthropic-ai/claude-code@latest`; avoid `npm update -g` | "Avoid `npm update -g`, which respects the semver range from the original install and may not move you to the newest release." | S1 | |
| C15 | Native Windows: Git for Windows is optional. With it, Claude Code uses Git Bash for the Bash tool. Without it, Claude Code uses PowerShell as the shell tool. WSL does not need Git for Windows. | "Git for Windows is recommended on native Windows so Claude Code can use the Bash tool. If Git for Windows is not installed, Claude Code uses PowerShell as the shell tool instead. WSL setups do not need Git for Windows." | S1 | Setting for a custom path: `CLAUDE_CODE_GIT_BASH_PATH` in `env` of settings.json. |
| C16 | Windows options table: native Windows has no sandboxing; WSL 2 supports sandboxing; WSL 1 does not | "Native Windows ... Sandboxing: Not supported" ; "WSL 2 ... Supported" ; "WSL 1 ... Not supported" | S1 | WSL install: open the WSL distribution and run the Linux installer; launch `claude` inside WSL, not from PowerShell or CMD. |
| C17 | Alpine/musl needs `bash`, `curl`, `libgcc`, `libstdc++`, `ripgrep`, and `USE_BUILTIN_RIPGREP=0` | `apk add bash curl libgcc libstdc++ ripgrep` ; `"USE_BUILTIN_RIPGREP": "0"` | S1 | Optional detail; include only as one line. |
| C18 | `claude --version` prints a version number followed by `(Claude Code)` | "A working installation prints a version number such as `2.1.211 (Claude Code)`." | S1, S2 | Local: `claude --version` printed `2.1.294 (Claude Code)`; help: "-v, --version  Output the version number". |
| C19 | `claude doctor` prints read-only install and settings diagnostics without starting a session | "`claude doctor` prints read-only installation and settings diagnostics without starting a session, including install health, settings-file validation errors, and any warnings with suggested fixes." | S1, S4 | Local help: "doctor  Check the health of your Claude Code installation. Reads settings files in the current directory without a trust prompt. For a full checkup that can also fix issues, run /doctor in a session." S5: `/doctor` is a bundled skill that "proposes fixes that Claude applies after you confirm". |
| C20 | Claude Code needs a Pro, Max, Team, Enterprise or Console account; the free claude.ai plan does not include it | "Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access." | S1 | Audit item "free plan excluded" confirmed. |
| C21 | Third-party providers also work: Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry | "You can also use Claude Code with a third-party API provider like Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry." | S1, S3 | |
| C22 | Subscription login flow: run `claude` and follow the browser prompts. No API key is needed. | "After installing, log in by running `claude` and following the browser prompts." ; "no API key is required" (VS Code/JetBrains pages) | S1, S6, S7 | |
| C23 | On first launch Claude Code opens a browser. If the browser does not open, press `c` to copy the login URL. If the browser shows a code, paste it at `Paste code here if prompted`. | "press `c` to copy the login URL to your clipboard" ; "paste it into the terminal at the `Paste code here if prompted` prompt" | S3 | The code flow is common in WSL2, SSH and containers. Success text: `Login successful`. |
| C24 | Console login: the user can log in with Console credentials. On first login a "Claude Code" workspace is created in the Console. | "On first login, a \"Claude Code\" workspace is automatically created in the Console for centralized cost tracking." | S2, S3 | Console is at https://platform.claude.com/ (S2 link). The old audit line "console.anthropic.com" is replaced. |
| C25 | Console login without an API key is possible: choose the Console account at `/login`, then "Sign in with your Console account (recommended)" vs "Create an API key (legacy)". Requires v2.1.242+. | "Sign in with your Console account, labeled `(recommended)`" ; "Create an API key, labeled `(legacy)`" ; "Requires Claude Code v2.1.242 or later." | S3 | |
| C26 | `ANTHROPIC_API_KEY` is for API billing. In interactive mode Claude Code asks once to approve the key. If approved, it skips the login prompt. | "If you've set the `ANTHROPIC_API_KEY` environment variable and you approve the key when Claude Code asks whether to use it, Claude Code skips the login prompt." | S1, S3 | In `-p` mode the key is always used when present. |
| C27 | If a subscription user also sets `ANTHROPIC_API_KEY`, Claude Code uses the key once approved. Fix: `unset ANTHROPIC_API_KEY`, then check `/status`. | "Run `unset ANTHROPIC_API_KEY` to fall back to your subscription, and check `/status` to confirm which method is active." | S3 | |
| C28 | Credential precedence (top to bottom): cloud provider vars, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN`, Anthropic profile/federation, subscription OAuth from `/login` | "Subscription OAuth credentials from `/login`. This is the default for Claude Pro, Max, Team, and Enterprise users." | S3 | Writer may show a short version (key beats subscription). |
| C29 | `claude auth login` signs in. Flags: `--claudeai` (default), `--console`, `--email`, `--sso` | "`claude auth login` — Sign in to your Anthropic account. Use `--email` to pre-fill your email address, `--sso` to force SSO authentication, and `--console` to sign in with Anthropic Console for API usage billing instead of a Claude subscription" | S4 | Local help: "--claudeai Use Claude subscription (default)"; "--console Use Anthropic Console (API usage billing) instead of Claude subscription"; "--email <email> Pre-populate email address on the login page"; "--sso Force SSO login flow". |
| C30 | `claude auth logout` and `claude auth status` exist. `status` prints JSON by default (`--text` for text) and exits 0 if logged in, 1 if not. | "Show authentication status as JSON. Use `--text` for human-readable output. Exits with code 0 if logged in, 1 if not." | S4 | Local help: "login / logout / status". |
| C31 | Inside a session, `/login` signs in and `/logout` signs out | "`/login` Sign in to your Anthropic account" ; "`/logout` Sign out from your Anthropic account" | S5 | S3: "To log out and re-authenticate, type `/logout` at the Claude Code prompt." S2: "type `/login` inside the running session". `/login` is not available in `-p` mode ("Built-in commands that only run in the terminal interface, such as `/login`, aren't available" — headless page, not fetched as a listed source; do not state unless the headless page is added). |
| C32 | `claude setup-token` makes a one-year OAuth token for CI. Needs a Pro, Max, Team or Enterprise plan. Set it as `CLAUDE_CODE_OAUTH_TOKEN`. | "generate a one-year OAuth token with `claude setup-token`" ; "It does not save the token anywhere" | S3, S4 | Local help: "setup-token  Set up a long-lived authentication token". Link forward to the CI page. |
| C33 | Credentials are stored in the macOS Keychain, or in `~/.claude/.credentials.json` (mode `0600`) on Linux | "On Linux, credentials are stored in `~/.claude/.credentials.json` with file mode `0600`." | S3 | Windows: `%USERPROFILE%\.claude\.credentials.json`. |
| C34 | After login, the prompt shows the version, current model and working directory. `/help` lists commands. Shift+Tab switches the permission mode. | "The Claude Code prompt appears with the version, current model, and working directory shown above it." ; "Press `Shift+Tab` at any time to switch the permission mode" | S2 | |
| C35 | VS Code extension: needs VS Code 1.94.0 or later and a paid Claude subscription or Console account; no API key | "VS Code 1.94.0 or later" ; "any paid Claude subscription (Pro, Max, Team, or Enterprise) or a Claude Console account works, and no API key is required" | S6 | |
| C36 | Install the VS Code extension from the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`), search "Claude Code", click Install. Extension ID `anthropic.claude-code`. It also works in Cursor and other VS Code forks. | `vscode:extension/anthropic.claude-code` ; `cursor:extension/anthropic.claude-code` | S6 | Open Claude: Spark icon in the Editor Toolbar or the Activity Bar; Command Palette "Claude Code". Shortcut `Cmd+Esc` / `Ctrl+Esc` toggles focus between editor and Claude. |
| C37 | The VS Code extension chooses its starting permission mode from `claudeCode.initialPermissionMode` | "set `claudeCode.initialPermissionMode` in your VS Code user settings to `default`, `manual`, `acceptEdits`, `plan`, or `bypassPermissions`" | S8 | Cross-link to the permission modes page. |
| C38 | JetBrains plugin: supports IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, GoLand | "IntelliJ IDEA / PyCharm / Android Studio / WebStorm / PhpStorm / GoLand" | S7 | Plugin name on JetBrains Marketplace: "Claude Code [Beta]" (https://plugins.jetbrains.com/plugin/27310-claude-code-beta-). |
| C39 | The JetBrains plugin does not bundle the CLI. Install the CLI first, then the plugin, then restart the IDE. | "The plugin runs the `claude` command in your IDE's integrated terminal and connects to it. It does not bundle its own copy of the CLI" | S7 | If `claude` is not on PATH, the plugin shows "Cannot launch Claude Code". |
| C40 | JetBrains quick launch: `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux). From an external terminal, run `/ide` to connect. | "use `Cmd+Esc` (Mac) or `Ctrl+Esc` (Windows/Linux) to open Claude Code directly from your editor" ; "Use the `/ide` command in any external terminal to connect Claude Code to your JetBrains IDE" | S7 | WSL users: set Claude command to `wsl -d Ubuntu -- bash -lic "claude"`. |
| C41 | Auto-update: Claude Code checks on startup and periodically. Updates install in the background and take effect on the next start. `claude doctor` shows the last update result. | "Updates download and install in the background, then take effect the next time you start Claude Code." | S1 | |
| C42 | `claude update` applies an update now. It reports `Successfully updated from <old version> to version <new version>` or `Claude Code is up to date (<version>)`. | "`claude update` Update to latest version" | S1, S4 | Local help: "update|upgrade  Check for updates and install if available". |
| C43 | Release channels: `autoUpdatesChannel` is `"latest"` (default) or `"stable"` (about one week old). Set via `/config` or settings.json. | "`\"latest\"`, the default ... `\"stable\"`: use a version that is typically about one week old, skipping releases with major regressions" | S1 | Install a specific version: `curl -fsSL https://claude.ai/install.sh \| bash -s 2.1.89`; stable: `... \| bash -s stable`. Local help: "install [options] [target]  Install Claude Code native build. Use [target] to specify version (stable, latest, or specific version)". |
| C44 | To turn off background update checks, set `DISABLE_AUTOUPDATER` to `"1"` in the `env` key of settings.json. `DISABLE_UPDATES` blocks all update paths. | "`DISABLE_AUTOUPDATER` only stops the background check; `claude update` and `claude install` still work. To block all update paths, including manual updates, set `DISABLE_UPDATES` instead." | S1 | |
| C45 | Uninstall (native, macOS/Linux/WSL): `rm -f ~/.local/bin/claude` and `rm -rf ~/.local/share/claude`; npm: `npm uninstall -g @anthropic-ai/claude-code` | as quoted | S1 | Optional for the page. |
| C46 | Other interfaces exist: web, desktop app, Slack, GitHub Actions, GitLab CI/CD | "Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD with GitHub Actions and GitLab." | S2 | Use to point forward to the Automate group. |

## Old content
| Old section (file › heading) | Decision | Reason |
|---|---|---|
| setup.mdx › metadata description ("Set up your subscription, API key, CLI, and VSCode extension") | rewrite | An API key is not needed for a subscription login (C22). |
| setup.mdx › step 1 "Get subscription from anthropic.com" | rewrite | Name the plans and say the free plan has no Claude Code (C20). |
| setup.mdx › step 2 "Create API key from console.anthropic.com" | delete | A subscription login needs no key (C22). Console is platform.claude.com, and a Console login needs no key either (C24, C25). Move to a short "Console / API key" subsection (C26, C27). |
| setup.mdx › step 3 npm install | rewrite | Native installer is the recommended path; npm is an alternative and needs Node.js 22+ (C4-C6, C12). |
| setup.mdx › step 4 "cmd> claude" as a check | rewrite | Check with `claude --version` and `claude doctor` (C18, C19). |
| setup.mdx › step 5 "claude /login" | rewrite | `/login` is an in-session command; the shell command is `claude auth login` (C29, C31). |
| setup.mdx › step 6 "Authenticate with OAuth 2.0 by browser" | keep (reworded) | Browser login is correct (C23). Drop the "OAuth 2.0" label; the source does not use it for the flow. |
| setup.mdx › steps 7-8 VSCode extension + "enter API key" | rewrite | Extension signs in with the account; no key (C35, C36). Add JetBrains (C38-C40). |
| setup.mdx › step 9 "Done!" | rewrite | Replace with a first-session check: open a project, run `claude`, ask a question (C34). |
| setup.mdx › InfoCard "API Key Setup" | delete | Misleading (C22). |
| (missing) Windows/WSL | add | C15, C16. |
| (missing) updating | add | C41-C44. |

## Page outline
- ## Before you install — account types (C20, C21), supported OS and hardware (C1-C3). QA angle: say which machine runs the tests (local, CI runner, WSL).
- ## Install the CLI
  - ### Native installer (recommended) — C4, C5, C6, C7, C8
  - ### Homebrew, WinGet and Linux package managers — C9, C10, C11
  - ### npm (alternative) — C12, C13
  - ### Windows and WSL notes — C15, C16 (sandbox needs WSL 2), C17 optional. Callout: a QA team on Windows that wants sandboxing should use WSL 2.
- ## Verify the install — `claude --version` (C18), `claude doctor` (C19), PATH tip (C7)
- ## Log in
  - ### Subscription (browser flow) — C22, C23, C34
  - ### Console account or API key — C24, C25, C26, C27
  - ### Commands: `claude auth login`, `/login`, `/logout`, `claude auth status` — C29, C30, C31
  - ### CI tokens (forward link) — C32, C33
- ## IDE integrations — VS Code (C35, C36, C37), JetBrains (C38-C40)
- ## Keep Claude Code up to date — C41-C44 (QA angle: pin or use `stable` on shared CI runners so test results do not change under you)
- ## Next steps — link to Models, Permission Modes, Headless & CI (C46)

## Open questions
- S1 gives no explicit statement that npm is "deprecated". It lists npm under "Advanced installation options" and labels the native installer "(Recommended)". The writer must say "native installer is recommended; npm is an alternative", not "npm is deprecated".
- The VS Code page says the extension is "the recommended way to use Claude Code in VS Code", and the page's prerequisites do not require the CLI. The page text fetched did not state whether the extension bundles the CLI. The writer must not claim either way.
- Exact `/login` behavior in `-p` mode comes from the headless page, which is not a source on this page. Do not state it.
- Version numbers in examples (2.1.211, 2.1.89) are the docs' examples, not the current release. Local CLI is 2.1.294.
