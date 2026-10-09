// One lock on the page scroll, shared by the drawer and the search dialog.
// Each caller takes a lock and releases it. The page scrolls again only
// when the last lock is released, in any order.

let locks = 0;
let savedOverflow = "";

/** Stops the page scroll. Returns the function that releases this lock. */
export function lockScroll(): () => void {
  if (locks === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = savedOverflow;
  };
}
