# AGENTS.md — Anti-Slop & Quality Directives for Oriental Sports

> **Strict Engineering & Design Quality Rules for all Agents working on Oriental Sports Pune**

---

## 1. Visual Direction & Identity
- **Aesthetic**: Raw Sports Editorial / Commercial Athletic.
- **Atmosphere**: Authentic sports campaign + independent sports house + architectural infrastructure studio.
- **NOT**: Generic brutalist template, AI landing page, SaaS dashboard, cyberpunk, or Dribbble slop.

---

## 2. Mandatory Anti-Slop Discipline
1. **Zero Decorative Telemetry**: Technical labels must communicate real, meaningful facts only. Maximum 1–2 metadata systems per section. Banned: `01/03`, `//`, `UNIT D-01`, `REV 2.6`, `PUNE, MAHARASHTRA // ESTABLISHED HEADQUARTERS`, `DISCIPLINES // 01—04`.
2. **Zero Fabricated Engineering Claims**: Never invent specifications (e.g. "8-Layer Cushion Acrylic System", "350-lux asymmetrical LED lighting"). Use neutral, verified copy (*"Turnkey court construction, surface systems, fencing, lighting and line marking"*).
3. **No Decorative Squares & Random Badges**: Do not litter headings with yellow squares, floating fake metric boxes, or arbitrary decorative icons.
4. **Restrained Glassmorphism**: Glass is an accent layer only (hero controls, header bar, quick controls, modals, drawers). Never make every card glass, and never stack glass over glass.
5. **No AI Copywriting Clichés**: Prohibited words: *premium, next generation, seamless, elevate, transform, unparalleled, revolutionary, game-changer, delve, tapestry*.

---

## 3. Responsive Mechanics & Zero-Overflow Law
1. **Mobile is NOT a Shrunk Desktop**: Every section must be designed specifically for:
   - `320px` (Compact mobile)
   - `360px` (Android standard)
   - `390px` (iPhone 14)
   - `430px` (Pro Max)
   - `768px` (Tablet portrait)
   - `1024px` (Tablet landscape / Small laptop)
   - `1280px` (Small laptop)
   - `1440px` (Desktop standard)
   - `1920px` (Ultrawide)
   - `2560px` (Ultrawide 4K)
2. **Strict Assertion**: `document.documentElement.scrollWidth === window.innerWidth` must be strictly true at all viewports.
3. **No Overflow Cheats**: Never use `overflow-x: hidden` on root containers to conceal broken layouts. Find and fix the overflowing element.
4. **Touch Targets**: All interactive elements (buttons, links, chips, quick-add actions) must satisfy the minimum 44x44px touch target standard.

---

## 4. Phase 1 Quality Gate Checklist
- [ ] Has Brand Intro played non-blockingly with O/S vector mask and cached in `sessionStorage`?
- [ ] Does Hero have independent per-slide compositions with restrained 2.5D motion and swipe/keyboard nav?
- [ ] Does Sport Index expand smoothly on desktop (~45–55% active width) and reflow to a clean tap list on mobile?
- [ ] Has `node scripts/check-media.mjs` passed with 0 broken images and 0 network failures?
- [ ] Has `npm run build` passed with zero TypeScript errors?
- [ ] Has `node scripts/responsive-audit.mjs` passed across all 10 viewports?
- [ ] Are visual audit screenshots generated and inspected at 390px, 1440px, 1920px, and 2560px?
