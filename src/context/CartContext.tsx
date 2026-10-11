import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types';
import {
  isShopifyConfigured,
  createShopifyCart,
  addLinesToShopifyCart,
  updateShopifyCartLines,
  removeShopifyCartLines,
  applyShopifyDiscount,
  fetchShopifyCart,
} from '../services/shopify';
import { ShopifyCartLineInput, ShopifyCartLineUpdateInput } from '../types/shopify';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedVariant?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string, selectedSize?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode: string;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
  shopifyCartId: string | null;
  checkoutUrl: string | null;
  isSyncing: boolean;
  isShopifyLive: boolean;
  proceedToCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'oriental_sports_cart_v1';
const SHOPIFY_CART_ID_KEY = 'oriental_sports_shopify_cart_id_v1';

export const getItemUnitPrice = (item: CartItem): number => {
  if (item.selectedVariant && item.product.variants) {
    const v = item.product.variants.find((vr) => vr.name === item.selectedVariant);
    if (v) {
      if (typeof v.price === 'number') return v.price;
      if (typeof v.priceDelta === 'number') return item.product.price + v.priceDelta;
    }
  }
  return item.product.price;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
    return localStorage.getItem(SHOPIFY_CART_ID_KEY);
  });
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const isShopifyLive = isShopifyConfigured();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Persist cart items locally
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync with Shopify Cart if configured
  const syncWithShopify = useCallback(async (currentCart: CartItem[]) => {
    if (!isShopifyConfigured()) return;
    setIsSyncing(true);

    try {
      // Build lines with Shopify variant IDs
      const lines: ShopifyCartLineInput[] = currentCart
        .map((item) => {
          const variant = item.product.variants?.find((v) => v.name === item.selectedVariant);
          const merchandiseId =
            variant?.shopifyVariantId || item.product.shopifyVariantId || item.product.id;

          // Only send if it looks like a valid Shopify GID
          if (merchandiseId && merchandiseId.startsWith('gid://shopify/ProductVariant/')) {
            return {
              merchandiseId,
              quantity: item.quantity,
            };
          }
          return null;
        })
        .filter((l): l is ShopifyCartLineInput => l !== null);

      if (lines.length === 0) {
        setIsSyncing(false);
        return;
      }

      if (!shopifyCartId) {
        const newCart = await createShopifyCart(lines);
        if (newCart) {
          setShopifyCartId(newCart.id);
          setCheckoutUrl(newCart.checkoutUrl);
          localStorage.setItem(SHOPIFY_CART_ID_KEY, newCart.id);
        }
      } else {
        // Fetch or add lines to existing cart
        const updated = await addLinesToShopifyCart(shopifyCartId, lines);
        if (updated) {
          setCheckoutUrl(updated.checkoutUrl);
        }
      }
    } catch (err) {
      console.warn('[CartContext] Background Shopify sync notice:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [shopifyCartId]);

  // Load existing Shopify checkout URL on initial mount if cartId exists
  useEffect(() => {
    if (shopifyCartId && isShopifyConfigured()) {
      fetchShopifyCart(shopifyCartId).then((sc) => {
        if (sc) {
          setCheckoutUrl(sc.checkoutUrl);
        } else {
          // If expired on Shopify's side, clear local cart id
          setShopifyCartId(null);
          localStorage.removeItem(SHOPIFY_CART_ID_KEY);
        }
      });
    }
  }, [shopifyCartId]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedVariant?: string,
    selectedSize?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant &&
          item.selectedSize === selectedSize
      );

      let nextCart: CartItem[];
      if (existingIndex > -1) {
        nextCart = [...prev];
        nextCart[existingIndex].quantity += quantity;
      } else {
        nextCart = [...prev, { product, quantity, selectedVariant, selectedSize }];
      }

      syncWithShopify(nextCart);
      return nextCart;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedVariant?: string, selectedSize?: string) => {
    setCart((prev) => {
      const nextCart = prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === selectedVariant &&
            item.selectedSize === selectedSize
          )
      );
      if (isShopifyConfigured() && shopifyCartId) {
        // If empty, clean up
        if (nextCart.length === 0) {
          setCheckoutUrl(null);
        }
      }
      return nextCart;
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedVariant?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant, selectedSize);
      return;
    }

    setCart((prev) => {
      const nextCart = prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant === selectedVariant &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      });
      syncWithShopify(nextCart);
      return nextCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
    setCheckoutUrl(null);
    setShopifyCartId(null);
    localStorage.removeItem(SHOPIFY_CART_ID_KEY);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + getItemUnitPrice(item) * item.quantity, 0);

  // Free shipping for Pune & pan-India orders above ₹2000
  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 150;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromoCode = async (code: string) => {
    const formatted = code.trim().toUpperCase();

    // If Shopify is connected, attempt Shopify discount code application
    if (isShopifyConfigured() && shopifyCartId) {
      setIsSyncing(true);
      const res = await applyShopifyDiscount(shopifyCartId, formatted);
      setIsSyncing(false);
      if (res) {
        setCheckoutUrl(res.checkoutUrl);
      }
    }

    if (formatted === 'PUNEPLAY' || formatted === 'ORIENTAL10') {
      setPromoCode(formatted);
      setDiscountPercent(10);
      return { success: true, message: '10% Oriental Sports Pune discount applied!' };
    } else if (formatted === 'CAMP15') {
      setPromoCode(formatted);
      setDiscountPercent(15);
      return { success: true, message: '15% Camp Heritage Special applied!' };
    }
    return { success: false, message: 'Invalid code. Try "PUNEPLAY" or "ORIENTAL10"' };
  };

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      // Direct user to Cart Page for Camp pickup or manual checkout
      window.location.href = '/cart';
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        itemCount,
        subtotal,
        shipping,
        discount,
        total,
        promoCode,
        applyPromoCode,
        shopifyCartId,
        checkoutUrl,
        isSyncing,
        isShopifyLive,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
