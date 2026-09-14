# ORIENTAL SPORTS — DESIGN CONTRACT (DESIGN.md)

> **The Authoritative Visual Design & Responsive Contract for Oriental Sports Pune**  
> Location: Shop 247, MG Road, New Modikhana, Camp, Pune 411001, Maharashtra  
> Version: 4.0-RAW-EDITORIAL-COMMERCE  
> Configuration: `DESIGN_VARIANCE: 8/10` | `MOTION_INTENSITY: 7/10` | `VISUAL_DENSITY: 4/10` | `ART_DIRECTION: 9/10` | `IMAGE_PRIORITY: 9/10` | `SPACING_GENEROSITY: 8/10` | `CONVERSION_DISCIPLINE: 9/10`

---

## 1. Brand DNA & Visual Philosophy
Oriental Sports is **Pune’s Independent Sports House (Est. 1968, Camp)**.
It combines authentic retail performance equipment with architectural sports infrastructure engineering.

- **Visual Direction**: **Raw Sports Editorial / Contemporary Athletic Commerce**.
- **Visual Tension**: High contrast between warm unbleached Ivory Court substrate (`#F6F3EA`), Ink Black (`#111111`), Plate Gold (`#C9A227`), and Electric Cobalt (`#2457FF`).
- **Core Principles**:
  1. **Less Clutter, More Personality**: Eliminate all artificial telemetry, fake specs, and arbitrary markers.
  2. **Editorial Asymmetry**: Layout variation across chapters with generous Ivory whitespace.
  3. **Visual Restraint Law**: At least 30–40% of the homepage remains visually quiet to provide rhythm.
  4. **Designed Motion**: 2.5D image/type shifts, kinetic transitions, and non-blocking brand ident.
  5. **Commerce Integrity**: Real pricing, stock indicators, wishlist, and tactile quick-add.

---

## 2. Color System
| Token | Hex Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `Canvas Base` | `#F6F3EA` | Ivory Court Substrate | Page background foundation, quiet editorial sections |
| `Canvas Surface` | `#FFFFFF` | Crisp White | Elevated product cards, clean dialogs, inputs |
| `Ink Black` | `#111111` | Jet Black | Primary headlines, structural rules, primary buttons |
| `Plate Gold` | `#C9A227` | Brand Heritage | Official Oriental Sports gold, case-study highlights |
| `Highlight Gold` | `#E0C56A` | Soft Gold Accent | Delicate highlights, active states |
| `Electric Cobalt` | `#2457FF` | Athletic Interaction | Primary digital actions, hover states, active indicators |
| `Safety Orange` | `#FF5A1F` | Alert Accent | Infrastructure tags, selected highlights |
| `Acid Lime` | `#D7FF00` | Energy Spark | Micro badges, indicator states |

---

## 3. Typographic System
- **Display Headlines**: Athletic Grotesque (`Space Grotesk`), bold, tight tracking (`-0.035em`), fluid scale (`clamp(2.5rem, 7vw, 5.5rem)`).
- **Subheadings & Labels**: Condensed Grotesque with sentence case or uppercase.
- **Body Text**: Neutral Grotesque (`Plus Jakarta Sans`), max width 65ch, line-height 1.5.
- **Metadata**: Monospace (`Space Mono`), small (`0.75rem`), positive tracking (`0.08em`), used only for genuine factual details.

---

## 4. Chapter Architecture & Rhythm
```
01 ARRIVAL     → 1200–1600ms non-blocking brand intro with O/S vector mask (session-cached).
02 HERO        → Full-bleed editorial slideshow with independent per-slide compositions & 2.5D motion.
03 SPORT INDEX → Expanding sport rail (active ~45–55% width) on desktop; full-width list on mobile.
04 GEAR        → Curated editorial product composition with Ivory Court negative space and quick add.
05 COURTS      → Architectural studio case study ("WE BUILD COURTS") with responsive spatial media.
06 PUNE        → Authentic MG Road Camp store presentation with real details.
07 FOOTER      → Architectural colophon with clear site structure.
```

---

## 5. Responsive Standards (10 Viewports)
Strictly verified across 10 responsive viewports with zero horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`):
- `320x844` (Compact mobile)
- `360x800` (Android standard)
- `390x844` (iPhone 14)
- `430x932` (Pro Max)
- `768x1024` (Tablet portrait)
- `1024x768` (Tablet landscape)
- `1280x800` (Small laptop)
- `1440x900` (Desktop standard)
- `1920x1080` (Ultrawide)
- `2560x1440` (Ultrawide 4K — content constrained with intentional reading bounds)
