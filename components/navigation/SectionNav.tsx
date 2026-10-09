"use client";

import { useEffect, useState } from "react";
import { onThisPage } from "@/lib/ui";
import type { OutlineItem } from "@/lib/outline";

/** The reading line: an item is current when its top is above this point. */
const LINE = 0.3;

/**
 * The sticky "On this page" list. It marks the last outline item whose top
 * has passed the reading line. The observer band ends at that line, so it
 * fires each time a top crosses it.
 */
export function SectionNav({ items }: { items: OutlineItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * LINE;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${(1 - LINE) * 100}% 0px`,
      threshold: 0,
    });
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    update();

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      data-toc
      aria-label={onThisPage}
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6"
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">{onThisPage}</p>
      <ol className="m-0 list-none border-l border-border p-0">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={
                  "-ml-px block border-l-2 py-1.5 pr-2 leading-snug no-underline transition-colors " +
                  (item.level === 3 ? "pl-7 text-[12.5px] " : "pl-4 text-[13.5px] ") +
                  (isActive
                    ? "border-accent text-text"
                    : "border-transparent text-text-dim hover:border-border-strong hover:text-text")
                }
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
