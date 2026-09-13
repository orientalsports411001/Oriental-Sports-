import React from 'react';
import { Hero } from '../components/home/Hero';
import { EditorialBreak } from '../components/home/EditorialBreak';
import { ShopBuildSplit } from '../components/home/ShopBuildSplit';
import { BentoBusiness } from '../components/home/BentoBusiness';
import { ShopBySport } from '../components/home/ShopBySport';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CourtsSection } from '../components/home/CourtsSection';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { WhyOriental } from '../components/home/WhyOriental';
import { PuneCampStory } from '../components/home/PuneCampStory';
import { Testimonials } from '../components/home/Testimonials';
import { VisitStore } from '../components/home/VisitStore';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. HERO with scroll media expansion & kinetic text */}
      <Hero />

      {/* 2. EDITORIAL STATEMENT CREED BREAK */}
      <EditorialBreak />

      {/* 3. SHOP / BUILD SPLIT PILLARS */}
      <ShopBuildSplit />

      {/* 4. BENTO BUSINESS ECOSYSTEM */}
      <BentoBusiness />

      {/* 5. SHOP BY SPORT (SIGNATURE INTERACTIVE LIST & TOUCH REEL) */}
      <ShopBySport />

      {/* 6. FEATURED PRODUCTS (MATCH-GRADE CAROUSEL & QUICK ADD) */}
      <FeaturedProducts />

      {/* 7. COURTS STICKY STORYTELLING (5-STAGE SEQUENCE) */}
      <CourtsSection />

      {/* 8. ARCHITECTURAL PROJECT GALLERY */}
      <ProjectGallery />

      {/* 9. WHY ORIENTAL SPORTS */}
      <WhyOriental />

      {/* 10. PUNE / CAMP STORY */}
      <PuneCampStory />

      {/* 11. TESTIMONIALS */}
      <Testimonials />

      {/* 12. VISIT STORE (CAMP PHYSICAL FLAGSHIP) */}
      <VisitStore />

      {/* 13. FINAL KINETIC CTA */}
      <FinalCTA />
    </main>
  );
};
