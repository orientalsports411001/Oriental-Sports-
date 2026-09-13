import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, MessageSquare, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { StickyBuyBar } from '../components/products/StickyBuyBar';
import { ProductCard } from '../components/products/ProductCard';
import { STORE_INFO } from '../data/storeInfo';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Equipment Not Found</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>The product you are looking for does not exist or has been relocated.</p>
        <Link to="/shop" className="btn btn-primary">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedSize);
    navigate('/cart');
  };

  const getWhatsAppProductInquiry = () => {
    const text = `Hello Oriental Sports Pune, I am inquiring about the ${product.name} (Price: ₹${product.price}) from your website. Is this available at your MG Road Camp store for pickup today?`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-ivory" style={{ minHeight: '90vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#EDE8DC', padding: '12px 0', borderBottom: '1px solid #E2DCCF' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#666666' }}>
            <Link to="/" style={{ color: '#111111' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: '#111111' }}>Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} style={{ color: '#111111' }}>
              {product.categoryName}
            </Link>
            <span>/</span>
            <span style={{ color: '#888888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 5vw, 48px)',
          }}
        >
          {/* Left: Product Images Gallery */}
          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: '#EDE8DC',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid var(--color-ivory-border)',
                marginBottom: '12px',
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.badge && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-gold">{product.badge}</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '72px',
                      height: '72px',
                      border: idx === activeImageIndex ? '2px solid #C9A227' : '1px solid #E2DCCF',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-plate-gold)',
                  marginBottom: '4px',
                }}
              >
                {product.brand} • {product.categoryName}
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: 'var(--color-ink)',
                  marginBottom: '12px',
                }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', color: '#C9A227' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? '#C9A227' : 'none'}
                      stroke="#C9A227"
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111' }}>
                  {product.rating.toFixed(1)}
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#666666' }}>
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>

              {/* Price Block */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                  }}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '1.125rem', color: '#888888', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 700, textTransform: 'uppercase' }}>
                  Inclusive of all taxes
                </span>
              </div>

              <p style={{ color: '#444444', lineHeight: 1.5, fontSize: '0.9375rem', marginBottom: '20px' }}>
                {product.description}
              </p>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#111111', marginBottom: '8px' }}>
                  Select Specification:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.name)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        borderRadius: '2px',
                        backgroundColor: selectedVariant === v.name ? 'var(--color-ink)' : 'var(--color-pure-white)',
                        color: selectedVariant === v.name ? 'var(--color-pure-white)' : 'var(--color-ink)',
                        border: selectedVariant === v.name ? '1px solid var(--color-ink)' : '1px solid var(--color-ivory-border)',
                        cursor: 'pointer',
                      }}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#111111', marginBottom: '8px' }}>
                  Select Size / Grip:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        borderRadius: '2px',
                        backgroundColor: selectedSize === s ? 'var(--color-ink)' : 'var(--color-pure-white)',
                        color: selectedSize === s ? 'var(--color-pure-white)' : 'var(--color-ink)',
                        border: selectedSize === s ? '1px solid var(--color-ink)' : '1px solid var(--color-ivory-border)',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls & Desktop CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E2DCCF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>Quantity</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #C9A227', borderRadius: '2px', backgroundColor: '#FFFFFF' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '6px 12px', color: '#111111' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 12px', fontWeight: 800, fontSize: '0.9375rem' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '6px 12px', color: '#111111' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`btn btn-lg ${addedAnimation ? 'btn-gold' : 'btn-primary'}`}
                  style={{ flex: 1 }}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO BAG</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn btn-lg btn-gold"
                  style={{ flex: 1 }}
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              <a
                href={getWhatsAppProductInquiry()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
                style={{ width: '100%', fontSize: '0.8125rem' }}
              >
                <MessageSquare size={16} />
                <span>INQUIRE VIA WHATSAPP (CAMP STORE)</span>
              </a>
            </div>

            {/* Delivery & Assurance Guarantees */}
            <div
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '1px solid var(--color-ivory-border)',
                borderRadius: '2px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.8125rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="#C9A227" />
                <span><strong>Free delivery in Pune</strong> on orders above ₹2,000. Same-day Camp dispatch.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={18} color="#C9A227" />
                <span><strong>7-day replacement guarantee</strong> on manufacturing defects.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="#C9A227" />
                <span><strong>100% Genuine gear</strong> backed by Oriental Sports Camp store warranty.</span>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.0625rem', fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
                TECHNICAL SPECIFICATIONS
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <tbody>
                  {Object.entries(product.specs).map(([k, v], idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #E2DCCF' }}>
                      <td style={{ padding: '8px 4px', color: '#666666', fontWeight: 600, width: '40%' }}>{k}</td>
                      <td style={{ padding: '8px 4px', color: '#111111', fontWeight: 700 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Equipment */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 'var(--space-4xl)', paddingTop: 'var(--space-2xl)', borderTop: '1px solid #E2DCCF' }}>
            <h2 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '24px' }}>
              YOU MAY ALSO NEED
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <StickyBuyBar
        product={product}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        inStock={product.inStock}
      />
    </div>
  );
};
