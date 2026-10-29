export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_id?: string;
  category_slug: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  images: string[];
  status: 'draft' | 'published' | 'archived';
  stock_quantity: number;
  low_stock_threshold: number;
  is_featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_canonical_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminOrder {
  id: string;
  order_number: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'pending' | 'paid' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  payment_method: string;
  tracking_number?: string;
  carrier?: string;
  created_at: string;
  shipping_address: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  items: {
    product_name: string;
    price: number;
    quantity: number;
    selected_variant?: string;
  }[];
}

import allProductsData from './all-products.json';
import fs from 'node:fs';
import path from 'node:path';

const TMP_CACHE_FILE = path.join(
  process.platform === 'win32' ? process.env.TEMP || 'C:\\Windows\\Temp' : '/tmp',
  'os-admin-products-cache.json'
);

const TMP_ORDERS_CACHE_FILE = path.join(
  process.platform === 'win32' ? process.env.TEMP || 'C:\\Windows\\Temp' : '/tmp',
  'os-admin-orders-cache.json'
);

function readDiskCache(): AdminProduct[] | null {
  try {
    if (fs.existsSync(TMP_CACHE_FILE)) {
      const content = fs.readFileSync(TMP_CACHE_FILE, 'utf-8');
      const list = JSON.parse(content);
      if (Array.isArray(list) && list.length > 0) return list;
    }
  } catch {}
  return null;
}

function writeDiskCache(items: AdminProduct[]) {
  try {
    fs.writeFileSync(TMP_CACHE_FILE, JSON.stringify(items), 'utf-8');
  } catch {}
}

const BANNED_DUMMY_ORDERS = new Set([
  'OS-9281',
  'OS-9282',
  'OS-9283',
  'OS-9284',
  'OS-9285',
  'ord-2026-1001',
  'ord-2026-1002',
  'ord-2026-1003',
  'ord-2026-1004',
  'ord-2026-1005',
]);

function readOrdersDiskCache(): AdminOrder[] | null {
  try {
    if (fs.existsSync(TMP_ORDERS_CACHE_FILE)) {
      const content = fs.readFileSync(TMP_ORDERS_CACHE_FILE, 'utf-8');
      const list = JSON.parse(content);
      if (Array.isArray(list) && list.length > 0) {
        return list.filter((o) => !BANNED_DUMMY_ORDERS.has(o.order_number) && !BANNED_DUMMY_ORDERS.has(o.id));
      }
    }
  } catch {}
  return null;
}

function writeOrdersDiskCache(items: AdminOrder[]) {
  try {
    fs.writeFileSync(TMP_ORDERS_CACHE_FILE, JSON.stringify(items), 'utf-8');
  } catch {}
}

export const INITIAL_PRODUCTS: AdminProduct[] = allProductsData as AdminProduct[];


export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-2026-5625',
    order_number: 'OS-2026-5625',
    user_id: 'usr-pratik-jadhav',
    customer_name: 'Pratik Jadhav',
    customer_email: 'pratikjadhav8820@gmail.com',
    customer_phone: '+91 98230 45812',
    status: 'confirmed',
    total_amount: 4498,
    subtotal: 4498,
    shipping: 0,
    tax: 686,
    payment_method: 'Razorpay (UPI - ID: pay_rzp_58310021)',
    tracking_number: 'OS-PICKUP-5625',
    carrier: 'Oriental Store Counter (Camp)',
    created_at: '2026-10-29T07:15:00.000Z',
    shipping_address: {
      fullName: 'Pratik Jadhav',
      phone: '+91 98230 45812',
      addressLine1: 'Shop 247, MG Road (Camp Store Pickup)',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    items: [
      { product_name: 'Yonex Astrox 88D Play Badminton Racket', price: 4498, quantity: 1, selected_variant: '4U / G5' },
    ],
  },
];

export const CATEGORIES = [
  { slug: 'cricket', name: 'Cricket' },
  { slug: 'badminton', name: 'Badminton' },
  { slug: 'football', name: 'Football' },
  { slug: 'tennis', name: 'Tennis' },
  { slug: 'pickleball', name: 'Pickleball' },
  { slug: 'table-tennis', name: 'Table Tennis' },
  { slug: 'gym-equipment', name: 'Gym & Strength' },
  { slug: 'fitness', name: 'Fitness & Recovery' },
  { slug: 'recreation', name: 'Recreation' },
  { slug: 'accessories', name: 'Accessories' },
];

// Persistent in-memory store for local development session
let productsCache: AdminProduct[] = [...INITIAL_PRODUCTS];
let ordersCache: AdminOrder[] = [...INITIAL_ORDERS];

export function getCachedProducts(): AdminProduct[] {
  const disk = readDiskCache();
  if (disk) productsCache = disk;
  return productsCache;
}

function getRepoRoot(): string {
  const candidates = [
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '..', '..'),
    path.resolve(process.cwd(), 'apps', 'admin'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'src', 'data', 'products.ts'))) {
      return c;
    }
  }
  return process.cwd();
}

