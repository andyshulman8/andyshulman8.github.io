import { useEffect } from 'react';

/**
 * Hook to trigger a callback when an element becomes visible (once)
 * Immediately unobserves after firing to minimize memory overhead
 */
export const useIntersectionOnce = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);
};
