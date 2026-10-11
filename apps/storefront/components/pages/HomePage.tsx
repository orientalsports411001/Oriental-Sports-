'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { SportIndex } from '@/components/home/SportIndex';
import { OrbitalGallery } from '@/components/home/OrbitalGallery';
import { GearEdit } from '@/components/home/GearEdit';
import { CourtsChapter } from '@/components/home/CourtsChapter';
import { StoreChapter } from '@/components/home/StoreChapter';
import type { Product } from '@/types';

interface HomePageProps {
  gearEditProducts: Product[];
}

/**
 * Homepage — GEAR + COURTS, told in six chapters.
 *  Hero      photographic slides: Gear / Courts / Camp store (tabs name all three)
 *  Sport     expanding sport rail → tap list on mobile        (ivory)
 *  Gallery   six sport photos orbiting in 3D as you scroll    (ivory)
 *  Gear      sticky intro + studio-shot products               (stone)
 *  Courts    night-court chapter: build types + sequence       (ink)
 *  Store     the address as a shop sign, live hours            (ivory)
 *
 * `gearEditProducts` is fetched server-side in app/page.tsx and threaded
 * through to GearEdit, following the same route-fetches/props-down pattern
 * Stage 1 established for ShopPage/CategoryPage.
 */
export const HomePage: React.FC<HomePageProps> = ({ gearEditProducts }) => (
  <>
    <Hero />
    <SportIndex />
    <OrbitalGallery />
    <GearEdit products={gearEditProducts} />
    <CourtsChapter />
    <StoreChapter />
  </>
);

export default HomePage;
