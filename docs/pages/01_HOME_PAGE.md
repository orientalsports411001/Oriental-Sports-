# 01 — Home Page Specification

> **Surface**: Homepage (`/`)  
> **Target Audience**: Pune athletes, badminton & tennis players, club coaches, society committee members, and fitness enthusiasts.  
> **Key Goal**: Establish Oriental Sports as Pune’s preeminent sports institution—bridging in-hand equipment retail at MG Road Camp with turnkey sports infrastructure construction across Maharashtra.

---

## 1. Executive Purpose & Strategic Framing
The homepage functions as both a high-impact commercial storefront and an architectural portfolio. Rather than presenting generic retail carousels, it leads with an authentic athletic campaign editorial aesthetic, highlighting genuine Pune sporting heritage and immediate conversion pathways.

---

## 2. Section-by-Section Functional Breakdown

### Section 1: Non-Blocking Brand Intro (`BrandIntro.tsx`)
* **Behavior**: Full-screen cinematic entrance featuring the Oriental Sports vector monogram mask.
* **Non-Blocking Rule**: Animates fluidly on initial visit and immediately yields to user scroll or click.
* **Storage Cache**: Keyed in `sessionStorage ('oriental_sports_brand_intro_seen')` so returning users in the same browsing session bypass the intro for instant page access.

### Section 2: Campaign Editorial Hero (`Hero.tsx`)
* **Visual Presentation**: Multi-slide full-bleed athletic compositions combining high-resolution court photography with high-impact typography.
* **Slides Overview**:
  1. *Badminton & Racket Sports*: Spotlight on tournament-grade Yonex Astrox and Victor rackets with Camp store stringing services.
  2. *Turnkey Court Engineering*: Laser-graded acrylic pickleball and tennis facility construction.
  3. *Cricket & Team Sports*: SG & SS English/Kashmir willow bats, protective gear, and leather match balls.
  4. *Commercial Gym & Fitness*: Cougar strength equipment, Olympic weights, and cardio bikes.
* **Motion & Controls**: Restrained 2.5D subtle parallax on mouse move, touch swipe gestures on mobile, keyboard arrow navigation, and a linear progress bar indicator.
* **Primary CTAs**:
  - `SHOP GEAR →` (Navigates to `/shop`)
  - `TURNKEY COURTS →` (Navigates to `/courts`)

### Section 3: Interactive Sport Index
* **Desktop Mechanics**: Smooth horizontal accordion cards (~45% active width expansion on hover/focus).
* **Mobile Mechanics**: Seamlessly reflows into a single-column tactile tap list with zero horizontal scroll overflow.
* **Supported Disciplines**:
  - Badminton (Rackets, shuttles, shoes, grips, stringing)
  - Cricket (Bats, pads, gloves, balls, knocking-in)
  - Tennis & Pickleball (Paddles, balls, regulation nets)
  - Gym & Strength (Olympic bars, rubber hex dumbbells, benches)
  - Recreation (Indoor TT tables, foosball tables, pool tables)

### Section 4: Curated Gear Edit (`GearEdit.tsx`)
* **Layout**: 4-column responsive product showcase on desktop, 2-column grid on mobile.
* **Card Features**:
  - High-resolution studio photography with clean dark backgrounds.
  - Authentic Indian pricing with Rupee symbol (`₹`), strikethrough original MRP, and calculated discount tags (e.g. `15% OFF`).
  - Active Wishlist bookmarking heart toggle.
  - Direct `Add to Bag` button with tactile feedback animation.

### Section 5: Turnkey Court Infrastructure Chapter (`CourtsChapter.tsx`)
* **Narrative**: *"From Sub-Base to Final Line Marking"*—highlighting Oriental’s dedicated sports construction division.
* **Key Specifications Displayed**:
  - Multi-layer cushion acrylic surface systems for pickleball and tennis.
  - Sprung timber lattice and PVC vinyl mats for indoor badminton halls.
  - Non-directional monofilament synthetic turf for box cricket and 5-a-side football.
  - High-mast sports floodlighting and galvanized chainlink enclosure systems.
* **Primary Action**: `REQUEST SITE CONSULTATION →` (Triggers consultation modal or direct WhatsApp routing).

### Section 6: Flagship Camp Store Spotlight (`StoreChapter.tsx`)
* **Atmosphere**: Authentic independent sports house at Shop 247, MG Road, New Modikhana, Camp, Pune.
* **Live Store Status Badge**: Real-time script checks user's time against Asia/Kolkata store hours:
  - *Mon–Sat*: 10:30 AM – 8:30 PM
  - *Sun*: 11:00 AM – 6:00 PM
  - Displays green pulsating dot when open, amber when closing soon, red when closed.
* **In-Store Workshop Highlights**:
  - Computerized electronic constant-pull stringing machines (Yonex calibrated).
  - Traditional wooden mallet bat knocking-in, linseed oiling, and scuff sheet application.
* **Direct Actions**:
  - `GET DIRECTIONS` (Deep-links to Google Maps geolocation)
  - `WHATSAPP STORE DESK` (`+91 98220 30000`)

---

## 3. Responsive Breakpoint Guarantees
- **Mobile (`320px – 430px`)**: Full-width hero with vertical touch controls; 2-column product grid; sticky bottom dock navigation.
- **Tablet (`768px – 1024px`)**: 3-column equipment showcase, reflowed court infrastructure comparison.
- **Desktop & Ultrawide (`1440px – 2560px 4K`)**: 4-column product grid; max container width 1440px centered; zero layout distortion.

---

## 4. Technical Architecture & State Dependencies
- **Component Path**: `src/pages/HomePage.tsx`
- **Context Dependencies**: `CartContext` (cart drawer trigger), `WishlistContext` (live bookmark states).
- **Asset Optimization**: WebP imagery with automatic `-sm.webp` srcset delivery for lightning-fast mobile paint times.
