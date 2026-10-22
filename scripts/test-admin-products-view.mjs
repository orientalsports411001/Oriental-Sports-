import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3001/admin/products...');
  await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle', timeout: 30000 });

  const headingText = await page.locator('h1').textContent();
  console.log('Heading:', headingText);

  const skusBadge = await page.locator('text=SKUs').first().textContent();
  console.log('SKUs Badge text:', skusBadge);

  const paginationText = await page.locator('text=/Showing .* of .* products/').textContent().catch(() => 'None');
  console.log('Pagination text:', paginationText);

  const rows = await page.locator('table tbody tr').count();
  console.log('Product rows on page 1:', rows);

  const screenshotPath1 = path.resolve('C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/61075e2e-0fff-47cd-85d1-d07c17dec5f4/.tempmediaStorage/admin_products_page1.png');
  await page.screenshot({ path: screenshotPath1, fullPage: false });
  console.log('Saved screenshot 1 to:', screenshotPath1);

  // Navigate to page 2
  await page.goto('http://localhost:3001/admin/products?page=2', { waitUntil: 'networkidle', timeout: 30000 });
  const rowsP2 = await page.locator('table tbody tr').count();
  console.log('Product rows on page 2:', rowsP2);

  const screenshotPath2 = path.resolve('C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/61075e2e-0fff-47cd-85d1-d07c17dec5f4/.tempmediaStorage/admin_products_page2.png');
  await page.screenshot({ path: screenshotPath2, fullPage: false });
  console.log('Saved screenshot 2 to:', screenshotPath2);

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
