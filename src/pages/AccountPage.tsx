import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Shield,
  Award,
  Layers,
  Phone,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Activity,
  Calendar,
  FileCheck,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { STORE_INFO } from '../data/storeInfo';
import { OrderTracker } from '../components/account/OrderTracker';
import { AddressModal } from '../components/account/AddressModal';
import { Address } from '../types/auth';
import { PageHeader } from '../components/ui/PageHeader';

export type AccountTab = 'overview' | 'orders' | 'addresses' | 'courts' | 'wishlist' | 'profile';

interface AccountPageProps {
  tab?: AccountTab | 'login' | 'signup' | 'verify';
}

export const AccountPage: React.FC<AccountPageProps> = ({ tab }) => {
  const {
    user,
    isAuthenticated,
    openAuthModal,
    setPendingPhone,
    requestOtp,
    verifyOtp,
    signInWithGoogle,
    signOut,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();

  const { wishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<AccountTab>(
    (tab && ['overview', 'orders', 'addresses', 'courts', 'wishlist', 'profile'].includes(tab))
      ? (tab as AccountTab)
      : 'overview'
  );

  React.useEffect(() => {
    if (tab && ['overview', 'orders', 'addresses', 'courts', 'wishlist', 'profile'].includes(tab)) {
      setActiveTab(tab as AccountTab);
    } else if (tab === 'login' || tab === 'signup' || tab === 'verify') {
      if (!isAuthenticated) {
        openAuthModal('phone');
      }
    }
  }, [tab, isAuthenticated, openAuthModal]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered'>('all');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    preferredSport: user?.sportsInterests?.[0] || 'Badminton',
  });
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Sync profile form when user changes
  React.useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email || '',
        preferredSport: user.sportsInterests?.[0] || 'Badminton',
      });
    }
  }, [user]);

  const favoritedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleOpenNewAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (addrData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      await updateAddress(editingAddress.id, addrData);
    } else {
      await addAddress(addrData);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
      sportsInterests: [profileForm.preferredSport],
    });
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Signed out: Authentic, Commercial Indian E-Commerce Member Portal
  if (!isAuthenticated || !user) {
    return (
      <div className="account-page ecom-account-page">
        {/* Breadcrumb & Portal Header */}
        <div className="ecom-account-hero">
          <div className="container">
            <nav aria-label="Breadcrumb" className="crumbs ecom-account-crumbs">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><span aria-current="page">Account & Orders</span></li>
              </ol>
            </nav>

            <div className="ecom-account-hero-content">
              <div className="ecom-hero-badge">
                <Shield size={13} color="#C8102E" />
                <span>MEMBER PORTAL</span>
              </div>
              <h1 className="ecom-account-headline">Account, Orders & Wishlist</h1>
              <p className="ecom-account-sub">
                Sign in with your mobile number to track live dispatches, access saved delivery locations, and view your shortlisted sports gear.
              </p>
            </div>
          </div>
        </div>

        <div className="container ecom-account-body">
          {/* Main 2-Column E-Commerce Hub */}
          <div className="ecom-account-grid">
            {/* Left Card: Direct Fast Phone Sign-in */}
            <div className="ecom-auth-card">
              <div className="ecom-auth-card-head">
                <div className="ecom-auth-icon-wrap">
                  <Phone size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h2 className="ecom-auth-card-title">Fast Sign-In with Mobile</h2>
                  <p className="ecom-auth-card-sub">Instant OTP access. No password required.</p>
                </div>
              </div>

              <form
                className="ecom-phone-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  const input = target.elements.namedItem('phone') as HTMLInputElement;
                  const rawVal = input?.value?.trim() || '';
                  if (rawVal) {
                    setPendingPhone(rawVal);
                    requestOtp(rawVal);
                  } else {
                    openAuthModal('phone');
                  }
                }}
              >
                <div className="ecom-phone-field-group">
                  <span className="ecom-phone-prefix">
                    <span className="ecom-flag">🇮🇳</span> +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue="98230 45812"
                    placeholder="Enter 10-digit mobile"
                    pattern="[0-9\s]{10,14}"
                    className="ecom-phone-input"
                    aria-label="Mobile Number"
                  />
                  <button type="submit" className="ecom-phone-submit-btn">
                    <span>Send OTP</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 14px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em' }}>
                    OR
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                </div>

                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  style={{
                    width: '100%',
                    height: '42px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#1F2937',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <p className="ecom-auth-disclaimer">
                  By signing in, you agree to Oriental Sports’ <Link to="/terms">Terms of Service</Link> & <Link to="/privacy">Privacy Policy</Link>.
                </p>
              </form>

              {/* Trust Pillars */}
              <div className="ecom-trust-pillars">
                <div className="ecom-pillar-item">
                  <Package size={16} className="ecom-pillar-icon" />
                  <div>
                    <strong>Live Dispatch Tracking</strong>
                    <span>Real-time SMS & WhatsApp alerts for bats, rackets & equipment.</span>
                  </div>
                </div>
                <div className="ecom-pillar-item">
                  <MapPin size={16} className="ecom-pillar-icon" />
                  <div>
                    <strong>Express Checkout</strong>
                    <span>Save home, academy, and sports club delivery destinations.</span>
                  </div>
                </div>
                <div className="ecom-pillar-item">
                  <Award size={16} className="ecom-pillar-icon" />
                  <div>
                    <strong>100% Genuine Gear Guarantee</strong>
                    <span>Direct manufacturer warranty and official GST tax invoices.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: E-Commerce Quick Bento Hub */}
            <div className="ecom-hub-bento">
              {/* Order Tracking Tile */}
              <div className="ecom-bento-tile ecom-tile-orders">
                <div className="ecom-tile-head">
                  <Package size={20} color="#C8102E" />
                  <span className="ecom-tile-tag">SELF-SERVICE</span>
                </div>
                <h3 className="ecom-tile-title">Orders & Deliveries</h3>
                <p className="ecom-tile-desc">
                  Track live shipments, download tax invoices, or request returns for bats, balls, and gear.
                </p>
                <button
                  type="button"
                  className="ecom-tile-btn"
                  onClick={() => openAuthModal('phone')}
                >
                  <span>Track Orders</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Wishlist Tile */}
              <div className="ecom-bento-tile ecom-tile-wishlist">
                <div className="ecom-tile-head">
                  <Heart size={20} color="#C8102E" fill={wishlist.length > 0 ? '#C8102E' : 'none'} />
                  <span className="ecom-tile-count">{wishlist.length} SAVED</span>
                </div>
                <h3 className="ecom-tile-title">Saved Wishlist</h3>
                <p className="ecom-tile-desc">
                  Your bookmarked cricket bats, footwear, strings, and machines saved on this device.
                </p>
                <Link to="/wishlist" className="ecom-tile-link">
                  <span>View Wishlist</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Addresses Tile */}
              <div className="ecom-bento-tile ecom-tile-addresses">
                <div className="ecom-tile-head">
                  <MapPin size={20} color="#C8102E" />
                </div>
                <h3 className="ecom-tile-title">Delivery Addresses</h3>
                <p className="ecom-tile-desc">
                  Save doorstep delivery addresses for your residential address, sports academy, or school club.
                </p>
                <button
                  type="button"
                  className="ecom-tile-btn ecom-tile-btn-subtle"
                  onClick={() => openAuthModal('phone')}
                >
                  <span>Manage Locations</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Flagship Store Concierge Tile */}
              <div className="ecom-bento-tile ecom-tile-concierge">
                <div className="ecom-tile-head">
                  <Phone size={20} color="#C8102E" />
                  <span className="ecom-tile-tag ecom-tag-live">PUNE FLAGSHIP</span>
                </div>
                <h3 className="ecom-tile-title">Expert Sports Concierge</h3>
                <p className="ecom-tile-desc">
                  Need bat knocking, racket stringing, or court consultation? Talk directly with our master technicians.
                </p>
                <div className="ecom-concierge-actions">
                  <a
                    href="https://wa.me/919822030000?text=Hi%20Oriental%20Sports%20team,%20I%20need%20assistance%20with%20sports%20gear."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ecom-concierge-wa"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Concierge</span>
                  </a>
                  <a href="tel:+919822030000" className="ecom-concierge-phone">
                    +91 98220 30000
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Products or Trending Showcase */}
          <div className="ecom-account-showcase">
            <div className="ecom-showcase-header">
              <div>
                <h2 className="ecom-showcase-title">
                  {favoritedProducts.length > 0
                    ? `Saved to Wishlist (${favoritedProducts.length})`
                    : 'Trending Gear at Oriental Sports'}
                </h2>
                <p className="ecom-showcase-sub">
                  {favoritedProducts.length > 0
                    ? 'Shortlisted items saved to your browser session.'
                    : 'Popular cricket bats, footballs, and racket gear ready for dispatch.'}
                </p>
              </div>
              <Link to="/shop" className="ecom-showcase-all">
                <span>View Full Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <ul className="product-grid">
              {(favoritedProducts.length > 0 ? favoritedProducts : PRODUCTS.slice(0, 4)).map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Filtered orders
  const filteredOrders = user.orders.filter((o) => {
    if (orderFilter === 'active') return o.status !== 'delivered' && o.status !== 'cancelled';
    if (orderFilter === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <div className="ecom-account-page ecom-account-logged-in" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Top Athlete Banner */}
      <div style={{ backgroundColor: 'var(--color-ink)', color: '#FFFFFF', padding: '36px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Initials Avatar */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-plate-gold)',
                  color: 'var(--color-ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '3px solid #FFFFFF',
                  flexShrink: 0,
                }}
              >
                {user.firstName[0]}
                {user.lastName ? user.lastName[0] : ''}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h1
                    className="font-display"
                    style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: '#FFFFFF', margin: 0 }}
                  >
                    {user.firstName} {user.lastName}
                  </h1>
                  <span
                    style={{
                      backgroundColor: 'rgba(201, 162, 39, 0.25)',
                      color: 'var(--color-plate-gold)',
                      border: '1px solid var(--color-plate-gold)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {user.membershipTier} Member
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <span>+91 {user.phone}</span>
                  {user.email && <span>• {user.email}</span>}
                  <span>• Pune Flagship Member</span>
                </div>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  textAlign: 'right',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
                className="desktop-only"
              >
                <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Stringing Loyalty Points
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-plate-gold)' }}>
                  {user.stringingLoyaltyPoints} Pts
                </div>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="btn btn-outline-light btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                title="Sign out of account"
              >
                <LogOut size={15} />
                <span className="desktop-only">SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'sticky',
          top: '64px',
          zIndex: 40,
        }}
      >
        <div className="container" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', minWidth: 'max-content', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'overview' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'overview' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <Activity size={16} />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'orders' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'orders' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <Package size={16} />
              <span>Orders & Deliveries ({user.orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('addresses')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'addresses' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'addresses' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <MapPin size={16} />
              <span>Saved Addresses ({user.addresses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('courts')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'courts' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'courts' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <Layers size={16} />
              <span>Court Projects ({user.courtProjects?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wishlist')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'wishlist' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'wishlist' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <Heart size={16} />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '14px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === 'profile' ? '#FFFFFF' : '#9CA3AF',
                borderBottom: activeTab === 'profile' ? '3px solid #C8102E' : '3px solid transparent',
              }}
            >
              <User size={16} />
              <span>Preferences</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div>
            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF' }}>
                    Total Orders
                  </span>
                  <Package size={18} color="#C8102E" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {user.orders.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
                  Latest order #{user.orders[0]?.orderNumber}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF' }}>
                    Turnkey Court Inquiries
                  </span>
                  <Layers size={18} color="#3B82F6" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {user.courtProjects?.length || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Deccan Gymkhana & Kalyani Nagar
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF' }}>
                    Saved Equipment
                  </span>
                  <Heart size={18} color="#EF4444" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF' }}>
                  {wishlist.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Equipment in your bag wishlist
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF' }}>
                    Stringing Points
                  </span>
                  <Award size={18} color="#F59E0B" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#F59E0B' }}>
                  {user.stringingLoyaltyPoints}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
                  Eligible for 1 Free Yonex Restring
                </div>
              </div>
            </div>

            {/* Active / Latest Order Spotlight */}
            {user.orders.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h2 className="font-display" style={{ fontSize: '1.25rem', margin: 0, color: '#FFFFFF' }}>
                    ACTIVE / LATEST DISPATCH
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#C8102E',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                    }}
                  >
                    View all {user.orders.length} orders →
                  </button>
                </div>
                <OrderTracker order={user.orders[0]} defaultExpanded={true} />
              </div>
            )}

            {/* Two-column layout: Flagship Store Hub & Addresses */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Flagship Store Connection */}
              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin size={18} color="#C8102E" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#C8102E' }}>
                    YOUR HOME FLAGSHIP
                  </span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px 0', color: '#FFFFFF' }}>
                  Oriental Sports Camp Store
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#A3A3A3', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Shop 247, MG Road, New Modikhana, Camp, Pune - 411001.<br />
                  Walk-in racket stringing tension checks & court consultant available 7 days a week.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-light btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                  >
                    <ExternalLink size={14} />
                    <span>GET DIRECTIONS</span>
                  </a>
                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                  >
                    <MessageCircle size={14} />
                    <span>WHATSAPP STRINGING DESK</span>
                  </a>
                </div>
              </div>

              {/* Default Address Snapshot */}
              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={18} color="#C8102E" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF' }}>
                      DEFAULT SHIPPING DESTINATION
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('addresses')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9CA3AF',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    Manage ({user.addresses.length})
                  </button>
                </div>

                {user.addresses[0] ? (
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {user.addresses[0].name}
                    </h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#A3A3A3', lineHeight: 1.5 }}>
                      {user.addresses[0].street}<br />
                      {user.addresses[0].locality}, {user.addresses[0].city} - {user.addresses[0].pincode}<br />
                      Phone: +91 {user.addresses[0].phone}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenEditAddress(user.addresses[0])}
                      className="btn btn-outline-light btn-sm"
                      style={{ fontSize: '0.75rem' }}
                    >
                      EDIT ADDRESS
                    </button>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#A3A3A3', marginBottom: '12px' }}>
                      No saved addresses yet. Add your home or club address for faster checkout.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenNewAddress}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.75rem' }}
                    >
                      ADD ADDRESS
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= ORDERS TAB ================= */}
        {activeTab === 'orders' && (
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF' }}>
                  PURCHASE & RESTRINGING ORDERS
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  Showing {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'} dispatched from Camp Flagship
                </span>
              </div>

              {/* Order filter buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['all', 'active', 'delivered'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setOrderFilter(filter)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      border: orderFilter === filter ? '1px solid #C8102E' : '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: orderFilter === filter ? '#C8102E' : '#141414',
                      color: orderFilter === filter ? '#FFFFFF' : '#9CA3AF',
                    }}
                  >
                    {filter === 'all' ? 'All Orders' : filter === 'active' ? 'Active Dispatches' : 'Delivered'}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredOrders.map((order) => (
                  <OrderTracker key={order.id} order={order} defaultExpanded={order.status !== 'delivered'} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '48px 24px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Package size={36} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                  No orders match this filter
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '20px' }}>
                  Explore authentic badminton, tennis, and pickleball equipment ready for express delivery in Pune.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  BROWSE PRO SHOP
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ================= ADDRESSES TAB ================= */}
        {activeTab === 'addresses' && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF' }}>
                  SAVED ADDRESSES ({user.addresses.length})
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  Manage delivery destinations for homes, sports clubs, and school academies.
                </span>
              </div>

              <button
                type="button"
                onClick={handleOpenNewAddress}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} />
                <span>ADD NEW ADDRESS</span>
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    backgroundColor: '#121212',
                    borderRadius: '6px',
                    border: addr.isDefault ? '2px solid #C8102E' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '20px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span
                        style={{
                          backgroundColor: '#1F2937',
                          color: '#F3F4F6',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '2px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {addr.type === 'academy' ? 'Club / Academy' : addr.type}
                      </span>

                      {addr.isDefault && (
                        <span
                          style={{
                            backgroundColor: '#C8102E',
                            color: '#FFFFFF',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Check size={12} />
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {addr.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#A3A3A3', lineHeight: 1.5 }}>
                      {addr.street}<br />
                      {addr.locality && `${addr.locality}, `}{addr.city} - {addr.pincode}<br />
                      {addr.state}, India<br />
                      <strong>Phone:</strong> +91 {addr.phone}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                      paddingTop: '14px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {!addr.isDefault ? (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#C8102E',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Set as default
                      </button>
                    ) : (
                      <div />
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditAddress(addr)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#9CA3AF',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                        }}
                        title="Edit address"
                      >
                        <Edit2 size={14} />
                        <span>Edit</span>
                      </button>

                      {user.addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteAddress(addr.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem',
                          }}
                          title="Delete address"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= COURTS TAB ================= */}
        {activeTab === 'courts' && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF' }}>
                  TURNKEY COURT CONSTRUCTION PROJECTS ({user.courtProjects?.length || 0})
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  Track your institutional, school, and club court civil engineering proposals & BOQ documents.
                </span>
              </div>

              <Link
                to="/courts"
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>REQUEST NEW COURT CONSULTATION</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(user.courtProjects || []).map((project: any) => (
                <div
                  key={project.id}
                  style={{
                    backgroundColor: '#121212',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    padding: '24px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>
                          Inquiry Reference: {project.id}
                        </span>
                        <span style={{ color: '#4B5563' }}>•</span>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                          Date: {project.inquiryDate}
                        </span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                        {project.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.8125rem', color: '#D1D5DB' }}>
                        <MapPin size={14} color="#C8102E" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor:
                          project.status === 'proposal_ready'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : project.status === 'site_survey_completed'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        color:
                          project.status === 'proposal_ready'
                            ? '#FBBF24'
                            : project.status === 'site_survey_completed'
                            ? '#60A5FA'
                            : '#34D399',
                        border:
                          project.status === 'proposal_ready'
                            ? '1px solid rgba(245, 158, 11, 0.3)'
                            : project.status === 'site_survey_completed'
                            ? '1px solid rgba(59, 130, 246, 0.3)'
                            : '1px solid rgba(16, 185, 129, 0.3)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.statusLabel}
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '16px',
                      backgroundColor: '#181818',
                      padding: '16px',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div>
                      <span style={{ color: '#9CA3AF', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Sport Category
                      </span>
                      <strong style={{ color: '#FFFFFF' }}>{project.sport}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#9CA3AF', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Surface Specification
                      </span>
                      <strong style={{ color: '#FFFFFF' }}>{project.surfaceType}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#9CA3AF', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Dimensions / Courts
                      </span>
                      <strong style={{ color: '#FFFFFF' }}>{project.dimensions}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#9CA3AF', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Estimated Turnkey BOQ
                      </span>
                      <strong style={{ color: '#FF4D6D' }}>{project.estimatedBudget}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                      Chief Civil Consultant: <strong style={{ color: '#FFFFFF' }}>Oriental Sports Pune Engineering Cell</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a
                        href={`https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello Oriental Sports Court Construction Cell, I am following up on Turnkey Proposal ${project.id} (${project.title}). Can we schedule a site alignment meeting?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                      >
                        <MessageCircle size={14} />
                        <span>WHATSAPP CONSULTANT</span>
                      </a>

                      <Link
                        to="/courts"
                        className="btn btn-outline-light btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                      >
                        <FileCheck size={14} />
                        <span>COURT PORTFOLIO</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= WISHLIST TAB ================= */}
        {activeTab === 'wishlist' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={22} color="#EF4444" fill="#EF4444" />
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF' }}>
                  SAVED EQUIPMENT ({favoritedProducts.length})
                </h2>
              </div>
              <Link to="/shop" className="btn btn-outline-light btn-sm">
                <span>EXPLORE CATALOGUE</span>
              </Link>
            </div>

            {favoritedProducts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
                {favoritedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#121212',
                  padding: '48px 24px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Heart size={40} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
                  Your wishlist is empty
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '20px' }}>
                  Tap the heart on rackets, shuttlecocks, or court footwear to save them to your athlete account.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  BROWSE EQUIPMENT
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ================= PROFILE & PREFERENCES TAB ================= */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '640px' }}>
            <div style={{ backgroundColor: '#121212', padding: '28px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <User size={20} color="#C8102E" />
                <h2 className="font-display" style={{ fontSize: '1.375rem', margin: 0, color: '#FFFFFF' }}>
                  ATHLETE PROFILE & GEAR PREFERENCES
                </h2>
              </div>

              {profileSaveSuccess && (
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '4px',
                    padding: '10px 14px',
                    color: '#34D399',
                    fontSize: '0.8125rem',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle size={16} />
                  <span>Profile and sports preferences saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label
                      htmlFor="prof-fn"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#D1D5DB',
                        marginBottom: '4px',
                      }}
                    >
                      First Name
                    </label>
                    <input
                      id="prof-fn"
                      type="text"
                      required
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#181818',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prof-ln"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#D1D5DB',
                        marginBottom: '4px',
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      id="prof-ln"
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        fontSize: '0.875rem',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#181818',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label
                    htmlFor="prof-email"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#D1D5DB',
                      marginBottom: '4px',
                    }}
                  >
                    Email Address (For Tax Invoices & Order Slips)
                  </label>
                  <input
                    id="prof-email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: '#181818',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label
                    htmlFor="prof-phone"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#D1D5DB',
                      marginBottom: '4px',
                    }}
                  >
                    Verified Mobile Number
                  </label>
                  <input
                    id="prof-phone"
                    type="text"
                    disabled
                    value={`+91 ${user.phone}`}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: '#141414',
                      color: '#9CA3AF',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px', display: 'block' }}>
                    Mobile number is verified via OTP and linked to Camp Store loyalty points.
                  </span>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="prof-sport"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#D1D5DB',
                      marginBottom: '6px',
                    }}
                  >
                    Primary Sport Discipline
                  </label>
                  <select
                    id="prof-sport"
                    value={profileForm.preferredSport}
                    onChange={(e) => setProfileForm({ ...profileForm, preferredSport: e.target.value })}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      fontSize: '0.875rem',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: '#181818',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Badminton">Badminton (BWF Rackets & Shuttles)</option>
                    <option value="Tennis">Lawn Tennis (ITF Rackets & Balls)</option>
                    <option value="Pickleball">Pickleball (USAPA Paddles & Gear)</option>
                    <option value="Squash">Squash (WSF Rackets & Balls)</option>
                    <option value="Table Tennis">Table Tennis (ITTF Rubbers & Blades)</option>
                    <option value="Cricket">Cricket (English & Kashmir Willow Bats)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary btn-sm">
                    SAVE PREFERENCES
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Address modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </div>
  );
};
