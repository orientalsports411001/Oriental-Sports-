# Oriental Sports — Interaction Map

**Version**: 3.0  
**Design Reference Stack**: Playo (Sports-UX clarity & restraint) + Mobbin (Real e-commerce patterns) + Cosmos (Editorial visual curation) + Luma (Simplicity & visual confidence) + 21st.dev (Component mechanics) + UI/UX Pro Max (Design system governance).  
**Primary Canvas**: Warm Ivory (`#F6F3EA`) / Crisp White (`#FFFFFF`) / Ink (`#111111`) / Restrained Plate Gold (`#C9A227`).

---

## 1. Global Navigation & Header Interaction

### Desktop Header:
- **Default State**:
  - Sits at top of viewport over Ivory canvas with high legibility.
  - Height: `74px`.
  - Left: Locked Oriental Sports mark (link to `/`).
  - Center Nav Links: `SHOP`, `COURTS`, `ABOUT`, `VISIT`.
  - Right Utility Icons:
    - Search (`Search` icon + shortcut pill `⌘K` / `Ctrl+K`)
    - Account (User profile popover or direct login modal trigger)
    - Wishlist (Heart icon with dynamic badge count from `WishlistContext`)
    - Bag (Shopping bag icon with dynamic badge count and subtotal preview)
- **Scrolled State (`scrollY > 20px`)**:
  - Smoothly transitions height to `64px`.
  - Background blurs to `rgba(246, 243, 234, 0.94)` with subtle 1px border `rgba(17, 17, 17, 0.06)` and fine shadow.
- **Hover Interactions**:
  - Nav links: Subtle sliding underline indicator (`2px solid #111111`) with `200ms ease`.
  - Shop link: Hover reveals refined 21st.dev style mega dropdown previewing primary sports (Pickleball, Cricket, Badminton, Volleyball) with thumbnail images.
  - Action buttons: Scale `1.05` on hover with tooltip hints.
- **Keyboard & Accessibility**:
  - `Tab` navigates through all interactive items in DOM order.
  - `Escape` closes any open dropdown, modal, or drawer.
  - Skip link (`Skip to main content`) available for keyboard and screen reader users.

### Mobile Header (`<1024px`):
- **Layout**: `[ Hamburger Menu ]` `[ Centered Oriental Sports Logo ]` `[ Wishlist (Badge) ]` `[ Bag (Badge) ]`.
- **Tap Hamburger**:
  - Slides open full-height Mobbin-style drawer with sports categories, court consultation link, store contact, and account shortcut.
  - Smooth backdrop dim (`rgba(17, 17, 17, 0.5)`).
  - Body scroll lock (`overflow: hidden`).
- **Mobile Bottom Navigation Bar (`MobileBottomNav`)**:
  - Fixed 5-point thumb bar docked to bottom of mobile screen (`60px` height):
    - `HOME` (`/`)
    - `SHOP` (`/shop`)
    - `COURTS` (`/courts`)
    - `WISHLIST` (`/wishlist` with count badge)
    - `ACCOUNT` (`/account` / `/account/login`)
  - Active tab highlighted with bold label and top ink dot indicator.

---

## 2. 5-Section Homepage Interaction Architecture

### Section 1: Editorial Hero Carousel (`Hero`)
- **UX Intent**: Immediate brand authority, clear purpose above the fold, photorealistic sports lifestyle visual.
- **21st.dev Component Mechanics**: Synchronized image crossfade + progress bar indicator + keyboard navigation.
- **Content Slides (3-Slide Story)**:
  - Slide 01: `GEAR. COURTS. PUNE.` | "Everything you need to play, train and build." | CTAs: `SHOP SPORTS` (`/shop`), `BUILD A COURT` (`/courts`)
  - Slide 02: `PLAY. TRAIN. PERFORM.` | "Curated cricket willow, tournament paddles, and pro racquet stringing in Camp." | CTAs: `EXPLORE GEAR` (`/shop`), `VISIT STORE` (`/visit`)
  - Slide 03: `WE BUILD. YOU PLAY.` | "Turnkey sports surfaces, sub-base engineering, and floodlighting across Pune." | CTAs: `EXPLORE COURTS` (`/courts`), `VIEW PROJECTS` (`/courts/projects`)
- **Autoplay & Timing**:
  - Duration: `5500ms` per slide.
  - Linear SVG progress ring/bar showing countdown.
  - Pauses immediately on mouse hover, touch press, or element focus.
  - Resets countdown when user manually interacts.
