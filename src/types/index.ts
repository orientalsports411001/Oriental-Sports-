export type SportCategory =
  | 'cricket'
  | 'football'
  | 'badminton'
  | 'tennis'
  | 'pickleball'
  | 'table-tennis'
  | 'squash'
  | 'fitness'
  | 'gym-equipment'
  | 'volleyball'
  | 'recreation'
  | 'accessories';

export type ProductType =
  | 'racket'
  | 'paddle'
  | 'bat'
  | 'ball'
  | 'gear'
  | 'fitness'
  | 'protection'
  | 'apparel'
  | 'bag'
  | 'net'
  | 'table'
  | 'mat'
  | 'board'
  | 'accessory'
  | 'shoes'
  | 'stockings'
  | 'shuttlecock'
  | 'treadmill';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size 3", "Size 4", "Size 5", "Size 6", "Size F", "Standard"
  price?: number;
  originalPrice?: number;
  inStock: boolean;
  priceDelta?: number;
  sku?: string;
  shopifyVariantId?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: SportCategory;
  categoryName: string;
  subcategory?: string;
  subcategoryName?: string;
  productType: ProductType;
  /** Manufacturer. Empty when the source data does not name one. */
  brand: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  quantityUnit?: string;
  /** Set when `price` is a list price (e.g. 'MRP') rather than a tax-inclusive selling price. */
  priceLabel?: string;
  /** Replaces the default "In stock" line when stock is not tracked online. */
  availabilityNote?: string;
  color?: string;
  rating: number;
  reviewsCount: number;
  badge?: 'NEW' | 'BESTSELLER' | 'MATCH GRADE' | 'ORIENTAL EXCLUSIVE' | 'LIMITED';
  images: string[];
  gallery?: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  sizes?: string[];
  inStock: boolean;
  isFeatured?: boolean;
  sku?: string;
  discountPrice?: number;
  seoTitle?: string;
  seoDescription?: string;
  shopifyId?: string;
  shopifyVariantId?: string;
  handle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourtService {
  id: string;
  slug: string;
  name: string;
  sport: string;
  heroImage: string;
  surfaceTypes: string[];
  description: string;
  features: string[];
  standards: string[];
  leadTime: string;
  estimatedPriceRange: string;
  gallery: string[];
}

export interface CourtProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  sport: string;
  surface: string;
  clientType: 'Club' | 'Residential' | 'School/Academy' | 'Private' | 'Resort' | 'Commercial';
  year: string;
  heroImage: string;
  images: string[];
  description: string;
  scope: string[];
  specs: Record<string, string>;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  sportOrProject: string;
  quote: string;
  rating: number;
  verified: boolean;
  avatarUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
  shopifyLineId?: string;
  shopifyVariantId?: string;
}

export interface StoreDetails {
  name: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  city: string;
  pincode: string;
  phone: string;
  displayPhone: string;
  email: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  mapsUrl: string;
  whatsappUrl: string;
}
