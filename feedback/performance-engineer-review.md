# Performance & Infrastructure Review — Web Performance Engineer

Focus: load speed, asset pipeline, build config, deployment. The site has good bones (webp, responsive hero variants, lazy chunks, long-cache headers) but is leaking bandwidth in several places, and the biggest wins are all in images.

---

## 🔴 High Impact

### 1. LCP preload downloads the wrong hero file (double download)
`index.html` preloads:
```html
<link rel="preload" as="image" href="/images/Home/hero2.webp" media="(min-width: 768px)" ...>
<link rel="preload" as="image" href="/images/Home/hero1.webp" media="(max-width: 767px)" ...>
```
But `App.tsx` renders a `<picture>` with `hero2-400w/800w/1200w.webp` variants. The browser downloads the full-size hero **and** the responsive variant — the preload is pure wasted bytes on your most critical metric (LCP). Preload the srcset instead:
```html
<link rel="preload" as="image"
  imagesrcset="/images/Home/hero2-400w.webp 400w, /images/Home/hero2-800w.webp 800w, /images/Home/hero2-1200w.webp 1200w"
  imagesizes="1200px" media="(min-width: 768px)" fetchpriority="high">
```

### 2. `public/` is 83 MB — most of it never used
The deploy ships every original alongside its webp:

| Offender | Size | Status |
|---|---|---|
| `images/team/itero_lumina_pro_cart.png` | 6.1 MB | unreferenced |
| `images/Home/hero.jpg` | 4.5 MB | unreferenced |
| `images/Home/hero.webp` | 2.9 MB | unreferenced |
| `images/Home/headshot.png` | 2.8 MB | webp twin exists |
| `images/future/mindmap.jpeg` | 2.4 MB | webp twin exists |
| `images/Home/Thumbs-notwebp/` (whole dir) | ~5 MB | legacy duplicates |

Every `.png`/`.jpg` with a `.webp` twin, plus `Thumbs-notwebp/`, can be deleted. Anyone who guesses/crawls a URL still pays full price, `og:image` points at the 656 KB `hero2.png`, and deploy uploads are slow for no reason. Estimated safe deletion: **50+ MB**.

### 3. Oversized images that ARE on the critical path
- `headshot.webp` — **824 KB** rendered in a **64px circle**. Should be ~5 KB. This is the single worst byte-to-pixel ratio on the site.
- `process.webp` — **756 KB** on the homepage (lazy, but everyone scrolls to it).
- `casedata.tsx` still references two raw PNGs: `alerts/AI4.png` (**1.3 MB**) and `alerts/proactive.png` — everything else is webp; convert these two.
- Case-study carousel images have **no srcset** — mobile users download desktop-size files for a 20rem-tall window. The `generate_responsive_images.js` script exists; run it on the case-study folders too.
- Several webp files are still >1 MB (`future/mindmap.webp` 1.5 MB, `future/aud4.webp` 1.5 MB). Re-encode at quality ~75 and cap width at ~1600px; these are screenshots, not print assets.

### 4. Four analytics payloads, one portfolio
`index.html` loads **GTM** + **gtag.js** directly, and React mounts **Vercel Analytics** + **SpeedInsights**. That's four third-party scripts competing with your bundle on first paint, and GA4 pageviews are being sent through two pipelines simultaneously (see frontend review — likely double-counting). Move gtag config inside GTM, drop the standalone snippet, and consider whether you need both Vercel products and GA.

## 🟡 Medium

- **Immutable cache on mutable filenames**: `vercel.json` sets `Cache-Control: immutable, max-age=1y` on `/images/*`, but filenames aren't content-hashed. Replace `process.webp` with a new version and returning visitors see the old one for a year. Either rename on change or drop `immutable`.
- **`manualChunks` includes app source files**: listing `./src/pages/train.tsx` and `CaseStudyWrapper.tsx` in `manualChunks` alongside vendor libs is fragile — Rollup already splits these via your `lazy()` imports. It can also force shared deps into eagerly-loaded chunks. Keep vendor splits, delete the two source-file entries, and verify with `vite build --report`.
- **framer-motion (~30 KB gz) for one transition**: it's chunked, but the train transition + unused `dot.tsx` are its only consumers. The speeding-lines effect is achievable with CSS keyframes; that removes a whole dependency.
- **`lighthouse-report.json` (1 MB) committed**, and it's a dev-server run (`localhost:5173`, FCP 10.6 s, performance score null) — worthless as a benchmark and misleading if anyone opens it. Delete; re-run against the production URL.
- **CSP maintenance risk**: `script-src` relies on two sha256 hashes for the inline GTM/gtag snippets — any whitespace edit to those snippets silently breaks analytics. Also GA4 frequently beacons to region endpoints (`region1.google-analytics.com`) not in `connect-src`; check the console on the live site for CSP violations.
- **`allowedHosts: true`** in `vite.config.ts` disables dev-server host checking (DNS-rebinding exposure). It was for Replit; scope it or remove it.

## 🟢 Minor

- `sitemap.xml` `lastmod` is frozen at 2025-01-22 across all URLs.
- All routes share one `<title>`/meta description — case-study pages send identical `page_title` to GA and look generic in search results. A tiny `useEffect` setting `document.title` per case would fix both.
- `<meta name="title">` says "SaaS Design Specialist" while `<title>` says "Enterprise Design Specialist" — pick one.
- `preconnect` to `https://vercel.app` and `fonts.gstatic.com`: no fonts are loaded from Google, and `vercel.app` isn't the insights origin (`cdn.vercel-insights.com` is). Dead hints.
- The `noscript` GTM iframe before `#root` is fine, but note the GTM snippet at the bottom of `<body>` delays analytics slightly — intentional trade-off, just confirming it's deliberate.
- `api/log-error.ts` accepts unauthenticated POSTs and logs request bodies — trivially spammable. Rate-limit or remove.

## ✅ Good Practices Already In Place

- Responsive hero + thumbnail variants with correct `sizes`, `fetchpriority`, eager-vs-lazy split on the card grid.
- Route-level code splitting; case-study content only loads on navigation.
- Security headers (HSTS, X-Frame-Options, Permissions-Policy) are unusually thorough for a portfolio.
- `terser` + CSS minify, `decoding="async"` used consistently, video `preload="metadata"`.

**Suggested order of attack**: fix the hero preload (5 min), replace headshot/process with right-sized files (30 min), purge unused originals (1 hr), unify analytics (1 hr). That's likely a 2–4× improvement in transferred bytes on first visit.
