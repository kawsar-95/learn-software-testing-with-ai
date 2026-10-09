"""Check that each "On this page" link of a built page points to an element id.

usage: check_outline.py <out-dir> [--routes ROUTE ...]
Without --routes it checks every page in route-map.json except "/".
"""
import argparse
import json
import sys
from pathlib import Path

import checks


def default_routes():
    route_map = json.loads((Path(__file__).resolve().parent / "route-map.json").read_text())
    return [route for route in route_map.values() if route != "/"]


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("out_dir")
    parser.add_argument("--routes", nargs="+")
    args = parser.parse_args(argv)

    mismatches = []
    checked = 0
    for route in args.routes or default_routes():
        html = checks.route_file(args.out_dir, route).read_text(encoding="utf-8")
        links, ids = checks.outline_links(html)
        checked += len(links)
        mismatches += [(route, link) for link in links if link not in ids]

    for route, link in mismatches:
        print(f"MISSING {route}: #{link}")
    if mismatches:
        return 1
    if checked == 0:
        print("FAIL no TOC links found")
        return 1
    print(f"OK {checked} TOC links")
    return 0


if __name__ == "__main__":
    sys.exit(main())
