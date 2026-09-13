import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

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
  applyPromoCode: (code: string) => { success: boolean; message: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'oriental_sports_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

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

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant, selectedSize }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedVariant?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === selectedVariant &&
            item.selectedSize === selectedSize
          )
      )
    );
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

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedVariant === selectedVariant &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Free shipping for Pune & pan-India orders above ₹2000
  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 150;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
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
