/** The nearest ancestor of `el` that scrolls vertically. */
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node;
  }
  return null;
}

/**
 * Scrolls the current part into view inside its own scroll container.
 * It sets scrollTop on that container only, so the page does not scroll.
 * If the link is already in view, nothing moves.
 */
export function scrollActiveIntoView(root: HTMLElement | null) {
  const link = root?.querySelector<HTMLElement>('[aria-current="page"]');
  if (!link) return;
  const container = scrollParent(link);
  if (!container) return;
  const box = container.getBoundingClientRect();
  const rect = link.getBoundingClientRect();
  if (rect.top >= box.top && rect.bottom <= box.bottom) return;
  // Center the link in the container.
  container.scrollTop += rect.top - box.top - (box.height - rect.height) / 2;
}
