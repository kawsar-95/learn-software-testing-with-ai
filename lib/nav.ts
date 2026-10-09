/**
 * The one ordered list of tutorial pages. It drives the sidebar, prev/next,
 * the home contents, the search index, the sitemap, and the static params.
 * Each page is content/<group>/<slug>.mdx and is served at /<group>/<slug>/.
 */
export type GroupSlug = "getting-started" | "foundations" | "configure" | "extend";

export type NavPage = {
  group: GroupSlug;
  slug: string;
  /** The sidebar label. */
  title: string;
  /** The one-line summary on the home page. */
  description: string;
  /** 1–17, continuous across the groups. */
  part: number;
  href: string;
};

export type NavGroup = { slug: GroupSlug; title: string; pages: NavPage[] };

type PageEntry = { slug: string; title: string; description: string };

const SOURCE: { slug: GroupSlug; title: string; pages: PageEntry[] }[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    pages: [
      {
        slug: "setup",
        title: "Install Claude",
        description: "Step-by-step setup: subscription, API key, CLI, VSCode extension.",
      },
      {
        slug: "models",
        title: "Claude Models",
        description: "Opus vs Sonnet vs Haiku — pricing, when to use each model.",
      },
      {
        slug: "modes",
        title: "Plan vs Act Mode",
        description: "Two core modes — when Claude plans first vs acts immediately.",
      },
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    pages: [
      {
        slug: "ai-systems",
        title: "AI Systems",
        description: "Core + Context + Interface layers — how modern AI systems work end-to-end.",
      },
      {
        slug: "prompt",
        title: "Prompt Engineering",
        description: "Role + Context + Scope + Constraints — how to write effective prompts.",
      },
      {
        slug: "context",
        title: "Context Engineering",
        description: "Design what the AI sees — RAG, real data, dynamic context injection.",
      },
      {
        slug: "principles",
        title: "Key Principles",
        description: "8 core principles for building reliable, autonomous AI testing systems.",
      },
    ],
  },
  {
    slug: "configure",
    title: "Configure",
    pages: [
      {
        slug: "structure",
        title: "Claude Architecture",
        description:
          "Inside `.claude/` — memory, skills, agents, commands & `.claude.json` explained.",
      },
      {
        slug: "claude-md",
        title: "CLAUDE.md",
        description:
          "Project config file — teach Claude your stack, conventions, and routing once.",
      },
      {
        slug: "memory",
        title: "Memory",
        description: "Persistent knowledge across sessions — token costs, update methods.",
      },
      {
        slug: "commands",
        title: "Commands",
        description:
          "Slash commands — /qa-agent, /sdet-agent, /save-memory — how to create them.",
      },
    ],
  },
  {
    slug: "extend",
    title: "Extend",
    pages: [
      {
        slug: "skills",
        title: "Skills",
        description:
          "6 reusable skill files: find-bug, test-design, explain-code, analyze-rootcause, and more.",
      },
      {
        slug: "agents",
        title: "Agents",
        description:
          "qa-agent + sdet-agent — orchestrator patterns, parallel/sequential spawning, cross-agent delegation.",
      },
      {
        slug: "hooks",
        title: "Hooks",
        description:
          "PreToolUse + PostToolUse — intercept Claude's actions, auto-format, block protected files.",
      },
      {
        slug: "mcp",
        title: "MCP Server",
        description: "Bridge AI to Jira, DB, GitHub, Slack — install from marketplace or CLI.",
      },
      {
        slug: "superpower",
        title: "⚡ Superpower",
        description:
          "Remove approval prompts — Claude runs fully autonomous with hooks as guardrails.",
      },
      {
        // No home card existed for this page, so this is its MDX description.
        slug: "marketplace",
        title: "Marketplaces",
        description:
          "Explore Claude AI marketplace for software testing tools, MCP servers, skills, and agents. Extend Claude Code with community-built testing integrations.",
      },
    ],
  },
];

let lastPart = 0;

export const GROUPS: NavGroup[] = SOURCE.map((group) => ({
  slug: group.slug,
  title: group.title,
  pages: group.pages.map((page) => ({
    ...page,
    group: group.slug,
    part: ++lastPart,
    href: `/${group.slug}/${page.slug}/`,
  })),
}));

export const PAGES: NavPage[] = GROUPS.flatMap((group) => group.pages);

export function getPage(group: string, slug: string): NavPage | undefined {
  return PAGES.find((page) => page.group === group && page.slug === slug);
}

/** The pages before and after this one. The home page is not in the chain. */
export function getNeighbors(group: string, slug: string): { prev?: NavPage; next?: NavPage } {
  const i = PAGES.findIndex((page) => page.group === group && page.slug === slug);
  if (i === -1) return {};
  return { prev: PAGES[i - 1], next: PAGES[i + 1] };
}
