import type { MouseEvent as ReactMouseEvent } from 'react';
import { describe, expect, it } from 'vitest';
import { shouldHandleClientSideNavigation } from './navigation';

type ClickOverrides = Partial<
  Pick<ReactMouseEvent<HTMLAnchorElement>, 'button' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'defaultPrevented'>
>;

function createClickEvent(
  overrides: ClickOverrides = {},
  options: { target?: string; download?: boolean } = {},
): ReactMouseEvent<HTMLAnchorElement> {
  const currentTarget = {
    target: options.target ?? '',
    hasAttribute: (name: string) => name.toLowerCase() === 'download' && Boolean(options.download),
  } as HTMLAnchorElement;

  return {
    button: 0,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    defaultPrevented: false,
    currentTarget,
    ...overrides,
  } as unknown as ReactMouseEvent<HTMLAnchorElement>;
}

describe('shouldHandleClientSideNavigation', () => {
  it('handles an ordinary primary click in the current browsing context', () => {
    expect(shouldHandleClientSideNavigation(createClickEvent())).toBe(true);
  });

  it.each([
    ['Ctrl-click', { ctrlKey: true }],
    ['Command-click', { metaKey: true }],
    ['Shift-click', { shiftKey: true }],
    ['Alt-click', { altKey: true }],
    ['middle-click', { button: 1 }],
    ['right-click', { button: 2 }],
    ['an already-cancelled click', { defaultPrevented: true }],
  ])('leaves %s to the browser', (_label, overrides) => {
    expect(shouldHandleClientSideNavigation(createClickEvent(overrides))).toBe(false);
  });

  it('preserves links that open another browsing context or download a file', () => {
    expect(shouldHandleClientSideNavigation(createClickEvent({}, { target: '_blank' }))).toBe(false);
    expect(shouldHandleClientSideNavigation(createClickEvent({}, { download: true }))).toBe(false);
  });

  it('treats an explicit same-tab target as an ordinary SPA click', () => {
    expect(shouldHandleClientSideNavigation(createClickEvent({}, { target: '_SELF' }))).toBe(true);
  });
});
