import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, MessageSquare, Plus, Minus, Check, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { StickyBuyBar } from '../components/products/StickyBuyBar';
import { ProductCard } from '../components/products/ProductCard';
import { GlassPanel } from '../components/ui/GlassPanel';
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

  const fallbackImage = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';

  if (!product) {
    return (
      <div style={{ backgroundColor: '#F7F5EE', padding: '100px 16px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>EQUIPMENT NOT FOUND</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>The product you are looking for does not exist or has been relocated.</p>
        <Link
          to="/shop"
          style={{
            display: 'inline-flex',
            padding: '12px 24px',
            backgroundColor: '#111111',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.8125rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
          }}
        >
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
    setTimeout(() => setAddedAnimation(false), 1600);
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
    <div style={{ backgroundColor: '#F7F5EE', minHeight: '90vh', paddingBottom: '90px' }}>
      {/* Brutalist Breadcrumb */}
      <div style={{ backgroundColor: '#EFECE2', padding: '14px 0', borderBottom: '1px solid #DFD9CB' }}>
        <div className="container">
          <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>
            <Link to="/" style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>HOME</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: 'var(--color-ink)', textDecoration: 'none' }}>SHOP</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--color-brand-gold)', textDecoration: 'none' }}>
              {product.categoryName || product.category}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--color-ink-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(32px, 5vw, 48px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(28px, 5vw, 56px)',
          }}
        >
          {/* Left: Gallery & Angles */}
          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid var(--color-ink)',
                overflow: 'hidden',
                marginBottom: '14px',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {product.badge && (
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <GlassPanel
                    variant="dark"
                    blur="12px"
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      color: 'var(--color-brand-gold)',
                      border: '1px solid rgba(201, 162, 39, 0.4)',
                    }}
                  >
                    {product.badge.toUpperCase()}
                  </GlassPanel>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '76px',
                      height: '76px',
                      border: idx === activeImageIndex ? '2px solid var(--color-ink)' : '1px solid var(--color-border-medium)',
                      backgroundColor: '#FFFFFF',
                      padding: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Technical Specs & Commerce Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-brand-gold)' }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {product.brand} // {product.categoryName || product.category}
                </span>
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: '#111111',
                  margin: '0 0 14px 0',
                  letterSpacing: '-0.02em',
                }}
              >
                {product.name}
              </h1>

              {/* Rating & In-Stock Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', color: '#111111' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? '#111111' : 'none'}
                      stroke="#111111"
                    />
                  ))}
                </div>
                <span className="font-mono" style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#111111' }}>
                  {product.rating.toFixed(1)}
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#666666' }}>
                  ({product.reviewsCount} reviews)
                </span>
                <span
                  className="font-mono"
                  style={{
                    padding: '3px 8px',
                    backgroundColor: '#E7F9EE',
                    color: '#0D6832',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    borderRadius: '2px',
                  }}
                >
                  IN STOCK CAMP STORE
                </span>
              </div>

              {/* Price Block */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '14px',
                  paddingBottom: '20px',
                  borderBottom: '2px solid #111111',
                  marginBottom: '20px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: 900,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                  }}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '1.125rem',
                      color: '#888888',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#555555', textTransform: 'uppercase' }}>
                  (INCL. ALL TAXES)
                </span>
              </div>

              <p style={{ color: '#444444', lineHeight: 1.6, fontSize: '0.9375rem', margin: '0 0 24px 0' }}>
                {product.description}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#111111', marginBottom: '8px' }}>
                    SPECIFICATION / MODEL:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.name)}
                        style={{
                          padding: '9px 16px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          backgroundColor: selectedVariant === v.name ? '#111111' : '#FFFFFF',
                          color: selectedVariant === v.name ? '#FFFFFF' : '#111111',
                          border: selectedVariant === v.name ? '2px solid #111111' : '1px solid #D8D4C8',
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
                <div style={{ marginBottom: '24px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#111111', marginBottom: '8px' }}>
                    SIZE / GRIP CIRCUMFERENCE:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '9px 16px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          backgroundColor: selectedSize === s ? '#111111' : '#FFFFFF',
                          color: selectedSize === s ? '#FFFFFF' : '#111111',
                          border: selectedSize === s ? '2px solid #111111' : '1px solid #D8D4C8',
                          cursor: 'pointer',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls & Direct CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    QUANTITY:
                  </span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #111111', backgroundColor: '#FFFFFF' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '8px 14px', color: '#111111', background: 'none', border: 'none', cursor: 'pointer' }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono" style={{ padding: '0 14px', fontWeight: 900, fontSize: '1rem' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '8px 14px', color: '#111111', background: 'none', border: 'none', cursor: 'pointer' }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      padding: '16px',
                      backgroundColor: 'var(--color-ink)',
                      color: addedAnimation ? 'var(--color-brand-gold)' : '#FFFFFF',
                      border: '1.5px solid var(--color-ink)',
                      fontSize: '0.8125rem',
                      fontWeight: 900,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!addedAnimation) e.currentTarget.style.opacity = '0.88';
                    }}
                    onMouseLeave={(e) => {
                      if (!addedAnimation) e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} color="var(--color-brand-gold)" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <span>ADD TO BAG</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    style={{
                      flex: 1,
                      padding: '16px',
                      backgroundColor: 'var(--color-brand-gold)',
                      color: 'var(--color-ink)',
                      border: '1.5px solid var(--color-brand-gold)',
                      fontSize: '0.8125rem',
                      fontWeight: 900,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <span>BUY NOW</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <a
                  href={getWhatsAppProductInquiry()}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--color-ink)',
                    color: 'var(--color-ink)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <MessageSquare size={16} color="var(--color-brand-gold)" />
                  <span>INQUIRE VIA WHATSAPP (CAMP WORKSHOP)</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border-medium)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '0.8125rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={17} color="var(--color-ink)" />
                  <span><strong>Free Pune Delivery</strong> on orders above ₹2,000. Same-day Camp dispatch.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RotateCcw size={17} color="var(--color-ink)" />
                  <span><strong>7-Day Replacement</strong> on manufacturing defects.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={17} color="var(--color-brand-gold)" />
                  <span><strong>100% Genuine Gear</strong> verified by Oriental Sports Camp store.</span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div style={{ marginTop: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <Layers size={16} color="var(--color-ink)" />
                  <h3 className="font-mono" style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>
                    TECHNICAL SPECIFICATIONS AUDIT
                  </h3>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border-medium)' }}>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v], idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td className="font-mono" style={{ padding: '10px 14px', color: 'var(--color-ink-muted)', fontWeight: 700, width: '40%', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                          {k}
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--color-ink)', fontWeight: 700 }}>
                          {v}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderBottom: 'none' }}>
                      <td className="font-mono" style={{ padding: '10px 14px', color: 'var(--color-ink-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        WORKSHOP
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--color-ink)', fontWeight: 700 }}>
                        Shop 247, MG Road, Camp, Pune
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Related Equipment Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '72px', paddingTop: '40px', borderTop: '2px solid var(--color-ink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  CURATED GEAR
                </span>
                <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#111111', margin: '4px 0 0 0' }}>
                  COMPATIBLE ATHLETIC EQUIPMENT
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Buy Bar */}
      <StickyBuyBar
        product={product}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        inStock={product.inStock}
      />
    </div>
  );
};
