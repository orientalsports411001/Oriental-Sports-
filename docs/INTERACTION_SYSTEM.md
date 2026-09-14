# INTERACTION SYSTEM — ORIENTAL SPORTS PUNE

This document defines the complete interaction matrix, triggers, responses, component primitives, and mobile/accessibility fallbacks across Oriental Sports Pune.

---

## Interaction Architecture Matrix

| Interaction | Trigger | Response | Component | Mobile / Accessibility Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Parallax** | Window Scroll | Background image shifts Y with spring easing | `DavinchoHero` (`davincho-hero-1.tsx`) | Reduced/static transform on mobile |
| **Hero 2.5D Mouse** | Pointer Move | Image shifts 4–8px, typography shifts 2–4px | `Hero` (`Hero.tsx`) | Disabled on touchscreens (`pointer: coarse`) |
| **Hero Slide Transition** | Arrow Keys / Nav Buttons / Swipe | Directional clip-path wipe, scale & independent type entrance | `Hero` (`Hero.tsx`) | Touch swipe with >= 45px threshold & buttons |
| **Sport Index Expansion** | Pointer Hover | Active sport expands to ~45–55% width, image zooms, CTA reveals | `ShopBySport` (`ShopBySport.tsx`) | Full-width vertical list with tap-to-reveal preview |
| **Contextual Cursor** | Element Hover | Morphing size & state label (`VIEW`, `SHOP`, `EXPLORE`, `DRAG`) | `CustomCursor` (`CustomCursor.tsx`) | Native OS pointer (bypassed on coarse/inputs/reduced-motion) |
| **CTA Magnetic Pull** | Pointer Hover | Button pulls 4–8px towards cursor with spring physics | `MagneticButton` (`magnetic-button.tsx`) | Standard static button on mobile touch |
| **Product Image Swap** | Pointer Hover | Smooth cross-fade to secondary product angle | `ProductCard` (`ProductCard.tsx`) | Touch-to-open detail page with variant selector |
| **Quick Add Drawer** | Button Click | Compact slide-over sheet opens with variant & quantity controls | `CartDrawer` & `FeaturedProducts` | Bottom sheet drawer on mobile |
| **Court Explorer** | Service Selection | Sticky media shifts perspective/crop toward selected discipline | `CourtsSection` (`CourtsSection.tsx`) | Vertical stacked layout with unmasked imagery |
| **Command Search** | Click / `⌘K` | Dimmed overlay with live fuzzy search & keyboard navigation | `SearchModal` (`SearchModal.tsx`) | Fullscreen touch search input with direct filters |
| **Cart Slide-Over** | Click / Quick Add | Smooth right-side drawer with live price calculation | `CartDrawer` (`CartDrawer.tsx`) | Responsive bottom sheet drawer |
| **Brand Intro Ident** | Page Arrival | 1.35s session-cached O/S vector mask reveal | `BrandIntro` (`BrandIntro.tsx`) | Skipped immediately on `prefers-reduced-motion` |

---

## Design Dial Calibration
- **DESIGN_VARIANCE**: `8/10` (Asymmetric layout rhythm, distinct per-chapter composition)
- **MOTION_INTENSITY**: `7/10` (Designed kinetic choreography, 2.5D depth, no UI fireworks)
- **VISUAL_DENSITY**: `4/10` (Generous Ivory Court whitespace, 30–40% quiet breathing space)
- **ART_DIRECTION**: `9/10` (Editorial magazine + architectural studio)
- **IMAGE_PRIORITY**: `9/10` (Dominant, un-obscured physical sports photography)
- **CONVERSION_DISCIPLINE**: `9/10` (Real e-commerce cart, wishlist, pricing, and Camp store data)
