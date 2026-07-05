/**
 * Opens a generated resource (e.g. a PDF blob URL) in a new browser tab.
 * @param {string} url - The URL to open.
 */
export function openInNewTab(url) {
  if (!url) return;
  const tab = window.open(url, "_blank", "noopener,noreferrer");
  if (tab) tab.focus();
}