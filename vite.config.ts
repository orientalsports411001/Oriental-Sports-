import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function productsSyncPlugin(): Plugin {
  return {
    name: 'products-sync-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Enable CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.url === '/api/products/save' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              let parsedProduct: any = null;
              if (req.headers['content-type']?.includes('application/json')) {
                parsedProduct = JSON.parse(body);
              } else {
                const params = new URLSearchParams(body);
                parsedProduct = Object.fromEntries(params.entries());
              }

              if (parsedProduct && (parsedProduct.name || parsedProduct.title)) {
                const customPath = path.resolve('src/data/customProducts.json');
                let list: any[] = [];
                if (fs.existsSync(customPath)) {
                  try { list = JSON.parse(fs.readFileSync(customPath, 'utf8')); } catch {}
                }
                const slug = parsedProduct.slug || parsedProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const pObj = {
                  id: parsedProduct.id || `prod-os-${Date.now()}`,
                  slug,
                  name: parsedProduct.name,
                  category: parsedProduct.category_slug || parsedProduct.category || 'accessories',
                  categoryName: parsedProduct.categoryName || 'Sports Gear',
                  productType: parsedProduct.productType || 'gear',
                  brand: parsedProduct.brand || 'Oriental Sports',
                  price: Number(parsedProduct.price) || 0,
                  originalPrice: parsedProduct.compare_at_price ? Number(parsedProduct.compare_at_price) : undefined,
                  inStock: true,
                  images: Array.isArray(parsedProduct.images) ? parsedProduct.images : [parsedProduct.image || '/images/products/oriental-sports/sg-scorer-classic.webp'],
                  description: parsedProduct.description || '',
                  features: parsedProduct.description ? [parsedProduct.description] : [],
                  specs: { 'Brand': parsedProduct.brand || 'Oriental Sports' },
                  rating: 4.9,
                  reviewsCount: 16,
                  badge: 'NEW',
                  createdAt: new Date().toISOString(),
                };
                const idx = list.findIndex((x) => x.id === pObj.id || x.slug === pObj.slug);
                if (idx >= 0) list[idx] = pObj; else list.unshift(pObj);
                fs.writeFileSync(customPath, JSON.stringify(list, null, 2), 'utf8');

                // Also update admin all-products.json
                const adminPath = path.resolve('apps/admin/lib/all-products.json');
                if (fs.existsSync(adminPath)) {
                  try {
                    const aList = JSON.parse(fs.readFileSync(adminPath, 'utf8'));
                    const aIdx = aList.findIndex((x: any) => x.id === pObj.id || x.slug === pObj.slug);
                    if (aIdx >= 0) aList[aIdx] = { ...aList[aIdx], ...parsedProduct };
                    else aList.unshift(parsedProduct);
                    fs.writeFileSync(adminPath, JSON.stringify(aList, null, 2), 'utf8');
                  } catch {}
                }
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
              return;
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err?.message }));
              return;
            }
          });
          return;
        }

        if (req.url === '/api/products' && req.method === 'GET') {
          try {
            const customPath = path.resolve('src/data/customProducts.json');
            let list: any[] = [];
            if (fs.existsSync(customPath)) {
              list = JSON.parse(fs.readFileSync(customPath, 'utf8'));
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ products: list }));
            return;
          } catch {
            res.statusCode = 500;
            res.end(JSON.stringify({ products: [] }));
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), productsSyncPlugin()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    port: 3000,
    host: true,
  },
});
