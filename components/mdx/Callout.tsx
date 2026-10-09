import type { ReactNode } from "react";

export type CalloutType = "note" | "tip" | "warning" | "danger";
/** `info` and `error` are the old names of `note` and `danger`. */
export type CalloutInput = CalloutType | "info" | "error";

const ALIAS: Record<CalloutInput, CalloutType> = {
  note: "note",
  tip: "tip",
  warning: "warning",
  danger: "danger",
  info: "note",
  error: "danger",
};

// Each type sets a 3px left border, an 8% tint, and the color of the icon.
const TYPE_CLASS: Record<CalloutType, { box: string; icon: string }> = {
  note: {
    box: "border-l-accent bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]",
    icon: "text-accent",
  },
  tip: {
    box: "border-l-good bg-[color-mix(in_srgb,var(--good)_8%,transparent)]",
    icon: "text-good",
  },
  warning: {
    box: "border-l-warn bg-[color-mix(in_srgb,var(--warn)_8%,transparent)]",
    icon: "text-warn",
  },
  danger: {
    box: "border-l-danger bg-[color-mix(in_srgb,var(--danger)_8%,transparent)]",
    icon: "text-danger",
  },
};

// 16px stroke icons on a 24px grid. They are decorative.
const ICON: Record<CalloutType, ReactNode> = {
  note: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  tip: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </>
  ),
  warning: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  danger: (
    <>
      <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z" />
      <path d="M12 8v4M12 16h.01" />
    </>
  ),
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutInput;
  title?: ReactNode;
  children: ReactNode;
}) {
  const kind = ALIAS[type];
  const style = TYPE_CLASS[kind];
  return (
    <div
      className={`my-[18px] flex gap-3 rounded-[10px] border-l-[3px] px-[18px] py-3.5 text-sm ${style.box}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-[3px] shrink-0 ${style.icon}`}
      >
        {ICON[kind]}
      </svg>
      <div className="min-w-0 flex-1 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {title ? <p className="mb-1.5 font-semibold text-text">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
