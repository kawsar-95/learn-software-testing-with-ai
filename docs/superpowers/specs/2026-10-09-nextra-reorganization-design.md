# Design Spec: Phase 1 – Reorganize the Site on Nextra
**Date:** 2026-10-09
**Status:** Draft – waiting for review

## Summary

Move the tutorial site from Next.js Pages Router + Bootstrap to **Nextra 4 (`nextra-theme-docs`)** with MDX content. Remove the current W3Schools-style theme, dead files, and all deploy config. Phase 1 is a **faithful port**: the tutorial text does not change.

## Roadmap (context)

| Phase | Scope | Status |
|---|---|---|
| **1** | **Reorganize on Nextra** (this spec) | Draft |
| 2 | Content update from [the audit](../audits/2026-10-09-content-audit.md): fixes, page merges, new topics | Later |
| 3 | Modern visual design (theming on top of Nextra) | Later |
| 4 | Extra features not built into Nextra (for example reading progress) | Later |

Nextra supplies dark mode, search, prev/next links, and an "On this page" list. Phase 4 is therefore small.

## Decisions

| Topic | Decision |
|---|---|
| Framework | Next.js 16 + React 19 + Nextra 4.6 + `nextra-theme-docs`. If Nextra fails to build on Next 16, pin Next 15. |
| Router | App Router with Nextra's content directory (`content/` + `app/[[...mdxPath]]/page.jsx`). |
| Content format | One `.mdx` file per page. |
| Tutorial text | No changes in phase 1. Only markup changes. |
| URLs | New URLs `/<group>/<page>/`. Old URLs are not kept. |
| Home page | Custom landing page (`content/index.mdx`, full-width layout). |
| Theme | Nextra default, primary color Claude Purple `#7B2FF7`, light and dark mode. The current theme is removed. |
| Build output | Static export (`output: 'export'`) to `out/`. No `basePath`. |
| Deploy | Out of scope. The owner deploys separately. No workflow, no host config. |
| Host-specific values | Env vars `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID`. Both are optional. |
| Search | Pagefind, run as `postbuild`. |
| Icons | Font Awesome is removed. `lucide-react` is used on the landing page only. |

## File layout

```
app/
  layout.jsx                 ← Nextra Layout, Navbar, Footer, metadata, optional GA
  [[...mdxPath]]/page.jsx    ← renders content/ MDX
  sitemap.js                 ← generated sitemap (empty if NEXT_PUBLIC_SITE_URL is not set)
  robots.js                  ← generated robots.txt
content/
  _meta.js                   ← top-level order: index, getting-started, foundations, configure, extend
  index.mdx                  ← landing page
  getting-started/  _meta.js, setup.mdx, models.mdx, modes.mdx
  foundations/      _meta.js, ai-systems.mdx, prompt.mdx, context.mdx, principles.mdx
  configure/        _meta.js, structure.mdx, claude-md.mdx, memory.mdx, commands.mdx
  extend/           _meta.js, skills.mdx, agents.mdx, hooks.mdx, mcp.mdx, superpower.mdx, marketplace.mdx
components/
  landing/                   ← Hero, TopicCards
  mdx/                       ← only components that Nextra does not supply (for example Compare)
mdx-components.js
public/
  resources/mermaid-diagram.png
next.config.mjs
package.json
CLAUDE.md                    ← rewritten for the new structure
```

### Sidebar groups

| Group (folder) | Sidebar title | Pages (current labels) |
|---|---|---|
| `/` | – | Landing page |
| `getting-started/` | Getting Started | Install Claude, Claude Models, Plan vs Act Mode |
| `foundations/` | Foundations | AI Systems, Prompt Engineering, Context Engineering, Key Principles |
| `configure/` | Configure | Claude Architecture, CLAUDE.md, Memory, Commands |
| `extend/` | Extend | Skills, Agents, Hooks, MCP Server, ⚡ Superpower, Marketplaces |

Page labels stay as they are now. Phase 2 renames and merges pages.

## Markup mapping

