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
        return JSON.parse(stored);
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
    const user = this.loadUser();
    // Default to the realistic Pune demo profile if not logged out explicitly
    if (!user && localStorage.getItem('oriental_sports_logged_out') !== 'true') {
      this.saveUser(INITIAL_USER);
      return INITIAL_USER;
    }
    return user;
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
    if (!user || user.phone !== phone) {
      user = {
        ...INITIAL_USER,
        id: `usr_${Date.now()}`,
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        firstName: registrationData?.firstName || 'Sports',
        lastName: registrationData?.lastName || 'Athlete',
        fullName: registrationData ? `${registrationData.firstName} ${registrationData.lastName}` : 'Sports Athlete',
        email: registrationData?.email || `athlete_${Date.now().toString().slice(-4)}@orientalsports.in`,
      };
    }
    this.saveUser(user);
    return user;
  }

  static async signInWithGoogle(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 600));
    localStorage.removeItem('oriental_sports_logged_out');
    const user = {
      ...INITIAL_USER,
      firstName: 'Arjun',
      lastName: 'Deshmukh',
      fullName: 'Arjun Deshmukh',
      email: 'arjun.deshmukh@gmail.com',
    };
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
      user = {
        ...INITIAL_USER,
        email,
        firstName: capitalized,
        lastName: 'Athlete',
        fullName: `${capitalized} Athlete`,
      };
    }
    this.saveUser(user);
    return user;
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser() || INITIAL_USER;
    const updated: UserProfile = {
      ...current,
      ...updates,
      fullName: updates.firstName && updates.lastName 
        ? `${updates.firstName} ${updates.lastName}` 
        : updates.firstName 
        ? `${updates.firstName} ${current.lastName}`
        : current.fullName,
    };
    this.saveUser(updated);
    return updated;
  }

  static async addAddress(newAddr: Omit<Address, 'id'>): Promise<Address> {
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser() || INITIAL_USER;
    const addressWithId: Address = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    let updatedAddresses = [...current.addresses];
    if (addressWithId.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.unshift(addressWithId);
    const updated = { ...current, addresses: updatedAddresses };
    this.saveUser(updated);
    return addressWithId;
  }

  static async updateAddress(id: string, addrUpdate: Partial<Address>): Promise<Address> {
    await new Promise((r) => setTimeout(r, 300));
    const current = this.getCurrentUser() || INITIAL_USER;
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
    const current = this.getCurrentUser() || INITIAL_USER;
    const filtered = current.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    this.saveUser({ ...current, addresses: filtered });
  }

  static async setDefaultAddress(id: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const current = this.getCurrentUser() || INITIAL_USER;
    const updated = current.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    this.saveUser({ ...current, addresses: updated });
  }

  static async signOut(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    localStorage.setItem('oriental_sports_logged_out', 'true');
    this.saveUser(null);
  }
}
