import { chromium } from 'playwright';

async function captureFullPage() {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop Full Page
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: 'docs/visual-audits/fullpage_desktop.png', fullPage: true });
  await desktopContext.close();

  // Mobile Full Page
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'docs/visual-audits/fullpage_mobile.png', fullPage: true });
  await mobileContext.close();

  await browser.close();
  console.log('Full page screenshots generated successfully.');
}

captureFullPage();
