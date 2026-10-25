# 02 — About Us Page Specification

> **Surface**: About Us (`/about`)  
> **Key Objective**: Communicate Oriental Sports’ multi-decade legacy in Camp, Pune, establishing authentic credibility as an independent sports house and civic sports builder.

---

## 1. Executive Purpose & Brand Narrative
The About page articulates the heritage and operational scope of Oriental Sports. The copy adheres strictly to verified facts—rejecting generic AI buzzwords in favor of precise, authentic descriptions of counter retail, workshop services, and civic infrastructure projects across Maharashtra.

---

## 2. Section Breakdown

### Section 1: Page Header & Hero Lead
* **Breadcrumb Navigation**: `Home / About`
* **Editorial Headline**: `ROOTED IN CAMP. BUILT FOR THE GAME.`
* **Subheadline**: *"Pune’s sports house. Gear for the game. Courts for the city."*
* **Full-Width Feature Photography**: Authentic athletic studio and workshop shot showcasing equipment preparation and court construction.

### Section 2: The Heritage Narrative
* **Historical Context**: Independent sports goods counter operating at Shop 247, MG Road, New Modikhana, Camp, Pune.
* **Core Philosophy**: *"Gear is picked up and tried in the hand before it is bought."*
  - Athletes, coaches, school directors, and recreational players receive direct, personalized advice from master technicians.
  - Equipment is not shipped raw off a warehouse shelf; racquets are custom-strung to player-specified tension and cricket bats are hand-knocked before leaving the counter.

### Section 3: The Three Operational Pillars
1. **The Camp Retail House**:
   - Comprehensive inventory covering cricket, badminton, football, tennis, pickleball, gym equipment, and recreation tables.
   - Genuine manufacturer warranties and official GST invoices on all equipment.
2. **Turnkey Court Engineering**:
   - In-house sports infrastructure division handling end-to-end design and execution: laser earth-grading, asphalt/concrete sub-bases, multi-layer cushion acrylics, perimeter chainlink fencing, LED floodlighting, and regulation line marking.
3. **Institutional & Academy Supply**:
   - Official equipment, match ball, and team apparel partner to premier Pune clubs (Deccan Gymkhana, Poona Club, PYC Hindu Gymkhana) and prominent educational institutions across Maharashtra.

### Section 4: Workshop Craftsmanship Spotlight
* **Computerized Racket Stringing**:
  - Calibrated constant-pull electronic stringing machines.
  - Precision tension settings from 20 lbs (recreational touch) to 32+ lbs (elite tournament smash).
  - Four-knot tournament stringing patterns using genuine Yonex, BG65, Nanogy, and Victor strings.
* **Cricket Bat Preparation**:
  - Raw willow seasoning with linseed oil.
  - Hand knocking-in with hardwood mallets (edge softening and toe compaction).
  - Premium anti-scuff protection sheet application and fiberglass edge tape reinforcement.

### Section 5: Visit Call-to-Action Band
* **Headline**: *"Come and see us."*
* **Address**: Shop 247, MG Road, New Modikhana, Camp, Pune 411001.
* **Interactive Actions**:
  - `PLAN YOUR VISIT →` (Deep-links to `/visit`)
  - `CALL STORE` (`+91 98909 90022`)
  - `WHATSAPP DESK` (`+91 98220 30000`)

---

## 3. Technical Specifications
- **Component File**: `src/pages/AboutPage.tsx`
- **Data Source**: `src/data/storeInfo.ts` (`BRAND_STORY`, `STORE_INFO`, `PILLARS`)
- **Animations**: Staggered scroll reveals using Framer Motion (`Reveal`, `StaggerItem`) with subtle opacity and vertical translation.
