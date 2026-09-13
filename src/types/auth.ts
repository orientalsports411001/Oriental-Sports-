export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export interface OrderItem {
  productId: string;
  productSlug: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
}

export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  timeline: TrackingStep[];
}

export interface CourtInquiry {
  id: string;
  inquiryNumber: string;
  date: string;
  sport: string;
  surface: string;
  location: string;
  status: 'reviewing' | 'site_survey_scheduled' | 'proposal_ready' | 'work_in_progress';
  statusLabel: string;
  contactPerson: string;
  phone: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  sportPreferences: string[];
  membershipTier: 'Club Athlete' | 'Pro Member' | 'Elite Partner';
  addresses: Address[];
  orders: Order[];
  courtInquiries: CourtInquiry[];
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
