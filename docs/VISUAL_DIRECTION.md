# Oriental Sports — Visual Direction: Brutalist Sports Editorial & Liquid Glass

## 1. Creative Vision & Philosophy
Oriental Sports is not another traditional sports retailer. It is the sports house of Pune—where gear meets play, and play meets culture.
The visual direction fuses **Editorial Brutalism** (raw, bold, asymmetrical, high-contrast, oversized typography, architectural gridlines) with **Liquid Glassmorphism** (optically refractive translucent surfaces, subtle 1px luminous borders, deep backdrop blurs) and **Kinetic Sports Motion** (mouse-driven parallax, directional hover reveals, magnetic controls, custom cursor gestures).

It balances:
- **60% Clean Product & Commerce Usability** (Playo clarity, Mobbin e-commerce conventions, fast cart/search)
- **20% Brutalist & Editorial Art Direction** (Cosmos curation, asymmetric layouts, oversized scale, colliding type and imagery)
- **10% Premium Sports Lifestyle** (Tactile materials, authentic athletes, championship court surfaces)
- **10% Experimental Interaction** (21st.dev kinetic mechanics, custom reactive cursor, smooth reveals)

---

## 2. Typographic Rhythm & Contrast
We construct a high-tension typographic system combining architectural display grotesques with functional tabular data.

- **Primary Display**: `Space Grotesk` (weights 700, 800) with tight letter-spacing (`-0.04em` to `-0.02em`) for giant editorial headlines and oversized numeral anchors (`01`, `02`, `03`).
- **Secondary Body & Commerce UI**: `Plus Jakarta Sans` (weights 400, 500, 600, 700) for crystal-clear readability, product descriptions, and tabular pricing (`tabular-nums`).
- **Monospace Metadata Rail**: Monospaced micro-labels (`0.6875rem`, uppercase, tracking `+0.12em`) for specifications, Pune coordinates, and inventory statuses.

```
[01 / 03 · PUNE HEADQUARTERS · EST. CAMP]  <-- Monospace Metadata
GEAR.                                      <-- Space Grotesk 800 (96px+)
COURTS.                                    <-- Colliding over full-bleed photo
PUNE.                                      <-- High-contrast ink on ivory
```

---

## 3. Color Architecture
A sophisticated neutral canvas punctuated by explosive, targeted athletic accents.

| Token | Hex | Role & Application |
|---|---|---|
| `--color-canvas-base` | `#F6F3EA` | Warm Ivory page foundation (tactile, timeless, non-sterile) |
| `--color-canvas-surface`| `#FAF8F5` | Off-white subtle card container base |
| `--color-canvas-pure` | `#FFFFFF` | Crisp white cards, inputs, and dialogs |
| `--color-ink` | `#111111` | Jet ink for headlines, brutalist borders, and key CTA fills |
| `--color-ink-muted` | `#5A5A5A` | Secondary descriptions, specs, and captions |
| `--color-plate-gold` | `#C9A227` | Official brand mark gold; used for subtle badges and heritage accents |
| `--color-electric-blue`| `#2457FF` | High-energy cobalt for hover states, selected sports, and cursor accents |
| `--color-safety-orange`| `#FF5A1F` | Court infrastructure terracotta and active indicator ribbons |
| `--color-acid-lime` | `#D7FF00` | Micro-badge pop and status indicators |

---

## 4. Liquid Glassmorphism Framework
Glass is an optical layer floating *over* rich sports photography, never a generic decoration over empty cards.

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 16px 36px -8px rgba(17, 17, 17, 0.16);
}

.glass-panel-dark {
  background: rgba(17, 17, 17, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.35);
}
```

Approved Placements:
- `GlassNav`: Floating sticky navigation bar with blurred backdrop.
- `GlassControl`: Floating hero carousel controls (`← 01 02 03 →`).
- `GlassCourtSpec`: Floating technical metadata panel overlapping court photography.
- `GlassMegaMenu`: Expanded shop menu previewing sports photography.
- `GlassCartDrawer`: Sliding shopping bag overlay.

---

## 5. Custom Cursor & Interactive Micro-Physics
On desktop, a reactive pointer establishes tactile immersion:
- **Default**: 8px solid ink dot with smooth 18px outer spring ring.
- **Image Hover**: Expands to 64px glass circle with white text: `VIEW →`.
- **Product Card Hover**: Expands to 72px electric cobalt badge: `QUICK ADD`.
- **Project Card Hover**: Expands to 64px safety orange circle: `EXPLORE`.
- **Button Hover**: Magnetic attraction with spring easing.
- **Touch / Reduced Motion**: Automatically disabled via `@media (hover: none)` and `prefers-reduced-motion`.

---

## 6. Asymmetrical Brutalist Layouts
No two sections look identical:
1. **Hero**: Edge-to-edge cinematic viewport with oversized colliding typography, mouse tilt parallax, and floating glass controls.
2. **Shop by Sport**: Asymmetrical editorial grid where hovered sports expand dynamically while adjacent cards adjust with spring physics.
3. **Featured Gear**: Staggered spotlight card + interactive rail with instant image swap, quick-add hover slide, and tabular price shifts.
4. **Build a Court**: Architectural full-bleed photography with pinned glass engineering specifications and real Pune project case studies.
5. **Visit Oriental**: Split composition with address typography colliding directly over high-contrast store workshop imagery.
