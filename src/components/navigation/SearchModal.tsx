import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { COURT_SERVICES } from '../../data/courts';
import { Img } from '../ui/Img';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = ['Cricket bat', 'Exercise bike', 'Hex dumbbells', 'TT table', 'Pickleball'];

/** Search overlay — instant results for gear, sports and court types. */
export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const hit = (...fields: string[]) => terms.length > 0 && terms.every((t) => fields.some((f) => f.toLowerCase().includes(t)));

  const products = PRODUCTS.filter((p) => hit(p.name, p.category, p.categoryName, p.brand)).slice(0, 5);
  const sports = CATEGORIES.filter((c) => hit(c.name, c.id)).slice(0, 4);
  const courts = COURT_SERVICES.filter((c) => hit(c.name, c.sport, 'court')).slice(0, 3);
  const nothing = terms.length > 0 && products.length + sports.length + courts.length === 0;

  const go = (to: string) => {
    onClose();
    navigate(to);
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <form
          className="search-bar container"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
          }}
        >
          <Search size={22} strokeWidth={1.8} aria-hidden="true" />
          <label htmlFor="site-search" className="visually-hidden">Search gear, sports and courts</label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            className="search-input"
            placeholder="Search gear, sports, courts"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="button" className="menu-close" onClick={onClose}>
            <span className="menu-close-x" aria-hidden="true" />
            <span>Close</span>
          </button>
        </form>

        <div className="search-panel-body container">
          {terms.length === 0 && (
            <div className="search-suggest">
              <p className="label subtle">Try</p>
              <div className="search-suggest-chips">
                {SHORTCUTS.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {sports.length > 0 && (
            <section className="search-group" aria-label="Sports">
              <p className="label subtle">Sports</p>
              <div className="search-suggest-chips">
                {sports.map((c) => (
                  <Link key={c.id} to={`/shop/${c.id}`} className="chip" onClick={onClose}>{c.name}</Link>
                ))}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section className="search-group" aria-label="Gear">
              <p className="label subtle">Gear</p>
              <ul className="search-hits">
                {products.map((p) => (
                  <li key={p.id}>
                    <button type="button" className="search-hit" onClick={() => go(`/product/${p.slug}`)}>
                      <span className="search-hit-media"><Img image={p.images[0]} alt="" sizes="56px" /></span>
                      <span className="search-hit-text">
                        <span className="search-hit-name">{p.name}</span>
                        <span className="muted">{p.categoryName} · ₹{p.price.toLocaleString('en-IN')}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {courts.length > 0 && (
            <section className="search-group" aria-label="Courts">
              <p className="label subtle">Courts we build</p>
              <ul className="search-hits">
                {courts.map((c) => (
                  <li key={c.id}>
                    <button type="button" className="search-hit" onClick={() => go(`/courts#${c.slug}`)}>
                      <span className="search-hit-text">
                        <span className="search-hit-name">{c.name}</span>
                        <span className="muted">Typical build: {c.leadTime.toLowerCase()}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {nothing && <p className="muted search-none">Nothing matches “{query}” online — the Camp store may still have it.</p>}

          {terms.length > 0 && !nothing && (
            <button type="button" className="link-arrow" onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}>
              See all results <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
