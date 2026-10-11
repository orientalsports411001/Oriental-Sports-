import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { IMAGES, MediaImage } from '../data/media';
import { STORE_INFO } from '../data/storeInfo';
import { ProductCard } from '../components/products/ProductCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/motion/Reveal';
import { SportCategory } from '../types';

// Same art direction as the homepage sport rail.
const ART: Partial<Record<SportCategory, MediaImage>> = {
  cricket: IMAGES.cricketStadium,
  football: IMAGES.turfFootball,
  badminton: IMAGES.badmintonHall,
  tennis: IMAGES.tennisClay,
  pickleball: IMAGES.pickleballNet,
  'table-tennis': IMAGES.tableTennisHall,
  squash: IMAGES.squashPlayer,
  fitness: IMAGES.fitnessBarbell,
  'gym-equipment': IMAGES.fitnessDumbbells,
  recreation: IMAGES.carromPlay,
  accessories: IMAGES.kitBag,
  volleyball: IMAGES.volleyballSunset,
};

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  // /products/commercial-treadmills etc. resolve to the parent category with that subcategory selected.
  const subAlias = PRODUCTS.find((p) => p.subcategory === category);
  const info = CATEGORIES.find((c) => c.id === (subAlias ? subAlias.category : category));
  const [selectedSub, setSelectedSub] = React.useState<string>(subAlias ? category! : 'all');
  React.useEffect(() => {
    setSelectedSub(subAlias ? category! : 'all');
  }, [category, subAlias]);

  if (!info) {
    return (
      <div className="container section empty-state">
        <h1 className="display d-2">Sport not found</h1>
        <p className="muted">We don’t list that sport online. Browse everything we carry, or ask the store.</p>
        <Link to="/shop" className="btn btn-primary">Browse all gear</Link>
      </div>
    );
  }

  const allCategoryProducts = PRODUCTS.filter((p) => p.category === info.id);
  const subcategories = React.useMemo(() => {
    const map = new Map<string, string>();
    allCategoryProducts.forEach((p) => {
      if (p.subcategory && p.subcategoryName) map.set(p.subcategory, p.subcategoryName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [allCategoryProducts]);

  const products = selectedSub === 'all'
    ? allCategoryProducts
    : allCategoryProducts.filter((p) => p.subcategory === selectedSub);

  const others = CATEGORIES.filter((c) => c.id !== info.id);
  // When a sport has few pieces online, keep the page useful with the store's featured gear.
  const more = products.length < 4 ? PRODUCTS.filter((p) => p.isFeatured && p.category !== info.id).slice(0, 4) : [];

  return (
    <div className="category-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: info.name }]}
        title={[info.name]}
        lead={info.description}
        image={ART[info.id] ?? { src: info.image, alt: '' }}
      />

      <section className="container section-tight category-stock" aria-labelledby="stock-title">
        <Reveal className="category-stock-head">
          <h2 id="stock-title" className="label muted">At the Camp store</h2>
          <ul className="stock-list">
            {info.featuredEquipments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container category-products" aria-labelledby="online-title">
        <div className="section-bar">
          <div>
            <h2 id="online-title" className="display d-3">Online now</h2>
            {subcategories.length > 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={selectedSub === 'all'}
                  onClick={() => setSelectedSub('all')}
                >
                  All ({allCategoryProducts.length})
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    className="chip"
                    aria-pressed={selectedSub === sub.id}
                    onClick={() => setSelectedSub(sub.id)}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="results-count">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
        </div>

        {products.length > 0 ? (
          <ul className="product-grid">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p className="muted">{info.name} gear isn’t listed online yet — the Camp store carries it.</p>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Ask the store</a>
          </div>
        )}

        <div className="store-callout">
          <p>
            Want to feel the weight and grip first? Come to <strong>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</strong>.
          </p>
          <Link to="/visit" className="link-arrow">
            Plan a visit <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {more.length > 0 && (
        <section className="container category-more" aria-labelledby="more-title">
          <div className="section-bar">
            <h2 id="more-title" className="display d-3">More from the store</h2>
            <Link to="/shop" className="link-arrow">All gear <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
          <ul className="product-grid">
            {more.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="container other-sports" aria-label="Other sports">
        <h2 className="label muted">Other sports</h2>
        <ul>
          {others.map((c) => (
            <li key={c.id}>
              <Link to={`/shop/${c.id}`} className="chip">{c.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryPage;
