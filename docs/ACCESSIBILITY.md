# Accessibility

This document explains the accessibility approach for the portfolio site.  
Audience: Designers, engineers, accessibility auditors.

## Goals

- WCAG 2.1 Level AA compliance.  
- Keyboard navigation for all interactive elements.  
- Semantic HTML and ARIA labels for screen readers.  
- Text/background color contrast meets recommended ratios.  

## Implementation

- **Semantic HTML:** `<header>`, `<main>`, `<section>`, `<footer>` with `aria-label`.  
- **Keyboard Navigation:** Train animation and case study stops fully navigable.  
<!-- Comment: Verified in <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/App.tsx">src/App.tsx</traycer-file> lines 222-225 (train has tabIndex and onKeyDown) and <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/pages/logs.tsx">src/pages/logs.tsx</traycer-file> lines 643-679 (stop navigation buttons). However, the fullscreen image viewer keyboard controls could be improved as noted in line 30 -->
- **Color Contrast:** White/silver text on dark gray backgrounds; accent colors accessible.  
<!-- Comment: Colors verified in src/constants/theme.ts. SILVER (#dfe1e5ff) on BACK_COLOR (#141515) should meet WCAG AA standards, but formal contrast testing is recommended -->
- **Screen Reader Support:** Alt text, ARIA labels, skip links.  

## Testing Checklist

- Keyboard-only navigation through entire site.  
- VoiceOver/NVDA/JAWS screen reader testing.  
- Contrast audit with WebAIM.  
- Lighthouse accessibility scoring.  

## Known Gaps & Future Work

- `prefers-reduced-motion` media query not implemented. 
<!-- Comment: CONFIRMED - No prefers-reduced-motion queries found in the codebase. This affects train animation, spark effects, split-flap board, and various transitions. Consider adding @media (prefers-reduced-motion: reduce) rules -->
- Fullscreen viewer keyboard controls could be improved.  
<!-- Comment: CONFIRMED - <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/components/FullscreenImageViewer.tsx">src/components/FullscreenImageViewer.tsx</traycer-file> has click handlers but no keyboard event handlers for navigation. Should add arrow key support and Escape key handling -->


