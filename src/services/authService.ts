import { UserProfile, Address, Order, CourtInquiry } from '../types/auth';

const STORAGE_KEY = 'oriental_sports_auth_user_v1';

export const INITIAL_USER: UserProfile = {
  id: 'usr_pune_0921',
  firstName: 'Arjun',
  lastName: 'Deshmukh',
  fullName: 'Arjun Deshmukh',
  email: 'arjun.deshmukh@gmail.com',
  phone: '+91 98230 45812',
  sportPreferences: ['Badminton', 'Tennis', 'Cricket'],
  membershipTier: 'Club Athlete',
  createdAt: '2023-04-12',
  addresses: [
    {
      id: 'addr_1',
      name: 'Arjun Deshmukh',
      phone: '+91 98230 45812',
      street: 'Bungalow No. 7, Silver Oak Lane, Off MG Road',
      locality: 'Camp',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      isDefault: true,
      type: 'home',
    },
    {
      id: 'addr_2',
      name: 'Arjun Deshmukh (Office)',
      phone: '+91 98230 45812',
      street: 'Level 4, Quadra IT Park, West Avenue',
      locality: 'Baner',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      isDefault: false,
      type: 'work',
    },
  ],
  orders: [
    {
      id: 'ord-8831',
      orderNumber: 'OS-2024-8831',
      date: '2024-11-18',
      status: 'delivered',
      statusLabel: 'Delivered to Camp, Pune',
      totalAmount: 18499,
      subtotal: 18499,
      shipping: 0,
      tax: 2821,
      paymentMethod: 'UPI (Google Pay)',
      shippingAddress: {
        id: 'addr_1',
        name: 'Arjun Deshmukh',
        phone: '+91 98230 45812',
        street: 'Bungalow No. 7, Silver Oak Lane, Off MG Road',
        locality: 'Camp',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        isDefault: true,
        type: 'home',
      },
      trackingNumber: 'DTDC-PN-9920141',
      carrier: 'DTDC Express',
      estimatedDelivery: '19 Nov 2024',
      items: [
        {
          productId: 'prod-bad-01',
          productSlug: 'victor-thruster-k-ryuga-ii-pro',
          productName: 'Victor Thruster K Ryuga II Pro Badminton Racquet',
          productImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
          price: 18499,
          quantity: 1,
          selectedVariant: '4U (83g) / G5',
        },
      ],
      timeline: [
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: 'Payment verified via UPI. Order sent to Camp flagship store fulfillment depot.',
          date: '18 Nov 2024, 10:15 AM',
          completed: true,
          current: false,
        },
        {
          status: 'processing',
          title: 'Custom Restringing & Quality Check',
          description: 'Strung at 27 lbs electronic tension using Yonex BG80 by master technician in Camp workshop.',
          date: '18 Nov 2024, 02:30 PM',
          completed: true,
          current: false,
        },
        {
          status: 'shipped',
          title: 'Dispatched via DTDC Local Courier',
          description: 'Package picked up from Oriental Sports MG Road warehouse.',
          date: '19 Nov 2024, 09:00 AM',
          completed: true,
          current: false,
        },
        {
          status: 'delivered',
          title: 'Delivered Successfully',
          description: 'Received by Arjun Deshmukh at Camp bungalow.',
          date: '19 Nov 2024, 01:45 PM',
          completed: true,
          current: true,
        },
      ],
    },
    {
      id: 'ord-8714',
      orderNumber: 'OS-2024-8714',
      date: '2024-10-04',
      status: 'delivered',
      statusLabel: 'Delivered to Baner, Pune',
      totalAmount: 3799,
      subtotal: 3799,
      shipping: 0,
      tax: 579,
      paymentMethod: 'Credit Card (HDFC Visa)',
      shippingAddress: {
        id: 'addr_2',
        name: 'Arjun Deshmukh (Office)',
        phone: '+91 98230 45812',
        street: 'Level 4, Quadra IT Park, West Avenue',
        locality: 'Baner',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        isDefault: false,
        type: 'work',
      },
      trackingNumber: 'DELHIVERY-OS-44812',
      carrier: 'Delhivery Surface',
      items: [
        {
          productId: 'prod-ten-02',
          productSlug: 'wilson-us-open-extra-duty-balls-case',
          productName: 'Wilson US Open Extra Duty Tennis Balls (Can of 3)',
          productImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
          price: 899,
          quantity: 2,
        },
        {
          productId: 'prod-acc-01',
          productSlug: 'oriental-pro-tour-6-racquet-thermal-bag',
          productName: 'Oriental Pro Tour 6-Racquet Thermal Gear Bag',
          productImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
          price: 2001,
          quantity: 1,
        },
      ],
      timeline: [
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: 'Payment received.',
          date: '04 Oct 2024, 11:30 AM',
          completed: true,
          current: false,
        },
        {
          status: 'shipped',
          title: 'Dispatched',
          description: 'Handed over to Delhivery.',
          date: '04 Oct 2024, 04:00 PM',
          completed: true,
          current: false,
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Delivered to office reception desk.',
          date: '05 Oct 2024, 03:20 PM',
          completed: true,
          current: true,
        },
      ],
    },
  ],
  courtInquiries: [
    {
      id: 'inq-902',
      inquiryNumber: 'CRT-2024-902',
      date: '2024-10-22',
      sport: 'Pickleball',
      surface: 'Cushioned 8-Layer Acrylic',
      location: 'Koregaon Park, Pune',
      status: 'proposal_ready',
      statusLabel: 'Detailed BOQ Proposal Ready',
      contactPerson: 'Arjun Deshmukh',
      phone: '+91 98230 45812',
      notes: 'Private rooftop court 20m x 10m with LED perimeter floodlighting and chainlink fence.',
    },
  ],
};

