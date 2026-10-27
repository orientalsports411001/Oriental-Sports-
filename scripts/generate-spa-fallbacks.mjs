import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// List of top-level SPA routes to generate physical files for
const routes = [
  'account',
  'account/login',
  'account/signup',
  'account/verify',
  'account/orders',
  'account/profile',
  'account/addresses',
  'account/wishlist',
  'auth/callback',
  'shop',
  'courts',
  'about',
  'visit',
  'contact',
  'cart',
  'checkout',
  'wishlist',
  'shipping',
  'returns',
  'privacy',
  'terms',
];

// 1. Create subfolder index.html and .html for each route
for (const route of routes) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
  fs.writeFileSync(path.join(distDir, `${route.replace(/\//g, '_')}.html`), indexHtml);
}

// 2. Also write root 404.html for Vercel fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);

console.log(`[SPA Fallbacks] Generated physical HTML files for ${routes.length} routes + 404.html.`);
