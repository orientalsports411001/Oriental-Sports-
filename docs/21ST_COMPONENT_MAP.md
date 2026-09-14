# 21st.dev Component & Mechanics Map — Oriental Sports Pune

This document indexes all 21st.dev component mechanics adapted for Oriental Sports Pune, detailing their exact purpose, implementation, and accessibility fallbacks.

---

## Component Matrix

### 1. Contextual Morphing Cursor
- **Source URL**: https://21st.dev/community/components/explore/cursor-animation-effects
- **Purpose**: Provide subtle contextual visual cues for active interactive targets (images, categories, commercial buttons, court explorer).
- **Oriental Implementation**: `src/components/ui/CustomCursor.tsx`
  - States: `DEFAULT` (small dot), `VIEW` (hero/court photos), `SHOP` (equipment cards/CTAs), `EXPLORE` (sport rail), `DRAG` (hero carousel drag area).
  - Smooth lerp interpolation with 200ms easing.
- **Accessibility Fallback**:
  - Automatically disabled on touchscreens (`pointer: coarse`).
  - Automatically disabled on `prefers-reduced-motion: reduce`.
  - Automatically hidden over text inputs (`input, textarea, [contenteditable]`) to preserve standard browser carets.
  - System is strictly progressive enhancement: website is 100% operational with default browser pointer.

---

### 2. Kinetic Expanding Sport Rail (Hover Accordion)
- **Source URL**: https://21st.dev/community/components/explore/hover-dev
- **Purpose**: Showcase primary sport disciplines (Pickleball, Cricket, Badminton, Volleyball) with dynamic visual focus rather than equal static cards.
- **Oriental Implementation**: `src/components/home/ShopBySport.tsx`
  - Active hovered sport expands to ~45–55% available width (`flex: 3.5`), while inactive sports compress (`flex: 1`).
  - Synchronized CSS scale on photography (`scale(1.05)`), typography weight transition, and reveal of `SHOP [SPORT] →` CTA.
- **Accessibility Fallback**:
  - Full keyboard focusable via standard tab index.
  - On mobile (<1024px), reflows into a full-width tap-to-reveal editorial list (`01 BADMINTON`, `02 CRICKET`, etc.) where tapping unmasks high-res imagery and direct shop buttons.

---

### 3. Directional 2.5D Hero Movement & Parallax
- **Source URL**: https://21st.dev/community/components/explore/mouse-effects
- **Purpose**: Create physical depth and cinematic atmosphere without heavy 3D WebGL computation or exaggerated tilt gimmicks.
- **Oriental Implementation**: `src/components/home/Hero.tsx`
  - Background photography shifts 4–8px relative to mouse coordinates.
  - Kinetic athletic typography shifts independently 2–4px.
  - Direction-aware slide transitions using CSS `clip-path`, `scale`, and `opacity`.
- **Accessibility Fallback**:
  - Parallax is disabled on mobile touchscreens and `prefers-reduced-motion`.
  - Keyboard navigation fully supported via `ArrowLeft` / `ArrowRight`.
  - Full touch swipe support on mobile (>= 45px swipe threshold).

---

### 4. Floating Glass Control Matrix
- **Source URL**: https://21st.dev/community/components/explore/motion-primatives
- **Purpose**: Provide unobtrusive, high-contrast controls over rich full-bleed imagery.
- **Oriental Implementation**: `src/components/home/Hero.tsx` & `src/components/navigation/Header.tsx`
  - Translucent surfaces (`rgba(12, 14, 18, 0.82)`), backdrop blur (`16px`), hairline border (`rgba(255, 255, 255, 0.15)`), and animated linear progress indicator bar.
- **Accessibility Fallback**:
  - High contrast text (`#FFFFFF` on dark glass) exceeding WCAG AA 4.5:1 ratio.
  - Interactive touch targets strictly >= 44x44px.

---

### 5. Product Image Swap & Quick-Add Drawer Trigger
- **Source URL**: https://21st.dev/community/components/explore/hover-dev
- **Purpose**: Enable rapid e-commerce inspection of equipment angles and instant cart addition without leaving the homepage rhythm.
- **Oriental Implementation**: `src/components/products/ProductCard.tsx` & `src/components/home/FeaturedProducts.tsx`
  - Hover triggers smooth secondary angle cross-fade and reveals `QUICK ADD +` and Wishlist heart button.
- **Accessibility Fallback**:
  - On mobile, quick add and wishlist are always visible and touch-accessible (no hover required).
