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
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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

export const INITIAL_PRODUCTS: AdminProduct[] = allProductsData as AdminProduct[];


export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-2026-1001',
    order_number: 'OS-9281',
    user_id: 'usr-pune-01',
    customer_name: 'Rohan Deshmukh',
    customer_email: 'rohan.deshmukh@gmail.com',
    customer_phone: '+91 98220 14892',
    status: 'delivered',
    total_amount: 15490,
    subtotal: 15490,
    shipping: 0,
    tax: 0,
    payment_method: 'UPI / Razorpay',
    tracking_number: 'BLUEDART-8829104',
    carrier: 'BlueDart Express',
    created_at: '2026-10-22T14:30:00.000Z',
    shipping_address: {
      fullName: 'Rohan Deshmukh',
      phone: '+91 98220 14892',
      addressLine1: 'B-402, Rohan Tarang, Wakad',
      addressLine2: 'Near Datta Mandir Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
    },
    items: [
      { product_name: 'Yonex Astrox 88D Pro Badminton Racket', price: 15490, quantity: 1, selected_variant: '4U / G5' },
    ],
  },
  {
    id: 'ord-2026-1002',
    order_number: 'OS-9282',
    user_id: 'usr-pune-02',
    customer_name: 'Vikram Shinde',
    customer_email: 'vikram.shinde@kalyanigroup.com',
    customer_phone: '+91 98231 77201',
    status: 'shipped',
    total_amount: 6349,
    subtotal: 6349,
    shipping: 0,
    tax: 0,
    payment_method: 'Credit Card / Razorpay',
    tracking_number: 'DELHIVERY-9940122',
    carrier: 'Delhivery Surface',
    created_at: '2026-10-22T11:15:00.000Z',
    shipping_address: {
      fullName: 'Vikram Shinde',
      phone: '+91 98231 77201',
      addressLine1: 'Flat 12, Hermes Waves, Kalyani Nagar',
      addressLine2: 'Opposite Joggers Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411006',
    },
    items: [
      { product_name: 'SG Scorer Classic Cricket Bat', price: 2899, quantity: 1, selected_variant: 'Full Size' },
      { product_name: 'SG Profile Kashmir Willow Bat', price: 3450, quantity: 1, selected_variant: 'Size 6' },
    ],
  },
  {
    id: 'ord-2026-1003',
    order_number: 'OS-9283',
    user_id: 'usr-pune-03',
    customer_name: 'Priya Nair',
    customer_email: 'priya.nair89@gmail.com',
    customer_phone: '+91 98902 44109',
    status: 'processing',
    total_amount: 14999,
    subtotal: 14999,
    shipping: 0,
    tax: 0,
    payment_method: 'Net Banking / HDFC',
    created_at: '2026-10-21T18:40:00.000Z',
    shipping_address: {
      fullName: 'Priya Nair',
      phone: '+91 98902 44109',
      addressLine1: 'Row House 4, Nyati Estate, Mohammed Wadi',
      addressLine2: 'Near Corinthian Club',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411060',
    },
    items: [
      { product_name: 'Heavy Duty Multi-Angle Adjustable Workout Bench', price: 14999, quantity: 1 },
    ],
  },
  {
    id: 'ord-2026-1004',
    order_number: 'OS-9284',
    user_id: 'usr-pune-04',
    customer_name: 'Aditya Patil',
    customer_email: 'aditya.patil@outlook.com',
    customer_phone: '+91 94220 89123',
    status: 'paid',
    total_amount: 3298,
    subtotal: 3298,
    shipping: 0,
    tax: 0,
    payment_method: 'UPI / Google Pay',
    created_at: '2026-10-20T16:20:00.000Z',
    shipping_address: {
      fullName: 'Aditya Patil',
      phone: '+91 94220 89123',
      addressLine1: 'Plot 77, Mayur Colony, Kothrud',
      addressLine2: 'Near Jog Hospital',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038',
    },
    items: [
      { product_name: 'Nivia Storm Football Match Quality Size 5', price: 1199, quantity: 2 },
      { product_name: 'Cosco Championship Heavy Duty Tennis Balls (Can of 3)', price: 450, quantity: 2 },
    ],
  },
  {
    id: 'ord-2026-1005',
    order_number: 'OS-9285',
    user_id: 'usr-pune-05',
    customer_name: 'Suhas Kulkarni',
    customer_email: 'suhas.kulkarni@techm.com',
    customer_phone: '+91 98224 55301',
    status: 'pending',
    total_amount: 8490,
    subtotal: 8490,
    shipping: 0,
    tax: 0,
    payment_method: 'UPI / PhonePe',
    created_at: '2026-10-20T10:05:00.000Z',
    shipping_address: {
      fullName: 'Suhas Kulkarni',
      phone: '+91 98224 55301',
      addressLine1: 'A-101, Blue Ridge, Hinjawadi Phase 1',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
    },
    items: [
      { product_name: 'Li-Ning Windstorm 72 Lightweight Racket', price: 8490, quantity: 1 },
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
  return ordersCache;
}

export function updateOrder(id: string, updates: Partial<AdminOrder>): AdminOrder | null {
  const index = ordersCache.findIndex((o) => o.id === id);
  if (index === -1) return null;
  ordersCache[index] = { ...ordersCache[index], ...updates };
  return ordersCache[index];
}
