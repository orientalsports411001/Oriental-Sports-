> **Superseded (September 2026):** the current design system is documented in [/DESIGN.md](../../DESIGN.md).
> This file is kept for history only — its fonts (Space Grotesk / Plus Jakarta Sans) and tokens are no longer used.

# Oriental Sports — Master Design System (Clean Sports Lifestyle & Editorial Commerce)

> **Brand Identity**: Oriental Sports, Shop 247, MG Road, New Modikhana, Camp, Pune 411001.  
> **Positioning**: Pune’s sports house. Gear for the game. Courts for the city.  
> **Campaign Line**: `GEAR. COURTS. PUNE.`  
> **Supporting Line**: "Everything you need to play, train and build."  
> **Aesthetic Philosophy**: Clean Sports Lifestyle + Editorial Commerce + Premium Retail + Modern Product UX.  
> **Reference Benchmarks**: Playo (clarity, restraint, photography-led), Mobbin (real e-commerce UX), Cosmos (editorial curation), Luma (simplicity & visual confidence), 21st.dev (purposeful component mechanics).  
> **Ratio**: 85% Neutral Interface, 10% Authentic Sports Photography, 5% Restrained Accent.

---

## 1. Official Locked Brand Identity

The official Oriental Sports mark is **LOCKED**:
- Black concentric O / interlocking monogram
- Brushed gold italic `S`
- Black `ORIENTAL` logotype
- Brushed gold italic `SPORTS` logotype
- Thin gold underline
- Heritage line: `PUNE • EST. CAMP`
- **Rule**: Never recolor, distort, or introduce unauthorized secondary colors (cyan/neon/pink/purple) into the official mark.

---

## 2. Color System & Ratio Architecture

The website UI is **NOT a black-and-gold website**, and is **NOT a neon/rainbow website**.  
It is built upon a warm, light, neutral canvas where photography provides energy and visual vibrancy.

### Palette Tokens:

| Token Name | Value | Role / Usage | Ratio |
|---|---|---|---|
| `--color-canvas-base` | `#F6F3EA` | Warm Ivory page background (welcoming, tactile, athletic court heritage) | 45% |
| `--color-canvas-surface` | `#FAF8F5` | Off-white subtle card and section containers | 25% |
| `--color-canvas-pure` | `#FFFFFF` | Crisp white product cards, modals, and input fields | 15% |
| `--color-ink` | `#111111` | Primary typography, authoritative headings, high-contrast CTAs | Text & Key CTAs |
| `--color-ink-muted` | `#616161` | Secondary body text, specifications, metadata, breadcrumbs | Supporting |
| `--color-ink-subtle` | `#8C8C8C` | Captions, timestamps, disabled states, borders | Accents |
| `--color-border-subtle` | `rgba(17, 17, 17, 0.08)` | Refined 1px card and section borders | Structural |
| `--color-border-medium` | `rgba(17, 17, 17, 0.16)` | Active input borders, hovered elements | Focus/Hover |
| `--color-plate-gold` | `#C9A227` | Official brand gold — used with strict restraint for subtle badges, key highlights | 3% |
| `--color-highlight-gold` | `#E0C56A` | Light gold highlight for badges, active states | 2% |
| `--color-court-clay` | `#C85A32` | Warm terracotta court clay — used sparingly for court construction tags | <1% |
| `--color-success` | `#1B7A43` | Inventory in-stock indicator, successful cart add | Feedback |
| `--color-error` | `#C53030` | Form validation errors, out-of-stock badge | Feedback |

### Color Rules:
- ❌ **NO rainbow UI**: Avoid lime, hot pink, neon blue, and orange scattered across sections.
- ❌ **NO all-black sections**: The interface breathes with generous whitespace and warm light surfaces.
- ❌ **NO luxury-watch gold borders**: Gold is a restrained heritage accent, not an ornament on every border.
- 📷 **Photography is the hero**: Action shots, court textures, and equipment materials provide 90% of the visual color.

---

## 3. Typography Hierarchy

