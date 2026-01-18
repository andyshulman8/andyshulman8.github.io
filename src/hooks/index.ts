import { useEffect, useState } from 'react';

/**
 * Hook to show/hide "back to top" button based on scroll position
 */
export const useBackToTop = (threshold: number = 320) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};
