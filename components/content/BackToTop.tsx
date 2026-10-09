"use client";

import { useEffect, useState } from "react";
import { showBackToTop } from "@/lib/reading";

/**
 * A "↑ Top" button. It is in the DOM only after the reader scrolls more
 * than one viewport height. A click scrolls to the top (at once if the
 * reader prefers reduced motion) and moves focus to `#content`.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(showBackToTop(window.scrollY, window.innerHeight));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  const onClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.getElementById("content")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-back-to-top
      className="fixed right-4 bottom-4 z-30 rounded-md border border-border-strong bg-bg-raised px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text transition-colors hover:border-accent hover:text-accent sm:right-6 sm:bottom-6"
    >
      ↑ Top
    </button>
  );
}
