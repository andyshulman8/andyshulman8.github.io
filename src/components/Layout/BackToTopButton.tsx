import { ChevronUp } from 'lucide-react';

interface BackToTopButtonProps {
  isVisible: boolean;
}

export const BackToTopButton = ({ isVisible }: BackToTopButtonProps) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white/6 hover:bg-white/10 backdrop-blur-md transition-colors shadow-lg"
    >
      <ChevronUp className="w-5 h-5 text-white/90" />
    </button>
  );
};
