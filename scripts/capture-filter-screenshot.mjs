import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take a full screenshot
  const artifactDir = 'C:\\Users\\vighnesh jadhav\\.gemini\\antigravity-ide\\brain\\62902760-a731-4c4f-ab1b-72e7270ff8a8';
  const outPath = path.join(artifactDir, 'filter-section-desktop-1440.png');
  await page.screenshot({ path: outPath, fullPage: false });

  // Mobile drawer test
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);

  // Click filter button to open mobile drawer
  const filterBtn = await mobilePage.$('.shop-filter-btn');
  if (filterBtn) {
    await filterBtn.click();
    await mobilePage.waitForTimeout(600);
    const mobileOutPath = path.join(artifactDir, 'filter-drawer-mobile-390.png');
    await mobilePage.screenshot({ path: mobileOutPath, fullPage: false });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
