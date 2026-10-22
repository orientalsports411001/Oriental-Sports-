import { chromium } from 'playwright';

async function testElevatedUi() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
  });
  const page = await context.newPage();

  // 1. Login
  console.log('Logging in...');
  await page.goto('http://localhost:3001/admin/login');
  await page.click('button:has-text("Enter Operations Console")');
  await page.waitForURL('**/admin/dashboard');

  // 2. Open Product Edit
  console.log('Navigating to product edit page...');
  await page.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'elevated-01-product-edit-details.png', fullPage: true });
  console.log('Captured elevated-01-product-edit-details.png');

  // Click on Pricing tab
  console.log('Clicking Pricing tab...');
  await page.click('button:has-text("Pricing & Inventory")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'elevated-02-pricing-tab.png' });
  console.log('Captured elevated-02-pricing-tab.png');

  // Click on Media tab
  console.log('Clicking Media tab...');
  await page.click('button:has-text("Media Gallery")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'elevated-03-media-tab.png' });
  console.log('Captured elevated-03-media-tab.png');

  // Click on SEO tab
  console.log('Clicking SEO tab...');
  await page.click('button:has-text("Search & Social SEO")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'elevated-04-seo-tab.png' });
  console.log('Captured elevated-04-seo-tab.png');

  await browser.close();
  console.log('All elevated UI screenshots captured successfully.');
}

testElevatedUi().catch((err) => {
  console.error(err);
  process.exit(1);
});
