/**
 * CalloutBox Component
 * 
// Purpose: Renders a styled callout container with optional iconography.
// Children: Accepts React nodes. In practice, content may originate as markdown,
// but by the time it reaches this component it has already been transformed
// (e.g., via renderMarkdownLinks) into React elements.

 * 
 * 
 * Design Note: 
 * - The component is designed to support icon SVG usage for added visual emphasis 
 *   within the layout [1].
 * - It functions as a lightweight wrapper to maintain consistent spacing and 
 *   typography for highlighted "callout" sections [2].
 */

import React from "react";

interface CalloutBoxProps {
  children: React.ReactNode;
}

export default function CalloutBox({ children }: CalloutBoxProps) {
  return (
    <div className="rounded-lg p-4 mb-6 border border-white/10 bg-[#dfe1e5ff] flex items-start gap-4">
      <div className="flex-shrink-0 text-black">
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="text-black"
        >
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z" />
        </svg>
      </div>
      <div className="text-black text-sm leading-relaxed">{children}</div>
    </div>
  );
}
