/**
 * The one ordered list of tutorial pages. It drives the sidebar, prev/next,
 * the home contents, the search index, the sitemap, and the static params.
 * Each page is content/<group>/<slug>.mdx and is served at /<group>/<slug>/.
 */
export type GroupSlug = "getting-started" | "foundations" | "configure" | "extend" | "automate";

export type NavPage = {
  group: GroupSlug;
  slug: string;
  /** The sidebar label. */
  title: string;
  /** The one-line summary on the home page. */
  description: string;
  /** The one-line italic tagline on the home page. Plain words, no claims that need a source. */
  tagline: string;
  /** Starts at 1 and runs on across the groups. */
  part: number;
  href: string;
};

export type NavGroup = { slug: GroupSlug; title: string; pages: NavPage[] };

type PageEntry = { slug: string; title: string; description: string; tagline?: string };

const SOURCE: { slug: GroupSlug; title: string; pages: PageEntry[] }[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    pages: [
      {
        slug: "setup",
        title: "Install Claude Code",
        description: "Step-by-step setup: subscription, API key, CLI, VSCode extension.",
        tagline: "from zero to a working CLI",
      },
      {
        slug: "models",
        title: "Claude Models",
        description: "Opus vs Sonnet vs Haiku — pricing, when to use each model.",
        tagline: "pick the right model for the job",
      },
      {
        slug: "permission-modes",
        title: "Permission Modes",
        description: "How much Claude may do on its own — plan first, ask first, or act at once.",
        tagline: "decide how much Claude does alone",
      },
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    pages: [
      {
        slug: "how-claude-code-works",
        title: "How Claude Code Works",
        description: "The agentic loop, tools, the context window, compaction, and checkpoints.",
        tagline: "what Claude sees and how it acts",
      },
      {
        slug: "prompting",
        title: "Prompting for QA",
        description: "Specific prompts, a check Claude can run, and prompts for QA tasks.",
        tagline: "ask for tests the way a QA would",
      },
      {
        slug: "test-design",
        title: "Test Design with Claude",
        description: "Turn requirements into test cases with ISTQB test design techniques.",
        tagline: "from requirements to solid test cases",
      },
      {
        slug: "principles",
        title: "Key Principles",
        description: "Eight principles for reliable testing with Claude Code.",
        tagline: "principles to design AI testing by",
      },
    ],
  },
  {
    slug: "configure",
    title: "Configure",
    pages: [
      {
        slug: "claude-md",
        title: "CLAUDE.md & Memory",
        description:
          "Teach Claude your stack and conventions once — and keep knowledge across sessions.",
        tagline: "write down your conventions once",
      },
      {
        slug: "settings",
        title: "Settings & the .claude Folder",
        description: "Inside `.claude/` and `settings.json` — what each file does and where it lives.",
        tagline: "know what each file in .claude does",
      },
    ],
  },
  {
    slug: "extend",
    title: "Extend",
    pages: [
      {
        slug: "skills",
        title: "Skills & Commands",
        description:
          "Reusable skill files and slash commands: find-bug, test-design, explain-code, and more.",
        tagline: "turn a good prompt into a command",
      },
      {
        slug: "subagents",
        title: "Subagents",
        description:
          "qa-agent + sdet-agent — orchestrator patterns, parallel/sequential spawning, cross-agent delegation.",
        tagline: "give each testing job its own specialist",
      },
      {
        slug: "hooks",
        title: "Hooks",
        description:
          "Run your own code before or after Claude's actions — auto-format, block protected files.",
        tagline: "run your own checks around Claude",
      },
      {
        slug: "mcp",
        title: "MCP Servers",
        description: "Bridge AI to Jira, DB, GitHub, Slack — install from the CLI or a plugin.",
        tagline: "connect Claude to your tools and data",
      },
      {
        slug: "plugins",
        title: "Plugins & Marketplaces",
        description: "Install and share bundles of skills, agents, hooks, and MCP servers.",
        tagline: "share your setup as one bundle",
      },
    ],
  },
  {
    slug: "automate",
    title: "Automate",
    pages: [
      {
        slug: "headless",
        title: "Headless & CI",
        description: "Run Claude Code in scripts and CI jobs with no interactive session.",
        tagline: "run Claude from scripts, no terminal",
      },
      {
        slug: "github-actions",
        title: "GitHub Actions",
        description: "Run Claude Code in a GitHub Actions workflow to review and analyze.",
        tagline: "put Claude to work in your pipeline",
      },
      {
        slug: "playwright",
        title: "Browser Testing with Playwright",
        description: "Use Claude Code to write, run, and debug Playwright end-to-end tests.",
        tagline: "write, run, and fix browser tests",
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
    tagline: page.tagline ?? "",
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
