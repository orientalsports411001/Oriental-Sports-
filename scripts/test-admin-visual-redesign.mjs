import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await context.newPage();

  console.log('Capturing Products page...');
  await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle', timeout: 30000 });
  const p1 = path.resolve('C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/61075e2e-0fff-47cd-85d1-d07c17dec5f4/.tempmediaStorage/admin_redesign_products.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log('Saved:', p1);

  console.log('Capturing Product Edit page...');
  await page.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle', timeout: 30000 });
  const p2 = path.resolve('C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/61075e2e-0fff-47cd-85d1-d07c17dec5f4/.tempmediaStorage/admin_redesign_edit.png');
  await page.screenshot({ path: p2, fullPage: false });
  console.log('Saved:', p2);

  console.log('Capturing Dashboard page...');
  await page.goto('http://localhost:3001/admin/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
  const p3 = path.resolve('C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/61075e2e-0fff-47cd-85d1-d07c17dec5f4/.tempmediaStorage/admin_redesign_dashboard.png');
  await page.screenshot({ path: p3, fullPage: false });
  console.log('Saved:', p3);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
