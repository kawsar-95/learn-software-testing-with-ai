"""Compare the visible text of the old build with the new build."""
import argparse
import json
import sys
from pathlib import Path

import checks

HERE = Path(__file__).resolve().parent


def new_root(html):
    if "data-pagefind-body" in html:
        return "attr=data-pagefind-body"
    return "tag=article"


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--old", required=True)
    parser.add_argument("--new", required=True)
    parser.add_argument("--same-layout", action="store_true",
                        help="read the new side with the old root and old routes")
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
        old_words = checks.extract_text(old_file.read_text(encoding="utf-8"), "class=main-content")
        new_html = new_file.read_text(encoding="utf-8")
        root = "class=main-content" if args.same_layout else new_root(new_html)
        runs = checks.missing_runs(old_words, checks.extract_text(new_html, root))
        if runs:
            failed = True
            print(f"FAIL {old_route}")
            for run in runs:
                print(f"  missing: {run}")
        else:
            print(f"PASS {old_route}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
