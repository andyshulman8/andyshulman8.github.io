/**
 * UI Constants for Case Study Template
 *
 * Centralizes style objects, timing values, and design tokens
 * used throughout the case study pages.
 */

// ============================================================
// Timing & Duration Constants (in milliseconds)
// ============================================================

/** Duration of the train transition animation when entering a case study */
export const TRANSITION_DURATION_MS = 1200;

// ============================================================
// Color Constants (imported context)
// ============================================================

const THEME_COLOR = "#424141";
const SILVER = "#dfe1e5ff";
const INFO_COLOR = "#2B2C28";
const ACCENT_COLOR = SILVER;
const TEXT_SECONDARY = "#a8adb3";

// ============================================================
// Style Objects & Token Functions
// ============================================================

/** Panel background color - used for info boxes, impact cards, etc. */
export const PANEL_STYLE = { backgroundColor: INFO_COLOR } as const;

/** Text color for primary emphasis (accent/silver) */
export const TEXT_ACCENT_STYLE = { color: ACCENT_COLOR } as const;

/** Text color for secondary content */
export const TEXT_SECONDARY_STYLE = { color: TEXT_SECONDARY } as const;

/** Border color using theme color */
export const BORDER_THEME_STYLE = { borderColor: THEME_COLOR } as const;

/** Border color using silver/accent */
export const BORDER_SILVER_STYLE = { borderColor: SILVER } as const;

/** Glow effect - creates a colored shadow halo */
export const glowStyle = (color: string) => ({
  boxShadow: `0 0 20px ${color}40`,
});

/** Large glow effect for emphasis */
export const largeGlowStyle = (color: string) => ({
  boxShadow: `0 0 30px ${color}40`,
});

/** Small inset border effect */
export const INSET_BORDER_STYLE = {
  boxShadow: "0 0 0 2px rgba(0,0,0,0.04) inset",
  borderColor: INFO_COLOR,
} as const;

// ============================================================
// Window Frame Styles
// ============================================================

/** Metallic window frame outer gradient - used for peek and stop carousels */
export const WINDOW_FRAME_STYLE = {
  background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)",
  border: "4px solid #333",
  boxShadow: "inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)",
} as const;

/** Metallic window frame inner chrome - provides metallic appearance */
export const WINDOW_CHROME_STYLE = {
  background: "radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)",
  border: "3px solid #444",
  boxShadow:
    "inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)",
} as const;

/** Window content display area - supports media inside */
export const WINDOW_CONTENT_STYLE = {
  background: "linear-gradient(145deg, #1f1f1f 0%, #111 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "inset 0 0 30px rgba(0,0,0,0.9)",
} as const;

/** Glass overlay effect for depth and visual interest */
export const GLASS_OVERLAY_GRADIENT = `
  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
  linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
`;

/** Corner rivet styling for metallic window frames */
export const CORNER_RIVET_STYLE = {
  background: "radial-gradient(circle, #666 30%, #444 70%)",
  border: "1px solid #888",
  boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
} as const;
