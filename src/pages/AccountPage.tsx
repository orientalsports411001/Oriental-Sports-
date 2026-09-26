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

  // Signed out: say plainly what an account is for, one clear action.
  if (!isAuthenticated || !user) {
    return (
      <div className="account-page">
        <PageHeader
          crumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
          title={['Your', 'account.']}
          lead="Sign in with your phone number to see your orders and keep your delivery addresses in one place."
        >
          <div className="page-header-actions">
            <button type="button" className="btn btn-primary" onClick={() => openAuthModal('phone')}>
              Sign in with phone <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            <Link to="/shop" className="link-arrow">Keep shopping <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
        </PageHeader>

        <section className="container account-intro" aria-label="What your account holds">
          <ul className="counter-list">
            <li><span className="counter-name">Orders</span><span className="counter-note">What you’ve ordered and where it is.</span></li>
            <li><span className="counter-name">Addresses</span><span className="counter-note">Home, office or club — ready at checkout.</span></li>
            <li><span className="counter-name">Wishlist</span><span className="counter-note">Gear you’ve saved to come back to.</span></li>
          </ul>

          {favoritedProducts.length > 0 && (
            <div className="account-saved">
              <div className="section-bar">
                <h2 className="display d-3">Saved on this device</h2>
                <span className="results-count">{favoritedProducts.length}</span>
              </div>
              <ul className="product-grid">
                {favoritedProducts.map((p) => (
                  <li key={p.id}><ProductCard product={p} /></li>
                ))}
              </ul>
            </div>
          )}
        </section>
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
    <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
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
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-ivory-border)',
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
                color: activeTab === 'overview' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'overview' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                color: activeTab === 'orders' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'orders' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                color: activeTab === 'addresses' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'addresses' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                color: activeTab === 'courts' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'courts' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                color: activeTab === 'wishlist' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'wishlist' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                color: activeTab === 'profile' ? 'var(--color-ink)' : '#4B5563',
                borderBottom: activeTab === 'profile' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
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
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                    Total Orders
                  </span>
                  <Package size={18} color="var(--color-brand-gold)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
                  {user.orders.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
                  Latest order #{user.orders[0]?.orderNumber}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                    Turnkey Court Inquiries
                  </span>
                  <Layers size={18} color="var(--color-plate-gold)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
                  {user.courtProjects?.length || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                  Deccan Gymkhana & Kalyani Nagar
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                    Saved Equipment
                  </span>
                  <Heart size={18} color="#EF4444" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
                  {wishlist.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                  Equipment in your bag wishlist
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                    Stringing Points
                  </span>
                  <Award size={18} color="var(--color-plate-gold)" />
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-plate-gold)' }}>
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
                  <h2 className="font-display" style={{ fontSize: '1.25rem', margin: 0 }}>
                    ACTIVE / LATEST DISPATCH
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-ink)',
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
                  backgroundColor: '#FFFFFF',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <MapPin size={18} color="var(--color-plate-gold)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
                    YOUR HOME FLAGSHIP
                  </span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                  Oriental Sports Camp Store
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  Shop 247, MG Road, New Modikhana, Camp, Pune - 411001.<br />
                  Walk-in racket stringing tension checks & court consultant available 7 days a week.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-dark btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                  >
                    <ExternalLink size={14} />
                    <span>GET DIRECTIONS</span>
                  </a>
                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-gold btn-sm"
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
                  backgroundColor: '#FFFFFF',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={18} color="var(--color-brand-gold)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ink)' }}>
                      DEFAULT SHIPPING DESTINATION
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('addresses')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
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
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800 }}>
                      {user.addresses[0].name}
                    </h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.5 }}>
                      {user.addresses[0].street}<br />
                      {user.addresses[0].locality}, {user.addresses[0].city} - {user.addresses[0].pincode}<br />
                      Phone: +91 {user.addresses[0].phone}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenEditAddress(user.addresses[0])}
                      className="btn btn-outline-dark btn-sm"
                      style={{ fontSize: '0.75rem' }}
                    >
                      EDIT ADDRESS
                    </button>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '12px' }}>
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
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
                  PURCHASE & RESTRINGING ORDERS
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
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
                      border: orderFilter === filter ? '1px solid var(--color-ink)' : '1px solid #D1D5DB',
                      backgroundColor: orderFilter === filter ? 'var(--color-ink)' : '#FFFFFF',
                      color: orderFilter === filter ? '#FFFFFF' : '#4B5563',
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
                  backgroundColor: '#FFFFFF',
                  padding: '48px 24px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <Package size={36} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
                  No orders match this filter
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '20px' }}>
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
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
                  SAVED ADDRESSES ({user.addresses.length})
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
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
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: addr.isDefault ? '2px solid var(--color-brand-gold)' : '1px solid var(--color-ivory-border)',
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
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
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
                            backgroundColor: 'var(--color-ink)',
                            color: 'var(--color-brand-gold)',
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

                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800 }}>
                      {addr.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.5 }}>
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
                      borderTop: '1px solid #F3F4F6',
                    }}
                  >
                    {!addr.isDefault ? (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-ink)',
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
                          color: '#4B5563',
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
                            color: '#DC2626',
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
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
                  TURNKEY COURT CONSTRUCTION PROJECTS ({user.courtProjects?.length || 0})
                </h2>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                  Track your institutional, school, and club court civil engineering proposals & BOQ documents.
                </span>
              </div>

              <Link
                to="/courts"
                className="btn btn-gold btn-sm"
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
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid var(--color-ivory-border)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
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
                      borderBottom: '1px solid #F3F4F6',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
                          Inquiry Reference: {project.id}
                        </span>
                        <span>•</span>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          Date: {project.inquiryDate}
                        </span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ink)' }}>
                        {project.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.8125rem', color: '#4B5563' }}>
                        <MapPin size={14} color="var(--color-plate-gold)" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor:
                          project.status === 'proposal_ready'
                            ? '#FEF3C7'
                            : project.status === 'site_survey_completed'
                            ? '#EFF6FF'
                            : '#ECFDF5',
                        color:
                          project.status === 'proposal_ready'
                            ? '#B45309'
                            : project.status === 'site_survey_completed'
                            ? '#1D4ED8'
                            : '#047857',
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
                      backgroundColor: '#F9FAFB',
                      padding: '16px',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div>
                      <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Sport Category
                      </span>
                      <strong style={{ color: '#111827' }}>{project.sport}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Surface Specification
                      </span>
                      <strong style={{ color: '#111827' }}>{project.surfaceType}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Dimensions / Courts
                      </span>
                      <strong style={{ color: '#111827' }}>{project.dimensions}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                        Estimated Turnkey BOQ
                      </span>
                      <strong style={{ color: 'var(--color-brand-gold)' }}>{project.estimatedBudget}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
                      Chief Civil Consultant: <strong>Oriental Sports Pune Engineering Cell</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a
                        href={`https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello Oriental Sports Court Construction Cell, I am following up on Turnkey Proposal ${project.id} (${project.title}). Can we schedule a site alignment meeting?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-gold btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
                      >
                        <MessageCircle size={14} />
                        <span>WHATSAPP CONSULTANT</span>
                      </a>

                      <Link
                        to="/courts"
                        className="btn btn-outline-dark btn-sm"
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
                <Heart size={22} color="#C9A227" fill="#C9A227" />
                <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
                  SAVED EQUIPMENT ({favoritedProducts.length})
                </h2>
              </div>
              <Link to="/shop" className="btn btn-outline-dark btn-sm">
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
                  backgroundColor: '#FFFFFF',
                  padding: '48px 24px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  border: '1px solid var(--color-ivory-border)',
                }}
              >
                <Heart size={40} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
                  Your wishlist is empty
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '20px' }}>
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
            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '6px', border: '1px solid var(--color-ivory-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <User size={20} color="var(--color-plate-gold)" />
                <h2 className="font-display" style={{ fontSize: '1.375rem', margin: 0 }}>
                  ATHLETE PROFILE & GEAR PREFERENCES
                </h2>
              </div>

              {profileSaveSuccess && (
                <div
                  style={{
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #6EE7B7',
                    borderRadius: '4px',
                    padding: '10px 14px',
                    color: '#065F46',
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
                        color: '#374151',
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
                        border: '1px solid #D1D5DB',
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
                        color: '#374151',
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
                        border: '1px solid #D1D5DB',
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
                      color: '#374151',
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
                      border: '1px solid #D1D5DB',
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
                      color: '#374151',
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
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#F9FAFB',
                      color: '#6B7280',
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
                      color: '#374151',
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
                      border: '1px solid #D1D5DB',
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
