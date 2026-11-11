# Portfolio Critique — Design Director

Perspective: I'm reviewing this the way I would before deciding whether to bring you in for a portfolio review round. Verdict up front: the train-station concept is memorable and the metrics discipline is genuinely rare — but the metaphor is taxing the content in places, and a few craft details undercut the "I sweat the details" story a senior designer needs to tell.

---

## What's Working

- **Metrics-first storytelling.** "Hours → 10 minutes," "$250K annual savings," "30% alert noise reduction" — on the cards, in the overviews, repeated at stops. Most senior portfolios still can't do this. Keep it.
- **A coherent system, not six pages.** Shared template, typed content model, consistent stop structure. The site itself demonstrates systems thinking, which matches your positioning.
- **The journey structure mirrors process.** Stops-as-process-phases (Empathize → Define → Prototype → Test) is a clever way to force process narrative without a wall of text.
- **Real quotes with real names and faces.** The RaySearch quote with the author's photo is exactly the credibility move the strategy doc calls for.

## Where the Metaphor Fights the Work

1. **The fullscreen viewer crops your designs.** Images open in a "window frame" that uses `object-cover` with a fixed height — tall flows and wide dashboards get cut off, and there's no way to see the whole artifact. For a design portfolio this is the cardinal sin: the one place people go to inspect craft, and the craft is cropped. Switch to contain/fit-to-screen. (Engineers flagged the same line — it's a one-word fix.)
2. **The metallic frame competes with the screenshots.** Rivets, glass glare overlays, radial gradients *on top of the work*. The glare gradient literally paints white haze over your UI screenshots. Your own principles doc says "clean & minimal: let work speak, not decoration." The frame should be quieter than what's inside it; right now it isn't.
3. **The random-destination train.** Clicking the train sends visitors to a *random* case study. Charming for peers; a liability for a hiring manager with 90 seconds who just lost control of their navigation. Keep the animation, but make the train go to a curated "start here" study — or label the randomness.
4. **Metaphor vocabulary buries information scent.** "Sneak Peeks," "Ready to Board?," "About the Conductor," "est: 2025," "ZONE DCS." Each one costs a beat of translation. Some are delightful ("Thanks for Riding"); some hide critical content ("About the Conductor" is your bio and resume — a recruiter scanning for "About" may never click it). Rule of thumb: metaphor for flavor, plain language for wayfinding.

## Craft & Consistency Details (the ones reviewers notice)

- **Hardcoded Before/After captions.** The template prints "Fragmented tools, slow troubleshooting" / "Unified platform, 10-minute resolution" under *any* case study's before/after images. It only happens to be true for Logs today, but it's a landmine — and a reviewer reading the code (some will, it's a public repo) sees content baked into the template.
- **Contrast failures on a portfolio that claims accessibility expertise.** Future-stop labels are `#424141` on `#141515` (~2:1), body copy at `text-white/40`–`/60`, footer at `/50`. Several of these fail WCAG AA. You list accessibility as a differentiator — this is the first thing a skeptical design leader will check.
- **Progress-line station names are invisible on mobile.** Labels are `opacity-0` until hover, `md:` and up shows them — touch devices get unlabeled dots. Mobile is your stated primary recruiter context.
- **Typographic hierarchy slips.** The hero uses two `<h2>`s for a subtitle and a byline; case body copy uses a nonexistent `text-l` class so it renders smaller than intended; the overview mixes 3–4 heading scales in one viewport. Small things, but typography is table stakes at the director level.
- **Two testimonial designs.** The homepage testimonial cards and the case-study-overview quote block are similar-but-different (different author formatting logic, different borders). Unify into one component — it's also less code.
- **Duplicated color intent.** `--color-text-secondary` and `--color-text-tertiary` are the same hex. Either the tokens are decorative or the system is unfinished; both read poorly in a "design systems" portfolio.

## Content & Narrative

- **Case studies are missing the quick-stats block your own strategy specifies** (role, timeline, team size, stakeholders). Right now the overview jumps from title to background prose. "Owned end-to-end design; 10-person design team" is buried mid-paragraph — that's the sentence a hiring manager is hunting for. Pull it into a scannable stat row.
- **Stops lean on long paragraphs.** Several stops are 80–120 words of prose before any visual. "Show, don't tell" — lead each stop with the artifact, caption with the insight.
- **No "what I'd do differently."** Every case ends on impact. Senior candidates are evaluated on reflection; one honest paragraph per study ("what I learned / what I'd change") raises the ceiling of every interview conversation.
- **Portfolio A/B/C configurations don't exist yet.** The strategy doc defines three targeted arrangements; the site ships one fixed order for everyone. Even a simple reorder-by-URL-param (`?focus=mission`) would let you tailor links per application.
- **The About section undersells.** Stanford (BS + MS), sustainability science, current UX lead role — delivered in three casual paragraphs below a Google Map embed. Fine warmth (keep the dogs), but lead with the credential sentence, and make "View Resume" a real button, not an underlined text link floating above a map.

## Prioritized

1. Fix fullscreen cropping + quiet the frames (protects the work itself).
2. Fix contrast + mobile labels (protects the accessibility claim).
3. Add quick-stats rows to case overviews (protects the 90-second scan).
4. De-randomize the train; rename "About the Conductor" nav-critical labels.
5. Add reflection sections; unify testimonial components.
