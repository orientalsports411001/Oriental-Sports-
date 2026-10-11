# Oriental Sports Pune — Repository & Architecture Blueprint (Repomix)

> **Complete system architecture, directory map, data models, commerce engine, design system, and verification suite for the Oriental Sports web application.**

---

## 1. Project Overview & Identity
- **Brand**: Oriental Sports (Est. Camp, Pune, Maharashtra)
- **Flagship Location**: Shop 247, MG Road, New Modikhana, Camp, Pune 411001
- **Domain Focus**:
  1. **Omnichannel Athletic Retail**: Cricket, Football, Badminton, Tennis, Pickleball, Table Tennis, Squash, and Gym Equipment (Commercial & Domestic Treadmills).
  2. **In-House Workshop Services**: Racquet precision restringing, cricket bat knocking-in, and equipment customization.
  3. **Turnkey Sports Infrastructure**: Turnkey court construction (badminton, tennis, pickleball, basketball, turf football) including sub-base, acrylic surfacing, LED floodlighting, fencing, and line marking across Maharashtra.
- **Aesthetic**: Raw Sports Editorial / Commercial Athletic (Anti-Slop, zero fabricated claims, authentic physical store identity).

---

## 2. Technology Stack
- **Framework & Runtime**: React 18.3 (TypeScript 5.6) + Vite 5.4
- **Routing**: `react-router-dom` v6 (Lazy code-split pages with fallback skeletons)
- **State Management**: React Context (`CartContext`, `AuthContext`, `WishlistContext`) backed by `localStorage` persistence
- **Animation & Motion**: `framer-motion` (reduced-motion compliant) + CSS transitions
- **Styling Architecture**: Vanilla CSS Modular Tokens System (`tokens.css`, `global.css`, `components.css`, `navigation.css`, `home.css`, `pages.css`, `checkout.css`, `auth-modal.css`)
- **Payment & Gateways**: Official Razorpay integration (`checkout.js` loader, UPI/GPay/PhonePe QR, Cards, Netbanking) with sandbox preview simulator
- **Auditing & QA**: Playwright browser test harness (`scripts/responsive-audit.mjs`, `scripts/check-media.mjs`, `scripts/verify-gym-catalog.mjs`, `scripts/find-overflow.mjs`)

---

## 3. Repository Directory Structure

