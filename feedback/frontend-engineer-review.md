# Code Review — Senior Frontend Engineer (React/TypeScript)

Reviewed: full `src/`, `api/`, and root config. Overall: clean component decomposition, good use of lazy loading and typed data. But there are several real bugs, a11y regressions, and dead code that would come up in any PR review.

---

## 🐛 Actual Bugs

### 1. Ticket date renders wrong month (string concatenation bug)
`src/components/ticket.tsx` (~line 100):
```tsx
{String(new Date().getMonth()) + 1}
{String(new Date().getFullYear()).slice(-2)}
```
`getMonth()` is 0-indexed AND you're concatenating a string with `1`. In July this renders `"61" + "26"` → **"6126"** instead of "0726". Fix:
```tsx
{String(new Date().getMonth() + 1).padStart(2, "0")}
```

### 2. Transition timing mismatch (comment lies)
`src/App.tsx` line 123:
```tsx
}, 1400); // Match TRANSITION_DURATION_MS from caseStudyConstants
```
`TRANSITION_DURATION_MS` is **1200**, not 1400. The comment claims they match. Import the constant instead of hardcoding — this is exactly the drift the constant exists to prevent.

### 3. Fullscreen viewer content is `aria-hidden` — including its own controls
`src/components/FullscreenImageViewer.tsx` line 145: the wrapper around the image AND the prev/next/dot buttons has `aria-hidden="true"`. Screen readers can't perceive the image or the navigation, yet the focus trap moves keyboard focus *into* that hidden subtree. Focusable elements inside `aria-hidden` is an axe-core violation. Remove `aria-hidden` (it was probably meant to suppress the click-handler warning, not hide content).

### 4. Fullscreen viewer crops the work (`object-cover`)
Same file, lines 185/191: fullscreen images/videos use `object-cover object-left-top` inside a fixed `h-[70vh]` box. Tall or wide screenshots get cropped — in a *design portfolio*, the fullscreen view is where people inspect your work. Should be `object-contain`.

### 5. Stale focus trap
The focusable-elements list is queried once in a `useEffect` with deps `[onClose]`. The nav buttons only render when `gallery.length > 1`, and dots re-render as `currentIndex` changes — the trap's first/last references go stale. Also, Escape is handled twice (effect keydown + JSX `onKeyDown`). Query focusables inside the keydown handler instead.

### 6. Carousel index leaks between stops
`src/pages/case_template.tsx` lines 185–194: the reset effect only zeroes `stopCarouselIndex` when it's *out of range* for the new stop. Navigate from stop A (viewing image 3) to stop B (which has 4 images) and you land on B's image 3, not image 0. Also the effect lists `stopCarouselIndex` in deps, so it re-runs on every carousel click. Reset unconditionally on `currentStop` change:
```tsx
useEffect(() => { setStopCarouselIndex(0); }, [currentStop]);
```

### 7. Dynamic Tailwind class never generated
`src/components/InformationBooth.tsx` lines 129/147:
```tsx
className={`... transition-opacity duration-${UI.imageLoadingDuration} ...`}
```
Tailwind's compiler can't see template-string classes — `duration-500` is only in the output CSS if it appears literally somewhere else. Your fade-in transitions on the process map are likely instant. Use a literal class or inline `transitionDuration` style.

### 8. `text-l` is not a Tailwind class
`src/pages/case_template.tsx` lines 432 and 826 use `text-l`. Valid sizes are `text-lg`, `text-xl`, etc. This silently does nothing — body copy renders at base size.

### 9. Broken deploy script + stale `homepage`
`package.json`:
```json
"homepage": "http://andyshulman8.github.io/portfolio",
"deploy": "gh-pages -d build"
```
Vite outputs to `dist/`, not `build/` — `npm run deploy` fails. And `homepage` contradicts the canonical Vercel URL used everywhere else. If Vercel is the deploy target, delete both; if GitHub Pages is a target, note that `vercel.json` SPA rewrites won't apply there and deep links (`/logs/3`) will 404.

