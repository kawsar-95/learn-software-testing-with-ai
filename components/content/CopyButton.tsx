"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_CLASS =
  "rounded-md border border-border-strong px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-dim transition-colors hover:border-accent hover:text-accent";

const DEFAULT_WORDS = { idle: "Copy", copied: "Copied", selected: "Selected" };

/**
 * Copies text to the clipboard. `getText` runs at click time. If the
 * Clipboard API is not available (for example on plain http), the button
 * selects the text of `fallbackTarget` so the reader can copy it by hand.
 */
export function CopyButton({
  getText,
  label,
  words = DEFAULT_WORDS,
  fallbackTarget,
  className = DEFAULT_CLASS,
}: {
  getText: () => string;
  /** The accessible name of the button, for example "Copy code". */
  label: string;
  /** The visible words for each state. */
  words?: { idle: string; copied: string; selected: string };
  fallbackTarget: () => HTMLElement | null;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const show = (next: "copied" | "selected") => {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      show("copied");
    } catch {
      const el = fallbackTarget();
      const selection = window.getSelection();
      if (!el || !selection) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
      show("selected");
    }
  };

  // The live region is outside the button: a screen reader reads the
  // aria-label of a button, not its content, so it would not announce a
  // change inside the button.
  return (
    <>
      <button type="button" onClick={copy} aria-label={label} className={className}>
        {words[status]}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : words[status]}
      </span>
    </>
  );
}
