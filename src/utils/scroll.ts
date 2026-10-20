/**
 * Utility for smooth scrolling that respects the user's prefers-reduced-motion preference.
 */
export function safeScrollTo(options: ScrollToOptions) {
  if (typeof window === 'undefined') return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    ...options,
    behavior: prefersReducedMotion ? 'auto' : (options.behavior || 'smooth'),
  });
}
