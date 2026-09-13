# Oriental Sports — Master Design System (Colorful Sports Editorial + Glass Interface)

> **Identity**: A vibrant, modern sports culture brand from MG Road, Camp, Pune.  
> **Mood**: Fun. Sporty. Colorful. Youthful. Confident. Indian. Editorial. Energetic.  
> **Dual Essence**: 
> - **Side A — SHOP**: High-performance gear, sports goods, recreation equipment, apparel.
> - **Side B — BUILD**: Professional sports courts, sub-base engineering, acrylic surfaces, floodlights.  
> **Core Aesthetic**: Colorful Sports Editorial + Glass Interface + Playful Modern Typography.

---

## 1. Palette Architecture (Color by Section)

The official logo remains untouched in its original mark colors, but the website UI is **NOT** black and gold. Instead, each section has a clear, vibrant color identity with disciplined glass layers.

| Token | Hex / Value | Section / Role |
|---|---|---|
| `--color-cream-bg` | `#FFF7E8` | **Hero Canvas & Base** (Warm, energetic, welcoming) |
| `--color-cream-alt` | `#FFFDF7` | Elevated card surfaces on cream |
| `--color-electric-blue` | `#2457FF` | **Shop by Sport & Mega Menu** (Dynamic athletic energy) |
| `--color-electric-blue-dark`| `#173ECB` | Blue container hover and text on light blue |
| `--color-tangerine` | `#FF6B35` | **Build a Court & Marquee Ribbon** (Warm clay / court surface) |
| `--color-tangerine-dark` | `#E04E18` | Tangerine active states |
| `--color-lime` | `#C7F000` | **Visit Store & Micro-accents** (Electric neon pop, badges, indicators) |
| `--color-magenta` | `#F04BFF` | Expressive secondary accent, sport tags |
| `--color-soft-lavender` | `#EDE7FF` | Cool neutral tint, soft cards, contrast pills |
| `--color-dark-navy` | `#0E1326` | **Footer & Glass Dark Layers** (Deep midnight grounding) |
| `--color-text-dark` | `#171717` | Primary high-contrast body typography |
| `--color-text-muted` | `#636059` | Secondary copy, specs, timestamps |
| `--color-pure-white` | `#FFFFFF` | **Featured Products** & Clean ecommerce cards |
| `--color-border-subtle` | `rgba(23, 23, 23, 0.10)` | Crisp structure dividers |

### Visual Section Rhythm:
1. **Hero**: Warm Cream (`#FFF7E8`) + Large Realistic Commercial Photography + Autoplay Carousel (5.5s)
2. **Moving Marquee**: Tangerine (`#FF6B35`) continuous athletic ticker ribbon
3. **Shop by Sport**: Electric Blue (`#2457FF`) interactive sport selector with photo crossfade
4. **Featured Gear**: Crisp White (`#FFFFFF`) with tournament-grade quick-add cards
5. **Build a Court**: Tangerine (`#FF6B35`) architectural court showcase with floating glass spec sheet
6. **Visit Store**: Warm Cream + Lime (`#C7F000`) flagship store card with real interactive Google Maps
7. **Footer**: Deep Navy (`#0E1326`) with crisp white links, lime status dots, and watermark

---

## 2. Glass Interface Tokens (10–30% Surface Budget)

Glassmorphism is used intentionally for layering and depth — never as a gimmick covering plain solid cards. Glass layers must sit over photography, court imagery, or vibrant gradients.

```css
/* Glass Surface Tokens */
--glass-light: rgba(255, 255, 255, 0.72);
--glass-light-hover: rgba(255, 255, 255, 0.86);
--glass-dark: rgba(14, 19, 38, 0.72);
--glass-dark-hover: rgba(14, 19, 38, 0.86);

--glass-blue: rgba(36, 87, 255, 0.68);
--glass-orange: rgba(255, 107, 53, 0.68);
--glass-lime: rgba(199, 240, 0, 0.72);

--glass-border: rgba(255, 255, 255, 0.28);
--glass-border-dark: rgba(255, 255, 255, 0.12);
--glass-border-subtle: rgba(23, 23, 23, 0.08);

--glass-blur-sm: blur(8px);
--glass-blur-md: blur(16px);
--glass-blur-lg: blur(24px);

--glass-shadow: 0 16px 36px -12px rgba(14, 19, 38, 0.18);
--glass-shadow-lg: 0 24px 48px -16px rgba(14, 19, 38, 0.28);
```

### Approved Glass Placements:
- Floating Sticky Navigation Bar (`GlassNav`)
- Mega Menu Dropdown (`MegaMenu`)
- Hero Carousel Controls & Slide Indicator Pills
- Court Spec Overlay on Court Photography
- Quick-Add Overlay on Product Cards
- Cart Drawer Surface (`CartDrawer`)
- Search Modal Overlay (`SearchOverlay`)
- Sticky Buy Bar on Mobile Product Detail Pages

---

## 3. Typography System

