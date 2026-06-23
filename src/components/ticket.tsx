/**
 * ExpressTicketCTA Component
 *
 * Purpose: Acts as the high-impact call-to-action (CTA) to initiate a case study
 * journey. It is used in the CaseStudyTemplate overview section [2, 3].
 *
 * SVG Structure & Design:
 * - Emulates a physical transit ticket with a paper base (#fdf7ec), vertical
 *   perforations, and a machine-readable barcode [4, 5].
 * - Features a "red stamp" style "EXPRESS" label with simulated ink bleed
 *   to reinforce the station metaphor [6].
 *
 * Animation & Interaction:
 * - Hover Effects: The ticket scales slightly and rotates -1 degree while the
 *   "stub" punch-hole changes fill to black, simulating a physical punch [5, 7].
 * - Accessibility: Implements as a button so space bar works, 'tabIndex={0}', and keyboard
 *   event listeners (Enter key) for screen reader compatibility [7].
 */

import React from "react";
import barcode from "./barcode.svg";

interface ExpressTicketCTAProps {
  onClick: () => void;
}

export const ExpressTicketCTA: React.FC<ExpressTicketCTAProps> = ({
  onClick,
}) => (
    <button
      type="button"
      className="relative inline-flex cursor-pointer group bg-transparent border-0 p-0 text-left"
      onClick={onClick}
      aria-label="Express to first stop"
    >
    <svg
      width="240"
      height="90"
      viewBox="0 0 240 90"
      className="block transition-transform duration-200 group-hover:scale-[1.02] group-hover:-rotate-1"
      style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.35))" }}
    >
      {/* Paper base */}
      <rect
        width="240"
        height="90"
        rx="6"
        fill="#fdf7ec"
        stroke="#e3d4af"
        strokeWidth="1.25"
      />

      {/* Outer perforation (left edge) - extended to bottom */}
      <g stroke="#d4c49c" strokeWidth="0.8" strokeLinecap="round">
        <path d="M 6 8 V 88" strokeDasharray="1.5 1.5" />
      </g>

      {/* Inner vertical perforation (stub separator) - extended to bottom */}
      <g stroke="#d4c49c" strokeWidth="0.7" strokeLinecap="round">
        <path d="M 185 8 V 88" strokeDasharray="2 2" />
      </g>

      {/* Top banner */}
      <rect x="0" y="8" width="240" height="18" className="fill-blue-600" />
      <text
        x="16"
        y="20"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="9"
        fontWeight="900"
        letterSpacing="1.4"
        fill="rgba(255,255,255,0.9)"
      >
        Design Central Station
      </text>

      {/* Main content area - FIXED with tspans */}
      <text
        x="20"
        y="45"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="16"
        fontWeight="900"
        fill="#111827"
        letterSpacing="1.2"
      >
        <tspan x="20" dy="0">
          VIEW FULL
        </tspan>
        <tspan x="20" dy="18">
          CASE STUDY
        </tspan>
      </text>

      {/* Machine-like metadata */}
      <text
        x="20"
        y="83"
        fontFamily="'Courier New', monospace"
        fontSize="8"
        fill="#9ca3af"
      >
        ZONE DCS · DS 1 · {String(new Date().getMonth()) + 1}
        {String(new Date().getFullYear()).slice(-2)}
      </text>

      {/* Stub section (right) */}
      <text
        x="210"
        y="37"
        fontFamily="'Courier New', monospace"
        fontSize="8"
        fill="#6b7280"
        textAnchor="middle"
      >
        DCS-EXP
      </text>
      <text
        x="210"
        y="67"
        fontFamily="'Courier New', monospace"
        fontSize="8"
        fill="#6b7280"
        textAnchor="middle"
      >
        01 · OUT
      </text>
      <image
        href={barcode}
        x="7"
        y="60"
        width="40"
        height="40"
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: "scale(-1, 1)", transformOrigin: "center" }}
      />

      {/* Hover punch-hole on stub */}
      <circle
        cx="230"
        cy="50"
        r="4"
        fill="none"
        stroke="rgba(75,85,99,0.6)"
        strokeWidth="1"
        className="transition-all duration-200 group-hover:fill-black group-hover:stroke-black"
      />

      {/* EXP / EXPRESS red stamp */}
      <g transform="translate(90 30) rotate(-15 80 34)" opacity="0.92">
        <rect
          x="52"
          y="26"
          width="68"
          height="18"
          rx="2"
          className="fill-orange-700"
        />
        {/* Ink bleed */}
        <text
          x="86"
          y="39"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="10"
          fontWeight="900"
          textAnchor="middle"
          fill="rgba(0,0,0,0.18)"
        >
          EXPRESS
        </text>
        <text
          x="86"
          y="38"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="10"
          fontWeight="900"
          textAnchor="middle"
          fill="rgba(255,255,255,0.96)"
          letterSpacing="1"
        >
          EXPRESS
        </text>
      </g>

      {/* Subtle paper noise */}
      <defs>
        <pattern
          id="paperDots"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="2" r="0.4" fill="rgba(0,0,0,0.03)" />
          <circle cx="4" cy="5" r="0.35" fill="rgba(0,0,0,0.025)" />
        </pattern>
      </defs>
      <rect
        width="240"
        height="90"
        fill="url(#paperDots)"
        pointerEvents="none"
      />
    </svg>
    </button>
);

