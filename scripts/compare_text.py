"""Compare the visible text of the old build with the new build."""
import argparse
import json
import sys
from pathlib import Path

import checks

HERE = Path(__file__).resolve().parent


OLD_ROOT = "class=main-content"
NEW_ROOT = "attr=data-pagefind-body"  # <main data-pagefind-body> in the Nextra build


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--old", required=True)
    parser.add_argument("--new", required=True)
    parser.add_argument("--same-layout", action="store_true",
                        help="read the new side with the old root and old routes")
    parser.add_argument("--unordered", action="store_true",
                        help="ignore word order: pass if every old word appears at least as often in the new text")
    parser.add_argument("routes", nargs="*", help="old routes; default is all")
    args = parser.parse_args(argv)

    route_map = json.loads((HERE / "route-map.json").read_text())
    routes = args.routes or list(route_map)
    failed = False
    for old_route in routes:
        new_route = old_route if args.same_layout else route_map[old_route]
        old_file = checks.route_file(args.old, old_route)
        new_file = checks.route_file(args.new, new_route)
        if not new_file.is_file():
            print(f"FAIL {old_route}\n  missing file: {new_file}")
            failed = True
            continue
        old_words = checks.extract_text(old_file.read_text(encoding="utf-8"), OLD_ROOT)
        new_html = new_file.read_text(encoding="utf-8")
        root = OLD_ROOT if args.same_layout else NEW_ROOT
        new_words = checks.extract_text(new_html, root)
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
