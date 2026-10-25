# 06 — Customer Account & Wishlist Portals Specification

> **Surfaces**: Customer Account Hub (`/account`), Dedicated Wishlist (`/wishlist`)  
> **Target Audience**: Registered athletes, recurring club customers, and guest equipment shoppers.  
> **Key Objective**: Deliver an authentic, commercial Indian sports e-commerce member experience featuring Google OAuth, Indian mobile OTP, real-time shipment dispatch tracking, and seamless cross-device gear bookmarking.

---

## 1. Dedicated Wishlist Experience (`/wishlist`)

### Architecture & Non-Blocking Philosophy
In line with top-tier e-commerce benchmarks (Myntra, Flipkart, Nike), the Wishlist operates as an independent, fully functional route accessible to both guest and authenticated users without enforcing a login wall.

### Key Functional Features
1. **Header & Context Bar**:
   - Breadcrumb navigation: `Home / My Wishlist`
   - Active item counter: (e.g. `4 sports items saved`)
   - Bulk action controls:
     - `MOVE ALL TO BAG`: Transfers all in-stock wishlisted equipment into the shopping cart.
     - `Clear All`: Clears the bookmark list with confirmation.
2. **Device Sync Banner (Guest Mode)**:
   - Non-intrusive reminder: *"Sync your wishlist across devices to get restock and price drop alerts."*
   - Direct authentic **Continue with Google** OAuth button.
   - Secondary **Sign In with Mobile** button.
3. **Wishlist Product Cards**:
   - **Remove Control `(✕)`**: Circular glass button on the top-right corner of each card for instant removal.
   - **Discount Badges**: Prominent discount indicator (e.g. `15% OFF`, `BESTSELLER`).
   - **Product Media & Direct Links**: Studio imagery linked directly to `/product/:slug`.
   - **Pricing Presentation**: Selling Price (`₹`), strikethrough original MRP, and discount percentage.
   - **Direct `MOVE TO BAG` Button**: Full-width high-contrast action button with ShoppingBag icon that moves the item to cart and opens the slide-out drawer.
4. **Empty State & Smart Recommendations**:
   - Centered empty-state illustration with an `EXPLORE SPORTS GEAR →` button linking to `/shop`.
   - Directly underneath, a **"Recommended Sports Equipment"** 4-column grid showcases top Pune gear with active heart toggles, enabling users to begin saving items immediately.

---

## 2. Customer Account Portal (`/account`)

### Signed-Out Member Hub
When an unauthenticated user visits `/account`, they are welcomed by an e-commerce customer portal:
* **Indian Mobile OTP Card**:
  - `IN +91 [Enter 10-digit mobile number]` with instant `SEND OTP →` button.
* **Production Google OAuth**:
  - Full-width **Continue with Google** action adhering to official Google brand guidelines.
* **E-Commerce Trust Guarantees**:
  - *Live Dispatch Tracking*: Real-time SMS & WhatsApp alerts for bats, rackets, and heavy equipment.
  - *Express Checkout*: Stored academy, club, and residential shipping addresses.
  - *100% Genuine Gear Guarantee*: Direct manufacturer warranty and official GST tax invoices.
* **Self-Service Bento Action Tiles**:
  - *Orders & Deliveries*: Quick link to tracking and returns.
  - *Saved Wishlist*: Displays active bookmark count and links directly to `/wishlist`.
  - *Delivery Addresses*: Shortcut to saved shipping locations.
  - *Expert Sports Concierge*: Direct WhatsApp chat desk with Camp master technicians (`+91 98220 30000`).

---

## 3. Logged-In Customer Control Center

Upon authentication (via Google or Mobile OTP), the account interface transforms into a dark obsidian dashboard with six specialized management tabs:

### Tab 1: Account Overview
* **Athlete Header**: Member name, verified badge (`CLUB ATHLETE MEMBER`), contact phone/email, and stringing loyalty points balance.
* **Quick Metric Cards**:
  1. *Total Orders* (with latest order ID link)
  2. *Turnkey Court Inquiries* (active proposals count)
  3. *Saved Equipment* (wishlist count)
  4. *Stringing Loyalty Points* (eligible rewards status)
* **Flagship Camp Store Card**: Quick-action buttons to `GET DIRECTIONS` and `WHATSAPP STRINGING DESK`.
* **Default Shipping Snapshot**: Primary delivery destination preview with quick `MANAGE` link.

### Tab 2: Orders & Deliveries (`OrderTracker.tsx`)
* **Status Filter Tabs**: `All Orders`, `Active Dispatches`, `Delivered`, `Inquiries`.
* **Interactive Stepper Timeline**: Visual milestone tracker:
  `Order Placed` ➔ `Confirmed` ➔ `In Workshop / Knocking / Stringing` ➔ `Dispatched` ➔ `Out for Delivery` ➔ `Delivered`.
* **Itemized Details**: Item thumbnails, quantities, unit prices, courier tracking number, and live tracking link.
* **Official GST Invoice**: One-click download of compliant Indian tax invoices.

### Tab 3: Saved Delivery Addresses (`AddressModal.tsx`)
* **Multi-Address Support**: Save separate addresses for Home, Sports Academy, School, or Society Club.
* **Interactive Address Modal**: Form fields calibrated for Indian logistics:
  - Contact Name & 10-Digit Mobile Number
  - Flat, House No., Building Name
  - Area, Locality, Landmark
  - City (Default: Pune), State (Default: Maharashtra)
  - 6-Digit Indian PIN Code (e.g. 411001, 411004)
  - Address Category Chips (`Home`, `Work`, `Club / Academy`)
  - `Make this my default shipping address` toggle.

### Tab 4: Turnkey Court Projects
* **Infrastructure Proposal Tracker**: Tracks ongoing society or club court construction projects through survey, design, surfacing, and final line marking stages.
* **Technical Specifications**: Displays selected surface system, court dimensions, lighting setup, and estimated completion date.

### Tab 5: Wishlist Tab
* Embedded direct view of the customer's saved rackets, bats, and footwear with instant `Move to Bag` actions.

### Tab 6: Athlete Profile & Gear Preferences
* **Personalized Sports Preferences**:
  - Primary Sport (Badminton, Cricket, Tennis, Pickleball, Fitness)
  - Preferred Racquet String Model & Tension (in lbs)
  - Cricket Bat Willow Preference (English vs. Kashmir) & Handle Type
  - Footwear Size (UK sizing)
  - Playing Frequency (Daily, 3–4 Days/Week, Weekend Match Play)
  - SMS / WhatsApp Order Notification preferences.
