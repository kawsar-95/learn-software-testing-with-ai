"""Print each broken root-relative link in the build directory."""
import sys

import checks


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 1:
        print("usage: check_links.py <out-dir>", file=sys.stderr)
        return 2
    broken = checks.broken_links(argv[0])
    for page, href in broken:
        print(f"BROKEN {page}: {href}")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
