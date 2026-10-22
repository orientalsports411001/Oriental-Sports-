import { chromium } from 'playwright';

async function testCultUi() {
  const browser = await chromium.launch();

  // Test 1: Mobile / Narrow Split View (390px) - exactly what user had in screenshot!
  console.log('Testing 390px mobile view...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  await mobileContext.addCookies([
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
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'cult-ui-mobile-390.png' });
  console.log('✓ Captured cult-ui-mobile-390.png');

  // Test 2: Tablet View (768px)
  console.log('Testing 768px tablet view...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  await tabletContext.addCookies([
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
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1000);
  await tabletPage.screenshot({ path: 'cult-ui-tablet-768.png' });
  console.log('✓ Captured cult-ui-tablet-768.png');

  // Test 3: Desktop View (1440px)
  console.log('Testing 1440px desktop view...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  await desktopContext.addCookies([
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
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3001/admin/products/prod-crick-sg-scorer/edit', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: 'cult-ui-desktop-1440.png' });
  console.log('✓ Captured cult-ui-desktop-1440.png');

  await browser.close();
  console.log('ALL VIEWPORT TESTS COMPLETE!');
}

testCultUi().catch((err) => {
  console.error(err);
  process.exit(1);
});
