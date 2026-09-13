import { SportCategory } from '../types';

export interface CategoryInfo {
  id: SportCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featuredEquipments: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cricket',
    name: 'Cricket',
    tagline: 'Match-grade English & Kashmir willow, protective gear and accessories',
    description: 'From handcrafted English willow bats to club-standard batting pads, helmets and training balls calibrated for Indian wickets.',
    image: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1000&q=80',
    itemCount: 42,
    featuredEquipments: ['Grade 1 English Willow', 'Moulded Batting Pads', 'Test Match Helmets', 'Leather Match Balls'],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    tagline: 'Tour-level racquets, court balls, grips and professional restringing',
    description: 'Precision performance racquets balanced for power and control, tournament pressurized balls, and specialized court shoes.',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
    itemCount: 38,
    featuredEquipments: ['Tour 300g Graphite Racquets', 'All-Court Pressure Balls', 'Overgrips & Dampeners', 'Heavy-Duty Court Nets'],
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    tagline: 'USA Pickleball certified composite paddles, outdoor balls & portable nets',
    description: "Pune's premier destination for the fastest growing court sport. USAPA approved raw carbon fiber paddles and outdoor tournament balls.",
    image: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?auto=format&fit=crop&w=1000&q=80',
    itemCount: 24,
    featuredEquipments: ['Toray T700 Raw Carbon Paddles', '40-Hole Outdoor Dura Balls', 'Portable Quick-Set Nets', 'Court Boundary Markers'],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    tagline: 'High-modulus carbon graphite racquets, tournament shuttlecocks and court gear',
    description: 'Head-heavy smash weapons, fast headlight defensive racquets, goose feather match shuttles, and instant electronic stringing service.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    itemCount: 45,
    featuredEquipments: ['Hi-Modulus 4U Racquets', 'Goose Feather Shuttles', 'Non-Marking Gum Sole Shoes', 'Thermal 6-Racquet Bags'],
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    tagline: 'ITTF approved tournament tables, carbon blades and offensive rubbers',
    description: 'Competition grade 25mm indoor rollaway tables, custom blade assemblies, and friction-engineered tensor rubbers.',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
    itemCount: 28,
    featuredEquipments: ['25mm Official Rollaway Tables', '7-Ply Carbon Blades', 'ITTF Spin Rubbers', '3-Star 40+ Poly Balls'],
  },
  {
    id: 'squash',
    name: 'Squash',
    tagline: 'Teardrop aerodynamic frames, double yellow dot balls and protective eyewear',
    description: 'Engineered for high-velocity indoor glass-backed courts. 120g-135g frames with high torsional stability and anti-fog eye guards.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
    itemCount: 19,
    featuredEquipments: ['Aerodynamic Teardrop Frames', 'Double Yellow Dot Competition Balls', 'Impact-Proof Polycarbonate Eyewear', 'Court Grip Shoes'],
  },
  {
    id: 'fitness',
    name: 'Fitness',
    tagline: 'Commercial dumbbells, competition barbells, kettlebells and recovery gear',
    description: 'Precision cast iron and urethane weights, power cages, cable systems, and commercial rubber flooring for serious athlete conditioning.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
    itemCount: 52,
    featuredEquipments: ['Urethane Hex Dumbbells', 'Precision Bearing Barbells', 'Cast Iron Competition Kettlebells', 'High-Density Rubber Flooring'],
  },
  {
    id: 'recreation',
    name: 'Recreation',
    tagline: 'Carrom boards, pool cues, foosball tables, chess sets and club recreation',
    description: 'Traditional Indian English birch carrom boards with waterproof playing surface, tournament striker sets, and institutional game tables.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
    itemCount: 26,
    featuredEquipments: ['Surco Championship Carrom 20mm', 'Ash Wood 2-Piece Pool Cues', 'Heavy-Weight Foosball Tables', 'Weighted Wooden Chess Sets'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    tagline: 'Sports bags, compression wear, athletic hydration, ball carts and training cones',
    description: 'Crucial equipment accessories that keep athletes prepared, hydrated, and ready for tournament day.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80',
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
