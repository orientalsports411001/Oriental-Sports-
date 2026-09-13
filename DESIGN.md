# ORIENTAL SPORTS — DESIGN SYSTEM CONTRACT (DESIGN.md)

> **The Authoritative Visual Design & Interaction Contract for Oriental Sports**  
> Location: Shop 247, MG Road, New Modikhana, Camp, Pune 411001, Maharashtra  
> Version: 2.0-BRUTALIST-EDITORIAL-GLASS  
> Dial Configuration: `DESIGN_VARIANCE: 8/10` | `MOTION_INTENSITY: 8/10` | `VISUAL_DENSITY: 5/10`

---

## 1. Brand Philosophy
Oriental Sports is **Pune’s Sports House**. It is not a generic ecommerce storefront or a sterile SaaS template. It is an authentic institution where elite athletic equipment meets court engineering and Pune sporting culture.
The design philosophy is **"Less Clutter. More Personality. More Interaction."** We reject beige minimalism and AI-slop templates in favor of **Raw Athletic Brutalism + Editorial Sports Photography + Liquid Glassmorphism + Cinematic Motion**.

---

## 2. Visual Atmosphere
- **Archetype**: *Swiss Industrial Sports Print + Tactical Telemetry + Liquid Glass Overlay*.
- **Attitude**: Bold, raw, tactile, confident, culturally grounded in Pune, and mechanically engineered.
- **Tension**: High contrast between warm unbleached substrates (`#F6F3EA`), carbon ink (`#111111`), gold heritage accents (`#C9A227`), and explosive athletic sparks (`#2457FF`, `#D7FF00`, `#FF5A1F`).
- **Texture**: Heavy photography carrying the emotional energy, framed by rigid architectural rules and translucent optical glass panels.

---

## 3. Color System

### Substrate & Core Structure
| Token | Hex | Role | Usage |
| :--- | :--- | :--- | :--- |
| `Canvas Base` | `#F6F3EA` | Warm Ivory Substrate | Primary page background, editorial warm paper feel |
| `Canvas Surface` | `#FFFFFF` | Pure White | Elevated cards, clean product photography stages |
| `Ink Carbon` | `#111111` | Jet Ink Black | Structural frames, deep dark editorial sections, primary type |
| `Ink Muted` | `#666666` | Secondary Text | Telemetry sub-labels, metadata, timestamps |
| `Border Ink` | `#222222` | Structural Rule | 1px and 2px architectural dividers |
| `Border Subtle`| `#E5E0D5` | Card Dividers | Hairline separators on warm ivory |

### Brand Heritage Accents
| Token | Hex | Role | Usage |
| :--- | :--- | :--- | :--- |
| `Plate Gold` | `#C9A227` | Brand Signature | Official logo S, heritage badges, court engineering tags |
| `Highlight Gold`| `#E0C56A` | Glow & Highlights | Active indicators on dark mode, glowing accents |

### Controlled Athletic Accents (Semantic Sparks)
*Never deploy all three simultaneously in one block. Use with strict semantic intention.*
- **Electric Cobalt (`#2457FF`)**: Primary digital interaction, active hover states, Pickleball & Squash disciplines, Quick Add CTAs.
- **Acid Lime (`#D7FF00`)**: High-energy tournament badges, technical specification highlights, Badminton discipline tags.
- **Safety Orange (`#FF5A1F`)**: Discount tags, alert telemetry, Volleyball discipline highlights, speed indicators.

---

## 4. Typographic Architecture
*Strict prohibition of generic unstyled body type (Inter/Roboto default slop).*

### Macro-Typography (Structural Editorial Headers)
- **Family**: Neo-Grotesque Display (`Cabinet Grotesk`, `Archivo Black`, `Syne`, or heavy variable display sans).
- **Scale**: Massive fluid scales (`clamp(2.5rem, 6.5vw, 5.5rem)`).
- **Tracking**: Tight, architectural (`-0.03em` to `-0.04em`).
- **Leading**: Ultra-compact (`0.90` to `1.02`).
- **Casing**: Exclusively uppercase for structural impact.
- **Rules**: Typography is permitted to deliberately collide with or overlap photography boundaries.

### Micro-Typography (Telemetry, Coordinates & Specs)
- **Family**: Monospace (`JetBrains Mono`, `IBM Plex Mono`, `Space Mono`).
- **Scale**: Micro-precision (`11px` to `13px` / `0.6875rem` to `0.8125rem`).
- **Tracking**: Wide mechanical tracking (`0.10em` to `0.18em`).
- **Leading**: `1.3` to `1.4`.
- **Casing**: Uppercase with `//` or `•` delimiters (e.g. `PUNE // 18.5204° N, 73.8567° E`).

