// Card text is copied from the old landing page. Hrefs come from scripts/route-map.json.
export const TOPIC_GROUPS = [
  {
    title: 'Getting Started',
    items: [
      {
        href: '/getting-started/setup/',
        icon: 'Download',
        title: 'Install Claude',
        text: 'Step-by-step setup: subscription, API key, CLI, VSCode extension.',
      },
      {
        href: '/getting-started/models/',
        icon: 'Cpu',
        title: 'Claude Models',
        text: 'Opus vs Sonnet vs Haiku — pricing, when to use each model.',
      },
      {
        href: '/getting-started/modes/',
        icon: 'SlidersHorizontal',
        title: 'Plan vs Act Mode',
        text: 'Two core modes — when Claude plans first vs acts immediately.',
      },
    ],
  },
  {
    title: 'Foundations',
    items: [
      {
        href: '/foundations/ai-systems/',
        icon: 'Layers',
        title: 'AI Systems',
        text: 'Core + Context + Interface layers — how modern AI systems work end-to-end.',
      },
      {
        href: '/foundations/prompt/',
        icon: 'PenTool',
        title: 'Prompt Engineering',
        text: 'Role + Context + Scope + Constraints — how to write effective prompts.',
      },
      {
        href: '/foundations/context/',
        icon: 'Brain',
        title: 'Context Engineering',
        text: 'Design what the AI sees — RAG, real data, dynamic context injection.',
      },
      {
        href: '/foundations/principles/',
        icon: 'Star',
        title: 'Key Principles',
        text: '8 core principles for building reliable, autonomous AI testing systems.',
      },
    ],
  },
  {
    title: 'Configure',
    items: [
      {
        href: '/configure/structure/',
        icon: 'FolderTree',
        title: 'Claude Architecture',
        text: 'Inside `.claude/` — memory, skills, agents, commands & `.claude.json` explained.',
      },
      {
        href: '/configure/claude-md/',
        icon: 'FileCode',
        title: 'CLAUDE.md',
        text: 'Project config file — teach Claude your stack, conventions, and routing once.',
      },
      {
        href: '/configure/memory/',
        icon: 'MemoryStick',
        title: 'Memory',
        text: 'Persistent knowledge across sessions — token costs, update methods.',
      },
      {
        href: '/configure/commands/',
        icon: 'Terminal',
        title: 'Commands',
        text: 'Slash commands — /qa-agent, /sdet-agent, /save-memory — how to create them.',
      },
    ],
  },
  {
    title: 'Extend',
    items: [
      {
        href: '/extend/skills/',
        icon: 'WandSparkles',
        title: 'Skills',
        text: '6 reusable skill files: find-bug, test-design, explain-code, analyze-rootcause, and more.',
      },
      {
        href: '/extend/agents/',
        icon: 'Bot',
        title: 'Agents',
        text: 'qa-agent + sdet-agent — orchestrator patterns, parallel/sequential spawning, cross-agent delegation.',
      },
      {
        href: '/extend/hooks/',
        icon: 'Anchor',
        title: 'Hooks',
        text: "PreToolUse + PostToolUse — intercept Claude's actions, auto-format, block protected files.",
      },
      {
        href: '/extend/mcp/',
        icon: 'Server',
        title: 'MCP Server',
        text: 'Bridge AI to Jira, DB, GitHub, Slack — install from marketplace or CLI.',
      },
      {
        href: '/extend/superpower/',
        icon: 'Zap',
        title: '⚡ Superpower Mode',
        text: 'Remove approval prompts — Claude runs fully autonomous with hooks as guardrails.',
        featured: true,
      },
    ],
  },
]
