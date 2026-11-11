import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Moves focus to <main> when the page (first URL segment) changes, so keyboard
 * and screen-reader users aren't left on <body>. Stop changes within one case
 * study (/logs/2 -> /logs/3) are ignored so focus isn't stolen mid-journey.
 */
export function RouteFocus() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1] ?? "";
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const raf = requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [page]);

  return null;
}