A dual-font typographic system providing expressive athletic editorial presence with high e-commerce readability.

- **Display & Headings**: `Space Grotesk`, sans-serif (clean, geometric, architectural, athletic authority)
- **Body & Commerce UI**: `Plus Jakarta Sans`, sans-serif (humanist, highly legible at small sizes, excellent tabular numerals)

| Style | Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking | Application |
|---|---|---|---|---|---|---|
| **Display 1** | Space Grotesk | 700 | `clamp(2.75rem, 6vw, 4.75rem)` | 1.02 | `-0.03em` | Hero headlines (`GEAR. COURTS. PUNE.`) |
| **Display 2** | Space Grotesk | 700 | `clamp(2rem, 4.5vw, 3.25rem)` | 1.08 | `-0.025em` | Section titles (`SHOP BY SPORT`, `WE BUILD COURTS.`) |
| **Heading 3** | Space Grotesk | 600 | `clamp(1.35rem, 2.5vw, 1.85rem)` | 1.2 | `-0.015em` | Card headlines, project titles, modal headers |
| **Heading 4** | Space Grotesk | 600 | `1.125rem` / `18px` | 1.3 | `-0.01em` | Product card titles, drawer subheadings |
| **Eyebrow** | Space Grotesk | 700 | `0.75rem` / `12px` | 1.2 | `+0.08em` | Uppercase category identifiers, kicker labels |
| **Body Large** | Plus Jakarta Sans | 400/500 | `1.125rem` / `18px` | 1.55 | `normal` | Hero subtitles, editorial narratives |
| **Body Regular** | Plus Jakarta Sans | 400 | `1.0rem` / `16px` | 1.5 | `normal` | Product descriptions, court specs, reviews |
| **Body Small** | Plus Jakarta Sans | 400/500 | `0.875rem` / `14px` | 1.45 | `normal` | Meta specs, filter labels, form helpers |
| **Micro / UI** | Plus Jakarta Sans | 600 | `0.75rem` / `12px` | 1.3 | `+0.02em` | Breadcrumbs, inventory pills, tags |
| **Numeric / Price** | Space Grotesk | 700 | `1.125rem` / `18px` | 1.0 | `-0.01em` | Tabular numbers for prices (`₹18,499`) |

---

## 4. Spacing, Grid & Layout Metrics

Strict 8pt spatial grid for rhythmic consistency across all screen sizes.

- **Base Unit**: `8px`
- **Scale**: `4px` (xxs), `8px` (xs), `12px` (sm), `16px` (md), `24px` (lg), `32px` (xl), `48px` (2xl), `64px` (3xl), `96px` (4xl)
- **Container Max Width**: `1320px` with fluid gutters:
  - Mobile (`<640px`): `16px`
  - Tablet (`640px–1024px`): `24px`
  - Desktop (`>1024px`): `32px`
- **Homepage Structure**: Strictly 5–6 concise sections:
  1. Hero
  2. Shop by Sport
  3. Featured Gear
  4. Build a Court
  5. Visit Oriental
  6. Footer

---

## 5. Border Radius & Shadows

Restrained, modern curvature that feels tactile without becoming cartoonish.

- **Radius Micro**: `4px` (tags, badge pills)
- **Radius Input / Button**: `8px` (compact, confident buttons and input fields)
- **Radius Card**: `12px` (product cards, project cards)
- **Radius Container / Modal**: `16px` (drawers, dialogs, large containers)
- **Radius Pill**: `9999px` (status badges, count pills)

### Shadows:
- **Card Rest**: `0 1px 3px rgba(17, 17, 17, 0.04), 0 4px 12px rgba(17, 17, 17, 0.03)`
- **Card Hover**: `0 8px 24px rgba(17, 17, 17, 0.08), 0 2px 6px rgba(17, 17, 17, 0.04)`
- **Drawer / Modal**: `0 16px 48px -8px rgba(17, 17, 17, 0.18)`
- **No colorful glow shadows** (no neon blue or neon orange glows).

---

## 6. Component Guidelines

