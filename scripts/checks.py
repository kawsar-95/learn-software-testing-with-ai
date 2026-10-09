"""Shared helpers for the Nextra migration checks."""
import difflib
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "source", "track", "wbr",
}
SKIP_TAGS = {"script", "style", "button", "svg"}
# Words break only at these tags and at whitespace. Inline tags such as
# <span> do not break a word: a syntax highlighter wraps each token in a span.
BLOCK_TAGS = {
    "p", "div", "li", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "pre",
    "table", "tr", "td", "th", "br", "section", "article", "details",
    "summary", "blockquote",
}


def _matches(root, tag, attrs):
    kind, _, value = root.partition("=")
    if kind == "attr":
        return any(name == value for name, _ in attrs)
    if kind == "class":
        for name, val in attrs:
            if name == "class" and value in (val or "").split():
                return True
        return False
    raise ValueError(f"unknown root: {root}")


class _TextParser(HTMLParser):
    def __init__(self, root):
        super().__init__(convert_charrefs=True)
        self.root = root
        self.stack = []
        self.root_depth = None  # stack depth right after the root opened
        self.done = False
        self.skip_depth = 0
        self.words = []
        self.pending = ""  # inline text not yet split into words

    def _flush(self):
        self.words.extend(self.pending.split())
        self.pending = ""

    def handle_starttag(self, tag, attrs):
        if self.done:
            return
        if tag in BLOCK_TAGS:
            self._flush()
        if tag in VOID_TAGS:
            return
        self.stack.append(tag)
        if self.root_depth is None:
            if _matches(self.root, tag, attrs):
                self.root_depth = len(self.stack)
        elif tag in SKIP_TAGS:
            self.skip_depth += 1

    def handle_startendtag(self, tag, attrs):
        # Self-closing tag such as <svg/> or <br/>: it has no content and no end tag.
        if tag in BLOCK_TAGS and not self.done:
            self._flush()
        if self.root_depth is None and not self.done and tag not in VOID_TAGS:
            if _matches(self.root, tag, attrs):
                self.done = True

    def handle_endtag(self, tag):
        if self.done or tag in VOID_TAGS or tag not in self.stack:
            return
        while self.stack:
            popped = self.stack.pop()
            if popped in BLOCK_TAGS:
                self._flush()
            if self.root_depth is not None:
                if len(self.stack) + 1 == self.root_depth:
                    self._flush()
                    self.done = True
                elif popped in SKIP_TAGS and self.skip_depth:
                    self.skip_depth -= 1
            if popped == tag:
                break

    def handle_data(self, data):
        if self.root_depth is not None and not self.done and not self.skip_depth:
            self.pending += data


_TYPOGRAPHY = [
    ("\u2019", "'"), ("\u2018", "'"),
    ("\u201c", '"'), ("\u201d", '"'),
    ("\u2026", "..."),
    ("---", "-"), ("--", "-"), ("\u2014", "-"), ("\u2013", "-"),
]


def normalize_typography(text):
    """Map typographic quotes, ellipsis and dashes to plain ASCII.

    Nextra turns straight quotes and dashes into typographic ones; this keeps
    the text check from failing on that difference.
    """
    for old, new in _TYPOGRAPHY:
        text = text.replace(old, new)
    return text


def extract_text(html, root):
    """Return the words of the visible text inside the first element matching root."""
    parser = _TextParser(root)
    parser.feed(html)
    parser.close()
    return parser.words


def missing_runs(old_words, new_words):
    """Return the runs of old words that are deleted or replaced in the new words."""
    matcher = difflib.SequenceMatcher(None, old_words, new_words, autojunk=False)
    return [
        " ".join(old_words[i1:i2])
        for tag, i1, i2, _, _ in matcher.get_opcodes()
        if tag in ("delete", "replace")
    ]


def missing_words(old_words, new_words):
    """Return (word, missing count) for each old word that the new words have fewer times."""
    shortfall = Counter(old_words) - Counter(new_words)
    return sorted(shortfall.items())


def route_file(out_dir, route):
    return Path(out_dir) / route.strip("/") / "index.html"


_LINK_RE = re.compile(r"""(?<![\w-])(?:href|src)\s*=\s*["'](/[^"']*)["']""", re.I)
_IGNORED_PREFIXES = ("/_next/", "/_pagefind/")


def broken_links(out_dir):
    """Return (page_file, href) for each root-relative link that does not resolve."""
    out = Path(out_dir)
    broken = []
    for page in sorted(out.rglob("*.html")):
        rel = page.relative_to(out).as_posix()
        text = page.read_text(encoding="utf-8", errors="replace")
        for href in _LINK_RE.findall(text):
            if href.startswith("//") or href.startswith(_IGNORED_PREFIXES):
                continue
            path = unquote(re.split(r"[#?]", href, maxsplit=1)[0]).strip("/")
            target = out / path
            if target.is_file() or (target / "index.html").is_file():
                continue
            broken.append((rel, href))
    return broken


class _OutlineParser(HTMLParser):
    """Collects the ids of a page and the #links inside the <nav data-toc>."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.toc_links = []
        self._nav_depth = 0  # > 0 while inside the TOC nav

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if attr.get("id"):
            self.ids.add(attr["id"])
        if tag == "nav":
            if self._nav_depth or "data-toc" in attr:
                self._nav_depth += 1
        elif tag == "a" and self._nav_depth:
            href = attr.get("href") or ""
            if href.startswith("#"):
                self.toc_links.append(unquote(href[1:]))

    def handle_endtag(self, tag):
        if tag == "nav" and self._nav_depth:
            self._nav_depth -= 1


def outline_links(html):
    """Return (toc link ids, element ids) of a built page."""
    parser = _OutlineParser()
    parser.feed(html)
    parser.close()
    return parser.toc_links, parser.ids
