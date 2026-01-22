/**
 * BackToTopButton Component
 *
 * Visibility Logic:
 * - The button only renders if the 'isVisible' prop is true [12, 13].
 * - In the main application, this visibility is determined by the
 *   'useBackToTop' hook using the 'UI.backToTopThreshold' [11].
 *
 * Accessibility & Interaction:
 * - Screen Readers: Includes an 'aria-label="Back to top"' for descriptive
 *   navigation [12, 13].
 * - Behavior: Implements a 'smooth' window scroll to the top coordinates (0, 0)
 *   to prevent jarring jumps in the user experience [13].
 * - Styling: Uses a 'backdrop-blur-md' and 'bg-white/6' to maintain visibility
 *   without obscuring the underlying portfolio content [13].
 */

import { ChevronUp } from "lucide-react";

interface BackToTopButtonProps {
  isVisible: boolean;
}

export const BackToTopButton = ({ isVisible }: BackToTopButtonProps) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white/6 hover:bg-white/10 backdrop-blur-md transition-colors shadow-lg"
    >
      <ChevronUp className="w-5 h-5 text-white/90" />
    </button>
  );
};