- **Controls**:
  - Previous / Next subtle chevron buttons on desktop.
  - Numbered slide selector (`01 / 02 / 03`).
  - Mobile touch swipe support (`touchstart`, `touchmove`, `touchend` with 50px delta threshold).
  - Keyboard `ArrowLeft` / `ArrowRight` listener.
- **Reduced Motion**: Under `prefers-reduced-motion: reduce`, animations are replaced with instant slide jumps and autoplay is disabled.

### Section 2: Shop by Sport (`ShopBySport`)
- **UX Intent**: Fast sports discovery via editorial photography cards.
- **Sports Categorization**:
  - Primary (High visual presence): `Pickleball`, `Cricket`, `Badminton`, `Volleyball`
  - Secondary (Clean list/tags): `Squash`, `Table Tennis`, `Fitness`, `Recreation`, `Accessories`
- **Interactions**:
  - Staggered editorial grid: Primary sports featured in asymmetric photo cards (e.g. 2 large feature cards, 2 medium cards, and pill ribbon for secondary sports).
  - Card Hover:
    - Image scales smoothly (`scale(1.03)` over `350ms ease-out`).
    - Subtle arrow indicator slides right `4px`.
    - CTA tag expands slightly.
  - Card Click: Direct navigation to `/shop/:category`.

### Section 3: Featured Gear (`FeaturedProducts`)
- **UX Intent**: Frictionless commerce discovery of tournament-grade equipment.
- **Product Card (`ProductCard`) Interactions**:
  - **Image Hover**:
    - Smooth crossfade to secondary product view if available (`300ms ease`).
    - Quick Add pill button slides up from bottom edge (`translateY(0)`).
  - **Wishlist Heart**:
    - Clicking toggles item in `WishlistContext`.
    - Heart scales with spring bounce `1.0 -> 1.25 -> 1.0`.
    - Updates wishlist counter in header.
  - **Quick Add**:
    - Clicking selects default tournament variant and adds to `CartContext`.
    - Button changes state to `✓ ADDED` for 1500ms with green micro-flash.
    - Automatically opens the sliding `CartDrawer`.
  - **Out of Stock**:
    - Disables Quick Add; displays clean "Notify in Camp Store" state.

### Section 4: Build a Court Showcase (`CourtsSection`)
- **UX Intent**: Showcase Pune sports infrastructure capabilities without SaaS clutter.
- **Content**:
  - Heading: `WE BUILD COURTS.`
  - Copy: "From sports surfaces and court construction to the finishing details, explore Oriental Sports infrastructure work."
  - Project Categories: `Tennis`, `Pickleball`, `Basketball`, `Multi-Sport`, `Volleyball`.
- **Interactions**:
  - Split layout: Verified Pune court photography on one side; technical scope, certified surface options, and interactive project cards on the other.
  - Hovering a project reveals real specifications (e.g., 8-layer cushion acrylic, 350-lux lighting).
  - Direct CTAs:
    - Primary: `VIEW PUNE PROJECTS` (`/courts/projects`)
    - Secondary: `COURT CONSULTATION` (`/contact?type=court`)

### Section 5: Visit Oriental Flagship (`VisitStore`)
- **UX Intent**: Drive physical footfall to the Camp retail store with zero fictitious data.
- **Content**:
  - Heading: `COME VISIT.`
  - Address: Oriental Sports, 247 MG Road, New Modikhana, Camp, Pune 411001.
  - Phone: `+91 98909 90022`
  - Email: `oriental_sports@outlook.com`
- **CTAs**:
  - Primary CTA: `GET DIRECTIONS` (direct link to Google Maps navigation coordinates).
  - Secondary CTA: `CALL STORE` (`tel:+919890990022`).
- **Visuals**:
  - Clean photographic frame of the Camp store / workshop.
  - No fake AI maps, no invented opening hours, no fictitious store features.

### Section 6: Structured Footer (`Footer`)
- **Layout**: 4 clean editorial columns:
  - Column 1: Brand mark, Pune Camp positioning, verified contact.
  - Column 2: `SHOP` (Pickleball, Cricket, Badminton, Volleyball, Squash, Fitness, Recreation, Accessories).
  - Column 3: `COURTS` (Projects, Court Setup) & `HOUSE` (About, Visit, Contact).
  - Column 4: `CUSTOMER` (Account, Orders, Wishlist, Shipping, Returns, Privacy, Terms).
