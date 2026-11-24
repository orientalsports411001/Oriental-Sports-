import React from 'react';
import { Seo } from '../components/seo/Seo';
import { Hero } from '../components/home/Hero';
import { MarqueeTicker } from '../components/ui/MarqueeTicker';
import { SportIndex } from '../components/home/SportIndex';
import { OrbitalGallery } from '../components/home/OrbitalGallery';
import { GearEdit } from '../components/home/GearEdit';
import { PartnerBrands } from '../components/home/PartnerBrands';
import { CourtsChapter } from '../components/home/CourtsChapter';
import { StoreChapter } from '../components/home/StoreChapter';

/**
 * Homepage — GEAR + COURTS, told in eight chapters.
 *  Hero      photographic slides: Gear / Courts / Camp store (blood-red athletic identity)
 *  Ticker    live sports house announcements marquee
 *  Sport     [CLIENT-APPROVED PROTECTED] expanding sport rail (ivory)
 *  Gallery   [CLIENT-APPROVED PROTECTED] 3D sports photos orbit (ivory)
 *  Gear      sticky intro + spotlight product cards (charcoal)
 *  Partners  small scrolling strip of partner-brand logos, each linking to the brand's site (obsidian)
 *  Courts    turnkey courts infrastructure & specifications (obsidian)
 *  Store     the Camp store address as a shop sign & verified hours (obsidian)
 */
export const HomePage: React.FC = () => (
  <>
    <Seo
      title="Oriental Sports | Pune's Sports House & Court Builders"
      description="Oriental Sports Pune — Shop 247 R MG Road, Camp, Pune. Premier sports house and turnkey court builders for padel courts, pickleball, tennis, badminton, and football turf across Maharashtra."
      canonicalPath="/"
    />
    <Hero />
    <MarqueeTicker />
    <SportIndex />
    <OrbitalGallery />
    <GearEdit />
    <PartnerBrands />
    <CourtsChapter />
    <StoreChapter />
  </>
);

export default HomePage;
