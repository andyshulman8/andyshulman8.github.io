import type { ReactNode } from "react";
import { usePageviewTracking } from "../hooks/usePageviewTracking";

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

  return <>{children}</>;
}
