import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2
  });

  const htmlPath = path.resolve(__dirname, 'preview-yellow-accents.html');
  await page.goto(`file://${htmlPath}`);
  await page.waitForLoadState('networkidle');

  const artifactPath = path.resolve(
    'C:/Users/vighnesh jadhav/.gemini/antigravity/brain/828f1eb4-9ebc-410b-b3f1-c39ae751a3ff/yellow-accent-exploration.png'
  );

  await page.screenshot({ path: artifactPath, fullPage: true });
  console.log('Saved screenshot to:', artifactPath);

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

