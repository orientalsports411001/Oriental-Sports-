import fs from 'fs';

const files = ['src/data/courts.ts', 'src/data/products.ts', 'src/data/storeInfo.ts'];
let allUrls = [];

for (const f of files) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(/https:\/\/images\.unsplash\.com\/[^\s'"`]+/g) || [];
    allUrls.push(...matches);
  }
}

allUrls = [...new Set(allUrls)];
console.log(`Checking ${allUrls.length} unique Unsplash URLs...`);

async function run() {
  const bad = [];
  for (const url of allUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        bad.push({ url, status: res.status });
      }
    } catch (e) {
      bad.push({ url, error: e.message });
    }
  }

  console.log(`Scan complete. Found ${bad.length} bad URLs.`);
  if (bad.length > 0) {
    console.log(JSON.stringify(bad, null, 2));
  }
}

run();
