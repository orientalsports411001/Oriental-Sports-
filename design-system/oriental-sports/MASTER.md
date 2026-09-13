# Oriental Sports — Master Design System (Playful Editorial Sports)

> **Identity**: A colorful, modern sports culture brand from Camp, Pune.  
> **Mood**: Fun. Sporty. Colorful. Youthful. Confident. Indian. Editorial. Energetic.  
> **Philosophy**: Independent athletic lifestyle brand — not a luxury watch boutique, not a corporate contractor.

---

## 1. Palette Architecture (Color by Section)

We do **NOT** use black + gold as the website palette. The official logo retains its original colors as a standalone brand mark, but the website UI is high-energy, warm, and distinctly categorized by section.

| Token | Hex / Value | Role | Usage |
|---|---|---|---|
| `--color-cream-bg` | `#FFF7E8` | Primary Warm Canvas | Hero, main body backgrounds, editorial whitespace |
| `--color-cream-alt` | `#FFFDF7` | Crisp Card Surface | Elevated card surfaces on cream sections |
| `--color-electric-blue` | `#2457FF` | Primary Brand Color | Shop by Sport section, primary buttons, badges |
| `--color-electric-blue-dark` | `#173ECB` | Deep Blue Accent | Hover states, blue container headers |
| `--color-tangerine` | `#FF6B35` | High-Energy Secondary | Build a Court section, secondary CTAs, stickers |
| `--color-lime` | `#C7F000` | Electric Accent | Micro-badges, active pills, alert banners, tags |
| `--color-magenta` | `#F04BFF` | Expressive Accent 2 | Playful accents, hover color pops, sport category tags |
| `--color-soft-lavender` | `#EDE7FF` | Secondary Tint Canvas | Subtle card containers, contrast surfaces |
| `--color-dark-navy` | `#0E1326` | Deep Grounding / Footer | Footer container, dark contrast tags, midnight mode |
| `--color-text-dark` | `#171717` | High-Legibility Text | Primary typography across light backgrounds |
| `--color-text-muted` | `#636059` | Secondary Copy | Explanatory paragraphs, metadata, subtitles |
| `--color-pure-white` | `#FFFFFF` | Crisp White Canvas | Featured Products section, cards, inputs |
| `--color-border-subtle`| `rgba(23, 23, 23, 0.10)` | Minimal Dividers | Card outlines, table borders |

### Deliberate Visual Rhythm by Section:
1. **Hero**: Warm Cream (`#FFF7E8`) + Full-Bleed Action Photography
2. **Moving Marquee**: Tangerine (`#FF6B35`) or Lime (`#C7F000`) high-energy scrolling ribbon
3. **Shop by Sport**: Electric Blue (`#2457FF`) energetic interactive grid
4. **Featured Products**: Crisp White (`#FFFFFF`) clean ecommerce cards
5. **Build a Court**: Tangerine / Terracotta (`#FF6B35`) architectural court focus
6. **Visit Store**: Lime (`#C7F000`) & Warm Cream (`#FFF7E8`) with interactive Google Map
7. **Footer**: Deep Navy (`#0E1326`) with crisp white & lime typography

---

## 2. Typography System

No more monotone condensed shouting on every line. We balance quirky contemporary geometric display type with crisp, modern editorial body copy.

| Level | Family | Weight | Scale / Tracking | Purpose |
|---|---|---|---|---|
| **Display Hero** | `Space Grotesk`, sans-serif | 700 / 800 | `clamp(2.75rem, 8vw, 6.5rem)` / `-0.035em` | Signature headlines (`GEAR. COURTS. PUNE.`, `COME PLAY IRL.`) |
| **Section Title** | `Space Grotesk`, sans-serif | 700 | `clamp(2rem, 5vw, 3.75rem)` / `-0.025em` | Punchy section headers (`SHOP BY SPORT`, `FEATURED GEAR`) |
| **Body Primary** | `Plus Jakarta Sans`, sans-serif | 400 / 500 | `1rem` - `1.125rem` / `1.55` | Legible, friendly, modern editorial copy |
| **Metadata & Badges** | `Space Grotesk`, monospace | 600 / 700 | `0.75rem` / `+0.08em` uppercase | Sport categories, step numbers, operating hours |
| **Pricing Numerals** | `Space Grotesk`, sans-serif | 800 | Tabular nums (`₹18,499`) | Immediate ecommerce clarity |

---

## 3. Component & Interaction Rules

1. **Card Design**:
   - Varied radii: `8px`, `16px`, and playful pill badges.
   - Distinct borders: clean `1px solid rgba(23, 23, 23, 0.12)` or colorful sticker borders.
   - Colorful hover cards that elevate with soft colored drop shadows rather than flat black boxes.
2. **Buttons**:
   - Physical, tactile feel with sliding arrow animations: `SHOP THE GEAR →`, `LET'S PLAY →`, `BUILD A COURT →`.
   - Variants: Electric Blue pill, Tangerine pill, Lime badge button, Ghost border with color fill on hover.
3. **Marquee**:
   - Smooth infinite CSS horizontal ticker: `CRICKET ✦ BADMINTON ✦ PICKLEBALL ✦ TENNIS ✦ FITNESS ✦ SQUASH ✦ TABLE TENNIS ✦`.
4. **Interactive Sport Selector**:
   - Desktop hover: selecting a sport crossfades vibrant authentic photography and triggers an electric blue highlight.
   - Mobile: native horizontal scroll reel.
5. **Interactive Map**:
   - Embedded interactive map with clear `GET DIRECTIONS →` button. Zero AI-generated map placeholders.

---

## 4. Anti-Patterns (Strictly Prohibited)

- ❌ **No black backgrounds across entire sections.**
- ❌ **No gold buttons or gold glowing borders.**
- ❌ **No endless 15-section scroll-traps.** (Keep homepage strictly to 5-6 punchy sections).
- ❌ **No AI-generated maps, fake customer reviews, or unverified certification claims.**
