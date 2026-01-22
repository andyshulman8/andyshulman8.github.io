# Portfolio Site Context for Claude Code

## Project Overview

Personal portfolio site for Andy, a Senior UX/Product Designer showcasing enterprise SaaS work, mission-driven projects, and strategic design thinking.

**Tech Stack:**

- React + Vite
- Tailwind CSS
- Responsive design (mobile-first)
- Deployed on Vercel

**Purpose:**

- Showcase 6 case studies in different configurations based on target company
- Professional presentation for job search (climate tech, mental health, AI companies)
- Fast, accessible, clean UX (walking the walk)

---

## Portfolio Strategy

### Case Study Library (6 Total)

1. **Logs: Rags to Riches** (LogicMonitor) - Enterprise SaaS transformation
2. **Smarter Alerts** (LogicMonitor) - AI foundation, alert noise reduction
3. **Secure Data** (LogicMonitor) - Security, natural language translator
4. **Empowered Team** (Align Technology) - Design thinking facilitation
5. **Imagining the Future** (Exploratorium) - Exhibition strategy, systems thinking
6. **Health Frameworks** (Bose) - Healthcare product design

### Portfolio Configurations

**Portfolio A: Pure SaaS/Product Design**

- Target: Non-mission startups, FAANG, product-focused roles
- Case studies: Logs, Smarter Alerts, Secure Data (all LogicMonitor)
- Narrative: "I turn complex technical systems into intuitive experiences"

**Portfolio B: Mission-Driven Product + Systems**

- Target: Climate tech, health tech, sustainability companies, mission startups
- Case studies: Logs, Secure Data, Imagining the Future OR Empowered Team
- Narrative: "I design products that support human and planetary flourishing"

**Portfolio C: Strategy + Facilitation**

- Target: Design consultancies (IDEO, Frog), culture transformation roles
- Case studies: Empowered Team, Imagining the Future, Health Frameworks, + one SaaS
- Narrative: "I design systems that enable organizations to solve complex problems"

---

## Key Metrics to Highlight

When working on case studies, always emphasize these proven impacts:

- **Logs:** Hours → 10 minutes (cancer treatment troubleshooting)
- **Alerts:** 30% reduction in alert noise (Schneider Electric)
- **Secure Data:** $250K annual savings (Loyola University)
- **Empowered Team:** 3 piloted solutions from 17-person team
- **Imagining Future:** 100K+ visitors served (SESI Lab Brazil)
- **Health Frameworks:** 40% reduction in expert dependency

---

## Design Principles

### Visual Identity

- **Clean & minimal:** Let work speak, not decoration
- **Professional warmth:** Approachable but credible
- **Mobile-first:** Many recruiters browse on phones
- **Fast load times:** Respect users' time
- **Accessible:** WCAG compliant (I have accessibility expertise)

### Content Strategy

- **Lead with impact:** Numbers first, then story
- **Show, don't tell:** Visuals > walls of text
- **Scannable:** Headers, bullets, short paragraphs
- **Human-centered:** Real customer quotes, real problems
- **Process + outcome:** Not just what, but how and why

### Technical Standards

- **Performance:** <2s load time, optimized images
- **Responsive:** Mobile, tablet, desktop breakpoints
- **Accessibility:** Keyboard navigation, screen readers, contrast ratios
- **SEO-friendly:** Meta tags, semantic HTML, alt text
- **Analytics-ready:** Track which case studies get viewed most

---

## Content Structure (Per Case Study)

Each case study should follow this format:

```
1. Hero/Title
   - Project name
   - Company
   - One-line impact statement

2. Quick Stats
   - Role
   - Timeline
   - Key metrics (3-5 bullets)
   - Team size/stakeholders

3. Challenge
   - Problem context
   - Why it mattered
   - Stakeholders affected

4. Process
   - Research approach
   - Key insights
   - Design iterations
   - Collaboration highlights

5. Solution
   - What I designed (screenshots/prototypes)
   - Why these decisions
   - Technical considerations

6. Impact
   - Measurable results
   - Customer quotes
   - Business outcomes
   - What I learned

7. Next Steps (if applicable)
   - What came after
   - Long-term influence
```

---

## File Organization

