// Pure helpers for the reading aids (the progress bar and the back-to-top button).

/**
 * How far the reader is through an article, from 0 to 1.
 * 0 while the top of the article is at or below the top of the viewport.
 * 1 when the bottom of the article reaches the bottom of the viewport.
 * `top` is the top of the article in the viewport (`getBoundingClientRect().top`).
 */
export function articleProgress(top: number, height: number, viewportHeight: number): number {
  const range = height - viewportHeight;
  if (range <= 0) return top + height <= viewportHeight ? 1 : 0;
  return Math.min(1, Math.max(0, -top / range));
}

/** True after the page scrolls more than one viewport height. */
export function showBackToTop(scrollY: number, viewportHeight: number): boolean {
  return scrollY > viewportHeight;
}
