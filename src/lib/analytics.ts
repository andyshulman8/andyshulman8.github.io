/**
 * Minimal typed analytics helper.
 *
 * Calls window.gtag when it exists; otherwise pushes the event onto the GTM
 * dataLayer (GTM is this site's analytics pipeline, see index.html). With
 * neither present it is a no-op. Never throws.
 */

type EventParams = Record<string, string | number | boolean>;

type GtagFn = (command: "event", name: string, params?: EventParams) => void;

interface AnalyticsWindow {
  gtag?: GtagFn;
  dataLayer?: unknown[];
}

export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    if (typeof window === "undefined") return;
    const w = window as unknown as AnalyticsWindow;
    if (typeof w.gtag === "function") {
      w.gtag("event", name, params);
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // Analytics must never break the page.
  }
}

export const trackCaseStudyViewed = (caseId: string) =>
  trackEvent("case_study_viewed", { case_id: caseId });

export const trackImageFullscreenOpened = () =>
  trackEvent("image_fullscreen_opened");

const RESUME_HOSTS = ["drive.google.com"];

/**
 * Classifies a clicked anchor: resume link, other external link, or ignored
 * (same-origin, mailto:, etc.). Fires the matching event.
 */
export function trackLinkClick(anchor: HTMLAnchorElement): void {
  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return;
    if (url.origin === window.location.origin) return;
    if (RESUME_HOSTS.includes(url.hostname)) {
      trackEvent("resume_click", { link_url: url.href });
    } else {
      trackEvent("external_link_click", {
        link_url: url.href,
        link_domain: url.hostname,
      });
    }
  } catch {
    // ignore malformed hrefs
  }
}
