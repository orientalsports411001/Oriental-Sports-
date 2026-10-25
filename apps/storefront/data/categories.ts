import { SportCategory } from '../types';

export interface CategoryInfo {
  id: SportCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featuredEquipments: string[];
  /** SEO fields added by supabase/migrations/20261011100000_seo_fields.sql. */
  seoTitle?: string;
  seoDescription?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cricket',
    name: 'Cricket',
    tagline: 'Match-grade English & Kashmir willow, protective gear and accessories',
    description: 'From handcrafted English and Kashmir willow bats to club-standard batting pads, helmets and training balls calibrated for Indian wickets.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
    itemCount: 42,
    featuredEquipments: ['SG Kashmir Willow Bats', 'Grade 1 English Willow', 'Batting Pads & Gloves', 'Match Leather Balls'],
  },
  {
    id: 'football',
    name: 'Football',
    tagline: 'Match balls, turf shoes, stockings and training gear',
    description: 'Tournament and practice footballs calibrated for turf and ground, precision multi-stud boots, and ergonomic match stockings.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    itemCount: 8,
    featuredEquipments: ['Nivia Match Footballs', 'Cosco Hand-Stitched Balls', 'Carbonat 8.0 Turf Shoes', 'Encounter Stockings'],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    tagline: 'High-modulus carbon graphite racquets, tournament shuttlecocks and court gear',
    description: 'Yonex graphite racquets, Mavis synthetic shuttles, goose feather tournament shuttlecocks, and precision stringing.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    itemCount: 45,
    featuredEquipments: ['Yonex Nanoflare & Astrox', 'Mavis-350 Synthetic Shuttles', 'AS2 Feather Shuttles', 'Non-Marking Court Shoes'],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    tagline: 'Tour-level racquets, court balls, grips and professional restringing',
    description: 'Precision performance racquets balanced for power and control, tournament pressurized balls, and specialized court shoes.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
    itemCount: 38,
    featuredEquipments: ['Tour 300g Graphite Racquets', 'All-Court Pressure Balls', 'Overgrips & Dampeners', 'Heavy-Duty Court Nets'],
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    tagline: 'USA Pickleball certified composite paddles, outdoor balls & portable nets',
    description: "Paddles, balls and nets for the fastest-growing court sport. USAPA approved raw carbon fiber paddles and outdoor tournament balls.",
    image: '/images/categories/pickleball_category.webp',
    itemCount: 24,
    featuredEquipments: ['Toray T700 Raw Carbon Paddles', '40-Hole Outdoor Dura Balls', 'Portable Quick-Set Nets', 'Court Boundary Markers'],
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    tagline: 'ITTF approved tournament tables, carbon blades and offensive rubbers',
    description: 'Competition grade 25mm indoor rollaway tables, custom blade assemblies, and friction-engineered tensor rubbers.',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
    itemCount: 28,
    featuredEquipments: ['Fury, Glory & Gravity TT Tables', 'Carbon Indoor TT Tables', '7-Ply Carbon Blades', 'ITTF Spin Rubbers'],
  },
  {
    id: 'squash',
    name: 'Squash',
    tagline: 'Teardrop aerodynamic frames, double yellow dot balls and protective eyewear',
    description: 'Engineered for high-velocity indoor glass-backed courts. 120g-135g frames with high torsional stability and anti-fog eye guards.',
    image: 'https://images.unsplash.com/photo-1554290813-ec6a2a72e5c7?auto=format&fit=crop&w=1000&q=80',
    itemCount: 19,
    featuredEquipments: ['Aerodynamic Teardrop Frames', 'Double Yellow Dot Competition Balls', 'Impact-Proof Polycarbonate Eyewear', 'Court Grip Shoes'],
  },
  {
    id: 'fitness',
    name: 'Fitness',
    tagline: 'Commercial dumbbells, competition barbells, kettlebells and recovery gear',
    description: 'Precision cast iron and urethane weights, power cages, cable systems, and commercial rubber flooring for serious athlete conditioning.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    itemCount: 54,
    featuredEquipments: ['Cougar Hex Dumbbells (2.5–25kg)', 'Olympic Rubber Plates (51mm)', 'Agility Hurdles & Speed Ladders', 'Power Weight Bags & Ankle Weights'],
  },
  {
    id: 'gym-equipment',
    name: 'Gym Equipment',
    tagline: 'Commercial & domestic treadmills, upright, recumbent, spin & air bikes',
    description: 'Commercial, light commercial and curve treadmills, upright bikes, recumbent bikes, spin bikes, and air bikes for gyms, clubs, and home fitness.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    itemCount: 16,
    featuredEquipments: ['Commercial Treadmills', 'Commercial Recumbent Bikes', 'Commercial Upright Bikes', 'Spin & Air Resistance Bikes'],
  },
  {
    id: 'recreation',
    name: 'Recreation',
    tagline: 'Carrom boards, tournament foosball tables, slate pool tables and club recreation',
    description: 'Traditional Indian English birch carrom boards, tournament heavy-weight foosball tables, precision slate pool tables, and club game tables.',
    image: 'https://images.unsplash.com/photo-1768518354646-33833e95a24d?auto=format&fit=crop&w=1000&q=80',
    itemCount: 8,
    featuredEquipments: ['Surco Championship Carrom 20mm', 'Premium Slate Pool Tables', 'Tournament Heavy Foosball Tables', 'Weighted Wooden Chess Sets'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    tagline: 'Sports bags, compression wear, athletic hydration, ball carts and training cones',
    description: 'Crucial equipment accessories that keep athletes prepared, hydrated, and ready for tournament day.',
    image: 'https://images.unsplash.com/photo-1672223303533-05fddcbf6e6c?auto=format&fit=crop&w=1000&q=80',
    itemCount: 34,
    featuredEquipments: ['Duffels & Kit Bags', 'Athletic Grip Spray & Chalk', 'Agility Ladders & Cones', 'Insulated Stainless Steel Bottles'],
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    tagline: 'FIVB approved match balls, tournament nets, posts and knee protection',
    description: 'Competition grade composite leather volleyballs, outdoor beach & indoor club net systems, and high-impact protective athlete gear.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
    itemCount: 18,
    featuredEquipments: ['FIVB Official Game Balls', 'Competition Net & Antennae Kits', 'High-Density Knee Guards', 'Outdoor Sand Volleyballs'],
  },
];
