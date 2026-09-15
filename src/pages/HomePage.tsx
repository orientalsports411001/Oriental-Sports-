import React from 'react';
import { Hero } from '../components/home/Hero';
import { BuiltForMarquee } from '../components/home/BuiltForMarquee';
import { ShopBySport } from '../components/home/ShopBySport';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CourtsSection } from '../components/home/CourtsSection';
import { VisitStore } from '../components/home/VisitStore';

/**
 * Homepage — art-directed editorial sequence.
 *
 * Section rhythm (each has a unique composition anchor):
 *  01. HERO         — giant stacked typography + full-bleed athlete photo (image-as-canvas)
 *  02. MARQUEE      — continuous discipline & craft strip
 *  03. SPORT STORY  — typographic index left + dominant photograph right
 *  04. GEAR         — oversized product photo right + editorial name/price left
 *                      + specs-as-visual strip (embedded in FeaturedProducts)
 *  05. COURTS       — full-bleed architecture photo, headline overlaid bottom-left
 *  06. VISIT STORE  — magazine spread: address typography left, store photo right
 *
 * NO section repeats the same layout anchor.
 * NO cards, NO grids, NO badge clusters, NO stat boxes.
 */
export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <BuiltForMarquee />
      <ShopBySport />
      <FeaturedProducts />
      <CourtsSection />
      <VisitStore />
    </main>
  );
};

export default HomePage;