| Old markup | New markup |
|---|---|
| `<div className="code-block"><pre style=…>` (34 blocks) | Fenced code block with a language tag. Nextra adds syntax colors and a copy button. |
| Note / highlight boxes | `<Callout>` from Nextra |
| Bootstrap card grids (`row` / `col-*` / `card`) | `<Cards>` from Nextra, or `<Compare>` (custom) for side-by-side comparisons |
| Bootstrap accordions (3 pages) | `<details><summary>` |
| Bootstrap tables | Markdown tables |
| Font Awesome icons in headings | Removed |
| Inline `style={{…}}` (382) | Removed |
| `<Link href="/x">` between pages | Markdown links to the new `/<group>/<page>/` URLs |
| Page title + description props on `Layout` | MDX frontmatter `title` and `description` |
| The `<img>` on the structure page | Markdown image or `<img>` with the `public/` path |

If an old page has markup with no mapping in this table, the implementer adds the smallest custom component to `components/mdx/` and records it in the plan.

## Landing page

- **Hero:** title, subtitle, and a "Get Started" button to `/getting-started/setup/`. The text is the current hero text.
- **Topic cards:** one card per page, grouped under the four sidebar groups. The card text is the current card text from `pages/index.js`.
- Layout: full width, no sidebar, no "On this page" list (`theme.layout: 'full'` in `_meta.js`).

## Metadata and SEO

- Each MDX file has frontmatter `title` and `description`, copied from the current `Layout` props.
- `app/layout.jsx` sets the default title template `%s – Software Testing with AI`.
- If `NEXT_PUBLIC_SITE_URL` is set: `metadataBase`, canonical URLs, Open Graph URL and image, `app/sitemap.js` with all routes.
- If `NEXT_PUBLIC_SITE_URL` is not set: no canonical tags, and `sitemap.xml` is an empty `<urlset>`. The build still passes.
- If `NEXT_PUBLIC_GA_ID` is set: the layout loads the Google Analytics tag with that ID. If not, no analytics loads.

## Removed

| Item | Reason |
|---|---|
| `pages/` (all 20 files) | Replaced by `content/` and `app/` |
| `components/Layout.js`, `components/Sidebar.js` | Replaced by the Nextra layout |
| `styles/globals.css` | Current theme removed |
| `script.js`, `styles.css` (root) | Dead files from the old dark theme |
| `resources/` (root) | Duplicate of `public/resources/` |
| `scripts/fix-pre-colors.py` | One-off fix script, no longer needed |
| `.superpowers/brainstorm/` | Old mockups from the April redesign |
| `.github/workflows/deploy.yml` | Deploy is out of scope |
| `public/googlec85fd345958cb9c8.html`, `public/robots.txt`, `public/sitemap.xml` | Tied to the old URL; robots and sitemap are now generated |
| `bootstrap` dependency, Font Awesome CDN, Bootstrap JS CDN | Not used |
| All hard-coded `roadtocareer.github.io` URLs | Old URL removed |

Kept: `docs/superpowers/` (design history and audit), `.gitignore` (plus `_pagefind` output is inside `out/`, already ignored).

## Verification

0. **Baseline first:** before any file is deleted, build the old site and copy its `out/` to `.baseline/out/` (git-ignored) as the text baseline.
1. `npm run build` passes with no errors and no warnings from Nextra.
2. A check script confirms that `out/` has an `index.html` for each of the 19 routes (landing + 18 pages).
3. **Text check:** a script extracts the visible text of each page from the old build and from the new build, normalizes white space, and compares them. Allowed differences: navigation, footer, icons, and the "Copy" button labels. Any other missing tutorial text fails the check.
4. Pagefind creates `out/_pagefind/`, and a search for "hooks" returns the hooks page.
5. A browser check on the served `out/` folder: desktop and 375 px mobile width, light and dark mode, sidebar groups, copy buttons, prev/next links, landing page cards.
6. A build without the env vars passes. A build with `NEXT_PUBLIC_SITE_URL` set produces `out/sitemap.xml` with all 19 routes.

## Out of scope

- Any change to tutorial text, page names, or page count (phase 2).
- Custom visual design beyond the primary color (phase 3).
- Deploy config, hosting, domain, and repo creation.
