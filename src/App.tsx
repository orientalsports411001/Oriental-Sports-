import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Header } from './components/navigation/Header';
import { CartDrawer } from './components/navigation/CartDrawer';
import { BottomNav } from './components/navigation/BottomNav';
import { Footer } from './components/footer/Footer';
import { BrandIntro } from './components/ui/BrandIntro';
import { Analytics } from './components/analytics/Analytics';

// Pages — the homepage ships in the main bundle; every other route loads on demand.
import { HomePage } from './pages/HomePage';

const page = <K extends string>(loader: () => Promise<Record<K, React.ComponentType<any>>>, name: K) =>
  lazy(() => loader().then((m) => ({ default: m[name] })));

const ShopPage = page(() => import('./pages/ShopPage'), 'ShopPage');
const CategoryPage = page(() => import('./pages/CategoryPage'), 'CategoryPage');
const ProductDetailPage = page(() => import('./pages/ProductDetailPage'), 'ProductDetailPage');
const CourtsPage = page(() => import('./pages/CourtsPage'), 'CourtsPage');
const CourtProjectsPage = page(() => import('./pages/CourtProjectsPage'), 'CourtProjectsPage');
const CourtProjectDetailPage = page(() => import('./pages/CourtProjectDetailPage'), 'CourtProjectDetailPage');
const AboutPage = page(() => import('./pages/AboutPage'), 'AboutPage');
const VisitPage = page(() => import('./pages/VisitPage'), 'VisitPage');
const ContactPage = page(() => import('./pages/ContactPage'), 'ContactPage');
const SearchPage = page(() => import('./pages/SearchPage'), 'SearchPage');
const CartPage = page(() => import('./pages/CartPage'), 'CartPage');
const CheckoutPage = page(() => import('./pages/CheckoutPage'), 'CheckoutPage');
const OrderSuccessPage = page(() => import('./pages/OrderSuccessPage'), 'OrderSuccessPage');
const AccountPage = page(() => import('./pages/AccountPage'), 'AccountPage');
const WishlistPage = page(() => import('./pages/WishlistPage'), 'WishlistPage');
const NotFoundPage = page(() => import('./pages/NotFoundPage'), 'NotFoundPage');
const ShippingPage = page(() => import('./pages/PolicyPages'), 'ShippingPage');
const ReturnsPage = page(() => import('./pages/PolicyPages'), 'ReturnsPage');
const PrivacyPage = page(() => import('./pages/PolicyPages'), 'PrivacyPage');
const TermsPage = page(() => import('./pages/PolicyPages'), 'TermsPage');
const AuthModal = page(() => import('./components/auth/AuthModal'), 'AuthModal');
const AuthCallbackPage = page(() => import('./pages/AuthCallbackPage'), 'AuthCallbackPage');

/** Route loading state: a quiet skeleton of the shared page header. */
const PageSkeleton: React.FC = () => (
  <div className="container page-skeleton" aria-busy="true" aria-label="Loading">
    <span className="skeleton skeleton-crumb" />
    <span className="skeleton skeleton-eyebrow" />
    <span className="skeleton skeleton-title" />
    <span className="skeleton skeleton-title short" />
  </div>
);

/** The sign-in dialog is only fetched once someone opens it. */
const LazyAuthModal: React.FC = () => {
  const { isAuthModalOpen } = useAuth();
  if (!isAuthModalOpen) return null;
  return (
    <Suspense fallback={null}>
      <AuthModal />
    </Suspense>
  );
};

// Scroll restoration component
const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);
  return null;
};

// If arriving at root with OAuth tokens or codes from external redirect, route to /account client-side
const AuthOAuthWatcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const search = window.location.search;
    const hasAuthData = hash.includes('access_token') || hash.includes('error') || search.includes('code') || search.includes('error');

    if (hasAuthData && location.pathname === '/') {
      navigate('/account' + search + hash, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: isCheckout ? 'var(--charcoal)' : 'var(--obsidian)' }}>
      <AuthOAuthWatcher />
      {!isCheckout && <Header />}
      <CartDrawer />
      <LazyAuthModal />

      <main id="main" style={{ flex: 1 }}>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* Core Commerce & Content */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<CategoryPage />} />
            <Route path="/products" element={<ShopPage />} />
            <Route path="/products/:category" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />

            {/* Sports Infrastructure */}
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/installations" element={<CourtsPage />} />
            <Route path="/courts/projects" element={<CourtProjectsPage />} />
            <Route path="/courts/:slug" element={<CourtProjectDetailPage />} />

            {/* Brand & Store */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />

            {/* Customer Account & Authentication Subroutes */}
            <Route path="/account" element={<AccountPage tab="overview" />} />
            <Route path="/account/login" element={<AccountPage tab="login" />} />
            <Route path="/account/signup" element={<AccountPage tab="signup" />} />
            <Route path="/account/verify" element={<AccountPage tab="verify" />} />
            <Route path="/account/orders" element={<AccountPage tab="orders" />} />
            <Route path="/account/orders/:orderId" element={<AccountPage tab="orders" />} />
            <Route path="/account/profile" element={<AccountPage tab="profile" />} />
            <Route path="/account/addresses" element={<AccountPage tab="addresses" />} />
            <Route path="/account/wishlist" element={<WishlistPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* Institutional Policies */}
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* 404 Recovery */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isCheckout && <Footer />}
      {!isCheckout && <BottomNav />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Analytics />
            <ScrollToTop />
            <BrandIntro />
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