| Level | Family | Weight | Scale / Line Height | Tracking | Purpose |
|---|---|---|---|---|---|
| **Display 1** | `Space Grotesk` | 800 | `clamp(3rem, 7vw, 5.5rem)` / `1.0` | `-0.035em` | Hero headlines (`GEAR. COURTS. PUNE.`) |
| **Display 2** | `Space Grotesk` | 700 | `clamp(2rem, 5vw, 3.75rem)` / `1.05` | `-0.025em` | Section headers (`SHOP BY SPORT`, `COME PLAY IRL.`) |
| **Heading 3** | `Space Grotesk` | 700 | `clamp(1.5rem, 3vw, 2.25rem)` / `1.15` | `-0.015em` | Card titles, project titles, modal headers |
| **Body Large** | `Plus Jakarta Sans` | 500 | `1.125rem` / `1.55` | `normal` | Hero subtitles, editorial introductions |
| **Body Regular** | `Plus Jakarta Sans` | 400 | `1rem` / `1.6` | `normal` | Descriptions, specifications, reviews |
| **Body Small** | `Plus Jakarta Sans` | 400 / 500 | `0.875rem` / `1.5` | `normal` | UI labels, address details, policy text |
| **Eyebrow / Badge** | `Space Grotesk` | 700 | `0.75rem` / `1.2` | `+0.08em` | Uppercase category tags, badges, pill buttons |
| **Monospace / Num** | `Space Grotesk` | 800 | Tabular nums | `-0.02em` | Product pricing (`₹18,499`), phone numbers, orders |

---

## 4. Spacing, Radii & Shadows

### Spacing Scale:
- `4px` (`--space-1`), `8px` (`--space-2`), `12px` (`--space-3`), `16px` (`--space-4`), `24px` (`--space-6`), `32px` (`--space-8`), `48px` (`--space-12`), `64px` (`--space-16`), `96px` (`--space-24`).
- Section padding: `clamp(4rem, 8vw, 7rem) 0`.
- Container max width: `1320px` with `clamp(1rem, 4vw, 2.5rem)` lateral gutters.

### Corner Radii:
- Micro (`--radius-sm`): `6px` (badges, small tags).
- Medium (`--radius-md`): `12px` (input fields, buttons, dropdowns).
- Card (`--radius-lg`): `20px` (product cards, court cards, visit cards).
- Container (`--radius-xl`): `28px` (sections, large dialogs, drawers).
- Full Pill (`--radius-full`): `9999px` (pills, filter tags, CTA buttons).

### Shadows:
- Clean Card: `0 4px 16px rgba(14, 19, 38, 0.06), 0 1px 3px rgba(14, 19, 38, 0.04)`
- Elevated Hover: `0 16px 36px rgba(14, 19, 38, 0.12), 0 4px 8px rgba(14, 19, 38, 0.06)`
- Electric Blue Glow: `0 12px 28px rgba(36, 87, 255, 0.28)`
- Tangerine Glow: `0 12px 28px rgba(255, 107, 53, 0.28)`

---

## 5. Buttons & Interactive Controls

1. **Primary Pill (`.btn-primary`)**:
   - Electric Blue background, crisp white text.
   - Pill radius (`9999px`), bold `Space Grotesk`, uppercase tracking.
   - Hover: Expands 2px, slides trailing arrow (`→`) right by 4px, electric glow shadow.
2. **Secondary Court Pill (`.btn-court`)**:
   - Tangerine Orange background, crisp white text.
   - Active hover glow with directional arrow animation.
3. **Electric Lime Badge (`.btn-lime`)**:
   - Electric Lime background, ink black text. Used for high-priority actions ("ADD TO BAG", "GET DIRECTIONS").
4. **Glass Pill (`.btn-glass`)**:
   - Translucent backdrop blur with white border and subtle shadow.
   - Inverted fill on hover.
5. **Magnetic Button Effect**:
   - Subtle spring physics cursor tracking on desktop hero and major CTAs.

---

## 6. Motion, Animation & 21st.dev Patterns

- **Smooth Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy entry, fluid settlement).
- **Hero Autoplay Carousel**: 5.5s autoplay interval with visual progress bar, pauses on hover, touch swipe gestures.
- **Sport Selector**: Hover trigger swaps photo in `300ms ease-out` with subtle scale pulse (`scale(1.02)`).
- **Product Card**: Hover triggers zoom on thumbnail (`scale(1.04)`), crossfades secondary angle, and raises Quick-Add button.
- **Micro-Feedback**:
  - Adding to cart: Button text transforms into `✓ ADDED TO BAG` with green flash for 1.8s.
  - Wishlist heart: Scale bounce animation `1 -> 1.25 -> 1`.
  - Phone OTP digits: Auto-focus progression, paste listener, 30s countdown.

---

## 7. Responsive Rules

- **Mobile First (`375px–430px`)**:
  - Header docks to compact glass bar with search, cart, and hamburger.
  - Bottom navigation bar provides thumb access to Home, Shop, Courts, Account, and Bag.
  - Hero carousel uses `80svh` to avoid browser navigation bar clipping.
  - Sport selector switches to horizontal swipeable cards.
  - Sticky Buy Bar docks to bottom of screen on `/product/:slug`.
- **Tablet (`768px–1024px`)**:
  - 2-column product grids.
  - Staggered court showcase.
- **Desktop (`1200px+`)**:
  - Floating pill navigation with Mega Menu.
  - 4-column product grids.
  - Side-by-side interactive sport selector with large photography frame.

---

## 8. Anti-Patterns (Strictly Prohibited)

- ❌ **NO all-black sections.**
- ❌ **NO gold gradients or luxury-watch gold borders.**
- ❌ **NO bloated 15-section scroll-traps.** (Keep homepage strictly to 5-6 punchy sections).
- ❌ **NO placeholder or AI-generated maps.** Use real interactive Google Maps iframe with verified Camp Pune coordinates.
- ❌ **NO fake reviews, fake badges, or unverified claims.**
- ❌ **NO dead links.** Every route and internal link must resolve cleanly.
