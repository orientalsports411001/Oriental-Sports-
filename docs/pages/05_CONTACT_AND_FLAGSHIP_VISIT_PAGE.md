# 05 — Contact & Flagship Visit Page Specification

> **Surfaces**: Contact Page (`/contact`), Flagship Store Visit Guide (`/visit`)  
> **Target Audience**: Pune residents, visiting tournament players, school athletic directors, and society procurement leads.  
> **Key Objective**: Guide customers directly to the physical counter at MG Road Camp, provide real-time operating hours, and offer instant digital communication channels.

---

## 1. Executive Summary & Location Identity
Oriental Sports’ flagship location has served the sporting community of Pune for decades from the heart of the Camp shopping district. The Contact and Visit surfaces bridge digital product discovery with physical counter visits—allowing players to test racquet balance in hand, drop off bats for knocking, or arrange site visits for court construction.

---

## 2. Store Coordinates & Access Details

### Verified Store Address
* **Street**: Shop 247, MG Road
* **Locality**: New Modikhana, Camp
* **City & State**: Pune, Maharashtra
* **PIN Code**: 411001
* **Landmark**: Near Aurora Towers & East Street crossing

### Proximity & Transit Times from Key Pune Hubs
* **Pune Railway Station**: 2.2 km (~7 min drive via Moledina Road)
* **Koregaon Park & Kalyani Nagar**: 4.8 km (~14 min drive via Bund Garden Road)
* **Deccan Gymkhana & FC Road**: 4.5 km (~15 min drive via Tilak Road / Nehru Road)
* **Swargate**: 3.6 km (~12 min drive via Shankar Sheth Road)
* **Pune International Airport (Lohegaon)**: 9.8 km (~25 min drive)

---

## 3. Real-Time Store Schedule Calculator (`STORE_SCHEDULE`)
An automated interactive clock calculates current store status dynamically against Indian Standard Time (`Asia/Kolkata`):

| Day of Week | Operating Window | Live Status Indicator |
| :--- | :--- | :--- |
| **Monday – Saturday** | 10:30 AM – 8:30 PM | Green dot: `Open now until 8:30 PM` |
| **Sunday** | 11:00 AM – 6:00 PM | Green dot: `Open now until 6:00 PM` |
| **Outside Hours** | Closed | Amber/Red dot: `Closed now · Opens at 10:30 AM` |

---

## 4. Section-by-Section Feature Breakdown

### Section 1: Interactive Header & Direct Channels
* **Voice Hotline**: Direct call trigger (`tel:+919890990022`)
* **Display Phone**: `+91 98909 90022`
* **Official Email**: `oriental_sports@outlook.com`
* **WhatsApp Sports Concierge**: One-tap link (`+91 98220 30000` / `+91 98909 90022`) with pre-filled message templates.

### Section 2: Interactive Google Maps Embed
* **Dynamic Map View**: Full-width interactive map centered on Shop 247, MG Road.
* **One-Click Navigation**: `GET DIRECTIONS` button automatically initiates turn-by-turn navigation on Google Maps or Apple Maps based on the user's mobile device.

### Section 3: In-Store Services Drop-Off Checklist
Helps athletes plan their visit effectively:
* **Racquet Stringing Drop-Off**: Drop off racquets by 2:00 PM for same-day evening pickup; select your desired string model and exact tension in lbs at the counter.
* **Cricket Bat Inspection**: Bring bats for physical handle check, edge weight inspection, and knocking-in scheduling.
* **Shoe Sizing & Court Grip Test**: Non-marking badminton and tennis shoes can be tested on indoor surface samples before purchase.

### Section 4: Institutional & Bulk Inquiry Form
A dedicated form for schools, clubs, housing societies, and corporate sports coordinators:
* **Form Fields**:
  - Full Name & Contact Number
  - Email Address
  - Institution / Club / Society Name
  - Nature of Inquiry (`Turnkey Court Construction`, `Bulk Equipment / Ball Supply`, `Annual Stringing Contract`, `Custom Institutional Kit`)
  - Project Details / Timeline
* **Submission Handling**: Form validates locally and transmits directly to the store operations desk, accompanied by an instant WhatsApp notification.

---

## 5. Responsive Mechanics & Touch Accessibility
* **Click-to-Call & Click-to-Chat**: Primary buttons exceed the 48px touch target standard for instant mobile dialing.
* **Zero-Overflow Map Container**: The embedded map dynamically adjusts aspect ratios from 16:9 on widescreen to 4:3 on mobile screens with zero horizontal overflow.
