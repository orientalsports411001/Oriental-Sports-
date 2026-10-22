import { chromium } from 'playwright';

async function runAudit() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  await context.addCookies([
    {
      name: 'os_dev_admin',
      value: JSON.stringify({
        id: 'admin-local-master',
        email: 'pratikjadhav8820@gmail.com',
        role: 'admin',
      }),
      domain: 'localhost',
      path: '/',
    },
  ]);

  const page = await context.newPage();

  // 1. Dashboard
  console.log('Capturing Dashboard...');
  await page.goto('http://localhost:3001/admin/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit-dashboard-1440.png' });

  // 2. Products Catalog
  console.log('Capturing Products Catalog...');
  await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit-products-1440.png' });

  // 3. Product Edit Desktop
  console.log('Capturing Product Edit Desktop...');
  await page.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit-edit-desktop-1440.png' });

  // 4. Product Edit Mobile (390px)
  console.log('Capturing Product Edit Mobile (390px)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'audit-edit-mobile-390.png' });

  // 5. Orders Register
  console.log('Capturing Orders Register...');
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('http://localhost:3001/admin/orders', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'audit-orders-1440.png' });

  await browser.close();
  console.log('✓ All visual audit screenshots captured successfully!');
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
