import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { PRODUCTS, getLiveProducts, getLiveProductBySlug } from '../data/products';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { StickyBuyBar } from '../components/products/StickyBuyBar';
import { ProductCard } from '../components/products/ProductCard';
import { Img } from '../components/ui/Img';
import { STORE_INFO } from '../data/storeInfo';

/** Studio shots have a -sm.webp twin; remote images use the CDN width param. */
const galleryImage = (src: string, alt: string) => {
  if (src.startsWith('/images/') && src.endsWith('.webp')) {
    return { src, srcSet: `${src.replace(/\.webp$/, '-sm.webp')} 560w, ${src} 1024w`, alt };
  }
  if (src.includes('images.unsplash.com')) {
    const base = src.split('?')[0];
    const at = (w: number) => `${base}?auto=format&fit=crop&w=${w}&h=${w}&q=75`;
    return { src: at(1200), srcSet: `${at(600)} 600w, ${at(1200)} 1200w, ${at(1600)} 1600w`, alt };
  }
  return { src, alt };
};

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | undefined>(() => getLiveProductBySlug(slug));

  useEffect(() => {
    const handleUpdate = () => setProduct(getLiveProductBySlug(slug));
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('os_catalog_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('os_catalog_updated', handleUpdate);
    };
  }, [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(product?.variants?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="container section empty-state">
        <h1 className="display d-2">Product not found</h1>
        <p className="muted">It may have sold out or moved. Everything we list online is in the shop.</p>
        <Link to="/shop" className="btn btn-primary">Back to the shop</Link>
      </div>
    );
  }

  // Unique images only — some products repeat the same shot.
  const images = [...new Set(product.images)];

  const allLive = getLiveProducts();
  const sameSport = allLive.filter((p) => p.category === product.category && p.id !== product.id);
  const related = (sameSport.length > 0 ? sameSport : allLive.filter((p) => p.isFeatured && p.id !== product.id)).slice(0, 4);

  const activeVariantObj = product?.variants?.find((v) => v.name === selectedVariant);
  const currentPrice =
    activeVariantObj?.price !== undefined
      ? activeVariantObj.price
      : (product?.price ?? 0) + (activeVariantObj?.priceDelta || 0);

  const currentOriginalPrice = activeVariantObj?.originalPrice || product?.originalPrice;
  const discount =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : null;

  const isAvailableInStock = activeVariantObj !== undefined ? activeVariantObj.inStock : (product?.inStock ?? false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedVariant, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedSize);
    navigate('/checkout');
  };

  const getWhatsAppProductInquiry = () => {
    const text = `Hello Oriental Sports Pune, I am inquiring about the ${product.name} (Price: ₹${currentPrice}) from your website. Is this available at your MG Road Camp store for pickup today?`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pdp">
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs pdp-crumbs">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to={`/shop/${product.category}`}>{product.categoryName}</Link></li>
            {product.subcategoryName && (
              <li><Link to={`/shop?category=${product.category}&subcategory=${product.subcategory}`}>{product.subcategoryName}</Link></li>
            )}
            <li><span aria-current="page">{product.name}</span></li>
          </ol>
        </nav>

        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-stage">
              <Img
                image={galleryImage(images[activeImageIndex] ?? images[0], product.name)}
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              {product.badge && <span className="badge badge-dark pdp-badge">{product.badge}</span>}
            </div>

            {images.length > 1 && (
              <div className="pdp-thumbs" role="group" aria-label="Product images">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    className={`pdp-thumb ${idx === activeImageIndex ? 'is-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show image ${idx + 1} of ${images.length}`}
                    aria-pressed={idx === activeImageIndex}
                  >
                    <Img image={galleryImage(img, '')} sizes="88px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-info">
            <div className="pdp-info-sticky">
              <p className="eyebrow">{[product.brand, product.categoryName, product.subcategoryName].filter(Boolean).join(' · ')}</p>
              <h1 className="pdp-title">{product.name}</h1>

              <div className="pdp-price">
                <span className="pdp-price-now">₹{currentPrice.toLocaleString('en-IN')}</span>
                {discount && (
                  <>
                    <s className="price-was">₹{currentOriginalPrice!.toLocaleString('en-IN')}</s>
                    <span className="price-off">{discount}% off</span>
                  </>
                )}
              </div>
              <p className="pdp-tax">{product.priceLabel ?? 'Inclusive of all taxes'}{product.quantityUnit ? ` · Unit: ${product.quantityUnit}` : ''}</p>

              <p className={`pdp-stock ${isAvailableInStock ? 'is-in' : ''}`}>
                <span className="status-dot" aria-hidden="true" />
                {product.availabilityNote ?? (isAvailableInStock ? 'In stock at the Camp store' : 'Currently out of stock')}
              </p>

              <p className="pdp-description">{product.description}</p>

              {product.variants && product.variants.length > 0 && (
                <fieldset className="pdp-option">
                  <legend className="field-label">Select Size / Option</legend>
                  <div className="pdp-choices">
                    {product.variants.map((v) => {
                      const vPrice = v.price !== undefined ? v.price : (product.price + (v.priceDelta || 0));
                      return (
                        <button
                          key={v.id}
                          type="button"
                          className="chip"
                          aria-pressed={selectedVariant === v.name}
                          onClick={() => setSelectedVariant(v.name)}
                        >
                          <span>{v.name}</span>
                          {product.variants!.length > 1 && (
                            <span style={{ opacity: 0.75, fontSize: '0.8125rem', marginLeft: '6px' }}>
                              ₹{vPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {product.sizes && (!product.variants || product.variants.length === 0) && (
                <fieldset className="pdp-option">
                  <legend className="field-label">Size</legend>
                  <div className="pdp-choices">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="chip"
                        aria-pressed={selectedSize === s}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="pdp-buy">
                <div className="qty" role="group" aria-label="Quantity">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                    <Minus size={16} />
                  </button>
                  <output aria-live="polite">{quantity}</output>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isAvailableInStock}
                  className={`btn btn-primary pdp-add ${addedAnimation ? 'is-added' : ''}`}
                >
                  {addedAnimation ? 'Added to bag' : isAvailableInStock ? 'Add to bag' : 'Out of stock'}
                </button>
              </div>
              <button type="button" onClick={handleBuyNow} disabled={!isAvailableInStock} className="btn btn-outline btn-block">
                Buy now
              </button>
              <a href={getWhatsAppProductInquiry()} target="_blank" rel="noreferrer" className="link-arrow pdp-whatsapp">
                Ask the store on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
              </a>

              <dl className="pdp-promises">
                <div>
                  <dt>Delivery</dt>
                  <dd>Free within Pune on orders above ₹2,000. <Link to="/shipping">Shipping</Link></dd>
                </div>
                <div>
                  <dt>Replacement</dt>
                  <dd>7 days on manufacturing defects. <Link to="/returns">Returns</Link></dd>
                </div>
                <div>
                  <dt>Pick-up</dt>
                  <dd>Collect from {STORE_INFO.addressLine1}, {STORE_INFO.locality}.</dd>
                </div>
              </dl>

              {product.specs && Object.keys(product.specs).length > 0 && (
                <details className="pdp-specs" open>
                  <summary>Specifications</summary>
                  <table>
                    <tbody>
                      {Object.entries(product.specs).map(([k, v]) => (
                        <tr key={k}>
                          <th scope="row">{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pdp-related" aria-labelledby="related-title">
            <div className="section-bar">
              <h2 id="related-title" className="display d-3">
                {sameSport.length > 0 ? `More ${product.categoryName.toLowerCase()}` : 'From the store'}
              </h2>
              <Link to="/shop" className="link-arrow">
                All gear <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="product-grid">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <StickyBuyBar
        product={{ ...product, price: currentPrice }}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        inStock={isAvailableInStock}
      />
    </div>
  );
};
