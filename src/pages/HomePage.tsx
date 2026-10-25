import React from 'react';
import { Hero } from '../components/home/Hero';
import { MarqueeTicker } from '../components/ui/MarqueeTicker';
import { SportIndex } from '../components/home/SportIndex';
import { OrbitalGallery } from '../components/home/OrbitalGallery';
import { GearEdit } from '../components/home/GearEdit';
import { CourtsChapter } from '../components/home/CourtsChapter';
import { StoreChapter } from '../components/home/StoreChapter';

/**
 * Homepage — GEAR + COURTS, told in seven chapters.
 *  Hero      photographic slides: Gear / Courts / Camp store (blood-red athletic identity)
 *  Ticker    live sports house announcements marquee
 *  Sport     [CLIENT-APPROVED PROTECTED] expanding sport rail (ivory)
 *  Gallery   [CLIENT-APPROVED PROTECTED] 3D sports photos orbit (ivory)
 *  Gear      sticky intro + spotlight product cards (charcoal)
 *  Courts    turnkey courts infrastructure & specifications (obsidian)
 *  Store     the Camp store address as a shop sign & verified hours (obsidian)
 */
export const HomePage: React.FC = () => (
  <>
    <Hero />
    <MarqueeTicker />
    <SportIndex />
    <OrbitalGallery />
    <GearEdit />
    <CourtsChapter />
    <StoreChapter />
  </>
);

export default HomePage;