- **Zero dead links**: Every single link resolves to a valid route.

---

## 3. Commerce & Cart Drawer Interaction (`CartDrawer`)

- **Trigger**: Click Bag icon in header, Quick Add from card, or "Add to Bag" on PDP.
- **Drawer Behavior**:
  - Slides in from right on desktop (`420px` width) or up from bottom on mobile.
  - Translucent neutral backdrop (`rgba(17, 17, 17, 0.4)`); click outside or `Escape` closes drawer.
- **Line Item Controls**:
  - Quantity Stepper (`-` / count / `+`) with instantaneous subtotal recalculation.
  - Decreasing quantity to `0` prompts item removal.
  - Delete trash icon removes item immediately.
- **Free Delivery Progress**:
  - Visual meter tracking Pune delivery threshold (₹2,000).
- **Checkout Action**:
  - `PROCEED TO CHECKOUT` CTA buttons hand off to Shopify checkout architecture or direct WhatsApp fulfillment.

---

## 4. Search Overlay Interaction (`SearchModal` & `/search`)

- **Trigger**: Click Search in header or keyboard shortcut (`⌘K` / `Ctrl+K`).
- **Desktop Search Modal**:
  - Opens centered modal overlay with auto-focused search input.
  - Live debounced filtering (150ms) across Products, Categories, and Court Projects.
  - Quick trending search tags: "Pickleball", "English Willow", "Tennis Strings", "Court Construction".
  - Pressing `Enter` navigates to full `/search?q={query}` page.
  - Empty state provides recommendations: "No equipment found — browse all disciplines".

---

## 5. Account & Authentication Flow (`/account/*`)

- **Shopify Customer Account Architecture**:
  - Pluggable `AuthProvider` supporting phone OTP, Google OAuth, and Email login.
- **Routes**:
  - `/account`: User dashboard (overview, recent orders, saved addresses, court consultations).
  - `/account/login`: Clean phone/email login interface with `returnTo` preservation.
  - `/account/signup`: Fast 3-field customer registration.
  - `/account/verify`: 6-digit discrete OTP verification with auto-advance, paste listener, and 30s resend timer.
  - `/account/orders`: Full list of past & active orders with status badges.
  - `/account/orders/:orderId`: Visual DTDC tracking timeline and delivery address.
  - `/account/profile`: Edit first name, last name, phone, email, sports interests.
  - `/account/addresses`: Add, edit, delete, and set default delivery addresses in Pune/India.
  - `/account/wishlist` & `/wishlist`: Grid of favorited products with one-click Add to Bag.
- **Originating Page Preservation**:
  - When an unauthenticated user clicks Wishlist or Order Tracking, `returnTo` URL parameter is saved.
  - Upon successful verification, user is returned immediately to the originating product or page.

---

## 6. Product Detail Page (`/product/:slug`)

- **Layout**:
  - Left: High-res product gallery with main viewer and thumbnail list (keyboard navigable).
  - Right: Sticky product information column:
    - Category kicker, title, price (tabular numerals), variant picker (e.g. Weight/Grip), size selector, quantity stepper.
    - CTAs: `ADD TO BAG` (primary) and `BUY NOW` (direct to checkout).
    - Authentic Pune Camp store availability badge: "Ready for same-day stringing & pickup at Camp store".
    - Product specs table, delivery details, return policy.
- **Mobile Sticky Buy Bar (`StickyBuyBar`)**:
  - Appears when user scrolls past primary Add to Bag button.
  - Docks thumbnail, title, price, and compact Add to Bag button to screen bottom.

---

## 7. Court Services & Projects (`/courts/*`)

- **Routes**:
  - `/courts`: Overview of court capabilities, certified surface types, interactive cost estimator.
  - `/courts/projects`: Gallery of verified Pune projects (Koregaon Park Pickleball, Deccan Gymkhana Tennis, Baner Arena, Camp Officers Club).
  - `/courts/:slug`: Deep project case study with technical sub-base details, surface layers, and inquiry form.
- **No Fictitious Claims**: Strict adherence to verified specifications and real project scopes.

---

## 8. Error & 404 Recovery (`/404` & `*`)

- **NotFoundPage**:
  - Heading: `LOST THE BALL?`
  - Body: "The court line you are looking for is out of bounds or the page has been moved."
  - Primary CTA: `BACK TO SHOP` (`/shop`)
  - Secondary CTA: `HOME` (`/`)
