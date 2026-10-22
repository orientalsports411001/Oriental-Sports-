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

  // 1. Dashboard Desktop (1440)
  console.log('Capturing Dashboard (1440px)...');
  await page.goto('http://localhost:3001/admin/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'buyur-audit-dashboard-1440.png' });

  // 2. Dashboard Mobile (390)
  console.log('Capturing Dashboard (390px)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'buyur-audit-dashboard-390.png' });

  // 3. Products Desktop (1440)
  console.log('Capturing Products Catalog (1440px)...');
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'buyur-audit-products-1440.png' });

  // 4. Product Edit Desktop (1440)
  console.log('Capturing Product Edit (1440px)...');
  await page.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'buyur-audit-edit-1440.png' });

  // 5. Orders Register Desktop (1440)
  console.log('Capturing Orders Register (1440px)...');
  await page.goto('http://localhost:3001/admin/orders', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'buyur-audit-orders-1440.png' });

  await browser.close();
  console.log('✓ All visual audit screenshots captured successfully!');
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