```
ORIENTAL_SPORTS/
├── AGENTS.md                          # Strict anti-slop, responsive, and quality directives
├── index.html                         # Entry HTML with preloaded fonts and metadata
├── package.json                       # Dependencies, scripts (dev, build, preview)
├── repomix.config.json                # Repomix configuration file
├── repomix-output.md                  # Comprehensive packed single-file codebase (96 files)
├── tsconfig.json                      # Strict TypeScript compiler options
├── vite.config.ts                     # Vite bundler configuration (port 3000, host: true)
│
├── docs/                              # Architecture documentation & audit logs
│   ├── gym-catalog-source-rows.json  # Raw mapping rows from Gym Equipments.xlsx
│   ├── RESPONSIVE_AUDIT.md            # Zero-overflow Playwright audit report
│   ├── VISUAL_DIRECTION.md            # Editorial art direction rules
│   └── visual-audits/                 # Automated audit screenshots across 10 viewports
│
├── public/                            # Static assets
│   ├── images/
│   │   ├── brand/                     # SVG logos and brand vectors
│   │   ├── catalog/                   # Core sport equipment photography
│   │   ├── courts/                    # Turnkey court project photography
│   │   ├── hero/                      # Editorial hero compositions
│   │   └── products/gym-equipment/    # 18 treadmill photos extracted from Excel
│   └── favicon.ico
│
├── scripts/                           # Engineering & quality validation scripts
│   ├── capture-checkout.mjs           # Playwright desktop & mobile checkout snapshotter
│   ├── check-media.mjs                # Zero-broken-image & HTTP asset auditor
│   ├── extract-gym-images.mjs         # Workbook binary extractor for treadmill imagery
│   ├── find-overflow.mjs              # Exact element-level horizontal scroll detector
│   ├── responsive-audit.mjs           # 10-viewport zero-overflow + hero collision test
│   └── verify-gym-catalog.mjs         # Workbook vs. TypeScript catalog data validator
│
└── src/
    ├── main.tsx                       # React root render with CSS imports
    ├── App.tsx                        # Router definitions and layout controller
    │
    ├── components/
    │   ├── auth/                      # Authentication modal & OTP flows
    │   ├── brand/                     # SVG Vector Logo with dynamic color/scale
    │   ├── footer/                    # Store footer, Camp store hours, legal links
    │   ├── home/                      # Homepage sections (Hero, SportIndex, Orbital, etc.)
    │   ├── motion/                    # Motion wrappers & reveal hooks
    │   ├── navigation/                # Header, CartDrawer, BottomNav, MobileMenu
    │   ├── products/                  # ProductCard, filtering chips, gallery
    │   └── ui/                        # Img (smart fallback), PageHeader, Breadcrumbs
    │
    ├── context/
    │   ├── AuthContext.tsx            # Athlete profile, saved addresses, order history
    │   ├── CartContext.tsx            # Line items, quantities, promo codes, subtotals
    │   └── WishlistContext.tsx        # Saved products toggle with storage
    │
    ├── data/
    │   ├── categories.ts              # Sport category taxonomy (Cricket, Gym Equipment, etc.)
    │   ├── courts.ts                  # Turnkey court specs, materials, and estimates
    │   ├── gymProducts.ts             # 18 treadmills (10 Commercial, 8 Domestic) from Excel
    │   ├── media.ts                   # Centralized media registry with metadata
    │   ├── products.ts                # Master unified catalog (sports + gym products)
    │   └── storeInfo.ts               # Flagship Camp address, operating hours, schedule
    │
    ├── pages/
    │   ├── HomePage.tsx               # Editorial storefront & interactive court showcase
    │   ├── ShopPage.tsx               # Full catalog with brand, category, and price filters
    │   ├── CategoryPage.tsx           # Category-specific listing with subcategory tabs
    │   ├── ProductDetailPage.tsx      # Comprehensive PDP (specs, gallery, WhatsApp, Add to bag)
    │   ├── CartPage.tsx               # Shopping bag with line item controls & promo codes
    │   ├── CheckoutPage.tsx           # Modern e-commerce checkout with Razorpay & Camp pickup
    │   ├── OrderSuccessPage.tsx       # Confirmed order receipt, tracking, timeline
    │   ├── AccountPage.tsx            # Customer portal (orders, addresses, profile)
    │   ├── SearchPage.tsx             # Real-time multi-term search for gear and courts
    │   ├── CourtsPage.tsx             # Turnkey construction estimator & inquiry form
    │   ├── CourtProjectsPage.tsx      # Portfolio of completed projects in Pune
    │   └── PolicyPages.tsx            # Shipping, Returns, Privacy, Terms
    │
    ├── services/
    │   ├── authService.ts             # Auth state and address management
    │   ├── razorpay.ts                # Razorpay checkout script loader and config
    │   └── shopify.ts                 # Shopify Storefront API client (optional sync)
    │
    ├── styles/
    │   ├── tokens.css                 # Master design tokens (palette, typography, spacing)
    │   ├── global.css                 # CSS reset, responsive typography, baseline elements
    │   ├── components.css             # Buttons, chips, badges, form inputs, dialogs
    │   ├── navigation.css             # Sticky header, mobile drawer, search modal
    │   ├── home.css                   # Hero slider, sports rail, orbital 3D stage
    │   ├── pages.css                  # PDP, Shop, Courts, Account, and Cart styling
    │   ├── checkout.css               # Clean, trustworthy athletic e-commerce checkout UI
    │   └── auth-modal.css             # Phone OTP and customer sign-in styles
    │
    └── types/
        ├── auth.ts                    # User, Address, Order, TimelineItem types
        ├── index.ts                   # Product, Category, Court, CartItem types
        └── shopify.ts                 # CartLine, CheckoutUrl GraphQL schema types
```

---

## 4. Master Data Schemas

### Product Model (`src/types/index.ts`)
```typescript
export interface Product {
  id: string;                     // Unique identifier (e.g. 'prod-gym-genesis-9i-...')
  slug: string;                   // URL slug for SEO routing
  name: string;                   // Complete official product name
  category: SportCategory;        // 'cricket' | 'football' | 'gym-equipment' | ...
  categoryName: string;           // Human-readable category ('Gym Equipment')
  subcategory?: string;           // 'commercial-treadmills' | 'domestic-treadmills'
  subcategoryName?: string;       // Display name ('Commercial Treadmills')
  productType: string;            // 'treadmill' | 'bat' | 'racket'
  brand: string;                  // 'Adidas' | 'Vivafitness' | ''
  price: number;                  // Current selling price / MRP in INR
  originalPrice?: number;         // Strikethrough price (omitted for MRP-only items)
  currency: 'INR';
  priceLabel?: string;            // 'MRP' or undefined
  quantityUnit?: string;          // '1 Nos'
  availabilityNote?: string;      // 'Availability on request from the Camp store'
  rating: number;                 // Verified reviews score
  reviewsCount: number;
  inStock: boolean;
  images: string[];               // Asset paths under /images/
  description: string;            // Verbatim specs or Camp store contact copy
  features: string[];
  specs?: Record<string, string>; // { Motor: '5HP AC Motor', Type: 'Commercial' }
  variants?: ProductVariant[];
  sizes?: string[];
  seoTitle?: string;
  seoDescription?: string;
}
```

