"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { articleProgress } from "@/lib/reading";

/**
 * A 2 px bar under the header. Its width is how far the reader is through
 * the `<article data-content>`. It is decoration, so it is hidden from
 * screen readers. It never locks or moves the scroll.
 */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article[data-content]");
    const el = bar.current;
    if (!article || !el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = article.getBoundingClientRect();
      const fraction = articleProgress(top, height, window.innerHeight);
      el.style.width = `${(fraction * 100).toFixed(2)}%`;
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
  }, [pathname]);

  return (
    <div aria-hidden="true" data-reading-progress className="pointer-events-none fixed inset-x-0 top-14 z-30 h-0.5">
      <div ref={bar} className="reading-progress-bar h-full w-0 bg-accent" />
    </div>
  );
}
