import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load').catch(() => {});
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const bodyW = document.body.scrollWidth;
    const winW = window.innerWidth;
    
    const names = [];
    document.querySelectorAll('.sport-panel').forEach((el) => {
      const name = el.querySelector('.sport-panel-name');
      names.push({
        name: name ? name.textContent : '',
        panelScrollW: el.scrollWidth,
        panelOffsetW: el.offsetWidth,
        nameScrollW: name ? name.scrollWidth : 0,
        nameOffsetW: name ? name.offsetWidth : 0,
      });
    });

    return { docW, bodyW, winW, names };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

check();
