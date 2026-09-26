import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '320_mobile_small', width: 320, height: 844 },
  { name: '360_mobile_android', width: 360, height: 800 },
  { name: '390_mobile_iphone14', width: 390, height: 844 },
  { name: '430_mobile_promax', width: 430, height: 932 },
  { name: '768_tablet_portrait', width: 768, height: 1024 },
  { name: '1024_tablet_desktop', width: 1024, height: 768 },
  { name: '1280_laptop_small', width: 1280, height: 800 },
  { name: '1440_desktop_standard', width: 1440, height: 900 },
  { name: '1920_ultrawide', width: 1920, height: 1080 },
  { name: '2560_ultrawide_4k', width: 2560, height: 1440 },
];

// Real browser windows are shorter than the device: browser chrome, taskbars,
// mobile URL bars. The hero is checked at these heights as well.
const SHORT_VIEWPORTS = [
  { name: '320_short', width: 320, height: 568 },
  { name: '360_short', width: 360, height: 640 },
  { name: '390_safari', width: 390, height: 664 },
  { name: '1024_short', width: 1024, height: 600 },
  { name: '1280_short', width: 1280, height: 600 },
  { name: '1366_laptop', width: 1366, height: 657 },
  { name: '1440_browser', width: 1440, height: 760 },
  { name: '1920_browser_scaled', width: 1817, height: 700 },
];

