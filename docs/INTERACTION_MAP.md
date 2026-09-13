# Oriental Sports — Interaction Map
**Document Version**: 2.0  
**Design Reference Stack**: 21st.dev (Interactions) + Mobbin (UX Flows) + Cosmos (Visual Curation) + Luma (Simplicity & Emotion) + UI/UX Pro Max (Design Tokens)

---

## Component Interaction Matrix

### 1. Animated Glass Navbar (`GlassNav`)
- **Purpose**: Primary site-wide navigation with sticky floating glassmorphism, category mega menu, and quick action icons.
- **21st.dev Reference**: [Navbar Animations / Floating Header](https://21st.dev/community/components/explore/navbar-animations)
- **Desktop Behaviour**:
  - Starts as a floating translucent glass pill (`var(--glass-light)`, `backdrop-filter: blur(16px)`) over hero photography.
  - On scroll (>50px), smoothly morphs into a compact docked translucent navigation bar with subtle border.
  - Hovering "SHOP" reveals an animated glass mega menu displaying 8 sports with category images and dynamic preview crossfade.
  - Hovering account avatar (if logged in) drops down an account card with "Hi, [Name]", quick links (Orders, Wishlist, Profile, Addresses), and Logout.
  - If logged out, clicking Account opens the fast mobile-friendly `AuthSheet`.
- **Mobile Behaviour**:
  - Compact glass header (Logo + Search + Account + Bag).
  - Tapping hamburger triggers a full-height animated glass drawer with accordion sport categories.
- **Animation & Transitions**:
  - Navbar dock transition: `cubic-bezier(0.16, 1, 0.3, 1) 350ms`.
  - Mega menu entry: Scale `0.98 -> 1`, opacity `0 -> 1`, `250ms`.
- **Accessibility**: ARIA expanded attributes for menus; keyboard Tab navigation; Esc key closes dropdowns/drawers.

---

### 2. Kinetic Hero Carousel (`HeroCarousel`)
- **Purpose**: High-energy editorial centerpiece with commercial sports photography, kinetic headlines, and autoplay choreography.
- **21st.dev Reference**: [Image Gallery / Carousel Component](https://21st.dev/community/components/explore/carousel-component-react)
- **Content Slides**:
  - Slide 01: "GEAR. COURTS. PUNE." (Athlete + match equipment)
  - Slide 02: "PLAY. TRAIN. PERFORM." (High-motion court action)
  - Slide 03: "WE BUILD. YOU PLAY." (Turnkey sports court architecture)
- **Desktop Behaviour**:
  - Automatic transition every 5.5 seconds.
  - Interactive progress indicator bar fills over 5.5s.
  - Previous / Next glass chevron controls with magnetic hover feedback.
  - Slide index jump buttons (`01 / 02 / 03`).
  - Pauses autoplay while hovered.
- **Mobile Behaviour**:
  - Full touch swipe support (`touchstart` / `touchmove` / `touchend` with momentum threshold).
  - Viewport height tuned to `80svh` preventing overflow.
  - Simplified touch-friendly slide progress dots and direct CTA pill.
- **Animation & Transitions**:
  - Image clip reveal + scale (`scale 1.05 -> 1.0`, `850ms`).
  - Text staggered entry: Eyebrow (0ms), Headline (120ms), Description (240ms), CTA (360ms).
- **Accessibility**: Screen reader live region announcing current slide; `prefers-reduced-motion` halts continuous progress animation.

---

### 3. Sports Ticker Ribbon (`MarqueeTicker`)
- **Purpose**: Continuous visual momentum between sections.
- **Desktop & Mobile Behaviour**:
  - Infinite seamless CSS marquee moving right-to-left: `CRICKET ✦ BADMINTON ✦ PICKLEBALL ✦ TENNIS ✦ FITNESS ✦ TABLE TENNIS ✦ SQUASH ✦ RECREATION ✦`.
  - Pauses slightly on hover/touch for clarity.
  - Styled with Tangerine background and high-contrast bold typography.

---

### 4. Interactive Sport Selector (`SportSelector`)
- **Purpose**: Signature visual discovery section for 8 core sports categories on Electric Blue (`#2457FF`).
- **21st.dev Reference**: [Hover Image Gallery / Interactive Selector](https://21st.dev/community/components/explore/image-gallery-component)
- **Desktop Behaviour**:
  - Two-column layout:
    - Left: Vertical list of 8 sports in bold `Space Grotesk`.
    - Right: Large framed dynamic sport photograph (`aspect-ratio: 4/3`, glass frame with subtle glow).
  - Hovering a sport immediately updates the right-side photograph with a smooth crossfade and highlights the active sport pill with an arrow reveal.
  - Clicking any sport navigates to `/shop/:category`.
- **Mobile Behaviour**:
  - Horizontal swipeable reel of sport cards with vivid photos and pill badges. Tap navigates to `/shop/:category`.
- **Animation**:
  - Image crossfade: `300ms ease-out`.
  - Pill expansion: `200ms ease`.

---

### 5. Featured Gear Grid (`ProductCard` & `QuickAdd`)
- **Purpose**: Showcase 4–6 authentic tournament-grade products with instant interactions on crisp white.
- **21st.dev Reference**: [Hover Dev Cards](https://21st.dev/community/components/explore/hover-dev)
- **Desktop Behaviour**:
  - Crisp card with 16px radius, subtle border, and soft shadow.
  - Hover triggers:
    - Primary image zooms slightly (`scale(1.04)`).
    - Secondary image crossfades in if available.
    - Quick-Add pill button slides up from bottom.
    - Wishlist heart icon reveals on top-right.
  - Clicking Wishlist toggles item in `WishlistContext` with scale bounce feedback.
  - Clicking Quick-Add adds the default variant to Cart and triggers "✓ ADDED TO BAG" toast + opens cart drawer.
- **Mobile Behaviour**:
  - Quick-add and Wishlist buttons are always accessible (no hover dependency).
  - Touch-friendly swipe reel on small screens (`375px–430px`).

---

### 6. Build a Court Showcase (`CourtsSection`)
- **Purpose**: High-impact presentation of Oriental Sports' court construction infrastructure on Tangerine Orange (`#FF6B35`).
- **21st.dev Reference**: [Project Showcase / Glass Panel](https://21st.dev/community/components/explore/project-showcase)
- **Desktop Behaviour**:
  - Headline: "WE BUILD THE PLACE YOU PLAY."
  - Large architectural sports court photo with a floating glass spec sheet (`var(--glass-dark)`):
    - Sub-base engineering, acrylic/turf surface types, floodlighting, turnkey handover.
  - Direct CTAs:
    - "COURT CONSULTATION →" (opens consultation inquiry on `/contact?type=court`)
    - "VIEW PUNE PROJECTS →" (navigates to `/courts/projects`)
- **Mobile Behaviour**:
  - Stacked layout: Headline → Image with glass overlay badge → Direct touch buttons.

---

### 7. Flagship Camp Store Visit (`VisitStore`)
- **Purpose**: Drive physical footfall to Shop 247, MG Road, Camp, Pune on Warm Cream + Lime (`#C7F000`).
- **Desktop & Mobile Behaviour**:
  - Headline: "COME PLAY IRL."
  - Verified details: Shop 247, MG Road, New Modikhana, Camp, Pune 411001.
  - Operating hours: Mon–Sat 10:30 AM – 8:30 PM | Sun 11:00 AM – 6:00 PM.
  - Interactive Google Maps embed (zoomable, pannable, real iframe).
  - 3 action pills:
    - `GET DIRECTIONS →` (opens Google Maps Navigation)
    - `CALL STORE` (`tel:+919890990022`)
    - `WHATSAPP` (direct WhatsApp link)

---

### 8. Authentication Panel & Sheets (`AuthSheet` / `LoginPage`)
- **Purpose**: Myntra-inspired fast, mobile-friendly customer auth flow.
- **Mobbin Reference**: [Login / Phone Verification Flow](https://mobbin.com/?redirect_to=/discover)
- **Flow**:
  1. Entry: Welcome screen with "Continue with Google", divider, and "+91 [Mobile number]".
  2. Phone OTP Screen: 6 discrete inputs with auto-focus, paste listener, 30s countdown timer, resend button, and dev helper code banner.
  3. First-Time User Screen: 4 fields (First name, Last name, Email, Mobile) -> "ACCOUNT CREATED ✓".
  4. Return-To Redirection: Automatically redirects customer back to originating page (`returnTo`).
  5. Pluggable `AuthProvider`: Dev runs mock provider; switches to Shopify Customer Account OAuth in production.

---

### 9. Animated Cart Drawer (`CartDrawer`) & Page (`CartPage`)
- **Purpose**: Frictionless cart management and Shopify checkout handoff.
- **Desktop Behaviour**:
  - Right-side sliding glass drawer (`var(--glass-light)`, `backdrop-filter: blur(20px)`).
  - Displays product thumbnail, title, selected variant, price, item quantity stepper, and remove icon.
  - Subtotal calculation, tax/delivery notice, and primary "PROCEED TO CHECKOUT →" button.
  - Empty state with playful "YOUR BAG IS EMPTY" message and "SHOP SPORTS" CTA.
- **Mobile Behaviour**:
  - Bottom sheet on mobile devices with thumb-friendly touch targets.

---

### 10. Live Search Overlay (`SearchOverlay`)
- **Purpose**: Instant keyword and sport discovery.
- **Desktop & Mobile Behaviour**:
  - Fullscreen/modal glass backdrop with centered search input.
  - Live query debounced filtering across products, sports, and court services.
  - Quick pills for trending searches: "Pickleball", "English Willow", "Tennis Strings", "Court Construction".
  - Empty state: "No sports equipment found for '{query}'" with direct category links.

---

### 11. Branded 404 Experience (`NotFoundPage`)
- **Purpose**: Memorable, playful recovery from broken URLs.
- **Content**:
  - "404: MISSED THE BALL."
  - "The court line you are looking for is out of bounds."
  - Action buttons: "BACK HOME" and "SHOP SPORTS".
