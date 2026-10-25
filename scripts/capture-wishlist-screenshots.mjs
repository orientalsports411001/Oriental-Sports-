import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const artifactDir = 'C:\\Users\\vighnesh jadhav\\.gemini\\antigravity-ide\\brain\\62902760-a731-4c4f-ab1b-72e7270ff8a8';
  const baseUrl = 'http://localhost:3001';

  // 1. Wishlist Populated (Desktop 1440px)
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  // Set sample wishlist items in localStorage
  await page.goto(`${baseUrl}/shop`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    // Add 4 diverse items to wishlist
    localStorage.setItem(
      'oriental_sports_wishlist_v1',
      JSON.stringify(['prod-crick-sg-scorer', 'prod-bad-01', 'prod-crick-sg-sierra', 'prod-fb-08'])
    );
  });

  await page.goto(`${baseUrl}/wishlist`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'wishlist-populated-desktop-1440.png'), fullPage: false });

  // 2. Wishlist Populated (Mobile 390px)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(`${baseUrl}/shop`, { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => {
    localStorage.setItem(
      'oriental_sports_wishlist_v1',
      JSON.stringify(['prod-crick-sg-scorer', 'prod-bad-01', 'prod-fb-08'])
    );
  });
  await mobilePage.goto(`${baseUrl}/wishlist`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(artifactDir, 'wishlist-populated-mobile-390.png'), fullPage: false });

  // 3. Wishlist Empty State (Desktop 1440px)
  await page.evaluate(() => {
    localStorage.setItem('oriental_sports_wishlist_v1', JSON.stringify([]));
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'wishlist-empty-desktop-1440.png'), fullPage: false });

  await browser.close();
  console.log('Wishlist screenshots captured successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
