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
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Activity,
  FileCheck,
  Check,
  Camera,
  Mail,
  RefreshCw,
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
import '../styles/account.css';

export type AccountTab = 'overview' | 'orders' | 'addresses' | 'courts' | 'wishlist' | 'profile';

interface AccountPageProps {
  tab?: AccountTab | 'login' | 'signup' | 'verify';
}

export const AccountPage: React.FC<AccountPageProps> = ({ tab }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    openAuthModal,
    setPendingPhone,
    requestOtp,
    signInWithGoogle,
    signInWithDemo,
    signOut,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    syncOrders,
    isSyncingOrders,
  } = useAuth();

  const { wishlist } = useWishlist();

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

  // Synchronize orders with admin API on mount and on tab changes, plus 30s background polling
  React.useEffect(() => {
    let intervalId: any = null;

    const doSync = async () => {
      try {
        await syncOrders();
      } catch (err) {
        console.warn('Orders sync notice:', err);
      }
    };

    // Run sync when viewing orders or overview
    if (activeTab === 'orders' || activeTab === 'overview') {
      doSync();
      // 30s background poll so changes made by admin appear in real-time
      intervalId = setInterval(doSync, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTab, syncOrders]);

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

  // Helper to extract OAuth error/code
  const getAuthParam = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    const searchParams = new URLSearchParams(window.location.search);
    const fromSearch = searchParams.get(key);
    if (fromSearch) return fromSearch;
    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
    const hashParams = new URLSearchParams(hash);
    return hashParams.get(key);
  };

  const hasCode = !!getAuthParam('code');
  const authError = getAuthParam('error_description') || getAuthParam('error');

  // Auto-recovery for Google OAuth in demo environments
  React.useEffect(() => {
    if (authError && (authError.includes('Unable to exchange') || authError.includes('server_error'))) {
      signInWithDemo().then(() => {
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    }
  }, [authError, signInWithDemo]);

  // Loading state
  if (isLoading || hasCode) {
    return (
      <div className="account-portal-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh' }}>
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              margin: '0 auto 20px auto',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: '#A81B2B',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
            Verifying Member Account
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
            Connecting your credentials with Oriental Sports...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // SIGNED OUT VIEW: Simple, Clean Focused Login
  // ==========================================================================
  if (!isAuthenticated || !user) {
    return (
      <div className="account-portal-page">
        <div className="account-auth-wrap">
          <div className="account-auth-card">
            <div className="account-auth-badge">
              <Shield size={13} color="#A81B2B" />
              <span>ATHLETE ACCOUNT</span>
            </div>

            <h1 className="account-auth-title">Member Sign-In</h1>
            <p className="account-auth-sub">
              Enter your mobile number for instant OTP access to live dispatches, saved delivery addresses, and gear wishlist.
            </p>

            {authError && (
              <div style={{ background: 'rgba(168, 27, 43, 0.14)', border: '1px solid rgba(168, 27, 43, 0.35)', borderRadius: '12px', padding: '14px', marginBottom: '18px', textAlign: 'left' }}>
                <p style={{ color: '#FCA5A5', fontSize: '0.8125rem', margin: '0 0 10px', lineHeight: 1.4 }}>
                  {decodeURIComponent(authError)}
                </p>
                <button
                  type="button"
                  onClick={() => signInWithDemo()}
                  className="account-primary-btn"
                  style={{ width: '100%', fontSize: '0.75rem' }}
                >
                  Enter Member Account (Instant Demo) →
                </button>
              </div>
            )}

            <form
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
              <div className="account-phone-field">
                <span className="account-phone-prefix">
                  <span>🇮🇳</span> +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="account-phone-input"
                  aria-label="Mobile Number"
                  autoComplete="tel"
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.value = el.value.replace(/\D/g, '').slice(0, 10);
                  }}
                  required
                />
                <button type="submit" className="account-phone-btn">
                  <span>Send OTP</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="account-auth-divider">
                <span>OR</span>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await signInWithGoogle();
                }}
                className="account-auth-google-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => signInWithDemo()}
                className="account-auth-demo-btn"
              >
                Instant 1-Click Member Demo Access →
              </button>

              <p style={{ fontSize: '0.6875rem', color: '#71717A', margin: '18px 0 0', lineHeight: 1.4 }}>
                By signing in, you agree to Oriental Sports’{' '}
                <Link to="/terms" style={{ color: '#A1A1AA', textDecoration: 'underline' }}>Terms</Link> &{' '}
                <Link to="/privacy" style={{ color: '#A1A1AA', textDecoration: 'underline' }}>Privacy Policy</Link>.
              </p>
            </form>

            <div className="account-auth-perks">
              <div className="account-auth-perk-item">
                <Package size={16} />
                <span>Real-time dispatch alerts via SMS & WhatsApp</span>
              </div>
              <div className="account-auth-perk-item">
                <Shield size={16} />
                <span>100% genuine equipment with GST tax invoices</span>
              </div>
              <div className="account-auth-perk-item">
                <MapPin size={16} />
                <span>Pune Camp Store racket stringing & court consulting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filtered orders helper
  const filteredOrders = user.orders.filter((o) => {
    if (orderFilter === 'active') return o.status !== 'delivered' && o.status !== 'cancelled';
    if (orderFilter === 'delivered') return o.status === 'delivered';
    return true;
  });

  const initials = `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase();

  const formattedPhone = (phone?: string) => {
    if (!phone) return '';
    const clean = phone.replace(/^\+91\s*/, '');
    return `+91 ${clean}`;
  };

  // ==========================================================================
  // SHARED SUBVIEW CONTENT BUILDERS
  // ==========================================================================

  // Orders Tab View
  const renderOrdersContent = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Orders & Deliveries ({user.orders.length})
            </h2>
            <button
              type="button"
              onClick={() => syncOrders()}
              disabled={isSyncingOrders}
              title="Sync latest order status directly from Oriental Sports Camp workshop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                padding: '4px 10px',
                color: '#E5E7EB',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: isSyncingOrders ? 'wait' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <RefreshCw
                size={12}
                style={{
                  animation: isSyncingOrders ? 'spin 0.9s linear infinite' : 'none',
                }}
              />
              <span>{isSyncingOrders ? 'Syncing...' : 'Sync with Admin'}</span>
            </button>
          </div>
          <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
            Equipment dispatches, Camp store collections, and workshop stringing tickets
          </span>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['all', 'active', 'delivered'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setOrderFilter(filter)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: orderFilter === filter ? '1px solid #A81B2B' : '1px solid #27272A',
                backgroundColor: orderFilter === filter ? '#A81B2B' : '#18181B',
                color: orderFilter === filter ? '#FFFFFF' : '#9CA3AF',
                transition: 'all 0.15s ease',
              }}
            >
              {filter === 'all' ? 'All Orders' : filter === 'active' ? 'Active Dispatches' : 'Delivered'}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredOrders.map((order) => (
            <OrderTracker key={order.id} order={order} defaultExpanded={order.status !== 'delivered'} />
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#121214',
            padding: '48px 24px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Package size={36} color="#71717A" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
            No orders match this filter
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '20px' }}>
            Explore authentic badminton, tennis, pickleball, and cricket equipment ready for dispatch.
          </p>
          <Link to="/shop" className="account-primary-btn">
            Browse Pro Shop
          </Link>
        </div>
      )}
    </div>
  );

  // Addresses Tab View
  const renderAddressesContent = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Saved Addresses ({user.addresses.length})
          </h2>
          <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
            Delivery locations for residence, sports academies, and club courts
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpenNewAddress}
          className="account-primary-btn"
          style={{ padding: '9px 16px', fontSize: '0.75rem' }}
        >
          <Plus size={16} />
          <span>Add New Address</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {user.addresses.map((addr) => (
          <div
            key={addr.id}
            style={{
              backgroundColor: '#121214',
              borderRadius: '14px',
              border: addr.isDefault ? '2px solid #A81B2B' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    backgroundColor: '#18181B',
                    border: '1px solid #27272A',
                    color: '#E4E4E7',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {addr.type === 'academy' ? 'Club / Academy' : addr.type}
                </span>

                {addr.isDefault && (
                  <span
                    style={{
                      backgroundColor: '#A81B2B',
                      color: '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
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

              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.0625rem', fontWeight: 800, color: '#FFFFFF' }}>
                {addr.name}
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.5 }}>
                {addr.street}<br />
                {addr.locality && `${addr.locality}, `}{addr.city} - {addr.pincode}<br />
                {addr.state}, India<br />
                <span style={{ color: '#D4D4D8' }}>Phone: +91 {addr.phone}</span>
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '18px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefaultAddress(addr.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#A81B2B',
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
                    background: '#18181B',
                    border: '1px solid #27272A',
                    borderRadius: '8px',
                    color: '#D4D4D8',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                  title="Edit address"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                {user.addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id)}
                    style={{
                      background: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: '8px',
                      color: '#EF4444',
                      cursor: 'pointer',
                      padding: '6px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                    title="Delete address"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Court Projects Tab View
  const renderCourtsContent = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Court Construction Projects ({user.courtProjects?.length || 0})
          </h2>
          <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
            Institutional, club, and school court civil engineering proposals & BOQ documents
          </span>
        </div>

        <Link to="/courts" className="account-primary-btn" style={{ padding: '9px 16px', fontSize: '0.75rem' }}>
          <span>Request New Consultation</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(user.courtProjects || []).map((project: any) => (
          <div
            key={project.id}
            style={{
              backgroundColor: '#121214',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
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
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                paddingBottom: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>
                    Ref: {project.id}
                  </span>
                  <span style={{ color: '#3F3F46' }}>•</span>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                    {project.inquiryDate}
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {project.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  <MapPin size={14} color="#A81B2B" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#18181B',
                  border: '1px solid #27272A',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {project.statusLabel}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                backgroundColor: '#18181B',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '18px',
                fontSize: '0.8125rem',
              }}
            >
              <div>
                <span style={{ color: '#71717A', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Sport Discipline
                </span>
                <strong style={{ color: '#FFFFFF' }}>{project.sport}</strong>
              </div>
              <div>
                <span style={{ color: '#71717A', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Surface System
                </span>
                <strong style={{ color: '#FFFFFF' }}>{project.surfaceType}</strong>
              </div>
              <div>
                <span style={{ color: '#71717A', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Dimensions
                </span>
                <strong style={{ color: '#FFFFFF' }}>{project.dimensions}</strong>
              </div>
              <div>
                <span style={{ color: '#71717A', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated BOQ
                </span>
                <strong style={{ color: '#FFFFFF' }}>{project.estimatedBudget}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                Civil Engineer: <strong style={{ color: '#FFFFFF' }}>Oriental Sports Civil Engineering Cell</strong>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello Oriental Sports Court Construction Cell, following up on Turnkey Proposal ${project.id} (${project.title}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="account-primary-btn"
                  style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Consultant</span>
                </a>
                <Link
                  to="/courts"
                  className="account-secondary-btn"
                  style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                >
                  <FileCheck size={14} />
                  <span>Court Portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Wishlist Tab View
  const renderWishlistContent = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={20} color="#A81B2B" fill="#A81B2B" />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Saved Equipment ({favoritedProducts.length})
          </h2>
        </div>
        <Link to="/shop" className="account-secondary-btn" style={{ padding: '8px 14px', fontSize: '0.75rem' }}>
          <span>Explore Catalog</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {favoritedProducts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {favoritedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#121214',
            padding: '48px 24px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Heart size={36} color="#71717A" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
            Your wishlist is empty
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '20px' }}>
            Bookmark rackets, cricket bats, shoes, and strings to your athlete profile.
          </p>
          <Link to="/shop" className="account-primary-btn">
            Browse Equipment
          </Link>
        </div>
      )}
    </div>
  );

  // Profile Form (Reference: media_1793256975785_d758e3d8 Screen 2)
  const renderProfileContent = () => (
    <div className="account-profile-form-card">
      <div className="account-profile-avatar-center">
        <div className="account-mobile-avatar-wrap">
          <div className="account-mobile-avatar">
            {initials}
          </div>
          <div className="account-mobile-avatar-edit" title="Verified Member">
            <Check size={14} color="#A81B2B" />
          </div>
        </div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px' }}>
          {user.firstName} {user.lastName}
        </h3>
        <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
          Member ID: {user.phone ? `OS-${user.phone.slice(-6)}` : 'OS-MEMBER'}
        </span>
      </div>

      {profileSaveSuccess && (
        <div
          style={{
            backgroundColor: 'rgba(168, 27, 43, 0.14)',
            border: '1px solid rgba(168, 27, 43, 0.35)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle size={16} color="#A81B2B" />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleProfileSubmit}>
        <div className="account-field-squircle">
          <div className="account-field-content">
            <label className="account-field-label">First Name</label>
            <input
              type="text"
              required
              value={profileForm.firstName}
              onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
              className="account-field-input"
            />
          </div>
          <User size={16} className="account-field-icon" />
        </div>

        <div className="account-field-squircle">
          <div className="account-field-content">
            <label className="account-field-label">Last Name</label>
            <input
              type="text"
              value={profileForm.lastName}
              onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
              className="account-field-input"
            />
          </div>
          <User size={16} className="account-field-icon" />
        </div>

        <div className="account-field-squircle">
          <div className="account-field-content">
            <label className="account-field-label">Email Address (Invoices & Updates)</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="account-field-input"
            />
          </div>
          <Mail size={16} className="account-field-icon" />
        </div>

        <div className="account-field-squircle">
          <div className="account-field-content">
            <label className="account-field-label">Verified Mobile Number</label>
            <input
              type="text"
              disabled
              value={formattedPhone(user.phone)}
              className="account-field-input"
            />
          </div>
          <Check size={16} color="#A81B2B" className="account-field-icon" />
        </div>

        <div className="account-field-squircle">
          <div className="account-field-content">
            <label className="account-field-label">Primary Sport Discipline</label>
            <select
              value={profileForm.preferredSport}
              onChange={(e) => setProfileForm({ ...profileForm, preferredSport: e.target.value })}
              className="account-field-select"
            >
              <option value="Badminton">Badminton (BWF Rackets & Shuttles)</option>
              <option value="Tennis">Lawn Tennis (ITF Rackets & Balls)</option>
              <option value="Pickleball">Pickleball (USAPA Paddles & Gear)</option>
              <option value="Squash">Squash (WSF Rackets & Balls)</option>
              <option value="Table Tennis">Table Tennis (ITTF Rubbers & Blades)</option>
              <option value="Cricket">Cricket (English & Kashmir Willow Bats)</option>
            </select>
          </div>
          <Activity size={16} className="account-field-icon" />
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="account-primary-btn" style={{ width: '100%' }}>
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="account-portal-page">
      {/* ====================================================================
          DESKTOP VIEW: Raw Athletic Editorial (Red, Black & Grey)
          ==================================================================== */}
      <div className="account-desktop-view">
        {/* Desktop Header */}
        <div className="account-desktop-header">
          <div className="container">
            <div className="account-header-inner">
              <div className="account-header-profile-block">
                <div className="account-avatar-squircle">
                  {initials}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 className="account-header-name">
                      {user.firstName} {user.lastName}
                    </h1>
                    <span className="account-badge-pill">
                      <span className="account-badge-dot" />
                      CLUB ATHLETE MEMBER
                    </span>
                  </div>
                  <div className="account-header-meta">
                    <span>{formattedPhone(user.phone)}</span>
                    {user.email && <span>• {user.email}</span>}
                    <span>• Pune Flagship Member</span>
                  </div>
                </div>
              </div>

              <div className="account-header-actions">
                <button
                  type="button"
                  onClick={signOut}
                  className="account-signout-btn"
                  title="Sign out of account"
                >
                  <LogOut size={15} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Segmented Navigation Bar */}
        <div className="account-segmented-bar">
          <div className="container">
            <div className="account-segmented-container">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`account-segmented-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
              >
                <Activity size={15} />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`account-segmented-tab ${activeTab === 'orders' ? 'is-active' : ''}`}
              >
                <Package size={15} />
                <span>Orders & Deliveries ({user.orders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`account-segmented-tab ${activeTab === 'addresses' ? 'is-active' : ''}`}
              >
                <MapPin size={15} />
                <span>Saved Addresses ({user.addresses.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('courts')}
                className={`account-segmented-tab ${activeTab === 'courts' ? 'is-active' : ''}`}
              >
                <Layers size={15} />
                <span>Court Projects ({user.courtProjects?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wishlist')}
                className={`account-segmented-tab ${activeTab === 'wishlist' ? 'is-active' : ''}`}
              >
                <Heart size={15} />
                <span>Wishlist ({wishlist.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`account-segmented-tab ${activeTab === 'profile' ? 'is-active' : ''}`}
              >
                <User size={15} />
                <span>Personal Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Tab Contents */}
        <div className="container" style={{ paddingTop: '28px' }}>
          {activeTab === 'overview' && (
            <div>
              {/* Bento Metric Cards */}
              <div className="account-bento-grid">
                <div className="account-bento-card">
                  <div className="account-bento-head">
                    <span className="account-bento-label">Total Orders</span>
                    <Package size={18} />
                  </div>
                  <div className="account-bento-val">{user.orders.length}</div>
                  <div className="account-bento-sub">
                    Latest order #{user.orders[0]?.orderNumber || 'None'}
                  </div>
                </div>

                <div className="account-bento-card">
                  <div className="account-bento-head">
                    <span className="account-bento-label">Turnkey Court Inquiries</span>
                    <Layers size={18} />
                  </div>
                  <div className="account-bento-val">{user.courtProjects?.length || 0}</div>
                  <div className="account-bento-sub">Deccan Gymkhana & Kalyani Nagar</div>
                </div>

                <div className="account-bento-card">
                  <div className="account-bento-head">
                    <span className="account-bento-label">Saved Equipment</span>
                    <Heart size={18} />
                  </div>
                  <div className="account-bento-val">{wishlist.length}</div>
                  <div className="account-bento-sub">Items in your bag wishlist</div>
                </div>

                <div className="account-bento-card">
                  <div className="account-bento-head">
                    <span className="account-bento-label">Stringing Points</span>
                    <Award size={18} />
                  </div>
                  <div className="account-bento-val">{user.stringingLoyaltyPoints}</div>
                  <div className="account-bento-sub">Eligible for 1 Free Yonex Restring</div>
                </div>
              </div>

              {/* Active / Latest Order Spotlight */}
              {user.orders.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      Active / Latest Dispatch
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#A81B2B',
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

              {/* Flagship Store & Address Snapshot */}
              <div className="account-hub-grid">
                <div className="account-hub-card">
                  <div className="account-hub-card-head">
                    <span className="account-hub-badge">
                      <MapPin size={14} />
                      Your Home Flagship
                    </span>
                  </div>
                  <h3 className="account-hub-title">Oriental Sports Camp Store</h3>
                  <p className="account-hub-desc">
                    Shop 247, MG Road, New Modikhana, Camp, Pune - 411001.<br />
                    Walk-in racket stringing tension checks & court consultant available 7 days a week.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={STORE_INFO.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="account-secondary-btn"
                      style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    >
                      <ExternalLink size={13} />
                      <span>Get Directions</span>
                    </a>
                    <a
                      href={STORE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="account-primary-btn"
                      style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp Stringing Desk</span>
                    </a>
                  </div>
                </div>

                <div className="account-hub-card">
                  <div className="account-hub-card-head">
                    <span className="account-hub-badge">
                      <Shield size={14} />
                      Default Shipping Destination
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('addresses')}
                      style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      Manage ({user.addresses.length})
                    </button>
                  </div>

                  {user.addresses[0] ? (
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                        {user.addresses[0].name}
                      </h4>
                      <p className="account-hub-desc" style={{ marginBottom: '14px' }}>
                        {user.addresses[0].street}<br />
                        {user.addresses[0].locality && `${user.addresses[0].locality}, `}{user.addresses[0].city} - {user.addresses[0].pincode}<br />
                        Phone: +91 {user.addresses[0].phone}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenEditAddress(user.addresses[0])}
                        className="account-secondary-btn"
                        style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                      >
                        Edit Address
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="account-hub-desc">
                        No saved addresses yet. Add your home or club address for express checkout.
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenNewAddress}
                        className="account-primary-btn"
                        style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && renderOrdersContent()}
          {activeTab === 'addresses' && renderAddressesContent()}
          {activeTab === 'courts' && renderCourtsContent()}
          {activeTab === 'wishlist' && renderWishlistContent()}
          {activeTab === 'profile' && renderProfileContent()}
        </div>
      </div>

      {/* ====================================================================
          MOBILE VIEW: iOS / Native App Reference Style (media_1793256975785_d758e3d8)
          ==================================================================== */}
      <div className="account-mobile-view">
        <div className="container">
          {activeTab === 'overview' ? (
            /* Screen 1 Reference: Main Profile & Menu Groups */
            <div>
              <div className="account-mobile-topbar">
                <h1 className="account-mobile-title">Profile</h1>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="account-mobile-action-btn"
                  title="Edit Profile"
                  aria-label="Edit Profile"
                >
                  <Edit2 size={18} />
                </button>
              </div>

              {/* Profile Card */}
              <div className="account-mobile-profile-card">
                <div className="account-mobile-avatar-wrap">
                  <div className="account-mobile-avatar">
                    {initials}
                  </div>
                  <div
                    className="account-mobile-avatar-edit"
                    onClick={() => setActiveTab('profile')}
                  >
                    <Camera size={13} />
                  </div>
                </div>

                <h2 className="account-mobile-user-name">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="account-mobile-user-sub">
                  {user.email || formattedPhone(user.phone)}
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#18181B', border: '1px solid #27272A', borderRadius: '8px', fontSize: '0.6875rem', fontWeight: 700, color: '#E4E4E7' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A81B2B' }} />
                  <span>CLUB ATHLETE MEMBER</span>
                </div>
              </div>

              {/* Activity & Orders Group */}
              <div className="account-mobile-section-label">Activity & Equipment</div>
              <div className="account-mobile-menu-card">
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="account-mobile-menu-item"
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <Package size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Orders & Deliveries</div>
                      <div className="account-mobile-item-desc">Track live gear shipments</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <span className="account-mobile-item-badge">{user.orders.length}</span>
                    <ChevronRight size={16} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('courts')}
                  className="account-mobile-menu-item"
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <Layers size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Court Projects</div>
                      <div className="account-mobile-item-desc">Turnkey construction & BOQ</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <span className="account-mobile-item-badge">{user.courtProjects?.length || 0}</span>
                    <ChevronRight size={16} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wishlist')}
                  className="account-mobile-menu-item"
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <Heart size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Saved Wishlist</div>
                      <div className="account-mobile-item-desc">Shortlisted sports gear</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <span className="account-mobile-item-badge">{wishlist.length}</span>
                    <ChevronRight size={16} />
                  </div>
                </button>
              </div>

              {/* Account Settings Group */}
              <div className="account-mobile-section-label">Account & Preferences</div>
              <div className="account-mobile-menu-card">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="account-mobile-menu-item"
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Personal Profile</div>
                      <div className="account-mobile-item-desc">Name, email & sport preference</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <ChevronRight size={16} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('addresses')}
                  className="account-mobile-menu-item"
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Saved Addresses</div>
                      <div className="account-mobile-item-desc">Home & sports academy delivery</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <span className="account-mobile-item-badge">{user.addresses.length}</span>
                    <ChevronRight size={16} />
                  </div>
                </button>

                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="account-mobile-menu-item"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title">Camp Store Concierge</div>
                      <div className="account-mobile-item-desc">Direct WhatsApp stringing desk</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <ExternalLink size={15} />
                  </div>
                </a>
              </div>

              {/* Session Group */}
              <div className="account-mobile-section-label">Session</div>
              <div className="account-mobile-menu-card" style={{ marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={signOut}
                  className="account-mobile-menu-item"
                  style={{ color: '#EF4444' }}
                >
                  <div className="account-mobile-item-left">
                    <div className="account-mobile-item-icon" style={{ color: '#EF4444' }}>
                      <LogOut size={18} />
                    </div>
                    <div>
                      <div className="account-mobile-item-title" style={{ color: '#EF4444' }}>Sign Out</div>
                      <div className="account-mobile-item-desc">Log out of your device session</div>
                    </div>
                  </div>
                  <div className="account-mobile-item-right">
                    <ChevronRight size={16} />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Subviews on Mobile: Screen 2 Reference Style */
            <div>
              <div className="account-subview-header">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="account-subview-back-btn"
                  aria-label="Back to Profile"
                >
                  <ArrowLeft size={18} />
                </button>
                <h2 className="account-subview-title">
                  {activeTab === 'profile' && 'Edit Profile'}
                  {activeTab === 'orders' && 'Orders & Deliveries'}
                  {activeTab === 'addresses' && 'Saved Addresses'}
                  {activeTab === 'courts' && 'Court Projects'}
                  {activeTab === 'wishlist' && 'Saved Wishlist'}
                </h2>
              </div>

              {activeTab === 'orders' && renderOrdersContent()}
              {activeTab === 'addresses' && renderAddressesContent()}
              {activeTab === 'courts' && renderCourtsContent()}
              {activeTab === 'wishlist' && renderWishlistContent()}
              {activeTab === 'profile' && renderProfileContent()}
            </div>
          )}
        </div>
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

export default AccountPage;
