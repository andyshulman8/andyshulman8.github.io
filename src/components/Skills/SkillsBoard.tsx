import { useState, useEffect, useRef } from 'react';
import { SILVER } from '../../constants/theme';
import { skillCategories } from '../../data/skills';

export const SkillsBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            // Add delay before starting animation
            setTimeout(() => {
              setIsVisible(true);
            }, 500); // 500ms delay after becoming visible
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px'
      }
    );

    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    return () => {
      if (boardRef.current) {
        observer.unobserve(boardRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div className="mb-12" ref={boardRef}>
      <h3 className="text-white/90 text-2xl font-bold mb-4">Operating the System</h3>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 font-mono shadow-2xl">
        <div className="split-flap-board grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skillCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <div className="text-sm uppercase tracking-wider" style={{ color: SILVER }}>
                {cat.title}
              </div>
              <div className="space-y-2">
                {cat.items.map((it, iIdx) => (
                  <div
                    key={iIdx}
                    className={`split-flap-item ${isVisible ? 'settled' : 'searching'}`}
                    style={{ 
                      '--settle-delay': `${(cIdx * 5 + iIdx) * 300}ms`,
                      color: SILVER
                    } as React.CSSProperties}
                  >
                    <div className="flap">
                      <div className="flap-front">{it}</div>
                      <div className="flap-back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
