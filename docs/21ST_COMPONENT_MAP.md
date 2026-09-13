# Oriental Sports — 21st.dev Component Interaction Map

This document catalogues the selected **21st.dev interaction patterns** integrated into the Oriental Sports web platform. Each pattern addresses a distinct UX necessity and has been adapted into our **Brutalist Sports Editorial & Liquid Glass** visual system.

---

### Pattern 1: Direction-Aware / Tilt Hero Parallax
- **21st.dev Source**: [Hero Parallax / Motion Primitives](https://21st.dev/community/components/explore/motion-primatives)
- **Component**: `src/components/home/Hero.tsx` (`HeroParallaxLayer`)
- **UX Intent**: Immersion and depth. Rather than a static image box, the hero image subtly responds to desktop mouse movement with controlled 3D tilt and layer depth, drawing the user into the sport.
- **Dependencies**: React, CSS 3D transforms (`perspective`, `rotateX`, `rotateY`), Framer Motion.
- **Accessibility**: Pauses completely on mouse leave/blur; disabled under `@media (prefers-reduced-motion: reduce)`.
- **Mobile Behavior**: Replaced with smooth horizontal touch-swipe gesture with momentum indicators.
- **Implementation**: Adapted custom React implementation with hardware-accelerated CSS transforms.

---

### Pattern 2: Interactive Kinetic Hover Grid (Expand / Compress)
- **21st.dev Source**: [Hover Image Gallery / Kinetic Cards](https://21st.dev/community/components/explore/hover-dev)
- **Component**: `src/components/home/ShopBySport.tsx` (`KineticSportGrid`)
- **UX Intent**: Sports discovery playground. Hovering a primary sport (Pickleball, Cricket, Badminton, Volleyball) expands its visual frame (`flex: 2.2`), reveals secondary technical specs and direct category CTAs, while compressing siblings (`flex: 0.9`) with fluid easing.
- **Dependencies**: React, CSS Flexbox transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Accessibility**: Fully operable via keyboard Tab/focus; active sport indicated via `aria-expanded` and visible focus outlines.
- **Mobile Behavior**: Transformed into a touch-friendly horizontal swipe carousel with active indicator dots.
- **Implementation**: Adapted and optimized for high frame-rate performance.

---

### Pattern 3: Custom Reactive Cursor Follower
- **21st.dev Source**: [Cursor Animation Effects / Magnetic Pointer](https://21st.dev/community/components/explore/cursor-animation-effects)
- **Component**: `src/components/ui/CustomCursor.tsx`
- **UX Intent**: Contextual spatial awareness. Communicates primary affordances before clicking: "VIEW →" over hero/photos, "QUICK ADD" over products, "EXPLORE" over court projects.
- **Dependencies**: React pointer events, Framer Motion spring physics (`damping: 28`, `stiffness: 300`).
- **Accessibility**: Automatically hidden on touchscreens (`@media (hover: none)`); disabled when reduced motion is preferred; native cursor retained as fallback.
- **Mobile Behavior**: Completely disabled; native touch UI is untouched.
- **Implementation**: Rebuilt natively in React with zero heavy third-party cursor bloatware.

---

### Pattern 4: Floating Liquid Glass Navigation with Live Visual Mega Menu
- **21st.dev Source**: [Navbar Animations / Floating Header](https://21st.dev/community/components/explore/navbar-animations)
- **Component**: `src/components/navigation/Header.tsx`
- **UX Intent**: Seamless navigation across page depth. Sits as a translucent glass pill over the hero; morphs smoothly into a docked light bar on scroll. Hovering "SHOP" opens a fashion/sports editorial mega menu with a real-time changing photo frame as different sports are hovered.
- **Dependencies**: React, CSS `backdrop-filter: blur(20px)`, React Router.
- **Accessibility**: ARIA dialog/navigation semantics; ESC key closes mega menu; keyboard arrow and tab traversal.
- **Mobile Behavior**: Hamburger triggers full-height slide-out drawer with accordion submenus.
- **Implementation**: Adapted with custom Oriental Sports branding and photo preview crossfade.

---

### Pattern 5: Tactile Product Card with Secondary Image Swap & Slide Quick Add
- **21st.dev Source**: [Hover Dev Cards / E-Commerce Card](https://21st.dev/community/components/explore/hover-dev)
- **Component**: `src/components/products/ProductCard.tsx`
- **UX Intent**: Rapid e-commerce browsing. Swaps seamlessly to secondary product angle, triggers smooth slide-up Quick Add button without obscuring pricing, and animates the wishlist heart with elastic spring feedback.
- **Dependencies**: React, CSS transitions, `lucide-react`.
- **Accessibility**: Quick Add is persistently accessible on mobile and keyboard focusable without requiring hover.
- **Mobile Behavior**: Permanent touch-accessible "+ ADD" action button.
- **Implementation**: Rebuilt natively for high rendering efficiency.

---

### Pattern 6: Sticky Architectural Project Showcase with Glass Specs
- **21st.dev Source**: [Project Showcase / Glass Panel](https://21st.dev/community/components/explore/project-showcase)
- **Component**: `src/components/home/CourtsSection.tsx`
- **UX Intent**: Highlighting verified Pune court construction capabilities. Architectural full-bleed photography with a floating liquid glass specification sheet displaying verified surface layers, lighting, and scope.
- **Dependencies**: React, CSS Grid, Glassmorphism tokens.
- **Accessibility**: High contrast text on dark glass overlay (14.2:1 contrast ratio); screen-reader accessible.
- **Mobile Behavior**: Stacks gracefully into image header followed by glass specification card.
- **Implementation**: Built from scratch using master glass tokens.

---

### Pattern 7: Magnetic Action Buttons
- **21st.dev Source**: [Magnetic Buttons / Micro-Interactions](https://21st.dev/community/components/explore/mouse-effects)
- **Component**: `src/components/ui/MagneticButton.tsx`
- **UX Intent**: Tactile cursor pull on major CTAs ("SHOP SPORTS", "BUILD A COURT", "GET DIRECTIONS"), providing satisfying feedback.
- **Dependencies**: React mouse move listener with bounding rect calculations and spring interpolation.
- **Accessibility**: Does not reposition clickable hit area off-screen; disabled on touch and reduced motion.
- **Mobile Behavior**: Standard touch button with instant active scale feedback.
- **Implementation**: Custom lightweight React hook.

---

### Pattern 8: Command-Style Live Search Overlay
- **21st.dev Source**: [Search Bars / Command Menu](https://21st.dev/community/components/explore/search-bars)
- **Component**: `src/components/navigation/SearchModal.tsx`
- **UX Intent**: Keyboard-first instant discovery (`⌘K` / `Ctrl+K`). Fullscreen glass backdrop with instant debounced results across gear, sports disciplines, and court services.
- **Dependencies**: React, `lucide-react`, keyboard shortcuts.
- **Accessibility**: Auto-focus on open, ARIA modal attributes, arrow key navigation, ESC dismiss.
- **Mobile Behavior**: Full-screen responsive search interface.
- **Implementation**: Custom lightweight modal with instant filtering.

---

### Pattern 9: Slide-Out Liquid Glass Cart Drawer with Free Delivery Threshold
- **21st.dev Source**: [Drawer Animations / Glass Slide-Over](https://21st.dev/community/components/explore/drawer-components)
- **Component**: `src/components/navigation/CartDrawer.tsx`
- **UX Intent**: Unobtrusive commerce flow. Slides in from the right edge with dark liquid glass backdrop blur (`blur(16px)`), live milestone progress bar indicating distance to free Pune Camp dispatch (₹2,000 threshold), and tactile quantity steppers.
- **Dependencies**: React, CSS `translateX` transforms, `lucide-react`.
- **Accessibility**: Focus trapped within drawer when active; ESC key listener; ARIA dialog semantics.
- **Mobile Behavior**: Full-width slide-out bottom/right drawer with oversized touch buttons.
- **Implementation**: Custom lightweight drawer with optimistic state updates.

---

### Pattern 10: Flagship Equipment Spotlight Hero with Tabular Telemetry Audit
- **21st.dev Source**: [Featured Spotlight Card / Product Feature](https://21st.dev/community/components/explore/product-features)
- **Component**: `src/components/home/FeaturedProducts.tsx`
- **UX Intent**: Highlighting flagship engineering (e.g. Toray T700 Raw Carbon Paddle with 16mm reactive polymer core). A split brutalist layout featuring large photography with floating glass badge and tabular technical specification rail.
- **Dependencies**: React, CSS Grid, Glassmorphism tokens.
- **Accessibility**: High-contrast tabular markup; readable at 200% zoom.
- **Mobile Behavior**: Responsive vertical stack with image first and specs grid below.
- **Implementation**: Custom brutalist editorial commerce layout.

