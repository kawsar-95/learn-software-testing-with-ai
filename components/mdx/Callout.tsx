import type { ReactNode } from "react";

export type CalloutType = "info" | "warning" | "error";

// Each type sets a 3px left border and an 8% tint of its color.
const TYPE_CLASS: Record<CalloutType, string> = {
  info: "border-l-accent bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]",
  warning: "border-l-warn bg-[color-mix(in_srgb,var(--warn)_8%,transparent)]",
  error: "border-l-danger bg-[color-mix(in_srgb,var(--danger)_8%,transparent)]",
};

export function Callout({ type = "info", children }: { type?: CalloutType; children: ReactNode }) {
  return (
    <div
      className={`my-[18px] rounded-[10px] border-l-[3px] px-[18px] py-3.5 text-sm [&>:last-child]:mb-0 ${TYPE_CLASS[type]}`}
    >
      {children}
    </div>
  );
}
