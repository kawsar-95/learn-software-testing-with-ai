# Design Spec: W3Schools-Style Theme Redesign
**Date:** 2026-04-18

## Summary

Replace the current dark cyberpunk theme (dark navy background, cyan accents, glow effects) with a clean W3Schools-style tutorial theme — white background, readable sans-serif typography, Claude Purple accent color, and VS Code dark code blocks.

---

## Design Decisions

| Aspect | Decision |
|---|---|
| Base style | W3Schools Classic (white bg, light gray sidebar) |
| Accent color | Claude Purple `#7B2FF7` |
| Code blocks | VS Code Dark (`#1e1e1e` bg, syntax-tinted text) |
| Font | Verdana, Geneva, sans-serif (W3Schools default) |
| Body text color | `#333` on `#fff` |

---

## Visual Design

### Top Bar
- Background: `#7B2FF7` (Claude Purple)
- White bold text: site title
- Height: ~44px
- Replaces the current dark navy header

### Sidebar
- Background: `#f1f1f1`
- Right border: `1px solid #ddd`
- Width: 280px (unchanged)
- Nav links: `#333` text, `13px` Verdana
- Active link: `background #e8d5ff`, `border-left: 3px solid #7B2FF7`, purple text
- Hover: `background #e8e8e8`
- No glow effects, no gradients

### Main Content
- Background: `#fff`
- Body text: `#555`, `13-14px` Verdana, `line-height 1.7`
- `h1`: `22px`, `#333`
- `h2`: `17px`, `#333`, `border-bottom: 2px solid #7B2FF7`
- `h3`: `14px`, `#333`
- Breadcrumb navigation above page title

### Code Blocks
- Background: `#1e1e1e`
- Default text: `#d4d4d4`
- Command names: `#9cdcfe` (light blue)
- Arguments/strings: `#ce9178` (orange)
- Comments: `#6a9955` (green)
- Border-radius: `4px`, padding: `14px 18px`
- No colored left border (VS Code style stands alone)

### Note / Highlight Boxes
- Background: `#f9f5ff` (soft purple tint)
- Left border: `4px solid #7B2FF7`
- Replaces current cyan highlight boxes

### Cards (index page)
- Background: `#fff`
- Border: `1px solid #ddd`
- Hover: subtle `box-shadow`, no translate animation
- Card title: `#333`

### Tables
- `th` background: `#7B2FF7`, white text
- Alternating rows: `#fafafa`
- Border: `1px solid #f0f0f0`

### Buttons
- Primary: `#7B2FF7` background, white text (Next »)
- Secondary: `#f1f1f1` background, `#333` text, `1px solid #ccc` (« Prev)
- Border-radius: `2px`

### Footer
- Background: `#f1f1f1`
- Top border: `1px solid #ddd`
- Small gray text

---

## Files to Change

1. **`styles/globals.css`** — complete rewrite of all color variables, backgrounds, gradients, glow effects, and component styles
2. **`components/Layout.js`** — update top bar inline styles (currently hardcoded dark navy)
3. **`components/Sidebar.js`** — update sidebar/hamburger inline styles
4. **`pages/*.js`** — remove hardcoded dark-theme *color* inline styles only (`background: #0f0f1e`, `color: #00d4ff`, `border-color: #00d4ff`, text-shadow/glow effects). Keep layout/structural inline styles (maxWidth, padding, textAlign, etc.) untouched.

---

## What Does NOT Change

- Layout structure (sidebar + main content, fixed top bar)
- Responsive breakpoints (1200px, 768px, 576px)
- Hamburger menu behavior
- Page content and copy
- Navigation links
- Next.js routing

---

## Success Criteria

- No dark backgrounds anywhere except VS Code code blocks
- No cyan (`#00d4ff`) or glow/neon effects remaining
- Site matches the approved mockup: white page, purple header, gray sidebar, dark code blocks
- Passes `npm run build` without errors
