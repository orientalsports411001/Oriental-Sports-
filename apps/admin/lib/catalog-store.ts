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
  return productsCache;
}

export function saveProduct(product: Partial<AdminProduct> & { name: string }): AdminProduct {
  const existingIndex = productsCache.findIndex((p) => p.id === product.id || p.slug === product.slug);
  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const updated: AdminProduct = {
      ...productsCache[existingIndex],
      ...product,
      updated_at: now,
    };
    productsCache[existingIndex] = updated;
    return updated;
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
    return newProduct;
  }
}

export function removeProduct(id: string): boolean {
  const initialLength = productsCache.length;
  productsCache = productsCache.filter((p) => p.id !== id);
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
