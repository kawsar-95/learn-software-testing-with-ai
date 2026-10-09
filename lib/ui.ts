// The English strings of the site shell. They have no server-only imports,
// so client components can use them.

export const skipLink = "Skip to content";
export const partsNav = "Parts";
export const onThisPage = "On this page";
export const prevNextNav = "Previous and next part";
export const menuOpen = "Open the list of parts";
export const menuClose = "Close the list of parts";
export const themeToLight = "Switch to light theme";
export const themeToDark = "Switch to dark theme";
export const themeGeneric = "Switch color theme";
export const footerSummary = "17 parts · Software Testing with AI";

/** `PART 05`: the part number, zero-padded to 2 digits. */
export function partLabel(n: number): string {
  return `PART ${String(n).padStart(2, "0")}`;
}
