# W3Schools Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark cyberpunk theme with a clean W3Schools-style tutorial look — white background, Claude Purple (`#7B2FF7`) accent, VS Code dark code blocks.

**Architecture:** All visual changes flow from `styles/globals.css` (the foundation), then two component files for hardcoded inline styles, then a batch script to sweep 18 page files for remaining dark-color inline overrides.

**Tech Stack:** Next.js 14, CSS (no CSS-in-JS library), Bootstrap 5 (already loaded via CDN)

---

## File Map

| File | Change |
|---|---|
| `styles/globals.css` | Complete rewrite — new color palette, remove all gradients/glows |
| `components/Sidebar.js` | Header bar inline styles: dark navy → purple |
| `components/Layout.js` | Copy button success color: `#00ff88` → `#7B2FF7` |
| `scripts/fix-page-colors.py` | One-off batch script: sweep all `pages/*.js` for dark-color inline styles |

---

## Task 1: Rewrite `styles/globals.css`

**Files:**
- Modify: `styles/globals.css`

- [ ] **Step 1: Replace the entire file**

Open `styles/globals.css` and replace all contents with:

```css
* {
  scroll-behavior: smooth;
  box-sizing: border-box;
}

body {
  background-color: #fff;
  color: #333;
  font-family: Verdana, Geneva, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

/* ── Sidebar ── */
.sidebar {
  position: fixed;
  left: 0;
  top: 56px;
  width: 280px;
  height: calc(100vh - 56px);
  background: #f1f1f1;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 12px 0;
  z-index: 1000;
}

.sidebar::-webkit-scrollbar       { width: 6px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  font-size: 13px;
  border-left: 3px solid transparent;
  transition: background 0.15s;
}

.sidebar-title:hover {
  background: #e8e8e8;
  color: #333;
}

.sidebar-title.active {
  background: #e8d5ff;
  border-left-color: #7B2FF7;
  color: #7B2FF7;
  font-weight: bold;
}

/* ── Hamburger ── */
.hamburger-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  gap: 5px;
  margin-right: 15px;
}

.hamburger-btn span {
  width: 24px;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger-btn.active span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
.hamburger-btn.active span:nth-child(2) { opacity: 0; }
.hamburger-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

/* ── Layout ── */
.main-content { margin-left: 280px; }

@media (max-width: 1200px) {
  .sidebar      { width: 250px; }
  .main-content { margin-left: 250px; }
}

@media (max-width: 768px) {
  .sidebar       { width: 200px; }
  .main-content  { margin-left: 200px; }
  .sidebar-title { font-size: 12px; padding: 7px 12px; }
}

@media (max-width: 576px) {
  .hamburger-btn { display: flex; }
  .sidebar       { width: 280px; left: -280px; transition: left 0.3s ease; }
  .sidebar.show  { left: 0; }
  .main-content  { margin-left: 0; }
}

/* ── Hero ── */
.hero {
  background: #7B2FF7;
  color: #fff;
  padding: 80px 0;
  text-align: center;
}

/* ── Sections ── */
.section { padding: 40px 0; border-bottom: 1px solid #eee; }

.section h2 {
  color: #333;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 2px solid #7B2FF7;
  padding-bottom: 8px;
}

.section h3 { color: #333; }
.section h4 { color: #333; }

/* ── Cards ── */
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: box-shadow 0.2s;
  color: #333;
}

.card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); }
.card-title { color: #333; font-weight: bold; }
.card-text  { color: #555; font-size: 13px; }

/* ── Code Blocks (VS Code dark) ── */
.code-block {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 14px 18px;
  font-family: 'Courier New', monospace;
  color: #d4d4d4;
  overflow-x: auto;
  margin: 14px 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.code-block pre {
  color: #d4d4d4;
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

/* ── Copy Button ── */
.code-block-wrapper { position: relative; }

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0.75;
  font-size: 0.75rem;
  padding: 3px 10px;
  transition: opacity 0.2s;
}

.copy-btn:hover { opacity: 1; }

/* ── Badges ── */
.badge-custom {
  background: #7B2FF7;
  color: #fff;
  padding: 4px 10px;
  border-radius: 3px;
  display: inline-block;
  margin: 3px;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

/* ── List Items ── */
.list-item { padding: 10px 0; border-bottom: 1px solid #eee; }
.list-item:last-child { border-bottom: none; }
.list-item strong { color: #7B2FF7; }

/* ── Accordion ── */
.accordion-item {
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
  margin-bottom: 8px !important;
  overflow: hidden;
  background: #fff !important;
}

.accordion-button {
  background: #f9f5ff !important;
  color: #333 !important;
  border: none !important;
  font-weight: bold;
}

.accordion-button:not(.collapsed) {
  background: #e8d5ff !important;
  color: #7B2FF7 !important;
  box-shadow: none !important;
}

.accordion-body {
  background: #fff;
  color: #555;
  border-top: 1px solid #eee;
}

/* ── Tables ── */
.table { color: #333; }
.table th { background: #7B2FF7; color: #fff; border-color: #7B2FF7; font-weight: bold; }
.table td { border-color: #eee; color: #555; }
.table-striped tbody tr:nth-of-type(odd) { background: #fafafa; }

/* ── Buttons ── */
.btn-primary {
  background: #7B2FF7 !important;
  border-color: #7B2FF7 !important;
  font-weight: bold;
}

.btn-primary:hover {
  background: #6620e0 !important;
  border-color: #6620e0 !important;
}

/* ── Step Numbers ── */
.step-number {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #7B2FF7;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  margin-right: 8px;
  font-size: 0.9rem;
}

/* ── Footer ── */
footer {
  background: #f1f1f1 !important;
  border-top: 1px solid #ddd;
  color: #888 !important;
}

/* ── Utilities ── */
.icon-box { text-align: center; padding: 20px; font-size: 2.5rem; color: #7B2FF7; }
h1 { font-weight: bold !important; }

.highlight-box {
  background: #f9f5ff;
  border-left: 4px solid #7B2FF7;
  padding: 16px 20px;
  border-radius: 0 4px 4px 0;
  margin: 16px 0;
}

/* ── Animation ── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/globals.css
git commit -m "style: replace dark cyberpunk theme with W3Schools-style CSS"
```

