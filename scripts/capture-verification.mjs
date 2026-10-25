import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT_DIR = path.resolve('artifacts/verification');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440px verification
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Hero Section
    const hero = await page.$('.hero');
    if (hero) await hero.screenshot({ path: path.join(OUT_DIR, 'redesign-hero-1440.png') });

    // Marquee & Ticker
    const ticker = await page.$('.marquee-ticker');
    if (ticker) {
      await ticker.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await ticker.screenshot({ path: path.join(OUT_DIR, 'redesign-marquee-1440.png') });
    }

    // Protected Gallery 1 (Sport Index)
    const sportIndex = await page.$('.sport-index');
    if (sportIndex) {
      await sportIndex.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await sportIndex.screenshot({ path: path.join(OUT_DIR, 'protected-gallery-1-sport-index-1440.png') });
    }

    // Gear Edit (Spotlight Cards)
    const gear = await page.$('.gear-edit');
    if (gear) {
      await gear.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await gear.screenshot({ path: path.join(OUT_DIR, 'redesign-gear-edit-1440.png') });
    }

    // Protected Gallery 2 (Orbital Gallery)
    const orbit = await page.$('.orbit-stage');
    if (orbit) {
      await orbit.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await orbit.screenshot({ path: path.join(OUT_DIR, 'protected-gallery-2-orbit-1440.png') });
    }

    // Courts Chapter
    const courts = await page.$('.courts-chapter');
    if (courts) {
      await courts.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await courts.screenshot({ path: path.join(OUT_DIR, 'redesign-courts-1440.png') });
    }

    // Store Chapter
    const store = await page.$('.store-chapter');
    if (store) {
      await store.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await store.screenshot({ path: path.join(OUT_DIR, 'redesign-store-1440.png') });
    }

    // Footer
    const footer = await page.$('.site-footer');
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await footer.screenshot({ path: path.join(OUT_DIR, 'redesign-footer-1440.png') });
    }

    await page.close();
  }

  // 2. Mobile 390px verification
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const sportIndex = await page.$('.sport-index');
    if (sportIndex) await sportIndex.screenshot({ path: path.join(OUT_DIR, 'protected-gallery-1-sport-index-390.png') });

    const orbit = await page.$('.orbit-stage');
    if (orbit) {
      await orbit.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await orbit.screenshot({ path: path.join(OUT_DIR, 'protected-gallery-2-orbit-390.png') });
    }

    const bottomNav = await page.$('.bottom-nav-dock');
    if (bottomNav) await bottomNav.screenshot({ path: path.join(OUT_DIR, 'redesign-bottom-nav-390.png') });

    await page.close();
  }

  // 3. Shop & PDP verification
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'redesign-shop-page-1440.png'), fullPage: false });

    await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'redesign-checkout-page-1440.png'), fullPage: false });

    await page.close();
  }

  console.log('✅ All verification screenshots saved to artifacts/verification/');
  await browser.close();
}

capture();
