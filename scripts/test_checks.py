import json
import subprocess
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


class MissingWordsTest(unittest.TestCase):
    def test_missing_words_ignores_order(self):
        self.assertEqual(checks.missing_words(["a", "b", "c"], ["c", "x", "a", "b"]), [])

    def test_missing_words_reports_shortfall(self):
        self.assertEqual(
            checks.missing_words(["a", "a", "b", "c"], ["a", "c"]),
            [("a", 1), ("b", 1)],
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

    def test_broken_links_ignores_data_href(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            (out / "index.html").write_text(
                '<button data-href="/getting-started">g</button>'
                '<a href="/missing/">m</a>'
            )
            self.assertEqual(
                checks.broken_links(str(out)), [("index.html", "/missing/")]
            )


class OutlineCheckTest(unittest.TestCase):
    SCRIPT = Path(__file__).resolve().parent / "check_outline.py"

    def _out(self, tmp, body):
        page = Path(tmp) / "getting-started" / "setup"
        page.mkdir(parents=True)
        (page / "index.html").write_text(body, encoding="utf-8")

    def _run(self, out):
        return subprocess.run(
            [sys.executable, str(self.SCRIPT), str(out), "--routes", "/getting-started/setup/"],
            capture_output=True, text=True,
        )

    def test_toc_links_with_matching_ids_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            self._out(tmp, (
                '<article><h2 id="one">One</h2><h3 id="two">Two</h3></article>'
                '<nav data-toc><ol><li><a href="#one">One</a></li>'
                '<li><a href="#two">Two</a></li></ol></nav>'
                '<nav><a href="#other">not the TOC</a></nav>'
            ))
            result = self._run(tmp)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("OK", result.stdout)

    def test_toc_link_without_id_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            self._out(tmp, (
                '<h2 id="one">One</h2>'
                '<nav data-toc><a href="#one">One</a><a href="#gone">Gone</a></nav>'
            ))
            result = self._run(tmp)
            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertIn("/getting-started/setup/", result.stdout)
            self.assertIn("#gone", result.stdout)
            self.assertNotIn("#one", result.stdout)


class SourcesCheckTest(unittest.TestCase):
    SCRIPT = Path(__file__).resolve().parent / "check_sources.py"
    ROUTE = "/extend/hooks/"

    META = '<div data-page-meta>2 sections · 2 sources · updated Oct 2026 · <a href="https://x.test/e">Suggest an edit</a></div>'
    LIST = (
        '<section><h2 id="sources">Sources</h2><ol>'
        '<li id="src-1"><a href="https://a.test/1">One</a> A accessed 2026-10-10</li>'
        '<li id="src-2"><a href="https://a.test/2">Two</a> B accessed 2026-10-10</li>'
        "</ol></section>"
    )
    CITES = '<p>a<sup><a class="cite" href="#src-1">[1]</a></sup> b<sup><a class="cite" href="#src-2">[2]</a></sup></p>'

    def _run(self, body, *extra):
        with tempfile.TemporaryDirectory() as tmp:
            page = Path(tmp) / "extend" / "hooks"
            page.mkdir(parents=True)
            (page / "index.html").write_text(body, encoding="utf-8")
            return subprocess.run(
                [sys.executable, str(self.SCRIPT), tmp, "--routes", self.ROUTE, *extra],
                capture_output=True, text=True,
            )

    def test_check_sources_ok(self):
        result = self._run(self.META + self.CITES + self.LIST)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("OK", result.stdout)

    def test_check_sources_unknown_cite(self):
        body = self.META + self.CITES + '<p><a class="cite" href="#src-9">[9]</a></p>' + self.LIST
        result = self._run(body)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn(self.ROUTE, result.stdout)
        self.assertIn("#src-9", result.stdout)

    def test_check_sources_uncited_source(self):
        body = self.META + '<p><a class="cite" href="#src-1">[1]</a></p>' + self.LIST
        result = self._run(body)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("src-2", result.stdout)
        self.assertNotIn("src-1 ", result.stdout)

    def test_check_sources_http_link(self):
        body = self.META + self.CITES + self.LIST.replace("https://a.test/2", "http://a.test/2")
        result = self._run(body)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("http://a.test/2", result.stdout)

    def test_check_sources_missing_meta(self):
        body = self.CITES + self.LIST
        result = self._run(body)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("data-page-meta", result.stdout)
        allowed = self._run(body, "--allow-missing")
        self.assertEqual(allowed.returncode, 0, allowed.stdout + allowed.stderr)
        self.assertIn("OK", allowed.stdout)

    def test_check_sources_two_meta_lines(self):
        result = self._run(self.META + self.META + self.CITES + self.LIST)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)

    def test_check_sources_meta_without_updated(self):
        body = (self.META.replace("updated Oct 2026", "") + self.CITES + self.LIST)
        result = self._run(body)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("updated", result.stdout)

    def test_check_sources_no_sources(self):
        result = self._run(self.META)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)


class NormalizeTypographyTest(unittest.TestCase):
    def test_normalize_typography(self):
        cases = {
            "sonnet\u2019s": "sonnet's",
            "\u2018x": "'x",
            "\u201ctoken\u201d": '"token"',
            "wait\u2026": "wait...",
            "a\u2014b": "a-b",
            "3\u20138": "3-8",
            "a---b": "a-b",
            "a--b": "a-b",
            "plain": "plain",
        }
        for raw, expected in cases.items():
            self.assertEqual(checks.normalize_typography(raw), expected)


class CompareCliTest(unittest.TestCase):
    SCRIPT = Path(__file__).resolve().parent / "compare_text.py"

    def _run(self, *args):
        return subprocess.run(
            [sys.executable, str(self.SCRIPT), *args],
            capture_output=True, text=True,
        )

    def _write(self, base, route, html):
        page = Path(base) / route.strip("/")
        page.mkdir(parents=True, exist_ok=True)
        (page / "index.html").write_text(html, encoding="utf-8")

    def test_compare_cli_custom_roots(self):
        with tempfile.TemporaryDirectory() as tmp:
            old, new = Path(tmp) / "old", Path(tmp) / "new"
            self._write(old, "/setup/",
                        "<main data-pagefind-body><p>Hello QA world</p></main>")
            self._write(new, "/getting-started/setup/",
                        "<article data-content><p>Hello QA world</p></article>")
            result = self._run(
                "--old", str(old), "--new", str(new),
                "--old-root", "attr=data-pagefind-body",
                "--new-root", "attr=data-content",
                "/setup/",
            )
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("PASS", result.stdout)

    def test_compare_cli_same_routes(self):
        with tempfile.TemporaryDirectory() as tmp:
            old, new = Path(tmp) / "old", Path(tmp) / "new"
            self._write(old, "/a/b/",
                        "<main data-pagefind-body><p>one</p><p>two three</p></main>")
            self._write(new, "/a/b/",
                        "<main data-pagefind-body><p>one</p></main>")
            result = self._run(
                "--old", str(old), "--new", str(new),
                "--old-root", "attr=data-pagefind-body",
                "--new-root", "attr=data-pagefind-body",
                "--same-routes", "/a/b/",
            )
            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertIn("missing: two three", result.stdout)


if __name__ == "__main__":
    unittest.main()
