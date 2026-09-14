# VISUAL REFERENCE MAP — ORIENTAL SPORTS PUNE

> **Authoritative Mapping of Design & Interaction References to Oriental Sports Pune Implementation**

---

## 1. Reference Implementation Matrix

| Reference | Extract | Oriental Location |
| :--- | :--- | :--- |
| **Two Times** | Cinematic hero choreography | `HERO` |
| **Frameblox** | Hero / gallery / product mechanics | `HERO + GEAR` |
| **RELOAD** | Bold editorial composition | `HERO + COURTS` |
| **INDEX** | Spatial typography / rhythm | `SITE-WIDE` |
| **Cosmos / Sivaeroee** | Visual curation & image relationships | `SPORT + COURTS` |
| **21st Hover** | Directional interaction & reveals | `SPORT + GEAR` |
| **21st Cursor** | Contextual cursor system | `SITE-WIDE` |
| **21st Mouse** | Parallax & magnetic behavior | `HERO + GEAR` |

---

## 2. Detailed Reference Breakdowns

### Reference A — Two Times Hero / Motion
- **URL**: https://dribbble.com/shots/5889309-Two-Times-Homepage-Animation-Alternative-Version
- **What Was Studied**: Cinematic homepage choreography, image-led hero composition, multi-plane typography movement, transition timing, directional clip-path transitions, visual tension.
- **What Mechanic Was Extracted**: Multi-layer slide transitions where photography, oversized kinetic typography, and floating controls animate on distinct visual planes.
- **Where It Is Used**: `src/components/home/Hero.tsx` (Chapters 01 & 02).
- **What Was Changed For Oriental Sports**: Integrated authentic Oriental Sports photography (badminton smash, cricket willow strike, court floodlights), Plate Gold/Ink Black controls, and commercial quick-access pills.
- **Why It Improves UX**: Creates an immediate, powerful athletic first impression while keeping commerce paths accessible within the first viewport.

---

### Reference B — Frameblox Craft
- **URL**: https://www.frameblox.com/craft
- **What Was Studied**: Animated hero sections, webshop product composition, image zoom/reveal interactions, tactile section transitions.
- **What Mechanic Was Extracted**: Subtle 2.5D cursor-reactive layer offsets, smooth expanding accordion rails, and secondary angle hover image swaps.
- **Where It Is Used**: `src/components/home/Hero.tsx` & `src/components/home/FeaturedProducts.tsx`.
- **What Was Changed For Oriental Sports**: Re-authored in pure React/CSS without generic template bloat, tuned to Indian sports equipment context.
- **Why It Improves UX**: Allows customers to inspect equipment angles and feel tactile responsiveness without layout thrashing.

---

### Reference C — RELOAD Creative Website
- **URL**: https://www.behance.net/gallery/235733483/RELOAD-CREATIVE-AGENCY-WEBSITE
- **What Was Studied**: Bold athletic typography, asymmetric layout grids, hard structural rules, desktop vs mobile composition differences.
- **What Mechanic Was Extracted**: Asymmetric typography-crossing-image boundaries (Slide B), structural dividing rules, and mobile-specific editorial reflow.
- **Where It Is Used**: `src/components/home/Hero.tsx`, `src/components/home/CourtsSection.tsx`.
- **What Was Changed For Oriental Sports**: Replaced generic agency copy with verified sports infrastructure and equipment language.
- **Why It Improves UX**: Gives authority to Oriental Sports' dual identity as an equipment house and court builder without generic card clutter.

---

### Reference D — INDEX Design Studio
- **URL**: https://www.behance.net/gallery/242026973/INDEX-Design-studio
- **What Was Studied**: Restrained typography, spatial rhythm, generous negative space, controlled graphic elements.
- **What Mechanic Was Extracted**: Visual Restraint Law (30–40% quiet Ivory Court space), clean typography without artificial telemetry.
- **Where It Is Used**: Site-wide token foundation (`tokens.css`, `global.css`, `FeaturedProducts.tsx`, `VisitStore.tsx`).
- **What Was Changed For Oriental Sports**: Applied warm Ivory Court (`#F6F3EA`) substrate with Jet Black (`#111111`) ink.
- **Why It Improves UX**: Eliminates cognitive overload and AI-slop, allowing products and photography to command attention.

---

### Reference E — Cosmos / Sivaeroee
- **URL**: https://www.cosmos.so/sivaeroee/design
- **What Was Studied**: Visual curation, image cropping as architecture, whitespace, editorial sequencing.
- **What Mechanic Was Extracted**: Full-bleed un-obscured physical sports photography as the structural foundation of the page.
- **Where It Is Used**: `src/components/home/ShopBySport.tsx`, `src/components/home/CourtsSection.tsx`.
- **What Was Changed For Oriental Sports**: Used authentic equipment and sports court imagery from Pune.
- **Why It Improves UX**: Engages sports enthusiasts emotionally with real playing surfaces rather than generic stock icons.

---

### Reference F — 21st.dev Hover Components
- **URL**: https://21st.dev/community/components/explore/hover-dev
- **What Was Studied**: Directional hover, interactive hover links, image reveal mechanics, expanding panel interactions.
- **What Mechanic Was Extracted**: Expanding kinetic sport rail (`flex: 3.5` on hover, `flex: 1` resting) with synchronized image scale, typography contrast, and `EXPLORE` cursor.
- **Where It Is Used**: `src/components/home/ShopBySport.tsx`, `src/components/products/ProductCard.tsx`.
- **What Was Changed For Oriental Sports**: Tuned transition timings to 350–450ms for snappy responsiveness, with complete tap alternatives on mobile.
- **Why It Improves UX**: Makes category discovery exciting and tactile while maintaining 100% keyboard and mobile accessibility.

---

### Reference G — 21st.dev Cursor & Mouse Effects
- **URL**: https://21st.dev/community/components/explore/cursor-animation-effects
- **What Was Studied**: Contextual cursor tracking, morphing states, smooth interpolation, touch exclusion.
- **What Mechanic Was Extracted**: Custom cursor with states (`DEFAULT`, `VIEW`, `SHOP`, `EXPLORE`, `DRAG`), magnetic button physics, and automatic disable on coarse pointers/inputs.
- **Where It Is Used**: `src/components/ui/CustomCursor.tsx` and interactive buttons.
- **What Was Changed For Oriental Sports**: Disabled over text inputs, selection, and touch; never required for usability.
- **Why It Improves UX**: Adds micro-delight and intent feedback on desktop without compromising accessibility.
