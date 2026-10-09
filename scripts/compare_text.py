"""Compare the visible text of the old build with the new build."""
import argparse
import json
import sys
from pathlib import Path

import checks

HERE = Path(__file__).resolve().parent


DEFAULT_OLD_ROOT = "class=main-content"
DEFAULT_NEW_ROOT = "attr=data-pagefind-body"  # <main data-pagefind-body> in the Nextra build


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--old", required=True)
    parser.add_argument("--new", required=True)
    parser.add_argument("--old-root", default=DEFAULT_OLD_ROOT,
                        help="content root of the old build: class=NAME or attr=NAME (default: %(default)s)")
    parser.add_argument("--new-root", default=DEFAULT_NEW_ROOT,
                        help="content root of the new build: class=NAME or attr=NAME (default: %(default)s)")
    parser.add_argument("--same-layout", action="store_true",
                        help="read the new side with the old root and old routes")
    parser.add_argument("--same-routes", action="store_true",
                        help="the new route is the given route itself (no route-map lookup); give new routes")
    parser.add_argument("--unordered", action="store_true",
                        help="ignore word order: pass if every old word appears at least as often in the new text")
    parser.add_argument("routes", nargs="*", help="routes to compare; default is all")
    args = parser.parse_args(argv)

    route_map = json.loads((HERE / "route-map.json").read_text())
    same_routes = args.same_routes or args.same_layout
    new_root = args.old_root if args.same_layout else args.new_root
    routes = args.routes or (
        list(route_map.values()) if args.same_routes else list(route_map)
    )
    failed = False
    for old_route in routes:
        new_route = old_route if same_routes else route_map[old_route]
        old_file = checks.route_file(args.old, old_route)
        new_file = checks.route_file(args.new, new_route)
        if not new_file.is_file():
            print(f"FAIL {old_route}\n  missing file: {new_file}")
            failed = True
            continue
        old_words = [
            checks.normalize_typography(w)
            for w in checks.extract_text(old_file.read_text(encoding="utf-8"), args.old_root)
        ]
        new_html = new_file.read_text(encoding="utf-8")
        new_words = [
            checks.normalize_typography(w) for w in checks.extract_text(new_html, new_root)
        ]
        if args.unordered:
            problems = [f"{word} (x{count})" for word, count in checks.missing_words(old_words, new_words)]
        else:
            problems = checks.missing_runs(old_words, new_words)
        if problems:
            failed = True
            print(f"FAIL {old_route}")
            for problem in problems:
                print(f"  missing: {problem}")
        else:
            print(f"PASS {old_route}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