### Body Copy
- **Family**: High-legibility grotesque (`Plus Jakarta Sans`, `Geist Sans`, or system humanistic sans).
- **Scale**: `0.9375rem` to `1.0625rem`.
- **Line Height**: `1.5` to `1.6`.

---

## 5. Blueprint Grid & Spatial Engineering
- **Asymmetric Tension**: Avoid symmetrical 3-column or 4-column templates. Use calculated asymmetry (e.g. 7-col hero / 5-col metadata; expanding flex accordion; prominent spotlight card + supporting catalog).
- **Visible Grid Logic**: Utilize crisp dividing lines (`1px solid #111111` or `#E5E0D5`) to delineate zones of information.
- **Macro-Whitespace**: Generous breathing room between sections (`clamp(64px, 8vw, 110px)`).

---

## 6. Spacing Scale
- `space-xs`: `4px`
- `space-sm`: `8px`
- `space-md`: `16px`
- `space-lg`: `24px`
- `space-xl`: `32px`
- `space-2xl`: `48px`
- `space-3xl`: `64px`
- `space-4xl`: `96px`

---

## 7. Borders & Rules
- **Structural Rules**: `1px` or `2px solid #111111` (Light canvas) or `1px solid #222222` (Dark canvas).
- **Glass Hairlines**: `1px solid rgba(255, 255, 255, 0.22)`.
- **Accent Hairlines**: `1px solid rgba(36, 87, 255, 0.45)` (Cobalt) / `1px solid rgba(201, 162, 39, 0.45)` (Gold).

---

## 8. Geometry & Radius
- **Brutalist Principle**: Rejection of generic large rounded rectangles on structural blocks.
- **Base Components**: Hard 90° angles or micro-radius (`2px`) to enforce mechanical precision.
- **Interactive Pills**: Used selectively for filter badges and chips (`radius-pill` / `rounded-full`).
- **Glass Overlays**: Concentric radius (`rounded-[16px]` to `rounded-[24px]`) when floating over photography.

---

## 9. Shadows & Optical Depth
- **Banned**: Dark muddy drop shadows (`rgba(0,0,0,0.4)`).
- **Diffuse Ambient**: `0 12px 32px -8px rgba(0, 0, 0, 0.08)`.
- **Deep Glass**: `0 24px 60px -12px rgba(0, 0, 0, 0.5)`.
- **Active Glow**: `0 0 20px rgba(36, 87, 255, 0.25)` or `0 0 20px rgba(201, 162, 39, 0.25)`.

---

## 10. Liquid Glass System (`GlassPanel`, `GlassNav`, `GlassDrawer`)
Glass is an **interactive optical overlay**, not a whole-site background.
- **Surface**: `rgba(255, 255, 255, 0.16)` (Light) or `rgba(17, 17, 17, 0.72)` (Dark).
- **Backdrop Blur**: `blur(16px)` to `blur(24px)`.
- **Hairline Border**: `1px solid rgba(255, 255, 255, 0.24)`.
- **Placement**: Glass MUST sit directly *over* photography or rich brutalist backgrounds, never over blank flat beige.

---

## 11. Brutalist Engineering System
- Oversized numerals (`01`, `02`, `03`, `04`) establishing hierarchy.
- Colliding typography extending past photographic margins.
- Raw technical specifications formatted as tabular audit data.
- GPS coordinates for Pune store and court projects (`18.5204° N, 73.8567° E`).
- Unvarnished verified facts: zero invented claims or fake certifications.

---

## 12. Button Architecture
- **Magnetic Physics**: Desktop buttons exhibit subtle cursor attraction (`MagneticButton`).
- **Button-in-Button Architecture**: Trailing arrow icon (`→` or `↗`) sits inside its own distinct circular or square micro-housing.
- **States**: High-contrast hover inversion (e.g. Ink `#111111` transitions to Electric Cobalt `#2457FF` or Acid Lime `#D7FF00`).
- **Press State**: Subtle spring compression (`active:scale-[0.98]`).

---

## 13. Card Architecture
- Machined Double-Bezel when displaying high-end gear.
- Sharp 2px corners with hairline borders.
- Hover states trigger secondary visual revelations (secondary angle, specs panel, quick-add CTA).

---

