import { chromium } from 'playwright';

async function captureCheckout() {
  const browser = await chromium.launch({ headless: true });

  const mockCartItem = [
    {
      product: {
        id: 'yonex-astrox-99-pro',
        slug: 'yonex-astrox-99-pro',
        name: 'Yonex Astrox 99 Pro Badminton Racket',
        categoryName: 'Badminton',
        price: 18490,
        images: ['/images/catalog/yonex_astrox_99_pro.webp'],
      },
      quantity: 1,
      selectedVariant: 'White Tiger / 4U G5',
    },
  ];

  // Desktop
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000/');
  await desktopPage.evaluate((items) => {
    localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
  }, mockCartItem);
  await desktopPage.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: 'docs/visual-audits/checkout_desktop.png', fullPage: true });
  await desktopContext.close();

  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/');
  await mobilePage.evaluate((items) => {
    localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
  }, mockCartItem);
  await mobilePage.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'docs/visual-audits/checkout_mobile.png', fullPage: true });
  await mobileContext.close();

  await browser.close();
  console.log('Checkout screenshots captured.');
}

captureCheckout().catch(console.error);
