import type Lenis from 'lenis';

/**
 * Global reference to the active Lenis smooth scrolling instance
 */
let activeLenis: Lenis | null = null;

/**
 * Register the active Lenis instance so scroll utilities can coordinate with it.
 */
export function registerLenis(instance: Lenis | null) {
  activeLenis = instance;
}

/**
 * Retrieve the active Lenis instance, if registered and active.
 */
export function getActiveLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Utility for smooth or immediate scrolling that coordinates with Lenis and
 * respects the user's prefers-reduced-motion preference.
 */
export function safeScrollTo(options: ScrollToOptions) {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmooth = !prefersReducedMotion && options.behavior === 'smooth';

  if (activeLenis) {
    try {
      activeLenis.scrollTo(options.top ?? 0, {
        immediate: !isSmooth,
        force: true,
      });
    } catch {
      // Fallback to native window.scrollTo below
    }
  }

  try {
    window.scrollTo({
      ...options,
      behavior: isSmooth ? 'smooth' : 'auto',
    });
  } catch {
    window.scrollTo(options.left ?? 0, options.top ?? 0);
  }
}

/**
 * Resets the scroll position immediately to (0, 0).
 * Coordinates both Lenis's internal virtual scroll coordinates and native document scroll,
 * preventing previous page scroll positions from persisting across client-side routes.
 */
export function scrollToTop(options: { immediate?: boolean } = { immediate: true }) {
  if (typeof window === 'undefined') return;

  const isImmediate = options.immediate ?? true;

  if (activeLenis) {
    try {
      activeLenis.scrollTo(0, {
        immediate: isImmediate,
        force: true,
      });
    } catch {
      // Fallback to native scroll below
    }
  }

  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isImmediate ? 'auto' : 'smooth',
    });
  } catch {
    window.scrollTo(0, 0);
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
}

/**
 * Handles route-level scroll restoration:
 * - If the URL contains an intentional anchor hash (e.g. #service-cards), attempts to scroll to that element.
 * - Otherwise, immediately resets the viewport to the top of the new page.
 * - Re-checks on the next animation frame to guarantee proper position after React Suspense or lazy component commit.
 */
export function restoreScrollForRoute(hash?: string, attempt = 0) {
  if (typeof window === 'undefined') return;

  const targetHash = hash !== undefined ? hash : window.location.hash;

  if (targetHash && targetHash !== '#' && targetHash !== '#top') {
    const elementId = targetHash.replace(/^#/, '');
    const element = document.getElementById(elementId);
    if (element) {
      if (activeLenis) {
        activeLenis.scrollTo(element, { offset: -80 });
      } else {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
      return;
    }

    // Keep checking while a lazily loaded route commits its content; do not jump to the top first.
    if (attempt < 120) {
      requestAnimationFrame(() => restoreScrollForRoute(targetHash, attempt + 1));
    }
    return;
  }

  // Standard route transition: instantly reset scroll to top
  scrollToTop({ immediate: true });

  // Secondary execution on next frame to counter any async rendering/reflow from React lazy loading
  requestAnimationFrame(() => {
    scrollToTop({ immediate: true });
  });
}
