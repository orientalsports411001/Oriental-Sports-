# 03 — Shop & E-Commerce Catalog Specification

> **Surfaces**: Catalog (`/shop`), Sport Categories (`/category/:slug`), Product Detail (`/product/:slug`)  
> **Target Audience**: Individual players, school sports directors, fitness club managers, and institutional purchasers.  
> **Key Objective**: Deliver a high-converting, commercial Indian sports e-commerce experience modeled after industry benchmarks (Myntra, Flipkart, Nike), with transparent rupee pricing, instant cart actions, and multi-sport filtering.

---

## 1. Catalog Architecture & Inventory Scope
The catalog features an integrated inventory of authentic, verified sports equipment spanning professional match play to commercial strength training:

1. **Cricket (SG, SS, Kookaburra)**: English and Kashmir Willow bats across all size grades (Size 3 to Full Size F), tournament leather balls, batting pads, gloves, and kit bags.
2. **Badminton (Yonex, Victor, Li-Ning)**: Head-heavy, even-balance, and headlight racquets (Astrox, Nanoflare, Thruster), feather and nylon shuttles (Aerosensa, Mavis), court shoes, and string reels.
3. **Fitness & Strength (Cougar Commercial)**: 51mm Olympic weight plates (2.5kg to 25kg), rubber hex dumbbells, vinyl dumbbells, Olympic EZ and straight bars (3ft to 7ft), weighted power bags, agility hurdles, cones, and speed ladders.
4. **Cardio Exercise Bikes**: Commercial spin bikes (KH-142, KH-152), upright magnetic bikes (KH-555, KH-715), recumbent rehabilitation bikes (KH-575, KH-724), and high-intensity dual-action air bikes.
5. **Recreational Tables**: Professional indoor Table Tennis tables (Carbon, Fury, Glory, Gravity, Play), commercial foosball tables (Prima, Premium), and slate pool tables.

---

## 2. Catalog User Interface & Filtering Mechanics (`ShopPage.tsx`)

### Layout Grid Standard
* **Desktop Standard (1440px / 1280px)**: 4-column balanced grid with sticky left-hand filter sidebar.
* **Tablet (1024px / 768px)**: 3-column responsive grid with horizontal filter bar and slide-over drawer.
* **Mobile (320px – 430px)**: 2-column compact e-commerce grid with bottom slide-up filter sheet and sticky quick-sort pills.

### Multi-Faceted Filter System
1. **Sport Disciplines**: Badminton, Cricket, Football, Tennis, Fitness & Strength, Exercise Bikes, Recreation Tables.
2. **Brand Selection**: Filter by verified manufacturers (Yonex, SG, SS, Victor, Cougar, Nivia).
3. **Price Ranges**:
   - Under ₹1,000
   - ₹1,000 – ₹2,500
   - ₹2,500 – ₹5,000
   - ₹5,000 – ₹10,000
   - ₹10,000 and Above
4. **Availability Toggle**: `In Stock Only` filter for instant dispatch items.
5. **Sorting Modes**:
   - `Featured Equipment` (Curated editorial priority)
   - `Price: Low to High`
   - `Price: High to Low`
   - `Top Customer Rated` (4.5★ and above)
   - `Name: A to Z`

---

## 3. Product Card Standard (`ProductCard.tsx`)
Each catalog item conforms to strict commercial standards:
* **Product Media**: Clean high-res shot on dark neutral background with subtle zoom hover.
* **Header Row**: Uppercase brand badge (`YONEX`, `SG`, `COUGAR`) + unit quantity (`1 piece`, `1 pair`, `1 set`).
* **Title**: Semantically structured heading linked directly to the product detail page.
* **Rating Pill**: Numeric rating with gold star and total verified review count (e.g. `4.8 ★ | 32`).
* **Price Line**:
  - Selling Price in Indian Rupees (`₹2,899`) in bold white.
  - MRP strikethrough (`₹3,499`) in muted tone.
  - Calculated discount badge (`15% off`) in vivid green/crimson.
* **Interactive Controls**:
  - **Wishlist Heart**: Top-right toggle with instant local storage persistence.
  - **Quick Add Button**: Full-width or inline `+ Add` button that triggers a tactile check animation (`Added`) and syncs to `CartContext`.

---

## 4. Product Detail Surface (`ProductDetailPage.tsx`)
* **Multi-Image Studio Gallery**: High-resolution thumbnails, primary zoom preview, and mobile swipe gallery.
* **Specifications Table**: Verified technical parameters (weight, balance point, material composition, grip size, recommended string tension, frame geometry).
* **Variant & Size Selectors**: Interactive chips for cricket bat sizes (3, 4, 5, 6, Full Size F), dumbbell weights (2.5kg to 25kg), or shoe sizes (UK 6 to 11).
* **Delivery & Pincode Checker**: Validates 6-digit Indian PIN codes with estimated dispatch timeframes from the Camp store.
* **Commercial Trust Badges**:
  - 100% Genuine Manufacturer Guarantee
  - Official GST Tax Invoice included
  - In-store stringing or bat knocking-in add-on options

---

## 5. Slide-Out Cart Drawer & Checkout Pipeline (`CartDrawer.tsx`, `CheckoutPage.tsx`)
* **Slide-Out Drawer**: Slides smoothly from the right on any `Add to Bag` action without forcing a full page redirect.
* **Order Summary**: Line-item quantities, unit prices, delivery charge calculator, and subtotal.
* **Indian Payment Channels**: UPI QR Code scanner (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Debit/Credit Cards, and Cash on Store Pickup.
