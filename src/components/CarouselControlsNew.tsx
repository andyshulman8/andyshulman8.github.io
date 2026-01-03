import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  length: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  size?: 'small' | 'normal';
}

export default function CarouselControls({ length, activeIndex, onPrev, onNext, onSelect, size = 'normal' }: Props) {
  const dotSize = size === 'small' ? 'w-3 h-3' : 'w-4 h-4';
  const btnSize = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';

  if (!length || length <= 1) return null;

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 items-center z-10">
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className={`${btnSize} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg`}
        style={{ background: 'linear-gradient(145deg, #333 0%, #222 100%)', border: '2px solid #555' }}
      >
        <ChevronLeft size={size === 'small' ? 14 : 16} style={{ color: '#aaa' }} />
      </button>

      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); onSelect(i); }}
            className={`${dotSize} rounded-full cursor-pointer transition-all hover:scale-125`}
            style={{
              background: i === activeIndex ? '#aaa' : 'rgba(170,170,170,0.4)',
              boxShadow: i === activeIndex ? '0 0 8px rgba(170,170,170,0.8)' : 'none',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className={`${btnSize} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg`}
        style={{ background: 'linear-gradient(145deg, #333 0%, #222 100%)', border: '2px solid #555' }}
      >
        <ChevronRight size={size === 'small' ? 14 : 16} style={{ color: '#aaa' }} />
      </button>
    </div>
  );
}
