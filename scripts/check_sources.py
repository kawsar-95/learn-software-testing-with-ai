"""Check the meta line, the citations and the sources list of each built content page.

usage: check_sources.py <out-dir> [--routes ROUTE ...] [--allow-missing]
Without --routes it checks every page in route-map.json except "/".
A page needs exactly one [data-page-meta] element with an "updated" text, at
least one li[id^="src-"], a #src-k target for each a.cite link, a cite for
each source, and https links in the sources. --allow-missing skips a page
that has no meta line.
"""
import argparse
import re
import sys
from html.parser import HTMLParser

import checks
from check_outline import default_routes

SRC_ID = re.compile(r"^src-\d+$")


class _SourcesParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta_texts = []  # one text per [data-page-meta] element
        self.source_ids = []  # ids of li[id^="src-"], in order
        self.source_links = {}  # source id -> hrefs of the links inside it
        self.cite_hrefs = []
        self._meta = None  # (tag, depth) while inside a meta element
        self._li = None  # (id, depth) while inside a source item

    def handle_starttag(self, tag, attrs):
        attr = {name: value or "" for name, value in attrs}
        if self._meta and tag == self._meta[0]:
            self._meta = (tag, self._meta[1] + 1)
        elif self._meta is None and "data-page-meta" in attr:
            self._meta = (tag, 1)
            self.meta_texts.append("")
        if tag == "li":
            if self._li:
                self._li = (self._li[0], self._li[1] + 1)
            elif attr.get("id", "").startswith("src-"):
                self._li = (attr["id"], 1)
                self.source_ids.append(attr["id"])
                self.source_links[attr["id"]] = []
        elif tag == "a":
            href = attr.get("href", "")
            if "cite" in attr.get("class", "").split():
                self.cite_hrefs.append(href)
            elif self._li:
                self.source_links[self._li[0]].append(href)

    def handle_endtag(self, tag):
        if self._meta and tag == self._meta[0]:
            depth = self._meta[1] - 1
            self._meta = (tag, depth) if depth else None
        if tag == "li" and self._li:
            depth = self._li[1] - 1
            self._li = (self._li[0], depth) if depth else None

    def handle_data(self, data):
        if self._meta:
            self.meta_texts[-1] += data


def page_problems(html, allow_missing=False):
    """Return (problems, skipped) for one built page."""
    parser = _SourcesParser()
    parser.feed(html)
    parser.close()
    if not parser.meta_texts:
        if allow_missing:
            return [], True
        return ["no [data-page-meta] element"], False

    problems = []
    if len(parser.meta_texts) > 1:
        problems.append(f"{len(parser.meta_texts)} [data-page-meta] elements, expected 1")
    if "updated" not in parser.meta_texts[0].lower():
        problems.append("[data-page-meta] has no 'updated' text")
    if not parser.source_ids:
        problems.append('no li[id^="src-"] source item')

    known = set(parser.source_ids)
    cited = set()
    for href in parser.cite_hrefs:
        target = href[1:]
        if href.startswith("#") and SRC_ID.match(target) and target in known:
            cited.add(target)
        else:
            problems.append(f"cite link {href} has no matching source")
    for source_id in parser.source_ids:
        if source_id not in cited:
            problems.append(f"{source_id} is not cited")
        links = parser.source_links[source_id]
        if not links:
            problems.append(f"{source_id} has no link")
        problems += [
            f"{source_id} link is not https: {href}"
            for href in links
            if not href.startswith("https://")
        ]
    return problems, False


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("out_dir")
    parser.add_argument("--routes", nargs="+")
    parser.add_argument("--allow-missing", action="store_true")
    args = parser.parse_args(argv)

    problems = []
    checked = skipped = 0
    for route in args.routes or default_routes():
        path = checks.route_file(args.out_dir, route)
        if not path.is_file():
            problems.append((route, f"page file not found: {path}"))
            continue
        page_issues, was_skipped = page_problems(
            path.read_text(encoding="utf-8"), args.allow_missing
        )
        skipped += was_skipped
        checked += not was_skipped
        problems += [(route, issue) for issue in page_issues]

    for route, issue in problems:
        print(f"PROBLEM {route}: {issue}")
    if problems:
        return 1
    print(f"OK {checked} pages checked, {skipped} skipped")
    return 0


if __name__ == "__main__":
    sys.exit(main())
