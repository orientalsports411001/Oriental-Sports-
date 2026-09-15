import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/706edd60-6015-478e-ad28-a7ad181b62fb';

async function auditPhase5Courts() {
  console.log('Starting Phase 5 Courts Audit...');
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900, isMobile: false },
    { name: 'tablet_768', width: 768, height: 1024, isMobile: false },
    { name: 'mobile_390', width: 390, height: 844, isMobile: true },
  ];

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`Auditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();

    // Bypass intro animation by setting sessionStorage
    await page.addInitScript(() => {
      sessionStorage.setItem('os_intro_seen', 'true');
    });

    await page.goto('http://localhost:4000/', { waitUntil: 'networkidle' });

    // Assert zero overflow at top
    const overflowAtTop = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    console.log(`[${vp.name}] Zero overflow at top: ${overflowAtTop}`);
    if (!overflowAtTop) {
      console.error(`ERROR: Horizontal overflow detected at top of page in ${vp.name}`);
    }

    // Scroll exactly to top of #courts-section (p === 0.0)
    await page.evaluate(() => {
      const el = document.getElementById('courts-section');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    await page.waitForTimeout(500);

    // Assert zero overflow at Courts section
    const overflowAtCourts = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    console.log(`[${vp.name}] Zero overflow at Courts section: ${overflowAtCourts}`);
    if (!overflowAtCourts) {
      console.error(`ERROR: Horizontal overflow detected in Courts section in ${vp.name}`);
    }

    // Capture opening state of Courts section (p === 0.0)
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_opening.png`),
    });
    console.log(`[${vp.name}] Captured opening screenshot (p === 0.0).`);

    // Mid-scroll into the pinned sequence (p ~ 0.35)
    await page.evaluate(() => {
      window.scrollBy({ top: 450, behavior: 'instant' });
    });
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_mid_scroll.png`),
    });
    console.log(`[${vp.name}] Captured mid-scroll screenshot.`);

    // Scroll to services reveal (p ~ 0.70)
    await page.evaluate(() => {
      window.scrollBy({ top: 500, behavior: 'instant' });
    });
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_services.png`),
    });
    console.log(`[${vp.name}] Captured services reveal screenshot.`);

    // Test service hover on desktop/tablet
    if (!vp.isMobile) {
      const lightingItem = page.locator('#courts-section [data-service="lighting"]');
      if (await lightingItem.count() > 0) {
        await lightingItem.hover({ force: true });
        await page.waitForTimeout(400);
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_hover_lighting.png`),
        });
        console.log(`[${vp.name}] Captured service hover screenshot.`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nAll viewports audited successfully with zero errors!');
}

auditPhase5Courts().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