## 14. Navigation (`GlassNav`)
- Floats over the hero with optical blur (`blur(18px)`).
- Dynamic transition to light solid mode on scroll.
- **Live Mega Menu**: Hovering category items on the left dynamically swaps high-resolution discipline photography on the right with technical specs.
- Bag and wishlist counters with bounce animations.

---

## 15. Product Cards (`ProductCard`)
- Clean primary image with immediate secondary angle swap on hover.
- Glass discount chip (`GlassPanel`).
- Wishlist heart with elastic spring pop.
- Slide-up tactile Quick Add button.
- Custom desktop cursor hook (`data-cursor="add"`).

---

## 16. Image Galleries & Viewports
- Full-bleed viewport imagery in hero with 3D mouse parallax tilt.
- Multi-angle thumbnail strips on product detail pages.
- Large architectural court installations with interactive project switchers.
- Unbreakable fallback handlers on every image (`onError`).

---

## 17. Hover Interaction System
Every interactive element must provide feedback:
- **Discipline Cards**: Kinetic expand/compress accordion (`flex: 3.2` vs `flex: 1.0`), revealing technical specs and glowing accents.
- **Product Cards**: Image zoom (1.04x) + secondary angle swap + slide-in Quick Add.
- **Court Projects**: Interactive tab switcher updates hero showcase and glass specification sheet.
- **CTAs**: Directional fill and arrow translation.

---

## 18. Custom Cursor Follower (`CustomCursor`)
- Precision dot + spring ring follower.
- Contextual states:
  - Over discipline cards: `VIEW →`
  - Over product cards: `ADD +`
  - Over court projects: `EXPLORE`
- Automatically disabled on touch screens and under `prefers-reduced-motion`.

---

## 19. Motion Choreography (`MOTION_INTENSITY: 8`)
- **Timing Curves**: Custom cubic-beziers (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Durations**:
  - Micro (Buttons, icons): `150ms` – `220ms`
  - Standard (Cards, drawers, modals): `300ms` – `450ms`
  - Editorial (Hero slides, large layout shifts): `600ms` – `850ms`
- **Performance**: Exclusively animate `transform` and `opacity`. Zero layout-thrashing animations.

---

## 20. Scroll Behavior
- Subtle parallax shifts and progressive text reveals.
- Zero scroll-jacking. Native browser inertia must remain intact.
- Sticky technical metadata rails on desktop viewports.

---

## 21. Mobile Adaptation
- Asymmetric desktop layouts collapse cleanly to structured vertical stacks.
- Desktop hover effects translate to instant tap feedback and swipe rails.
- Touch targets strictly $\ge 44 \times 44\text{ px}$.
- Bottom sheets for filter and search actions.

---

## 22. Accessibility (Vercel Web Design Guidelines)
- Contrast ratio $\ge 4.5:1$ for normal text, $\ge 3:1$ for bold/large display text.
- Full keyboard operability (`Tab`, `Enter`, `Space`, `ESC`).
- Visible focus rings with high-contrast offsets.
- Mandatory `prefers-reduced-motion` overrides: disables parallax, magnetic physics, and custom cursor.

---

## 23. Photography Discipline (Nike & Cosmos Standard)
- **High Visual Energy**: Action-shot authentic sporting imagery (pickleball spins, cricket bat grains, badminton smash dynamics).
- **Workshop Authenticity**: Real workshop photography from Shop 247, MG Road (electronic stringing machines, bat knocking benches).
- **Verified Court Builds**: Authentic court projects across Pune (Koregaon Park, Deccan Gymkhana, Baner).
- **Fallback Integrity**: All images MUST have verified fallback image handlers on error.

---

## 24. Do's
1. Maintain high visual tension between brutalist black rules and warm ivory substrates.
2. Use glass strictly as a floating layer over rich photography.
3. Feature real, verified Pune store information (Shop 247, MG Road, Camp).
4. Verify every UI change in the real browser with Playwright CLI.
5. Provide instant feedback on every click, hover, and tap.

---

## 25. Don'ts (Strict Anti-Slop Bans)
1. **NO** generic AI purple-blue gradients or mesh backgrounds.
2. **NO** boring minimalist beige templates with excessive empty space.
3. **NO** symmetrical 3-column or 4-column generic SaaS cards.
4. **NO** rounded corners on structural blocks where brutalist 90° edges belong.
5. **NO** fabricated founding dates, fake certifications, or unverified claims.
6. **NO** broken image icons or missing alt texts.
7. **NO** scroll-jacking or animations that delay user actions.
