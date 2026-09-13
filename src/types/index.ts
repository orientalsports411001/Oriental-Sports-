export type SportCategory =
  | 'cricket'
  | 'tennis'
  | 'pickleball'
  | 'badminton'
  | 'table-tennis'
  | 'squash'
  | 'fitness'
  | 'recreation'
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Grip Size 4 3/8", "Size 7", "26 lbs"
  inStock: boolean;
  priceDelta?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: SportCategory;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'NEW' | 'BESTSELLER' | 'MATCH GRADE' | 'ORIENTAL EXCLUSIVE' | 'LIMITED';
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  sizes?: string[];
  inStock: boolean;
  isFeatured?: boolean;
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
