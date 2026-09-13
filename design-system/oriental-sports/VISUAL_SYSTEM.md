# Oriental Sports — Visual System Specification

> **Aesthetic Foundation**: Brutalist Sports Editorial + Liquid Glassmorphism + Kinetic Sports Motion  
> **Brand**: Oriental Sports, Shop 247, MG Road, Camp, Pune 411001  
> **Ratio**: 60% Usable Commerce, 20% Brutalist Art Direction, 10% Sports Lifestyle, 10% Experimental Interaction

---

## 1. Brutalist Architectural Principles
- **Raw Typography Collisions**: Massive Space Grotesk type colliding over full-bleed photography (`clamp(3.5rem, 8.5vw, 6.5rem)`).
- **Asymmetrical Structures**: Alternating image ratios (`16:9`, `4:3`, `1:1`, `9:16`), non-uniform column widths, and deliberate spatial tension.
- **Architectural Rules**: Hairline 1px borders in ink (`rgba(17, 17, 17, 0.12)`) and crisp white (`rgba(255, 255, 255, 0.22)`) defining spatial boundaries.
- **Oversized Indexing**: Numerals (`01`, `02`, `03`, `04`) rendered in bold display weights acting as compositional anchors.
- **Hard Contrast**: High-impact transitions between Warm Ivory base panels (`#F6F3EA`) and deep obsidian image zones (`#111111`).

---

## 2. Liquid Glassmorphism Framework
Glass surfaces create optical depth without obscuring sports action:
- **Lensing & Blur**: `backdrop-filter: blur(16px)` to `blur(24px)`.
- **Translucent Matrix**: Light glass (`rgba(255, 255, 255, 0.18)` to `rgba(255, 255, 255, 0.85)`); Dark glass (`rgba(17, 17, 17, 0.72)`).
- **Luminous Edge**: 1px perimeter highlight (`rgba(255, 255, 255, 0.32)` top/left, `rgba(255, 255, 255, 0.12)` bottom/right).
- **Refraction Shadow**: `0 20px 48px -12px rgba(17, 17, 17, 0.18)`.

---

## 3. Typographic Tokens & Scales
| Level | Font Family | Weight | Size | Line Height | Tracking | Transform |
|---|---|---|---|---|---|---|
| **Hero Display** | Space Grotesk | 800 | `clamp(3.5rem, 9vw, 7rem)` | 0.95 | `-0.04em` | Uppercase |
| **Section Title**| Space Grotesk | 700 | `clamp(2.25rem, 5vw, 4rem)` | 1.02 | `-0.03em` | Uppercase |
| **Numeral Anchor**| Space Grotesk | 800 | `clamp(2.5rem, 6vw, 5rem)` | 0.9 | `-0.02em` | Tabular |
| **Card Title** | Space Grotesk | 700 | `1.125rem – 1.5rem` | 1.2 | `-0.02em` | Normal |
| **Meta Rail** | Space Grotesk | 700 | `0.6875rem` / `11px` | 1.2 | `+0.12em` | Uppercase |
| **Body Regular** | Plus Jakarta Sans | 400 | `1.0rem` / `16px` | 1.55 | `normal` | Normal |
| **Price Bold** | Space Grotesk | 700 | `1.125rem` / `18px` | 1.0 | `-0.01em` | Tabular |

---

## 4. Color Hierarchy & Application
- **Base Canvas**: Warm Ivory (`#F6F3EA`)
- **Structure**: Jet Ink (`#111111`) & Pure White (`#FFFFFF`)
- **Heritage Accent**: Oriental Plate Gold (`#C9A227`)
- **Explosive Accent A**: Electric Cobalt (`#2457FF`) — interactive hover, sports preview selection, custom cursor fill.
- **Explosive Accent B**: Safety Orange (`#FF5A1F`) — court engineering tags and dynamic progress rings.
- **Explosive Accent C**: Acid Lime (`#D7FF00`) — high-visibility status indicators and micro-pills.

---

## 5. Motion, Cursor & Physics Tokens
- **Cursor Follower**: Desktop pointer tracks with spring physics (`damping: 28`, `stiffness: 300`).
- **Card Expansion**: `flex: 2.2` expand on hover with `cubic-bezier(0.16, 1, 0.3, 1) 400ms`.
- **Image Tilt**: Interactive 3D mouse parallax (`perspective(1000px) rotateX(...) rotateY(...)`).
- **Magnetic Buttons**: CTAs attract toward cursor within 40px proximity.
- **Reduced Motion**: Disables all 3D tilt, parallax, and custom cursor gestures; preserves instant state changes.

---

## 6. Image Quality & Reliability Standard
- Every image URL must be pre-verified and validated.
- Robust `onError` fallback handlers to ensure zero broken image icons or missing visual assets.
- Responsive `object-fit: cover` with customized `object-position` tailored per athlete/equipment asset.
