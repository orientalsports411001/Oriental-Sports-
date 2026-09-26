# Oriental Sports — Design System (DESIGN.md)

> The single source of truth for how oriental-sports.vercel.app looks, moves and reads.
> Tokens live in `src/styles/tokens.css`; components in `src/styles/*.css` and `src/components/`.
> Version 5.0 — September 2026. Supersedes `design-system/oriental-sports/MASTER.md`.

Oriental Sports is a sports goods store at Shop 247, MG Road, Camp, Pune, that also builds courts.
The site has two jobs, always shown side by side: **GEAR** and **COURTS**.

---

## 1. Visual theme & atmosphere

**Sports editorial on a court-coloured canvas.** Warm Ivory Court paper, ink-black type, photography
that carries the energy, and Plate Gold used like the brass on a shop sign — rarely, and where it matters.

- **Photography first.** Real sport, real equipment, real court surfaces. Type sits on or beside it, never
  in a card.
- **Condensed display type is the signature.** Archivo at its narrowest width, black weight, uppercase,
  tight leading — the voice of a scoreboard or a match poster.
- **Court lines as structure.** Hairline rules divide content the way lines divide a court. No boxes,
  no card shadows.
- **Light by day, dark by night.** Pages are ivory; the Courts chapter is black ("night court"), where gold
  is allowed to lead.
- **Quiet on purpose.** At least a third of every page is calm: generous space, one idea per chapter.

## 2. Colour — palette & roles

Official brand colours (from the Branding Map) plus neutrals derived from them. Nothing else.

| Token | Hex | Role |
| :-- | :-- | :-- |
| `--ivory` | `#F6F3EA` | Page canvas (Ivory Court) |
| `--ink` | `#111111` | Text, primary buttons, dark surfaces |
| `--black` | `#000000` | Night-court chapter, deepest bands |
| `--gold` | `#C9A227` | Plate Gold — rules, active states, the one CTA on dark |
| `--gold-hi` | `#E0C56A` | Highlight Gold — hover/active on dark |
| `--paper` | `#FBF9F4` | Lifted surfaces: inputs, dialogs, drawers |
| `--stone` | `#ECE7DB` | Alternate section band, footer |
| `--stage` | `#E9E2D3` | Product photo staging (matches studio backdrops) |
| `--muted` | `#56524A` | Secondary text — 7.0:1 on ivory |
| `--subtle` | `#6B665C` | Meta text — 5.1:1 on ivory |
| `--gold-ink` | `#7A5F0E` | Gold-toned text on light surfaces — 5.4:1 |
| `--line` / `--line-strong` | ink @ 12% / 28% | Hairline rules |

**Rules**
- Gold is **never text on a light background** (2.2:1). Use `--gold-ink` if a gold-toned label is needed.
- Gold on ink/black is fine (7.8:1) — that is where gold CTAs live (`.btn-gold`).
- No blue, purple, neon, pastel or gradient accents. The only gradients are photo scrims for legibility.
- Status: `--success #2E6B3C`, `--error #B3261E`, used only for real status.

## 3. Typography

One family: **Archivo** (variable, `wdth 62–100`, `wght 400–900`, with italics), from Google Fonts.
The width axis gives two voices from one family — condensed display vs normal-width text — so the
system stays coherent. Chosen because condensed grotesques read as sport (jerseys, scoreboards,
posters) and fit big headlines on narrow phones.

| Style | Class / token | Size | Width · weight | Line height | Case |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Hero | `.display.d-hero` | `clamp(3.4rem, 13.5vw, 11.5rem)` | 62% · 800 | 0.84 | UPPER |
| Display 1 | `.display.d-1` | `clamp(2.9rem, 8.6vw, 7.5rem)` | 62% · 800 | 0.86 | UPPER |
| Display 2 | `.display.d-2` | `clamp(2.25rem, 5.4vw, 4.5rem)` | 62% · 800 | 0.9 | UPPER |
| Display 3 | `.display.d-3` | `clamp(1.6rem, 2.9vw, 2.5rem)` | 62% · 800 | 0.95 | UPPER |
| Display 4 | `.display.d-4` | `clamp(1.25rem, 1.8vw, 1.625rem)` | 62% · 800 | 1 | UPPER |
| Lead | `.lead` | `clamp(1.0625rem, 1.25vw, 1.25rem)` | 100% · 400 | 1.5 | Sentence |
| Body | — | `1rem` | 100% · 400 | 1.55 | Sentence |
| Label | `.label` | `0.75rem` | 100% · 600, +0.14em | 1.3 | UPPER |
| Eyebrow | `.eyebrow` | `0.75rem` | 100% · 600, +0.16em | 1.3 | UPPER, plain text |

