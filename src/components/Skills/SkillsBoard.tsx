/**
 * SkillsBoard Component
 * 
 * Metaphor: Implements a "split-flap" board metaphor (similar to vintage airport/train 
 * station displays) to present technical proficiencies [2].
 * 
 * Animation & Logic:
 * - Trigger: Uses the 'useIntersectionOnce' hook to initiate the animation when 30% 
 *   of the board is visible within the viewport [1, 3].
 * - Stagger Delay: Calculates a unique '--settle-delay' CSS custom property for each 
 *   item based on its category and index: `(cIdx * 5 + iIdx) * 300ms` [2, 4].
 * - State: Items transition from a 'searching' state to a 'settled' state once the 
 *   intersection trigger is activated [2, 4].
 * 
 * Dependencies:
 * - Theme: Utilizes the 'SILVER' constant for consistent branding [1, 3].
 * - Data: Maps through 'skillCategories' to dynamically generate the board content [1, 3].
 * - Performance: The 'useIntersectionOnce' hook optimizes performance by ensuring 
 *   animations only fire once, reducing unnecessary re-renders [2, 3].
 */

import { useState, useRef } from 'react';
import { SILVER } from '../../constants/theme';
import { skillCategories } from '../../data/skills';
import { useIntersectionOnce } from '../../hooks/useIntersectionOnce';

export const SkillsBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Trigger animation once when board becomes visible
  useIntersectionOnce(
    boardRef,
    () => setIsVisible(true),
    { threshold: 0.3 }
  );

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
