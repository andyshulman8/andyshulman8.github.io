import React from 'react';

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
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
        border: '4px solid #333',
        boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)',
      }}
    >
      <div
        className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
          border: '3px solid #444',
          boxShadow:
            'inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)',
        }}
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
      style={{
        background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)',
      }}
    >
      {children}
      {/* Glass overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
          `,
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
            background: 'radial-gradient(circle, #666 30%, #444 70%)',
            border: '1px solid #888',
            boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
          }}
        />
      ))}
    </>
  );
}
