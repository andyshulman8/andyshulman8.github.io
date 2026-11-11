import React from "react";
import {
  WINDOW_FRAME_STYLE,
  WINDOW_CHROME_STYLE,
  WINDOW_CONTENT_STYLE,
  GLASS_OVERLAY_GRADIENT,
  CORNER_RIVET_STYLE,
} from "../utils/caseStudyConstants";

/**
 * WindowFrame Component System
 * 
 * Structure: Consists of three sub-components: WindowFrame (outer container), 
 * WindowContent (glass/media area), and WindowCornerAccents (rivets) [1, 10-12].
 * 
 * Design Pattern:
 * - Implements a "metallic chrome" look using constants from 'caseStudyConstants.ts' [2, 10].
 * - Provides a 'glass overlay' gradient effect to add depth to images and videos [2, 12].
 * - Corner rivets are rendered via 'WindowCornerAccents' to maintain a consistent 
 *   mechanical aesthetic across the platform [2, 12, 13].
 * 
 * Usage & Performance:
 * - Centrally manages the visual treatment for media peeks and stops to prevent 
 *   design drift [10].
// Purpose: Provides a compositional frame with layered visual styling.
// Styling: Uses static gradient and glass-effect styles defined as constants.
 */
interface WindowFrameProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function WindowFrame({ children, onClick }: WindowFrameProps) {
  // The frame isn't a button because it wraps real buttons (CarouselControls'
  // prev/next/dots). Mouse users can click anywhere on it; keyboard users get
  // a dedicated "View fullscreen" button, so Enter/Space on the carousel
  // controls can't bubble up and open the viewer.
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`relative p-6 rounded-2xl ${
        onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
      }`}
      style={WINDOW_FRAME_STYLE}
      onClick={onClick}
    >
      {onClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute top-1 right-1 z-10 rounded-md px-2 py-1 text-xs text-white/80 bg-black/50 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          View fullscreen
        </button>
      )}
      <div
        className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center"
        style={WINDOW_CHROME_STYLE}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * WindowContent
 *
 * The inner content container for WindowFrame
 * Standardizes media display with glass overlay effects
 */
interface WindowContentProps {
  children: React.ReactNode;
}

export function WindowContent({ children }: WindowContentProps) {
  return (
    <div
      className="relative rounded-lg w-full overflow-hidden h-[20rem]"
      style={WINDOW_CONTENT_STYLE}
    >
      {children}
      {/* Glass overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: GLASS_OVERLAY_GRADIENT,
        }}
      />
    </div>
  );
}

/**
 * WindowCornerAccents
 *
 * The metallic corner bolts on the window frame
 */
interface WindowCornerAccentsProps {
  positions?: ("top-left" | "top-right" | "bottom-left" | "bottom-right")[];
}

export function WindowCornerAccents({
  positions = ["top-left", "top-right", "bottom-left", "bottom-right"],
}: WindowCornerAccentsProps) {
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full shadow-md pointer-events-none"
          style={{
            [pos.includes("top") ? "top" : "bottom"]: "-2px",
            [pos.includes("left") ? "left" : "right"]: "-2px",
            ...CORNER_RIVET_STYLE,
          }}
        />
      ))}
    </>
  );
}
