"""Print each new route that has no page in the build directory."""
import json
import sys
from pathlib import Path

import checks

HERE = Path(__file__).resolve().parent


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1:
        print("usage: check_routes.py <out-dir>", file=sys.stderr)
        return 2
    route_map = json.loads((HERE / "route-map.json").read_text())
    missing = [r for r in route_map.values() if not checks.route_file(argv[0], r).is_file()]
    for route in missing:
        print(f"MISSING {route}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
