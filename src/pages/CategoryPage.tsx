import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { SportCategory } from '../types';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  const products = PRODUCTS.filter((p) => p.category === category);

  if (!categoryInfo) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h1>Category Not Found</h1>
        <p style={{ color: '#666', margin: '16px 0 24px' }}>The sport category you requested is not listed.</p>
        <Link to="/shop" className="btn btn-primary">
          BROWSE ALL GEAR
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Category Hero Banner */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'clamp(48px, 8vw, 84px) 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
          <img src={categoryInfo.image} alt={categoryInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.95) 85%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-plate-gold)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <ArrowLeft size={14} />
              <span>BACK TO ALL DISCIPLINES</span>
            </Link>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.02,
                color: 'var(--color-pure-white)',
                marginBottom: '12px',
              }}
            >
              {categoryInfo.name.toUpperCase()}
            </h1>

            <p style={{ color: '#EAE5D9', fontSize: '1.0625rem', lineHeight: 1.45, marginBottom: '20px' }}>
              {categoryInfo.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {categoryInfo.featuredEquipments.map((eq, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    color: '#FFFFFF',
                  }}
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="font-display" style={{ fontSize: '1.5rem' }}>
            AVAILABLE {categoryInfo.name.toUpperCase()} EQUIPMENT ({products.length})
          </h2>
          <span style={{ fontSize: '0.8125rem', color: '#666' }}>Camp Store Verified</span>
        </div>

        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '48px 16px', backgroundColor: '#FFF', textAlign: 'center', borderRadius: '2px' }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              More {categoryInfo.name} products are available at our physical store on MG Road, Camp.
            </p>
            <Link to="/contact" className="btn btn-outline-dark btn-sm">
              INQUIRE AT CAMP STORE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
