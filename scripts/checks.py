"""Shared helpers for the Nextra migration checks."""
import difflib
import re
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


def route_file(out_dir, route):
    return Path(out_dir) / route.strip("/") / "index.html"


_LINK_RE = re.compile(r"""\b(?:href|src)\s*=\s*["'](/[^"']*)["']""", re.I)
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