### Buttons (`.btn`):
1. **Primary Button (`.btn-primary`)**:
   - Background: `--color-ink` (`#111111`)
   - Text: `#FFFFFF`
   - Height: `44px` (desktop), `48px` (mobile touch target)
   - Radius: `8px` or `9999px`
   - Hover: Background `#262626`, subtle scale `1.01`
2. **Secondary / Outline Button (`.btn-outline`)**:
   - Background: `transparent`
   - Border: `1.5px solid #111111`
   - Text: `#111111`
   - Hover: Background `#111111`, Text `#FFFFFF`
3. **Ghost Button (`.btn-ghost`)**:
   - Background: `transparent`
   - Text: `#111111`
   - Hover: Background `rgba(17, 17, 17, 0.05)`
4. **Accent Gold CTA (`.btn-gold`)**:
   - Background: `--color-plate-gold` (`#C9A227`)
   - Text: `#FFFFFF` (or `#111111` with bold weight)
   - Used sparingly for special action buttons.

### Product Card (`ProductCard`):
- Clean, commerce-first card:
  - 1:1 crisp product imagery on neutral `#F7F5F0` backdrop
  - Subtle wishlist toggle (top-right, restrained heart outline)
  - Category identifier in uppercase micro typography
  - Product title in confident Space Grotesk
  - Short 1-line description
  - Price in tabular bold figures (with sale price if discounted)
  - Quick Add button sliding up on hover (or persistently tap-friendly on touch devices)
  - Stock badge (e.g. "Low Stock" or "Ready in Camp Store")
- **No glass background, no heavy borders, no rainbow badges.**

### Glassmorphism Budget (<10%):
- Permitted ONLY for functional overlays:
  - Sticky header blur when scrolled (`rgba(246, 243, 234, 0.92)` + `backdrop-filter: blur(12px)`)
  - Cart drawer backdrop
  - Search overlay backdrop
  - Mobile menu bottom sheet
- Strictly forbidden for cards, content sections, and body text containers.

---

## 7. Photography & Visual Curation

- **Authentic Sports Imagery**: Real athletes in motion, real Deccan clay and tournament acrylic courts, real cricket willows and carbon pickleball paddles.
- **Editorial Tone**: Inspired by Cosmos curation — high natural contrast, clean framing, dynamic physical motion, authentic sports equipment.
- **Zero AI Artifacts**: Prohibit distorted hands, fake equipment logos, impossible court lines, or stock smiles.
- **Verified Facilities**: Court project images must reflect actual sports court engineering (sub-base, acrylic coatings, tournament nets, floodlights).

---

## 8. Accessibility & Performance (WCAG 2.1 AA)

- **Contrast Ratios**:
  - Ink text (`#111111`) on Ivory canvas (`#F6F3EA`): **16.8:1** (Exceeds AAA).
  - Ink text (`#111111`) on Pure White (`#FFFFFF`): **19.5:1** (Exceeds AAA).
  - Gold button (`#C9A227`) on Ink text (`#111111`): **5.4:1** (Passes AA).
- **Keyboard Navigation**: Clear, visible focus ring (`2px solid #C9A227`, `outline-offset: 2px`).
- **Screen Reader Support**: Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), descriptive ARIA labels for icon-only buttons (`aria-label="Add to Wishlist"`, `aria-label="Open Cart"`).
- **Motion Accessibility**: Full support for `@media (prefers-reduced-motion: reduce)`. Carousel autoplay stops, parallax disabled, transitions simplified to instant opacity cuts.

---

## 9. Responsive Breakpoints

- Mobile Small: `375px` (iPhone SE)
- Mobile Regular: `390px` (iPhone 14/15)
- Mobile Large: `430px` (iPhone Pro Max)
- Tablet: `768px` (iPad Mini / Portrait)
- Laptop: `1024px` (iPad Pro / Small Laptop)
- Desktop: `1280px` / `1440px` (MacBook / Standard Desktop)
- Widescreen: `1920px` (Full HD Monitor)
