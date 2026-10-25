import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const sportRail = await page.$('.sport-index');
  if (sportRail) {
    await sportRail.screenshot({ path: 'protected-gallery-1-sport-index-1440.png' });
    console.log('Saved protected-gallery-1-sport-index-1440.png');
  }

  const orbit = await page.$('.orbit');
  if (orbit) {
    await orbit.screenshot({ path: 'protected-gallery-2-orbit-1440.png' });
    console.log('Saved protected-gallery-2-orbit-1440.png');
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const mobileSport = await mobile.$('.sport-index');
  if (mobileSport) {
    await mobileSport.screenshot({ path: 'protected-gallery-1-sport-index-390.png' });
    console.log('Saved protected-gallery-1-sport-index-390.png');
  }

  await browser.close();
}

capture().catch(console.error);