function toStorefrontFormat(p: AdminProduct) {
  const CATEGORY_NAMES: Record<string, string> = {
    cricket: 'Cricket',
    badminton: 'Badminton',
    football: 'Football',
    tennis: 'Tennis',
    pickleball: 'Pickleball',
    'table-tennis': 'Table Tennis',
    squash: 'Squash',
    fitness: 'Fitness & Recovery',
    'gym-equipment': 'Gym & Strength',
    volleyball: 'Volleyball',
    recreation: 'Recreation',
    accessories: 'Accessories & Protection',
  };

  const category = (p.category_slug || 'accessories');
  const categoryName = CATEGORY_NAMES[category] || 'Sports Gear';
  const safeImages = Array.isArray(p.images) && p.images.length > 0
    ? p.images
    : ['/images/products/oriental-sports/sg-scorer-classic.webp'];

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category,
    categoryName,
    subcategory: p.category_slug,
    subcategoryName: categoryName,
    productType: (category === 'cricket' ? 'bat' : category === 'badminton' || category === 'tennis' ? 'racket' : category === 'football' ? 'ball' : 'gear'),
    brand: p.brand || 'Oriental Sports',
    price: Number(p.price) || 0,
    originalPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 16,
    badge: 'NEW',
    isFeatured: Boolean(p.is_featured),
    inStock: p.status === 'published' && (p.stock_quantity ?? 10) > 0,
    images: safeImages,
    gallery: safeImages,
    description: p.description || `${p.name} available at Oriental Sports Pune.`,
    features: p.description ? [p.description] : ['Match quality performance gear', 'Inspected by Oriental Sports Camp'],
    specs: {
      'Brand': p.brand || 'Oriental Sports',
      'Stock': `${p.stock_quantity ?? 10} units in stock`,
      'Discipline': categoryName,
    },
    seoTitle: p.seo_title || `${p.name} | Oriental Sports Pune`,
    seoDescription: p.seo_description || p.description || '',
    createdAt: p.created_at || new Date().toISOString(),
    updatedAt: p.updated_at || new Date().toISOString(),
  };
}

