import { chromium } from 'playwright';

async function checkOverflow() {
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

  const rootCulprits = await page.evaluate(() => {
    const docWidth = window.innerWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const culprits = [];

    const all = document.querySelectorAll('body *');
    for (const el of all) {
      if (el.scrollWidth > docWidth || el.offsetWidth > docWidth) {
        culprits.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          offsetWidth: el.offsetWidth,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          text: (el.textContent || '').trim().slice(0, 30),
        });
      }
    }
    return { docWidth, scrollWidth, culprits: culprits.slice(0, 10) };
  });

  console.log(JSON.stringify(rootCulprits, null, 2));
  await browser.close();
}

checkOverflow().catch(console.error);