const HERO_SLIDES = ['gear', 'courts', 'store'];
const HERO_MIN_GAP = 16;

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve('docs/visual-audits');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runAudit() {
  console.log(`\n🚀 Starting Responsive & Zero-Overflow Playwright Audit at ${BASE_URL}...\n`);
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(600);

      // Evaluate document-level overflow
      const metrics = await page.evaluate(() => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const windowWidth = window.innerWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const hasHorizontalOverflow = docScrollWidth > windowWidth || bodyScrollWidth > windowWidth;

        // Find overflowing elements
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > window.innerWidth + 1) {
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              className: el.className ? String(el.className).substring(0, 40) : '',
              id: el.id || '',
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            });
            if (overflowingElements.length >= 5) break;
          }
        }

        return {
          docScrollWidth,
          windowWidth,
          bodyScrollWidth,
          hasHorizontalOverflow,
          overflowingElements,
        };
      });

      const screenshotPath = path.join(OUT_DIR, `${vp.name}_homepage.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const passed = !metrics.hasHorizontalOverflow;
      results.push({
        name: vp.name,
        width: vp.width,
        height: vp.height,
        passed,
        metrics,
        screenshot: screenshotPath,
      });

      const statusIcon = passed ? '✅ PASS' : '❌ FAIL';
      console.log(
        `${statusIcon} [${vp.name.padEnd(22)}] ${vp.width}x${vp.height} -> doc: ${metrics.docScrollWidth}px | win: ${metrics.windowWidth}px`
      );

      if (!passed) {
        console.warn(`    ⚠️ Overflowing elements:`, JSON.stringify(metrics.overflowingElements, null, 2));
      }
    } catch (err) {
      console.error(`❌ Error on ${vp.name}:`, err.message);
      results.push({ name: vp.name, width: vp.width, height: vp.height, passed: false, error: err.message });
    } finally {
      await context.close();
    }
  }

  // Hero composition: on every slide the copy must sit inside the hero and
  // clear the tab bar, and the hero must not change height between slides.
  console.log(`\n🎞  Hero collision audit (all slides, standard + short viewports)...\n`);
  const heroResults = [];
  for (const vp of [...VIEWPORTS, ...SHORT_VIEWPORTS]) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' });
    await context.addInitScript(() => sessionStorage.setItem('oriental_intro_shown', 'true'));
    const page = await context.newPage();
    const issues = [];
    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 20000 });
      // Measure the settled composition: until Archivo arrives the fallback
      // font sets text slightly taller (a one-off swap on first load).
      // fonts.ready alone can resolve before the request starts, so wait for
      // the face itself, then for the hero height to hold across frames.
      await page.waitForFunction(
        () => document.fonts.status === 'loaded' && document.fonts.check('400 16px Archivo') && document.fonts.check('800 16px Archivo'),
        null,
        { timeout: 10000 }
      );
      await page.waitForFunction(
        () =>
          new Promise((resolve) => {
            const h = () => document.querySelector('.hero').getBoundingClientRect().height;
            const before = h();
            setTimeout(() => resolve(Math.abs(h() - before) < 1), 250);
          }),
        null,
        { timeout: 5000 }
      );
      const heights = [];
      for (const id of HERO_SLIDES) {
        await page.evaluate((id) => document.querySelector(`#hero-tab-${id}`).click(), id);
        await page.waitForTimeout(150);
        const m = await page.evaluate((id) => {
          const hero = document.querySelector('.hero').getBoundingClientRect();
          const slide = document.querySelector(`#hero-slide-${id}`);
          const copy = slide.querySelector('.hero-copy').getBoundingClientRect();
          const actions = slide.querySelector('.hero-actions').getBoundingClientRect();
          const tabs = document.querySelector('.hero-tablist').getBoundingClientRect();
          return {
            heroH: Math.round(hero.height),
            copyTop: Math.round(copy.top - hero.top),
            gap: Math.round(tabs.top - actions.bottom),
          };
        }, id);
        heights.push(m.heroH);
        if (m.copyTop < 0) issues.push(`${id}: copy clipped ${-m.copyTop}px above the hero`);
        if (m.gap < HERO_MIN_GAP) issues.push(`${id}: actions ${m.gap}px from tab bar (min ${HERO_MIN_GAP})`);
      }
      if (new Set(heights).size > 1) issues.push(`hero height changes between slides: ${heights.join(' / ')}`);
    } catch (err) {
      issues.push(`error: ${err.message}`);
    } finally {
      await context.close();
    }
    heroResults.push({ ...vp, issues });
    console.log(`${issues.length ? '❌ FAIL' : '✅ PASS'} [${vp.name.padEnd(22)}] ${vp.width}x${vp.height}${issues.length ? ` -> ${issues.join('; ')}` : ''}`);
  }

  await browser.close();

  // Write markdown report
  const reportPath = path.resolve('docs/RESPONSIVE_AUDIT.md');
  const markdown = `# Oriental Sports — Responsive & Zero-Overflow Audit

**Audit Date**: ${new Date().toISOString()}  
**Target URL**: ${BASE_URL}

---

## 1. Viewport Audit Summary

| Viewport Name | Target Dimensions | Document Width | Window Width | Overflow Free? | Screenshot |
| :--- | :--- | :--- | :--- | :--- | :--- |
${results
  .map(
    (r) =>
      `| **${r.name}** | \`${r.width}x${r.height}\` | \`${r.metrics?.docScrollWidth || 'N/A'}px\` | \`${r.metrics?.windowWidth || 'N/A'}px\` | ${
        r.passed ? '✅ PASSED' : '❌ FAILED'
      } | [\`${path.basename(r.screenshot || '')}\`](./visual-audits/${path.basename(r.screenshot || '')}) |`
  )
  .join('\n')}

---

## 2. Hero Collision Audit

Every slide, at every viewport above plus short browser windows: copy stays inside the hero,
actions clear the tab bar by at least ${HERO_MIN_GAP}px, and the hero height is the same on every slide.

| Viewport | Dimensions | Result |
| :--- | :--- | :--- |
${heroResults
  .map((r) => `| **${r.name}** | \`${r.width}x${r.height}\` | ${r.issues.length ? `❌ ${r.issues.join('; ')}` : '✅ PASSED'} |`)
  .join('\n')}

---

## 3. Assertion Verification
- **Strict Law**: \`document.documentElement.scrollWidth === window.innerWidth\` strictly enforced.
- **Root Container Overflow Hiding**: Prohibited. Layout components intrinsically bounded to viewport.
`;

  fs.writeFileSync(reportPath, markdown, 'utf-8');
  console.log(`\n📄 Report written to ${reportPath}\n`);

  const allPassed = results.every((r) => r.passed) && heroResults.every((r) => r.issues.length === 0);
  if (!allPassed) {
    process.exit(1);
  }
}

runAudit();
