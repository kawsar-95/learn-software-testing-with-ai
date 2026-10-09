# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static single-page educational web app teaching QA engineers and SDETs how to use Claude AI for software testing. No build process, no backend, no package manager.

## Running the Project

Open `index.html` directly in a browser, or serve locally:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Architecture

Three files make up the entire application:

- **`index.html`** — All content and markup. Sections are identified by `id` attributes and linked from the sidebar. Adding content means adding sections here.
- **`styles.css`** — Dark/cyberpunk theme. Uses CSS custom properties for the color scheme (cyan `#00d4ff`, purple `#7b2ff7`). Responsive breakpoints at 1200px, 768px, and 576px.
- **`script.js`** — Three behaviors: (1) sidebar active-state tracking via `IntersectionObserver` + scroll listener, (2) smooth scroll on nav link clicks, (3) copy-to-clipboard buttons auto-injected into all `<pre><code>` blocks on `DOMContentLoaded`.

## Content Structure

The tutorial covers a layered AI system for testing:

- **Core Layer**: Prompt → Skill → Agent hierarchy
- **Context Layer**: Codebase, logs, DB, Jira as context sources
- **Skills**: Reusable slash-command modules (`analyze-requirement`, `explain-code`, `find-bug`, `test-design`, `analyze-security`, `analyze-rootcause`)
- **Agents**: `sdet-agent` (code/root-cause/security focus) and `qa-agent` (requirements/bugs/test design focus)
- **MCP Servers**: Jira MCP and Database MCP for live data access

`Software Testing with AI.txt` is the plain-text source of truth for all tutorial content — use it as reference when updating `index.html`.

## Sidebar Navigation

Each `<section id="...">` in `index.html` must have a matching `<a href="#...">` in the sidebar `<nav>`. The JS tracks scroll position and adds `.active` to the matching link. New sections need manual sidebar entries.
