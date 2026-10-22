import { chromium } from 'playwright';
import fs from 'fs';

async function extractBuyurGallery() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 1200 },
  });
  const page = await context.newPage();

  console.log('Navigating to Buyur project...');
  await page.goto('https://www.behance.net/gallery/244093753/Buyur-Admin-Superadmin-Dashboards', {
    waitUntil: 'networkidle',
    timeout: 45000,
  }).catch(e => console.log('Err:', e.message));

  await page.waitForTimeout(4000);

  // Extract all high-res project image URLs
  const imgUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src'));
    return images.filter(url => url && (url.includes('mir-s3-cdn-cf.behance.net/project_modules') || url.includes('behance.net/projects')));
  });

  console.log('Found project images:', imgUrls.length);
  fs.writeFileSync('buyur-images.json', JSON.stringify(imgUrls, null, 2));

  // Screenshot top and middle of project
  await page.screenshot({ path: 'buyur-full-page-1.png' });
  await page.evaluate(() => window.scrollBy(0, 1500));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'buyur-full-page-2.png' });

  await browser.close();
  console.log('Done capturing Buyur details.');
}

extractBuyurGallery();
