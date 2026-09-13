import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { GlassPanel } from '../components/ui/GlassPanel';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  const products = PRODUCTS.filter((p) => p.category === category);

  if (!categoryInfo) {
    return (
      <div style={{ backgroundColor: '#F7F5EE', padding: '100px 16px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>DISCIPLINE NOT FOUND</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>The sport category you requested is currently not listed.</p>
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
          BROWSE ALL GEAR
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F7F5EE', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* Category Editorial Hero Banner */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#0D0D0D',
          color: '#FFFFFF',
          padding: 'clamp(64px, 8vw, 100px) 0',
          overflow: 'hidden',
          borderBottom: '2px solid #222222',
        }}
      >
        <img
          src={categoryInfo.image}
          alt={categoryInfo.name}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.38,
            filter: 'grayscale(0.3) contrast(1.1)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.95) 90%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#C9A227',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <ArrowLeft size={14} />
              <span>BACK TO ALL DISCIPLINES</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#2457FF' }} />
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', color: '#888888', textTransform: 'uppercase' }}>
                ATHLETIC CATALOG // PUNE DISCIPLINE
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
                lineHeight: 0.92,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '-0.03em',
              }}
            >
              {categoryInfo.name.toUpperCase()}
            </h1>

            <p style={{ color: '#CCCCCC', fontSize: '1.0625rem', lineHeight: 1.55, marginBottom: '24px', maxWidth: '640px' }}>
              {categoryInfo.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categoryInfo.featuredEquipments.map((eq, i) => (
                <span
                  key={i}
                  className="font-mono"
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                  }}
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="container" style={{ paddingTop: 'clamp(40px, 5vw, 60px)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            borderBottom: '2px solid #111111',
            paddingBottom: '16px',
          }}
        >
          <div>
            <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: '#111111', textTransform: 'uppercase' }}>
              INVENTORY IN STOCK
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#111111', margin: '4px 0 0 0' }}>
              AVAILABLE {categoryInfo.name.toUpperCase()} GEAR ({products.length})
            </h2>
          </div>

          <div className="font-mono" style={{ fontSize: '0.8125rem', color: '#666666' }}>
            CAMP STORE VERIFIED • SHOP 247, MG ROAD
          </div>
        </div>

        {products.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '64px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E5E0D5', textAlign: 'center' }}>
            <p style={{ color: '#666666', fontSize: '1rem', marginBottom: '20px' }}>
              Additional {categoryInfo.name} equipment is available directly at our physical workshop in Camp, Pune.
            </p>
            <Link
              to="/contact"
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
              INQUIRE AT CAMP STORE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
