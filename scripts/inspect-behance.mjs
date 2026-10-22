import { chromium } from 'playwright';

async function inspect() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();
  
  console.log('Fetching embed with user-agent...');
  const resp = await page.goto('https://www.behance.net/embed/project/244093753?ilo0=1', {
    waitUntil: 'networkidle',
    timeout: 30000,
  }).catch(e => console.log('Err goto:', e.message));

  console.log('Status code:', resp?.status());
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'behance-embed-capture.png' });

  // Get iframe or content
  const content = await page.content();
  console.log('Content length:', content.length);
  
  // Also try oEmbed API
  const oembedResp = await page.request.get('https://www.behance.net/v2/projects/244093753?api_key=...').catch(() => null);

  // Search google for project title
  console.log('Navigating to Google to search 244093753 behance...');
  await page.goto('https://html.duckduckgo.com/html/?q=site:behance.net+244093753', { waitUntil: 'domcontentloaded' });
  const ddgResults = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.result__title')).map(el => el.innerText.trim());
  });
  console.log('DuckDuckGo Results:', ddgResults);

  await browser.close();
}

inspect();
