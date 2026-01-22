/**
 * CarouselControls Component
 * 
// Purpose: Provides navigation controls for image and content carousels.
// Usage: Currently used only within WindowFrame to control local carousel state.
// Note: Does not directly manage or interact with FullscreenImageViewer.
// Any fullscreen behavior is handled by parent composition.
 * 
 * Logic & Event Handling:
 * - Event Propagation: Uses 'e.stopPropagation()' on all click events (prev, next, 
 *   and dot selection) [9].
 * - Variants: Supports 'small' and 'normal' size variants to fit different UI 
 *   contexts, such as compact stop summaries vs. full-width overviews [11].
 * 
 * Styling:
 * - Visuals: Uses linear gradients (145deg) for buttons and glowing dot 
 *   indicators to represent the active index [9, 12].
 */

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  length: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  size?: "small" | "normal";
}

export default function CarouselControls({
  length,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  size = "normal",
}: Props) {
  const dotSize = size === "small" ? "w-3 h-3" : "w-4 h-4";
  const btnSize = size === "small" ? "w-8 h-8" : "w-10 h-10";

  if (!length || length <= 1) return null;

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 items-center z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className={`${btnSize} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg`}
        style={{
          background: "linear-gradient(145deg, #333 0%, #222 100%)",
          border: "2px solid #555",
        }}
      >
        <ChevronLeft
          size={size === "small" ? 14 : 16}
          style={{ color: "#aaa" }}
        />
      </button>

      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => {
          const isActive = i === activeIndex;

          return (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={isActive}
              className={`${dotSize} rounded-full cursor-pointer transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70`}
              style={{
                background: isActive ? "#aaa" : "rgba(170,170,170,0.4)",
                boxShadow: isActive ? "0 0 8px rgba(170,170,170,0.8)" : "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          );
        })}
      </div>


      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className={`${btnSize} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg`}
        style={{
          background: "linear-gradient(145deg, #333 0%, #222 100%)",
          border: "2px solid #555",
        }}
      >
        <ChevronRight
          size={size === "small" ? 14 : 16}
          style={{ color: "#aaa" }}
        />
      </button>
    </div>
  );
}
