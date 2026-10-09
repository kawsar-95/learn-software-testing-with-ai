import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import checks


class ExtractTextTest(unittest.TestCase):
    def test_extract_text_reads_only_root(self):
        html = (
            '<div class="main-content"><p>Hello <b>QA</b></p>'
            "<button>Copy</button></div><footer>x</footer>"
        )
        self.assertEqual(
            checks.extract_text(html, "class=main-content"), ["Hello", "QA"]
        )

    def test_extract_text_new_root_attribute(self):
        html = '<div data-pagefind-body><p>one</p></div><p>two</p>'
        self.assertEqual(checks.extract_text(html, "attr=data-pagefind-body"), ["one"])

    def test_extract_text_breaks_words_at_blocks_and_br(self):
        html = "<main data-x><h1>T</h1><br><p>a <script>x</script>b</p>c<br/>d</main>"
        self.assertEqual(checks.extract_text(html, "attr=data-x"), ["T", "a", "b", "c", "d"])

    def test_extract_text_joins_inline_spans(self):
        html = (
            "<main data-x><pre><code>"
            '<span class="line"><span>foo</span><span>(</span><span>bar</span>'
            "<span>)</span></span>\n"
            '<span class="line"><span>x</span> <span>=</span> <span>1</span></span>'
            "</code></pre></main>"
        )
        self.assertEqual(
            checks.extract_text(html, "attr=data-x"), ["foo(bar)", "x", "=", "1"]
        )


class MissingRunsTest(unittest.TestCase):
    def test_missing_runs_empty_when_new_has_extra_text(self):
        self.assertEqual(
            checks.missing_runs(["a", "b"], ["intro", "a", "b", "next"]), []
        )

    def test_missing_runs_reports_dropped_paragraph(self):
        self.assertEqual(
            checks.missing_runs(["a", "b", "c", "d"], ["a", "d"]), ["b c"]
        )


class RouteMapTest(unittest.TestCase):
    def test_route_map_has_18_unique_targets(self):
        path = Path(__file__).resolve().parent / "route-map.json"
        route_map = json.loads(path.read_text())
        self.assertEqual(len(route_map), 18)
        self.assertEqual(len(set(route_map.values())), 18)
        for old, new in route_map.items():
            self.assertTrue(old.endswith("/"))
            self.assertTrue(new.endswith("/"))


class BrokenLinksTest(unittest.TestCase):
    def test_broken_links_finds_missing_page(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            (out / "index.html").write_text(
                '<a href="/setup/">a</a>'
                '<a href="/getting-started/setup/#x">b</a>'
                '<script src="/_next/x.js"></script>'
            )
            page = out / "getting-started" / "setup"
            page.mkdir(parents=True)
            (page / "index.html").write_text("ok")
            self.assertEqual(
                checks.broken_links(str(out)), [("index.html", "/setup/")]
            )


if __name__ == "__main__":
    unittest.main()
