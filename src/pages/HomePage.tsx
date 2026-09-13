import React from 'react';
import { Hero } from '../components/home/Hero';
import { ShopBySport } from '../components/home/ShopBySport';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CourtsSection } from '../components/home/CourtsSection';
import { VisitStore } from '../components/home/VisitStore';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. HERO: GEAR. COURTS. PUNE. Photorealistic Editorial Carousel */}
      <Hero />

      {/* 2. SHOP BY SPORT: Primary Sports Editorial Cards + Secondary Tags */}
      <ShopBySport />

      {/* 3. FEATURED GEAR: Clean Commerce Grid */}
      <FeaturedProducts />

      {/* 4. BUILD A COURT: Infrastructure & Construction Showcase */}
      <CourtsSection />

      {/* 5. VISIT ORIENTAL: Physical Camp Store Details & Direct Actions */}
      <VisitStore />
    </main>
  );
};

export default HomePage;
