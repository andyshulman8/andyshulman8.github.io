import { useEffect } from "react";

/**
 * Hook to trigger a callback when an element becomes visible (once)
 * Immediately stops observing after first intersection
 */
export const useIntersectionOnce = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  options: IntersectionObserverInit = {},
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let hasFired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasFired) {
            hasFired = true;
            callback();

            // Stop observing after first intersection
            observer.unobserve(entry.target);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};
