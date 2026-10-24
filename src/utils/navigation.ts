import type { MouseEvent as ReactMouseEvent } from 'react';

/**
 * Return whether an internal anchor click should be handled by client-side routing.
 * Modified clicks, non-primary buttons, downloads, and links targeting another
 * browsing context are left to the browser's native behavior.
 */
export function shouldHandleClientSideNavigation(
  event: ReactMouseEvent<HTMLAnchorElement>,
): boolean {
  const target = event.currentTarget.target.trim().toLowerCase();

  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    (target === '' || target === '_self') &&
    !event.currentTarget.hasAttribute('download')
  );
}
