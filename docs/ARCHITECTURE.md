# Architecture

This document explains the architectural decisions behind this portfolio site: how it’s structured, why those choices were made, and what tradeoffs they involve.

The goal was not novelty. It was clarity, maintainability, and performance — the same constraints that shape real production systems.

---

## System Overview

Single-page React application with six case studies rendered through one universal template. Content lives in typed data files, separated from presentation logic.

The system is intentionally simple:

- No global state library
- No CMS
- No runtime content fetching

Everything needed to understand or extend the site lives in the repo.

### Tech Stack

- **React 19 + TypeScript**
- **Vite 7** (build + dev)
- **Tailwind CSS 4**
- **React Router 7** (client-side routing)
- **Vercel** (deployment + analytics)
<!-- Verified in package.json: react-router-dom@7.12.0 -->

### Core Files

- `src/pages/App.tsx` — Homepage with routing
<!-- Comment: The actual file is <traycer-file absPath="/Users/andyshulman/Documents/Portfolio2025/design-central-station/src/App.tsx">src/App.tsx</traycer-file> (not in pages folder). It's the main application component with homepage content -->
- `src/pages/case_template.tsx` — Universal case study renderer
<!-- Comment: VERIFIED - This is the CaseStudyTemplate component that renders all case studies -->
- `src/pages/casedata.tsx` — All case study content
<!-- Comment: VERIFIED - Contains allCaseStudies array with all 6 case studies -->
- `src/components/CaseStudyWrapper.tsx` — URL → data mapping
<!-- Comment: VERIFIED - Contains viewToIndex mapping (lines 7-9) and handles routing logic -->

---

## Key Architectural Decisions

### 1. One Template for All Case Studies

**Problem**  
Six case studies with overlapping structure. Maintaining separate templates would increase drift and overhead.

**Solution**  
A single, universal case study template consumes typed data objects.

```ts
// src/pages/casedata.tsx
export const allCaseStudies: CaseStudyData[] = [
  { id: "logs", title: "Logs: Rags to Riches", stops: [...] },
  { id: "alerts", title: "Smarter Alerts", stops: [...] },
  // ...
];
```

**Why**

- Consistent reading experience

- Easy updates

- Adding a new case study requires data entry, not new components

**Tradeoff**\
Less per-case customization, but stronger systemic consistency.

---

### 2\. URL as State

**Problem**\
Users should be able to link directly to a specific moment in a case study.

**Solution**\
All navigation state is encoded in the URL. No Redux, no Zustand.

Example:

- `/logs` → case study overview

- `/logs/3` → stop 3 in the Logs case study

```
// src/components/CaseStudyWrapper.tsx
const { caseId, stopIndex } = useParams();
const dataIndex = viewToIndex[caseId];
const initialStop = stopIndex ? parseInt(stopIndex, 10) - 1 : undefined;
```

<!--Verified in src/components/CaseStudyWrapper.tsx lines 9-10, 22 -->

**Why**

- Deep-linkable content

- Browser back/forward works naturally

- Clear mental model: URL is the source of truth

**Tradeoff**\
Routing logic is slightly more complex, but UX clarity improves significantly.

---

### 3\. Design Tokens as Single Source of Truth

**Problem**\
Color, timing, and spacing drift across components over time.

**Solution**\
All shared values live in centralized constants. No magic numbers.

```export const THEME_COLOR = '#424141';
export const SILVER = '#dfe1e5ff';

export const ANIMATION = {
  sparkFly: 500,
};

export const UI = {
  backToTopThreshold: 320,
};
```

<!--Verified in src/constants/theme.ts-->

**Why**

- Changes propagate automatically

- TypeScript catches invalid usage

- Visual consistency stays intact as the system grows

---

### 4\. Composition Over Prop Explosion

**Problem**\
Deep prop chains make components harder to reason about and refactor.

**Solution**\
Use composition for structural UI patterns (e.g., the WindowFrame system).

`<WindowFrame onClick={handleClick}>
  <WindowContent>
    <img src={...} />
  </WindowContent>
  <WindowCornerAccents />
</WindowFrame>`

<!--Verified in src/components/WindowFrame.tsx lines 16-30-->

**Why**

- Each component does one job

- Easier testing and refactoring

- Clear visual hierarchy in JSX

---

## Performance Strategy

**Targets**

- < 2s initial load

- 90+ Lighthouse score

- Mobile-first performance

//Note: These are aspirational targets. Actual performance varies by network and device.

<!-- !!!Consider adding actual Lighthouse scores if available, or noting that these should be measured -->

### Lazy Loading

- Images use `loading="lazy"` and `decoding="async"`

- Iframes (e.g., maps) load only when visible

`// src/hooks/useIntersectionOnce.ts
const observer = new IntersectionObserver((entries) => {
  if (entry.isIntersecting) {
    callback();
    observer.unobserve(entry.target);
  }
});`

<!--Verified in src/hooks/useIntersectionOnce.ts; used in src/App.tsx line 121 for maps iframe-->

**Impact**\
Faster initial render and better Time to Interactive on mobile.

---

### Scroll Event Throttling

**Problem**\
Unthrottled scroll listeners cause issues.

**Solution**\
Throttle updates using `requestAnimationFrame`.

`const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      setIsVisible(window.scrollY > threshold);
      ticking = false;
    });
    ticking = true;
  }
};`

<!--Verified in src/hooks/index.ts lines 13-21-->

---

### Image Optimization

- WebP / AVIF where supported

- Responsive assets for mobile vs desktop

- Manual compression (could be automated later)

<!-- Current implementation: Manual compression. Images use WebP/AVIF formats (verified in public/images/). Responsive assets handled via CSS object-fit, not separate image sizes. -->

---

### Code Splitting

Handled automatically by Vite. Vendor libraries are split into a cached chunk.

Vite automatically splits vendor libraries into cached chunks. The current configuration uses default code splitting without manual chunk definitions.

<!--Verified in vite.config.ts: uses default Vite code splitting behavior-->

---

## Known Limitations

1.  **Train Animation Performance**\
    Spark particles rely on absolute positioning and may be slow on older devices.

    _Potential fix_: `will-change` tuning or canvas rendering.
    <!-- Spark generation in src/App.tsx lines 53-65 uses absolute positioning. Consider will-change: transform for GPU acceleration. -->

2.  **Fullscreen Image Viewer**\
    Loads all carousel images at once.

    _Potential fix_: Virtualized loading.

3.  **Reduced Motion Support**\
    Animations do not yet respect `prefers-reduced-motion`.

    _Fix_: Add media query--based fallbacks.

---

## Deployment

- **Platform:** Vercel

- **Strategy:** Automatic deploys from `main`

`// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`

Ensures client-side routing works correctly for all deep links.
