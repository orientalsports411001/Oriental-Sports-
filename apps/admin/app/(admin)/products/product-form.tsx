'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageGallery } from '@/components/products/ImageGallery';
import { SeoEditor } from '@/components/seo/SeoEditor';


interface Category {
  id?: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  initialData?: any;
  product?: any;
  categories: Category[];
  action: (formData: FormData) => Promise<void>;
  error?: string | null;
}

const ATHLETIC_BRANDS = [
  'SG',
  'Yonex',
  'Li-Ning',
  'Nivia',
  'Cosco',
  'Oriental Pro',
  'Oriental Infrastructure',
];

export function ProductForm({ initialData, product: productProp, categories, action, error }: ProductFormProps) {
  const data = initialData || productProp;
  const [activeTab, setActiveTab] = useState<'details' | 'pricing' | 'media' | 'seo'>('details');
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  // Form State
  const [name, setName] = useState(data?.name || '');
  const [slug, setSlug] = useState(data?.slug || '');
  const [brand, setBrand] = useState(data?.brand || 'SG');
  const [categorySlug, setCategorySlug] = useState(data?.category_slug || 'cricket');
  const [description, setDescription] = useState(data?.description || '');
  const [price, setPrice] = useState(data?.price ? String(data.price) : '');
  const [compareAtPrice, setCompareAtPrice] = useState(
    data?.compare_at_price ? String(data.compare_at_price) : ''
  );
  const [images, setImages] = useState<string[]>(data?.images || []);
  const [status, setStatus] = useState<string>(data?.status || 'published');
  const [stockQuantity, setStockQuantity] = useState<number>(data?.stock_quantity ?? 10);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(data?.low_stock_threshold ?? 5);

  // SEO State
  const [seoTitle, setSeoTitle] = useState(data?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(data?.seo_description || '');
  const [seoCanonical, setSeoCanonical] = useState(data?.seo_canonical_url || '');

  // Dimensional Variants
  const [sizes, setSizes] = useState<string>(
    data?.metadata?.available_sizes ? data.metadata.available_sizes.join('\n') : 'Size 3\nSize 4\nSize 5\nSize 6\nHarrow\nFull Size SH'
  );
  const [variantsJson, setVariantsJson] = useState<string>(
    data?.variants && data.variants.length > 0
      ? JSON.stringify(data.variants, null, 2)
      : '[]'
  );

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const tabs = [
    { id: 'details', label: 'Basic Info & Specs' },
    { id: 'pricing', label: 'Pricing & Stock' },
    { id: 'media', label: `Media (${images.length})` },
    { id: 'seo', label: 'Search & SEO' },
  ] as const;

  const primaryImage = images[0] || '/images/products/oriental-sports/sg-scorer-classic.webp';
  const numPrice = Number(price) || 0;
  const numCompare = Number(compareAtPrice) || 0;
  const discountPercent = numCompare > numPrice ? Math.round(((numCompare - numPrice) / numCompare) * 100) : 0;

  return (
    <form action={action} style={{ position: 'relative', paddingBottom: 100 }}>
      {error && <p className="error" style={{ marginBottom: 20 }}>{error}</p>}

      {/* Pill Tab Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div className="cult-pill-tabs" style={{ margin: 0, flex: 1, minWidth: 280 }}>
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className="cult-tab-btn"
                style={{
                  color: isActive ? 'var(--ivory)' : 'var(--muted)',
                  zIndex: 1,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--ink)',
                      borderRadius: 9999,
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Fluid Responsive Workspace */}
      <div className="product-editor-layout">
        
        {/* Left / Main Column: Seamless Studio Surface */}
        <div>
          {/* Tab 1: Basic Info & Specs */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="studio-surface">
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Product Identity
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Core branding, athletic discipline, and public storefront title.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Title & Slug Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <label htmlFor="name" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                          Product Title
                        </label>
                        <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{name.length}/120</span>
                      </div>
                      <input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. SG Scorer Classic Cricket Bat"
                        required
                        className="cult-input"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <div style={{ marginBottom: 6 }}>
                        <label htmlFor="slug" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                          URL Handle (Slug)
                        </label>
                      </div>
                      <input
                        id="slug"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="sg-scorer-classic-cricket-bat"
                        required
                        className="cult-input"
                      />
                      <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 4 }}>
                        Public link: <code>/product/{slug || '...'}</code>
                      </div>
                    </div>
                  </div>

                  {/* Category & Brand Selection */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                    <div>
                      <label htmlFor="category_slug" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                        Sport Discipline
                      </label>
                      <select
                        id="category_slug"
                        name="category_slug"
                        value={categorySlug}
                        onChange={(e) => setCategorySlug(e.target.value)}
                        className="cult-input"
                        style={{ cursor: 'pointer' }}
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="brand" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                        Equipment Brand
                      </label>
                      <input
                        id="brand"
                        name="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="e.g. SG, Yonex, Li-Ning"
                        className="cult-input"
                      />
                    </div>
                  </div>

                  {/* Brand Quick Pills */}
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', display: 'block', marginBottom: 8 }}>
                      Quick Brand Tag
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ATHLETIC_BRANDS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBrand(b)}
                          className={`cult-pill-chip ${brand === b ? 'is-active' : ''}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Editorial Description */}
                  <div>
                    <label htmlFor="description" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                      Editorial Specifications & Athlete Notes
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Material grade, wood profile, balance pickup, tournament certifications..."
                      className="cult-input"
                      style={{ lineHeight: 1.6, resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sizing & Variants Surface */}
              <div className="studio-surface">
                <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Sizes & Variants
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Standard dimensional variations (one per line) available for selection by customers.
                  </p>
                </div>

                <div>
                  <textarea
                    name="available_sizes"
                    rows={4}
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    className="cult-input"
                    style={{ fontFamily: 'monospace', fontSize: 13 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Pricing & Inventory */}
          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="studio-surface">
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Pricing Structure
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Customer selling price and optional compare-at MRP discount strike.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                  <div>
                    <label htmlFor="price" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                      Selling Price (₹ INR)
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="1"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="2899"
                      required
                      className="cult-input"
                      style={{ fontSize: 16, fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="compare_at_price" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                      Original MRP / Strike Price (₹ INR)
                    </label>
                    <input
                      id="compare_at_price"
                      name="compare_at_price"
                      type="number"
                      step="1"
                      min="0"
                      value={compareAtPrice}
                      onChange={(e) => setCompareAtPrice(e.target.value)}
                      placeholder="3499"
                      className="cult-input"
                    />
                  </div>
                </div>

                {discountPercent > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: 'var(--gold-ink)',
                        background: 'rgba(201,162,39,0.15)',
                        padding: '4px 12px',
                        borderRadius: 9999,
                      }}
                    >
                      ✓ Customer saves {discountPercent}% off MRP
                    </span>
                  </div>
                )}
              </div>

              {/* Warehouse Stock Surface */}
              <div className="studio-surface">
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Warehouse Stock & Status
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Manage physical on-hand units and automated restock warning triggers.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                  <div>
                    <label htmlFor="stock_quantity" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                      Available Physical Units
                    </label>
                    <input
                      id="stock_quantity"
                      name="stock_quantity"
                      type="number"
                      min="0"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(Number(e.target.value))}
                      className="cult-input"
                      style={{ fontSize: 16, fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="low_stock_threshold" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                      Low-Stock Warning Trigger
                    </label>
                    <input
                      id="low_stock_threshold"
                      name="low_stock_threshold"
                      type="number"
                      min="1"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                      className="cult-input"
                    />
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <label htmlFor="status" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                    Storefront Visibility
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="cult-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="published">Published — Live on Oriental Sports Store</option>
                    <option value="draft">Draft — Internal review only</option>
                    <option value="archived">Archived — Discontinued</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Media Gallery */}
          {activeTab === 'media' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="studio-surface">
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Photography & Media Assets
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Upload or attach high-resolution product photos. Drag or rearrange to set primary cover.
                  </p>
                </div>

                <ImageGallery
                  images={images.map((img) => ({ url: img }))}
                  onChange={(newImgs) => setImages(newImgs.map((g) => g.url))}
                />
              </div>
            </motion.div>
          )}

          {/* Tab 4: SEO & Social Meta */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="studio-surface">
                <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
                    Search Engine Optimization (SEO)
                  </h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--subtle)' }}>
                    Customize Google search SERP title, meta description, and canonical URL.
                  </p>
                </div>

                <SeoEditor
                  productId={data?.id}
                  slug={slug}
                  name={name}
                  brand={brand}
                  categoryName={categories.find((c) => c.slug === categorySlug)?.name || categorySlug}
                  description={description}
                  price={numPrice}
                  sizes={sizes.split('\n').filter(Boolean)}
                  variants={[]}
                  images={images}
                  initial={{
                    seoTitle: seoTitle,
                    seoDescription: seoDescription,
                    seoKeywords: [],
                    ogTitle: seoTitle || name,
                    ogDescription: seoDescription || description,
                    imageAltText: {},
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column / Live Storefront Preview (Smooth Squircle, Responsive) */}
        <div
          style={{
            display: showPreviewOnMobile ? 'block' : undefined,
          }}
          className={!showPreviewOnMobile ? 'hide-on-mobile' : ''}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 12px 36px -6px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              position: 'sticky',
              top: 24,
            }}
          >
            <div
              style={{
                padding: '12px 18px',
                background: 'rgba(17,17,17,0.03)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--subtle)' }}>
                Live Storefront Card
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: status === 'published' ? 'rgba(46,107,60,0.12)' : 'rgba(201,162,39,0.15)',
                  color: status === 'published' ? 'var(--success)' : 'var(--gold-ink)',
                }}
              >
                {status}
              </span>
            </div>

            {/* Photo Preview Container */}
            <div
              style={{
                position: 'relative',
                height: 220,
                background: '#FAF9F5',
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
                padding: 16,
              }}
            >
              {primaryImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={primaryImage}
                  alt={name || 'Preview'}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/products/oriental-sports/sg-scorer-classic.webp';
                  }}
                />
              ) : (
                <span style={{ color: 'var(--subtle)', fontSize: 13, fontWeight: 700 }}>No Image</span>
              )}

              {discountPercent > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'var(--ink)',
                    color: 'var(--ivory)',
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: 9999,
                  }}
                >
                  SAVE {discountPercent}%
                </div>
              )}

              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(8px)',
                  padding: '3px 10px',
                  borderRadius: 9999,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {brand || 'Oriental Sports'}
              </div>
            </div>

            {/* Card Content Simulation */}
            <div style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-ink)', marginBottom: 4 }}>
                {categorySlug || 'Gear'} · Camp Pune
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.3 }}>
                {name || 'Product Title'}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
                  ₹{Number(price || 0).toLocaleString('en-IN')}
                </span>
                {numCompare > numPrice && (
                  <span style={{ fontSize: 13, color: 'var(--subtle)', textDecoration: 'line-through' }}>
                    ₹{numCompare.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: 'rgba(17,17,17,0.04)',
                  fontSize: 12,
                }}
              >
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Stock On Hand:</span>
                <span style={{ fontWeight: 800, color: stockQuantity === 0 ? 'var(--error)' : 'var(--ink)' }}>
                  {stockQuantity} Units
                </span>
              </div>

              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--subtle)' }}>
                Storefront route: <code>/product/{slug || '...'}</code>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Hidden Fields for Server Action */}
      <input type="hidden" name="seo_title" value={seoTitle} />
      <input type="hidden" name="seo_description" value={seoDescription} />
      <input type="hidden" name="seo_canonical_url" value={seoCanonical} />
      <input type="hidden" name="images_json" value={JSON.stringify(images)} />
      <input type="hidden" name="variants_json" value={variantsJson} />

      {/* Centered Floating Capsule Action Bar (Skiper.ui / Cult.ui) */}
      <div className="cult-floating-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#2E6B3C',
              boxShadow: '0 0 0 3px rgba(46,107,60,0.3)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name ? `Editing: ${name}` : 'Ready to save'}
          </span>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 24px',
            borderRadius: 9999,
            background: 'var(--ink)',
            color: 'var(--ivory)',
            fontSize: 13,
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(17,17,17,0.18)',
            transition: 'opacity 0.15s ease',
          }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
