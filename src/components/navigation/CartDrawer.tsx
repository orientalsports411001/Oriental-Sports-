import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, getItemUnitPrice } from '../../context/CartContext';
import { Img } from '../ui/Img';

const FREE_DELIVERY_FROM = 2000;

/** Bag drawer — light panel, delivery progress, lines, one clear next step. */
export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const units = cart.reduce((s, i) => s + i.quantity, 0);
  const needed = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_FROM) * 100));

  return (
    <>
      <div className="drawer-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer-head">
          <h2 id="drawer-title" className="display d-4">Your bag {units > 0 && <span className="drawer-count">({units})</span>}</h2>
          <button ref={closeRef} type="button" className="menu-close" onClick={closeCart}>
            <span className="menu-close-x" aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>

        {cart.length > 0 && (
          <div className="drawer-delivery">
            <p>
              {needed > 0
                ? <>Add <strong>₹{needed.toLocaleString('en-IN')}</strong> for free delivery in Pune</>
                : <>Free delivery in Pune on this order</>}
            </p>
            <div className="drawer-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
          </div>
        )}

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <p className="display d-3">Nothing here yet.</p>
              <p className="muted">Racquets, bats, paddles and more are waiting in the shop.</p>
              <Link to="/shop" className="btn btn-primary" onClick={closeCart}>Shop gear</Link>
            </div>
          ) : (
            <ul className="drawer-lines">
              {cart.map((item, idx) => (
                <li key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`} className="drawer-line">
                  <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="drawer-line-media" tabIndex={-1} aria-hidden="true">
                    <Img image={item.product.images[0]} alt="" sizes="80px" />
                  </Link>
                  <div className="drawer-line-body">
                    <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="cart-line-name">{item.product.name}</Link>
                    {(item.selectedVariant || item.selectedSize) && (
                      <p className="cart-line-options">{[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}</p>
                    )}
                    <div className="cart-line-foot">
                      <div className="qty qty-sm" role="group" aria-label={`Quantity of ${item.product.name}`}>
                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)} aria-label="Decrease quantity">
                          <Minus size={14} />
                        </button>
                        <output>{item.quantity}</output>
                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)} aria-label="Increase quantity">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="price">₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-line-remove"
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 size={17} strokeWidth={1.8} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
            >
              Proceed to Checkout <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="link-arrow drawer-continue"
              onClick={() => {
                closeCart();
                navigate('/cart');
              }}
              style={{ marginTop: '0.5rem', width: '100%', textAlign: 'center' }}
            >
              View bag & apply promo code
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
