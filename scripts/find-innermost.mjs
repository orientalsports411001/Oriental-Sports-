import { chromium } from 'playwright';

async function checkInnermost() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

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
    },
  ];

  await page.goto('http://localhost:3000/');
  await page.evaluate((items) => {
    localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
  }, mockCartItem);
  await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });

  const leafCulprits = await page.evaluate(() => {
    const culprits = [];
    const all = document.querySelectorAll('.checkout-form-column *');
    for (const el of all) {
      if (el.children.length === 0 && el.getBoundingClientRect().width > 358) {
        culprits.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          width: el.getBoundingClientRect().width,
          text: (el.textContent || el.getAttribute('placeholder') || '').slice(0, 30),
        });
      }
    }
    return culprits;
  });

  console.log(JSON.stringify(leafCulprits, null, 2));
  await browser.close();
}

checkInnermost().catch(console.error);
