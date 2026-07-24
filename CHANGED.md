# Changes on `fix/portfolio-review-issues`

Branch built from the four reviews in `feedback/` (recruiter, design director,
frontend engineer, performance engineer). 12 commits, `main` untouched, nothing
pushed. Verified along the way with clean builds, zero lint errors, and real
browser screenshots (Playwright) of the hero, case study cards, and fullscreen
viewer.

Run it: `git checkout fix/portfolio-review-issues && npm run dev`

---

## Visible on the site

- **Hero section reordered.** Name/title ("Andy Shulman — Senior UX/Product
  Designer") now leads, largest on the page — it was previously the smallest
  line, third down. Added an "Open to Senior/Staff Product Design roles ·
  Remote (US) · Climate, Health, AI" line (pulled from CLAUDE.md's existing
  background info, not invented). Added visible **"View Resume" / "Get in
  Touch" buttons** near the top — the resume link previously only existed
  buried in the About section, past all six case study cards.
- **Company badges** added to every case study card and case study page title
  — LogicMonitor, Align Technology, Exploratorium, Bose. Previously no
  recognizable employer appeared anywhere in a scan.
- **Card date badge** simplified from "est: 2025" to just "2025" (read as
  "established," needed a beat of translation).
- **Before/after captions fixed.** The Alerts case study was showing the Logs
  case study's hardcoded captions ("Fragmented tools, slow troubleshooting" /
  "Unified platform, 10-minute resolution") under its own before/after images.
  Each case study now has its own.
- **"About the Conductor" → "About Me (the Conductor)"** so it's scannable via
  literal "about."
- **Fullscreen image viewer:** images were being cropped (`object-cover`),
  now shows the whole image (`object-contain`). The glass-glare overlay was
  visibly washing screenshots with white haze — toned way down.
- **Footer:** email is now a real `mailto:` link (was plain text); LinkedIn
  opens in a new tab (was navigating you away from the site).
- **Hero train click** now goes to the Logs case study (your strongest) —
  previously jumped to a random one, which risked landing a recruiter on a
  weak page first.
- **Browser tab title** changes per case study — was identical on every page.
- **Progress dots on case study pages:** the current stop's label is now
  visible on mobile. Previously it only appeared on `:hover`, which touch
  devices can never trigger, so mobile users saw unlabeled dots.
- **Contrast fixes.** A few text spots were genuinely hard to read (one combo
  measured 1.8:1 against a 4.5:1 requirement) — bumped to compliant, still
  visually muted where that was the intent.

## Felt, not seen

- **Public assets: 83MB → 8.5MB.** Deleted ~140 unreferenced image files,
  re-encoded five that were wildly oversized for where they render (an 824KB
  image for a 64px avatar circle, a 10,200px-wide screenshot shown at a
  fraction of that size, etc.) — all spot-checked visually before/after.
- **Hero image no longer double-downloads.** The `<link rel="preload">` was
  pointing at a different file than the one actually rendered.
- Route-level JS chunking cleaned up (was forcing some components into eager
  loads instead of their own lazy chunk).

## Fixed but invisible

- **A real cross-platform bug:** `casedata.tsx` referenced
  `NewLogAlert.webp` (capital N) but the file on disk was `newLogAlert.webp`
  — invisible on Mac/Windows (case-insensitive filesystems), would have 404'd
  on Vercel's case-sensitive Linux build. Found while auditing images, fixed.
- **Analytics may have been silently broken.** Neither inline script's CSP
  hash matched what was whitelisted in `vercel.json` — recomputed and fixed.
  Also consolidated to one tracking pipeline (GTM); was double-counting
  pageviews via a redundant direct `gtag()` call on every route change.
- **Security:** untracked a stray `.env.local` that was committed despite
  being gitignored (checked git history — no real secret ever landed, just
  an already-cleared token). Removed an unauthenticated `/api/log-error`
  endpoint that only `console.log`'d with no retention or alerting — pure
  attack surface, no benefit.
- Several real bugs: a date-formatting bug (ticket SVG), a stale focus trap
  in the fullscreen viewer, a carousel index that leaked between stops with
  different image counts, a dynamic Tailwind class the compiler could never
  see (transitions were probably instant, not fading), an invalid `text-l`
  class (silently no-op) in two places, a broken `gh-pages` deploy script
  left over from before this moved to Vercel.
- Keyboard/screen-reader fixes: dropdown menu now has `aria-expanded` and
  closes on Escape with focus return; missing `aria-label`s added to
  carousel prev/next buttons; a clickable frame that had no keyboard path
  now does (`role="button"` + Enter/Space, since it wraps real buttons and
  can't itself become a native `<button>`).
- Dead code removed: an orphaned `case/` directory (predates the current
  component structure, imports a shadcn `Button` that doesn't exist in this
  project), an unused `dot.tsx`, unused `App.css`, a 1MB `lighthouse-report.json`
  that was a meaningless dev-server run, commented-out dead code in a few
  files.
- Code-quality cleanup: consolidated three separate hardcoded copies of the
  same theme colors down to one source of truth; fixed a color token
  (`--color-text-tertiary`) that was set to the same value as
  `--color-text-secondary` even though a genuinely distinct shade was defined
  elsewhere and never used; consolidated `CaseStudyWrapper`'s three hardcoded
  case-ID lists into one derived list.

## Left for you — need your input

1. **Resume is still a Google Drive link,** not a hosted PDF. I don't have
   your actual resume file to host at `/andy-shulman-resume.pdf` as the
   performance review suggested. If you give me the file, I can wire it up.
2. **LinkedIn URL is `/in/andrea-shulman/`** — doesn't match "Andy." Worth
   confirming that's actually the right profile before a recruiter clicks it.
3. **Testimonial component unification** (design director review) — the
   homepage cards and case-study quote blocks are still two different
   components. I made a smaller, safe fix (matching fallback-avatar
   behavior) instead of a full merge, because the underlying data shapes
   differ enough (`quoteAuthor` is sometimes just a role string with no name)
   that a deeper refactor risked a visual regression I couldn't verify
   without your eyes on it.
4. **Portfolio A/B/C configurations** (per your own strategy doc) still
   don't exist — the site ships one fixed order for everyone. Would need a
   product decision on how you want to expose that (URL param, etc.), not
   just a code fix.
5. **`npm audit`** reports 18 vulnerabilities (1 critical) in dependencies.
   Didn't touch these — `npm audit fix --force` can include breaking
   changes, not something to run unsupervised on a live portfolio site.