function syncToCatalogFiles(items: AdminProduct[], singleUpdated?: AdminProduct) {
  try {
    const root = getRepoRoot();
    
    // 1. Persist to apps/admin/lib/all-products.json
    const adminJsonPath = path.join(root, 'apps', 'admin', 'lib', 'all-products.json');
    if (fs.existsSync(adminJsonPath)) {
      fs.writeFileSync(adminJsonPath, JSON.stringify(items, null, 2), 'utf-8');
    }

    // 2. Persist custom products to src/data/customProducts.json
    const srcCustomPath = path.join(root, 'src', 'data', 'customProducts.json');
    fs.mkdirSync(path.dirname(srcCustomPath), { recursive: true });
    let customList: any[] = [];
    if (fs.existsSync(srcCustomPath)) {
      try {
        customList = JSON.parse(fs.readFileSync(srcCustomPath, 'utf-8'));
        if (!Array.isArray(customList)) customList = [];
      } catch {}
    }

    if (singleUpdated) {
      const storefrontFormat = toStorefrontFormat(singleUpdated);
      const idx = customList.findIndex((p: any) => p.id === singleUpdated.id || p.slug === singleUpdated.slug);
      if (idx >= 0) {
        customList[idx] = storefrontFormat;
      } else {
        customList.unshift(storefrontFormat);
      }
    }

    fs.writeFileSync(srcCustomPath, JSON.stringify(customList, null, 2), 'utf-8');

    // 3. Mirror to apps/storefront/data/customProducts.json if exists
    const sfCustomPath = path.join(root, 'apps', 'storefront', 'data', 'customProducts.json');
    if (fs.existsSync(path.dirname(sfCustomPath))) {
      fs.writeFileSync(sfCustomPath, JSON.stringify(customList, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to sync catalog files:', err);
  }
}

export function saveProduct(product: Partial<AdminProduct> & { name: string }): AdminProduct {
  const disk = readDiskCache();
  if (disk) productsCache = disk;

  const existingIndex = productsCache.findIndex((p) => p.id === product.id || p.slug === product.slug);
  const now = new Date().toISOString();

  let result: AdminProduct;
  if (existingIndex >= 0) {
    const updated: AdminProduct = {
      ...productsCache[existingIndex],
      ...product,
      updated_at: now,
    };
    productsCache[existingIndex] = updated;
    result = updated;
  } else {
    const newProduct: AdminProduct = {
      id: product.id || `prod-os-${Date.now()}`,
      name: product.name,
      slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      brand: product.brand || 'Oriental Sports',
      category_slug: product.category_slug || 'cricket',
      description: product.description || '',
      price: Number(product.price || 0),
      compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : null,
      images: product.images && product.images.length > 0 ? product.images : ['/images/products/cricket_bat_willow.webp'],
      status: product.status || 'published',
      stock_quantity: Number(product.stock_quantity ?? 10),
      low_stock_threshold: Number(product.low_stock_threshold ?? 5),
      is_featured: Boolean(product.is_featured),
      seo_title: product.seo_title || `${product.name} | Oriental Sports Pune`,
      seo_description: product.seo_description || product.description?.slice(0, 150) || '',
      created_at: now,
      updated_at: now,
    };
    productsCache.unshift(newProduct);
    result = newProduct;
  }

  writeDiskCache(productsCache);
  syncToCatalogFiles(productsCache, result);
  return result;
}

export function removeProduct(id: string): boolean {
  const disk = readDiskCache();
  if (disk) productsCache = disk;

  const initialLength = productsCache.length;
  productsCache = productsCache.filter((p) => p.id !== id);
  writeDiskCache(productsCache);

  try {
    const root = getRepoRoot();
    const adminJsonPath = path.join(root, 'apps', 'admin', 'lib', 'all-products.json');
    if (fs.existsSync(adminJsonPath)) {
      fs.writeFileSync(adminJsonPath, JSON.stringify(productsCache, null, 2), 'utf-8');
    }
    const srcCustomPath = path.join(root, 'src', 'data', 'customProducts.json');
    if (fs.existsSync(srcCustomPath)) {
      const customList = JSON.parse(fs.readFileSync(srcCustomPath, 'utf-8'));
      if (Array.isArray(customList)) {
        const filtered = customList.filter((p: any) => p.id !== id && p.slug !== id);
        fs.writeFileSync(srcCustomPath, JSON.stringify(filtered, null, 2), 'utf-8');
      }
    }
    const sfCustomPath = path.join(root, 'apps', 'storefront', 'data', 'customProducts.json');
    if (fs.existsSync(sfCustomPath)) {
      const customList = JSON.parse(fs.readFileSync(sfCustomPath, 'utf-8'));
      if (Array.isArray(customList)) {
        const filtered = customList.filter((p: any) => p.id !== id && p.slug !== id);
        fs.writeFileSync(sfCustomPath, JSON.stringify(filtered, null, 2), 'utf-8');
      }
    }
  } catch {}

  return productsCache.length < initialLength;
}

export function getCachedOrders(): AdminOrder[] {
  const disk = readOrdersDiskCache();
  if (disk && Array.isArray(disk) && disk.length > 0) {
    const orderMap = new Map<string, AdminOrder>();
    // Disk orders first
    for (const o of disk) {
      orderMap.set(o.order_number || o.id, o);
    }
    // In-memory cache orders
    for (const o of ordersCache) {
      if (!orderMap.has(o.order_number || o.id)) {
        orderMap.set(o.order_number || o.id, o);
      }
    }
    // Initial orders
    for (const o of INITIAL_ORDERS) {
      if (!orderMap.has(o.order_number || o.id)) {
        orderMap.set(o.order_number || o.id, o);
      }
    }
    ordersCache = Array.from(orderMap.values());
  }
  return ordersCache.filter((o) => !BANNED_DUMMY_ORDERS.has(o.order_number) && !BANNED_DUMMY_ORDERS.has(o.id));
}

export function saveAdminOrder(order: Partial<AdminOrder> & { order_number: string }): AdminOrder {
  const disk = readOrdersDiskCache();
  if (disk && Array.isArray(disk)) ordersCache = disk;

  const existingIndex = ordersCache.findIndex(
    (o) => (order.id && o.id === order.id) || o.order_number === order.order_number
  );
  const now = new Date().toISOString();

  let result: AdminOrder;
  if (existingIndex >= 0) {
    const updated: AdminOrder = {
      ...ordersCache[existingIndex],
      ...order,
    };
    ordersCache[existingIndex] = updated;
    result = updated;
  } else {
    const newOrder: AdminOrder = {
      id: order.id || `ord-${Date.now()}`,
      order_number: order.order_number,
      user_id: order.user_id || 'usr-guest',
      customer_name: order.customer_name || 'Customer',
      customer_email: order.customer_email || '',
      customer_phone: order.customer_phone || '',
      status: order.status || 'confirmed',
      total_amount: Number(order.total_amount || 0),
      subtotal: Number(order.subtotal || order.total_amount || 0),
      shipping: Number(order.shipping || 0),
      tax: Number(order.tax || 0),
      payment_method: order.payment_method || 'Razorpay / UPI',
      tracking_number: order.tracking_number,
      carrier: order.carrier,
      created_at: order.created_at || now,
      shipping_address: order.shipping_address || {
        fullName: order.customer_name || 'Customer',
        phone: order.customer_phone || '',
        addressLine1: 'Camp Flagship Store Pickup',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      },
      items: order.items || [],
    };
    ordersCache.unshift(newOrder);
    result = newOrder;
  }

  writeOrdersDiskCache(ordersCache);
  return result;
}

export function updateOrder(id: string, updates: Partial<AdminOrder>): AdminOrder | null {
  const disk = readOrdersDiskCache();
  if (disk && Array.isArray(disk)) ordersCache = disk;

  const index = ordersCache.findIndex((o) => o.id === id || o.order_number === id);
  if (index === -1) return null;
  ordersCache[index] = { ...ordersCache[index], ...updates };
  writeOrdersDiskCache(ordersCache);
  return ordersCache[index];
}
