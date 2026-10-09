import type { ReactNode } from "react";

type Cols = 1 | 2 | 3 | 4;

// One column on phones; `cols` columns from the sm/md breakpoints up.
const COLS_CLASS: Record<Cols, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 md:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-4",
};

export function CardGrid({ cols = 2, children }: { cols?: Cols; children: ReactNode }) {
  return <div className={`my-5 grid gap-4 ${COLS_CLASS[cols]}`}>{children}</div>;
}
