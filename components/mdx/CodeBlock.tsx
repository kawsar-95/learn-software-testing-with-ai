"use client";

import { Children, isValidElement, useRef } from "react";
import type { ComponentProps } from "react";
import { CopyButton } from "@/components/content/CopyButton";

// Code blocks stay dark in both themes, so the button colors are fixed.
const BUTTON_CLASS =
  "rounded-md border border-[#444c56] bg-[#22272e] px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#adbac7] transition-colors hover:border-[#5ec8d8] hover:text-[#5ec8d8]";

/** The language of a fenced block, from the `language-<lang>` class on its <code>. */
function languageOf(children: ComponentProps<"pre">["children"]): string | undefined {
  for (const child of Children.toArray(children)) {
    if (!isValidElement<{ className?: string }>(child)) continue;
    const match = /(?:^|\s)language-(\S+)/.exec(child.props.className ?? "");
    if (match) return match[1];
  }
  return undefined;
}

/**
 * Wraps the Shiki <pre> of a fenced code block: language label top right
 * (hidden for `text`) and a copy button. @shikijs/rehype adds the
 * `language-<lang>` class to the inner <code> (option addLanguageClass).
 * The outer box does not scroll, so the label and the button stay at the
 * top right while the inner box scrolls sideways.
 */
export function CodeBlock({ children, className, style, tabIndex }: ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const lang = languageOf(children);

  return (
    <div className="code-block">
      <div className="code-tools">
        <span className="code-copy">
          <CopyButton
            getText={() => pre.current?.textContent ?? ""}
            label="Copy code"
            fallbackTarget={() => pre.current}
            className={BUTTON_CLASS}
          />
        </span>
        {lang && lang !== "text" && (
          <span className="code-lang" aria-hidden="true">
            {lang}
          </span>
        )}
      </div>
      <div className="code-scroll">
        <pre ref={pre} className={className} style={style} tabIndex={tabIndex}>
          {children}
        </pre>
      </div>
    </div>
  );
}
