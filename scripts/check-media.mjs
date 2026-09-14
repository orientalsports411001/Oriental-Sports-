import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function checkMedia() {
  console.log(`\n🔍 Checking Media & Asset Integrity at ${BASE_URL}...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const failedRequests = [];
  const consoleErrors = [];

  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 20000 });
    console.log(`  HTTP Response Status: ${response?.status()}`);

    // Scroll down to trigger lazy loading across all sections
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Wait for all lazy images to finish loading
    await page.waitForTimeout(1500);

    // Evaluate all <img> elements on the rendered page
    const imageReport = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map((img) => ({
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
      }));
    });

    console.log(`\n📊 Total rendered images inspected: ${imageReport.length}`);

    const brokenImages = imageReport.filter(
      (img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0
    );

    if (brokenImages.length > 0) {
      console.error(`❌ Found ${brokenImages.length} broken image(s):`);
      brokenImages.forEach((img, i) => {
        console.error(`  [${i + 1}] src: ${img.src} (naturalWidth: ${img.naturalWidth}, alt: "${img.alt}")`);
      });
    } else {
      console.log(`✅ All ${imageReport.length} rendered images loaded successfully with natural dimensions!`);
    }

    if (failedRequests.length > 0) {
      console.warn(`⚠️ Failed Network Requests (${failedRequests.length}):`);
      failedRequests.forEach((req) => console.warn(`  - ${req.url}: ${req.failure}`));
    } else {
      console.log(`✅ 0 failed network requests.`);
    }

    if (consoleErrors.length > 0) {
      console.warn(`⚠️ Console Errors (${consoleErrors.length}):`);
      consoleErrors.forEach((err) => console.warn(`  - ${err}`));
    } else {
      console.log(`✅ 0 browser console errors.`);
    }

    await browser.close();

    if (brokenImages.length > 0) {
      process.exit(1);
    } else {
      console.log(`\n🎉 Media Integrity Audit Passed with 0 broken assets!\n`);
      process.exit(0);
    }
  } catch (err) {
    console.error('Audit run error:', err);
    await browser.close();
    process.exit(1);
  }
}

checkMedia();
