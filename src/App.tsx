import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Header } from './components/navigation/Header';
import { MobileBottomNav } from './components/navigation/MobileBottomNav';
import { CartDrawer } from './components/navigation/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { Footer } from './components/footer/Footer';
import { CustomCursor } from './components/ui/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CourtsPage } from './pages/CourtsPage';
import { CourtProjectsPage } from './pages/CourtProjectsPage';
import { CourtProjectDetailPage } from './pages/CourtProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { VisitPage } from './pages/VisitPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ShippingPage, ReturnsPage, PrivacyPage, TermsPage } from './pages/PolicyPages';

// Scroll restoration component
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <CustomCursor />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-canvas-base)' }}>
              <Header />
              <CartDrawer />
              <AuthModal />

              <div style={{ flex: 1 }}>
                <Routes>
                  {/* Core Commerce & Content */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/:category" element={<CategoryPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />

                  {/* Sports Infrastructure */}
                  <Route path="/courts" element={<CourtsPage />} />
                  <Route path="/courts/projects" element={<CourtProjectsPage />} />
                  <Route path="/courts/:slug" element={<CourtProjectDetailPage />} />

                  {/* Brand & Store */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/visit" element={<VisitPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/cart" element={<CartPage />} />

                  {/* Customer Account & Authentication Subroutes */}
                  <Route path="/account" element={<AccountPage tab="overview" />} />
                  <Route path="/account/login" element={<AccountPage tab="login" />} />
                  <Route path="/account/signup" element={<AccountPage tab="signup" />} />
                  <Route path="/account/verify" element={<AccountPage tab="verify" />} />
                  <Route path="/account/orders" element={<AccountPage tab="orders" />} />
                  <Route path="/account/orders/:orderId" element={<AccountPage tab="orders" />} />
                  <Route path="/account/profile" element={<AccountPage tab="profile" />} />
                  <Route path="/account/addresses" element={<AccountPage tab="addresses" />} />
                  <Route path="/account/wishlist" element={<AccountPage tab="wishlist" />} />
                  <Route path="/wishlist" element={<AccountPage tab="wishlist" />} />

                  {/* Institutional Policies */}
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />

                  {/* 404 Recovery */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              <Footer />
              <MobileBottomNav />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