- Display lines are set **one idea per line** (`RevealLines lines={['Gear for', 'the game.']}`).
- Prices use tabular figures (`.price`).
- Product names and body copy stay sentence case and normal width — condensed is for display only.

## 4. Components

**Buttons** (`.btn` + variant) — rectangular like court markings, 2px corner, 48px tall (44 for `.btn-sm`,
56 for `.btn-lg`), uppercase 13px/700 with +0.1em tracking.
- `.btn-primary` ink · `.btn-outline` ink border · `.btn-light` ivory on photos
- `.btn-gold` — **only on dark**, one per view · `.btn-outline-light` — secondary on dark
- `.link-arrow` — text link with an arrow that moves 4px on hover; for secondary navigation.

**Eyebrow** — small uppercase kicker, plain text, no rule or mark before it. At most one per chapter, and
only when it states a fact the headline and breadcrumb don't (`Pickleball · Baner`, `Brand · Category`).
Inner pages don't repeat their breadcrumb as an eyebrow (no `Shop` above "All gear" under `Home / Shop`).

**Chips** (`.chip`, `aria-pressed`) — filters and sport shortcuts; 44px tall; active = ink fill.

**Product card** (`ProductCard`) — flat: square photo on `--stage`, category label, name, price row with
struck-through was-price and `% off` in `--gold-ink`, always-visible `+ Add` button (no hover-only actions),
44px wishlist icon button. No shadow, border, tilt or rating stars. Two-up on phones (container query
stacks the add button full width).

**Page header** (`PageHeader`) — breadcrumbs, condensed title, lead; eyebrow only for a real fact. Plain (ivory) or with
`image` for a full-bleed photographic band (category pages, Courts).

**Header** — desktop: black utility bar with real store facts (address, live open/closed status, phone,
WhatsApp) + sticky ivory bar (logo, nav, search, bag). Phones: logo, search, bag, `Menu` → full-screen
menu with large condensed links, sport chips and the store's hours, Call and WhatsApp.

**Forms** (`.input`, `.select`, `.textarea`, `.field-label`) — paper fill, 1px `--line-strong`, 48px tall,
ink border + gold focus halo. Every field has a visible label.

**Footer** — stone band. Left: logo, address, live status + Directions, then the same hairline fact table
as the Visit page (hours, phone, WhatsApp, email). Right (≥1024): Shop · Courts · Oriental Sports link
columns. No tagline or second wordmark.

**Status** (`.store-status`) — a dot + sentence; gold dot when the store is open, grey when closed.
Computed in Pune time from `STORE_SCHEDULE` (`src/utils/storeHours.ts`).

## 5. Layout

- **Container:** max 1440px content, gutter `clamp(20px, 4.4vw, 64px)`. Full-bleed photography escapes it.
- **Section rhythm:** `--section-y` = `clamp(72px, 10vw, 144px)`; 8pt spacing scale (`--s-1…--s-10`).
- **Asymmetry with purpose:** sticky intro column (4–5/12) beside content (7–8/12) for Gear and Courts;
  the address "sign" (7/12) beside hours (5/12) for the store.
- **Homepage chapters:**
  1. Hero — three slides with their own compositions (Gear / Courts / Camp store); the tab bar names all three.
  2. Sport index — expanding photo rail (active ≈46%) on desktop; tap list with thumbnails below 1024px.
  3. Gear — "On the wall at Camp": sticky intro + in-store services + studio-shot products.
  4. Courts — night-court chapter: "We build courts.", court types, the build sequence.
  5. Store — the address set as a shop sign, live hours, directions.
- Dividers are hairlines. Sections change background (ivory → stone → black → ivory → stone footer)
  instead of adding borders.

## 6. Depth & elevation

- Level 0 (everything): flat. No card shadows, no glass on content.
- Level 1: hairline rules (`--line`, `--line-strong`).
- Level 2 (overlays only — drawer, dialogs, search panel): `--shadow-overlay`.
- Blur is allowed only on the sticky header and filter bar (function: legibility over scrolling content).

