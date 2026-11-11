# Design Central Station Documentation

Welcome! This folder documents the structure, decisions, and design thinking behind my portfolio site.
It’s intended for hiring managers, designers, and engineers who want a deeper look into how it was built.

## Documentation

- **[OVERVIEW.md](./OVERVIEW.md)** — Project goals, portfolio strategy, and audience
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design, key decisions, and performance strategies
- **[CASE_STUDY_SYSTEM.md](./CASE_STUDY_SYSTEM.md)** — How case studies are structured and rendered
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — Visual language, motion, and component patterns
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** — Accessibility approach and WCAG compliance
- **[DESIGN_PHILOSOPHY.md](./DESIGN_PHILOSOPHY.md)** — Key tradeoffs, design thinking, and decision-making

<details>
<summary><strong>Hooks</strong> — safety guardrails for AI-assisted changes (click to expand)</summary>

This repo uses [Claude Code hooks](./docs/HOOKS.md) to block a few specific mistakes before they happen, configured in `.claude/settings.json`:

- **`block-secrets`** — blocks any command or file write containing an API key / token / private-key pattern
- **`block-destructive`** — blocks broad `rm -rf`, and force-pushes / hard-resets / branch deletes while on `main` (which auto-deploys to production)
- **`check-package-manager`** — blocks `yarn`/`pnpm` since this repo is npm-only (`package-lock.json`)
- **`typecheck-gate`** — runs `tsc -b` (the same check the production build uses) before Claude can finish a turn, and blocks the handoff if there are type errors

Full details, including how to add a new one: [docs/HOOKS.md](./docs/HOOKS.md)

</details>

## Recommended Reading Paths

**Hiring Managers:** OVERVIEW → DESIGN_PHILOSOPHY → CASE_STUDY_SYSTEM
**Hiring Managers:** OVERVIEW → DESIGN_PHILOSOPHY
**Designers:** DESIGN_SYSTEM → DESIGN_PHILOSOPHY → ACCESSIBILITY  
**Engineers:** ARCHITECTURE → CASE_STUDY_SYSTEM → DESIGN_SYSTEM

## Live Demo

[View the deployed site](https://ashulman.vercel.app)
