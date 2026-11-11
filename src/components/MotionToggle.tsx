import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Site-wide pause control for decorative looping animation (WCAG 2.2.2).
 * Sets data-motion="paused" on <html>; index.css pauses all CSS animations
 * under that attribute.
 */
export function MotionToggle() {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    if (next) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="fixed left-4 bottom-6 z-50 flex items-center gap-2 h-11 px-4 rounded-full bg-black/70 text-white/90 text-sm border border-white/30 backdrop-blur-md hover:bg-black/90"
    >
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      {paused ? "Resume animations" : "Pause animations"}
    </button>
  );
}
