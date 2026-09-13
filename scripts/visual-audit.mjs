import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const AUDIT_DIR = path.resolve('docs/visual-audits');
if (!fs.existsSync(AUDIT_DIR)) {
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
}

async function runVisualAudit() {
  console.log('🚀 Starting Oriental Sports Playwright Visual & Network Audit...');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  const failedRequests = [];
  const consoleErrors = [];

  page.on('requestfailed', (request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || 'Failed to load',
    });
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Desktop Homepage
    console.log('📸 1. Capturing Desktop Homepage (1440x900)...');
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(AUDIT_DIR, '01_homepage_desktop_1440.png') });
    await page.screenshot({ path: path.join(AUDIT_DIR, '01_homepage_desktop_full.png'), fullPage: true });

    // 2. Hover Navigation Mega Menu
    console.log('📸 2. Hovering SHOP Navigation Mega Menu...');
    const shopNav = page.locator('nav a:has-text("SHOP"), button:has-text("SHOP"), a:has-text("SHOP")').first();
    if (await shopNav.isVisible()) {
      await shopNav.hover();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(AUDIT_DIR, '02_mega_menu_hover.png') });
    }

    // 3. Shop by Sport Accordion Interaction
    console.log('📸 3. Testing Shop by Sport Kinetic Accordion...');
    const pickleballCard = page.locator('a[href*="/shop/pickleball"]').first();
    if (await pickleballCard.isVisible()) {
      await pickleballCard.scrollIntoViewIfNeeded();
      await pickleballCard.hover();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(AUDIT_DIR, '03_shop_by_sport_hover.png') });
    }

    // 4. Featured Gear Product Hover & Quick Add
    console.log('📸 4. Testing Featured Gear Product Hover...');
    const productCard = page.locator('.brutalist-product-card, .product-card').first();
    if (await productCard.isVisible()) {
      await productCard.scrollIntoViewIfNeeded();
      await productCard.hover();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(AUDIT_DIR, '04_product_card_hover.png') });
    }

    // 5. Open Search Command Palette (CMD+K)
    console.log('📸 5. Testing Search Command Palette...');
    const searchBtn = page.locator('button[aria-label*="Search"], button:has-text("Search"), button:has(svg)').first();
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(AUDIT_DIR, '05_search_palette_active.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 6. Open Slide-out Cart Drawer
    console.log('📸 6. Testing Cart Drawer...');
    const bagBtn = page.locator('button:has-text("BAG"), button[aria-label*="Bag"]').first();
    if (await bagBtn.isVisible()) {
      await bagBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(AUDIT_DIR, '06_cart_drawer_active.png') });
      const closeBtn = page.locator('button[aria-label="Close Bag"]').first();
      if (await closeBtn.isVisible()) await closeBtn.click();
    }

    // 7. Mobile Viewport (390x844 - iPhone 14 standard)
    console.log('📸 7. Capturing Mobile Viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(AUDIT_DIR, '07_homepage_mobile_390.png') });
    await page.screenshot({ path: path.join(AUDIT_DIR, '07_homepage_mobile_full.png'), fullPage: true });

    // 8. Shop Catalog Page
    console.log('📸 8. Testing Shop Catalog Page...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3001/shop', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '08_shop_catalog_1440.png') });

    // 9. Product Detail Page
    console.log('📸 9. Testing Product Detail Page (Toray Carbon Spotlight)...');
    await page.goto('http://localhost:3001/product/oriental-pro-carbon-pickleball-paddle', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '09_product_detail_1440.png') });

    // 10. Courts Showcase Page
    console.log('📸 10. Testing Courts Showcase Page...');
    await page.goto('http://localhost:3001/courts', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '10_courts_page_1440.png') });

    // 11. Court Projects Portfolio Page
    console.log('📸 11. Testing Court Projects Portfolio Page...');
    await page.goto('http://localhost:3001/courts/projects', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '11_court_projects_1440.png') });

    // 12. Court Project Detail Page (Koregaon Park)
    console.log('📸 12. Testing Court Project Detail Page...');
    await page.goto('http://localhost:3001/courts/koregaon-park-pickleball-club', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '12_court_project_detail_1440.png') });

    // 13. Sports Bag & Checkout Page
    console.log('📸 13. Testing Sports Bag & Checkout Page...');
    await page.goto('http://localhost:3001/cart', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '13_cart_page_1440.png') });

    // 14. Visit Flagship Store Page (Camp, Pune)
    console.log('📸 14. Testing Visit Store Page...');
    await page.goto('http://localhost:3001/visit', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '14_visit_page_1440.png') });

    // 15. About Oriental Sports Archive Page
    console.log('📸 15. Testing About Heritage Page...');
    await page.goto('http://localhost:3001/about', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '15_about_page_1440.png') });

    // 16. Search Discovery Results Page
    console.log('📸 16. Testing Search Results Page (Query: pickleball)...');
    await page.goto('http://localhost:3001/search?q=pickleball', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '16_search_page_1440.png') });

    // 17. Athlete Account & Services Page
    console.log('📸 17. Testing Athlete Account Hub...');
    await page.goto('http://localhost:3001/account', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(AUDIT_DIR, '17_account_page_1440.png') });

    console.log('✅ All visual audit screenshots captured successfully in docs/visual-audits/');
  } catch (err) {
    console.error('❌ Error during visual audit:', err);
  } finally {
    await browser.close();
  }

  // Report Network & Console Audit Results
  console.log('\n--- NETWORK & CONSOLE AUDIT SUMMARY ---');
  const imageFails = failedRequests.filter((r) => r.url.match(/\.(png|jpg|jpeg|webp|svg)/i));
  console.log(`Broken Image Requests: ${imageFails.length}`);
  if (imageFails.length > 0) {
    console.log('Failed image URLs:', imageFails);
  }
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console Errors:', consoleErrors);
  }
}

runVisualAudit();