## 7. Motion

Fast start, controlled settle: `cubic-bezier(0.16, 1, 0.3, 1)`. Durations: 160 / 280 / 560 / 900ms.
Primitives in `src/components/motion/Reveal.tsx` (patterns from motion-primitives, built on framer-motion):

| Primitive | Use |
| :-- | :-- |
| `RevealLines` | Display headlines rise line by line out of a mask |
| `Reveal` | Fade + 24px rise when entering the viewport (once) |
| `ImageReveal` | Photo uncovered from the bottom while settling from 1.12× |
| `Stagger` / `StaggerItem` | Lists arriving in sequence (70–80ms apart) |

Also: hero slides cross-fade with a slow 8s settle and ≤14px pointer drift; the Courts image drifts ±7%
with scroll; the sport rail widens over 900ms. Hover states exist only where they signal action
(image scale 1.03–1.06, arrow nudge, underline).

**Never:** looping decoration, floating elements, custom cursors, scroll-jacking, parallax on text.
**Always:** every primitive renders static under `prefers-reduced-motion`; the hero does not autoplay
and has a pause button otherwise.

## 8. Imagery

- Library: `src/data/media.ts` — every image has honest alt text and a focal point (`position`).
- Local photos are WebP at two widths (`name.webp`, `name-sm.webp`); Unsplash images use width params.
  Use the `Img` component (srcset, lazy by default, local fallback).
- Match the image to the claim: a pickleball court for pickleball, a squash court for squash.
- **Never present stock or AI imagery as the store, a project or a customer.** There is no store
  photograph, so the store chapter is typographic.
- Product photos sit on `--stage`; the four studio shots define the look new product photos should match.

## 9. Do's & don'ts

**Do**
- Lead every page with one condensed headline and one clear action.
- Keep GEAR and COURTS visible together wherever the business is introduced.
- Use real facts as labels (sport, place, opening hours, lead time) — nothing else.
- Hand enquiries and orders to WhatsApp/phone with the message written out, and say so.
- Keep 44×44px touch targets and zero horizontal overflow from 320px to 2560px.

**Don't**
- No invented specs, certifications, counts, reviews, testimonials, coordinates or registration numbers.
- No telemetry labels (`01/03`, `//`, `REV 2.6`), decorative squares, sparkles or icon tiles.
- No gradients, glows, neon, glass cards, offset "brutalist" shadows or rounded pill cards.
- No gold text on light backgrounds; no more than one gold CTA per view.
- Words to avoid: premium, next generation, seamless, elevate, transform, unparalleled, revolutionary,
  game-changer, delve, tapestry.

## 10. Responsive behaviour

Tested at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560 on every route.

| Width | Changes |
| :-- | :-- |
| < 360 | Menu label hides (icon + bars remain) |
| < 640 | Product grid 2-up with stacked add button; court types as thumbnail rows |
| < 768 | Footer links wrap into rows under each heading (44px targets, no one-link-per-line lists); hero copy bottom-aligned with a stronger scrim; store slide stacks photo over sign; gear products become a swipe rail; filter chips scroll sideways |
| 640–1023 | Sport list becomes two columns |
| ≥ 768 | Product grid 3-up; footer: logo + address beside the hours/contact table, links in 3 columns |
| ≥ 1024 | Utility bar + centred nav; sport rail expands; sticky intro columns; build steps read along one baseline |
| ≥ 1280 | Product grid 4-up |
| ≥ 1920 | Content holds at 1440px; photography stays full-bleed |

## 11. Voice

Direct, local, confident, slightly formal. Short sentences. Say what the store does and where it is.
"Racquet stringing and bat knocking-in are done at the store." — not "Experience elevated craftsmanship."

## 12. Quick reference for agents

- Canvas `#F6F3EA` · Ink `#111111` · Gold `#C9A227` (dark only) · Archivo condensed 62%/800 uppercase.
- New page → `PageHeader` + `.container` sections + `.section-bar` headings + `.product-grid`.
- New chapter → `RevealLines` (`display d-1`) + one `.btn` + one `.link-arrow`; `.eyebrow` only if it adds a fact.
- Before shipping: `npm run build`, `node scripts/check-media.mjs`, `node scripts/responsive-audit.mjs`
  (overflow at 10 widths + hero collision on every slide at standard and short browser heights).
- Running text is never condensed or bold-display; a paragraph is a paragraph.
