import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const artifactDir = 'C:\\Users\\vighnesh jadhav\\.gemini\\antigravity-ide\\brain\\62902760-a731-4c4f-ab1b-72e7270ff8a8';

  // Desktop view
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll to product grid
  await page.evaluate(() => {
    const grid = document.querySelector('.product-grid');
    if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -80);
  });
  await page.waitForTimeout(600);

  // Take resting card grid screenshot
  await page.screenshot({ path: path.join(artifactDir, 'product-cards-desktop-1440.png'), fullPage: false });

  // Hover over the first card to show the quick size drawer
  const firstCard = await page.$('.ecom-card, .product-card');
  if (firstCard) {
    await firstCard.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'product-card-hover-desktop.png'), fullPage: false });
  }

  // Mobile 390px view
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.evaluate(() => {
    const grid = document.querySelector('.product-grid');
    if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -60);
  });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(artifactDir, 'product-cards-mobile-390.png'), fullPage: false });

  await browser.close();
  console.log('Product card screenshots captured successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
