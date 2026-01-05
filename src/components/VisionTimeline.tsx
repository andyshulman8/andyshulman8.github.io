// VisionTimeline.tsx
import { visionTimeline } from './visionData.ts';

// VisionTimeline.tsx - Before/After comparison style
export default function VisionTimeline() {
  // Assuming first item is "before" and last is "after"
  const beforeItem = visionTimeline[0];
  const afterItem = visionTimeline[visionTimeline.length - 1];
  const middleItems = visionTimeline.slice(1, -1);

  return (
    <div className="relative max-w-5xl mx-auto my-16">
      {/* Before/After Split View */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* BEFORE */}
        <div className="relative">
          <div className="absolute -top-3 left-4 z-10">
            <span className="px-3 py-1 bg-black-500/20 border border-black-500/50 rounded-full text-xs font-bold text-black-300 uppercase tracking-wider bg-black">
              Original
            </span>
          </div>
          <div className="bg-black/40 border-2 border-black-500/30 rounded-xl p-6 h-full backdrop-blur-sm">
            {/* <h3 className="text-xl font-bold text-white/90 mb-3">
              {beforeItem.label}
            </h3> */}
            <p className="text-white/70 leading-relaxed">
              {beforeItem.text}
            </p>
          </div>
        </div>

        {/* AFTER */}
        <div className="relative">
          <div className="absolute -top-3 left-4 z-10">
            <span className="px-3 py-1 bg-black-500/20 border border-black-500/50 rounded-full text-xs font-bold text-black-300 uppercase tracking-wider bg-black">
              Revised
            </span>
          </div>
          <div className="bg-black/40 border-2 border-black-500/30 rounded-xl p-6 h-full backdrop-blur-sm shadow-lg shadow-black-500/10">
            {/* <h3 className="text-xl font-bold text-white/90 mb-3">
              {afterItem.label}
            </h3> */}
            <p className="text-white/70 leading-relaxed">
              {afterItem.text}
            </p>
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      {middleItems.length > 0 && (
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
              The Journey
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      )}

      {/* Middle steps - Timeline style */}
      {middleItems.length > 0 && (
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          
          <div className="space-y-6">
            {middleItems.map((item, index) => (
              <div key={item.id} className="flex items-start gap-6 relative">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-sm font-bold text-white/60">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                  {/* <h4 className="text-sm font-bold uppercase tracking-wide text-white/80 mb-2">
                    {item.label}
                  </h4> */}
                  <p className="text-sm leading-relaxed text-white/70">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact arrow at bottom */}
      {/* <div className="flex items-center justify-center mt-12 gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-400">
          <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Impact Delivered</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-400">
          <path d="M12 5v14m0 0l7-7m-7 7l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
      </div> */}
    </div>
  );
}
