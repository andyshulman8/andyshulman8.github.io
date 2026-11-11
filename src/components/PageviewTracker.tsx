import { useEffect, type ReactNode } from "react";
import { usePageviewTracking } from "../hooks/usePageviewTracking";
import { trackLinkClick } from "../lib/analytics";

/**
 * PageviewTracker
 *
 * Wrapper component that tracks page views for all routes within its subtree.
 * This ensures all SPA route changes are properly recorded in Google Analytics.
 *
 * Usage:
 *   <PageviewTracker>
 *     <Routes>
 *       [routes here]
 *     </Routes>
 *   </PageviewTracker>
 */
export function PageviewTracker({ children }: { children: ReactNode }) {
  // Track pageview whenever location changes
  usePageviewTracking();

  // One delegated listener records resume and other outbound link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (anchor) trackLinkClick(anchor as HTMLAnchorElement);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