---

## Task 2: Fix `components/Sidebar.js` Header Bar

**Files:**
- Modify: `components/Sidebar.js`

The fixed header bar (lines 65–85) has hardcoded dark navy colors. Replace just that `<div>` block's inline styles and the `<span>` color.

- [ ] **Step 1: Update the header bar inline styles**

Find this block (around line 65):

```jsx
<div
  style={{
    position: 'fixed', left: 0, top: 0, width: 280,
    height: 56, background: 'linear-gradient(90deg, #1a1a2e, #16213e)',
    borderRight: '2px solid #00d4ff', borderBottom: '2px solid #00d4ff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1001,
  }}
>
```

Replace with:

```jsx
<div
  style={{
    position: 'fixed', left: 0, top: 0, width: 280,
    height: 56, background: '#7B2FF7',
    borderBottom: '1px solid #6620e0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1001,
  }}
>
```

- [ ] **Step 2: Update the site title span color**

Find:

```jsx
<span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: 1 }}>
  MASTER IN CLAUDE
</span>
```

Replace with:

```jsx
<span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: 1 }}>
  MASTER IN CLAUDE
</span>
```

- [ ] **Step 3: Commit**

```bash
git add components/Sidebar.js
git commit -m "style: update sidebar header bar to Claude Purple"
```

---

## Task 3: Fix `components/Layout.js` Copy Button

**Files:**
- Modify: `components/Layout.js`

The copy button briefly turns `#00ff88` (neon green) on success. Change to purple.

- [ ] **Step 1: Update the success color**

Find (around line 33):

```js
btn.style.color = '#00ff88'
```

Replace with:

```js
btn.style.color = '#7B2FF7'
```

- [ ] **Step 2: Commit**

```bash
git add components/Layout.js
git commit -m "style: update copy button success color to purple"
```

---

## Task 4: Batch-Fix Dark Color Inline Styles in All Pages

**Files:**
- Create: `scripts/fix-page-colors.py` (temporary, deleted after use)
- Modify: all `pages/*.js`

273 occurrences of dark-theme colors are spread across 18 page files. A Python script handles them reliably in one pass.

- [ ] **Step 1: Create the fix script**

Create `scripts/fix-page-colors.py`:

