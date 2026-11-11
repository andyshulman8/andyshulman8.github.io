import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * usePageviewTracking
 *
 * Pushes a "pageview" event to the GTM dataLayer on every SPA route change.
 * GTM is the single analytics pipeline for this site (see index.html) — a
 * GA4 configuration tag in the GTM container must be set to fire on this
 * event for route changes to be recorded. Calling gtag() directly here
 * would double-count pageviews alongside GTM's own tag.
 *
 * Usage:
 *   usePageviewTracking();
 */
export function usePageviewTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "pageview",
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);
}
