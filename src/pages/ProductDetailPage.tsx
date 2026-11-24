import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, FileDown, MessageCircle } from 'lucide-react';
import { PRODUCTS, getLiveProducts, getLiveProductBySlug } from '../data/products';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { StickyBuyBar } from '../components/products/StickyBuyBar';
import { ProductCard } from '../components/products/ProductCard';
import { Img } from '../components/ui/Img';
import { STORE_INFO } from '../data/storeInfo';
import { isCloudinaryUrl, getOptimizedImageUrl, generateSrcSet } from '../lib/cloudinary';
import { Seo } from '../components/seo/Seo';
import { shouldEnquireOnWhatsApp, useDisciplines } from '../data/liveCategories';

/** Studio shots have a -sm.webp twin; Cloudinary shots get auto-scaled srcset. */
const galleryImage = (src: string, alt: string) => {
  if (isCloudinaryUrl(src)) {
    return {
      src: getOptimizedImageUrl(src, { width: 1400 }),
      srcSet: generateSrcSet(src),
      alt,
    };
  }
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
  useDisciplines(); // re-render when the admin changes which disciplines are enquiry-only

  const [product, setProduct] = useState<Product | undefined>(() => getLiveProductBySlug(slug));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(product?.variants?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    const nextProduct = getLiveProductBySlug(slug);
    setProduct(nextProduct);
    setActiveImageIndex(0);
    setSelectedVariant(nextProduct?.variants?.[0]?.name || '');
    setSelectedSize(nextProduct?.sizes?.[0] || '');
    setQuantity(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleUpdate = () => setProduct(getLiveProductBySlug(slug));
    // Re-read on mount: the catalog fetch can resolve before this effect
    // attaches, and the event would otherwise be missed.
    handleUpdate();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('os_catalog_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('os_catalog_updated', handleUpdate);
    };
  }, [slug]);

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

  const absoluteImages = images.map((img) =>
    img.startsWith('http') ? img : `https://www.orientalsports.in${img}`
  );
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: absoluteImages,
    description: product.description || product.seoDescription || '',
    sku: product.sku || product.id,
    brand: { '@type': 'Brand', name: product.brand || 'Oriental Sports' },
    ...(product.reviewsCount > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewsCount } }
      : {}),
    offers: {
      '@type': 'Offer',
      url: `https://www.orientalsports.in/product/${product.slug}`,
      priceCurrency: product.currency || 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Oriental Sports' },
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://www.orientalsports.in/shop' },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.categoryName,
        item: `https://www.orientalsports.in/shop/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://www.orientalsports.in/product/${product.slug}`,
      },
    ],
  };

  const allLive = getLiveProducts();
  const isDifferent = (p: Product) =>
    p.id !== product.id &&
    p.slug !== product.slug &&
    p.name.toLowerCase() !== product.name.toLowerCase();
  const sameSport = allLive.filter((p) => p.category === product.category && isDifferent(p));
  const related = (sameSport.length > 0 ? sameSport : allLive.filter((p) => p.isFeatured && isDifferent(p))).slice(0, 4);

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
  // Enquiry-only: ticked on the product, or its discipline is set to
  // "Enquire on WhatsApp" in the admin. Online checkout is replaced with a
  // spec-sheet download (when there is one) and a direct enquiry.
  const enquireOnly = shouldEnquireOnWhatsApp(product);
  const specRows = product.specRows ?? Object.entries(product.specs ?? {}).map(([label, value]) => ({ label, value }));

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
      <Seo
        title={product.seoTitle || `${product.name} | ${product.brand || 'Oriental Sports'} | Oriental Sports Pune`}
        description={
          product.seoDescription ||
          product.description?.slice(0, 157) ||
          `${product.name} by ${product.brand}, available at Oriental Sports, Camp, Pune. ₹${product.price.toLocaleString('en-IN')}.`
        }
        canonicalPath={`/product/${product.slug}`}
        image={absoluteImages[0]}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
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
                objectFit={product.imageFit}
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
                    <Img image={galleryImage(img, '')} sizes="88px" objectFit={product.imageFit} />
                  </button>
                ))}
              </div>
            )}

            {product.videoUrl && (
              <video
                src={product.videoUrl}
                controls
                playsInline
                className="pdp-video"
                style={{ width: '100%', borderRadius: 16, marginTop: 16, background: '#000' }}
              />
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

              {product.sizes && product.sizes.length > 0 && (!product.variants || product.variants.length === 0) && (
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

              {enquireOnly ? (
                <>
                  {product.specSheetUrl && (
                    <a
                      href={product.specSheetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-block"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                      <FileDown size={18} /> Download PDF
                    </a>
                  )}
                  <a
                    href={getWhatsAppProductInquiry()}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn ${product.specSheetUrl ? 'btn-outline' : 'btn-primary'} btn-block`}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: product.specSheetUrl ? 10 : 0 }}
                  >
                    <MessageCircle size={18} /> Enquire on WhatsApp
                  </a>
                </>
              ) : (
                <>
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
                </>
              )}

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
            </div>
          </div>
        </div>

        {(product.description.trim() || specRows.length > 0) && (
          <section className="pdp-details" aria-label="Product details">
            {product.description.trim() && (
              <div className="pdp-details-block">
                <h2 className="pdp-details-title">Product description</h2>
                <p className="pdp-description">{product.description}</p>
              </div>
            )}
            {specRows.length > 0 && (
              <div className="pdp-details-block pdp-specs">
                <h2 className="pdp-details-title">Specifications</h2>
                <table>
                  <tbody>
                    {specRows.map((r, i) => (
                      <tr key={`${r.label}-${i}`}>
                        <th scope="row">{r.label}</th>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

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

      {!enquireOnly && (
        <StickyBuyBar
          product={{ ...product, price: currentPrice }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          inStock={isAvailableInStock}
        />
      )}
    </div>
  );
};