```python
import os, re

pages_dir = os.path.join(os.path.dirname(__file__), '..', 'pages')

replacements = [
    # Headings: color #00d4ff → #7B2FF7
    (r"style=\{\{color: '#00d4ff'\}\}", ""),
    (r"style=\{\{color: \"#00d4ff\"\}\}", ""),
    # Inline color property in multi-prop objects
    (r"color: '#00d4ff'", "color: '#7B2FF7'"),
    (r'color: "#00d4ff"', 'color: "#7B2FF7"'),
    # Pre tag text color (inside code-block)
    (r"color: '#00ff88'", "color: '#d4d4d4'"),
    (r'color: "#00ff88"', 'color: "#d4d4d4"'),
    # Muted text
    (r"color: '#a0a0b0'", "color: '#555'"),
    (r'color: "#a0a0b0"', 'color: "#555"'),
    # Dark section/page backgrounds → white
    (r"background: '#0a0a14'", "background: '#fff'"),
    (r"background: '#0f0f1e'", "background: '#fff'"),
    (r"background: '#1a1a2e'", "background: '#fff'"),
    (r"background: '#16213e'", "background: '#fff'"),
    (r'background: "#0a0a14"', 'background: "#fff"'),
    (r'background: "#0f0f1e"', 'background: "#fff"'),
    (r'background: "#1a1a2e"', 'background: "#fff"'),
    (r'background: "#16213e"', 'background: "#fff"'),
    # Borders
    (r"border: '1px solid #00d4ff'", "border: '1px solid #ddd'"),
    (r'border: "1px solid #00d4ff"', 'border: "1px solid #ddd"'),
    (r"borderColor: '#00d4ff'", "borderColor: '#ddd'"),
    # Text shadows (neon glow) — remove entirely
    (r",\s*textShadow:\s*'[^']*'", ""),
    (r',\s*textShadow:\s*"[^"]*"', ""),
]

for fname in os.listdir(pages_dir):
    if not fname.endswith('.js'):
        continue
    path = os.path.join(pages_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fname}')
    else:
        print(f'No changes: {fname}')

print('Done.')
```

- [ ] **Step 2: Run the script**

```bash
python scripts/fix-page-colors.py
```

Expected output — each page file listed as "Updated" or "No changes":
```
Updated: agents.js
Updated: ai-systems.js
...
Done.
```

- [ ] **Step 3: Clean up accordion-item inline dark styles manually**

Some pages have accordion items with full dark-theme inline style objects that the regex won't fully clean. Search for remaining dark references:

```bash
grep -rn "#00d4ff\|#1a1a2e\|#16213e\|#0a0a14\|#0f0f1e\|#00ff88" pages/
```

For any remaining hits, open the file and remove the dark-color properties from the inline style object. The accordion items should look like:

```jsx
{/* Before */}
<div className="accordion-item" style={{background: '#1a1a2e', border: '1px solid #00d4ff', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>

{/* After — keep only layout props, remove color props */}
<div className="accordion-item" style={{marginBottom: '10px'}}>
```

- [ ] **Step 4: Delete the script**

```bash
rm scripts/fix-page-colors.py
```

- [ ] **Step 5: Commit**

```bash
git add pages/
git commit -m "style: remove dark-theme color inline styles from all pages"
```

---

## Task 5: Build & Verify

**Files:** none modified — verification only

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: `Export successful` with no errors. If there are JSX syntax errors, a broken inline style object is the likely cause — check the file and line number in the error output.

- [ ] **Step 2: Grep for any remaining dark colors**

```bash
grep -rn "#00d4ff\|#0f0f1e\|#1a1a2e\|#16213e\|#00ff88\|text-shadow\|rgba(0, 212" pages/ components/ styles/
```

Expected: no output (zero matches).

- [ ] **Step 3: Preview the build locally**

```bash
npx serve out
```

Open `http://localhost:3000` and check:
- [ ] Top bar is Claude Purple (not dark navy)
- [ ] Sidebar background is light gray `#f1f1f1`
- [ ] Active sidebar link has purple left border
- [ ] Page background is white
- [ ] `h2` headings have a purple underline border
- [ ] Code blocks are dark (`#1e1e1e`) with light text
- [ ] No cyan or neon green visible anywhere

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "style: W3Schools theme — final verification passed"
git push origin main
```
