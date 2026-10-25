# Oriental Sports Pune — Platform & Page Documentation Index

> **Client Delivery Documentation Suite**  
> **Client**: Oriental Sports (Shop 247, MG Road, New Modikhana, Camp, Pune 411001)  
> **Platform Version**: 2.0 Commercial E-Commerce & Turnkey Sports Infrastructure  
> **Architecture**: Dual Stack (High-Performance React/Vite SPA + Next.js App Router Storefront)

---

## 1. Documentation Suite Overview

This documentation package provides exhaustive, section-by-section functional and technical specifications for each primary surface of the **Oriental Sports** digital platform. Each document outlines the page objectives, component hierarchy, responsive mechanics, data sources, user interactions, and business conversion funnels.

| Document | Primary Route | Purpose & Key Focus |
| :--- | :--- | :--- |
| **[01. Home Page](./01_HOME_PAGE.md)** | `/` | Brand campaign hero, dynamic sport index, curated gear edit, turnkey courts chapter, flagship Camp store spotlight, and brand intro motion mask. |
| **[02. About Us Page](./02_ABOUT_US_PAGE.md)** | `/about` | Pune heritage narrative since 1974, core business pillars (Store, Courts, Institutions), craftsmanship in stringing/bat knocking, and store direction. |
| **[03. Shop Catalog Page](./03_SHOP_CATALOG_PAGE.md)** | `/shop`, `/category/:slug`, `/product/:slug` | High-converting 4-column equipment grid, multi-sport filters (Cricket, Badminton, Fitness, Gym, Tables), search, sorting, stock badges, Indian rupee formatting, and slide-out cart drawer. |
| **[04. Installations & Services Page](./04_INSTALLATIONS_AND_SERVICES_PAGE.md)** | `/courts`, `/courts/:slug` | Turnkey court engineering (Pickleball, Tennis, Badminton, Box Turf), surface systems, laser sub-base grading, sports lighting, chainlink fencing, and in-store workshop services (electric stringing, bat preparation). |
| **[05. Contact & Flagship Visit Page](./05_CONTACT_AND_FLAGSHIP_VISIT_PAGE.md)** | `/contact`, `/visit` | Physical Camp store walkthrough, live interactive opening hours calculator (Asia/Kolkata), Google Maps geolocation, direct WhatsApp Concierge routing (`+91 98220 30000`), and institutional RFP forms. |
| **[06. Account & Wishlist Portals](./06_ACCOUNT_AND_WISHLIST_DOC.md)** | `/account`, `/wishlist` | Dedicated E-Commerce Wishlist with Move-to-Bag actions, production Google OAuth (`Continue with Google`), Indian mobile OTP authentication, order dispatch timeline tracker, and saved shipping addresses. |

---

## 2. Platform Architectural Directives

All pages adhere to the strict **Anti-Slop & Quality Directives** established for Oriental Sports:
1. **Raw Sports Editorial Aesthetic**: Authentic sports campaign + independent sports equipment house + architectural infrastructure studio.
2. **Zero Fabricated Telemetry**: No dummy metrics or tech jargon. Technical labels reflect verified reality (e.g. *Yonex electric constant-pull stringing tensioning*, *USAPA regulation court dimensions*).
3. **Responsive Law**: Every single page is tested across 10 viewports (320px to 2560px 4K ultrawide) with strict zero-horizontal-overflow guarantees (`document.documentElement.scrollWidth === window.innerWidth`).
4. **Commercial E-Commerce Mechanics**: Standardized Indian currency formatting (`₹`), genuine GST invoice generation, clear discount percentages, stock status pills, and minimum 44x44px mobile touch targets.
