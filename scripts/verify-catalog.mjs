import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function verifyCatalog() {
  console.log(`\n🧪 Running Comprehensive Product Catalog Verification at ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Visit /shop
    console.log('1. Checking /shop page...');
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
    const productCards = await page.locator('.product-card').count();
    console.log(`   Found ${productCards} product cards on /shop`);
    if (productCards < 20) throw new Error(`Expected >= 20 product cards, found ${productCards}`);

    // 2. Filter by Cricket
    console.log('2. Filtering by Cricket...');
    await page.goto(`${BASE_URL}/shop?category=cricket`, { waitUntil: 'networkidle' });
    const cricketCards = await page.locator('.product-card').count();
    console.log(`   Found ${cricketCards} cricket product cards`);
    if (cricketCards < 5) throw new Error(`Expected at least 5 cricket products`);

    // 3. Check Cricket Bat PDP variant prices
    console.log('3. Checking SG Scorer Classic PDP & variant pricing...');
    await page.goto(`${BASE_URL}/product/sg-scorer-classic-cricket-bat`, { waitUntil: 'networkidle' });
    const pdpTitle = await page.locator('.pdp-title').innerText();
    console.log(`   PDP Title: ${pdpTitle}`);
    if (!pdpTitle.includes('SG Scorer Classic')) throw new Error('Incorrect PDP title');

    const priceText = await page.locator('.pdp-price-now').innerText();
    console.log(`   Initial PDP Price: ${priceText}`);

    // Click Size F variant chip and verify price updates to ₹3,499
    const sizeFChip = page.locator('.pdp-choices button:has-text("Size F")');
    if (await sizeFChip.count() > 0) {
      await sizeFChip.click();
      await page.waitForTimeout(300);
      const updatedPrice = await page.locator('.pdp-price-now').innerText();
      console.log(`   Updated PDP Price after selecting Size F: ${updatedPrice}`);
      if (!updatedPrice.includes('3,499')) throw new Error(`Expected price to update to ₹3,499, got ${updatedPrice}`);
    }

    // 4. Test Add to Bag and Cart subtotal
    console.log('4. Testing Add to Bag...');
    await page.locator('.pdp-add').click();
    await page.waitForTimeout(800);
    const drawerSubtotal = await page.locator('.drawer-subtotal strong').innerText();
    console.log(`   Cart Drawer Subtotal: ${drawerSubtotal}`);
    if (!drawerSubtotal.includes('3,499')) throw new Error(`Cart Drawer Subtotal expected ₹3,499, got ${drawerSubtotal}`);

    // 5. Test /shop?category=football
    console.log('5. Checking Football category...');
    await page.goto(`${BASE_URL}/shop?category=football`, { waitUntil: 'networkidle' });
    const fbCards = await page.locator('.product-card').count();
    console.log(`   Found ${fbCards} football product cards (Expected 8)`);
    if (fbCards !== 8) throw new Error(`Expected 8 football products, found ${fbCards}`);

    // 6. Test /shop?category=badminton
    console.log('6. Checking Badminton category...');
    await page.goto(`${BASE_URL}/shop?category=badminton`, { waitUntil: 'networkidle' });
    const badmCards = await page.locator('.product-card').count();
    console.log(`   Found ${badmCards} badminton product cards (Expected 17: 9 rackets + 8 shuttlecocks)`);
    if (badmCards !== 17) throw new Error(`Expected 17 badminton products, found ${badmCards}`);

    // 7. Test Search
    console.log('7. Testing search query "Mavis-350"...');
    await page.goto(`${BASE_URL}/search?q=Mavis-350`, { waitUntil: 'networkidle' });
    const searchCards = await page.locator('.product-card').count();
    console.log(`   Found ${searchCards} matching products for "Mavis-350"`);
    if (searchCards === 0) throw new Error('Search failed for Mavis-350');

    // 8. Mobile viewport check
    console.log('8. Testing mobile responsive layout (390px)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    console.log(`   Mobile 390px: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}`);
    if (scrollWidth > innerWidth) throw new Error(`Horizontal overflow detected at 390px: scrollWidth ${scrollWidth} > innerWidth ${innerWidth}`);

    console.log('\n🎉 ALL CATALOG AND E-COMMERCE TESTS PASSED SUCCESSFULLY!\n');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Catalog verification failed:', err);
    await browser.close();
    process.exit(1);
  }
}

verifyCatalog();