export class AuthService {
  private static loadUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean out legacy demo user if it was saved by accident
        if (parsed.id === 'usr_pune_0921' || parsed.email === 'arjun.deshmukh@gmail.com') {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return null;
  }

  private static saveUser(user: UserProfile | null) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // fallback
    }
  }

  static getCurrentUser(): UserProfile | null {
    // Normal visitors start signed out. No demo persona is assumed.
    return this.loadUser();
  }

  static async requestOtp(phone: string): Promise<{ success: boolean; devOtp: string }> {
    await new Promise((r) => setTimeout(r, 450));
    return {
      success: true,
      devOtp: '123456',
    };
  }

  static async verifyOtp(phone: string, otp: string, registrationData?: { firstName: string; lastName: string; email?: string }): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 550));
    localStorage.removeItem('oriental_sports_logged_out');
    
    let user = this.getCurrentUser();
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;

    if (!user || user.phone !== formattedPhone) {
      const firstName = registrationData?.firstName || 'Sports';
      const lastName = registrationData?.lastName || 'Athlete';
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        phone: formattedPhone,
        firstName,
        lastName,
        fullName: registrationData ? `${firstName} ${lastName}`.trim() : 'Sports Athlete',
        email: registrationData?.email || '',
        sportPreferences: ['Badminton', 'Tennis'],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      return newUser;
    }
    this.saveUser(user);
    return user;
  }

  static async signInWithGoogle(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 600));
    localStorage.removeItem('oriental_sports_logged_out');
    let user = this.getCurrentUser();
    if (!user) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName: 'Sports',
        lastName: 'Member',
        fullName: 'Sports Member',
        email: 'member@orientalsports.in',
        phone: '',
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      return newUser;
    }
    this.saveUser(user);
    return user;
  }

  static async signInWithEmail(email: string): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 500));
    localStorage.removeItem('oriental_sports_logged_out');
    let user = this.getCurrentUser();
    if (!user) {
      const namePart = email.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        phone: '',
        firstName: capitalized,
        lastName: 'Customer',
        fullName: `${capitalized} Customer`,
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      return newUser;
    }
    this.saveUser(user);
    return user;
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 300));
    let current = this.getCurrentUser();
    const updatedUser: UserProfile = current
      ? {
          ...current,
          ...updates,
          fullName: updates.firstName && updates.lastName 
            ? `${updates.firstName} ${updates.lastName}` 
            : updates.firstName 
            ? `${updates.firstName} ${current.lastName}`
            : current.fullName,
        }
      : {
          id: `usr_${Date.now()}`,
          firstName: updates.firstName || 'Customer',
          lastName: updates.lastName || '',
          fullName: `${updates.firstName || 'Customer'} ${updates.lastName || ''}`.trim(),
          email: updates.email || '',
          phone: updates.phone || '',
          sportPreferences: updates.sportPreferences || [],
          membershipTier: 'Club Athlete',
          createdAt: new Date().toISOString().split('T')[0],
          addresses: [],
          orders: [],
          courtInquiries: [],
        };
    this.saveUser(updatedUser);
    return updatedUser;
  }

  static async addAddress(newAddr: Omit<Address, 'id'>): Promise<Address> {
    await new Promise((r) => setTimeout(r, 300));
    let current = this.getCurrentUser();
    const addressWithId: Address = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    if (!current) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName: newAddr.name.split(' ')[0] || 'Customer',
        lastName: newAddr.name.split(' ').slice(1).join(' ') || '',
        fullName: newAddr.name,
        email: '',
        phone: newAddr.phone,
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [addressWithId],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
    } else {
      let updatedAddresses = [...current.addresses];
      if (addressWithId.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      updatedAddresses.unshift(addressWithId);
      current = { ...current, addresses: updatedAddresses };
      this.saveUser(current);
    }
    return addressWithId;
  }

  static async updateAddress(id: string, addrUpdate: Partial<Address>): Promise<Address> {
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser();
    if (!current) throw new Error('No user profile found');
    let target: Address | undefined;
    let updatedAddresses = current.addresses.map((a) => {
      if (a.id === id) {
        target = { ...a, ...addrUpdate };
        return target;
      }
      if (addrUpdate.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });
    if (!target) throw new Error('Address not found');
    this.saveUser({ ...current, addresses: updatedAddresses });
    return target;
  }

  static async deleteAddress(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser();
    if (!current) return;
    const filtered = current.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    this.saveUser({ ...current, addresses: filtered });
  }

  static async setDefaultAddress(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const current = this.getCurrentUser();
    if (!current) return;
    const updated = current.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    this.saveUser({ ...current, addresses: updated });
  }

  static async addOrder(order: Order): Promise<Order> {
    await new Promise((r) => setTimeout(r, 200));
    let current = this.getCurrentUser();
    if (!current) {
      // Create guest customer account with their real details from the order
      const nameParts = (order.shippingAddress.name || 'Customer').trim().split(' ');
      const firstName = nameParts[0] || 'Customer';
      const lastName = nameParts.slice(1).join(' ') || '';
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName,
        lastName,
        fullName: order.shippingAddress.name || `${firstName} ${lastName}`.trim(),
        email: '',
        phone: order.shippingAddress.phone,
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [order.shippingAddress],
        orders: [order],
        courtInquiries: [],
      };
      this.saveUser(newUser);
    } else {
      const orders = [order, ...current.orders];
      const hasAddr = current.addresses.some((a) => a.street === order.shippingAddress.street && a.pincode === order.shippingAddress.pincode);
      const addresses = hasAddr ? current.addresses : [order.shippingAddress, ...current.addresses];
      current = { ...current, orders, addresses };
      this.saveUser(current);
    }
    return order;
  }

  static async signOut(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    localStorage.setItem('oriental_sports_logged_out', 'true');
    this.saveUser(null);
  }
}