### Gym Equipment Catalog Integration (`src/data/gymProducts.ts`)
- **18 Total Treadmills** directly mapped from `Gym Equipments.xlsx`:
  - **10 Commercial Models**: Genesis 9i (₹5,25,000), T-3300 (₹3,50,000), T-1212 (₹2,62,500), Q3 Light (₹1,56,250), X10 Light (₹2,43,750), Q5 Light (₹2,02,500), T-6666 Curve (₹3,37,500), T-6262 Curve (₹1,90,000), Q8 (₹2,62,500), Q7 (₹2,31,250).
  - **8 Domestic Models**: T-102 (₹75,000), T-415 (₹85,000), T-425 (₹92,500), T-902 (₹1,16,250), T-906 (₹1,37,500), T-911 (₹1,52,500), T-145 (₹72,500) — all Vivafitness; and T-19 (₹89,900) — Adidas.
- **Image Assets**: 18 original workbook embedded JPEGs stored in `public/images/products/gym-equipment/` with full dimensions recorded in `image_manifest.json`.

---

## 5. Routing & Page Architecture (`src/App.tsx`)

| Route Path | Component | Purpose |
|---|---|---|
| `/` | `HomePage` | Flagship storefront, hero slider, sport index, 3D orbit gallery |
| `/shop` | `ShopPage` | Global catalog with multi-facet filters (category, brand, price) |
| `/shop/:category` | `CategoryPage` | Category rail (e.g. `/shop/gym-equipment`) |
| `/products/:category` | `CategoryPage` | Direct subcategory alias (e.g. `/products/commercial-treadmills`) |
| `/product/:slug` | `ProductDetailPage` | Detailed specifications, size chips, gallery, inquiry |
| `/cart` | `CartPage` | Line item controls, order summary, promo code application |
| `/checkout` | `CheckoutPage` | Focused 2-column e-commerce checkout with Razorpay |
| `/order-success` | `OrderSuccessPage` | Confirmed order summary, DTDC tracking, pickup instructions |
| `/account/*` | `AccountPage` | Customer dashboard: orders, addresses, login, verify |
| `/courts` | `CourtsPage` | Turnkey sports infrastructure services & interactive estimator |
| `/courts/projects` | `CourtProjectsPage` | Completed court construction installations across Pune |
| `/search` | `SearchPage` | Multi-token search indexing gear and court facilities |
| `/about`, `/visit` | `AboutPage`, `VisitPage` | Brand story, Camp workshop address, hours, contact |
| `/shipping`, `/returns` | `PolicyPages` | Official institutional policies and warranties |

---

## 6. Checkout & Commerce Engine (`src/pages/CheckoutPage.tsx`)

### Architecture & Design Decisions:
1. **Focused Checkout Layout**:
   - Header: Minimal bar with Oriental Sports logo, 3-step breadcrumb (`Bag` → `Shipping & Details` → `Payment`), and 256-Bit SSL Encryption notice.
   - Global mega-nav header, mobile bottom nav, and full footer are conditionally hidden on `/checkout` to eliminate duplicate headers and minimize conversion drop-off.
2. **Two-Column Responsive Grid**:
   - **Left Column**: Form cards for Contact Information (+91 phone group), Delivery Option (Doorstep Free Delivery vs Store Pickup Camp), and Address fields.
   - **Right Column (Sticky Desktop)**: Order Summary card with product thumbnail, item count pill, promo coupon form, transparent tax breakdown, and Camp workshop guarantee.
   - **Mobile Viewport (<= 991px)**: Collapsible top summary drawer (*"Show order summary · ₹18,490 ▾"*), single-column stack, and strict **Zero-Overflow** (`docScrollWidth === window.innerWidth`).
3. **Razorpay Payment Integration**:
   - Live SDK loader (`checkout.js`) with production key configuration (`VITE_RAZORPAY_KEY_ID`).
   - Interactive local simulator modal supporting UPI/QR (Google Pay, PhonePe, Paytm, BHIM), Test Credit/Debit Cards, and Netbanking.
   - Orders saved immediately to `AuthContext` with mock DTDC tracking number and routed to `/order-success`.

---

## 7. Quality Auditing & Test Suite

All audit tools are located under `scripts/`:

```bash
# 1. Verify Gym Equipment Catalog against Excel rows
node scripts/verify-gym-catalog.mjs

# 2. Check all media, image paths, and network requests
node scripts/check-media.mjs

# 3. Run 10-viewport responsive & zero-overflow audit
node scripts/responsive-audit.mjs

# 4. Detect exact element-level horizontal overflows
node scripts/find-overflow.mjs

# 5. Capture mobile (390px) and desktop (1440px) checkout snapshots
node scripts/capture-checkout.mjs

# 6. Re-pack complete codebase using Repomix
npx repomix
```

---

## 8. Repomix Output Files
- **Configuration**: [repomix.config.json](file:///d:/ORIENTAL_SPORTS/repomix.config.json)
- **Packed Codebase**: [repomix-output.md](file:///d:/ORIENTAL_SPORTS/repomix-output.md) (96 files, 248K tokens)
- **Architecture Spec**: [REPOMIX.md](file:///d:/ORIENTAL_SPORTS/REPOMIX.md)
