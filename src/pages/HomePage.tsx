import React from 'react';
import { Hero } from '../components/home/Hero';
import { MarqueeTicker } from '../components/home/MarqueeTicker';
import { ShopBySport } from '../components/home/ShopBySport';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CourtsSection } from '../components/home/CourtsSection';
import { VisitStore } from '../components/home/VisitStore';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. HERO: Warm Cream + Full-Bleed Action Photography Carousel */}
      <Hero />

      {/* High-Energy Sports Ticker */}
      <MarqueeTicker variant="orange" />

      {/* 2. SHOP BY SPORT: Electric Blue Section with 8 Sports */}
      <ShopBySport />

      {/* 3. FEATURED GEAR: Crisp White Section with Real Match-Grade Products */}
      <FeaturedProducts />

      {/* 4. BUILD A COURT: High-Energy Tangerine Section with Court Photography */}
      <CourtsSection />

      {/* 5. VISIT THE STORE: Warm Cream & Lime Flagship with Real Interactive Google Map */}
      <VisitStore />
    </main>
  );
};
