import { chromium } from 'playwright';

async function captureAllViews() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });

  // Inject authenticated dev admin cookie directly
  await context.addCookies([
    {
      name: 'os_dev_admin',
      value: JSON.stringify({
        id: 'admin-local-master',
        email: 'pratikjadhav8820@gmail.com',
        full_name: 'Pratik Jadhav (Store Operations)',
        role: 'admin',
        created_at: new Date().toISOString(),
      }),
      domain: 'localhost',
      path: '/',
    },
  ]);

  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  console.log('Capturing Dashboard...');
  await page.goto('http://localhost:3001/admin/dashboard', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'admin-final-01-dashboard.png' });
  console.log('✓ Captured admin-final-01-dashboard.png');

  console.log('Capturing Products Catalog...');
  await page.goto('http://localhost:3001/admin/products', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'admin-final-02-products-catalog.png' });
  console.log('✓ Captured admin-final-02-products-catalog.png');

  console.log('Capturing Product Edit (Basic Info)...');
  await page.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'admin-final-03-product-edit-details.png', fullPage: true });
  console.log('✓ Captured admin-final-03-product-edit-details.png');

  console.log('Capturing Orders Register...');
  await page.goto('http://localhost:3001/admin/orders', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'admin-final-04-orders-register.png' });
  console.log('✓ Captured admin-final-04-orders-register.png');

  await browser.close();
  console.log('All final admin screenshots captured successfully!');
}

captureAllViews().catch((err) => {
  console.error(err);
  process.exit(1);
});
