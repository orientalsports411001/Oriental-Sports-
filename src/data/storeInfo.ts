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

export const BRAND_STORY = {
  headline: 'ROOTED IN CAMP. BUILT FOR THE GAME.',
  subheadline: 'Pune’s sports house. Gear for the game. Courts for the city.',
  narrative: [
    'Located at Shop 247 on MG Road in Camp, Oriental Sports stands at the historic heart of Pune’s sporting tradition. For generations of players, coaches, school champions and club captains across the city, our store has been the first stop before stepping onto the pitch, field, or court.',
    'We believe sports equipment shouldn’t just be picked from a generic warehouse rack. It demands real athletic expertise: understanding the grain and balance of a bat, dialing in the string tension of a racquet, choosing the right footwear grip for Deccan red clay or modern cushioned acrylic.',
    'Over the years, our passion for the game grew beyond the four walls of our Camp store into building the places where Pune plays. Today, Oriental Sports is one of Maharashtra’s trusted names in sports infrastructure—engineering tournament-standard pickleball arenas, championship tennis courts, indoor badminton halls, and commercial multi-sport turf arenas.',
  ],
  pillars: [
    {
      title: 'THE CAMP STORE',
      desc: 'Hands-on equipment selection, expert racquet stringing, custom bat knocking and in-person gear consultations.',
    },
    {
      title: 'SPORTS INFRASTRUCTURE',
      desc: 'Turnkey court construction, laser grading, ITF/USAPA/BWF certified sports surfaces, LED lighting and netting.',
    },
    {
      title: 'INSTITUTIONAL PARTNERSHIP',
      desc: 'Dedicated procurement and equipment solutions for Pune’s premier schools, colleges, academies, and clubs.',
    },
  ],
};
