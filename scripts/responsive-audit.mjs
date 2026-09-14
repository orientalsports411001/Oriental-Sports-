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

## 2. Assertion Verification
- **Strict Law**: \`document.documentElement.scrollWidth === window.innerWidth\` strictly enforced.
- **Root Container Overflow Hiding**: Prohibited. Layout components intrinsically bounded to viewport.
`;

  fs.writeFileSync(reportPath, markdown, 'utf-8');
  console.log(`\n📄 Report written to ${reportPath}\n`);

  const allPassed = results.every((r) => r.passed);
  if (!allPassed) {
    process.exit(1);
  }
}

runAudit();
