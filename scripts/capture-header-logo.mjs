import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT_DIR = path.resolve('artifacts/verification');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Header 1440px
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.addInitScript(() => {
      sessionStorage.setItem('oriental_intro_shown', 'true');
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const header = await page.$('.site-header');
    if (header) {
      await header.screenshot({ path: path.join(OUT_DIR, 'header-logo-desktop-1440.png') });
      console.log('✅ Captured header-logo-desktop-1440.png');
    }

    const footer = await page.$('.site-footer');
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await footer.screenshot({ path: path.join(OUT_DIR, 'footer-logo-desktop-1440.png') });
      console.log('✅ Captured footer-logo-desktop-1440.png');
    }

    await page.close();
  }

  // 2. Mobile Header 390px
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    await page.addInitScript(() => {
      sessionStorage.setItem('oriental_intro_shown', 'true');
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const header = await page.$('.site-header');
    if (header) {
      await header.screenshot({ path: path.join(OUT_DIR, 'header-logo-mobile-390.png') });
      console.log('✅ Captured header-logo-mobile-390.png');
    }

    await page.close();
  }

  // 3. Option 2: White Background Badge
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.addInitScript(() => {
      sessionStorage.setItem('oriental_intro_shown', 'true');
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const img = document.querySelector('.site-header .oriental-logo');
      if (img) {
        img.src = '/brand/oriental-sports-wordmark.png';
        const parent = img.parentElement;
        const span = document.createElement('span');
        span.className = 'logo-badge';
        parent.replaceChild(span, img);
        span.appendChild(img);
      }
    });

    const header = await page.$('.site-header');
    if (header) {
      await header.screenshot({ path: path.join(OUT_DIR, 'header-logo-badge-desktop-1440.png') });
      console.log('✅ Captured header-logo-badge-desktop-1440.png');
    }

    await page.close();
  }

  await browser.close();
}

capture();

