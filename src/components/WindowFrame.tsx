import React from 'react';
import { WINDOW_FRAME_STYLE, WINDOW_CHROME_STYLE, WINDOW_CONTENT_STYLE, GLASS_OVERLAY_GRADIENT, CORNER_RIVET_STYLE } from '../utils/caseStudyConstants';

/**
 * WindowFrame
 * 
 * A reusable chrome-style container used to display
 * images or videos consistently across peeks and stops.
 * Centralizes visual treatment so changes don't drift.
 */
interface WindowFrameProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function WindowFrame({ children, onClick }: WindowFrameProps) {
  return (
    <div
      className="relative p-6 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
      style={WINDOW_FRAME_STYLE}
    >
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
  positions?: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
}

export function WindowCornerAccents({
  positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
}: WindowCornerAccentsProps) {
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full shadow-md pointer-events-none"
          style={{
            [pos.includes('top') ? 'top' : 'bottom']: '-2px',
            [pos.includes('left') ? 'left' : 'right']: '-2px',
            ...CORNER_RIVET_STYLE,
          }}
        />
      ))}
    </>
  );
}