### 10. `.env.local` is tracked in git
`git ls-files` shows `.env.local` is committed despite being in `.gitignore` (gitignore doesn't untrack already-tracked files). The file itself says a token was removed — but its history may still contain it. Run `git rm --cached .env.local`, and rotate the Vercel token if it ever landed in a commit.

---

## ⚠️ Logic & Architecture Issues

- **Route data triplicated**: `CaseStudyWrapper.tsx` hardcodes `viewToIndex`, `validCases`, and the `order` array — all derivable from `allCaseStudies.map(c => c.id)`. Three places to update when adding a case study; guaranteed future drift.
- **Duplicate scroll-reset effects** in `case_template.tsx`: one on `location.pathname`, one on `initialStop`, plus manual `window.scrollTo(0,0)` in four handlers. Consolidate.
- **Analytics loaded via state** (`App.tsx` lines 97, 126–130): dynamic-importing `Analytics` into `useState` causes an extra render and is nonstandard. `lazy()` + `Suspense`, or just import it — the package is tiny.
- **Double pageview tracking**: `usePageviewTracking` pushes a `pageview` event to the GTM dataLayer AND calls `gtag("config", ...)` directly, on top of GTM's own triggers and gtag.js's initial config in `index.html`. High risk of double-counted pageviews in GA4. Pick one pipeline (GTM), delete the standalone gtag snippet.
- **ErrorBoundary global handlers don't set state**: `window.onerror`/`unhandledrejection` report to the API but the UI keeps rendering as if nothing happened — intentional maybe, but `api/log-error.ts` only `console.log`s. On Vercel that's function logs with no retention/alerting. Either wire Sentry or delete the endpoint; also note the fetch fires twice in dev StrictMode.
- **`WindowFrame` is a clickable `<div>`** with no `role`, `tabIndex`, or keyboard handler — the peek/stop carousels can't be opened to fullscreen via keyboard. The Before/After images correctly use `<button>`; do the same here.
- **Dropdown a11y** (`case_template.tsx` header): trigger lacks `aria-expanded`/`aria-haspopup`/`aria-controls`; no Escape-to-close; no focus return. `CarouselControls` and `FullscreenImageViewer` prev/next buttons have **no `aria-label`** (only the dots do).
- **Spark keys can collide**: `id: Date.now() + i` — two hovers within the same millisecond produce duplicate React keys. Use a counter ref.
- **`index.css` mixes Tailwind v3 and v4 syntax**: `@import "tailwindcss"` (v4) followed by `@tailwind base/components/utilities` (v3 directives, no-ops in v4). Delete the v3 lines. Also the global `* { border-color: ... }` selector is a blunt instrument — scope it.
- **Token duplication**: `--color-text-secondary` and `--color-text-tertiary` are both `#a8adb3`; theme colors are defined in `index.css`, `constants/theme.ts`, AND re-declared locally in `case_template.tsx` (lines 47–52). Three sources of truth.

## 🧹 Dead Code (ship less, review less)

- `src/pages/dot.tsx` — `StationDot` is imported nowhere.
- `src/App.css` — not imported anywhere.
- `case/` directory (`line`, `map`, `minimap`, `ride`) — extensionless orphaned files; `ride` imports `@/components/ui/button` which doesn't exist. Delete or move to a scratch branch.
- `lighthouse-report.json` (1MB) committed to the repo root.
- Large commented-out blocks (`ExpressTicketCTA` in InformationBooth, resume Google Doc link, etc.).
- `public/images/Home/Thumbs-notwebp/` and unconverted originals — see the performance review.

## ✅ What's Good

- Discriminated union for `FullscreenState` is the right call.
- Lazy-loading strategy (viewer, testimonials, booth, transition) is well thought out and documented.
- `useIntersectionOnce` + memoized options is correct and disciplined.
- Typed case-study data model keeps the 700-line content file honest.
- Deep-linkable stops (`/:caseId/:stopIndex`) with clamped parsing — nice.
