import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

export const NotFoundPage: React.FC = () => (
  <div className="container not-found">
    <p className="eyebrow">Page not found</p>
    <h1 className="display d-hero not-found-title">Out.</h1>
    <p className="lead">That page has gone past the baseline. Try the shop, the courts, or a sport below.</p>
    <div className="not-found-actions">
      <Link to="/shop" className="btn btn-primary">Shop gear</Link>
      <Link to="/courts" className="btn btn-outline">Courts</Link>
      <Link to="/" className="link-arrow">Home <span className="btn-arrow" aria-hidden="true">→</span></Link>
    </div>
    <ul className="not-found-sports">
      {CATEGORIES.map((c) => (
        <li key={c.id}>
          <Link to={`/shop/${c.id}`} className="chip">{c.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NotFoundPage;
