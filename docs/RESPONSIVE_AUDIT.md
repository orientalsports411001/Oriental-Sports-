# Oriental Sports — Responsive & Zero-Overflow Audit

**Audit Date**: 2026-10-27T19:32:14.142Z  
**Target URL**: http://localhost:3000

---

## 1. Viewport Audit Summary

| Viewport Name | Target Dimensions | Document Width | Window Width | Overflow Free? | Screenshot |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **320_mobile_small** | `320x844` | `320px` | `320px` | ✅ PASSED | [`320_mobile_small_homepage.png`](./visual-audits/320_mobile_small_homepage.png) |
| **360_mobile_android** | `360x800` | `360px` | `360px` | ✅ PASSED | [`360_mobile_android_homepage.png`](./visual-audits/360_mobile_android_homepage.png) |
| **390_mobile_iphone14** | `390x844` | `390px` | `390px` | ✅ PASSED | [`390_mobile_iphone14_homepage.png`](./visual-audits/390_mobile_iphone14_homepage.png) |
| **430_mobile_promax** | `430x932` | `430px` | `430px` | ✅ PASSED | [`430_mobile_promax_homepage.png`](./visual-audits/430_mobile_promax_homepage.png) |
| **768_tablet_portrait** | `768x1024` | `768px` | `768px` | ✅ PASSED | [`768_tablet_portrait_homepage.png`](./visual-audits/768_tablet_portrait_homepage.png) |
| **1024_tablet_desktop** | `1024x768` | `1024px` | `1024px` | ✅ PASSED | [`1024_tablet_desktop_homepage.png`](./visual-audits/1024_tablet_desktop_homepage.png) |
| **1280_laptop_small** | `1280x800` | `1280px` | `1280px` | ✅ PASSED | [`1280_laptop_small_homepage.png`](./visual-audits/1280_laptop_small_homepage.png) |
| **1440_desktop_standard** | `1440x900` | `1440px` | `1440px` | ✅ PASSED | [`1440_desktop_standard_homepage.png`](./visual-audits/1440_desktop_standard_homepage.png) |
| **1920_ultrawide** | `1920x1080` | `1920px` | `1920px` | ✅ PASSED | [`1920_ultrawide_homepage.png`](./visual-audits/1920_ultrawide_homepage.png) |
| **2560_ultrawide_4k** | `2560x1440` | `2560px` | `2560px` | ✅ PASSED | [`2560_ultrawide_4k_homepage.png`](./visual-audits/2560_ultrawide_4k_homepage.png) |

---

## 2. Hero Collision Audit

Every slide, at every viewport above plus short browser windows: copy stays inside the hero,
actions clear the tab bar by at least 16px, and the hero height is the same on every slide.

| Viewport | Dimensions | Result |
| :--- | :--- | :--- |
| **320_mobile_small** | `320x844` | ✅ PASSED |
| **360_mobile_android** | `360x800` | ✅ PASSED |
| **390_mobile_iphone14** | `390x844` | ✅ PASSED |
| **430_mobile_promax** | `430x932` | ✅ PASSED |
| **768_tablet_portrait** | `768x1024` | ✅ PASSED |
| **1024_tablet_desktop** | `1024x768` | ✅ PASSED |
| **1280_laptop_small** | `1280x800` | ✅ PASSED |
| **1440_desktop_standard** | `1440x900` | ✅ PASSED |
| **1920_ultrawide** | `1920x1080` | ✅ PASSED |
| **2560_ultrawide_4k** | `2560x1440` | ✅ PASSED |
| **320_short** | `320x568` | ✅ PASSED |
| **360_short** | `360x640` | ✅ PASSED |
| **390_safari** | `390x664` | ✅ PASSED |
| **1024_short** | `1024x600` | ✅ PASSED |
| **1280_short** | `1280x600` | ✅ PASSED |
| **1366_laptop** | `1366x657` | ✅ PASSED |
| **1440_browser** | `1440x760` | ✅ PASSED |
| **1920_browser_scaled** | `1817x700` | ✅ PASSED |

---

## 3. Assertion Verification
- **Strict Law**: `document.documentElement.scrollWidth === window.innerWidth` strictly enforced.
- **Root Container Overflow Hiding**: Prohibited. Layout components intrinsically bounded to viewport.
