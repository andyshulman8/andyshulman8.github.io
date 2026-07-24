# Recruiter Screen — Technical/Design Recruiter Perspective

Context: I screen 40–60 design portfolios a week, ~60% on my phone, and I give each one 60–90 seconds before deciding "advance / maybe / pass." Here's how this site performs in that window, and what would move it from "maybe" to "advance."

---

## The 5-Second Test (currently failing)

What I see first: **"Final destination: Impact"** over a photo, then "Designing clarity for high-stakes systems," then — third line, smallest text — *Andy Shulman · Senior UX Designer*.

In a scan, the identity line is the payload: **name, title, seniority, specialty**. It should be the biggest thing on the screen, not the garnish under a tagline. Recruiters don't pass portfolios because they're bad — they pass because they couldn't confirm the basics fast enough. Suggested hero order:

1. **Andy Shulman — Senior UX/Product Designer** (largest)
2. Enterprise SaaS · AI/ML · 4+ yrs B2B (the keyword line — this is what I match against the req)
3. "Final destination: Impact" (keep it, as flavor)

## The Missing 20% That Matters 80%

- **No company names on the case study cards.** LogicMonitor, Align Technology, Bose, Exploratorium — recognizable employers are the single strongest scan signal, and none appear until deep inside a study (some never clearly at all). "Logs: Rags to Riches" tells me nothing about where or for whom. Add a company chip to every card and every case title.
- **No role/timeline stat block per case.** I need "Senior UX Designer · 2024–2025 · LogicMonitor · led design, 10-person team" in one glance to map you to a level. Right now that's buried in prose.
- **Resume is a Google Drive link, buried at the bottom, styled as an underline.** Many enterprise networks block Drive; some links get permission-walled. Host a PDF on the site (`/andy-shulman-resume.pdf`), and put a **Resume button in a persistent header** — it's the #1 recruiter CTA and currently requires scrolling 90% of the page to find.
- **Email isn't a mailto link, and LinkedIn opens in the same tab** (navigating people away from your site). Footer contact should be: `mailto:` link · LinkedIn (`target="_blank"`) · Resume. Also verify the LinkedIn slug — it's `/andrea-shulman/` while the site says Andy; fine if intentional, but confirm it resolves, because I *will* click it.
- **No "open to" statement.** The site never says what you're looking for. One line — "Open to senior/staff product design roles · remote (US) · climate, health, AI" — filters in the right recruiters and saves everyone a call.

## Navigation Risks for a 90-Second Visit

- **The clickable train goes to a RANDOM case study.** I won't click anything labeled as a gamble with my 90 seconds — and if I do and land on your 2019 project first, that's the impression I leave with. Point it at your strongest study.
- **"About the Conductor" hides the bio + resume.** I scan for the literal words "About" and "Resume." Metaphor labels on load-bearing navigation cost you clicks. (Same for "est: 2025" on cards — I read that as "established," had to think about it.)
- **Every page has the same browser title.** When I have 12 candidate tabs open, yours all say the same thing, and when I Google "Andy Shulman designer" the case pages don't differentiate. Per-page titles ("Smarter Alerts — Andy Shulman") help both.
- **Mobile check:** thumbnails, cards, and footer work well on a phone — good, since that's where I am. But the case-study progress dots are unlabeled on touch, and the long stop paragraphs are heavy thumb-scrolls.

## What's Already Strong (keep and amplify)

- **Metrics on the cards.** "Cut troubleshooting from hours to 10 minutes," "$250K savings," "100K+ visitors" — this is exactly what I paste into my submittal notes to the hiring manager. Best-in-class habit.
- **Testimonials with names, titles, companies, and LinkedIn links.** Verifiable social proof is rare; consider pulling one quote up near the hero rather than leaving all of it below the fold.
- **Deep links to specific stops** (`/logs/3`) — great for me when I want to send a hiring manager straight to a highlight.
- **Stanford BS/MS + current UX lead role** — strong signal, currently underplayed. Get "Stanford" somewhere scannable (About header or hero keyword line).
- **The train concept is a differentiator, not a liability** — it shows personality and craft. It just can't be allowed to obstruct the basics above.

## My Submittal Checklist — Where You Stand

| Signal | Status |
|---|---|
| Name + title above the fold | ⚠️ present but demoted |
| Recognizable companies visible in scan | ❌ |
| Role/level per project | ❌ not scannable |
| Quantified impact | ✅ excellent |
| Resume: 1 click, PDF | ❌ buried Drive link |
| Contact: 1 click | ⚠️ email not linked |
| Mobile experience | ✅ mostly |
| Social proof | ✅ strong |
| "Open to" clarity | ❌ |

Fix the ❌ rows — none require redesign, all are copy/placement changes — and this moves comfortably into my "advance" pile.
