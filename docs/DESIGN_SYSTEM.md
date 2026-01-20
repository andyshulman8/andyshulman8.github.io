# Design System

This document explains the visual language, components, and motion patterns used across the portfolio.  
Audience: Designers and front-end engineers.

## Visual Identity

- **Metaphor:** Train station / transit system reflects the journey through design process.  
- **Color Palette:**  
  - THEME_COLOR `#424141` — Primary brand  
  - SILVER `#dfe1e5ff` — Accents & highlights  
  - INFO_COLOR `#2B2C28` — Panel backgrounds  
  - BACK_COLOR `#141515` — Page background  
  <!-- Comment: All colors verified in <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/constants/theme.ts">src/constants/theme.ts</traycer-file> lines 5-8. Note: There are additional color constants defined (TEXT_SECONDARY, TEXT_TERTIARY, TEXT_MUTED) that aren't mentioned here but are used throughout the app -->


- **Typography:** System fonts, responsive sizing, hierarchy: `h1 → h2 → h3 → body`.  
- **Spacing:** Tailwind defaults (4px base), consistent padding on sections and cards.  

## Components

- **WindowFrame System:** Modular chrome-style container for media.  
- **Train Animation:** Interactive hero element, horizontal scroll, sparks on hover.  
<!-- Comment: Verified in <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/App.tsx">src/App.tsx</traycer-file> lines 84-236. The train uses CSS animation for horizontal scroll and generates spark particles on hover using the generateSparks function (lines 53-65) -->
- **Skills Board:** Split-flap animation for technical skills display.  
<!-- Comment: Verified in src/components/Skills/SkillsBoard.tsx. The split-flap animation is triggered via IntersectionObserver when the board becomes visible (lines 11-15) -->
- **Carousel Controls & Fullscreen Viewer:** Navigate images/videos efficiently.
<!-- Comment: Carousel controls are in src/components/CarouselControlsNew.tsx. Fullscreen viewer is in <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/components/FullscreenImageViewer.tsx">src/components/FullscreenImageViewer.tsx</traycer-file> and supports both images and videos -->

## Motion & Interaction

- Purposeful, not distracting; reinforces transit metaphor.  
- GPU-accelerated transforms.  
<!-- Comment: The codebase uses CSS transforms and requestAnimationFrame for scroll throttling (<traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/hooks/index.ts">src/hooks/index.ts</traycer-file> lines 13-21), but explicit will-change properties are not consistently applied. Consider adding this for spark animations -->
- Scroll throttling and lazy loading for performance.  

## Responsive Design

- Mobile-first base styles, progressive enhancement for tablet/desktop.  
- Touch-friendly target sizing.  