```
/src
  /components
    - CaseStudyCard.jsx (reusable card component)
    - MetricBadge.jsx (for impact numbers)
    - ImageGallery.jsx (before/after comparisons)
    - QuoteBlock.jsx (customer testimonials)
    - ProcessDiagram.jsx (visual flow)
  /pages
    - Home.jsx (portfolio landing)
    - About.jsx (my background, values, contact)
    - CaseStudy.jsx (template for individual studies)
  /content
    - logs-case-study.md
    - alerts-case-study.md
    - secure-data-case-study.md
    - empowered-team-case-study.md
    - imagining-future-case-study.md
    - health-frameworks-case-study.md
  /assets
    - /images (optimized, compressed)
    - /videos (demos, walkthroughs)
```

---

## Target Audience Considerations

### Recruiters (First Screeners)

- Need: Quick scan to see if qualified
- Optimize for: Clear role titles, recognizable companies, metrics
- CTA: Easy resume download, LinkedIn link

### Hiring Managers (Decision Makers)

- Need: Process understanding, collaboration skills, impact
- Optimize for: Detailed case studies, problem-solving approach
- CTA: Contact form, calendar link

### Designers (Team Members)

- Need: Craft quality, design thinking, cultural fit
- Optimize for: Visuals, design rationale, tool proficiency
- CTA: Portfolio downloads, Figma links

---

## Competitive Differentiation

What makes this portfolio different:

- **Real enterprise scale:** 1,000+ customers, 25,000+ devices (not just side projects)
- **AI pioneer:** Laid foundation for Edwin AI before it was trendy
- **Mission-driven:** Master's in Sustainability Science, ED research background
- **Proven impact:** Every case study has measurable business results
- **Range:** Enterprise SaaS + health tech + facilitation + systems thinking

---

## Current Focus Areas

When making code suggestions, prioritize:

1. **Performance:** Fast load times, optimized assets
2. **Accessibility:** WCAG compliance, keyboard nav
3. **Mobile-first:** Most recruiter traffic is mobile
4. **SEO:** Meta tags, semantic HTML, Open Graph
5. **Analytics:** Track which case studies resonate

---

## Voice & Tone

### Writing Style

- **Professional but warm:** Not corporate stiff, not too casual
- **Specific over generic:** Real names, numbers, stories
- **Active voice:** "I designed" not "was designed"
- **Results-oriented:** Lead with impact, then explain
- **Humble confidence:** Own wins, acknowledge team

### Example Phrasing

- ✅ "Cut troubleshooting time from hours to 10 minutes"
- ❌ "Improved user experience"
- ✅ "Designed natural language translator for log queries"
- ❌ "Worked on search features"
- ✅ "Served 100K+ visitors in underserved Brazilian communities"
- ❌ "Created museum exhibits"

---

## Common Tasks You Might Help With

- **Component creation:** Reusable React components for case studies
- **Responsive layouts:** Mobile, tablet, desktop breakpoints
- **Image optimization:** Compress without losing quality
- **Accessibility fixes:** ARIA labels, keyboard navigation, contrast
- **SEO improvements:** Meta tags, structured data, alt text
- **Performance tuning:** Code splitting, lazy loading, bundle size
- **Content formatting:** Markdown → React, typography, spacing
- **Animation/interactions:** Subtle, purposeful, not distracting

---

## Long-Term Vision

This portfolio should:

- Adapt easily to different target companies (Portfolio A/B/C configs)
- Scale as I add new projects
- Remain performant as content grows
- Be maintainable without constant redesigns
- Reflect the quality of work I did at LogicMonitor

---

## Quick Reference: My Background

- **Current:** Senior UX Designer, job searching
- **Location:** Montrose, Colorado (remote-friendly)
- **Experience:** 4+ years enterprise B2B SaaS (LogicMonitor)
- **Education:** Stanford (BS Symbolic Systems, MS Sustainability Science)
- **Passions:** Climate tech, mental health, AI for good
- **Expertise:** Enterprise SaaS, AI/ML design, systems thinking, accessibility

---

## Notes for Future Development

- Consider A/B testing different hero sections
- Add filtering by industry/skill on homepage
- Implement dark mode (many designers prefer it)
- Add "Download Portfolio PDF" option for offline viewing
- Track analytics: which case studies get most time/engagement
- Consider adding short video walkthroughs for complex flows
