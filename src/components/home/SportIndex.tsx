import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { IMAGES, MediaImage } from '../../data/media';
import { Img } from '../ui/Img';
import { Reveal, RevealLines } from '../motion/Reveal';
import { SportCategory } from '../../types';

/**
 * SPORT INDEX — "Shop by sport".
 * Desktop: an expanding photographic rail; the active sport takes ~46% of the
 * width and shows what the store stocks for it. Below 1024px the same markup
 * reflows into a tap list with thumbnails (one DOM, two layouts).
 */

const ART: Partial<Record<SportCategory, MediaImage>> = {
  cricket: IMAGES.cricketStrike,
  badminton: IMAGES.badmintonHall,
  tennis: IMAGES.tennisClay,
  pickleball: IMAGES.pickleballCorner,
  'table-tennis': IMAGES.tableTennisHall,
  squash: IMAGES.squashPlayer,
  fitness: IMAGES.fitnessBarbell,
};

const ORDER: SportCategory[] = ['cricket', 'badminton', 'tennis', 'pickleball', 'table-tennis', 'squash', 'fitness'];

const SPORTS = ORDER.map((id) => CATEGORIES.find((c) => c.id === id)!).filter(Boolean);

export const SportIndex: React.FC = () => {
  const [active, setActive] = useState<SportCategory>(SPORTS[0].id);

  return (
    <section className="sport-index section" aria-labelledby="sport-index-title">
      <div className="container">
        <header className="chapter-head">
          <div>
            <Reveal as="p" className="eyebrow">Shop by sport</Reveal>
            <RevealLines as="h2" id="sport-index-title" lines={['Pick your', 'game.']} className="display d-1 chapter-title" />
          </div>
          <Reveal className="chapter-aside" delay={0.1}>
            <p className="lead">
              {CATEGORIES.length} sports under one roof, from match willow to competition dumbbells.
            </p>
            <Link to="/shop" className="link-arrow">
              All gear <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </header>

        <Reveal y={32} amount={0.1}>
          <ul className="sport-rail">
            {SPORTS.map((sport) => {
              const isActive = sport.id === active;
              return (
                <li
                  key={sport.id}
                  className={`sport-panel ${isActive ? 'is-active' : ''}`}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(sport.id)}
                >
                  <Link
                    to={`/shop/${sport.id}`}
                    className="sport-panel-link"
                    onFocus={() => setActive(sport.id)}
                    aria-label={`Shop ${sport.name}: ${sport.featuredEquipments.slice(0, 3).join(', ')}`}
                  >
                    <span className="sport-panel-media">
                      <Img image={ART[sport.id] ?? sport.image} alt="" sizes="(min-width: 1024px) 50vw, 96px" />
                    </span>
                    <span className="sport-panel-name">{sport.name}</span>
                    <span className="sport-panel-detail" aria-hidden="true">
                      <span className="sport-panel-heading">{sport.name}</span>
                      <span className="sport-panel-stock">
                        {sport.featuredEquipments.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </span>
                      <span className="sport-panel-cta">
                        Shop {sport.name.toLowerCase()} <span className="btn-arrow">→</span>
                      </span>
                    </span>
                    <span className="sport-row-note" aria-hidden="true">{sport.tagline}</span>
                    <span className="sport-row-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default SportIndex;
