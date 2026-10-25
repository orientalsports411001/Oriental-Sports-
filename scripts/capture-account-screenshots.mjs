import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const artifactDir = 'C:\\Users\\vighnesh jadhav\\.gemini\\antigravity-ide\\brain\\62902760-a731-4c4f-ab1b-72e7270ff8a8';

  const baseUrl = 'http://localhost:3001';

  // 1. Signed-out Desktop view (1440px)
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  // Ensure logged out for clean test
  try {
    await page.goto(`${baseUrl}/account`, { waitUntil: 'networkidle', timeout: 8000 });
  } catch {
    await page.goto(`http://localhost:3000/account`, { waitUntil: 'networkidle' });
  }
  await page.evaluate(() => localStorage.removeItem('oriental_sports_auth_user_v1'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  await page.screenshot({ path: path.join(artifactDir, 'account-portal-desktop-1440.png'), fullPage: false });

  // Set auth session directly in localStorage to capture logged-in dashboard
  await page.evaluate(() => {
    localStorage.setItem(
      'oriental_sports_auth_user_v1',
      JSON.stringify({
        id: 'user-arjun-01',
        phone: '+91 98230 45812',
        email: 'arjun.deshmukh@gmail.com',
        firstName: 'Arjun',
        lastName: 'Deshmukh',
        addresses: [],
        membershipTier: 'Club Athlete Member',
        loyaltyPoints: 120,
      })
    );
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'account-logged-in-desktop-1440.png'), fullPage: false });

  // 2. Signed-out Mobile view (390px)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await mobilePage.goto(`${baseUrl}/account`, { waitUntil: 'networkidle', timeout: 8000 });
  } catch {
    await mobilePage.goto(`http://localhost:3000/account`, { waitUntil: 'networkidle' });
  }
  await mobilePage.evaluate(() => localStorage.removeItem('oriental_sports_auth_user_v1'));
  await mobilePage.reload({ waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(artifactDir, 'account-portal-mobile-390.png'), fullPage: false });

  await browser.close();
  console.log('Account portal screenshots captured successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
