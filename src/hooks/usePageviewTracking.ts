import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_ID } from "../constants/theme";

/**
 * usePageviewTracking
 *
 * Custom hook to track page views in Google Analytics when route changes occur.
 * This ensures SPA route transitions are properly recorded as pageviews in GA.
 *
 * Usage:
 *   usePageviewTracking();
 *
 * Note: Requires GA_ID to be set in window.dataLayer by the GA initialization script
 */
export function usePageviewTracking() {
  const location = useLocation();

  useEffect(() => {
    // Get gtag function from window if available
    const sendPageview = () => {
      if (typeof window !== "undefined" && window.dataLayer) {
        // Push an event to GTM/GA to record the pageview
        window.dataLayer.push({
          event: "pageview",
          page_path: location.pathname + location.search,
          page_title: document.title,
        });

        // Also call gtag directly if available
        if (typeof gtag !== "undefined") {
          gtag("config", GA_ID, {
            page_path: location.pathname,
            page_title: document.title,
          });
        }
      }
    };

    sendPageview();
  }, [location.pathname, location.search]);
}

// Type definitions for gtag
declare const gtag: (
  command: string,
  param1?: string,
  param2?: Record<string, unknown>
) => void;
