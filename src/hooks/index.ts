import { useEffect, useState } from 'react';

/**
 * Hook to show/hide "back to top" button based on scroll position
 * Uses requestAnimationFrame throttling to avoid excessive re-renders
 */
export const useBackToTop = (threshold: number = 320) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};
