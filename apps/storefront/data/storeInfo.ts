import { StoreDetails } from '../types';

export const STORE_INFO: StoreDetails = {
  name: 'Oriental Sports',
  addressLine1: 'Shop 247, MG Road',
  addressLine2: 'New Modikhana, Camp',
  locality: 'Camp',
  city: 'Pune',
  pincode: '411001',
  phone: '+919890990022',
  displayPhone: '+91 98909 90022',
  email: 'oriental_sports@outlook.com',
  hours: {
    weekdays: '10:30 AM – 8:30 PM',
    sunday: '11:00 AM – 6:00 PM',
  },
  mapsUrl: 'https://maps.google.com/?q=Shop+247+MG+Road+Camp+Pune+411001',
  whatsappUrl: 'https://wa.me/919890990022?text=Hi%20Oriental%20Sports,%20I%20would%20like%20to%20inquire%20about%20',
};

/** Opening hours as minutes from midnight, Pune time. Mirrors STORE_INFO.hours. */
export const STORE_SCHEDULE = {
  timeZone: 'Asia/Kolkata',
  /** Monday–Saturday */
  weekdays: { open: 10 * 60 + 30, close: 20 * 60 + 30 },
  sunday: { open: 11 * 60, close: 18 * 60 },
};

export const BRAND_STORY = {
  headline: 'ROOTED IN CAMP. BUILT FOR THE GAME.',
  subheadline: 'Pune’s sports house. Gear for the game. Courts for the city.',
  /** Facts only: what the store sells, what it does in-house, what it builds and where. */
  narrative: [
    'Oriental Sports is a sports goods shop at Shop 247, MG Road, in Camp, Pune. Players, coaches, schools and clubs come to the counter for cricket bats, racquets, paddles and fitness equipment.',
    'Gear is picked up and tried in the hand before it is bought. Racquet stringing and bat knocking-in are done at the store, so a racquet or bat leaves ready to play.',
    'The store also builds courts: turnkey construction covering surface, fencing, lighting and line marking, for clubs, schools, housing societies and homes across Pune and Maharashtra.',
  ],
};
